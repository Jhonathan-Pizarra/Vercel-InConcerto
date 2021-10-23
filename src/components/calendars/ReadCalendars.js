import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {Accordion, AccordionDetails, AccordionSummary, CardActions, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UpdateCalendar from "@/components/calendars/UpdateCalendar";
import DeleteCalendar from "@/components/calendars/DeleteCalendar";
import Link from "next/link";
import Routes from "@/constants/routes";
import IconButton from "@material-ui/core/IconButton";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import CreateCalendar from "@/components/calendars/CreateCalendar";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        maxWidth: 600,
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        //flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    tercearyHeading : {
        textAlign: "end",
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    detail:{
        color: "#3f51b5",
    },
}));

const ReadCalendars = () => {

    const classes = useStyles();
    const {data: calendars, error} = useSWR(`/calendars`, fetcher);
    const [expanded, setExpanded] = useState(false);

    if(error) return <p>No se pudieron cargar los calendarios...</p>;
    if (!calendars) return <Loading/>;

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <h1>Calendarios de vuelo InConcerto</h1>
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                        <Grid container className={classes.root} spacing={3} direction="column"  justifyContent="flex-start"  alignItems="stretch" component={Paper}>
                            {calendars.data && calendars.data.map(calendar => {
                                return(
                                    <Accordion expanded={expanded === `${calendar.id}`}  key={calendar.id} onChange={handleChange(`${calendar.id}`)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Grid
                                                container
                                                direction="row"
                                                justify="flex-start"
                                                alignItems="center"
                                            >
                                                <Grid container  item >
                                                    <Link href={`${Routes.CALENDARS}/${calendar.id}`}>
                                                        <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                            <FindInPageIcon />
                                                        </IconButton>
                                                    </Link>
                                                    <Typography className={classes.heading}><b className={classes.secondaryHeading}>Artistas:</b> {calendar.artist.map(artist => artist.name+" | ")}</Typography>
                                                </Grid>
                                                <Grid container  item>
                                                    <Typography className={classes.secondaryHeading}><b>Llegada:</b> {calendar.checkIn_Artist}&emsp;&emsp;&emsp;</Typography>
                                                </Grid>
                                            </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="flex-start"
                                                alignItems="center"
                                            >
                                              {/*  xs={6} sm={3}*/}
                                                {/*<Grid container  item >
                                                    <Typography className={classes.secondaryHeading}><b>Salida:&ensp;</b>{calendar.checkOut_Artist}&emsp;&emsp;&emsp;</Typography>
                                                </Grid>*/}
                                                <Grid container  item xs={7} sm={5}>
                                                    <Typography className={classes.secondaryHeading}><b>Salida:&ensp;</b>{calendar.checkOut_Artist}&emsp;&emsp;&emsp;</Typography>
                                                </Grid>
                                                <Grid container  item xs={4} sm={4}>
                                                    <Typography className={classes.secondaryHeading}><b>Proviene de:&ensp;</b>{calendar.comingFrom}</Typography>
                                                </Grid>
                                                <Grid container  item xs={5} sm={3}>
                                                    <Typography className={classes.secondaryHeading} ><b>Número vuelo:&ensp;</b>{calendar.flyNumber}</Typography>
                                                </Grid>


                                            </Grid>


                                            {/*<Typography className={classes.secondaryHeading}><b>Proviene: </b> {calendar.comingFrom}&emsp;&emsp;&emsp;&ensp;</Typography>*/}
                                            {/*<Typography className={classes.tercearyHeading}><b>Número vuelo: </b>{calendar.flyNumber}&emsp;&emsp;&emsp;&ensp;</Typography>*/}
                                            {/*<Typography className={classes.secondaryHeading}><b>Salida: </b> {calendar.checkIn_Artist}</Typography>*/}

                                            {/*<Typography className={classes.secondaryHeading}><b>Proviene de:&ensp;</b>{calendar.comingFrom}</Typography>*/}
                                            {/*<Grid*/}
                                            {/*    container*/}
                                            {/*    direction="row"*/}
                                            {/*    justify="center"*/}
                                            {/*    alignItems="center"*/}
                                            {/*>*/}
                                            {/*    <Typography className={classes.tercearyHeading}><b>Número vuelo:&ensp;</b>{calendar.flyNumber}</Typography>*/}
                                            {/*</Grid>*/}

                                        </AccordionDetails>
                                        {/*<AccordionDetails>
                                <Typography className={classes.tercearyHeading}><b>Número vuelo:&ensp;</b>{calendar.flyNumber}</Typography>
                            </AccordionDetails>*/}
                                        <AccordionDetails>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="flex-start"
                                                alignItems="center"
                                            >
                                                <Grid container item xs={12} sm={6}>
                                                    <Grid item container justify="center" alignItems="center">
                                                        <CardActions xs={3} sm={6} md={6} lg={3} xl={3} >

                                                            <UpdateCalendar id={calendar.id}/>

                                                        </CardActions>
                                                        <CardActions xs={3} sm={6} md={6} lg={3} xl={3} >

                                                            <DeleteCalendar id={calendar.id}/>

                                                        </CardActions>
                                                    </Grid>
                                                    {/*<span><UpdateResource id={resource.id}/></span>*/}
                                                    {/*<span style={{marginLeft:  10}}><DeleteResource id={resource.id}/></span>*/}
                                                </Grid>

                                            </Grid>
                                            {/*<Typography className={classes.secondaryHeading}><b>Salida:&ensp;</b>{calendar.checkOut_Artist}&emsp;&emsp;&emsp;</Typography>*/}
                                            {/*<span style={{marginLeft: 150}}><UpdateCalendar id={calendar.id}/></span>*/}
                                            {/*<span style={{marginLeft:  5}}><DeleteCalendar id={calendar.id}/></span>*/}
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })}
                        </Grid>
                </Grid>
            </div>
            <CreateCalendar/>
        </div>
    )
}

export default ReadCalendars;