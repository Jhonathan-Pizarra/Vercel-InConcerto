import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateTransport from "@/components/transports/UpdateTransport";
import DeleteTransport from "@/components/transports/DeleteTransport";
import {Box, Card, CardActions, CardContent, Grid, IconButton, Link as MuiLink, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import NotFound from "../404";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '30%',
    },
    detail:{
        color: "#3f51b5",
    },
    cardDimension: {
        /*width: 240,
        height: 420*/
        width: 400,
        height: 402
    },
    title: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
    },
    content: {
        flex: '1 0 ',
    },
}));

const TransportesID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: transport, error} = useSWR(`/transports/${id}`, fetcher);

    // if(error) return <div>"Recarga para continuar..."</div>;
    if(error) return <div><NotFound/></div>;
    if(!transport) return <Loading/>;

    return (
        <div>
            <h1>Detalle Transporte</h1>
            <div>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    justify="center"
                    //alignItems="center"
                >
                    <Card className={classes.root}>
                        <Box m={2} className={classes.cardDimension}>
                            <CardContent className={classes.content}>

                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}} className={classes.title}>
                                        <h2>{transport.type}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Capacidad de pasajeros:</b> {transport.capacity}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Capacidad para instrumentos:</b> {transport.instruments_capacity} Kg</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Disponibilidad:</b> {((transport.disponibility) === 0) ? "No" : "Si" }</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Matrícula:</b> {transport.licence_plate}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <b>Calendario:</b>&ensp;{transport.calendar}
                                        <Link href={transport.calendar_id} passHref>
                                            <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>
                                            {/*<MuiLink>
                                                Ver
                                            </MuiLink>*/}
                                        </Link>
                                    </Typography>

                                    <Grid container spacing={3} >
                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <UpdateTransport id={transport.id}/>
                                                </MuiLink>
                                            </CardActions>
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <DeleteTransport id={transport.id}/>
                                                </MuiLink>
                                            </CardActions>
                                        </Grid>
                                    </Grid>



                            </CardContent>
                        </Box>

                    </Card>
                </Grid>
            </div>
        </div>
    );

};

export default withAuth(TransportesID);
