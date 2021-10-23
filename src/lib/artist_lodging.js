import api from "./api";

async function getAll(idArtist) {
    return await api.get(`/artists/${idArtist}/lodgings`);
}

async function getById(idArtist, idLodging) {
    return await api.get(`/artists/${idArtist}/lodgings/${idLodging}`);
}

async function create(idArtist, data) {
    return await api.post(`/artists/${idArtist}/lodgings`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/*async function update(idCalendar, idArtist, data) {
    return await api.put(`/calendars/${idCalendar}/artists/${idArtist}`, data);
}*/

async function deleteArtistLodging(idArtist, idLodging) {
    return await api.delete(`/artists/${idArtist}/lodgings/${idLodging}`);
}

export const ArtistLodging = {
    getAll,
    getById,
    create,
    //update,
    delete: deleteArtistLodging,
};