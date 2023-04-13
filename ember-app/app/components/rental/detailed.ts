import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Rental from 'super-rentals/models/rental';

export default class RentalForm extends Component {
  @service store: any;
  @service router: any;

  @action
  async deleteRental(rental: any) {
    try {
      const rentalD = await this.store.findRecord('rental', rental.id);

      if (rentalD.isDeleted || rentalD.isSaving) {
        console.log('El registro ya ha sido eliminado o se está eliminando actualmente');
      } else {
        rentalD.deleteRecord();
        await rentalD.save();
        this.router.transitionTo('index');
      }
    } catch (error) {
      console.error(`Error al eliminar el registro: ${error}`);
    }
  }



  // console.log(rental.isDeleted);
  // await rentalD.save();
}
