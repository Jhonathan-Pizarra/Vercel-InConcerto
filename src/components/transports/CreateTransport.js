import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR from "swr";
import {
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    makeStyles,
    Select,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {Transport} from "@/lib/transports";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";

const schema = yup.object().shape({
    type: yup.string().required("Este campo es necesario..."),
    //capacity: yup.string().required("Debes escoger una fecha..."),
    capacity: yup.number().typeError('Debes escribir un número').positive('La cantidad no es válida').min(1, 'Capacidad mínima es 1').required("Este campo es necesario..."),
    instruments_capacity: yup.number().typeError('Debes escribir un peso').positive('La cantidad no es válida').min(0.1, 'Capacidad mínima es 0.1 Kg').required("Este campo es necesario..."),
    //disponibility: yup.string().required("Este campo es necesario..."),
    licence_plate: yup.string().required("Este campo es necesario.."),
    //calendar: yup.string().required("Debes escoger uno"),
});

const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(2),
        right: theme.spacing(2),
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

const CreateTransport = () => {

    const classes = useStyles();
    const {data: transport, error, mutate} = useSWR(`/transports`, fetcher);
    const {data: calendars} = useSWR(`/calendars`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [modal, setModal] = useState(false);
    const [disponibility, setDisponibility] = useState(true);
    const [stateCalendar, setStateCalendar] = useState(null);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"No se obtuvo el transporte..."</div>;
    if(!transport) return <Loading/>;
    if(!calendars) return <Loading/>;

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

    const handleCheckDisponibility = (event) =>{
        setDisponibility(event.target.checked);
    };

    const handleChangeCalendar = () => {
        setStateCalendar({stateCalendar});
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        const newTansport = {
            type: data.type,
            capacity: data.capacity,
            instruments_capacity: data.instruments_capacity,
            disponibility: data.disponibility,
            licence_plate: data.licence_plate,
            calendar_id: data.calendar_id,
        };

        const formData = new FormData();
        formData.append("type", newTansport.type);
        formData.append("capacity", newTansport.capacity);
        formData.append("instruments_capacity", newTansport.instruments_capacity);
        formData.append("disponibility", newTansport.disponibility);
        formData.append("licence_plate", newTansport.licence_plate);
        formData.append("calendar_id", newTansport.calendar_id);

        try {
            setProcessing(true);
            await Transport.create(formData);
            mutate("/transports");
            handleClose();
            setCreateSuccess(true);
        } catch (error) {
            setCreateError(true);
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

            <Tooltip title="Nuevo" aria-label="add" className={classes.fixed}>
                <Fab  color="secondary" onClick={handleOpen} > {/*className={classes.fixed}*/}
                    <AddIcon />
                </Fab>
            </Tooltip>

            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Transporte"
                            type="text"
                            {...register('type')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.type?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            disabled={processing}
                            margin="dense"
                            id="standard-number"
                            label="Capacidad"
                            type="number"
                            defaultValue={0}
                            {...register('capacity')}
                            helperText="(Déjelo en 0 si no aplica)"
                        />
                        <DialogContentText color="secondary">
                            {errors.capacity?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            disabled={processing}
                            label="Capacidad (Peso)"
                            id="outlined-start-adornment"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                            }}
                            variant="outlined"
                            {...register('instruments_capacity')}
                        />
                        <DialogContentText color="secondary">
                            {errors.instruments_capacity?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent style={{textAlign: 'center'}}>
                        <FormControlLabel
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
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Matrícula"
                            type="text"
                            {...register('licence_plate')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.licence_plate?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Calendario</InputLabel>
                        <Select
                            disabled={processing}
                            autoFocus
                            fullWidth
                            native
                            value={stateCalendar}
                            onChange={handleChangeCalendar}
                            {...register("calendar_id")}
                        >
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
                                //onClick={handleValidate}
                                color="primary"
                                type="submit"
                            >
                                Crear
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

export default CreateTransport;