import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Artist} from "@/lib/artists";
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
    Grid,
    InputLabel,
    makeStyles,
    Select,
    TextField
} from "@material-ui/core";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import SnackInfo from "@/components/SnackInfo";
import SnackError from "@/components/SnackError";
import {fetcher} from "../../../utils";
import {useRouter} from "next/router";

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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
    //ciOrPassport: yup.string().max(15, 'Has excedido el número dígitos permitidos').required("Este campo es necesario..."),
    mail: yup.string().email('Ese e-mail no es válido...').notRequired(),
    phone: yup.string().length(10, 'Se requieren 10 números').matches(phoneRegExp, 'Ése número no es válido').notRequired(),
    emergencyPhone: yup.string().matches(phoneRegExp, 'Ése número no es válido').notRequired(),
    emergencyMail: yup.string().email('Ese e-mail no es válido...').notRequired(),

});

//Este {id} lo recibe desde el componente donde lo llamemos, en este caso sería: <UpdateArtistForm id={artist.id}/>
const UpdateConcertArtist = ({idArtist}) => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    //const { data: concertArtists, mutate, error } = useSWR(`/artists/${idArtist}`, fetcher);
    const { data: concertArtists, mutate, error } = useSWR(`/concerts/${id}/artists/${idArtist}`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [checkedPassage, setCheckedPassage] = useState(true);
    const [foodGroup, setfoodGroup] = useState(null);
    const [modal, setModal] = useState(false);
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"No se puede editar el artista..."</div>;
    if(!concertArtists) return <Loading/>;

    const handleOpen = () => {
        setUpdateInfo(false);
        setUpdateError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
    };

    const handleCheckPassage = (event) => {
        setCheckedPassage(event.target.checked);
    };

    const handleChangeSelection = () => {
        setfoodGroup({foodGroup});
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            setProcessing(true);
            await Artist.update(idArtist, {
                ...data,
                ciOrPassport: data.ciOrPassport,
                artisticOrGroupName: ((data.artisticOrGroupName) === "") ? `Vacío (${artist.id})` : data.artisticOrGroupName,
                name: ((data.name) === "") ? `Vacío (${artist.id})` : data.name,
                lastName: ((data.lastName) === "") ? `Vacío (${artist.id})` : data.lastName,
                nationality: ((data.nationality) === "") ? `Vacío (${artist.id})` : data.nationality,
                mail: ((data.mail) === "") ? `vacío(${artist.id})@mail.com` : data.mail,
                phone: data.phone,
                passage: data.passage,
                instruments: ((data.instruments) === "") ? `Vacío (${artist.id})` : data.instruments,
                emergencyPhone: data.emergencyPhone,
                emergencyMail: ((data.emergencyMail) === "") ? `vacío(${artist.id})@mail.com` : data.emergencyMail,
                foodGroup: data.foodGroup,
                observation: ((data.observation) === "") ? `Vacío (${artist.id})` : data.observation,
            });
            //mutateIndex(`/conciertos/${id}/artistas`);
            //mutateIndex(`/concerts/${idConcert}/artists/${idArtist}`);
            //mutateIndex(`/concerts/${id}`);
            //mutateIndex(`/concerts/${id}/artists/${id}`);
            //mutateIndex(`/artists/${id}`);
            //mutateIndex(`/artists`);
            //mutateIndex(`/concerts/${idConcert}/artists/${id}`);
            //mutate(`/concerts/${id}/artists`);
            //mutate(`/concerts/${id}`);
            //mutate(`/concerts`);
            //mutate(`/artists/${id}`);
            //mutate(`/concerts/${idConcert}/artists/${idArtist}`);
            //mutate(`/artists`);
            //mutateIndex(`/concerts/${idConcert}`);
            //mutateIndex(`/concerts/${idConcert}/artists`);
            //mutateID(`/concerts/${id}/artists`);
            mutateIndex(`/concerts/${id}/artists`);
            mutate();
            //router.push(`/concerts/${id}/artists`);
            //router.push(`/conciertos/${id}`);
            handleClose();
            setUpdateInfo(true);
        } catch (error) {
            setUpdateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                //alert(error.response.message);
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
                            id="standard-number"
                            label="Cédula o Pasaporte"
                            defaultValue={concertArtists.ciOrPassport}
                            type="number"
                            {...register('ciOrPassport')}
                            fullWidth
                        />
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="standard-helperTex"
                            label="Nombre artístico"
                            defaultValue={concertArtists.artisticOrGroupName}
                            type="text"
                            {...register('artisticOrGroupName')}
                            helperText="O la banda a la que pertenece"
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <DialogContentText>
                            Datos personales:
                        </DialogContentText>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10}}
                                    autoFocus={true}
                                    disabled={processing}
                                    margin="dense"
                                    id="outlined-basic"
                                    label="Nombre"
                                    defaultValue={concertArtists.name}
                                    type="text"
                                    {...register('name')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10, marginLeft:10}}
                                    autoFocus={true}
                                    disabled={processing}
                                    margin="dense"
                                    id="outlined-basic"
                                    label="Apellido"
                                    defaultValue={concertArtists.lastName}
                                    type="text"
                                    {...register('lastName')}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item xs sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10}}
                                    autoFocus={true}
                                    disabled={processing}
                                    margin="dense"
                                    id="outlined-basic"
                                    label="Nacionalidad"
                                    defaultValue={concertArtists.nationality}
                                    type="text"
                                    {...register('nationality')}
                                />
                            </Grid>
                            <Grid item xs sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10, marginLeft:10}}
                                    autoFocus={true}
                                    disabled={processing}
                                    margin="dense"
                                    id="standard-number"
                                    label="Teléfono"
                                    defaultValue={concertArtists.phone}
                                    type="number"
                                    {...register('phone')}
                                />
                                <DialogContentText color="secondary">
                                    {errors.phone?.message}
                                </DialogContentText>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <TextField
                                autoFocus={true}
                                disabled={processing}
                                margin="dense"
                                id="outlined-basic"
                                label="E-mail"
                                defaultValue={concertArtists.mail}
                                type="text"
                                {...register('mail')}
                                fullWidth
                            />
                            <DialogContentText color="secondary">
                                {errors.mail?.message}
                            </DialogContentText>
                        </Grid>
                    </DialogContent>

                    <DialogContent style={{textAlign: 'center'}}>
                        <FormControlLabel
                            value={checkedPassage ? "1" : "0"}
                            {...register('passage')}
                            control={
                                <Checkbox
                                    color="primary"
                                    autoFocus={true}
                                    disabled={processing}
                                    checked={checkedPassage}
                                    onChange={handleCheckPassage}
                                />
                            }
                            label="Pasaje"
                            labelPlacement="top"
                        />

                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="outlined-basic"
                            label="Violín, Guitarra, Piano..."
                            defaultValue={concertArtists.instruments}
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('instruments')}
                            helperText="¿Qué instrumento toca...?"
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <Grid container spacing={0}>
                            <Grid item xs sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10}}
                                    autoFocus={true}
                                    disabled={processing}
                                    margin="dense"
                                    id="standard-number"
                                    label="Teléfono Emergencia"
                                    defaultValue={concertArtists.emergencyPhone}
                                    type="number"
                                    {...register('emergencyPhone')}
                                    fullWidth
                                />
                                <DialogContentText color="secondary">
                                    {errors.emergencyPhone?.message}
                                </DialogContentText>
                            </Grid>
                            <Grid item xs sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10, marginLeft:10}}
                                    autoFocus={true}
                                    disabled={processing}
                                    margin="dense"
                                    id="outlined-basic"
                                    label="E-mail Emergencia"
                                    defaultValue={concertArtists.emergencyMail}
                                    type="text"
                                    {...register('emergencyMail')}
                                    fullWidth
                                />
                                <DialogContentText color="secondary">
                                    {errors.emergencyMail?.message}
                                </DialogContentText>
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Grupo Alimenticio</InputLabel>
                        <Select
                            autoFocus={true}
                            disabled={processing}
                            fullWidth
                            native
                            defaultValue={concertArtists.foodGroup}
                            onChange={handleChangeSelection}
                            {...register("foodGroup")}
                        >
                            <option value={"Vegano"}>Vegano</option>
                            <option value={"Vegetariano"}>Vegetariano</option>
                            <option value={"Omnivoro"}>Onminivoro</option>
                            <option value={"Crudista"}>Crudista</option>
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="outlined-basic"
                            label="Observación"
                            defaultValue={concertArtists.observation}
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('observation')}
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

export default UpdateConcertArtist;