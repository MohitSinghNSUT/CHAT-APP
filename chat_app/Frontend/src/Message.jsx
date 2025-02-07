import messageCss from "./Message.module.css";
export const Message = ({ name, message: { user, text } }) => {
  let sentByMe = 0;
  if (user == name) sentByMe = 1;
  if (sentByMe) {
    return (
      <>
        <div className={messageCss.currentUser}>
                <p className={messageCss.text}>{text}</p>
          <p className={messageCss.sentName}> Sent-By: {user}</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={messageCss.otherUser}>
                <p className={messageCss.text}>{text}</p>
          <p className={messageCss.sentName}>Sent-By:{user}</p>
        </div>
      </>
    );
  }
};
