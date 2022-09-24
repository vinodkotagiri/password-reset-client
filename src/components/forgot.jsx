import React, { Fragment, useState, useEffect } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
const Forgot = () => {
	// -------------------------------------------------------------------------
	// 						SET STATES
	// -------------------------------------------------------------------------
	const [email, setEmail] = useState('')
	const [disabled, setDisabled] = useState(true)
	const [showReset, setShowReset] = useState(false)
	const [resetCode, setResetCode] = useState('')
	const [password, setPassword] = useState('')

	// -----------------------------------------------------------------------------
	// 						CHECK IF EMAIL ENTERED AND ENABLE BUTTON
	// -----------------------------------------------------------------------------
	useEffect(() => {
		email ? setDisabled(false) : setDisabled(true)
	}, [email])

	// -------------------------------------------------------------------------
	// 						HANDLE SUBMIT TO SEND RESET CODE
	// -------------------------------------------------------------------------
	const handleSubmit = async () => {
		await axios
			.post('/users/forgot-password', { email: email })
			.then((response) => {
				toast.success('Reset code sent to ', email)
				setShowReset(true)
			})
			.catch((error) => toast.error(error.response.data.error))
	}

	// -------------------------------------------------------------------------
	// HANDLE PASSWORD RESET
	// -------------------------------------------------------------------------
	const handleReset = async () => {
		await axios
			.post('users/reset-password', {
				password: password,
				resetCode: resetCode,
			})
			.then((response) => toast.success('Password Updated Successfully'))
			.catch((error) => toast.error(error.response.data.error))
	}

	return (
		<Fragment>
			{!showReset ? (
				<Form>
					<Row className='justify-content-center mt-4'>
						<Form.Group as={Col} md='4' controlId='formBasicEmail'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Form.Text className='text-muted'>
								We'll send a reset code to this email.
							</Form.Text>
						</Form.Group>
					</Row>
					<Button className='mt-4' onClick={handleSubmit} disabled={disabled}>
						Submit
					</Button>
				</Form>
			) : (
				<Form>
					<Row className='justify-content-center mt-4'>
						<Form.Group as={Col} md='4' controlId='formBasicEmail'>
							<Form.Control
								type='text'
								placeholder='Enter Reset Code'
								value={resetCode}
								onChange={(e) => setResetCode(e.target.value)}
							/>
						</Form.Group>
					</Row>
					<Row className='justify-content-center mt-4'>
						<Form.Group as={Col} md='4' controlId='formBasicEmail'>
							<Form.Control
								type='password'
								placeholder='Enter New Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
					</Row>
					<Button className='mt-4' onClick={handleReset} disabled={disabled}>
						Change Password
					</Button>
				</Form>
			)}
			<Toaster />
		</Fragment>
	)
}

export default Forgot
