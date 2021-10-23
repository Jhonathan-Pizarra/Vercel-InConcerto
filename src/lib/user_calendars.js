import api from "./api";

async function getAll(idUser) {
    return await api.get(`/users/${idUser}/calendars`);
}

async function getById(idUser, idCalendar) {
    return await api.get(`/users/${idUser}/calendars/${idCalendar}`);
}

async function create(idUser, data) {
    return await api.post(`/users/${idUser}/calendars`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/*async function update(idCalendar, idArtist, data) {
    return await api.put(`/calendars/${idCalendar}/artists/${idArtist}`, data);
}*/

async function deleteUserCalendar(idUser, idCalendar) {
    return await api.delete(`/users/${idUser}/calendars/${idCalendar}`);
}

export const UserCalendar = {
    getAll,
    getById,
    create,
    //update,
    delete: deleteUserCalendar,
};