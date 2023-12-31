import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2'
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const signupFormFields = {
    singupUsername: '',
    singupEmail: '',
    singupPassword: '',
    singupConfirmPassword: '',
}



export const LoginPage = () => {
    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm(loginFormFields);
    const { singupUsername, singupEmail, singupPassword, singupConfirmPassword, onInputChange:onSignupInputChange } = useForm(signupFormFields);

    const { startLogin, startSignUp, errorMessage } = useAuthStore()

    useEffect(() => {
        if (errorMessage!==undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
            })
        }
    }, [errorMessage])

    const loginFormSubmit = (e) => {
        e.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
    }

    const signupFormSubmit = (e) => {
        e.preventDefault();
        if (singupPassword!==singupConfirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            })
            return;
        }
        startSignUp({username: singupUsername, email: singupEmail, password: singupPassword});
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Sign In</h3>
                    <form onSubmit={ loginFormSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Sign Up</h3>
                    <form onSubmit={ signupFormSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                name='singupUsername'
                                value={singupUsername}
                                onChange={onSignupInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name='singupEmail'
                                value={singupEmail}
                                onChange={onSignupInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name='singupPassword'
                                value={singupPassword}
                                onChange={onSignupInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password" 
                                name='singupConfirmPassword'
                                value={singupConfirmPassword}
                                onChange={onSignupInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

