import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Box, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import React from "react";
import UpdateFestival from "@/components/festivals/UpdateFestival";
import DeleteFestival from "@/components/festivals/DeleteFestival";
import ReadFestivalConcerts from "@/components/festivals/concerts/ReadFestivalConcerts";
import CreateFestivalConcert from "@/components/festivals/concerts/CreateFestivalConcert";
import NotFound from "../404";
import ReadArtistCalendars from "@/components/artists/calendars/ReadArtistCalendars";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '100%',
    },
    image: {
        textAlign: 'center',
        marginLeft: 'auto',
        display: "block",
        marginRight: 'auto'
    },
}));

const FestivalID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: festival, error, mutate} = useSWR(`/festivals/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!festival) return <Loading/>;

    return (
        <div>
            <h1>Detalle Festival</h1>
            <div>

                {/*{data.image}
                Dimesnions: item xs={12} sm={6} md={4} lg={4} xl={4}
                */}


                <Paper className={classes.paper}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={3} md={4} lg={4} xl={4} className={classes.image} >
                                <CardMedia
                                    display="flex"
                                    component="img"
                                    alt={festival.name}
                                    height="100%"
                                    width= "100%"
                                    //image={`https://inconcerto.herokuapp.com/storage/${festival.image}`}
                                    //image={`https://res.cloudinary.com/inconcerto/image/upload/${festival.image}`}
                                    image={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${festival.image}`}
                                    title={festival.name}
                                />
                            </Grid>

                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <h2>{festival.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>DESCRIPCIÓN:</b>&ensp;{festival.description}</p>
                                    </Typography>
                                    <ReadFestivalConcerts id={festival.id}/>
                                    {/*<Typography variant="body2" color="textSecondary">Conciertos: ...(Pendiente)</Typography>*/}
                                </Grid>
                                <Grid container>
                                    <CardActions>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

                                            <CreateFestivalConcert id={festival.id}/>

                                        </Grid>
                                    </CardActions>
                                    <CardActions>
                                        {/*<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>*/}
                                        {/*    <Link>*/}
                                        {/*        <CreateFestivalConcert id={festival.id}/>*/}
                                        {/*    </Link>*/}
                                        {/*</Grid>*/}
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

                                            <UpdateFestival/>

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

                                                {/*<DeleteFestival />*/}
                                            <DeleteFestival id={festival.id} />

                                        </Grid>
                                    </CardActions>
                                </Grid>
                            </Grid>
                            {/*<Grid item>*/}
                            {/*    <Typography variant="subtitle1">$19.00</Typography>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );

};

export default withAuth(FestivalID);

