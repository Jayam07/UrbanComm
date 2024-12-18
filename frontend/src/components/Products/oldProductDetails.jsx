// import React, { useEffect, useState } from "react";
// import {
//   AiFillHeart,
//   AiOutlineHeart,
//   AiOutlineMessage,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
// import { server } from "c:/Users/HP/Downloads/Eshop-tutorial-master/frontend/src/server";
// import styles from "../../styles/styles";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../redux/actions/wishlist";
// import { addTocart } from "../../redux/actions/cart";
// import { toast } from "react-toastify";
// import Ratings from "./Ratings";
// import axios from "axios";

// const ProductDetails = ({ data }) => {
//   const [count, setCount] = useState(1);
//   const [click, setClick] = useState(false);
//   const [select, setSelect] = useState(0);
//   const navigate = useNavigate();

//   const incrementCount = () => {
//     setCount(count + 1);
//   };

//   const decrementCount = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };

//   const handleMessageSubmit = async () => {
//     navigate("/inbox?conversation=507ebjverfty898yghji")
//   };

//   const handleImageClick = (index) => {
//     setSelect(index);
//   };

//   return (
//     <div className="bg-white">
//       {data ? (
//         <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
//           <div className="w-full py-5">
//             <div className="block w-full 800px:flex">
//               <div className="w-full 800px:w-[50%]">
//                 <img
//                   // src={data.image_Url[select].url} 
//                   alt="" className="w-[80]" />
//                 <div className="w-full flex">
//                   <div
//                     className={`${select === 0 ? "border" : ""} cursor-pointer`}
//                     onClick={() => handleImageClick(0)}
//                   >
//                     <img 
//                     // src={data?.image_Url[0].url} 
//                     src={`http://localhost:3500/user/${data.images && data.images[0]}`}
//                     alt="" className="w-[80%]" />
//                   </div>
//                   <div
//                     className={`${select === 1 ? "border" : ""} cursor-pointer`}
//                     onClick={() => handleImageClick(1)}
//                   >
//                     <img
//                     src={`http://localhost:3500/user/${data.images && data.images[0]}`}
//                      alt="" className="w-[80%]" />
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full 800px:w-[50%] pt-5">
//                 <h1 className={`${styles.productTitle}`}>{data.name}</h1>
//                 <p>{data.description}</p>
//                 <div className="flex pt-3">
//                   <h4 className={`${styles.productDiscountPrice}`}>{data.discountPrice} $</h4>
//                   <h3 className={`${styles.price}`}>{data.originalPrice ? data.originalPrice + "$" : null}</h3>
//                 </div>
//                 <div className="flex items-center mt-12 justify-between pr-3">
//                   <div>
//                     <button
//                       className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
//                       onClick={decrementCount}
//                     >
//                       -
//                     </button>
//                     <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
//                       {count}
//                     </span>
//                     <button
//                       className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
//                       onClick={incrementCount}
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div>
//                     {click ? (
//                       <AiFillHeart
//                         size={30}
//                         className="cursor-pointer"
//                         onClick={() => setClick(!click)}
//                         color={click ? "red" : "#333"}
//                         title="Remove from wishlist"
//                       />
//                     ) : (
//                       <AiOutlineHeart
//                         size={30}
//                         className="cursor-pointer"
//                         onClick={() => setClick(!click)}
//                         title="Add to wishlist"
//                       />
//                     )}
//                   </div>
//                 </div>
//                 <div className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}>
//                   <span className="text-white flex items-center">
//                     Add to Cart <AiOutlineShoppingCart className="ml-1" />
//                   </span>
//                 </div>

//                 <div className="flex items-center pt-8">
//                   <img 
//                   src={`http://localhost:3500/user/${data?.shop?.avatar}`}

//                   alt="" className="w-[50px] h-[50px] rounded-full mr-2" />
//                   <div className="pr-8">
//                     <h3 className={`${styles.shop_name} pb-1 pt-1`}>
//                       {data.shop.name}
//                     </h3>
//                     <h5 className="pb-3 text-[15px]">
//                       (4/5) Ratings
//                     </h5>
//                   </div>
//                   <div onClick={handleMessageSubmit} className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}>
//                     <span className="text-white flex items-center">
//                       Send Message <AiOutlineMessage className="ml-1" />
//                     </span>
//                   </div>
//                   <div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <ProductDetailsInfo
//             data={data}
//           />
//           <br />
//           <br />
//         </div>
//       ) : null}
//     </div>
//   );
// };

// const ProductDetailsInfo = ({
//   data
// }) => {
//   const [active, setActive] = useState(1);

//   return (
//     <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
//       <div className="w-full flex justify-between border-b pt-10 pb-2">
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(1)}
//           >
//             Product Details
//           </h5>
//           {active === 1 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(2)}
//           >
//             Product Reviews
//           </h5>
//           {active === 2 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(3)}
//           >
//             Seller Information
//           </h5>
//           {active === 3 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//       </div>
//       {active === 1 ? (
//         <>
//           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//           </p>
//           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//           </p>
//           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//             5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//           </p>
//         </>
//       ) : null}

//       {active === 2 ? (
//         <div className="w-full items-center min-h-[40vh] flex justify-center">
//           <h5>No Reviews YET</h5>
//         </div>
//       ) : null}

//       {active === 3 && (
//         <div className="w-full block 800px:flex p-5">
//           <div className="w-full 800px:w-[50%]">
//             <div className="flex items-center">
//               <img
//                 src={data.shop.shop_avatar.url}
//                 className="w-[50px] h-[50px] rounded-full"
//                 alt=""
//               />
//               <div className="pl-3">
//                 <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
//                 <h5 className="pb-2 text-[15px]">
//                   ({data.shop.ratings}) Ratings
//                 </h5>
//               </div>
//             </div>
//             <p className="pt-2">
//               5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//               5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//               5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//               5aMKlyJTXWAuIJGIUGosRJTkjb1kjnTVQhCiPnodKckzLR4iUnoku3Jm2gujepaUSAkQISIMIsZdhfipAI4
//             </p>
//           </div>

//           <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
//             <div className="text-left">
//               <h5 className="font-[600]">
//                 Joined on:{" "}
//                 <span className="font-[500]">
//                   14 March,2023
//                 </span>
//               </h5>
//               <h5 className="font-[600] pt-3">
//                 Total Products:{" "}
//                 <span className="font-[500]">
//                   1000
//                 </span>
//               </h5>
//               <h5 className="font-[600] pt-3">
//                 Total Reviews:{" "}
//                 <span className="font-[500]">111</span>
//               </h5>
//               <Link to="/">
//                 <div
//                   className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
//                 >
//                   <h4 className="text-white">Visit Shop</h4>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;
