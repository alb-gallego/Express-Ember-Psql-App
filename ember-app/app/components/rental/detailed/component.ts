import { action } from '@ember/object';
import Router from '@ember/routing/router';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { resource, use } from 'ember-resources';
import { InputError } from 'super-rentals/interfaces/inputError';
import rentalPOST from 'super-rentals/interfaces/rentalPOST';
import PruebaResource from 'super-rentals/prueba-resource/service';
import { RENTALS_URL } from 'super-rentals/services/api/urls';
import checkErrors from 'super-rentals/utils/validation';
import { TrackedObject } from 'tracked-built-ins';

interface RentalDetailedArgs {
  id: string;
}
interface State {
  isResolved: boolean;
  isLoading: boolean;
  isError: boolean;
  value: null | any;
  error: null | any;
  hasReload: boolean;
}
export default class RentalDetailed extends Component<RentalDetailedArgs> {
  @service router!: Router;
  @service pruebaResource!: PruebaResource;
  @tracked errors: InputError = {};
  @tracked url = RENTALS_URL + `/${this.args.id}`;

  @use rentalData = resource(({ on }) => {
    let state = new TrackedObject({
      isResolved: false,
      isLoading: true,
      isError: false,
      value: null,
      error: null,
    });

    let controller = new AbortController();

    on.cleanup(() => controller.abort());

    fetch(this.url, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        state.value = data;
        state.isResolved = true;
        state.isError = false;
        state.isLoading = false;
      })
      .catch((error) => {
        console.log('Error occurred:', error);
        state.error = error;
        state.isResolved = true;
        state.isError = true;
        state.isLoading = false;
      });

    return state;
  });

  @action
  checkForm(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLInputElement;
    const formValues: Record<string, string> = {};
    formValues[form.name] = form.value.toString();
    this.errors = checkErrors(formValues);

    if (Object.keys(this.errors).length > 0) {
      return;
    }
  }

  @action
  deleteRental(id: number) {
    fetch(this.url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        this.router.transitionTo('index');
        return response;
      })
      .catch((error) => {
        this.router.transitionTo('rental');
      });
  }

  @action
  updateRental(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });
    //If there are errors, it doesnt send data
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
          id: parseInt(this.args.id),
        },
      ],
    };
    fetch(this.url, {
      method: 'PATCH',
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
      .then((data) => {
        this.rentalData.value = data.data;
      })
      .catch((error) => {
        console.error('There was an error:', error);
        this.router.transitionTo('rental');
      });
  }
}
