import api from "./api";

async function getAll() {
    return await api.get(`/lodgings`);
}

async function getById(id) {
    return await api.get(`/lodgings/${id}`);
}

async function create(data) {
    return await api.post(`/lodgings`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/lodgings/${id}`, data);
}

async function deleteLodging(id) {
    return await api.delete(`/lodgings/${id}`);
}

export const Lodging = {
    getAll,
    getById,
    create,
    update,
    delete: deleteLodging,
};