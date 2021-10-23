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
import Routes from "@/constants/routes";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import {fetcher} from "../../../utils";
import CreateUserActivity from "@/components/users/activities/CreateUserActivity";
import UpdateUserActivity from "@/components/users/activities/UpdateUserActivity";
import DeleteUserActivity from "@/components/users/activities/DeleteUserActivity";
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

const ReadUserActivity = ({id}) => {

    //arr = arr.filter(function(entry) { return entry.trim() != ''; });
    const classes = useStyles();
    const {data: activitiesUser, error} = useSWR(`/users/${id}/activityfestivals`, fetcher);

    if (error) return <p>Recarga la página para continuar...</p>;
    if (!activitiesUser) return <Loading/>;

    return (
        <div>
            <h1>Tareas Usuario</h1>

            <Grid container alignItems="flex-start" justify="center" direction="row">
                <CreateUserActivity/>
            </Grid>
            
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {/*justify='flex-start'*/}
                <Grid container className={classes.root} spacing={3} direction="column"  justifyContent="flex-start"  alignItems="stretch" component={Paper}>
                    {/*{activities.data ? <SnackSuccess/> : <Loading/>}*/}
                    {activitiesUser && activitiesUser.map(activity => {
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
                                    <UpdateUserActivity idActivity={activity.id}/>
                                    {/*<UpdateActivity id={activity.id}/>*/}
                                    <DeleteUserActivity id={activity.id} idUser={id}/>
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
{/*
            <CreateActivity/>
*/}
        </div>
    )
}

export default ReadUserActivity;