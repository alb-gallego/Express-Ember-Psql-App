import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Rental from '../models/rental';
import Router from '@ember/routing/router';

export default class IndexRoute extends Route {
  @service store: any;
  // beforeModel() {
  //   let res:Rental[] = this.store.findAll('rental');
  //   retu
  // }

  async model() {
    const res: any = await this.store.findAll('rental');
    let result: Rental[] = [];

    res.forEach((rental: Rental) => {
      console.log(rental.id);
      if (rental.id) {
        result.push(rental);
      }
    });

    return result;
  }
}
