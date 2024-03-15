import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = JSON.stringify({ email, password });
            const loginResponse = await axios.post(`http://localhost:4000/api/users/login`, body, config);
            localStorage.setItem('token', loginResponse.data.token);
            const authConfig = {
                headers: {
                    'Authorization': `Bearer ${loginResponse.data.token}`,
                },
            };
            await axios.get(`http://localhost:4000/api/users/me`, authConfig);
            setSuccess('Login successful! Redirecting...');
            setTimeout(()=> navigate('/goals'),2000 );
        } catch (err) {
            setError(err.response.data.error || 'Email or Password incorrect.');
        }
    };

    return (
        <>
            <div className="login d-flex justify-content-center align-items-center vh-100 bg-primary">
                <div className="form_container p-5 rounded bg-white">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <form onSubmit={onSubmit}>
                        <h3 className="text-center">Sign In</h3>
                        <div className="mb-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Email" className="form-control" name="email" value={email} onChange={onChange} required />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter Password" className="form-control" name="password" value={password} onChange={onChange} required />
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" className="custom-control custom-checkbox" id="check" />
                            <label htmlFor="check" className="custom-input-label ms-2">
                                Remember me
                            </label>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                        <p className="d-flex justify-content-center mt-2">
                            First Time<a href='' className="ms-2"><Link to='/register'>Sign up</Link></a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
