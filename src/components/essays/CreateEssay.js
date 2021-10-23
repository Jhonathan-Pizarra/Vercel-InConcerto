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
    InputLabel,
    makeStyles,
    Select,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import {Essay} from "@/lib/essays";
import Loading from "@/components/Loading";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";
import translateMessage from "@/constants/messages";

const schema = yup.object().shape({
    name: yup.string().required("Este campo es necesario..."),
    dateEssay: yup.string().required("Debes escoger una fecha"),
    place: yup.string().required("Este campo es necesario..."),
});

const useStyles = makeStyles((theme) => ({
    fixed: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
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

const CreateEssay  = () => {

    const classes = useStyles();
    const {data: essay, error, mutate} = useSWR(`/essays`, fetcher);
    const {data: festivals} = useSWR(`/festivals`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [modal, setModal] = useState(false);
    const [selectFestival, setSelectFestival] = useState(null);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    const today = new Date(); //alert(today); //Mon Oct 11 2021 16:05:40 GMT-0500 (hora de Ecuador)
    var year = today.getFullYear();
    var month = (today.getMonth()+1).toString().padStart(2, "0");
    var day = today.getDate().toString().padStart(2, "0");
    var hours = ('0'+today.getHours()).substr(-2);
    var min = today.getMinutes().toString().padStart(2, "0");
    const fulldate = year+'-'+month+'-'+day+'T'+hours+':'+min; //2021-11-10 //2020-11-19T10:30

    if(error) return <div>"No se obtuvo el ensayo..."</div>;
    if(!essay) return <Loading/>;
    if(!festivals) return <Loading/>;

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

    const handleChangeFestival = () => {
        setSelectFestival({selectFestival});
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        const newEssay = {
            name: data.name,
            dateEssay: data.dateEssay,
            place: data.place,
            festival_id: data.festival_id,
        };

        const formData = new FormData();
        formData.append("name", newEssay.name);
        formData.append("dateEssay", newEssay.dateEssay);
        formData.append("place", newEssay.place);
        formData.append("festival_id", newEssay.festival_id);

        try {
            setProcessing(true);
            await Essay.create(formData);
            mutate("/essays");
            handleClose();
            setCreateSuccess(true);
        } catch (error) {
            setCreateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // alert(error.response.message);
                if (error.response.data.errors.name) {
                    alert(translateMessage(error.response.data.errors.name));
                }
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
        reset(); //Limpiar los imput después del submit
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
                            //autoFocus
                            // className={classes.title}
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            {...register('name')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.name?.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            disabled={processing}
                            id="datetime-local"
                            label="Fecha"
                            type="datetime-local"
                            defaultValue={fulldate}
                            InputProps={{inputProps: { min: fulldate} }}
                            margin="dense"
                            //className={classes.textField}
                            {...register('dateEssay')}
                            //dateConcert
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.dateEssay?.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            disabled={processing}
                            autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="place"
                            label="Lugar"
                            type="text"
                            {...register('place')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.place?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Festival</InputLabel>
                        <Select
                            autoFocus={true}
                            fullWidth
                            native
                            value={selectFestival}
                            onChange={handleChangeFestival}
                            {...register("festival_id")}
                        >
                            {festivals.data.map((festival) => (
                                <option key={festival.id}  value={festival.id}>{festival.name}</option>
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

export default CreateEssay;