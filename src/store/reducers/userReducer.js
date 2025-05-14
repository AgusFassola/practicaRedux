import { ADD_USER, DELETE_USER, EDIT_USER, LOAD_USERS } from "../actions";

const initialState ={
    users:[],
    currentUser:null,
};

export const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case LOAD_USERS:
            return{
                ...state,
                users:action.payload,
            };
        case ADD_USER:
            return{
                ...state,
                users:[...state.users, action.payload],
            };
        case EDIT_USER:
            if(action.payload === null){
                return{
                    ...state,
                    currentUser:null,
                }
            }
            return{
                ...state,
                users: state.users.map((user) => {
                    return  user.id === action.payload.id 
                    ? { ...user, ...action.payload }
                    : user;
                }),
                currentUser: action.payload,
               
            };
        case DELETE_USER:
            return{
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
                currentUser:
                    state.currentUser && state.currentUser.id === action.payload 
                    ? null : state.currentUser,

            }
        default: 
            return state;
    }
};