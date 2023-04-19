import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RentalComponent extends Component {
  @tracked flexCol = false;

  @action changeFlex() {
    this.flexCol = !this.flexCol;
  }
}
