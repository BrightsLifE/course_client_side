import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { AuthContext } from '../../Shared/Contexts/UserContext';
import toast from 'react-hot-toast';

const Login = () => {
    const { signIn, createUserByGoogle, createUserGithub, setLoading } = useContext(AuthContext)
    const [passErr, setPasswordErr] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    const handlerToSIgnIn = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value
        signIn(email, password)
            .then((result) => {
                const user = result.user
                form.reset()
                if (user.emailVerified) {
                    navigate(from, { replace: true })

                } else {
                    toast.error('Your email is not verified,PLease verify your email')
                }

                setPasswordErr('')
            })
            .catch((err) => {
                setPasswordErr(err.message)
            })
            .finally(() => {
                setLoading(false)
            })


    }
    const handlerToCReateUserByGoogle = () => {
        createUserByGoogle()
            .then(() => { })
            .catch(err => setPasswordErr(err.message))

    }
    const handlerToCReateUserByGithub = () => {
        createUserGithub()
            .then(() => { })
            .catch(err => setPasswordErr(err.message))

    }
    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        Please login Now
                    </h1>
                    <form onSubmit={handlerToSIgnIn} action="" className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">

                        <div>
                            <label for="email" className="text-sm font-medium">Email</label>

                            <div className="relative mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                    required
                                />

                                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label for="password" className="text-sm font-medium">Password</label>

                            <div className="relative mt-1">
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                    required
                                />

                                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>


                        <button className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">  Sign in</button>

                        <p className='font-semibold text-red-500 text-[15px]'>{passErr}</p>
                        <div>

                            <Link onClick={handlerToCReateUserByGoogle} className="w-full rounded-lg  py-3  font-medium text-black uppercase btn btn-outline text-2xl btn-primary" to='/'><FaGoogle /></Link>
                        </div>
                        <div>
                            <Link onClick={handlerToCReateUserByGithub} className=" w-full rounded-lg  py-3  font-medium text-black uppercase btn btn-outline text-2xl btn-primary" to='/' ><FaGithub /></Link>
                        </div>

                        <p className="text-center text-sm text-gray-500">
                            No account?
                            <Link className="underline text-blue-500 font-semibold" to="/signup">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Login;