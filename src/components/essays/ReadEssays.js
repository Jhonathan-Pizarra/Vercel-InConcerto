import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Card, CardActions, CardContent, Grid, IconButton, Link as MuiLink, Typography} from "@material-ui/core";
import Routes from "@/constants/routes";
import CreateEssay from "@/components/essays/CreateEssay";
import React from "react";
import Link from "next/link";
import UpdateEssay from "@/components/essays/UpdateEssay";
import DeleteEssay from "@/components/essays/DeleteEssay";
import FindInPageIcon from "@material-ui/icons/FindInPage";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        //flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        /*margin: 'auto',
        maxWidth: '30%',*/
    },
    cardDimension: {
        /*width: 240,
        height: 420*/
        width: 400,
        height: 300
    },
    title: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
    },
    detail:{
        color: "#3f51b5",
    },
    actions: {
        flexDirection: 'unset',
        position: 'relative',
        top: 35,
        left: 4
    },
    content: {
        flex: '1 0 ',
    },
}));

const ReadEssays = () => {

    const classes = useStyles();
    const {data: essays, error} = useSWR(`/essays`, fetcher);

    if(error) return <p>No se pudieron cargar los ensayos...</p>;
    if (!essays) return <Loading/>;

    return (
        <div>
            <h1>Ensayos InConcerto</h1>
            {/*<Grid container className={classes.root} spacing={1} direction='column' justify='flex-start' component={Paper}>*/}
            {/*    {essays.data ? <SnackSuccess/> : <Loading/>}*/}
            {/*    {essays.data && essays.data.map(essay => {*/}
            {/*        return(*/}
            {/*            <div key={essay.id}>*/}
            {/*                <ListItem>*/}
            {/*                    <ListItemAvatar>*/}
            {/*                        <Avatar>*/}
            {/*                            <EmojiObjectsIcon />*/}
            {/*                        </Avatar>*/}
            {/*                    </ListItemAvatar>*/}
            {/*                    <ListItemText primary={essay.name} secondary={essay.dateEssay} />*/}
            {/*                    <Link href={`${Routes.ESSAYS}/${essay.id}`} passHref >*/}
            {/*                        <MuiLink>*/}
            {/*                            <Button size="small" color="primary">*/}
            {/*                                Ver más*/}
            {/*                            </Button>*/}
            {/*                        </MuiLink>*/}
            {/*                    </Link>*/}
            {/*                </ListItem>*/}
            {/*                <Divider variant="inset" />*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</Grid>*/}
            <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                {/*{essays.data ? <SnackSuccess/> : <Loading/>}*/}
                {essays.data && essays.data.map(essay => {
                    return(
                        <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} key={essay.id}>
                            <Card className={classes.root}>

                                <Box m={2} className={classes.cardDimension}>
                                    <div>
                                        <CardContent className={classes.content}>
                                            <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                                <Link href={`${Routes.ESSAYS}/${essay.id}`} passHref>
                                                    <MuiLink>
                                                        <h2 className={classes.title}>{essay.name}</h2>
                                                    </MuiLink>
                                                </Link>
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                <p><b>Fecha:</b> {essay.dateEssay}</p>
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                <p><b>Lugar:</b> {essay.place}</p>
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Festival:</b> {essay.festival}
                                                <Link href={essay.festival_id} passHref>
                                                    <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                        <FindInPageIcon />
                                                    </IconButton>
                                                </Link>

                                            </Typography>
                                        </CardContent>


                                        <div className={classes.actions}>
                                            <Grid container spacing={3}>

                                                <Grid item container justify="center" alignItems="center">
                                                    <CardActions xs={12} sm={12} md={12} lg={4} xl={2} >

                                                        <UpdateEssay id={essay.id}/>


                                                        <DeleteEssay id={essay.id}/>

                                                    </CardActions>

                                                </Grid>

                                            </Grid>
                                        </div>
                                    </div>
                                </Box>
                            </Card>
                        </Grid>

                    )
                })}
            </Grid>
            <CreateEssay/>
        </div>
    );
}

export default ReadEssays;

