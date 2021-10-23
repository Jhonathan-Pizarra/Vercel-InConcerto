import axios from "axios";

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true, //Enviar cookie automáticamente al servidor
});

//Entendido! Status 200 ok ;)

/*
api.interceptors.request.use(function (config) {
    // Revisar el local Storage a ver si tengo un token
    const token = localStorage.getItem('token');

    // Si hay token incluir en la cabecera
    if (token) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);*/
