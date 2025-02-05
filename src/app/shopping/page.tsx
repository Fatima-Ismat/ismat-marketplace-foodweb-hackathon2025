"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Product = {
  stock: number;
  _id: string;
  title: string;
  price: number; // Price stored as a number
  description: string;
  imageUrl: string;
  quantity: number;
};

const Cart = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // ✅ Remove duplicate `_id` entries
    const uniqueCart = Array.from(new Map(storedCart.map(item => [item._id, item])).values());

    const sanitizedCart = uniqueCart.map((product: Product) => ({
      ...product,
      price: typeof product.price === "string" ? parseFloat(product.price) : product.price || 0,
      quantity: Math.max(product.quantity, 1),
    }));

    setCart(sanitizedCart);
    setLoading(false);
  }, []);


  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.stock || 1)), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal(); // Add any additional charges if necessary
  };

  const removeItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const updateQuantity = (
    productId: string,
    operation: "increment" | "decrement"
  ) => {
    const updatedCart = cart.map((product) => {
      if (product._id === productId) {
        const newQuantity =
          operation === "increment"
            ? product.quantity + 1
            : product.quantity > 1
              ? product.quantity - 1
              : 1;
        return {
          ...product,
          quantity: newQuantity,
        };
      }
      return product;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const calculateTotalPrice = (product: Product) => {
    const price = product.price;
    return price * product.quantity;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + calculateTotalPrice(item),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 flex justify-center items-center">
      <div className="max-w-6xl w-full px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-gray-800 mb-8">
          Your Shopping Cart
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          </div>
        ) : cart.length === 0 ? (
          <p className="text-center text-xl sm:text-2xl text-gray-600">
            Your cart is currently empty. Start shopping now!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row items-center bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-all duration-300"
              >
                
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={1000}
                  height={1000}
                  className="w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
                />
                <div className="flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm my-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-[blue-600]">
                    ${product.price.toFixed(2)}
                  </p>
                  {/* <p>{calculateSubtotal()} </p>
                  <p>{calculateTotal()} </p> */}

                  {/* Quantity Control Section */}
                  <div className="flex justify-center items-center mt-4 space-x-4 mb-4">
                    <button
                      onClick={() => updateQuantity(product._id, "decrement")}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product._id, "increment")}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <p className="text-lg font-bold text-gray-800">
                      Total: ${calculateTotalPrice(product).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <button
                    onClick={() => removeItem(product._id)}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cart Summary Section */}
        <div className="mt-12 sm:mt-8 text-center flex flex-col items-center">
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Total Items: <span className="text-[#FF9F0D]">{""}</span>
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Cart Total:{" "}
            <span className="text-[#FF9F0D]">${cartTotal.toFixed(2)}</span>
          </p>
          <button className="bg-[#FF9F0D] text-white py-3 px-12 rounded-full text-lg font-medium shadow-lg hover:bg-[#9b5f05] transition">
            <Link href="/checkout">Proceed to Checkout</Link>
          </button>
          
        </div>
      </div>
    </div>
  );
};


export default Cart;


// // "use client";

// // import React, { useState } from "react";
// // import Image from "next/image"; // Import the Image component

// // const initialCartItems = [
// //   { name: "Burger", price: 10.99, quantity: 2, image: "/product_img.png" },
// //   {
// //     name: "Fresh Lime",
// //     price: 3.49,
// //     quantity: 1,
// //     image: "/product_img (1).png",
// //   },
// //   { name: "Pizza", price: 9.99, quantity: 4, image: "/product_img (2).png" },
// //   {
// //     name: "Chocolate Muffin",
// //     price: 4.49,
// //     quantity: 1,
// //     image: "/product_img (3).png",
// //   },
// //   {
// //     name: "Cheese Butter",
// //     price: 11.99,
// //     quantity: 3,
// //     image: "/product_img (4).png",
// //   },
// // ];

// // const ShoppingCart: React.FC = () => {
// //   const [cartItems, setCartItems] = useState(initialCartItems);
// //   const [couponCode, setCouponCode] = useState("");
// //   const [discount, setDiscount] = useState(0);

// //   const handleQuantityChange = (index: number, newQuantity: number) => {
// //     const updatedItems = cartItems.map((item, i) =>
// //       i === index ? { ...item, quantity: newQuantity } : item
// //     );
// //     setCartItems(updatedItems);
// //   };

// //   const handleRemoveItem = (index: number) => {
// //     setCartItems(cartItems.filter((_, i) => i !== index));
// //   };

// //   const handleApplyCoupon = () => {
// //     if (couponCode === "DISCOUNT10") {
// //       setDiscount(0.1); // 10% discount
// //     } else {
// //       setDiscount(0);
// //     }
// //   };

// //   const cartSubtotal = cartItems.reduce(
// //     (sum, item) => sum + item.price * item.quantity,
// //     0
// //   );
// //   const shippingCharges = 30.0;
// //   const totalAmount = cartSubtotal - cartSubtotal * discount + shippingCharges;

// //   return (
// //     <div className="pt-[115px] lg:pt-0 bg-white font-sans text-black">
// //       {/* Background Section */}
// //       <div
// //         className="w-full bg-no-repeat bg-center flex justify-center h-[300px]"
// //         style={{
// //           backgroundImage: "url('/unsplash.png')",
// //           // backgroundSize: "cover",
// //           // backgroundPosition: "center top",
// //           // height: "300px",
// //         }}
// //       >
// //         {/* Header Section */}
// //         <div className="max-w-[1320px] mx-auto px-[20px] lg:px-[60px]  flex flex-col justify-center items-center text-white text-center py-16">
// //           <p className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
// //             Shopping Cart
// //           </p>
// //           <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
// //             <a href="home" className="text-xl sm:text-2xl md:text-3xl">
// //               Home
// //             </a>
// //             <div className="flex items-center">
// //               <Image
// //                 src="/Vector.png"
// //                 width={10}
// //                 height={10}
// //                 alt="Vector Icon"
// //               />
// //               <a
// //                 href="shopping"
// //                 className="ml-2 text-xl sm:text-2xl md:text-3xl text-[#FF9F0D]"
// //               >
// //                 Shopping cart
// //               </a>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <main className="max-w-[1320px] mx-auto py-12 px-6 md:px-16 lg:px-28">
// //   <div className="overflow-x-auto">
// //     <table className="w-full border-collapse">
// //       <thead>
// //         <tr className="bg-gray-100 text-left">
// //           <th className="p-4 font-semibold">Product</th>
// //           <th className="p-4 font-semibold">Price</th>
// //           <th className="p-4 font-semibold">Quantity</th>
// //           <th className="p-4 font-semibold">Total</th>
// //           <th className="p-4 font-semibold">Remove</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {cartItems.map((item, index) => (
// //           <tr key={index} className="border-b">
// //             <td className="p-4 flex items-center">
// //               {/* Using Image component for optimized image loading */}
// //               <Image
// //                 src={item.image}
// //                 alt={item.name}
// //                 width={64} // Specify width
// //                 height={64} // Specify height
// //                 className="object-cover rounded mr-4"
// //               />
// //               <span>{item.name}</span>
// //             </td>
// //             <td className="p-4">${item.price.toFixed(2)}</td>
// //             <td className="p-4">
// //               <input
// //                 type="number"
// //                 value={item.quantity}
// //                 onChange={(e) =>
// //                   handleQuantityChange(index, parseInt(e.target.value) || 0)
// //                 }
// //                 className="w-16 border rounded px-2 py-1 text-center"
// //                 min="0"
// //               />
// //             </td>
// //             <td className="p-4">
// //               ${(item.price * item.quantity).toFixed(2)}
// //             </td>
// //             <td
// //               className="p-4 text-red-500 cursor-pointer"
// //               onClick={() => handleRemoveItem(index)}
// //             >
// //               &times;
// //             </td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   </div>

// //   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-10">
// //     <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
// //       <h2 className="text-lg font-semibold mb-2">Coupon Code</h2>
// //       <div className="flex items-center flex-col sm:flex-row">
// //         <input
// //           type="text"
// //           value={couponCode}
// //           onChange={(e) => setCouponCode(e.target.value)}
// //           placeholder="Enter your code"
// //           className="flex-grow border rounded-l px-4 py-2"
// //         />
// //         <button
// //           onClick={handleApplyCoupon}
// //           className="bg-orange-500 text-white px-6 py-2 rounded-r font-semibold"
// //         >
// //           Apply
// //         </button>
// //       </div>
// //     </div>

// //     <div className="w-full lg:w-1/3">
// //       <div className="bg-gray-100 p-6 rounded-lg">
// //         <div className="flex justify-between mb-4">
// //           <span>Cart Subtotal</span>
// //           <span>${cartSubtotal.toFixed(2)}</span>
// //         </div>
// //         <div className="flex justify-between mb-4">
// //           <span>Discount</span>
// //           <span>${(cartSubtotal * discount).toFixed(2)}</span>
// //         </div>
// //         <div className="flex justify-between mb-4">
// //           <span>Shipping Charges</span>
// //           <span>${shippingCharges.toFixed(2)}</span>
// //         </div>
// //         <div className="flex justify-between font-semibold text-lg">
// //           <span>Total Amount</span>
// //           <span>${totalAmount.toFixed(2)}</span>
// //         </div>
// //         <button className="w-full bg-orange-500 text-white mt-4 py-3 rounded font-semibold">
// //           <a
// //             href="/checkout"
// //             className="w-[100%] block"
// //           >
// //             Proceed to Checkout
// //           </a>
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // </main>

// //     </div>
// //   );
// // };

// // export default ShoppingCart;




// "use client"; // Next.js client-side component

// import { urlFor } from '@/sanity/lib/image';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';

// interface IFoodItem {
//   _id: string;
//   name: string;
//   price: number;
//   stock: number;
//   // Add other necessary fields
//   image: {
//     _type: 'image';
//     asset: {
//       _type: 'reference';
//       _ref: string;
//     };
//   };
// }

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState<IFoodItem[]>([]);

//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartItems(items);
//   }, []);

//   const calculateSubtotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * (item.stock || 1)), 0);
//   };

//   const calculateTotal = () => {
//     return calculateSubtotal(); // Add any additional charges if necessary
//   };

//   return (
//     <div className="max-w-[1320px] pt-[150px] mx-auto py-[20px] lg:py-[50px] px-[20px] lg:px-[60px] text-black body-font bg-white">
//       <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
//       {cartItems.length > 0 ? (
//         <div>
//           {cartItems.map((item) => (
//             <div key={item._id} className="border-b py-4">
             
//               <h2 className="text-xl font-semibold">{item.name}</h2>
//               <p className="text-gray-700">Price: ${item.price}</p>
//               <p className="text-gray-700">Quantity: {item.stock || 1}</p>
//             </div>
//           ))}
//           <div className="mt-8">
//             <p className="text-xl font-semibold">Subtotal: ${calculateSubtotal()}</p>
//             <p className="text-xl font-semibold">Total: ${calculateTotal()}</p>
//             <button className="bg-[#FF9F0D] text-white px-4 py-2 rounded mt-4">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default CartPage;