import Component from '@glimmer/component';
import Rental from 'super-rentals/models/rental';
import sortByProperty from 'super-rentals/utils/sort';

interface RentalsFilterArgs {
  rentals: Rental[];
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
      // case 'dateDesc':
      // case 'dateAsc':
      default:
        if (query) {
          rentals = rentals.filter((rental: Rental) =>
            rental.title.includes(query)
          );
        }
        break;
    }

    return rentals;
  }
}
