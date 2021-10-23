import BackToTop from "@/components/BackToTop";
import ReactPlayer from 'react-player'
import React from "react";
import {Container, Link as MuiLink, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paper2: {
        //padding: theme.spacing(0),
        textAlign: 'center',
        //color: theme.palette.text.secondary,
    },
    adornated:{
        float: 'left',
        lineHeight: 0.7,
        fontSize: 55,
        color: '#333',
        border: 'solid #333',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        paddingLeft: 5,
        marginRight: 5,
        marginBottom: -5,
    },
    cover: {
        width: 151,
    },
    container2: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerWraper:{
        position: 'relative',
    },
    text: {
      textAlign: 'justify',
      maxWidth: 600,
    }
}));

export default function Home() {

    const classes = useStyles();

    return (
        <Container fixed>
            <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>

                {/*<Grid*/}
                {/*    container*/}
                {/*    direction="column"*/}
                {/*    justifyContent="center"*/}
                {/*    alignItems="center"*/}
                {/*>*/}
                {/*  */}
                {/*    <Grid>*/}
                {/*        <BackToTop/>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}


                <Grid container spacing={3}>

                    <Grid item xs={12} sm={7} md={6} lg={6} xl={6} >
                        <p className={classes.text}>
                            <h2>¿Quiénes somos?</h2>
                            <span className={classes.adornated}>I</span>nconcerto es un colectivo interdisciplinario de artistas, sociólogos, comunicadores y gestores culturales
                            que crean espacios y canales para difundir y revalorizar la música clásica en nuestra época y lugar
                            a través de proyectos que resignifican los protocolos que han situado a ésta,
                            como un arte de y para una determinada clase social e intelectual.

                            La larga trayectoria que ha tenido desde el año 2012 con actividades artísticas para los distintos públicos,
                            en particular con personas que no han tenido contacto con este tipo de arte,
                            han comprobado el potencial de la música de provocar, despertar y reactivar afectos y reacciones únicas en las audiencias.

                            Por este motivo y comprendiendo la importancia que la música clásica tiene en el desarrollo sensible de la sociedad
                            por sus características estéticas, poéticas &ensp; y filosóficas; InConcerto busca llegar a los grupos de personas
                            que por razones sociales, culturales, geográficas y etarias han sido históricamente excluidas
                            desde nuevas formas de acercamiento que potencien a la música clásica como una herramienta de inclusión social.
                            Razón por la cual, InConcerto ha realizado conciertos en distintos lugares tales como mercados, parques,
                            centros de rehabilitación, Instituto de Hansen, cárceles, casa de confianza, ancianatos, etc.
                        </p>
                        <p>
                            -InConcerto 2021-
                        </p>


                    </Grid>

                    <Grid item xs={12} sm={5} md={6} lg={6} xl={6}>
                        <BackToTop/>
                        <ReactPlayer
                            className={classes.playerWraper}
                            url='https://www.youtube.com/watch?v=s4E-riFpywY&t=12s'
                            width="100%"
                            height="80%"
                            playing={false}
                            controls={true}
                        />

                    </Grid>

                </Grid>

                <br/>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} spacing={3}>
                        <br/>
                        <Image
                            src="/logo1-inconcerto.png"
                            alt="InConcerto"
                            width={500}
                            height={390}
                        />

                    </Grid>

                    <Grid container xs={12} sm={6} md={6} lg={6} xl={6} >
                        <Grid item>

                            <br/>
                            <p className={classes.text}>
                                <h2>Misión</h2>
                                Somos una plataforma cultural que fomenta la revalorización y el acceso a la música clásica en nuestra época y lugar, para incidir positivamente en nuestra sociedad. Garantizamos una experiencia transversal desde el campo artístico y promovemos el acceso cultural interdisciplinario con la finalidad de contribuir al desarrollo cultural del país
                                <h2>Visión</h2>
                                Buscamos ser un espacio cultural que transforme la vida de las personas a través de experiencias significativas, asegurando amplitud en el acceso y una programación de calidad que ponga en diálogo al arte.
                            </p>
                            <br/>
                            <br/>
                            <div style={{textAlign: 'center'}}>
                                <i>"Música Clásica en Espacios InUsuales ..."</i>
                            </div>

                        </Grid>

                    </Grid>

                </Grid>

                <br/>

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>

                        <h2>Plataforma</h2>
                        <p className={classes.text}>
                            El presente sistema web ayudará al personal administrativo en la organización de diferentes factores primordiales para la gestión de eventos organizados por Inconcerto,
                            tales como:
                            <ul>
                                <li>
                                    <strong>Gestión de artistas invitados:</strong> Los artistas son nacionales e internacionales por lo que se lleva el control de compras de pasajes, tiempos de llegada y salida, observaciones de alimentación especiales, transporte, etc.
                                </li>
                                <li>
                                    <strong>Gestión de hospedajes:</strong> Se coordina donde se hospedan los artistas invitados teniendo en cuenta los horarios de entrada y salida de los artistas con el fin de optimizar los gastos.
                                </li>
                                <li>
                                    <strong>Gestión de logística:</strong> La fundación cuenta con varios auspicios, entre los cuales están hostales y hoteles, alimentación, transporte, entre otros.
                                </li>
                                <li>
                                    <strong>Gestión de espacios para conciertos:</strong> La fundación está constantemente en búsqueda de espacios poco usuales para ofrecer conciertos. Se lleva un control de estos espacios para facilitar la organización de cada evento.
                                </li>
                                <li>
                                    <strong>Adicionalmente</strong>, la fundación cuenta con una  <a href="https://www.inconcerto.org/inicio" ><b>página web</b></a> con medios adecuados para la difusión de sus actividades para las personas interesadas en sus eventos.
                                </li>
                            </ul>

                        </p>
                        <br/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>

                        <h2>Miembros del Equipo</h2>


                        <Grid container spacing={1}>

                            <Grid item xs={3}>
                                <Image
                                    src="/Alejandra-Pinto.jpg"
                                    alt="Alejandra"
                                    width={150}
                                    height={200}
                                />
                                <div style={{textAlign: 'center'}}>
                                    <p>
                                        <strong>Alejanda Pinto</strong><br/>
                                        Coordinadora General
                                    </p>
                                </div>

                            </Grid>
                            <Grid item xs={3}>
                                <Image
                                    src="/Simon-Gangotena.jpg"
                                    alt="InConcerto"
                                    width={150}
                                    height={200}
                                />
                                <div style={{textAlign: 'center'}}>
                                    <p>
                                        <strong>Simón Gangotena</strong><br/>
                                        Director Ejecutivo/Musical
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <Image
                                    src="/Carlerita1.jpeg"
                                    alt="InConcerto"
                                    width={150}
                                    height={200}
                                />
                                <div style={{textAlign: 'center'}}>
                                    <p>
                                        <strong>Carla Moncayo</strong><br/>
                                        Producción
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <Image
                                    src="/isadora.jpeg"
                                    alt="InConcerto"
                                    width={150}
                                    height={200}
                                />
                                <div style={{textAlign: 'center'}}>
                                    <p>
                                        <strong>Isadora Ponce</strong><br/>
                                        Directora Artística
                                    </p>
                                </div>
                            </Grid>
                        </Grid>


                    </Grid>
                </Grid>

                <br/>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>


                        <div className={classes.paper2}>
                            <Link href='https://www.passline.com/eventos/sumate-a-musicaocupa' passHref >
                                <MuiLink>
                                    <Image
                                        src="/donaciones.png"
                                        alt="InConcerto"
                                        width={400}
                                        height={400}
                                    />
                                </MuiLink>
                            </Link>
                        </div>

                        <br/>
                        {/*<Paper className={classes.paper}>
                    <Link href='https://www.passline.com/eventos/sumate-a-musicaocupa' passHref >
                        <MuiLink>
                            <Image
                                src="/donaciones.png"
                                alt="InConcerto"
                                width={400}
                                height={400}
                            />
                        </MuiLink>
                    </Link>
                </Paper>*/}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>

                        <Image
                            src="/creadores.jpg"
                            alt="InConcerto"
                            width={700}
                            height={500}
                        />

                    </Grid>
                </Grid>

                <br/>

                <BackToTop/>

            </Grid>
        </Container>

    );
}
