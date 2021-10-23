import withAuth from "@/hocs/withAuth";
import React from "react";
import ReadActivity from "@/components/activities/ReadActivity";


const Actividades = () => {

    return (
        <div>
            <div className="container">
                <ReadActivity/>
            </div>
        </div>
    )
}

export default withAuth(Actividades);
