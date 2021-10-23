// import api from "./api";
//
// async function getById(id){
//     return  await api.get(`/festivals/${id}`);
//     //`${process.env.NEXT_PUBLIC_API_BASE_URL}/festivals/${id}`
// }
//
// export const Festival = {
//     getById
// }

import api from "./api";

async function getAll() {
    return await api.get(`/calendars`);
}

async function getById(id) {
    return await api.get(`/calendars/${id}`);
}

async function create(data) {
    return await api.post(`/calendars`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/calendars/${id}`, data);
}

async function deleteCalendar(id) {
    return await api.delete(`/calendars/${id}`);
}

export const Calendar = {
    getAll,
    getById,
    create,
    update,
    delete: deleteCalendar,
};