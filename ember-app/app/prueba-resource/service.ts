import { action } from '@ember/object';
import Service from '@ember/service';
import { resource } from 'ember-resources';
import rentalPOST from 'super-rentals/interfaces/rentalPOST';
import { RENTALS_URL } from 'super-rentals/services/api/urls';
import { TrackedObject } from 'tracked-built-ins';
type actions = 'GET' | 'POST' | 'UPDATE' | 'DELETE';

export default class PruebaResource extends Service {
  getRentals(url: string, page?: number) {
    return resource(({ on }) => {
      let state = new TrackedObject({
        isResolved: false,
        isLoading: true,
        isError: false,
        value: null,
        error: null,
      });

      let controller = new AbortController();

      on.cleanup(() => controller.abort());

      page ? (url = url + `?page=${page}`) : url;
      console.log('Starting fetch...');
      fetch(url, { signal: controller.signal })
        .then((response) => response.json())

        .then((data) => {
          state.value = data!;
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
  }

  rentalAction(
    url: string,
    action: actions,
    page?: number | null,
    id?: number | null,
    rentalPost?: rentalPOST | null
  ) {
    return resource(({ on }) => {
      let url = RENTALS_URL;
      let state = new TrackedObject({
        isResolved: false,
        isLoading: true,
        isError: false,
        value: null,
        error: null,
      });
      let controller = new AbortController();
      let bodyValue: string | null = null;

      if (action === 'POST' || action === 'UPDATE') {
        bodyValue = JSON.stringify(rentalPost);
      }
      if (
        (action === 'GET' || action === 'UPDATE' || action === 'DELETE') &&
        id
      ) {
        url += `/${id}`;
      }

      if (action === 'GET' && page) {
        url += `?page=${page}`;
      }

      let options = {
        signal: controller.signal,
        method: action,
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyValue,
      };
      console.log(url);
      console.log(action);

      on.cleanup(() => controller.abort());

      // console.log('Starting fetch...');
      fetch(url, options)
        .then((response) => response.json())

        .then((data) => {
          // console.log('Data received:', data);
          state.value = data!;
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
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'prueba-resource': PruebaResource;
  }
}
