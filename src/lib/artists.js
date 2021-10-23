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
    return await api.get(`/artists`);
}

async function getById(id) {
    return await api.get(`/artists/${id}`);
}

async function create(data) {
    return await api.post(`/artists`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/artists/${id}`, data);
}

async function deleteArtist(id) {
    return await api.delete(`/artists/${id}`);
}

export const Artist = {
    getAll,
    getById,
    create,
    update,
    delete: deleteArtist,
};