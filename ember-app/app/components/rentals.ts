import { action } from '@ember/object';
import { cancel, debounce } from '@ember/runloop';
import { EmberRunTimer } from '@ember/runloop/types';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import Rental from '../models/rental';

const { round } = Math;

export default class RentalsComponent extends Component {
  @tracked query = '';
  @tracked sort = '';
  @tracked rentals: Rental[] = [];
  @tracked page = 1;
  @tracked canLoad: boolean = true;
  @service store: any;

  @action
  sortBy(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLSelectElement;
    this.sort = form.value.toString();
    return this.sort;
  }

  @action
  async loadRentals() {
    const options = { page: this.page };
    const res: Rental[] = await this.store.query('rental', options);
    let result: Rental[] = [];
    res.forEach((rental: Rental) => {
      if (rental.id) {
        result.push(rental);
      }
    });

    this.rentals = result;
    return this.rentals;
  }

  @action
  async loadMore() {
    this.page = this.page + 1;
    const options = { page: this.page };

    try {
      const newRentals: Rental[] = await this.store.query('rental', options);
      let result: Rental[] = [];
      newRentals.forEach((rental: Rental) => {
        if (rental.id) {
          result.push(rental);
        }
      });

      this.rentals = this.rentals.concat(result);

      return this.rentals;
    } catch (error) {
      this.canLoad = false;
      this.page -= 1;
    }
  }
}
