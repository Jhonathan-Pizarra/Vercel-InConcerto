import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR, {mutate as mutateIndex} from "swr";
import {
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    makeStyles,
    Select,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import {Transport} from "@/lib/transports";
import SnackInfo from "@/components/SnackInfo";
import IconButton from "@material-ui/core/IconButton";
import SnackError from "@/components/SnackError";

const useStyles = makeStyles((theme) => ({
    edit:{
        color: "#FAC800",
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

//Este {id} lo recibe desde el componente donde lo llamemos
const UpdateTransport = ({id}) => {

    const classes = useStyles();
    const {data: transport, mutate, error} = useSWR(`/transports/${id}`, fetcher);
    const {data: calendars} = useSWR(`/calendars`, fetcher);
    const { register, handleSubmit, reset } = useForm();
    const [modal, setModal] = useState(false);
    const [disponibility, setDisponibility] = useState(true);
    const [stateCalendar, setStateCalendar] = useState(null);
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!transport) return <Loading/>;
    if(!calendars) return <Loading/>;

    const handleOpen = () => {
        setUpdateInfo(false);
        setUpdateError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
    };

    const handleCheckDisponibility = (event) =>{
        setDisponibility(event.target.checked);
    };

    const handleChangeCalendar = () => {
        setStateCalendar({stateCalendar});
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            setProcessing(true);
            await Transport.update(id, {
                ...data,
                type: ((data.type) === "") ? `Vacío (${transport.id})` : data.type,
                capacity: (((data.capacity) === "") || ((data.capacity) <= 0) ) ? '1' : data.capacity,
                instruments_capacity: (((data.instruments_capacity) === "") || ((data.instruments_capacity) <= 0) || (!!isNaN(data.instruments_capacity)) ) ? '1' : data.instruments_capacity,
                disponibility: data.disponibility,
                licence_plate: ((data.licence_plate) === "") ? `Vacío (${transport.id})` : data.licence_plate,
                calendar_id: data.calendar_id,
            });
            mutateIndex('/transports');
            mutate();
            handleClose();
            setUpdateInfo(true);
        } catch (error) {
            setUpdateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                console.error(error.response);
            } else if (error.request) {
                console.error(error.request);
            } else {
                console.error("Error", error.message);
            }
            console.error(error.config);
        }
        reset();
    };

    return (
        <div>

            <IconButton aria-label="editar"  className={classes.edit} size="small" onClick={handleOpen} >
                <EditIcon />
            </IconButton>
            {/*<Button
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={handleOpen}
            >
                Editar
            </Button>*/}

            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Transporte"
                            defaultValue={transport.type}
                            type="text"
                            {...register('type')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="standard-number"
                            label="Capacidad"
                            type="number"
                            defaultValue={transport.capacity}
                            {...register('capacity')}
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            label="Capacidad (Peso)"
                            id="outlined-start-adornment"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                            }}
                            variant="outlined"
                            defaultValue={transport.instruments_capacity}
                            {...register('instruments_capacity')}
                        />
                    </DialogContent>

                    <DialogContent style={{textAlign: "center"}}>
                        <FormControlLabel
                            autoFocus={true}
                            disabled={processing}
                            value={disponibility ? "1" : "0"}
                            //onChange={handleChangeFree}
                            {...register('disponibility')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    checked={disponibility}
                                    onChange={handleCheckDisponibility}
                                />}
                            label="Disponible"
                            labelPlacement="top"
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Matrícula"
                            type="text"
                            defaultValue={transport.licence_plate}
                            {...register('licence_plate')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Calendario</InputLabel>
                        <Select
                            autoFocus={true}
                            disabled={processing}
                            fullWidth
                            native
                            value={stateCalendar}
                            defaultValue={transport.calendar_pk}
                            onChange={handleChangeCalendar}
                            {...register("calendar_id")}
                        >
                            <option key={transport.calendar_pk}  value={transport.calendar_pk} disabled={true}>{transport.calendar}</option>
                            {calendars.data.map((calendar) => (
                                <option key={calendar.id}  value={calendar.id}>{calendar.checkIn_Artist}</option>
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
                                //onClick={handleClose}
                                color="primary"
                                type="submit">
                                Editar
                            </Button>
                            {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
            {updateInfo && <SnackInfo/>}
            {updateError && <SnackError/>}
        </div>
    );
};

export default UpdateTransport;