import JSONAPIAdapter from '@ember-data/adapter/json-api';
import RESTAdapter from '@ember-data/adapter/rest';

export default class ApplicationAdapter extends RESTAdapter{
  host = 'http://localhost:3000';

  //namespace = 'rentals';



}
