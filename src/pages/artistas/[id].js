import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Box, Card, CardContent, Grid, makeStyles, Typography} from "@material-ui/core";
import ReadArtistFeedings from "@/components/artists/feedings/ReadArtistFeedings";
import NotFound from "../404";
import React from "react";
import ReadArtistCalendars from "@/components/artists/calendars/ReadArtistCalendars";
import ReadArtistLodgings from "@/components/artists/lodgings/ReadArtistLodgings";

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
        height: "auto",
    },
    content: {
        flex: '1 0 ',
    },
}));

const ArtistasID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: artist, error} = useSWR(`/artists/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!artist) return <Loading/>;

    return (
        <div>
            <h1>Detalle Artista</h1>
            <div>
                <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <Card className={classes.root}>
                            <Box m={2} className={classes.cardDimension}>
                                <CardContent className={classes.content}>

                                        <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                            <h2>{artist.name} {artist.lastName}</h2>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Cédula o Pasaporte:</b> {artist.ciOrPassport}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Nacionalidad:</b> {artist.nationality}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Email:</b> {artist.mail}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Teléfono:</b> {artist.phone}</p>
                                        </Typography>
                                        <Grid container spacing={3}>
                                            <Grid item>
                                                <Typography variant="body2" color="textSecondary">
                                                    <b>Pasaporte:</b> {((artist.passage) === 0) ? "No" : "Si"}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Nombre artístico:</b> {artist.artisticOrGroupName}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Instrumentos:</b> {artist.instruments}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Teléfono de emergencia:</b> {artist.emergencyPhone}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Mail de emergencia:</b> {artist.emergencyMail}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Grupo alimenticio:</b> {artist.foodGroup}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Observación:</b> {artist.observation}</p>
                                        </Typography>

                                </CardContent>
                            </Box>

                        </Card>

                    </Grid>
                    <Grid item xs={12} sm={6} md={8} lg={9} xl={9}>
                        <ReadArtistCalendars id={artist.id}/>
                    </Grid>
                </Grid>
                <br/>
                <br/>
                {/*<ReadArtistCalendars id={artist.id}/>*/}
                <ReadArtistFeedings id={artist.id}/>
                <ReadArtistLodgings id={artist.id}/>
            </div>
        </div>
    );

};

export default withAuth(ArtistasID);
