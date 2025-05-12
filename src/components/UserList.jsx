import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsers } from '../store/actions'

const UserList = () => {

const dispatch = useDispatch();
const users = useSelector(state => state?.users);
const [filteredUsers, setFilteredUsers] = useState([]);

useEffect(()=>{
    const initialUsers=[
        { id:1, name: 'Alice', email: 'alice@gmail.com' },
        { id:2, name: 'Agus', email: 'agus@gmail.com' },
        { id:3, name: 'Emi', email: 'emi@gmail.com' },
        { id:4, name: 'Lara', email: 'lara@gmail.com' },

    ];
    dispatch(loadUsers(initialUsers));
}, [])

useEffect(()=>{
    setFilteredUsers(users)
},[users]);

return (
    <>
        {
            filteredUsers.length === 0 ? 
            (
                <p>No users found.</p>
            ):(
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className='btn btn-primary me-3'><i className='bi bi-pencil-square'></i>Edit</button>
                                        <button className='btn btn-danger'><i className='bi bi-trash'></i>Delete</button>

                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
        }
    </>
  )
}

export default UserList
