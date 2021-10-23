import api from "./api";

async function getAll(idResource) {
    return await api.get(`/resources/${idResource}/concerts`);
}

async function getById(idResource, idConcert) {
    return await api.get(`/resources/${idResource}/concerts/${idConcert}`);
}

async function create(idResource, data) {
    return await api.post(`/resources/${idResource}/concerts`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/*async function update(idCalendar, idArtist, data) {
    return await api.put(`/calendars/${idCalendar}/artists/${idArtist}`, data);
}*/

async function deleteResourceConcert(idResource, idConcert) {
    return await api.delete(`/resources/${idResource}/concerts/${idConcert}`);
}

export const ResourceConcert = {
    getAll,
    getById,
    create,
    //update,
    delete: deleteResourceConcert,
};