import api from "./api";

async function getAll() {
    return await api.get(`/feedings`);
}

async function getById(id) {
    return await api.get(`/feedings/${id}`);
}

async function create(data) {
    return await api.post(`/feedings`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/feedings/${id}`, data);
}

async function deleteFeeding(id) {
    return await api.delete(`/feedings/${id}`);
}

export const Feeding = {
    getAll,
    getById,
    create,
    update,
    delete: deleteFeeding,
};