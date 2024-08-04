import { useAuth } from "../store/auth";
import { AddQuestion } from "../Components/AddQuestion";
import { Questions } from "../Components/Questions";
import { useEffect, useState } from "react";

export const Home = () => {

    const { isLoggedIn, user, questions } = useAuth();
    const [render, setRender] = useState(true);
    
    useEffect(() => {
        setRender(false);
    },[questions])
    return (
        <>
            <div className="center-page">
                <div>
                    <h2>hello, {user.username ? user.username + " To the Website" : "Welcome to the Website"}</h2>
                </div>
                    {
                        isLoggedIn ? <AddQuestion /> : <br/>
                    }
                    {
                        questions.map((element, index) => {
                            if(element == undefined){
                               return(<></>);
                            }
                            else{
                                return(
                                    <div className="question-box" key={index}> 
                                <Questions element={element} />
                                </div>
                                );
                            }
                        })
                    }
            </div>
        </>
    );
};