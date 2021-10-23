import api from "./api";

async function getAll(idLodging) {
    return await api.get(`/lodgings/${idLodging}/users`);
}

async function getById(idLodging, idUser) {
    return await api.get(`/lodgings/${idLodging}/users/${idUser}`);
}

async function create(idLodging, data) {
    return await api.post(`/lodgings/${idLodging}/users`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/*async function update(idCalendar, idArtist, data) {
    return await api.put(`/calendars/${idCalendar}/artists/${idArtist}`, data);
}*/

async function deleteLodgingUser(idLodging, idUser) {
    return await api.delete(`/lodgings/${idLodging}/users/${idUser}`);
}

export const LodgingUser = {
    getAll,
    getById,
    create,
    //update,
    delete: deleteLodgingUser,
};