import api from "./api";

async function getAll(idUser) {
    return await api.get(`/users/${idUser}/lodgings`);
}

async function getById(idUser, idLodging) {
    return await api.get(`/users/${idUser}/lodgings/${idLodging}`);
}

async function create(idUser, data) {
    return await api.post(`/users/${idUser}/lodgings`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/*async function update(idCalendar, idArtist, data) {
    return await api.put(`/calendars/${idCalendar}/artists/${idArtist}`, data);
}*/

async function deleteUserLodging(idUser, idLodging) {
    return await api.delete(`/users/${idUser}/lodgings/${idLodging}`);
}

export const UserLodging = {
    getAll,
    getById,
    create,
    //update,
    delete: deleteUserLodging,
};