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
    InputLabel,
    makeStyles,
    Select,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {User} from "@/lib/users";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import SnackInfo from "@/components/SnackInfo";
import SnackError from "@/components/SnackError";
import {useAuth} from "@/lib/auth";
import translateMessage from "@/constants/messages";

const schema = yup.object().shape({
    //name: yup.string().required("Este campo es necesario..."),
    email: yup.string().matches(/@inconcerto.com/, 'No es un mail de inconcerto').email('Ese e-mail no es válido...').required("Es necesario un email"),
    password: yup.string().required("Este campo es necesario").min(6, 'Debe tener al menos 6 caracteres'),
    password_confirmation: yup.string().required("Este campo es necesario").min(6, 'Debe tener al menos 6 caracteres').oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
});

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

//Este {id} lo recibe desde el componente donde lo llamemos, en este caso sería: <UpdateArtistForm id={artist.id}/>
const UpdateUserID = ({id}) => {

    const classes = useStyles();
    const {data: user, mutate, error} = useSWR(`/users/${id}`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [modal, setModal] = useState(false);
    const [selectRole, setSelectRole] = useState(null);
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [processing, setProcessing] = useState(false)

    const rol = (user.role === 'ROLE_ADMIN') ? 'Administrador': 'Operario';

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!user) return <Loading/>;

    const handleOpen = () => {
        setUpdateInfo(false);
        setUpdateError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
    };

    const handleChangeRole = () => {
        setSelectRole({selectRole});
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            setProcessing(true);
            await User.update(id, {
                ...data,
                name: ((data.name) === "") ? `Vacío (${user.id})` : data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });
            mutateIndex('/users');
            mutate();
            handleClose();
            setUpdateInfo(true);
        } catch (error) {
            setUpdateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                //alert(translateMessage(error.response.data.message));
                //alert(translateMessage(error.response.data.message));
                //alert(translateMessage(error.response));
                console.error(error.response);
            } else if (error.request) {
                //alert(translateMessage(error.request));
                console.error(error.request);
            } else {
                //alert(translateMessage(error.message));
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
                            //autoFocus
                            // className={classes.title}
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Nombre"
                            defaultValue={user.name}
                            type="text"
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="email"
                            label="Correo"
                            defaultValue={user.email}
                            type="text"
                            {...register('email')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.email?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="password"
                            label="Contraseña"
                            defaultValue={user.password}
                            type="password"
                            {...register('password')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.password?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="password_confirmation"
                            label="Confirmación"
                            type="password"
                            defaultValue={user.password_confirmation}
                            {...register('password_confirmation')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.password_confirmation?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Rol</InputLabel>
                        <Select
                            autoFocus={true}
                            disabled={processing}
                            fullWidth
                            native
                            defaultValue={user.role}
                            value={user.role}
                            //onChange={handleChangeRole}
                            {...register("role")}
                        >
                            <option value={user.role} disabled>{rol}</option>
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

export default UpdateUserID;