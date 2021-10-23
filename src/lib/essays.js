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
    return await api.get(`/essays`);
}

async function getById(id) {
    return await api.get(`/essays/${id}`);
}

async function create(data) {
    return await api.post(`/essays`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/essays/${id}`, data);
}

async function deleteEssay(id) {
    return await api.delete(`/essays/${id}`);
}

export const Essay = {
    getAll,
    getById,
    create,
    update,
    delete: deleteEssay,
};