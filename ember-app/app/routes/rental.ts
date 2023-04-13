import Route from '@ember/routing/route';
import { service } from '@ember/service';
//import { service } from '@ember/service';
import Rental from '../models/rental';



export default class RentalRoute extends Route {
  @service declare store: any;

   model(params: { rental_id: string }) {
    const res:Rental = this.store.findRecord('rental', params.rental_id);
    return res;
  }
}
