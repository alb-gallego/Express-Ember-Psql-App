export default interface RentalJSON {
  type: string;
  id: number;
  attributes: {
    title: string;
    category: string;
    owner: string;
    bedrooms: number;
    description: string;
    image: string;
    'creation-date': Date;
    city: string;
  };
}
