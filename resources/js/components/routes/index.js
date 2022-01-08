import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { ProvideAuth } from "@harry/js/services/AuthContext";
import Index from "@harry/js/pages/Index/index";
import {
    LoginPage
} from '@harry/js/pages/Auth';
import PrivateRoute from "@harry/js/components/routes/PrivateRoute";

export default () => {

    return (
        <ProvideAuth>
            <Router>
                <Switch>

                    <Route index element={
                        <PrivateRoute>
                            <Index />
                        </PrivateRoute>
                    } />
                    <Route path="/login" element={<LoginPage />} />


                </Switch>
            </Router>
        </ProvideAuth>
    )
}