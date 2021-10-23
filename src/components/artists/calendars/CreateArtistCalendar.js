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
import SnackError from "@/components/SnackError";
import {fetcher} from "../../../utils";
import {useRouter} from "next/router";
import translateMessage from "@/constants/messages";
import {ArtistCalendar} from "@/lib/artist_calendars";

const useStyles = makeStyles((theme) => ({
    addusercalendar: {
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

const CreateArtistCalendar = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: artistCalendars, error} = useSWR(`/artists/${id}/calendars`, fetcher);
    const {data: calendars} = useSWR(`/calendars`, fetcher);
    const {data: artists} = useSWR(`/artists/${id}`, fetcher);
    const { register, handleSubmit, reset} = useForm();
    const [modal, setModal] = useState(false);
    const [artistSelected, setArtistSelected] = useState(null);
    const [calendarSelected, setCalendarSelected] = useState(null);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!artistCalendars) return <Loading/>;
    if(!calendars) return <Loading/>;
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

    const handleChangeCalendar = () => {
        setCalendarSelected({calendarSelected});
    };

    const handleChangeArtist = () => {
        setArtistSelected({artistSelected});
    };

    const onSubmit = async (data) => {
        console.log('data vinculo', data);

        const newArtistCalendar = {
            artist_id: data.artist_id,
            calendar_id: data.calendar_id,
        };

        const formData = new FormData();
        formData.append("artist_id", newArtistCalendar.artist_id);
        formData.append("calendar_id", newArtistCalendar.calendar_id);

        try {
            setProcessing(true);
            await ArtistCalendar.create(id,formData);
            mutateTo(`/artists/${id}/calendars`);
            handleClose();
            setCreateSuccess(true);
        } catch (error) {
            setCreateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(translateMessage(error.response.data.message));
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
                className={classes.addusercalendar}
                variant="contained"
                //color="secondary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                Calendario
            </Button>


            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <InputLabel htmlFor="outlined-age-native-simple">Calendario</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            disabled={processing}
                            native
                            value={calendarSelected}
                            //defaultValue={id}
                            onChange={handleChangeCalendar}
                            {...register("calendar_id")}
                        >
                            {calendars.data.map((calendar) => (
                                <option key={calendar.id}  value={calendar.id}>{calendar.checkIn_Artist}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    {/*<DialogContent>*/}
                    {/*    <InputLabel htmlFor="outlined-age-native-simple">Artista</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        fullWidth*/}
                    {/*        autoFocus*/}
                    {/*        disabled={processing}*/}
                    {/*        native*/}
                    {/*        value={artistSelected}*/}
                    {/*        defaultValue={id}*/}
                    {/*        onChange={handleChangeArtist}*/}
                    {/*        {...register("artist_id")}*/}
                    {/*    >*/}
                    {/*        {artists.data.map((artist) => (*/}
                    {/*            <option key={artist.id}  value={artist.id}>{artist.name}</option>*/}
                    {/*        ))}*/}
                    {/*    </Select>*/}
                    {/*</DialogContent>*/}

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Artista</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            disabled={processing}
                            native
                            value={artists.id}
                            defaultValue={id}
                            //onChange={handleChangeUser}
                            {...register("artist_id")}
                        >
                            <option key={artists.id} value={artists.id}>{artists.name}</option>
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

export default CreateArtistCalendar;