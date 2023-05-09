import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Rental from 'super-rentals/models/rental';

export default class RentalForm extends Component {
  @service store: any;
  @service router: any;

  @action
  async deleteRental(rental: Rental) {
    const rentalD = await this.store.findRecord('rental', rental.id);

    await fetch(`http://localhost:3000/rentals/${rentalD.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        this.router.transitionTo('index');
        return response;
      })
      .catch((error) => {
        this.router.transitionTo('rental');
      });
    //Other way of delete that doesnt work
    // try {
    //   const rentalD = await this.store.findRecord('rental', rental.id);

    //   if (rentalD.isDeleted || rentalD.isSaving) {
    //     console.log(
    //       'El registro ya ha sido eliminado o se está eliminando actualmente'
    //     );
    //   } else {
    //     rentalD.deleteRecord();
    //     await rentalD.save();
    //     this.router.transitionTo('index');
    //   }
    // } catch (error) {
    //   console.error(`Error al eliminar el registro: ${error}`);
    // }
  }
}
