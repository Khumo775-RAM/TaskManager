import axios from 'axios';

const API_URL = 'https://localhost:7125/api/tasks';

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getTasks = async () => {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
};

export const getTaskById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
};

export const createTask = async (task) => {
    const response = await axios.post(API_URL, task, getAuthHeader());
    return response.data;
};

export const updateTask = async (id, task) => {
    const response = await axios.put(`${API_URL}/${id}`, task, getAuthHeader());
    return response.data;
};

export const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`, getAuthHeader());
};