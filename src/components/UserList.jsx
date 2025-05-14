import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, deleteUser, editUser, loadUsers } from '../store/actions'
import UserForm from './UserForm';

const UserList = () => {

const dispatch = useDispatch();
const users = useSelector(state => state?.users);
const currentUser = useSelector(state => state?.currentUser);

const [filteredUsers, setFilteredUsers] = useState([]);
const [searchQuery, setSearchQuery] = useState("");

const [isModalOpen, setIsModalOpen] = useState(false);
const [editingUser, setEditingUser] = useState(null);

const handleNewUser =()=>{
    setEditingUser(null)
    setIsModalOpen(true);
}

const handleCancel =()=>{
    setIsModalOpen(false);
}

const handleModalClick =(e)=>{
    if(e.target.className === 'modal'){
        setIsModalOpen(false)
    }
}

const handleSave = (user) =>{
    if(user.id && user.name && user.email){
        dispatch(editUser(user))
    }else{
        if(user.name && user.email){
            const newUser ={
                id:Date.now(),
                ...user
            }

            dispatch(addUser(newUser))
        }
    }

    setIsModalOpen(false);
}

const handleEditClick = (user) =>{
    setEditingUser(user);
    setIsModalOpen(true);
}

const handlleDelete =(userId)=>{
    if(currentUser && currentUser.id === userId){
        dispatch(editUser(null));
    }

    dispatch(deleteUser(userId));
}
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
    //el ? es para prevenir en caso de que users sea nulo
    //FILTRO POR NOMBRE Y EMAIL
    const updatedFilteredUsers = users?.filter((user) => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setFilteredUsers(updatedFilteredUsers);

},[users, searchQuery]);

return (
    <>
        <div className='search-bar'>
            <div className="input-group">
                <span className='input-group-text'>
                    <i className="bi bi-search"> </i>
                </span>
                <input type="search"
                    className='form-control'
                    placeholder='Search user...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
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
                                        <button className='btn btn-primary me-3' onClick={()=>handleEditClick(user)}><i className='bi bi-pencil-square' ></i>Edit</button>
                                        <button className='btn btn-danger' onClick={()=> handlleDelete(user.id)}><i className='bi bi-trash'></i>Delete</button>

                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
        }
        <button className='btn btn-primary' onClick={handleNewUser}>Add New User</button>
        {
            isModalOpen && (
                <div className='modal' onClick={handleModalClick}>
                    <div className='modal-content' onClick={(e)=> e.stopPropagation()}>
                        <h2>{editingUser ? 'Edit User' : 'Add User' }</h2>
                        <UserForm
                            currentUser={editingUser}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    </div>
                </div>
            )
        }
    </>
  )
}

export default UserList
