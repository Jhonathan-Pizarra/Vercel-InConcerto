/**
 * Created by Chalo
 */

const publicRoutes = {
    HOME: "/",
    LOGIN: "/login",
    //REGISTER: "/register",
    FESTIVALS: "/festivales",
    // USERS: "/usuarios",
    // USERS_ID: `/usuario/:id`,
    //ABOUT: "/about",
    FORGET_PASSWORD: "/olvide-mi-clave",
    RESET_PASSWORD: "/restablecer-clave",
};

const privateRoutes = {
    //FESTIVALS_ID: "/festivales/:id",
    CONCERTS: "/conciertos",
    //CONCERT_ID: "/concert/:id",
    ESSAYS: "/ensayos",
    //ESSAYS_ID: "/ensayos/:id",
    ARTISTS: "/artistas",
    //ARTISTS_ID: "/artistas/:id",
    RESOURCES: "/recursos",
    //RESOURCES_ID: "recursos/:id",
    PLACES: "/lugares-concierto",
    //PLACES_ID: "/places/:id",
    CALENDARS: "/calendarios",
    //CALENDARS_ID: "/calendarios/:id",
    TRANSPORTS: "/transportes",
    //TRANSPORTS_ID: "/transportes/:id",
    LODGINGS: "/hospedajes",
    //LODGINGS_ID: "/hospedajes/:id",
    FEEDINGPLACES: "/lugares-alimentacion",
    //FEEDINGPLACES_ID: "/lugares-alimentacion/:id",
    FEEDINGS: "/alimentaciones",
    //FEEDINGS_ID: "/alimentacion/:id",
    ACTIVITIES: "/actividades",
    //ACTIVITIES_ID: "/actividades/:id",
    //FESTIVALCONCERTS: "festivales/:id/conciertos",
    //CALENDARARTISTS: "calendarios/:id/artistas",
    //REGISTER: "/register",
    USERS: "/usuarios",
};

const Routes = {
    ...publicRoutes,
    ...privateRoutes,
};
export default Routes;