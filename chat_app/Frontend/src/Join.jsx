import { useState } from "react";
import joinCss from "./joinCss.module.css";
import { io } from "socket.io-client";
import { NavLink } from "react-router-dom";

export const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <>
      <div className={joinCss.joinOuter}>
        <div className={joinCss.joinInner}>
        <h1 className={joinCss.heading}>Join</h1>
            <div><input type="text" placeholder="Name" onChange={(event)=>setName(event.target.value)} className={joinCss.input} id="" /></div>
            <div><input type="text" placeholder="Room" onChange={(event)=>setRoom(event.target.value)} className={joinCss.input} id="" /></div>
            <NavLink to={name&&room?`/chat?name=${name}&room=${room}`:'/'}>
                    <button type="submit">button</button>
            </NavLink>
        </div>
      </div>
    </>
  );
};
