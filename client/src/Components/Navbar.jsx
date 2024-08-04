import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { CgMenu, CgCloseR } from "react-icons/cg";
import {useState} from "react";

export const Navbar = () => {
    const { isLoggedIn } = useAuth();
    
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <>
            <header>
                <div className="container header">
                    <div className="logo-brand">
                        <NavLink to="/">LOGO</NavLink>
                    </div>
                    <div className={ openMenu ? "navbarContainer active" : "navbarContainer"}>
                    <nav >
                        <ul className="nav-list" >
                            <li>
                                <NavLink to="/" onClick={() => setOpenMenu(false)}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/services" onClick={() => setOpenMenu(false)}>Services</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" onClick={() => setOpenMenu(false)}>Contact Us</NavLink>
                            </li>
                            {isLoggedIn ? <li>
                                <NavLink to="/logout" onClick={() => setOpenMenu(false)}>Logout</NavLink>
                            </li>
                                : <>
                                    <li>
                                        <NavLink to="/registration" onClick={() => setOpenMenu(false)}>Registration</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/login" onClick={() => setOpenMenu(false)}>Login</NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                        <div className="mobile-navbar-btn">
                            <CgMenu name="menu-outline" onClick={() => setOpenMenu(true)}/>
                            <CgCloseR name="close-outline" className="close-outline mobile-nav-icon" onClick={() => setOpenMenu(false)} />
                        </div>
                    </nav>
                    </div>
                </div>
            </header>
        </>
    );
};