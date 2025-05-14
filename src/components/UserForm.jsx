import React, { useState } from 'react'

const UserForm = ({currentUser, onSave, onCancel}) => {
  
const [userDetails, setUserDetails] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
})



const handleInputChange=(e)=>{
    const { name, value } = e.target;
    setUserDetails((prevState) =>{
        return{
            ...prevState,
            [name]:value,
        };
    });
};

const handleSubmit = (e) =>{
    e.preventDefault();
    onSave({ ...currentUser, ...userDetails });
}

return (
    <form onSubmit={handleSubmit} className='user-form'>
        <div className='form-group'>
            <input 
             className='form-control'
            type='text'
            name='name'
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder='Enter name'
            />
        </div>
        <br/>
        <div className='form-group'>
            <input 
             className='form-control'
            type='email'
            name='email'
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder='Enter email'
            />
        </div>
        <div className='user-form-btns'>
            <button className='btn btn-success me-2'>{currentUser ? "update":"add"}</button>
            <button className='btn btn-secondary'>Cancel</button>

        </div>
    </form>
  )
}

export default UserForm
