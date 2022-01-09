import React, { useContext, createContext, useState } from "react";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
} from "react-router-dom";
import { ProvideAuth } from "@harry/js/services/AuthContext";
import Index from "@harry/js/pages/Index/index";
import UserManagePage from "@harry/js/pages/UserManage";
import {
    LoginPage
} from '@harry/js/pages/Auth';
import PrivateRoute from "@harry/js/components/routes/PrivateRoute";
import BaseLayout from "../BaseLayout";

export default () => {

    return (
        <ProvideAuth>
            <Router>
                <BaseLayout>
                    <Switch>

                        <Route index element={
                            <PrivateRoute>
                                <Index />
                            </PrivateRoute>
                        } />
                        <Route path="/manage" exact element={
                            <PrivateRoute>
                                <UserManagePage />
                            </PrivateRoute>
                        } />
                        <Route path="/login" element={<LoginPage />} />


                    </Switch>
                </BaseLayout>
            </Router>
        </ProvideAuth>
    )
}