import Route from '@ember/routing/route';

export default class RentalRoute extends Route {
  model(params: { rental_id: string }) {
    console.log('RUTA A DETALLES');
    console.log('ROUTE DATA', params.rental_id);
    return params.rental_id;
  }
}
