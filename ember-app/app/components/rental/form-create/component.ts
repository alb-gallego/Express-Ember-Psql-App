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
  checkForm(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLInputElement;
    // const formData = new FormData(form);
    const formValues: Record<string, string> = {};
    formValues[form.name] = form.value.toString();
    this.errors = checkErrors(formValues);
    if (Object.keys(this.errors).length > 0) {
      return;
    }
  }

  // @action
  // async sendRental(event: Event) {
  //   event.preventDefault();
  //   const form = event.target as HTMLFormElement;
  //   const formData = new FormData(form);
  //   const formValues: Record<string, string> = {};

  //   formData.forEach((value, key) => {
  //     formValues[key] = value.toString();
  //   });

  //   this.errors = checkErrors(formValues);

  //   if (Object.keys(this.errors).length > 0) {
  //     return;
  //   }

  //   let post = this.store.createRecord('rental', {
  //     title: formValues['title'],
  //     image: formValues['image'],
  //     owner: formValues['owner'],
  //     city: formValues['city'],
  //     category: formValues['category'],
  //     bedrooms: formValues['bedrooms'],
  //     description: formValues['description'],
  //   });

  //   try {
  //     post.save();

  //     this.router.transitionTo('index');
  //   } catch (error) {
  //     console.log(error);
  //     this.router.transitionTo('create-rental');
  //   }
  // }

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

    if (Object.keys(this.errors).length > 0) {
      return;
    }

    const rentalPost = {
      data: [
        {
          attributes: {
            title: formValues['title'],
            image: formValues['image'],
            owner: formValues['owner'],
            city: formValues['city'],
            category: formValues['category'],
            bedrooms: formValues['bedrooms'],
            description: formValues['description'],
          },
          type: 'rental',
        },
      ],
    };
    // console.log(JSON.stringify(rentalPost));
    await fetch('http://localhost:3000/rentals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rentalPost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.router.transitionTo('index');

        return response;
      })
      .catch((error) => {
        console.error('There was an error:', error);
        this.router.transitionTo('create-rental');
      });
  }
}
