import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'
const Header = () => {
	const navigate = useNavigate()
	return (
		<div>
			<Container
				className='container py-2'
				style={{ borderBottom: '1px solid blue' }}>
				<Row className='justify-content-center'>
					<Col xs={1} md={4}>
						<Button
							variant='outline-primary'
							className='mx-2'
							onClick={() => navigate('/users')}>
							Users
						</Button>
						<Button
							variant='success'
							className='mx-2'
							onClick={() => navigate('/register')}>
							Register
						</Button>
						<Button
							variant='primary'
							className='mx-2'
							onClick={() => navigate('/login')}>
							Login
						</Button>
						<Button variant='warning' onClick={() => navigate('/forgot')}>
							Forgot Password
						</Button>
					</Col>
				</Row>
			</Container>
			<Outlet />
		</div>
	)
}

export default Header
