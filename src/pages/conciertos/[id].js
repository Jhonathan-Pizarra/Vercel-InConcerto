import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateConcert from "@/components/concerts/UpdateConcert";
import React from "react";
import DeleteConcert from "@/components/concerts/DeleteConcert";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    Link as MuiLink,
    makeStyles,
    Typography
} from "@material-ui/core";
import Link from "next/link";
import ReadConcertArtists from "@/components/concerts/artists/ReadConcertArtists";
import ReadConcertResources from "@/components/concerts/resources/ReadConcertResources";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import NotFound from "../404";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '50%',
    },
    items: {
        textAlign: "center",
    },
    title: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
    },
    detail:{
        color: "#3f51b5",
    },
    cardDimension: {
        /*width: 240,
        height: 420*/
        width: 400,
        height: 476
    },
    content: {
        flex: '1 0 ',
    },
}));

const ConciertosID = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: concert, error} = useSWR(`/concerts/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!concert) return <Loading/>;

    return (
        <div>
            <h1>Detalle Concierto</h1>
            <div>
                <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <Card className={classes.root}>
                            <Box m={2} className={classes.cardDimension}>
                                <CardContent className={classes.content}>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}} className={classes.title}>
                                        <h2>{concert.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Fecha/Hora:</b>&ensp;{concert.dateConcert}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Duración:</b>&ensp;{concert.duration}</p>
                                    </Typography>
                                    <Grid container spacing={3} justify="center" alignItems="center">
                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Gratis:</b> {((concert.free) === 0) ? "No" : "Si"}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>InsiItu:</b> {((concert.insitu) === 0) ? "No" : "Si"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <Typography variant="body2" gutterBottom>
                                        <b>Festival:</b>&ensp;{concert.festival}
                                        <Link href={concert.festival_id} passHref>
                                            <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>
                                            {/*<MuiLink>
                                                Ver
                                            </MuiLink>*/}
                                        </Link>
                                    </Typography>

                                    <Typography variant="body2" gutterBottom>
                                        <b>Lugar:</b>&ensp;{concert.place}
                                        <Link href={concert.place_id} passHref>
                                            <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>
                                        </Link>
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <UpdateConcert id={concert.id}/>
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
                                                    <DeleteConcert id={concert.id}/>
                                                </MuiLink>
                                            </CardActions>
                                        </Grid>
                                    </Grid>
                                    <Image
                                        src="/logo1-inconcerto.png"
                                        alt="InConcerto"
                                        width={550}
                                        height={'auto'}
                                    />
                                </CardContent>
                            </Box>

                        </Card>

                    </Grid>
                    <Grid item xs={12} sm={6} md={8} lg={9} xl={9}>
                        <ReadConcertArtists id={concert.id}/>
                    </Grid>
                </Grid>

            </div>
            <br/>
            <br/>
            {/*<ReadConcertArtists id={concert.id}/>*/}
            <ReadConcertResources id={concert.id}/>
        </div>
    );

};

export default withAuth(ConciertosID);
