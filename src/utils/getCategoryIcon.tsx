import { ReactNode } from "react";
import { IoIosRestaurant } from "react-icons/io";
import { SiBuymeacoffee } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { GiTheater } from "react-icons/gi";
import { FaHotel } from "react-icons/fa";
import { MdOutlineDirectionsBus } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";

export const getCategoryIcon = (category: string) : ReactNode => {
    switch (category) {
      case "식당":
        return <IoIosRestaurant />
      case "카페":
        return <SiBuymeacoffee />
      case "쇼핑":
        return  <FaShoppingCart />
      case "문화생활":
        return  <GiTheater />
      case "숙박":
        return  <FaHotel />
      case "교통":
        return  <MdOutlineDirectionsBus />
      case "기타":
        return  <TbCategoryPlus />
    }
  };