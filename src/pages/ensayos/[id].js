import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Box, Card, CardActions, CardContent, Grid, IconButton, makeStyles, Typography} from "@material-ui/core";
import Link from "next/link";
import UpdateEssay from "@/components/essays/UpdateEssay";
import React from "react";
import DeleteEssay from "@/components/essays/DeleteEssay";
import NotFound from "../404";
import FindInPageIcon from "@material-ui/icons/FindInPage";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        display: 'flex',
    },
    detail:{
        color: "#3f51b5",
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '100%',
    },
    cardDimension: {
        /*width: 240,
        height: 420*/
        width: 400,
        height: 300
    },
    content: {
        flex: '1 0 ',
    },
}));

const EnsayosID = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: essay, error} = useSWR(`/essays/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!essay) return <Loading/>;

    return (
        <div>
            <h1>Detalle Ensayo</h1>
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
                                    <h2>{essay.name}</h2>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <p><b>Fecha:</b>&ensp;{essay.dateEssay}</p>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <p><b>Lugar:</b>&ensp;{essay.place}</p>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <b>Festival:</b>&ensp;{essay.festival}
                                    <Link href={essay.festival_id} passHref>
                                        <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                            <FindInPageIcon />
                                        </IconButton>
                                    </Link>
                                </Typography>

                                <br/>
                                <Grid container spacing={3}>

                                    <Grid item container justify="center" alignItems="center">
                                        <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >

                                            <UpdateEssay id={essay.id}/>

                                        </CardActions>
                                        <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >

                                            <DeleteEssay  id={essay.id}/>

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

export default withAuth(EnsayosID);