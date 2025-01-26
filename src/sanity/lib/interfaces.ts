
export interface ICategory {
  _id: string; 
  name: string;
  imageUrl: string; 
  available: boolean; 
}

export interface IFood {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  available: boolean;
  slug: { current: string };
}

export interface ICategoryWithFoods {
  _id: string;
  name: string;
  imageUrl: string;
  available: boolean;
  foods: IFood[];
}

export interface IFoodItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  mainImageUrl: string;
  images: string[];
  slug: { current: string };
}

export interface IFood {
  _id: string;
  name: string;
  price: number;
  rating: number;
  tags: string[];
  description :string;

  slug:{current:string};
  imageUrl: string;
}

export interface ICategory {
  _id: string
  name: string
  imageUrl: string
  available: boolean
  price:number
  tags: string[];
  slug:{current:string};
  description :string;
  rating: number;
  foods: IFood[]
}

export interface ICategoryWithFoods extends ICategory {
  foods: IFood[]
}

export enum SortOption {
  AZ = "az",
  ZA = "za",
  LowHigh = "lowhigh",
  HighLow = "highlow",
}
