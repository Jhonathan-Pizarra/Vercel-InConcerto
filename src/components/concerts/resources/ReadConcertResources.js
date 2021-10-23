import Loading from "@/components/Loading";
import useSWR from "swr";
import {fetcher} from "../../../utils";
import React from 'react';
import {Box, Card, CardActions, CardContent, Grid, makeStyles, Typography} from "@material-ui/core";
import DeleteConcertResource from "@/components/concerts/resources/DeleteConcertResource";
import CreateConcertResource from "@/components/concerts/resources/CreateConcertResource";
import UpdateConcertResource from "@/components/concerts/resources/UpdateConcertResource";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        flexDirection: 'unset',
        position: 'relative',
        top: -75,
        left: 20
    },
    content: {
        flex: '1 0 ',
    },
    cover: {
        width: 151,
    },
    cardDimension: {
        /*width: 240,
        height: 420*/
        width: 400,
        height: 300
    },
    title: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
    },
    body: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 4,
        "-webkit-box-orient": "vertical",
    },

}));

const ReadConcertResources = ({id}) => {

    const classes = useStyles();
    const {data: concertResources, error} = useSWR(`/concerts/${id}/resources`, fetcher);

    if(error) return <p>No se pudieron cargar los recursos...</p>;
    if(!concertResources) return <Loading/>

    return (
        <div>
            <h1>Recursos del concierto</h1>

            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                <CreateConcertResource/>
            </Grid>

            <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                {/*{concertResources.data ? <SnackSuccess/> : <Loading/>}*/}
                {concertResources.data && concertResources.data.map(concertResource => {
                    return(
                        <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} key={concertResource.id}>
                            <Card className={classes.root}>
                                <Box m={2} className={classes.cardDimension}>
                                    <div>
                                        <CardContent className={classes.content}>
                                            <Typography component="h5" variant="h5"  className={classes.title}>
                                                {concertResource.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary"  className={classes.body}>
                                                <p>{concertResource.description}</p>
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary"  className={classes.body}>
                                                <p>Cantidad: {concertResource.quantity}</p>
                                            </Typography>
                                        </CardContent>
                                    </div>
                                </Box>

                            </Card>

                            <div className={classes.details}>
                                <Grid container>
                                    <CardActions>
                                      {/*  <Link href={`${Routes.RESOURCES}/${concertResource.id}`}>
                                            <IconButton aria-label="ver"  size="small">
                                                <FindInPageIcon />
                                            </IconButton>
                                        </Link>*/}
                                        {/*<UpdateResource id={concertResource.id}/>*/}
                                        <UpdateConcertResource idResource={concertResource.id} id={id}/>
                                        <DeleteConcertResource idResource={concertResource.id} idConcert={id}/>
                                    </CardActions>
                                </Grid>
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default ReadConcertResources;
