import React from 'react';
//import styles from "@/styles/NotFound.css";
import Link from 'next/link'
import Routes from "@/constants/routes";
import Image from "next/image";
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    error: {
        textAlign: 'center',
        paddingTop: '25px',
        paddingBottom: '25px',
    },
    titulo: {
        fontFamily: 'cursive'
    }

}));

const Unauthorized = () => {
    const classes = useStyles();

    return (
        <div>
            <Box className={classes.error}>
                <h1 className={classes.titulo}>Error 401!</h1>
                <h1 className={classes.titulo}>Página no autorizada</h1>
                <Image
                    src="/Director.png"
                    alt="InConcerto"
                    width={430}
                    height={390}
                />
                <h2 className={classes.titulo}>Parece que no eres administrador...</h2>
                <h3 className={classes.titulo}>
                    Prueba ir a&ensp;
                    <Link href={Routes.HOME}>
                        <a>Home</a>
                    </Link>
                    &ensp;o&ensp;
                    <Link href={Routes.FESTIVALS}>
                        <a>Festivales</a>
                    </Link>
                    &ensp;en su lugar
                </h3>
            </Box>
        </div>
    );
};

export default Unauthorized;