import api from "./api";

async function getAll() {
    return await api.get(`/resources`);
}

async function getById(id) {
    return await api.get(`/resources/${id}`);
}

async function create(data) {
    return await api.post(`/resources`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/resources/${id}`, data);
}

async function deleteResource(id) {
    return await api.delete(`/resources/${id}`);
}

export const Resource = {
    getAll,
    getById,
    create,
    update,
    delete: deleteResource,
};