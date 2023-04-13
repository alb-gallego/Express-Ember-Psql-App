import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Rental from '../models/rental';


export default class IndexRoute extends Route {
  @service store:any;



  async model() {

    let res:Rental[] = await this.store.findAll('rental');
    console.log('Entra en ruta index');

    return res;
  }
}
