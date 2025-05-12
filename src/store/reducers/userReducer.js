const initialState ={
    users:[],
    currentUser:null,
};

export const userReducer = (state = initialState, action) =>{
   console.log("action",action)
    switch(action.type){
        case "LOAD_USERS":
            return{
                ...state,
                users:action.payload,
            };
    }
};