import api from "./api";

async function getAll() {
    return await api.get(`/feeding_places`);
}

async function getById(id) {
    return await api.get(`/feeding_places/${id}`);
}

async function create(data) {
    return await api.post(`/feeding_places`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/feeding_places/${id}`, data);
}

async function deleteFeedingPlace(id) {
    return await api.delete(`/feeding_places/${id}`);
}

export const FeedingPlace = {
    getAll,
    getById,
    create,
    update,
    delete: deleteFeedingPlace,
};