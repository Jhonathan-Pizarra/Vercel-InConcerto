import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Box, Card, CardContent, Grid, makeStyles, Typography} from "@material-ui/core";
import NotFound from "../404";
import React from "react";
import ReadUserCalendars from "@/components/users/calendars/ReadUserCalendars";
import ReadUserFeedings from "@/components/users/feedings/ReadUserFeedings";
import ReadUserActivities from "@/components/users/activities/ReadUserActivities";
import ReadUserLodging from "@/components/users/lodgings/ReadUserLodging";
import Image from "next/image";
import UpdateUser from "@/components/users/UpdateUser";
import {useAuth} from "@/lib/auth";
import UpdateUserID from "@/components/users/UpdateUserID";

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
        height: 350
    },
    content: {
        flex: '1 0 ',
    },
}));

const UsuariosID = () => {

    const { user } = useAuth();
    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: current, error} = useSWR(`/users/${id}`, fetcher);

    const ward = (user.id === undefined) ? user.user.id: user.id;
    console.log("En que ruta estoy?", {id});
    console.log("Que usuario soy?", ward);

    if(error) return <div><NotFound/></div>;
    if(!current) return <Loading/>;

    const d = new Date(current.created_at); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    const year = d.getFullYear();
    const month = (d.getMonth()+1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    //var hours = ('0'+d.getHours()).substr(-2);
    //var min = d.getMinutes().toString().padStart(2, "0");
    const fulldate = year+'-'+month+'-'+day;

    return (
        <div>
            <h1>Detalle Usuario</h1>
            <div>
                <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <Card className={classes.root}>
                            <Box m={2} className={classes.cardDimension}>
                                <CardContent className={classes.content}>


                                        <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    {ward === current.id ? ( <UpdateUserID id={current.id}/>) : "📋"}
                                                </Grid>
                                                <Grid item>
                                                    <h2>&nbsp;{current.name} </h2>
                                                </Grid>
                                            </Grid>


                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Fecha Registro:</b>&ensp;{fulldate}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Email:</b>&ensp;{current.email}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Rol:</b>&ensp;{current.role === 'ROLE_ADMIN' ? 'Administrador':'Usuario'}</p>
                                        </Typography>

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
                        <ReadUserActivities id={current.id}/>
                    </Grid>
                </Grid>
            </div>
            <br/>
            <ReadUserCalendars id={current.id}/>
            <ReadUserFeedings id={current.id}/>
            {/*<ReadUserActivities id={user.id}/>*/}
            <ReadUserLodging id={current.id}/>
        </div>
    );

};

export default withAuth(UsuariosID);
