import Model, { attr } from '@ember-data/model';

const COMMUNITY_CATEGORIES = ['Condo', 'Townhouse', 'Apartment'];

export default class RentalModel extends Model {
  @attr('string')
  declare title: string;
  @attr('string')//Se puede usar{@attr('string') ,defaultValue:'owner'}
  declare owner: string;
  @attr('string')
  declare city: string;
  @attr('string')
  declare category: string;
  @attr('string')
  declare image: string;
  @attr('number')
  declare bedrooms: number;
  @attr('string')
  declare description: string;

  get type() {
    if (COMMUNITY_CATEGORIES.includes(this.category)) {
      return 'Community';
    } else {
      return 'Standalone';
    }
  }

  static modelName = 'rentals';
}
