import Rental from 'super-rentals/models/rental';
export default function sortByProperty(property: string, descending: boolean) {
  return function (a: any, b: any) {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return descending ? -result : result;
  };
}
