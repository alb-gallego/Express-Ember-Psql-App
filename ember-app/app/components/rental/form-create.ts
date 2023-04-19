import { action } from '@ember/object';
import Router from '@ember/routing/router';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import checkErrors from 'super-rentals/utils/validation';

export interface InputError {
  image?: string;
  title?: string;
  category?: string;
  owner?: string;
  city?: string;
  bedrooms?: string;
  description?: string;
}

export default class RentalForm extends Component {
  @service store: any;
  @service router!: Router;
  @tracked errors: InputError = {
    image: '',
    title: '',
    category: '',
    owner: '',
    city: '',
    bedrooms: '',
    description: '',
  };

  @action
  async sendRental(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: Record<string, string> = {};
    console.log(Object.keys(this.errors).length);

    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    this.errors = checkErrors(formValues);

    //If there are errors, it doesnt send data
    // const errorsNotEmpty = Object.values(this.errors).every(
    //   (value) => value !== ''
    // );
    // console.log(errorsNotEmpty);

    if (Object.keys(this.errors).length > 0) {
      return;
    }

    let post = this.store.createRecord('rental', {
      title: formValues['title'],
      image: formValues['image'],
      owner: formValues['owner'],
      city: formValues['city'],
      category: formValues['category'],
      bedrooms: formValues['bedrooms'],
      description: formValues['description'],
    });

    try {
      post.save();

      this.router.transitionTo('index');
      console.log('RUTA A INDEX');
    } catch (error) {
      console.log(error);
      this.router.transitionTo('create-rental');
    }
  }
}
