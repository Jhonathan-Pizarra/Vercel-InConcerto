import api from "./api";

async function getAll(idConcert) {
    return await api.get(`/concerts/${idConcert}/artists`);
}

async function getById(idConcert, idArtist) {
    return await api.get(`/concerts/${idConcert}/artists/${idArtist}`);
}

async function create(idConcert, data) {
    return await api.post(`/concerts/${idConcert}/artists`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/*
async function update(idConcert, idArtist, data) {
    return await api.put(`/concerts/${idConcert}/artists/${idArtist}`, data);
}
*/

async function deleteConcertArtist(idConcert, idArtist) {
    return await api.delete(`/concerts/${idConcert}/artists/${idArtist}`);
}

export const ConcertArtist = {
    getAll,
    getById,
    create,
    //update,
    delete: deleteConcertArtist,
};