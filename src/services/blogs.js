import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = (newObject) => {
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject);
    return request.then((response) => response.data);
};

const deleteBlog = (newObject) => {
    const config = {
        headers: { Authorization: token },
    };
    const request = axios.delete(`${baseUrl}/${newObject.id}`, config);
    return request.then((response) => {
        response.data;
    });
};

export default { getAll, create, setToken, update, deleteBlog };
