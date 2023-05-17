import RentalJSON from 'super-rentals/interfaces/rentalJSON';

export default function sortByProperty(property: string, descending: boolean) {
  return function (a: RentalJSON, b: RentalJSON) {
    const aValue =
      property === 'title'
        ? (a.attributes.title || '').toLowerCase()
        : a.attributes.title;
    const bValue =
      property === 'title'
        ? (b.attributes.title || '').toLowerCase()
        : b.attributes.title;

    const result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;

    return descending ? -result : result;
  };
}
