import { action } from '@ember/object';
import Router from '@ember/routing/router';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import checkErrors from 'super-rentals/utils/validation';
import Store from '@ember-data/store';
import { InputError } from './form-create';
// import { invokeHelper } from '@ember/helper';
// import { getValue } from '@glimmer/tracking/primitives/cache';

export default class RentalForm extends Component {
  @service store!: Store;
  @service router!: Router;
  @tracked errors: InputError = {};

  @action
  async sendRental(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    //this.errors = checkErrors(formValues);

    //If there are errors, it doesnt send data
    if (Object.keys(this.errors).length > 0) {
      return;
    }
    // let post = this.store.createRecord('rental', {
    //   title: formValues['title'],
    //   image: formValues['image'],
    //   owner: formValues['owner'],
    //   city: formValues['city'],
    //   category: formValues['category'],
    //   bedrooms: formValues['bedrooms'],
    //   description: formValues['description'],
    // });

    // post.save().then(this.router.transitionTo('index'));

    const uniqueId = Math.floor(Math.random() * 100);

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
        return response;
      })
      .catch((error) => {
        console.error('There was an error:', error);
      });

    this.router.transitionTo('index');
  }
}
