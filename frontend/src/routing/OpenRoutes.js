import { Navigate } from "react-router-dom"

export const OpenRoutes = ({ children }) => {
  const getTokenfromLocalStorage = JSON.parse(localStorage.getItem('customer'));
  return getTokenfromLocalStorage?.token === undefined ? children : (
    <Navigate to='/' replace={true} />
  )
}