import { action } from '@ember/object';
import Router from '@ember/routing/router';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { use } from 'ember-resources';
import { InputError } from 'super-rentals/interfaces/inputError';
import rentalPOST from 'super-rentals/interfaces/rentalPOST';
import PruebaResource from 'super-rentals/prueba-resource/service';
import { RENTALS_URL } from 'super-rentals/services/api/urls';
import checkErrors from 'super-rentals/utils/validation';
import { TrackedArray } from 'tracked-built-ins';

interface FormCreateArguments {
  onLoadFormCreate(): () => void;
  rentals: TrackedArray;
  canLoad: boolean;
}

export default class RentalForm extends Component<FormCreateArguments> {
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

    const rentalPost: rentalPOST = {
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

        return response.json();
      })
      .then((jsonResponse) => {
        console.log('RESPUESTA JSON', jsonResponse.data.data);
        this.args.rentals.push(jsonResponse.data.data);
        this.args.onLoadFormCreate();
        //         if((this.args.rentals.length%4)!==0){
        // this.args.canLoad=true;
        //         }
      })
      .catch((error) => {
        console.error('There was an error:', error);
        this.router.transitionTo('create-rental');
      });
  }
}
