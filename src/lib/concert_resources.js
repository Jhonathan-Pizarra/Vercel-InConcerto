import api from "./api";

async function getAll(idConcert) {
    return await api.get(`/concerts/${idConcert}/resources`);
}

async function getById(idConcert, idResource) {
    return await api.get(`/concerts/${idConcert}/resources/${idResource}`);
}

async function create(idConcert, data) {
    return await api.post(`/concerts/${idConcert}/resources`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/*async function update(idCalendar, idArtist, data) {
    return await api.put(`/calendars/${idCalendar}/artists/${idArtist}`, data);
}*/

async function deleteConcertResource(idConcert, idResource) {
    return await api.delete(`/concerts/${idConcert}/resources/${idResource}`);
}

export const ConcertResource = {
    getAll,
    getById,
    create,
    //update,
    delete: deleteConcertResource,
};