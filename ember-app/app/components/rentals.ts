import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class RentalsComponent extends Component {
  @tracked query = '';
  @tracked sort = '';

  @action
  sortBy(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLSelectElement;
    this.sort = form.value.toString();
    return this.sort;
  }
}
