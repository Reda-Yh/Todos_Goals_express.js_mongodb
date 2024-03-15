import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        const fetchGoals = async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            try {
                const response = await axios.get(`http://localhost:4000/api/goals`, config);
                setGoals(response.data);
                setSuccess('Data uploaded successfully!')
                setTimeout(()=>setSuccess(''),2000)
                setError('');
            } catch (error) {
                setError('There was an error fetching your goals. Please try again.');
                setTimeout(()=>setError(''),2000)
                console.error("There was an error fetching the goals", error);
            }
        };
        fetchGoals();
    }, []);

    const handleAddGoal = async () => {
        if (!newGoal.trim()) {
            setError('Please enter a goal before submitting.');
            setTimeout(()=>setError(''),2000)
            setSuccess('');
            return;
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        };
        try {
            const response = await axios.post(`http://localhost:4000/api/goals`, { text: newGoal }, config);
            setGoals([...goals, response.data]);
            setNewGoal('');
            setError('');
            setSuccess('Goal added successfully!');
            setTimeout(()=>setSuccess(''),2000)
        } catch (error) {
            setError('There was an error adding your goal. Please try again.');
            setTimeout(()=>setError(''),2000)
            console.error("There was an error adding the goal", error);
            setSuccess('');
        }
    };

    const handleDeleteGoal = async (id) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        };
        try {
            await axios.delete(`http://localhost:4000/api/goals/${id}`, config);
            setGoals(goals.filter(goal => goal._id !== id));
            setError('');
            setSuccess('Goal deleted successfully!');
            setTimeout(()=>setSuccess(''),2000)
        } catch (error) {
            setError('There was an error deleting your goal. Please try again.');
            setTimeout(()=>setError(''),2000)
            console.error("There was an error deleting the goal", error);
            setSuccess('');
        }
    };

    const handleEditGoal = async (id) => {
        if (!editingText.trim()) {
            setError('Please enter a goal before saving.');
            setTimeout(()=>setError(''),2000)
            return;
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        };
        try {
            await axios.put(`http://localhost:4000/api/goals/${id}`, { text: editingText }, config);
            const newGoals = goals.map(goal => {
                if (goal._id === id) {
                    return { ...goal, text: editingText };
                }
                return goal;
            });
            setGoals(newGoals);
            setIsEditing(null);
            setEditingText('');
            setError('');
            setSuccess('Goal updated successfully!');
            setTimeout(()=>setSuccess(''),2000)
            
        } catch (error) {
            setError('There was an error updating your goal. Please try again.');
            setTimeout(()=>setError(''),2000)
            console.error("There was an error updating the goal", error);
            setSuccess('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            <div className="objectives template d-flex justify-content-center align-items-center vh-100 bg-primary">
                <div className="container p-5 rounded bg-white">
                    <h2 className="text-center mb-4">Mes Objectifs</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Ajouter un nouvel objectif" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} />
                        <button className="btn btn-outline-primary" type="button" onClick={handleAddGoal}>Ajouter</button>
                    </div>
                    <ul className="list-group">
                        {goals.map(goal => (
                            <li key={goal._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {isEditing === goal._id ?
                                    <>
                                        <input type="text" className="form-control me-2" value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                                        <button className="btn btn-success me-2" onClick={() => handleEditGoal(goal._id)}>Sauvegarder</button>
                                    </>
                                    :
                                    <span className="flex-grow-1">{goal.text}</span>
                                }
                                <div>
                                    {isEditing !== goal._id &&
                                        <>
                                            <button className="btn btn-info me-2" onClick={() => { setIsEditing(goal._id); setEditingText(goal.text); }}>Modifier</button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteGoal(goal._id)}>Supprimer</button>
                                        </>
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-secondary mt-3" onClick={handleLogout}>Déconnexion</button>
                </div>
            </div>
        </>
    );
};

export default Goals;


