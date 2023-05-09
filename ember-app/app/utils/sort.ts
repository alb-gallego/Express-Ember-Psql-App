import Rental from 'super-rentals/models/rental';

export default function sortByProperty(property: string, descending: boolean) {
  return function (a: any, b: any) {
    const aValue =
      property === 'title' ? a[property].toLowerCase() : a[property];
    const bValue =
      property === 'title' ? b[property].toLowerCase() : b[property];

    const result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;

    return descending ? -result : result;
  };
}
