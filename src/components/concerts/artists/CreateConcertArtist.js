import {fetcher} from "../../../utils";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR, {mutate as mutateTo} from "swr";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    makeStyles,
    Select
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import SnackSuccess from "@/components/SnackSuccess";
import {useRouter} from "next/router";
import {ConcertArtist} from "@/lib/concert_artists";
import SnackError from "@/components/SnackError";

const useStyles = makeStyles((theme) => ({
    addartists: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        //bottom: theme.spacing(3),
        backgroundColor: "#ffeb33",
        "&:hover, &:focus": {
            backgroundColor: "#ffeb33",
        },
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: '#0d47a1',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const CreateConcertArtist = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: concertArtists, mutate, error} = useSWR(`/concerts/${id}/artists`, fetcher);
    const {data: concerts} = useSWR(`/concerts`, fetcher);
    const {data: artists} = useSWR(`/artists`, fetcher);
    const { register, handleSubmit, reset} = useForm();
    const [modal, setModal] = useState(false);
    const [concertSelected, setConcertSelected] = useState(null);
    const [artistSelected, setArtistSelected] = useState(null);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!concertArtists) return <Loading/>;
    if(!concerts) return <Loading/>;
    if(!artists) return <Loading/>;

    const handleOpen = () => {
        reset();
        setCreateSuccess(false);
        setCreateError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
    };

    const handleChangeConcert = () => {
        setConcertSelected({concertSelected});
    };

    const handleChangeArtist = () => {
        setArtistSelected({artistSelected});
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        const newConcertArtist = {
            artist_id: data.artist_id,
            concert_id: data.concert_id,
        };

        const formData = new FormData();
        formData.append("artist_id", newConcertArtist.artist_id);
        formData.append("concert_id", newConcertArtist.concert_id);

        try {
            setProcessing(true);
            await ConcertArtist.create(id,formData);
            mutateTo(`/concerts/${id}/artists`);
            handleClose();
            setCreateSuccess(true);
        } catch (error) {
            if (error.response) {
                setCreateError(true);
                setProcessing(false);
                handleClose();
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.message);
                console.error(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error", error.message);
            }
            console.error(error.config);
        }
        reset();
    };





    return (
        <div>
            <Button
                className={classes.addartists}
                variant="contained"
                //color="secondary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                Artista
            </Button>

            {/*<Tooltip aria-label="add" >*/}
            {/*    <Fab  color="secondary" onClick={handleOpen} > /!*className={classes.fixed}*!/*/}
            {/*        <LinkIcon />*/}
            {/*    </Fab>*/}
            {/*</Tooltip>*/}

            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <InputLabel htmlFor="outlined-age-native-simple">Conciertos</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            disabled={processing}
                            native
                            value={concertSelected}
                            defaultValue={id}
                            onChange={handleChangeConcert}
                            {...register("concert_id")}
                        >
                            {concerts.data.map((concert) => (
                                <option key={concert.id}  value={concert.id}>{concert.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Artista</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            disabled={processing}
                            native
                            value={artistSelected}
                            onChange={handleChangeArtist}
                            {...register("artist_id")}
                        >
                            {artists.data.map((artist) => (
                                <option key={artist.id}  value={artist.id}>{artist.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <div className={classes.wrapper}>
                            <Button
                                disabled={processing}
                                //onClick={handleValidate}
                                color="primary"
                                type="submit"
                            >
                                Vincular
                            </Button>
                            {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
            {createSuccess && <SnackSuccess/>}
            {createError && <SnackError/>}
        </div>
    );
};

export default CreateConcertArtist;