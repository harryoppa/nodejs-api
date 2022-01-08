import React, { useRef } from 'react';
import Http from '@harry/js/services/Http';
import Ls from '@harry/js/services/Ls';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@harry/js/services/AuthContext';

export default () => {


    const auth = useAuth();
    const history = useNavigate();

    const form = useRef(null);
    const loginRequest = async (e) => {
        e.preventDefault();
        const res = await Http.post('login', new URLSearchParams(new FormData(form.current)).toString());

        if (res.data?.accessToken) {
            Ls.set('auth.token', res.data.accessToken);
            auth.signin(() => {
                history('/')
            })
            
        }
    }

    return (
        <div className="login-page h-100vh d-flex align-items-center justify-content-center">
            <div className="login-box box-shadow border-radius">

                <h4 className="mb-4">Login to system</h4>

                <form ref={form} onSubmit={loginRequest}>
                    <div className="mb-3">
                        <input className="form-control form-control-lg" required name="email" type="email" placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <input className="form-control form-control-lg" required name="password" type="password" placeholder="Password" />
                    </div>

                    <button className="btn btn-primary px-5">Login</button>
                </form>
            </div>
        </div>
    )
}