import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Box, Card, CardActions, CardContent, Grid, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import NotFound from "../404";
import UpdateResource from "@/components/resources/UpdateResource";
import DeleteResource from "@/components/resources/DeleteResource";
import ReadResourceConcerts from "@/components/resources/concerts/ReadResourceConcerts";

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

const ResourcesID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: resource, error} = useSWR(`/resources/${id}`, fetcher);

    // if(error) return <div>"Recarga para continuar..."</div>;
    if(error) return <div><NotFound/></div>;
    if(!resource) return <Loading/>;

    return (
        <div>
            <h1>Detalle Recurso</h1>
            <div>
                <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <Card className={classes.root}>
                            <Box m={2} className={classes.cardDimension}>
                                <CardContent className={classes.content}>

                                        <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                            <h2>{resource.name}</h2>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Cantidad:</b> {resource.quantity}</p>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <p><b>Descripción:</b> {resource.description}</p>
                                        </Typography>


                                        <Grid container spacing={3} >
                                            <Grid item container justify="center" alignItems="center">
                                                <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >

                                                    <UpdateResource id={resource.id}/>
                                                    {/*<UpdateTransport id={transport.id}/>*/}

                                                </CardActions>
                                                <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >

                                                    <DeleteResource id={resource.id}/>
                                                    {/*<DeleteTransport id={transport.id}/>*/}

                                                </CardActions>
                                            </Grid>
                                        </Grid>

                                </CardContent>
                            </Box>

                        </Card>

                    </Grid>
                    <Grid item xs={12} sm={6} md={8} lg={9} xl={9}>
                        <ReadResourceConcerts id={resource.id}/>
                    </Grid>
                </Grid>
            </div>
            {/*<ReadResourceConcerts id={resource.id}/>*/}
        </div>
    );

};

export default withAuth(ResourcesID);
