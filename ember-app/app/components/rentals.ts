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
  @service store: any;
  #page = 1;

  @action
  sortBy(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLSelectElement;
    this.sort = form.value.toString();
    return this.sort;
  }

  @action
  async loadRentals() {
    const res: Rental[] = await this.store.query('rental', this.#page);
    let result: Rental[] = [];
    res.forEach((rental: Rental) => {
      if (rental.id) {
        result.push(rental);
      }
    });

    this.rentals = result;
    return this.rentals;
  }
}
