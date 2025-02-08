import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { Info } from "./Info";
import { Input } from "./Input";
import { Messages } from "./Messages";
import completeCss from "./Complete.module.css";
import ScrollToBottom from "react-scroll-to-bottom";
export const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const ENDPOINT = "https://chat-app-uasl.onrender.com";

  // Initialize the socket connection outside the useEffect
  const socket = useMemo(() => io(ENDPOINT), [ENDPOINT]);

  useEffect(() => {
    // Parse the URL query string to get the room and name
    const myData=JSON.parse(localStorage.getItem("myData"));
    const {name,room}=myData;
    console.log(myData,"from locals torage");
    setName(myData.name);
    setRoom(myData.room);

    // Emit 'join' event to server after joining the room
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        console.log("Error:", error);
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off();
    };
  }, [location.search, socket]);

  useEffect(() => {
    // Listen for 'message' events from the server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]); // Use functional state update to avoid stale messages
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);
  useEffect(() => {
    socket.emit("userInRoom", { room: room });
    socket.on("allUsers", (users) => {
      setAllUsers(users);
        // const size=users.size();
    });
  }, [room, socket]);
  useEffect(()=>{
    console.log(allUsers)
    let size=0;
    allUsers.map((ele)=>size++);
    setUserCount(size)
  },[allUsers])
  // Handle sending messages to the server
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(message, messages, allUsers);
  return (
    <>
      <div className={completeCss.outerContainer}>
        <div className={completeCss.allUsers}>
          <div>Online Users {userCount}</div>
          <ScrollToBottom>
          {allUsers.map((ele, idx) => {
              return <div key={idx} className={completeCss.eachUser}>{ele.name}</div>;
            })}
        </ScrollToBottom>
        </div>
        <div className={completeCss.container}>
          <Info room={room} />
          <Messages messages={messages} name={name}></Messages>
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          ></Input>
        </div>
      </div>
    </>
  );
};
