import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR, {mutate as mutateIndex} from "swr";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {Lodging} from "@/lib/lodgings";
import SnackInfo from "@/components/SnackInfo";
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
const UpdateLodging = ({id}) => {

    const classes = useStyles();
    const {data: lodging, error, mutate} = useSWR(`/lodgings/${id}`, fetcher);
    const { register, handleSubmit, reset } = useForm();
    const [modal, setModal] = useState(false);
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!lodging) return <Loading/>;

    var inLodgign = new Date(lodging.checkIn); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    var yearIn = inLodgign.getFullYear();
    var monthIn = (inLodgign.getMonth()+1).toString().padStart(2, "0");
    var dayIn = inLodgign.getDate().toString().padStart(2, "0");
    var hoursIn = ('0'+inLodgign.getHours()).substr(-2);
    var minIn = inLodgign.getMinutes().toString().padStart(2, "0");
    const dateIn = yearIn+'-'+monthIn+'-'+dayIn+'T'+hoursIn+':'+minIn;

    var outLodging = new Date(lodging.checkOut); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    var yearOut = outLodging.getFullYear();
    var monthOut = (outLodging.getMonth()+1).toString().padStart(2, "0");
    var dayOut = outLodging.getDate().toString().padStart(2, "0");
    var hoursOut = ('0'+outLodging.getHours()).substr(-2);
    var minOut = outLodging.getMinutes().toString().padStart(2, "0");
    const dateOut = yearOut+'-'+monthOut+'-'+dayOut+'T'+hoursOut+':'+minOut;

    const handleOpen = () => {
        setUpdateInfo(false);
        setUpdateError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            setProcessing(true);
            await Lodging.update(id, {
                ...data,
                name:  ((data.name) === "") ? `Vacío (${lodging.id})` : data.name,
                type: ((data.type) === "") ? `Vacío (${lodging.id})` : data.type,
                description: ((data.description) === "") ? `Vacío (${lodging.id})` : data.description,
                observation: ((data.observation) === "") ? `Vacío (${lodging.id})` : data.observation,
                checkIn: ((data.checkIn) === "") ? dateIn : data.checkIn,
                checkOut: ((data.checkOut) === "") ? dateOut : data.checkOut,
            });
            mutateIndex('/lodgings');
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
                            label="Nombre"
                            defaultValue={lodging.name}
                            type="text"
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Tipo de hospedaje"
                            defaultValue={lodging.type}
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
                            id="name"
                            label="Característica"
                            defaultValue={lodging.description}
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('description')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Observación"
                            defaultValue={lodging.observation}
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('observation')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            id="datetime-local"
                            label="Check In"
                            type="datetime-local"
                            defaultValue={dateIn}
                            InputProps={{inputProps: { min: dateIn} }}
                            margin="dense"
                            //className={classes.textField}
                            {...register('checkIn')}
                            //dateConcert
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            id="datetime-local"
                            label="Check Out"
                            type="datetime-local"
                            defaultValue={dateOut}
                            InputProps={{inputProps: { min: dateOut} }}
                            margin="dense"
                            //className={classes.textField}
                            {...register('checkOut')}
                            //dateConcert
                            fullWidth
                        />
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

export default UpdateLodging;