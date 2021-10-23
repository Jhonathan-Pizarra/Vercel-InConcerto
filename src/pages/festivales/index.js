import React from 'react';
import withAuth from "@/hocs/withAuth";
import ReadFestivals from "@/components/festivals/ReadFestivals";


const Festivales = () => {

    return(
        <div>
            <ReadFestivals/>
        </div>

    );
};


export default withAuth(Festivales);
