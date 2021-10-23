import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Card, CardActions, CardContent, Grid, Link as MuiLink, Typography} from "@material-ui/core";
import Routes from "@/constants/routes";
import React from "react";
import Link from "next/link";
import UpdateFeedingPlace from "@/components/feeding-places/UpdateFeedingPlace";
import DeleteFeedingPlace from "@/components/feeding-places/DeleteFeedingPlace";
import CreateFeedingPlace from "@/components/feeding-places/CreateFeedingPlace";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        //minWidth: 275,
    },
    title: {
        //fontSize: 14,
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
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
    details: {
        flexDirection: 'unset',
        position: 'relative',
        top: -75,
        left: 25,
        //right: 30
    },
    cardDimension: {
        width: 400,
        height: 320
    },
    grow: {
        flexGrow: 1,
    },
    content: {
        flex: '1 0 ',
    },
});

const ReadFeedingPlace = () => {

    const classes = useStyles();
    const {data: fplaces, error} = useSWR(`/feeding_places`, fetcher);

    if(error) return <p>No se pudieron cargar los lugares...</p>;
    if (!fplaces) return <Loading/>;

    return (

        <div>
            <h1>Huecas InConcerto</h1>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                justify="center"
                //alignItems="center"
            >

                <Grid container className={classes.root} spacing={3} direction='row' justify="flex-start" >
                    {/*{fplaces.data ? <SnackSuccess/> : <Loading/>}*/}
                    {fplaces.data && fplaces.data.map(fplace => {
                        return(
                            <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} key={fplace.id}>
                                <Card className={classes.root}>
                                    <Box m={2} className={classes.cardDimension}>
                                        <div>
                                            <CardContent className={classes.content}>
                                                <Typography component="h5" variant="h5"  className={classes.title}>
                                                    {fplace.name}
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary"  className={classes.direction}>
                                                    <p><b>Dirección:</b>&nbsp;{fplace.address}</p>
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary"  className={classes.body}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="flex-end"
                                                        alignItems="center"
                                                    >
                                                        <b>Disponible:</b>&nbsp;{fplace.permit ? "Si" : "No" }
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="flex-end"
                                                        alignItems="center"
                                                    >
                                                        <b>Aforo:</b>&nbsp;{fplace.aforo}
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="flex-end"
                                                        alignItems="center"
                                                    >
                                                        <Link href={`${Routes.FEEDINGPLACES}/${fplace.id}`} passHref >
                                                            <MuiLink>
                                                                <Button size="small" color="primary">
                                                                    Ver más
                                                                </Button>
                                                            </MuiLink>
                                                        </Link>

                                                    </Grid>
                                                </Typography>
                                                <br/>
                                            </CardContent>
                                        </div>
                                    </Box>
                                </Card>
                                <div className={classes.details}>
                                    <Grid item container justify="center" alignItems="center">
                                        <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >

                                            <UpdateFeedingPlace id={fplace.id}/>
                                            <DeleteFeedingPlace  id={fplace.id}/>

                                        </CardActions>
                                    </Grid>
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>

            <CreateFeedingPlace/>
        </div>
    )
}

export default ReadFeedingPlace;