import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';
const usersUrl = 'http://localhost:3001/api/users';

const getAll = async () => {
    const response = await axios.get(usersUrl);
    return response.data;
};

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};

export default { login, getAll };
