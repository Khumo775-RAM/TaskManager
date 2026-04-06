import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
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
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (!confirmed) return;
        setDeletingId(id);
        setTimeout(async () => {
            try {
                await deleteTask(id);
                await loadTasks();
            } catch {
                setError('Failed to delete task.');
            } finally {
                setDeletingId(null);
            }
        }, 400);
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
    const priorityBorder = (p) => ['#10b981', '#f59e0b', '#ef4444'][p] || '#4f46e5';

    const completed = tasks.filter(t => t.isCompleted).length;
    const pending = tasks.length - completed;

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

            <div className="stats-bar">
                <div className="stat-card">
                    <span className="stat-number">{tasks.length}</span>
                    <span className="stat-label">Total</span>
                </div>
                <div className="stat-card stat-completed">
                    <span className="stat-number">{completed}</span>
                    <span className="stat-label">Completed</span>
                </div>
                <div className="stat-card stat-pending">
                    <span className="stat-number">{pending}</span>
                    <span className="stat-label">Pending</span>
                </div>
            </div>

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

                {filteredTasks.length === 0 && (
                    <div className="empty-state">
                        <span className="empty-icon">📝</span>
                        <p>No tasks here yet.</p>
                        <span>Add a task above to get started!</span>
                    </div>
                )}

                <ul className="task-list">
                    {filteredTasks.map(task => (
                        <li key={task.id} className={`task-card ${task.isCompleted ? 'completed' : ''} ${deletingId === task.id ? 'deleting' : ''}`} style={{ borderLeftColor: priorityBorder(task.priority) }}>
                            {task.isCompleted && (
                                <div className="complete-tick">
                                    <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="26" cy="26" r="25" fill="#10b981"/>
                                        <path d="M14 27 L22 35 L38 18" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            )}
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
                                <button onClick={() => handleToggleComplete(task)} className={task.isCompleted ? 'btn-undo' : 'btn-complete'}>
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