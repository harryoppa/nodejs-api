import React, { useEffect } from "react";
import { useAuth } from "../services/AuthContext";
import { Link } from "react-router-dom";

export default () => {
    let auth = useAuth();

    const handleLogout = () => {
        auth.signout(() => {
            window.location.reload();
        });
    }

    useEffect(() => {
        console.log('aA user', auth.user)        
    }, [auth.user])

    return (
        <div className="sub-header">
            <div className="min-container d-flex justify-content-end">
                <ul className="navbar-nav mr-auto flex-row d-flex align-items-center justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link" href="#:">
                            EN
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3.2229H2L6 9.2229L10 3.2229Z" fill="currentColor"/>
                            </svg>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#:">
                            Company
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3.2229H2L6 9.2229L10 3.2229Z" fill="currentColor"/>
                            </svg>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#:">
                            Partner Market Place
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3.2229H2L6 9.2229L10 3.2229Z" fill="currentColor"/>
                            </svg>
                        </a>
                    </li>

                    {
                        auth.user?.id && (
                            <li className="nav-item">
                                <a className="nav-link text-warning" href="#:">
                                    {auth.user.fullname}
                                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 3.2229H2L6 9.2229L10 3.2229Z" fill="currentColor"/>
                                    </svg>
                                </a>

                                <ul>
                                    <li>
                                        <Link to="/manage" href="#:">
                                            User Management
                                        </Link>
                                    </li>
                                    <li>
                                        <a onClick={handleLogout} href="#:">
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}