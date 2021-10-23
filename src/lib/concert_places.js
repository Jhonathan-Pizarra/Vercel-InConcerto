import api from "./api";

async function getAll() {
    return await api.get(`/places`);
}

async function getById(id) {
    return await api.get(`/places/${id}`);
}

async function create(data) {
    return await api.post(`/places`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/places/${id}`, data);
}

async function deletePlaceConcert(id) {
    return await api.delete(`/places/${id}`);
}

export const PlaceConcert = {
    getAll,
    getById,
    create,
    update,
    delete: deletePlaceConcert,
};