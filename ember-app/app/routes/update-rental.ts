import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Rental from '../models/rental';


export default class UpdateRentalRoute extends Route {
  @service declare store: any;

  async model(params: { rental_id: string }) {
    const response:Promise<Rental> = await this.store.findRecord('rental', params.rental_id);
    const res = await response;

    return res;
  }

}
