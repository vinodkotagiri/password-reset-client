import React, { useState } from 'react'
import { Col, Button, Form, InputGroup, Row } from 'react-bootstrap'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	// -----------------------------------------------------------------------------
	// 						SET STATES
	// -----------------------------------------------------------------------------
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [disabled, setDisabled] = useState(true)

	const navigate = useNavigate()

	// -------------------------------------------------------------------------
	// 						CHECK IF ALL THE FIELDS ARE FILLED
	// -------------------------------------------------------------------------
	useEffect(() => {
		if (username && email && password) {
			setDisabled(false)
		} else {
			setDisabled(true)
		}
	}, [username, email, password])

	// -------------------------------------------------------------------------
	// 						HANDLE REGISTER
	// -------------------------------------------------------------------------
	const handleRegister = async (event) => {
		event.preventDefault()
		const user = {
			username: username,
			password: password,
			email: email,
		}
		await axios
			.post('users/register', user)
			.then((response) => {
				toast.success('User Registered Successfully')
				navigate('/users')
			})
			.catch((err) => {
				console.log(err.response.data)
				toast.error(err.response.data)
			})
	}
	return (
		<Form noValidate onSubmit={handleRegister}>
			<Row className='justify-content-center mt-4'>
				<Form.Group as={Col} md='4' controlId='validationCustomUsername'>
					<InputGroup hasValidation>
						<InputGroup.Text id='inputGroupPrepend'>username</InputGroup.Text>
						<Form.Control
							type='text'
							placeholder='Username'
							aria-describedby='inputGroupPrepend'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</InputGroup>
				</Form.Group>
			</Row>
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
						<InputGroup.Text id='inputGroupPrepend'>password</InputGroup.Text>
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
				Register
			</Button>
			<Toaster />
		</Form>
	)
}

export default Register
