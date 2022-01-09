import React from "react";
import { useAuth } from "../services/AuthContext";
import Header from "./Header";
import SubHeader from "./SubHeader";
import Footer from "./Footer";

export default ({ children }) => {
    let auth = useAuth();

    return (
        <div className="app-inner">
            {
                auth.user && (
                    <>
                        <SubHeader />
                        <Header />
                    </>
                )
            }
            {children}

            {
                auth.user && (
                    <Footer />
                )
            }
        </div>
    )
}