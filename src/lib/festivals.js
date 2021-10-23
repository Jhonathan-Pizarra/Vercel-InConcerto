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
    return await api.get(`/festivals`);
}

async function getById(id) {
    return await api.get(`/festivals/${id}`);
}

async function create(data) {
    return await api.post(`/festivals`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/festivals/${id}`, data);
}

async function deleteFestival(id) {
    return await api.delete(`/festivals/${id}`);
}

export const Festival = {
    getAll,
    getById,
    create,
    update,
    delete: deleteFestival,
};