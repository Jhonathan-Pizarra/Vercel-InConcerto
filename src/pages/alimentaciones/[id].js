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
import FindInPageIcon from "@material-ui/icons/FindInPage";
import React from "react";
import UpdateFeeding from "@/components/feedings/UpdateFeeding";
import DeleteFeeding from "@/components/feedings/DeleteFeeding";
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
        height: 450
    },
    content: {
        flex: '1 0 ',
    },
}));

const AlimentacionID = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: feeding, error} = useSWR(`/feedings/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!feeding) return <Loading/>;

    return (
        <div>
            <h1>Detalle Cuadro Alimentación</h1>
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
                                    <h2>{feeding.food}</h2>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <p><b>Fecha:</b>&ensp;{feeding.date}</p>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <p><b>Observación:</b>&ensp;{feeding.observation}</p>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <p><b>Cantidad:</b>&ensp;{feeding.quantityLunchs}</p>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <b>Responsable:</b>&ensp;{feeding.user}
                                    <Link href={feeding.user_id} passHref>
                                        <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                            <FindInPageIcon />
                                        </IconButton>
                                    </Link>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <b>Comensal:</b>&ensp;{feeding.artist}
                                    <Link href={feeding.artist_id} passHref>
                                        <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                            <FindInPageIcon />
                                        </IconButton>
                                    </Link>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <b>Lugar:</b>&ensp;{feeding.fplace}
                                    <Link href={feeding.fplace_id} passHref>
                                        <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                            <FindInPageIcon />
                                        </IconButton>
                                    </Link>
                                </Typography>
                                <br/>
                                <Grid container spacing={3}>

                                    <Grid item container justify="center" alignItems="center">
                                        <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                            <MuiLink>
                                                <UpdateFeeding id={feeding.id}/>
                                            </MuiLink>
                                        </CardActions>
                                        <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                            <MuiLink>
                                                <DeleteFeeding  id={feeding.id}/>
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

export default withAuth(AlimentacionID);
