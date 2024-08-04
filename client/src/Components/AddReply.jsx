import { useState } from "react";
import {toast} from "react-toastify";


const URL = import.meta.env.VITE_BACKEND_URL+"/api/upload/reply";

export const AddReply = ({questionData}) => {
    console.log(questionData);
    const [reply, setReply] = useState({
        "_id": Math.random().toString(36),
        "question": questionData,
        "answer": "",
        "timestamp": Date.now().toString()
    });
    
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setReply({
            ...reply,
            "question": questionData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reply),
            });
            if(response.ok){
                console.log(reply);
                toast.success("Reply Successfully Added");
            }
        }catch(error){
            console.log(error);
        }
    };

    return(
        <>
        <div className="reply-box">
            <form onSubmit={handleSubmit}>
            <label htmlFor="answer">Enter the Answer: </label>
            <textarea name="answer" placeholder="Enter Answer here.. or leave blank" id="answer" required autoComplete="off" value={reply.answer} onChange={handleInput} />
            <br/>
            <button type="submit"  className="btn btn-submit" >Submit Reply</button>
            </form>
        </div>

        </>
    );
}