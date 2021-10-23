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
    Select,
    TextField
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {Feeding} from "@/lib/feedings";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";
import {fetcher} from "../../../utils";
import {useRouter} from "next/router";

const schema = yup.object().shape({
    date: yup.string().required("Debes escoger una fecha"),
    food: yup.string().required("Este campo es necesario..."),
    quantityLunchs: yup.number().typeError('Debes escribir un número').positive('La cantidad no es válida').min(1, 'Capacidad mínima es 1').required("Este campo es necesario..."),
    observation: yup.string().required("Este campo es necesario.."),
});

const useStyles = makeStyles((theme) => ({
    adduserfeeding: {
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

const CreateUserFeeding = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: usersFeedings, error} = useSWR(`/users/${id}/feedings`, fetcher);
    const {data: fplaces} = useSWR(`/feeding_places`, fetcher);
    const {data: artists} = useSWR(`/artists`, fetcher);
    const {data: users} = useSWR(`/users`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [modal, setModal] = useState(false);
    const [statePlace, setPlace] = useState(null);
    const [stateArtist, setArtist] = useState(null);
    const [stateUser, setUser] = useState(null);
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


    if(error) return <div>"No se obtuvo el cuadro de alimentación..."</div>;
    if(!usersFeedings) return <Loading/>;
    if(!fplaces) return <Loading/>;
    if(!artists) return <Loading/>;
    if(!users) return <Loading/>;

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

    const handleChangePlace = () => {
        setPlace({statePlace});
    };

    const handleChangeArtist = () => {
        setArtist({stateArtist});
    };

    const handleChangeUser = () => {
        setUser({stateUser});
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        const newFeeding = {
            date: data.date,
            food: data.food,
            observation: data.observation,
            quantityLunchs: data.quantityLunchs,
            user_id: data.user_id,
            artist_id: data.artist_id,
            place_id: data.place_id,
        };

        const formData = new FormData();
        formData.append("date", newFeeding.date);
        formData.append("food", newFeeding.food);
        formData.append("observation", newFeeding.observation);
        formData.append("quantityLunchs", newFeeding.quantityLunchs);
        formData.append("user_id", newFeeding.user_id);
        formData.append("artist_id", newFeeding.artist_id);
        formData.append("place_id", newFeeding.place_id);

        try {
            setProcessing(true);
            await Feeding.create(formData);
            mutateTo(`/users/${id}/feedings`);
            //mutate();
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
            <Button
                className={classes.adduserfeeding}
                variant="contained"
                //color="secondary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                Alimentación
            </Button>
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
                            label="Fecha"
                            type="datetime-local"
                            defaultValue={fulldate}
                            InputProps={{inputProps: { min: fulldate} }}
                            autoFocus
                            margin="dense"
                            //className={classes.textField}
                            {...register('date')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.date?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            {...register('food')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.food?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            disabled={processing}
                            margin="dense"
                            id="standard-number"
                            label="Cantidad"
                            type="number"
                            //defaultValue={0}
                            {...register('quantityLunchs')}
                            //helperText="(Déjelo en 0 si no aplica)"
                        />
                        <DialogContentText color="secondary">
                            {errors.quantityLunchs?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Observación"
                            type="text"
                            {...register('observation')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.observation?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Lugar</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={statePlace}
                            onChange={handleChangePlace}
                            {...register("place_id")}
                        >
                            {fplaces.data.map((fplace) => (
                                <option key={fplace.id}  value={fplace.id}>{fplace.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Comensal</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={stateArtist}
                            onChange={handleChangeArtist}
                            {...register("artist_id")}
                        >
                            {artists.data.map((artist) => (
                                <option key={artist.id}  value={artist.id}>{artist.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Responasble</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={stateUser}
                            defaultValue={id}
                            onChange={handleChangeUser}
                            {...register("user_id")}
                        >
                            {users.map((user) => (
                                <option key={user.id}  value={user.id}>{user.name}</option>
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

export default CreateUserFeeding;