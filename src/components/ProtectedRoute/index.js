import Cookies from 'js-cookie'
import { Route, Navigate } from 'react-router-dom'

const ProtectedRoute = props => {
  const jwt = Cookies.get('jwt_token')
  if (!jwt) {
    return <Navigate to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
