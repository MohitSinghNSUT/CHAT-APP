import { GoDotFill } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import infoCss from "./Info.module.css";
export const Info = (param) => {
  console.log(param);
  return (
    <>
      <div className={infoCss.Info}>
        <div className={infoCss.Online}>
          <GoDotFill size={30} color="green" />
          <p>
          {param.room}
          </p>
        </div>
        <div>
          <NavLink to="/">
            <IoIosClose size={30} color="white"/>
          </NavLink>
        </div>
      </div>
    </>
  );
};
