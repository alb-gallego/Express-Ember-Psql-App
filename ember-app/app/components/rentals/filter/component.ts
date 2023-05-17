import Component from '@glimmer/component';
import RentalJSON from 'super-rentals/interfaces/rentalJSON';
import sortByProperty from 'super-rentals/utils/sort';

interface RentalsFilterArgs {
  rentals: RentalJSON[];
  query: string;
  order: string;
}

export default class RentalsFilterComponent extends Component<RentalsFilterArgs> {
  get results() {
    let { rentals, query, order } = this.args;

    switch (order) {
      case 'titleAsc':
        rentals.sort(sortByProperty('title', true));
        break;
      case 'titleDesc':
        rentals.sort(sortByProperty('title', false));
        break;
      case 'bedroomsAsc':
        rentals.sort(sortByProperty('bedrooms', true));
        break;
      case 'bedroomsDesc':
        rentals.sort(sortByProperty('bedrooms', false));
        break;
      case 'dateAsc':
        rentals.sort(sortByProperty('creation_date', false));
        break;
      case 'dateDesc':
        rentals.sort(sortByProperty('creation_date', true));
        break;
      default:
        if (query) {
          rentals = rentals.filter((rental: RentalJSON) =>
            rental.attributes.title.includes(query)
          );
        }
        break;
    }

    return rentals;
  }
}
