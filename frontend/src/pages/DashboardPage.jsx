import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', priority: 1, dueDate: '' });
    const navigate = useNavigate();

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch {
            setError('Failed to load tasks.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            priority: parseInt(form.priority),
            dueDate: form.dueDate || null
        };
        try {
            if (editingTask) {
                await updateTask(editingTask.id, payload);
            } else {
                await createTask(payload);
            }
            setForm({ title: '', description: '', priority: 1, dueDate: '' });
            setEditingTask(null);
            loadTasks();
        } catch {
            setError('Failed to save task.');
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setForm({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate.substring(0, 10) : ''
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            loadTasks();
        } catch {
            setError('Failed to delete task.');
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            await updateTask(task.id, { ...task, isCompleted: !task.isCompleted });
            loadTasks();
        } catch {
            setError('Failed to update task.');
        }
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setForm({ title: '', description: '', priority: 1, dueDate: '' });
    };

    const priorityLabel = (p) => ['Low', 'Medium', 'High'][p] || 'Unknown';

    const filteredTasks = tasks.filter(t => {
        if (filter === 'completed') return t.isCompleted;
        if (filter === 'pending') return !t.isCompleted;
        return true;
    });

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Task Manager</h1>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
            </header>

            {error && <p className="error">{error}</p>}

            <section className="task-form-section">
                <h2>{editingTask ? 'Edit Task' : 'New Task'}</h2>
                <form onSubmit={handleSubmit} className="task-form">
                    <input
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleFormChange}
                        required
                    />
                    <input
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleFormChange}
                    />
                    <select name="priority" value={form.priority} onChange={handleFormChange}>
                        <option value={0}>Low</option>
                        <option value={1}>Medium</option>
                        <option value={2}>High</option>
                    </select>
                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleFormChange}
                    />
                    <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
                    {editingTask && (
                        <button type="button" onClick={handleCancelEdit}>Cancel</button>
                    )}
                </form>
            </section>

            <section className="task-list-section">
                <div className="filter-bar">
                    <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
                    <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pending</button>
                    <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
                </div>

                {filteredTasks.length === 0 && <p>No tasks found.</p>}

                <ul className="task-list">
                    {filteredTasks.map(task => (
                        <li key={task.id} className={`task-card ${task.isCompleted ? 'completed' : ''}`}>
                            <div className="task-info">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <span className={`priority priority-${priorityLabel(task.priority).toLowerCase()}`}>
                                    {priorityLabel(task.priority)}
                                </span>
                                {task.dueDate && (
                                    <span className="due-date">
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                            <div className="task-actions">
                                <button onClick={() => handleToggleComplete(task)}>
                                    {task.isCompleted ? 'Undo' : 'Complete'}
                                </button>
                                <button onClick={() => handleEdit(task)}>Edit</button>
                                <button onClick={() => handleDelete(task.id)} className="btn-delete">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default DashboardPage;