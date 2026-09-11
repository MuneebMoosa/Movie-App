import { Navigate, Outlet,} from "react-router-dom"
import { useSelector } from "react-redux"



const PrivateRoute = () => {

  const {userInfo , isInitialized} = useSelector((state) => state.auth);

   if (!isInitialized) {
    return null;
  }

  return (
    userInfo ? <Outlet/> : <Navigate to='/login' replace />
  )
}

export default PrivateRoute



 
