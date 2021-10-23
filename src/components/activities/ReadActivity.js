import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {
    Avatar,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Paper
} from "@material-ui/core";
import Link from "next/link";
import React from 'react';
import CreateActivity from "@/components/activities/CreateActivity";
import Routes from "@/constants/routes";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import UpdateActivity from "@/components/activities/UpdateActivity";
import DeleteActivity from "@/components/activities/DeleteActivity";
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        display: 'flex',
        maxWidth: 400,
        width: '100%',
    },
    detail:{
        color: "#3f51b5",
    },
}));

const ReadActivity = () => {

    //arr = arr.filter(function(entry) { return entry.trim() != ''; });
    const classes = useStyles();
    const {data: activities, error} = useSWR(`/activityfestivals`, fetcher);

    if (error) return <p>Recarga la página para continuar...</p>;
    if (!activities) return <Loading/>;

    return (
        <div>
            <h1>Tareas InConcerto</h1>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {/*justify='flex-start'*/}
                <Grid container className={classes.root} spacing={3} direction="column"  justifyContent="flex-start"  alignItems="stretch" component={Paper}>
                {/*{activities.data ? <SnackSuccess/> : <Loading/>}*/}
                    {activities.data && activities.data.map(activity => {
                    return(
                        <div key={activity.id}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AssignmentIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={activity.name} secondary={activity.date} />
                                <Link href={`${Routes.ACTIVITIES}/${activity.id}`} passHref>
                                    <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                        <FindInPageIcon />
                                    </IconButton>
                                </Link>
                                <UpdateActivity id={activity.id}/>
                                <DeleteActivity id={activity.id}/>
                                {/*<Link href={`${Routes.ACTIVITIES}/${activity.id}`} passHref >
                                    <MuiLink>
                                        <Button size="small" color="primary">
                                            Ver Detalle
                                        </Button>
                                    </MuiLink>
                                </Link>*/}
                            </ListItem>
                            <Divider variant="inset" />
                        </div>
                    )
                })}
                </Grid>
            </Grid>
            <CreateActivity/>
        </div>
    )
}

export default ReadActivity;