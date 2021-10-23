import React, {useState} from "react";
import {useForm} from "react-hook-form";
import withAuth from "@/hocs/withAuth";
import {useAuth} from "@/lib/auth";
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
import AddIcon from "@material-ui/icons/Add";
import {useRouter} from "next/router";
import SnackSuccess from "@/components/SnackSuccess";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import SnackError from "@/components/SnackError";
import useSWR, {mutate as mutateTo} from "swr";
import Unauthorized from "./401";
import translateMessage from "@/constants/messages";
//import translateMessage from "@/constants/messages";

const schema = yup.object().shape({
    name: yup.string().required("Este campo es necesario..."),
    email: yup.string().matches(/@inconcerto.com/, 'No es un mail de inconcerto').email('Ese e-mail no es válido...').required("Es necesario un email"),
    password: yup.string().required("Este campo es necesario").min(6, 'Debe tener al menos 6 caracteres'),
    password_confirmation: yup.string().required("Este campo es necesario").min(6, 'Debe tener al menos 6 caracteres').oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
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

const Register = () => {

    const { user } = useAuth();
    const router = useRouter();
    const classes = useStyles();
    const { register: newUser } = useAuth();
    //const { register, handleSubmit, reset } = useForm();
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [modal, setModal] = useState(false);
    const [selectRole, setSelectRole] = useState(null);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    //const ward = (user.id === undefined) ? user.user.id: user.id;
    const rol = (user.name === undefined) ? user.user.role: user.role;
    //console.log("Valor ID?", ward);
    //console.log("Valor ROLE?", rol);

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

    const handleChangeRole = () => {
        setSelectRole({selectRole});
    };

    const onSubmit = async (data) =>{
        console.log('userData', data);

        try {
            setProcessing(true);
            //console.log('userData', data);
            const userData = await newUser(data);
            handleClose();
            setCreateSuccess(true);
            mutateTo(`/users`);
            //router.push('/');

        }catch (error) {
            setCreateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                //alert(translateMessage(error.response));
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
        reset();
    };

    const renderRegister = (
        <>
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
                            //autoFocus
                            // className={classes.title}
                            disabled={processing}
                            margin="dense"
                            id="email"
                            label="Correo"
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
                            disabled={processing}
                            margin="dense"
                            id="password"
                            label="Contraseña"
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
                            disabled={processing}
                            margin="dense"
                            id="password_confirmation"
                            label="Confirmación"
                            type="password"
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
                            value={selectRole}
                            onChange={handleChangeRole}
                            {...register("role")}
                        >
                            <option value={'ROLE_USER'}>Operario</option>
                            <option value={'ROLE_ADMIN'}>Administrador</option>
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
                        {/*<Button type="submit" color="primary" variant="contained">
                            Crear
                        </Button>*/}
                    </DialogActions>
                </form>
            </Dialog>
            {createSuccess && <SnackSuccess/>}
            {createError && <SnackError/>}
            {/*   <Paper style={{width: "auto"}}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="email"
                            label="Correo"
                            type="text"
                            {...register('email')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="password"
                            label="Contraseña"
                            type="password"
                            {...register('password')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="password_confirmation"
                            label="Confirmación"
                            type="password"
                            {...register('password_confirmation')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button type="submit" color="primary" variant="contained">
                            Crear
                        </Button>
                    </DialogActions>
                </form>
            </Paper>*/}
            {/*  <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input type='text' id='name' {...register('name')} />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' {...register('email')} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' {...register('password')}  />
                </div>
                <div>
                    <label htmlFor='password_confirmation'>Confirmar Password</label>
                    <input type='password' id='password_confirmation' {...register('password_confirmation')}  />
                </div>
                <input type="submit"/>
            </form>*/}
        </>
    );

    return (
        <div>
            {rol === 'ROLE_ADMIN' ? renderRegister : (<Unauthorized/>)}
        </div>
    );

};

export default withAuth(Register); //Porque quiero ver esta página solo si tengo sesión