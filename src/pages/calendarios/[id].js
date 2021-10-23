import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Box, Card, CardActions, CardContent, Grid, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import DeleteCalendar from "@/components/calendars/DeleteCalendar";
import UpdateCalendar from "@/components/calendars/UpdateCalendar";
import ReadCalendarArtists from "@/components/calendars/artists/ReadCalendarArtists";
import ReadCalendarUsers from "@/components/calendars/users/ReadCalendarUsers";
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
        maxWidth: '30%',
    },
    detail:{
        color: "#3f51b5",
    },
    cardDimension: {
        /*width: 240,
        height: 420*/
        width: 400,
        height: 370
    },
    content: {
        flex: '1 0 ',
    },
}));

const CalendariosID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: calendar, error} = useSWR(`/calendars/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!calendar) return <Loading/>;

    return (
        <div>
            <h1>Detalle Calendario</h1>
            <div>
                <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <Card className={classes.root}>
                            <Box m={2} className={classes.cardDimension}>
                                <CardContent className={classes.content}>

                                        <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                            <h2>Fecha de entrada:&ensp;{calendar.checkIn_Artist}</h2>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Fecha de salida:&ensp;</b> {calendar.checkOut_Artist}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>País del que viene:&ensp;</b> {calendar.comingFrom}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Número de vuelo:&ensp;</b> {calendar.flyNumber}</p>
                                        </Typography>
                                        {/*<Typography variant="body2" gutterBottom>*/}
                                        {/*    <p><b>Artista(s) al que pertenece:&ensp;</b>{calendar.artist.map(artist => artist.name+" | ")}</p>*/}
                                        {/*</Typography>*/}

                                        <Grid container spacing={3} >
                                            <Grid item container justify="center" alignItems="center">
                                                <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >

                                                    <UpdateCalendar id={calendar.id}/>

                                                </CardActions>
                                                <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >

                                                    <DeleteCalendar id={calendar.id}/>

                                                </CardActions>
                                            </Grid>
                                        </Grid>

                                        <br/>

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
                        <ReadCalendarArtists id={calendar.id}/>
                    </Grid>
                </Grid>
            </div>
            <br/>
            <br/>
            {/*<ReadCalendarArtists id={calendar.id}/>*/}
            <ReadCalendarUsers id={calendar.id}/>
        </div>
    );

};

export default withAuth(CalendariosID);
