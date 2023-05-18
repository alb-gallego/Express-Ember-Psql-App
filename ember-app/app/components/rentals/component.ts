import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { use, resource } from 'ember-resources';
import { RENTALS_URL_SCROLLED } from 'super-rentals/services/api/urls';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';

export default class RentalsComponent extends Component {
  @tracked query = '';
  @tracked sort = '';
  // @tracked rentals: [] = [];
  rTracked = new TrackedArray();
  @tracked res = [];
  page = 1;
  @tracked canLoad: boolean = true;
  @tracked isCreate = false;
  @tracked url = RENTALS_URL_SCROLLED + this.page;

  // @use myData = this.pruebaResource.rentalAction(RENTALS_URL, 'GET', null, 1);
  @use rentalData = resource(({ on }) => {
    let state = new TrackedObject({
      isResolved: false,
      isLoading: true,
      isError: false,
      value: null,
      error: null,
    });
    let controller = new AbortController();
    console.log(this.url);

    on.cleanup(() => controller.abort());
    console.log('Starting fetch...');
    fetch(this.url, { signal: controller.signal })
      .then((response) => response.json())
      .then((rentals) => {
        state.isResolved = true;
        state.isError = false;
        state.isLoading = false;
        state.value = rentals.data;
        if (state.value !== null) {
          rentals = state.value;
          // console.log('RTRACKED ANTES DE ', this.rTracked);

          rentals.forEach((element: any) => {
            this.rTracked.push(element);
            // console.log('RTRACKED DURANTE ', this.rTracked);
          });
          console.log('RTRACKED DESPUES DE ', this.rTracked);
        }
      })
      .catch((error) => {
        console.log('Error occurred:', error);
        state.error = error;
        state.isResolved = true;
        state.isError = true;
        state.isLoading = false;
        this.canLoad = false;
        this.page -= 1;
      });

    return state;
  });

  @action
  loadFormCreate() {
    this.isCreate = !this.isCreate;
  }

  @action
  sortBy(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLSelectElement;
    this.sort = form.value.toString();
    return this.sort;
  }

  // @action
  // async loadRentals() {
  //   // const options = { page: this.page };
  //   // this.rentals = await this.rentalService.getRentals(options.page);
  //   // console.log(this.myData.value);
  //   // console.log(this.rentals);

  //   return this.rentalData;
  // }

  @action
  loadMore() {
    this.page = this.page + 1;
    this.url = RENTALS_URL_SCROLLED + this.page;

    // try {
    //   const newRentals: RentalJSON[] = await this.rentalService.getRentals(
    //     options.page
    //   );
    //   let result: RentalJSON[] = [];
    //   newRentals.forEach((rental) => {
    //     if (rental.id) {
    //       result.push(rental);
    //     }
    //   });
    //   this.rentals = this.rentals.concat(result);

    //   return this.rentals;
    // } catch (error) {
    //   this.canLoad = false;
    //   this.page -= 1;
    // }
  }
}
