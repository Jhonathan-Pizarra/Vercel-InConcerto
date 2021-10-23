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
    return await api.get(`/transports`);
}

async function getById(id) {
    return await api.get(`/transports/${id}`);
}

async function create(data) {
    return await api.post(`/transports`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/transports/${id}`, data);
}

async function deleteTransport(id) {
    return await api.delete(`/transports/${id}`);
}

export const Transport = {
    getAll,
    getById,
    create,
    update,
    delete: deleteTransport,
};