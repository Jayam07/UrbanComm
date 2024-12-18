// import React from "react";
// import styles from "../../styles/styles";
// import CountDown from "./CountDown";
// // import { Link } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addTocart } from "../../redux/actions/cart";
// // import { toast } from "react-toastify";

// const EventCard = ({active}) => {
//   // const { cart } = useSelector((state) => state.cart);
//   // const dispatch = useDispatch();

//   // const addToCartHandler = (data) => {
//   //   const isItemExists = cart && cart.find((i) => i._id === data._id);
//   //   if (isItemExists) {
//   //     toast.error("Item already in cart!");
//   //   } else {
//   //     if (data.stock < 1) {
//   //       toast.error("Product stock limited!");
//   //     } else {
//   //       const cartData = { ...data, qty: 1 };
//   //       dispatch(addTocart(cartData));
//   //       toast.success("Item added to cart successfully!");
//   //     }
//   //   }
//   // }
//   return (
//     <div
//       className={`w-full block bg-white rounded-lg ${active? "unset" : "mb-12"} lg:flex p-2`}>

//       <div className="w-full lg:-w[50%] m-auto">
//         <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg" alt="img" />
//       </div>

//       <div className="w-full lg:[w-50%] flex flex-col justify-center">
//         <h2 className={`${styles.productTitle}`}>Iphon 14 Pro MAX</h2>
//         <p>
//           QW76aUybHxwbGLiQQn9qrP0LVo8WYMkjc73WvY53wBBP0C2vTiMt4hkE8pNMrD4tLW
//           gH6Eei61R8lZMv9Rs8H7fZW8Ahdk4mbjxQW76aUybHxwbGLiQQn9qrP0LVo8WYMkjc
//           3WvY53wBBP0C2vTiMt4hkE8pNMrD4tLWgH6Eei61R8lZMv9Rs8H7fZW8Ahdk4mbjxQ
//           76aUybHxwbGLiQQn9qrP0LVo8WYMkjc73WvY53wBBP0C2vTiMt4hkE8pNMrD4tLWgH
//         </p>

//         <div className="flex py-2 justify-between">
//           <div className="flex">
//             <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
//               1000$
//             </h5>
//             <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
//               999$
//             </h5>
//           </div>
//           <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
//             110 sold
//           </span>
//         </div>
//         <CountDown />
//         <br />
//       </div>
//     </div>
//   );
// };

// export default EventCard;
