export const initialStore=()=>{

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return{
    token: token || null,
    user: user ? JSON.parse(user) : null,
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'LOGIN':
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...store,
        user: action.payload.user,
        token: action.payload.token
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...store,
        user: null,
        token: null
      };
    default:
      throw new Error ("Unknown action type");
  }    
}
