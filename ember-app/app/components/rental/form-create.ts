import { action } from '@ember/object';
import Router from '@ember/routing/router';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import checkErrors from 'super-rentals/utils/validation';

export default class RentalForm extends Component {
  @service store: any;
  @service router!: Router;
  @tracked errors: string[] = [];

  @action
  async sendRental(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    this.errors = checkErrors(formValues);

    //If there are errors, it doesnt send data
    if (this.errors.length > 0) {
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
      console.log('1212');

      post.save();
      console.log('prue');

      this.router.transitionTo('index');
      console.log('RUTA A INDEX');
    } catch (error) {
      console.log(error);
      this.router.transitionTo('create-rental');
    }
  }
}
