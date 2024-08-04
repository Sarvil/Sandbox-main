import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Services } from "./Pages/Services";
import { Contact } from "./Pages/Contact";
import { Registration } from "./Pages/Registration";
import { Login } from "./Pages/Login";
import { Logout } from "./Pages/Logout";
import { Navbar } from "./Components/Navbar";
import GoToTop from "./Components/GoToTop";
import {useAuth} from "./store/auth";
import { Footer } from "./Components/Footer";

const App = () => {

    const isLoggedIn = useAuth();
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    {
                    isLoggedIn ? <Route path="/logout" element={<Logout />} /> : <></>
                    }
                </Routes>
                <GoToTop />
                <Footer/ >
            </BrowserRouter>
        </>
    );
};

export default App;