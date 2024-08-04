import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_BACKEND_URL+"/api/form/contact/";

export const Contact = () => {

    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const [userData, setUserData] = useState(true);

    const { user } = useAuth();

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });
        setUserData(false);
    }

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setContact({
            ...contact,
            [name]: value,
        });
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });
            const res_data = await response.json();
            if (response.ok) {
                toast.success(res_data.message);
            } else {
                toast.error(res_data.extradetails ? res_data.extradetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-contact">
                        <div className="container grid grid-two-cols">
                            <div className="contact-form">
                                <h1 className="main-heading mb3">Contact Us</h1>
                                <br />
                                <form onSubmit={handleContactSubmit}>
                                    <div>
                                        <label htmlFor="username">Username: </label><br />
                                        <input type="text" name="username" placeholder="Username" id="username" required autoComplete="off" value={contact.username} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email ID: </label><br />
                                        <input type="email" name="email" placeholder="Email ID" id="email" required autoComplete="off" value={contact.email} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="message">Message: </label><br />
                                        <textarea name="message" id="message" rows="10" cols="30" required autoComplete="off" value={contact.message} onChange={handleInput} ></textarea>
                                    </div>
                                    <br />
                                    <button type="submit" className="btb btb-submit" >Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};