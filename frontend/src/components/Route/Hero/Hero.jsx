import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> Various Categories
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Discover a world of endless possibilities at our online store, where every<br></br>
          click unveils a treasure trove of products designed to elevate your lifestyle.<br></br>
          From cutting-edge electronics to timeless fashion pieces, and from exquisite home<br></br>
          decor to essential everyday items, we curate a diverse collection to cater to your every need.
          <br></br>

        </p>
        <Link to="/nearByShop" className="inline-block">
          <div className={`${styles.button} mt-5`} style={{ width: "240px", height: "50px" }}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Find Shops By Location
            </span>
          </div>

        </Link>
      </div>
    </div>
  );
};

export default Hero;
