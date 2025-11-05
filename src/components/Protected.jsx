import { Navigate } from "react-router-dom"

const Protected = ({children}) => {
    if(!localStorage.getItem("login")){
        return <Navigate to='/login' replace/>
        //replace is used to prevent going back to the protected route using back button
    }
  return children
}

export default Protected
