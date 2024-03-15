import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = formData;
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = JSON.stringify({ name, email, password });
            await axios.post(`http://localhost:4000/api/users`, body, config);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response.data.error || 'The email has already been entered.');
        }
    };

    return (
        <div className="signup d-flex justify-content-center align-items-center vh-100 bg-primary">
            <div className="form_container p-5 rounded bg-white">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={onSubmit}>
                    <h3 className="text-center">Sign Up</h3>
                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" name="name" value={name} onChange={onChange} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control" name="email" value={email} onChange={onChange} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" className="form-control" name="password" value={password} onChange={onChange} minLength="6" required />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                    <p className="d-flex justify-content-center mt-2">
                        Already have an account?<a href='' className="ms-2"><Link to='/login'>Sign in</Link></a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;