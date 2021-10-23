import api from "./api";

async function getAll(idArtist) {
    return await api.get(`/artists/${idArtist}/calendars`);
}

async function getById(idArtist, idCalendar) {
    return await api.get(`/artists/${idArtist}/calendars/${idCalendar}`);
}

async function create(idArtist, data) {
    return await api.post(`/artists/${idArtist}/calendars`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/*async function update(idCalendar, idArtist, data) {
    return await api.put(`/calendars/${idCalendar}/artists/${idArtist}`, data);
}*/

async function deleteArtistCalendar(idArtist, idCalendar) {
    return await api.delete(`/artists/${idArtist}/calendars/${idCalendar}`);
}

export const ArtistCalendar = {
    getAll,
    getById,
    create,
    //update,
    delete: deleteArtistCalendar,
};