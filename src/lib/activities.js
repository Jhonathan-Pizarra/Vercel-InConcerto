import api from "./api";

async function getAll() {
    return await api.get(`/activityfestivals`);
}

async function getById(id) {
    return await api.get(`/activityfestivals/${id}`);
}

async function create(data) {
    return await api.post(`/activityfestivals`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/activityfestivals/${id}`, data);
}

async function deleteActivity(id) {
    return await api.delete(`/activityfestivals/${id}`);
}

export const Activity = {
    getAll,
    getById,
    create,
    update,
    delete: deleteActivity,
};