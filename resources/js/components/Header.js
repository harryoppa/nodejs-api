import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default () => {

    const el = useRef(null);

    const onScroll = () => {
        const nav = el.current;
        const scrollTop = window.scrollY;
        if (scrollTop > 40) {
            nav.classList.add("navbar-fixed");
        } else {
            nav.classList.remove("navbar-fixed");
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    });

    return (
        <header ref={el}>
            <div className="min-container">
                <nav className="navbar navbar-expand-lg d-flex justify-content-between navbar-light">
                    <Link className="navbar-brand" to="/">
                        <img src="/public/images/logo.png" alt="logo" />
                    </Link>

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link d-flex active align-items-center" to="/">

                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.55615 16.1804H14.4173" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.97278 14.1555C3.97278 9.44814 4.48606 9.77668 7.24894 7.21443C8.45776 6.24136 10.3387 4.36377 11.963 4.36377C13.5864 4.36377 15.505 6.23216 16.7247 7.21443C19.4875 9.77668 20 9.44814 20 14.1555C20 21.0832 18.3623 21.0832 11.9864 21.0832C5.61044 21.0832 3.97278 21.0832 3.97278 14.1555Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                                Home
                            </Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a className="nav-link" href="/">Auto Homepage</a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a className="nav-link" href="/">Sales</a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a className="nav-link" href="/">CRN</a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a className="nav-link" href="/">Electronic office</a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a className="nav-link" href="/">Cloud ERP</a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a className="nav-link" href="/">SSL</a>
                        </li>
                    </ul>
                    
                </nav>
            </div>
        </header>
    )
}