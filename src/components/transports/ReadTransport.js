import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {Grid, IconButton, ListItem, ListItemText, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Routes from "@/constants/routes";
import React from "react";
import CreateTransport from "@/components/transports/CreateTransport";
import Link from "next/link";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import UpdateTransport from "@/components/transports/UpdateTransport";
import DeleteTransport from "@/components/transports/DeleteTransport";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        maxWidth: 400,
        width: '100%',
        //backgroundColor: theme.palette.background.paper,
    },
    detail:{
        color: "#3f51b5",
    },
}));

const ReadTransport = () => {

    const classes = useStyles();
    const {data: transports, error} = useSWR(`/transports`, fetcher);

    if(error) return <p>No se pudieron cargar los tranpsortes...</p>;
    if (!transports) return <Loading/>;

    return (
        <div>
            <h1>Transportes InConcerto</h1>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid container className={classes.root} spacing={3} direction="column"  justifyContent="flex-start"  alignItems="stretch" component={Paper}>
                    {/*<List component="nav" className={classes.root} aria-label="mailbox folders">*/}
                        {/*{transports.data ? <SnackSuccess/> : <Loading/>}*/}
                        {transports.data && transports.data.map(transport => {
                            return(
                                <div key={transport.id}>
                                    <ListItem button divider>
                                        <ListItemText primary={transport.type} />
                                        <Link href={`${Routes.TRANSPORTS}/${transport.id}`} passHref>
                                            <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>
                                        </Link>
                                        <UpdateTransport id={transport.id}/>
                                        <DeleteTransport id={transport.id}/>
                                    </ListItem>
                                </div>
                            );
                        })}
                    {/*</List>*/}
                </Grid>
            </Grid>
            <CreateTransport/>
        </div>
    )
}

export default ReadTransport;