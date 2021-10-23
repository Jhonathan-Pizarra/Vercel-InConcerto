import api from "./api";

async function getAll(idCalendar) {
    return await api.get(`/calendars/${idCalendar}/users`);
}

async function getById(idCalendar, idUser) {
    return await api.get(`/calendars/${idCalendar}/users/${idUser}`);
}

async function create(idCalendar, data) {
    return await api.post(`/calendars/${idCalendar}/users`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/*async function update(idCalendar, idArtist, data) {
    return await api.put(`/calendars/${idCalendar}/artists/${idArtist}`, data);
}*/

async function deleteCalendarUser(idCalendar, idUser) {
    return await api.delete(`/calendars/${idCalendar}/users/${idUser}`);
}

export const CalendarUser = {
    getAll,
    getById,
    create,
    //update,
    delete: deleteCalendarUser,
};