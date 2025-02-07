import { Message } from "./Message";
import messageCss from './Messages.module.css'
import ScrollToBottom from "react-scroll-to-bottom";
export  const Messages=({messages,name})=>{
    console.log(messages);
    return (
        <>
            <ScrollToBottom className={messageCss.completeMessages}>
            {
                messages.map((ele,idx)=>{
                    return <div key={idx}>
                        <Message name={name} message={ele}></Message>
                    </div>
                })
            }
        </ScrollToBottom>
        </>
    );
}