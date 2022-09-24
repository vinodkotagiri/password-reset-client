import React, { useState, useEffect, Fragment } from 'react'
import { Form, Row, InputGroup, Button, Col } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
	// -----------------------------------------------------------------------------
	// 						SET STATES
	// -----------------------------------------------------------------------------
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [disabled, setDisabled] = useState(true)
	const [logged, setLogged] = useState(false)
	const navigate = useNavigate()

	// -------------------------------------------------------------------------
	// 						CHECK IF ALL THE INPUTS ARE FILLED
	// -------------------------------------------------------------------------
	useEffect(() => {
		if (email && password) {
			setDisabled(false)
		} else {
			setDisabled(true)
		}
	}, [email, password])

	// -------------------------------------------------------------------------
	// 						CHECK IF THE USET IS LOGGED IN
	// -------------------------------------------------------------------------
	useEffect(() => {
		if (sessionStorage.getItem('token')) {
			setLogged(true)
		} else {
			setLogged(false)
		}
	}, [setLogged])

	// -------------------------------------------------------------------------
	// 						HANDLE LOGIN
	// -------------------------------------------------------------------------
	const handleLogin = async (event) => {
		event.preventDefault()

		const user = {
			password: password,
			email: email,
		}
		await axios
			.post('users/login', user)
			.then((response) => {
				toast.success('User Logged in Successfully')
				sessionStorage.setItem('token', response.data.token)
				navigate('/users')
			})
			.catch((err) => {
				toast.error(err.response.data.error)
			})
	}

	// -----------------------------------------------------------------------------
	// 						HANDLE LOGOUT
	// -----------------------------------------------------------------------------
	const handleLogout = () => {
		sessionStorage.removeItem('token')
		setLogged(false)
	}

	return (
		<Fragment>
			{!logged ? (
				<Form noValidate onSubmit={handleLogin}>
					<Row className='justify-content-center mt-4'>
						<Form.Group as={Col} md='4' controlId='validationCustomUsername'>
							<InputGroup hasValidation>
								<InputGroup.Text id='inputGroupPrepend'>email</InputGroup.Text>
								<Form.Control
									type='email'
									placeholder='Email'
									aria-describedby='inputGroupPrepend'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</InputGroup>
						</Form.Group>
					</Row>
					<Row className='justify-content-center mt-4'>
						<Form.Group as={Col} md='4' controlId='validationCustomUsername'>
							<InputGroup hasValidation>
								<InputGroup.Text id='inputGroupPrepend'>
									password
								</InputGroup.Text>
								<Form.Control
									type='password'
									placeholder='Password'
									aria-describedby='inputGroupPrepend'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</InputGroup>
						</Form.Group>
					</Row>
					<Button className='mt-4' type='submit' disabled={disabled}>
						Login
					</Button>
					<Toaster />
				</Form>
			) : (
				<>
					<h1>User logged in succesfully</h1>

					<Button onClick={handleLogout}>Logout</Button>
				</>
			)}
		</Fragment>
	)
}

export default Login
