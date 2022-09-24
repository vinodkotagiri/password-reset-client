import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

const Users = () => {
	// -------------------------------------------------------------------------
	// 						SET USER STATE
	// -------------------------------------------------------------------------
	const [users, setUsers] = useState([])

	// -----------------------------------------------------------------------------
	// 						GET USERS FROM THE SERVER
	// -----------------------------------------------------------------------------
	async function getUsers() {
		await axios.get('/users').then((response) => {
			setUsers(response.data)
			toast.success('Users updated successfully')
		})
	}

	// -----------------------------------------------------------------------------
	// 						GET USERS WHEN MOUNTED
	// -----------------------------------------------------------------------------
	useEffect(() => {
		getUsers()
	}, [])

	return (
		<div className='users'>
			<Container>
				<Table bordered striped hover>
					<thead>
						<th>#</th>
						<th>username</th>
						<th>email</th>
						{users.map((user, index) => (
							<tr key={user._id}>
								<td>{index + 1}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
							</tr>
						))}
					</thead>
				</Table>
			</Container>
			<Toaster />
		</div>
	)
}

export default Users
