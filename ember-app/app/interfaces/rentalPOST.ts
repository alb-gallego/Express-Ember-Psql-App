export default interface rentalPOST {
  data: {
    attributes: {
      title: string | undefined;
      image: string | undefined;
      owner: string | undefined;
      city: string | undefined;
      category: string | undefined;
      bedrooms: string | undefined;
      description: string | undefined;
    };
    type: string;
    id?: number;
  }[];
}
