import JSONAPISerializer from '@ember-data/serializer/json-api';


export default class PostSerializer extends JSONAPISerializer {
  serialize(snapshot, options) {
    let json = super.serialize(...arguments);
    console.log(json);
    json.data= [json.data.attributes];
    delete json.data.attributes;

    return json;
  }};
