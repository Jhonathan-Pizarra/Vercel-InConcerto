import withAuth from "@/hocs/withAuth";
import ReadUsers from "@/components/users/ReadUsers";
import React from "react";
import {useAuth} from "@/lib/auth";
import Loading from "@/components/Loading";
import Unauthorized from "../401";


const Usuarios = () => {

    const { user } = useAuth();

    if(!user) return <Loading/>
    const rol = (user.role === undefined) ? user.user.role : user.role;
    //console.log("Usuario", user.user.name);
    //console.log("Rol", user.user.role);

    return (
        <div>
            <div>
                {rol === 'ROLE_ADMIN' ? (<ReadUsers/>) : (<Unauthorized/>)}
            </div>
        </div>
    )

}

export default withAuth(Usuarios);
