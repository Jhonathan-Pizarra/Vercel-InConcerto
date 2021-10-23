import {Avatar, Box, Container, Grid, Link, makeStyles} from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import React from "react";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
    copyright: {
        textAlign: 'center',
        paddingTop: '25px',
        paddingBottom: '25px',
        backgroundColor: '#616161',
        color: "white",
    },
    root: {
        display: 'inline-flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    foot:{
        backgroundColor: '#424242',
        color: "white",
    },
    logo: {
        textAlign: 'center',
        display: "none",
        padding: 8,
        //maxHeight: 64,
        maxHeight: 100,
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
        "& a img": {
            //maxHeight: 45,
            maxHeight: 75,
        },
    },
    fondo:{
        backgroundColor: 'white',
    },
    facebook:{
        color: "#3b5998",
    },
    istagram:{
        color: "#DE1B85",

    },
    youtube:{
        color: "#c4302b",
    },
    redes:{
        textAlign: 'center',
    },
    ubicacion:{
        color: '#f44336',
    },
    phone:{
        color: '#3d5afe',
    },
    mail:{
        color: '#fdd835',
    },

}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div style={{paddingTop: 155}}>
            <Box px={{xs: 3, sm: 10}} py={{xs: 5, sm:10}} className={classes.foot}>
                <Container>
                    <Grid container spacing={5}>

                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Redes Sociales</Box>
                            <Box className={classes.logo}>
                                <Image
                                    src="/logo1-inconcerto.png"
                                    alt="InConcerto"
                                    width={136}
                                    height={100}
                                />
                            </Box>
                            <Box className={classes.redes}>
                                <div className={classes.root}>
                                    <Avatar className={classes.fondo}>
                                        <Link href="https://www.facebook.com/Inconcerto" color="inherit">
                                            <IconButton aria-label="ver"  size="small">
                                                <FacebookIcon className={classes.facebook}/>
                                            </IconButton>
                                        </Link>
                                    </Avatar>
                                    <Avatar className={classes.fondo}>
                                        <Link href="https://www.instagram.com/inconcerto.ecuador/" color="inherit">
                                            <IconButton aria-label="ver"  size="small">
                                                <InstagramIcon className={classes.istagram}/>
                                            </IconButton>
                                        </Link>
                                    </Avatar>
                                    <Avatar className={classes.fondo}>
                                        <Link href="https://www.youtube.com/channel/UCG7HMHAHc1opuLRvUi6DHdg/" color="inherit">
                                            <IconButton aria-label="ver"  size="small">
                                                <YouTubeIcon className={classes.youtube} />
                                            </IconButton>
                                        </Link>
                                    </Avatar>
                                </div>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Contacto</Box>
                            <Box style={{  paddingTop: 30,}}>
                                <Link href="https://goo.gl/maps/gyjaLhJFGpnh9sRp6" color="inherit">
                                    <IconButton aria-label="ver"  size="small">
                                        <LocationOnIcon className={classes.ubicacion}/>
                                    </IconButton>
                                    9 de Octubre &, Quito 170143
                                </Link>
                            </Box>
                            <Box>
                                <Link href="https://api.whatsapp.com/send?phone=593999873989&text=%C2%A1Hola!%20" color="inherit">
                                    <IconButton aria-label="ver"  size="small">
                                        <PhoneIcon className={classes.phone}/>
                                    </IconButton>
                                    +593 995043446
                                </Link>
                            </Box>
                            <Box>
                                <Link href="mailto:inconcerto.comunicacion@gmail.com" color="inherit">
                                    <IconButton aria-label="ver"  size="small">
                                        <MailIcon className={classes.mail}/>
                                    </IconButton>
                                    inconcerto.comunicacion@gmail.com
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Nosotros</Box>
                            <Box style={{  paddingTop: 30,}}>
                                InConcerto es una fundación sin fines de lucro que tiene como objetivo promover el desarrollo y la creación de nuevos espacios de expresión. Se trabaja desde el 2012 en proyectos interdisciplinarios que involucren a la música clásica en nuestro contexto y época. Repensar la música clásica y su papel en el ahora es también pensar su relación con el tejido social y simbólico y su participación en la construcción del conocimiento.
                            </Box>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
            <div className={classes.copyright}>
                <Container >
                    &copy; {new Date().getFullYear()} Copyright Inconcerto
                </Container>
            </div>
        </div>
    )
}

export default Footer;