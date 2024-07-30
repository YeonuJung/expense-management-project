import "./Appbar.scss"
import Avatar from "../../Atoms/Avatar/Avatar"
import { HiSearch, HiBell } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";

function Appbar() {
  return (
    <div className='appBar__container'>
            <ul className='appBar__icon-container'>
                <li className='appBar__icon'><HiSearch/></li>
                <li className='appBar__icon'><BsPeopleFill /></li>
                <li className='appBar__icon'><HiBell /></li>
                <li className='appBar__icon'><IoIosSettings /></li>
                <li className='appBar__avatar'><Avatar shape='circular' type='img'/></li>
            </ul>
        </div>
  )
}

export default Appbar
