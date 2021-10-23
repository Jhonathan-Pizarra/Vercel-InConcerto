import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
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
import UpdateActivity from "@/components/activities/UpdateActivity";
import DeleteActivity from "@/components/activities/DeleteActivity";
import React from "react";
import FindInPageIcon from "@material-ui/icons/FindInPage";
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

const ActividadesID = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: activity, error} = useSWR(`/activityfestivals/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!activity) return <Loading/>;

    return (
        <div>
            <h1>Detalle Actividad</h1>
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
                                        <h2>{activity.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Fecha:</b> {activity.date}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Observación:</b> {activity.observation}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Descripción:</b> {activity.description}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <b>Festival:</b>&ensp;{activity.festival}
                                        <Link href={activity.festival_id} passHref>
                                            <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>
                                            {/*<MuiLink>
                                                Ver
                                            </MuiLink>*/}
                                        </Link>
                                    </Typography>

                                    <Typography variant="body2" gutterBottom>
                                        <b>Responsable:</b>&ensp;{activity.user}
                                        <Link href={activity.user_id} passHref>
                                            <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>
                                            {/*<MuiLink>
                                                Ver
                                            </MuiLink>*/}
                                        </Link>
                                    </Typography>

                                    <br/>

                                    <Grid container spacing={2}>
                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <MuiLink>
                                                    <UpdateActivity id={activity.id}/>
                                                </MuiLink>
                                            </CardActions>
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <MuiLink>
                                                    <DeleteActivity id={activity.id}/>
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

export default withAuth(ActividadesID);
