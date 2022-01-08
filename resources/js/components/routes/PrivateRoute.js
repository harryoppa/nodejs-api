import { Navigate } from 'react-router-dom';
import { useAuth } from "../../services/AuthContext";

export default ({ children, ...rest }) => {
    let auth = useAuth();
    return (
        auth.user ? (
            children
        ) : (
        <Navigate
            to={{
                pathname: "/login",
                state: { from: location }
            }}
        />
        )
    );
  }