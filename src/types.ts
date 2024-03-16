export type ImageProps = {
  data: {
    id: string;
    attributes: {
      width: number;
      height: number;
      name: string;
      url: string;
    };
  };
};
export type CategoryProps = {
  id: string;
  attributes: {
    name: string;
    whiteIcon: ImageProps;
    blackIcon: ImageProps;
    position: number;
    categories: {
      data: {
        id: string;
        attributes: {
          name: string;
          position: number;
        };
      }[];
    };
  };
};
export type MultiImageProps = {
  id: string;
  attributes: {
    width: number;
    height: number;
    name: string;
    url: string;
  };
};

export type ProductDetailsProps = {
  name: string;
  value: string;
  id: string;
};
export type ProductProps = {
  id: string;
  attributes: {
    category: {
      data: CategoryProps;
    };
    details: ProductDetailsProps[];
    images: {
      data: MultiImageProps[];
    };
    content: string;
    name: string;
    description: string;
    price: number;
    promotion: number;
  };
};
