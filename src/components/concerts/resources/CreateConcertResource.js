import {fetcher} from "../../../utils";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR from "swr";
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
import Loading from "@/components/Loading";
import {useRouter} from "next/router";
import {ConcertResource} from "@/lib/concert_resources";
import AddIcon from "@material-ui/icons/Add";
import translateMessage from "@/constants/messages";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";

const useStyles = makeStyles((theme) => ({
    addresources: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        bottom: theme.spacing(3),
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

const CreateConcertResource = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: concerts} = useSWR(`/concerts`, fetcher);
    const {data: resources} = useSWR(`/resources`, fetcher);
    const {data: concertResources, mutate, error} = useSWR(`/concerts/${id}/resources`, fetcher);
    const { register, handleSubmit, reset} = useForm();
    const [modal, setModal] = useState(false);
    const [concertSelected, setConcertSelected] = useState(null);
    const [resourceSelected, setResourceSelected] = useState(null);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!concertResources) return <Loading/>;
    if(!concerts) return <Loading/>;
    if(!resources) return <Loading/>;

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

    const handleChangeResource = () => {
        setResourceSelected({resourceSelected});
    };

    const onSubmit = async (data) => {
        console.log('data vinculo', data);

        const newConcertResource = {
            concert_id: data.concert_id,
            resource_id: data.resource_id,
        };

        const formData = new FormData();
        formData.append("concert_id", newConcertResource.concert_id);
        formData.append("resource_id", newConcertResource.resource_id);

        try {
            setProcessing(true);
            await ConcertResource.create(id,formData);
            mutate(`/concerts/${id}/resources`);
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
                className={classes.addresources}
                variant="contained"
                //color="secondary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                Recurso
            </Button>

            {/*<Tooltip title="Vincular" aria-label="add" className={classes.fixed}>*/}
            {/*    <Fab  color="primary" onClick={handleOpen} > /!*className={classes.fixed}*!/*/}
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
                        <InputLabel htmlFor="outlined-age-native-simple">Concierto</InputLabel>
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
                        <InputLabel htmlFor="outlined-age-native-simple">Recurso</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            disabled={processing}
                            native
                            value={resourceSelected}
                            onChange={handleChangeResource}
                            {...register("resource_id")}
                        >
                            {resources.data.map((resource) => (
                                <option key={resource.id}  value={resource.id}>{resource.name}</option>
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

export default CreateConcertResource;