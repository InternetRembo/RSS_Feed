import React from 'react';
import {useNavigate} from "react-router-dom";

type AuthPageProps = {
	setIsUserAuth: (arg:boolean)=> void
}

const AuthPage:React.FC<AuthPageProps>  = ({setIsUserAuth}:AuthPageProps) => {
	const navigate = useNavigate()
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-pink-600">
			<div className="absolute top-1/2 transform -translate-y-1/2 w-[600px] h-[400px] shadow-2xl bg-white z-20 flex flex-col items-center rounded-xl">
				<h1 className="text-[48px]">Log In</h1>
				<form className="mt-8 flex flex-col ">
					<div className="mb-4 w-[500px]">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
							Username
						</label>
						<input
							onChange={()=>{}}
							value={'some username'}
							className="text-xl h-[50px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Username"
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							Password
						</label>
						<input
							onChange={()=>{}}
							value={'some password'}
							className="text-xl h-[50px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="Password"
						/>
					</div>
					<button
						onClick={() => {
							localStorage.setItem('isAuth', 'Auth')
							setIsUserAuth(true)
							navigate('/')
						}}
						className=" mt-4 self-end bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[100px] h-[40px] "
						type="button"
					>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
};

export default AuthPage;