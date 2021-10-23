import api from "./api";

async function getAll(idCalendar) {
    return await api.get(`/calendars/${idCalendar}/artists`);
}

async function getById(idCalendar, idArtist) {
    return await api.get(`/calendars/${idCalendar}/artists/${idArtist}`);
}

async function create(idCalendar, data) {
    return await api.post(`/calendars/${idCalendar}/artists`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/*async function update(idCalendar, idArtist, data) {
    return await api.put(`/calendars/${idCalendar}/artists/${idArtist}`, data);
}*/

async function deleteCalendarArtist(idCalendar, idArtist) {
    return await api.delete(`/calendars/${idCalendar}/artists/${idArtist}`);
}

export const CalendarArtist = {
    getAll,
    getById,
    create,
    //update,
    delete: deleteCalendarArtist,
};