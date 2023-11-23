import React, {useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Articles from './components/Articles/Articles';
import AuthPage from './components/Authentification/AuthPage';

function App() {
	const isAuth = localStorage.getItem('isAuth');
	const [isUserAuth, setIsUserAuth] = useState(Boolean(isAuth))

	return (
		<div>
			<Routes>
				<Route
					path={'/'}
					element={isUserAuth ? <Articles setIsUserAuth={setIsUserAuth}/> : <Navigate to={'/auth'}/>}
				/>
				<Route
					path={'/auth'}
					element={!isUserAuth ? <AuthPage setIsUserAuth={setIsUserAuth}/> : <Navigate to={'/'}/>}
				/>
			</Routes>
			<ToastContainer/>
		</div>
	);
}

export default App;
