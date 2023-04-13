import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {

  serialize(snapshot, options) {
    let json = super.serialize(...arguments);
    console.log(json);
    json.data = [json.data];

    return json;
  }


}
