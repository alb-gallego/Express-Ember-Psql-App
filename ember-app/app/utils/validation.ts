export default function checkErrors(formValues: any) {
  let arrErrors: Map<String, String> = new Map();

  for (let key in formValues) {
    if (
      formValues[key] !== null &&
      formValues[key] !== undefined &&
      formValues[key] !== ''
    ) {
      if (key === 'bedrooms' && parseInt(formValues['bedrooms']) <= 0) {
        console.log('Fallo en bedrooms');

        const message: string = `The number of ${key} must be greater than 0`;
        if (arrErrors.get(key) !== message) {
          arrErrors.set(key, message);
        }
      } else if (
        formValues[key].length < 5 &&
        key !== 'bedrooms' &&
        key !== 'image'
      ) {
        console.log('Hola');

        arrErrors.set(key, `The ${key} length must be greater than 5`);
        console.log(arrErrors);
      }
    } else {
      arrErrors.set(key, `The ${key} cant be empty`);
      console.log(arrErrors);
    }
  }
  // If there are errors, return the array of error messages
  if (arrErrors.size > 0) {
    console.log(arrErrors);
    const res = {
      image: arrErrors.get('image'),
      title: arrErrors.get('title'),
      owner: arrErrors.get('owner'),
      city: arrErrors.get('city'),
      description: arrErrors.get('description'),
      bedrooms: arrErrors.get('bedrooms'),
      category: arrErrors.get('category'),
    };
    console.log(res);

    return res;
  } else {
    // Return an empty array if there are no errors
    return {};
  }
}
