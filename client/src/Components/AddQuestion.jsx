import { useState } from "react";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";
import axios from "axios";
import FormData from 'form-data'

const URL = import.meta.env.VITE_BACKEND_URL+"/api/upload/question";

export const AddQuestion = () => {

const {user, setRender} = useAuth();

const [toggle, setToggle] = useState(false);

const [question, setQuestion] = useState({
    "_id": Math.random().toString(36),
    "user": user,
    "question": "",
    "answer": "",
    "timestamp": Date.now().toString()
});

const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setQuestion({
        ...question,
        "user": user,
        [name]: value,
    });
};

const [file, setFile] = useState();
    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/upload/images/", formData);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const togglefn = () => {
        toggle ? setToggle(false) : setToggle(true);
        console.log(toggle);
    }

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(URL,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(question),
        });
        if(response.ok){
            console.log(question);
            setToggle(false);
            setRender(true);
            setRender(false);
            toast.success("Question Successfully Added");
        }
    }catch(error){
        console.log(error);
    }
};

    return(
        <>
        <button type="button" className="btn btn-toggle" onClick={togglefn}>Add Question</button>
            {
                toggle ? <><div className="question-form">
                <h3>Add Question</h3>
                    <div>
                        <label>Username : {user.username}</label>
                    </div>
                <form onSubmit={handleSubmit}>
                <div className="question-heading">
                    <div>
                        <label htmlFor="email">EMail: </label>
                        <input type="email" name="email" id="email" required autoComplete="off" value={user.email} disabled/>
                    </div>
                    <div>
                        <label htmlFor="question">Enter the Question: </label>
                        <textarea name="question" placeholder="Enter Question here.." id="question" required autoComplete="off" value={question.question} onChange={handleInput} />
                    </div>
                    <div>
                        <label htmlFor="answer">Enter the Answer: </label>
                        <textarea name="answer" placeholder="Enter Answer here.. or leave blank" id="answer" required autoComplete="off" value={question.answer} onChange={handleInput} />
                    </div>
                    <br/>
                    <button type="submit"  className="btn btn-submit" >Submit Question</button>
                </div>
                <div className="image-container">
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <br/>
                    <button type="button" className="btn btn-submit" onClick={upload}>Upload</button>
                </div>
                </form>
                </div></> : <></>
            }
        </>
    );
}