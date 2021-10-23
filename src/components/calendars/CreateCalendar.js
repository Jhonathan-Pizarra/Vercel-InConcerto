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
    Fab,
    makeStyles,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {Calendar} from "@/lib/calendars";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";

const schema = yup.object().shape({
    checkIn_Artist: yup.string().required("Debes escoger una fecha..."),
    checkOut_Artist: yup.string().required("Debes escoger una fecha..."),
    comingFrom: yup.string().required("Este campo es necesario..."),
    flyNumber: yup.string().required("Este campo es necesario..."),
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

const CreateCalendar = () => {

    const classes = useStyles();
    const {data: calendar, error, mutate} = useSWR(`/calendars`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [modal, setModal] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    const today = new Date(); //alert(today); //Mon Oct 11 2021 16:05:40 GMT-0500 (hora de Ecuador)
    var year = today.getFullYear();
    var month = (today.getMonth()+1).toString().padStart(2, "0");
    var day = today.getDate().toString().padStart(2, "0");
    var hours = ('0'+today.getHours()).substr(-2);
    var min = today.getMinutes().toString().padStart(2, "0");
    const fulldate = year+'-'+month+'-'+day+'T'+hours+':'+min; //2020-11-19T10:30

    if(error) return <div>"No se obtuvo el calendario..."</div>;
    if(!calendar) return <Loading/>;

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

    const onSubmit = async (data) => {
        console.log('data', data);

        const newCalendar = {
            checkIn_Artist: data.checkIn_Artist,
            checkOut_Artist: data.checkOut_Artist,
            comingFrom: data.comingFrom,
            flyNumber: data.flyNumber,
        };

        const formData = new FormData();
        formData.append("checkIn_Artist", newCalendar.checkIn_Artist);
        formData.append("checkOut_Artist", newCalendar.checkOut_Artist);
        formData.append("comingFrom", newCalendar.comingFrom);
        formData.append("flyNumber", newCalendar.flyNumber);

        try {
            setProcessing(true);
            await Calendar.create(formData);
            mutate("/calendars");
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
                            id="datetime-local"
                            label="Fecha de llegada"
                            type="datetime-local"
                            defaultValue={fulldate}
                            //InputProps={{inputProps: { min: "2020-11-19T10:30", max: "2021-11-19T10:30"} }}
                            InputProps={{inputProps: { min: fulldate} }}
                            margin="dense"
                            //className={classes.textField}
                            {...register('checkIn_Artist')}
                            //dateConcert
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.checkIn_Artist?.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            disabled={processing}
                            id="datetime-local"
                            label="Fecha de salida"
                            type="datetime-local"
                            defaultValue={fulldate}
                            //InputProps={{inputProps: { min: "2020-11-19T10:30", max: "2021-11-19T10:30"} }}
                            InputProps={{inputProps: { min: fulldate} }}
                            margin="dense"
                            {...register('checkOut_Artist')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.checkOut_Artist?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="País del que proviene"
                            type="text"
                            {...register('comingFrom')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.comingFrom?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="# de vuelo"
                            type="text"
                            {...register('flyNumber')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.flyNumber?.message}
                        </DialogContentText>
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

export default CreateCalendar;