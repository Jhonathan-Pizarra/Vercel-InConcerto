import withAuth from "@/hocs/withAuth";
import React from "react";
import ReadConcerts from "@/components/concerts/ReadConcerts";


const Conciertos = () => {

    return (
        <div>
            <ReadConcerts/>
        </div>
    );
}

export default withAuth(Conciertos); //Colocar WitAuth al terminar
