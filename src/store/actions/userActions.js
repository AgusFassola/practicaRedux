export const LOAD_USERS = "LOAD_USERS";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";



export const loadUsers = (users) =>(
    { 
        type: LOAD_USERS,
        payload: users,
    }
);

export const addUser = (user) =>(
    { 
        type: ADD_USER,
        payload: user,
    }
);

export const editUser = (user) =>(
    { 
        type: EDIT_USER,
        payload: user,
    }
);