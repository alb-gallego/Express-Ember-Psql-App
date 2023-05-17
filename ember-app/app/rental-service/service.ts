import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import RentalJSON from 'super-rentals/interfaces/rentalJSON';
import { RENTALS_URL } from 'super-rentals/services/api/urls';

export default class RentalService extends Service {
  async getRentals(page?: number) {
    let url = 'http://localhost:3000/rentals';
    let rentals: RentalJSON[] = [];
    page ? (url = url + `?page=${page}`) : url;
    const response = await fetch(url);
    const json = await response.json();
    const data = json.data;
    rentals = data;
    return data;
  }

  async getRental(id: string) {
    const url = RENTALS_URL + `/${id}`;

    const response = await fetch(url)
      .then((response) => response.json())
      .then((json) => json.data);
    // const json = await response.json();
    // const data = await json.data;
    const rental: RentalJSON = response;
    return rental;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'rental-service': RentalService;
  }
}
