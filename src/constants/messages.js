const translateMessage = (message) =>{

    const messages = {
        //Login
        'invalid_credentials': 'Usuario y/o clave incorrectos',
        'not_registered': 'No existe una cuenta con el correo proporcionado',
        'already_registered': 'Ya existe una cuenta con el correo proporcionado',
        'token_absent': "Inicia sesión para continuar",
        //Modulos
        'The name has already been taken.': 'Ese ya existe, pruebe con otro',
        'The email has already been taken.': 'Ese email ya existe, prueba con otro',
        'The address has already been taken.': 'Esa dirección ya fue registrada, intente con otra',
        'The given data was invalid.': 'Los datos no son válidos, inténtelo otra vez.',
        'undefined': "No hay datos.",
        'The image must be an image.': 'No se ha cargado una imagen.',
        'The image has invalid image dimensions.': 'La imagen no tiene dimensiones permitirdas (min 600x600)',
        //'[object Object]': 'No podrá eliminarse si está vinculado',
        //'[object XMLHttpRequest]': 'La solicitud no se completó,
        'El campo name es obligatorio.': 'El nombre es necesario',
        'The name must be a string.' : 'No escribiste ningún nombre',
        'The description must be a string.' : 'No diste ninguna descripción',

    };

    return messages[message] || message;
};

export default translateMessage;