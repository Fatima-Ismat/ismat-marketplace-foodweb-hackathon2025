// import { getFoodItemById } from "@/sanity/lib/data";
// import ImageGallery from "@/app/components/imageGallery";
// import { IFoodItem } from "@/sanity/lib/interfaces";

// interface ProductPageProps {
//   params: {
//     slug: string;
//   };
// }

// export default async function FoodDetail({ params }: ProductPageProps) {
//   const { slug } = params; // Get the slug from the URL
//   const foodItem:IFoodItem = await getFoodItemById(slug);
//     console.log(foodItem);
    
//   if (!foodItem) {
//     return <div>Product not found</div>; // Handle invalid slug
//   }

//   return (
//     <div className="max-w-[1320px] pt-[150px]  mx-auto py-[20px] lg:py-[50px] px-[20px] lg:px-[60px] text-black body-font bg-white">
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Image Gallery */}
//         <div>
//           <ImageGallery
//             mainImageUrl={foodItem.mainImageUrl}
//             images={foodItem.images}
//           />
          
          
//         </div>

//         {/* Product Details */}
//         <div>
//         <h1 className="text-3xl font-bold mb-4">{foodItem.name}</h1>
//           <p className="text-gray-700 mb-2"> {foodItem.description}</p>
//           <p className="text-gray-700 mb-2"> {foodItem.price}$</p>
//           <p className="text-gray-700 mb-2"> {foodItem.category}</p>
//           <p className="text-gray-700 mb-2">Remaining Items: {foodItem.stock}</p>
//           <button className="bg-[#FF9F0D] text-white px-4 py-2 rounded">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"; // Next.js client-side component

import { getFoodItemById } from "@/sanity/lib/data";
import ImageGallery from "@/app/components/imageGallery";
import { IFoodItem } from "@/sanity/lib/interfaces";
import { useEffect, useState } from "react";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function FoodDetail({ params }: ProductPageProps) {
  const { slug } = params;
  const [foodItem, setFoodItem] = useState<IFoodItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      const item = await getFoodItemById(slug);
      setFoodItem(item);
    }
    fetchData();
  }, [slug]);

  // const addToCart = (item: IFoodItem) => {
  //   let cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  //   cartItems.push(item);
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  //   alert("Item added to cart!"); // Optional alert
  // };

  const addToCart = (item: IFoodItem) => {
    // Retrieve cart items from localStorage or initialize an empty array
    let cartItems: IFoodItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the item already exists in the cart
    const existingProductIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);

    if (existingProductIndex > -1) {
        // If the item exists, increment its quantity
        cartItems[existingProductIndex].stock = (cartItems[existingProductIndex].stock || 1) + 1;
    } else {
        // If the item doesn't exist, add it to the cart with a quantity of 1
        cartItems.push({ ...item, stock: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert("Cart")
};


  if (!foodItem) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-[1320px] pt-[150px] mx-auto py-[20px] lg:py-[50px] px-[20px] lg:px-[60px] text-black body-font bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <ImageGallery mainImageUrl={foodItem.mainImageUrl} images={foodItem.images} />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{foodItem.name}</h1>
          <p className="text-gray-700 mb-2">{foodItem.description}</p>
          <p className="text-gray-700 mb-2">{foodItem.price}$</p>
          <p className="text-gray-700 mb-2">{foodItem.category}</p>
          <p className="text-gray-700 mb-2">Remaining Items: {foodItem.stock}</p>
          <button
            className="bg-[#FF9F0D] text-white px-4 py-2 rounded"
            onClick={() => addToCart(foodItem)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
