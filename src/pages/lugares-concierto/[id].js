import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateConcertPlace from "@/components/concert-places/UpdateConcertPlace";
import DeleteConcertPlace from "@/components/concert-places/DeleteConcertPlace";
import {Box, Card, CardActions, CardContent, Grid, Link as MuiLink, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import NotFound from "../404";
import ReadConcertPlaceConcerts from "@/components/concert-places/concerts/ReadConcertPlaceConcerts";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        display: "flex",
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
        height: 400
    },
    content: {
        flex: '1 0 ',
    },
}));

const PlaceConcertsID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: place, error} = useSWR(`/places/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!place) return <Loading/>;

    return (
        <div>
            <h1>Detalle Lugar Concierto</h1>
            <div>
                <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <Card className={classes.root}>
                            <Box m={2} className={classes.cardDimension}>
                                <CardContent className={classes.content}>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{place.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Dirección:</b> {place.address}</p>
                                    </Typography>
                                    <Grid container spacing={3}  justify="center" alignItems="center">

                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Permiso:</b> {((place.permit) === 0) ? "No" : "Si"}
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Aforo:</b> {place.aforo}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Descripción:</b> {place.description}</p>
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <UpdateConcertPlace id={place.id}/>
                                                </MuiLink>
                                            </CardActions>
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <DeleteConcertPlace id={place.id}/>
                                                </MuiLink>
                                            </CardActions>
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={8} lg={9} xl={9}>
                        <ReadConcertPlaceConcerts id={place.id}/>

                    </Grid>
                </Grid>
                {/*<h2>Places ID: {place.id}</h2>*/}
                {/*<p>Nombre: {place.name}</p>*/}
                {/*<p>Dirección: {place.address}</p>*/}
            </div>
            {/*  <ReadResourceConcerts id={resource.id}/>*/}
        </div>
    );

};

export default withAuth(PlaceConcertsID);
