import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {Box, Button, Card, CardActions, CardContent, Grid, Link as MuiLink, Typography} from "@material-ui/core";
import Link from "next/link";
import Routes from "@/constants/routes";
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import UpdateConcertPlace from "@/components/concert-places/UpdateConcertPlace";
import DeleteConcertPlace from "@/components/concert-places/DeleteConcertPlace";
import CreateConcertPlace from "@/components/concert-places/CreateConcertPlace";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        minWidth: 275,
    },
    title: {
        //fontSize: 14,
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
    },
    details: {
        flexDirection: 'unset',
        position: 'relative',
        top: -75,
        left: 25,
        //right: 50,
    },
    direction: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2 ,
        "-webkit-box-orient": "vertical",
    },
    body: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
    },
    cardDimension: {
        width: 340,
        height: 400
    },
    grow: {
        flexGrow: 1,
    },
    content: {
        flex: '1 0 ',
    },
    actions: {
        flexDirection: 'unset',
        position: 'relative',
        top: 5,
        left: 4
    },
});

const ReadConcertPlace = () => {

    const classes = useStyles();
    const {data: places, error} = useSWR(`/places`, fetcher);

    if(error) return <p>No se pudieron cargar los lugares...</p>;
    if (!places) return <Loading/>;

    return (
        <div>
            <h1>Lugares InConcierto</h1>
            <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                {/*{places.data ? <SnackSuccess/> : <Loading/>}*/}
                {places.data && places.data.map(place => {
                    return(
                        <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} key={place.id}>
                            <Card className={classes.root}>
                                <Box m={2} className={classes.cardDimension}>
                                    <div>
                                        <CardContent className={classes.content}>
                                            <Typography component="h5" variant="h5"  className={classes.title}>
                                                {place.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary"  className={classes.direction}>
                                                <p><b>Dirección:</b> {place.address}</p>
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary"  className={classes.body}>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="flex-end"
                                                    alignItems="center"
                                                >
                                                    <b>Permiso:</b>&nbsp;{place.permit ? "Si" : "No" }
                                                </Grid>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="flex-end"
                                                    alignItems="center"
                                                >
                                                    <b>Aforo:</b>&nbsp;{place.aforo}
                                                </Grid>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="flex-end"
                                                    alignItems="center"
                                                >
                                                    <Link href={`${Routes.PLACES}/${place.id}`} style={{textAlign: "center"}} passHref >
                                                        <MuiLink>
                                                            <Button size="small" color="primary">
                                                                Detalle
                                                            </Button>
                                                        </MuiLink>
                                                    </Link>
                                                </Grid>
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary"  className={classes.body}>
                                                <p><b>Descripción: </b>{place.description}</p>
                                            </Typography>
                                            {/*<Grid*/}
                                            {/*    container*/}
                                            {/*    direction="row"*/}
                                            {/*    justify="flex-end"*/}
                                            {/*    alignItems="center"*/}
                                            {/*>*/}
                                            {/*    <Link href={`${Routes.PLACES}/${place.id}`} style={{textAlign: "center"}}>*/}
                                            {/*        <Button size="small" color="primary">*/}
                                            {/*            Ver más*/}
                                            {/*        </Button>*/}
                                            {/*    </Link>*/}
                                            {/*</Grid>*/}
                                            <br/>
                                            {/*<div className={classes.actions}>
                                                <Grid container spacing={3}>

                                                    <Grid item container justify="center" alignItems="center">
                                                        <CardActions xs={12} sm={12} md={12} lg={4} xl={2} >
                                                            <MuiLink>
                                                                <UpdateConcertPlace id={place.id}/>
                                                            </MuiLink>
                                                            <MuiLink>
                                                                <DeleteConcertPlace id={place.id}/>
                                                            </MuiLink>
                                                        </CardActions>
                                                    </Grid>

                                                </Grid>
                                            </div>*/}
                                        </CardContent>
                                    </div>
                                </Box>
                            </Card>
                            <div className={classes.details}>
                                <Grid container>
                                    <CardActions >
                                        <UpdateConcertPlace id={place.id}/>
                                        <DeleteConcertPlace id={place.id}/>
                                    </CardActions>
                                </Grid>
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
            <CreateConcertPlace/>
        </div>
    );
}

export default ReadConcertPlace; //Colocar WithAuth Al terminar