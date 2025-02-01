"use client"; // Next.js client-side component

import { useState, useEffect } from "react";
import { IFoodItem } from "@/sanity/lib/interfaces";

export default function CartPage() {
  const [cart, setCart] = useState<IFoodItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="max-w-[1320px] mx-auto py-[20px] px-[20px] lg:px-[60px]">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="border p-4 mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl">{item.name}</h2>
                <p>{item.price}$</p>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="bg-gray-800 text-white px-4 py-2 mt-4 rounded" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}


// "use client";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// type Product = {
//   _id: string;
//   title: string;
//   price: number; // Price stored as a number
//   description: string;
//   imageUrl: string;
//   quantity: number;
// };

// const Cart = () => {
//   const [cart, setCart] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const sanitizedCart = storedCart.map((product: Product) => ({
//       ...product,
//       price:
//         typeof product.price === "string"
//           ? parseFloat(product.price)
//           : product.price || 0, // Ensure price is a valid number
//       quantity: Math.max(product.quantity, 1), // Ensure quantity is at least 1
//     }));
//     setCart(sanitizedCart);
//     setLoading(false);
//   }, []);

//   const removeItem = (productId: string) => {
//     const updatedCart = cart.filter((item) => item._id !== productId);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     setCart(updatedCart);
//   };

//   const updateQuantity = (
//     productId: string,
//     operation: "increment" | "decrement"
//   ) => {
//     const updatedCart = cart.map((product) => {
//       if (product._id === productId) {
//         const newQuantity =
//           operation === "increment"
//             ? product.quantity + 1
//             : product.quantity > 1
//               ? product.quantity - 1
//               : 1;
//         return {
//           ...product,
//           quantity: newQuantity,
//         };
//       }
//       return product;
//     });

//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     setCart(updatedCart);
//   };

//   const calculateTotalPrice = (product: Product) => {
//     const price = product.price;
//     return price * product.quantity;
//   };

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//   const cartTotal = cart.reduce(
//     (sum, item) => sum + calculateTotalPrice(item),
//     0
//   );

//   const addToCart = (product: Product) => {
//     const existingProduct = cart.find((item) => item._id === product._id);
//     let updatedCart;
//     if (existingProduct) {
//       updatedCart = cart.map((item) =>
//         item._id === product._id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//     } else {
//       updatedCart = [...cart, { ...product, quantity: 1 }];
//     }
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     setCart(updatedCart);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 flex justify-center items-center">
//       <div className="max-w-6xl w-full px-4">
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-gray-800 mb-8">
//           Your Shopping Cart
//         </h1>

//         {loading ? (
//           <div className="flex justify-center items-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
//           </div>
//         ) : cart.length === 0 ? (
//           <p className="text-center text-xl sm:text-2xl text-gray-600">
//             Your cart is currently empty. Start shopping now!
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
//             {cart.map((product) => (
//               <div
//                 key={product._id}
//                 className="flex flex-col sm:flex-row items-center bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-all duration-300"
//               >
//                 <img
//                   src={product.imageUrl}
//                   alt={product.title}
//                   className="w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
//                 />
//                 <div className="flex-grow">
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
//                     {product.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm my-2">
//                     {product.description}
//                   </p>
//                   <p className="text-lg font-bold text-[blue-600]">
//                     ${product.price.toFixed(2)}
//                   </p>

//                   {/* Quantity Control Section */}
//                   <div className="flex justify-center items-center mt-4 space-x-4 mb-4">
//                     <button
//                       onClick={() => updateQuantity(product._id, "decrement")}
//                       className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300 transition"
//                     >
//                       -
//                     </button>
//                     <span className="text-lg font-semibold">
//                       {product.quantity}
//                     </span>
//                     <button
//                       onClick={() => updateQuantity(product._id, "increment")}
//                       className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300 transition"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <div className="flex justify-center">
//                     <p className="text-lg font-bold text-gray-800">
//                       Total: ${calculateTotalPrice(product).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="ml-6 text-right">
//                   <button
//                     onClick={() => removeItem(product._id)}
//                     className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Cart Summary Section */}
//         <div className="mt-12 sm:mt-8 text-center flex flex-col items-center">
//           <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
//             Total Items: <span className="text-[#FF9F0D]">{totalItems}</span>
//           </p>
//           <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
//             Cart Total:{" "}
//             <span className="text-[#FF9F0D]">${cartTotal.toFixed(2)}</span>
//           </p>
//           <button className="bg-[#FF9F0D] text-white py-3 px-12 rounded-full text-lg font-medium shadow-lg hover:bg-[#9b5f05] transition">
//             <Link href="/checkout">Proceed to Checkout</Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;