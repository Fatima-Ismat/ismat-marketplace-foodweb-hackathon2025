export interface Product {
     length: any;
     reduce(arg0: (sum: any, order: any) => any, arg1: number): unknown;
     _id: string;
     _type: 'food';
     name: string;
     image?: {
       _type: 'image';
       asset: {
         _type: 'reference';
         _ref: string;
       };
     };
     
     price: number;
     originalPrice: number;
     rating: number;
     available: string;
     reviews: number;
     description: string;
     tags: string[];
     sizes: string[];
     stock: number;
     category: string;
     slug: {
       _type: 'slug';
       current: string;
     };
     quantity: number; // Add this line
 }
 