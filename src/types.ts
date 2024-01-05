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
    icon: string;
    position: number;
  };
};
export type ProductProps = {
  id: string;
  attributes: {
    category: {
      data: CategoryProps;
    };
    image: ImageProps;
    name: string;
    description: string;
    price: number;
    promotion: number;
  };
};
