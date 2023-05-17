import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Rental from '../models/rental';
import Router from '@ember/routing/router';

export default class IndexRoute extends Route {
  // beforeModel() {
  //   let res:Rental[] = this.store.findAll('rental');
  //   retu
  // }

  model() {
    // return await this.store.query('rental', { page: { limit: 3, offset: 0 } });
    // const options = { page: 1 };

    // const res: any = await this.store.query('rental', options);
    // let result: Rental[] = [];

    // res.forEach((rental: Rental) => {
    //   console.log(rental.id);
    //   if (rental.id) {
    //     result.push(rental);
    //   }
    // });

    // return result;
    console.log('Ruta a index');
  }
}
