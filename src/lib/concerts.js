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
    return await api.get(`/concerts`);
}

async function getById(id) {
    return await api.get(`/concerts/${id}`);
}

async function create(data) {
    return await api.post(`/concerts`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/concerts/${id}`, data);
}

async function deleteConcert(id) {
    return await api.delete(`/concerts/${id}`);
}

export const Concert = {
    getAll,
    getById,
    create,
    update,
    delete: deleteConcert,
};