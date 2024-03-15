/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
const isAuthenticated = localStorage.getItem('token');
return isAuthenticated ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;