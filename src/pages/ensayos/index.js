import withAuth from "@/hocs/withAuth";
import React from "react";
import ReadEssays from "@/components/essays/ReadEssays";


const Ensayos = () => {

    return (
        <div>
            <ReadEssays/>
        </div>
    )
}

export default withAuth(Ensayos);
