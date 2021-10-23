import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Box, Card, CardActions, CardContent, Grid, Link as MuiLink, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ReadLodgingArtists from "@/components/lodgings/artists/ReadLodgingArtists";
import ReadLodgingUsers from "@/components/lodgings/users/ReadLodgingUsers";
import NotFound from "../404";
import UpdateLodging from "@/components/lodgings/UpdateLodging";
import DeleteLodging from "@/components/lodgings/DeleteLodging";

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
    cardDimension: {
        /*width: 240,
        height: 420*/
        width: 400,
        height: 472
    },
    content: {
        flex: '1 0 ',
    },
}));

const HospedajesID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: lodging, error, mutate} = useSWR(`/lodgings/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!lodging) return <Loading/>;

    return (
        <div>
            <h1>Detalle Hospedaje</h1>
            <div>
                <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <Card className={classes.root}>
                            <Box m={2} className={classes.cardDimension}>
                                <CardContent className={classes.content}>

                                        <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                            <h2>{lodging.name}</h2>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Dirección:</b> {lodging.type}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Descripción:</b> {lodging.description}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Observación:</b> {lodging.observation}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Fecha Registro:</b> {lodging.checkIn}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Fecha de salida:</b> {lodging.checkOut}</p>
                                        </Typography>

                                        <Grid container spacing={3}>
                                            <Grid item container justify="center" alignItems="center">
                                                <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                    <MuiLink>
                                                        <UpdateLodging id={lodging.id}/>
                                                    </MuiLink>
                                                    {/*<MuiLink>
                                                        <DeleteConcert/>
                                                    </MuiLink>*/}
                                                </CardActions>
                                                <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                    {/*  <MuiLink>
                                                        <UpdateConcert/>
                                                    </MuiLink>*/}
                                                    <MuiLink>
                                                        <DeleteLodging id={lodging.id}/>
                                                    </MuiLink>
                                                </CardActions>
                                            </Grid>
                                        </Grid>

                                </CardContent>
                            </Box>

                        </Card>

                    </Grid>
                    <Grid item xs={12} sm={6} md={8} lg={9} xl={9}>
                        <ReadLodgingArtists id={lodging.id}/>
                    </Grid>
                </Grid>
            </div>
            <br/>
            <br/>
            {/*<ReadLodgingArtists id={lodging.id}/>*/}
            <ReadLodgingUsers id={lodging.id}/>
        </div>
    );

};

export default withAuth(HospedajesID);
