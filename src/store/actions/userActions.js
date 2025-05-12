export const LOAD_USERS = "LOAD_USERS";

export const loadUsers = (users) =>(
    { 
        type: LOAD_USERS,
        payload: users,
    }
);