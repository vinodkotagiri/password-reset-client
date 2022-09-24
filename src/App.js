import './App.css'
import Header from './components/header'
import Users from './components/users'
import Login from './components/login'
import Forgot from './components/forgot'
import Register from './components/register'
import { Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import axios from 'axios'
function App() {
	axios.defaults.baseURL = 'https://password-reset.onrender.com'
	axios.defaults.headers = {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	}
	return (
		<Fragment>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Header />}>
						<Route path='users' element={<Users />} />
						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />
						<Route path='forgot' element={<Forgot />} />
					</Route>
				</Routes>
			</div>
		</Fragment>
	)
}

export default App
