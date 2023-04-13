import Component from '@glimmer/component';
import  Rental  from 'super-rentals/models/rental';

interface RentalsFilterArgs {
  rentals: Rental[];
  query: string;
}


export default class RentalsFilterComponent extends Component<RentalsFilterArgs> {
  get results() {
    let { rentals, query } = this.args;

    if (query) {
      rentals = rentals.filter((rental:Rental) => rental.title.includes(query));
    }

    return rentals;
  }
}
