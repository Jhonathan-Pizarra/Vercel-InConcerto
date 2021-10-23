import api from "./api";

async function getAll(idLodging) {
    return await api.get(`/lodgings/${idLodging}/artists`);
}

async function getById(idLodging, idArtist) {
    return await api.get(`/lodgings/${idLodging}/artists/${idArtist}`);
}

async function create(idLodging, data) {
    return await api.post(`/lodgings/${idLodging}/artists`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/*async function update(idCalendar, idArtist, data) {
    return await api.put(`/calendars/${idCalendar}/artists/${idArtist}`, data);
}*/

async function deleteLodgingArtist(idLodging, idArtist) {
    return await api.delete(`/lodgings/${idLodging}/artists/${idArtist}`);
}

export const LodgingArtist = {
    getAll,
    getById,
    create,
    //update,
    delete: deleteLodgingArtist,
};