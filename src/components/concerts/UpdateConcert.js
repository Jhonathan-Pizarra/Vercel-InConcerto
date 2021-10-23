import {useRouter} from "next/router";
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
    InputLabel,
    makeStyles,
    Select,
    TextField
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {fetcher} from "../../utils";
import {Concert} from "@/lib/concerts";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR, {mutate as mutateIndex} from "swr";
import Loading from "@/components/Loading";
import IconButton from "@material-ui/core/IconButton";
import SnackInfo from "@/components/SnackInfo";
import SnackError from "@/components/SnackError";
//import { yupResolver } from '@hookform/resolvers/yup';
//import * as yup from "yup";

// const schema = yup.object().shape({
//     name: yup.string().notRequired(),
//     dateConcert: yup.string().notRequired(),
//     duration: yup.string().notRequired(),
// });

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

const UpdateConcert = ({id}) => {

    const router = useRouter();
    // const {id} = router.query;
    const classes = useStyles();
    const {data: concert, error, mutate} = useSWR(`/concerts/${id}`, fetcher);
    const {data: festivals} = useSWR(`/festivals`, fetcher);
    const {data: places} = useSWR(`/places`, fetcher);
    const { register, handleSubmit, reset } = useForm();
    const [modal, setModal] = useState(false);
    const [checkedFree, setFree] = useState(true);
    const [checkedInsi, setInsi] = useState(true);
    const [selectPlace, setSelectPlace] = useState(null);
    const [selectFestival, setSelectFestival] = useState(null);
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!concert) return <Loading/>
    if(!festivals) return <Loading/>
    if(!places) return <Loading/>

    var d = new Date(concert.dateConcert); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    var year = d.getFullYear();
    var month = (d.getMonth()+1).toString().padStart(2, "0");
    var day = d.getDate().toString().padStart(2, "0");
    var hours = ('0'+d.getHours()).substr(-2);
    var min = d.getMinutes().toString().padStart(2, "0");
    const fulldate = year+'-'+month+'-'+day+'T'+hours+':'+min;

    const handleOpen = () => {
        setUpdateInfo(false);
        setUpdateError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
    };

    const handleChangeFestival = () => {
        setSelectFestival({selectFestival});
    };

    const handleChangePlace = () => {
        setSelectPlace({selectPlace});
    };

    const handleCheckFree = (event) => {
        setFree(event.target.checked);
    };

    const handleCheckInsi = (event) => {
        setInsi(event.target.checked);
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            setProcessing(true);
            await Concert.update(id, {
                ...data,
                name: ((data.name) === "") ? `Vacío (${concert.id})` : data.name,
                //dateConcert: data.dateConcert,
                dateConcert: ((data.dateConcert) === "") ? fulldate : data.dateConcert,
                duration: data.duration,
                free: data.free,
                insitu: data.insitu,
                place_id: data.place_id,
                festival_id: data.festival_id,
            });
            mutateIndex(`/concerts`);
            mutate();
            handleClose();
            setUpdateInfo(true);
            /*mutate(`/festivals/${data.id}`);*/
        } catch (error) {
            setUpdateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
        reset(); //Limpiar los imput después del submit
    };

    return (
        <div>

            <IconButton aria-label="editar"  className={classes.edit} size="small" onClick={handleOpen} >
                <EditIcon />
            </IconButton>

            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">Editar Concierto</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            //autoFocus que al abrir se seleccione solo
                            // className={classes.title}
                            //margin="dense" o sea más chiquito el input
                            autoFocus={true}
                            disabled={processing}
                            id="name"
                            label="Nombre"
                            type="text"
                            margin="dense"
                            defaultValue={concert.name}
                            {...register('name')}
                            fullWidth
                        />
                        {/*<DialogContentText color="secondary">
                            {errors.name?.message}
                        </DialogContentText>*/}
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            id="datetime-local"
                            label="Fecha"
                            type="datetime-local"
                            defaultValue={fulldate}
                            InputProps={{inputProps: { min: fulldate} }}
                            margin="dense"
                            //className={classes.textField}
                            {...register('dateConcert')}
                            //dateConcert
                            fullWidth
                        />
                        {/*<DialogContentText color="secondary">
                            {errors.dateConcert?.message}
                        </DialogContentText>*/}
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            id="time"
                            label="Duración"
                            type="time"
                            defaultValue={concert.duration}
                            margin="dense"
                            //className={classes.textField}
                            {...register('duration')}
                        />
                        {/*<DialogContentText color="secondary">
                            {errors.duration?.message}
                        </DialogContentText>*/}
                    </DialogContent>

                    <DialogContent style={{textAlign: "center"}}>
                        <FormControlLabel
                            value={checkedFree ? "1" : "0"}
                            //onChange={handleChangeFree}
                            {...register('free')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    checked={checkedFree}
                                    onChange={handleCheckFree}
                                    //onChange={function(event){ handleCheckFree(checkedFree); handleChangeFree()}}
                                />}
                            label="Gratuito"
                            labelPlacement="top"
                        />

                        <FormControlLabel
                            value={checkedInsi ? "1" : "0"}
                            {...register('insitu')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    checked={checkedInsi}
                                    onChange={handleCheckInsi}
                                />}
                            label="Insitu"
                            labelPlacement="top"
                        />
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Festival</InputLabel>
                        <Select
                            autoFocus={true}
                            disabled={processing}
                            fullWidth
                            native
                            value={selectFestival}
                            //defaultValue={concert.festival_id}
                            defaultValue={concert.festival_pk}
                            onChange={handleChangeFestival}
                            {...register("festival_id")}
                        >
                            <option key={concert.festival_pk}  value={concert.festival_pk} disabled={true}>{concert.festival}</option>
                            {festivals.data.map((festival) => (
                                <option key={festival.id}  value={festival.id}>{festival.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Lugar</InputLabel>
                        <Select
                            autoFocus={true}
                            disabled={processing}
                            fullWidth
                            native
                            value={selectPlace}
                            //defaultValue={concert.place_id}
                            defaultValue={concert.place_pk}
                            onChange={handleChangePlace}
                            {...register("place_id")}
                        >
                            <option key={concert.place_pk}  value={concert.place_pk} disabled={true}>{concert.place}</option>
                            {places.data.map((place) => (
                                <option key={place.id}  value={place.id}>{place.name}</option>
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

export default UpdateConcert;