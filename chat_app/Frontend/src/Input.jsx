import inputCss from './Input.module.css'
export const Input = ({ message, setMessage, sendMessage }) => {
    console.log(message,setMessage);
    return (
        <> 
        <form>
        <input type="text" placeholder="Type a message..." value={message} onChange={(e)=>setMessage(e.target.value)} className={inputCss.input} />
                <button type="submit" onClick={sendMessage} className={inputCss.btn}>SEND</button>
        </form>
        </>
    );
};
