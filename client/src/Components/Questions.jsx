import { AddReply } from "./AddReply";
import { useState } from "react";

export const Questions = ({element}) => {
    const [renderReply, setRenderReply] = useState(false);
    const {user, question, answer, answers} = element;

    const handleRender = () => {
        renderReply ? setRenderReply(false) : setRenderReply(true);
    } 
    
        return (
            <>
            <div className="questions-box">
                <h1>: {user.username}</h1>
                {question ? <h1>question: {question}</h1> : <></>}
                <h1>Answer: {answer}</h1>
                <button type="input" className="btn btn-submit" onClick={handleRender}>Reply</button>
        <       button type="input" className="btn btn-submit" >Delete</button>
                {
                    renderReply ?
                    <><AddReply questionData={element}/></> : <></>
                }
            </div>
            {
                answers.map((curComment, key) => {
                    return(
                        <div className="question-box" key={key}> 
                            <Questions element={curComment} />
                        </div>  
                    );
                })
            }
            </>
        );
};