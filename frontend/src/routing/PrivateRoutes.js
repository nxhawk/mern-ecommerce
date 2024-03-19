import { Navigate } from "react-router-dom"

export const PrivateRoutes = ({ children }) => {
  const getTokenfromLocalStorage = JSON.parse(localStorage.getItem('customer'));
  return getTokenfromLocalStorage?.token !== undefined ? children : (
    <Navigate to='/login' replace={true} />
  )
}