import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Box, Card, CardActions, CardContent, Grid, Link as MuiLink, makeStyles, Typography} from "@material-ui/core";
import React from "react";
import UpdateFeedingPlace from "@/components/feeding-places/UpdateFeedingPlace";
import DeleteFeedingPlace from "@/components/feeding-places/DeleteFeedingPlace";
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
    items: {
        textAlign: "center",
    },
    cardDimension: {
        /*width: 240,
        height: 420*/
        width: 400,
        height: 300
    },
    content: {
        flex: '1 0 ',
    },
}));

const FeedingPlaceID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: fplace, error} = useSWR(`/feeding_places/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!fplace) return <Loading/>;

    return (
        <div>
            <h1>Detalle Lugar Alimentación</h1>
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

                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{fplace.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Dirección:</b>&ensp;{fplace.address}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Aforo:</b>&ensp;{fplace.aforo}</p>
                                    </Typography>
                                    <Grid container spacing={3} justify="center" alignItems="center">
                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Permiso:</b> {((fplace.permit) === 0) ? "No" : "Si"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <Grid container spacing={3}>

                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <UpdateFeedingPlace id={fplace.id}/>
                                                </MuiLink>
                                            </CardActions>
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <DeleteFeedingPlace  id={fplace.id}/>
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

export default withAuth(FeedingPlaceID);
