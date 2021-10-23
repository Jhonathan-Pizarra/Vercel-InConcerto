import api from "./api";

async function getAll() {
    return await api.get(`/users`);
}

async function getById(id) {
    return await api.get(`/users/${id}`);
}

/*
async function create(data) {
    return await api.post(`/users`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
*/

async function update(id, data) {
    return await api.put(`/users/${id}`, data);
}

async function deleteUser(id) {
    return await api.delete(`/users/${id}`);
}

export const User = {
    getAll,
    getById,
    //create,
    update,
    delete: deleteUser,
};