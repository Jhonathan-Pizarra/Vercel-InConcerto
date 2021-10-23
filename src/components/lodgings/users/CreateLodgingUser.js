import {fetcher} from "../../../utils";
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
    Select
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {useRouter} from "next/router";
import {LodgingUser} from "@/lib/lodging_users";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";

const useStyles = makeStyles((theme) => ({
    addusers: {
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

const CreateLodgingUser = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: lodgingUsers, mutate, error} = useSWR(`/lodgings/${id}/users`, fetcher);
    const {data: lodgings} = useSWR(`/lodgings`, fetcher);
    const {data: users} = useSWR(`/users`, fetcher);
    const { register, handleSubmit, reset} = useForm();
    const [modal, setModal] = useState(false);
    const [lodgingSelected, setLodgingSelected] = useState(null);
    const [userSelected, setUserSelected] = useState(null);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!lodgingUsers) return <Loading/>;
    if(!lodgings) return <Loading/>;
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

    const handleChangeLodging = () => {
        setLodgingSelected({lodgingSelected});
    };

    const handleChangeUser = () => {
        setUserSelected({userSelected});
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        const newLodgingUser = {
            lodging_id: data.lodging_id,
            user_id: data.user_id,
        };

        const formData = new FormData();
        formData.append("lodging_id", newLodgingUser.lodging_id);
        formData.append("user_id", newLodgingUser.user_id);

        try {
            setProcessing(true);
            await LodgingUser.create(id, formData);
            mutateTo(`/lodgings/${id}/users`);
            handleClose();
            setCreateSuccess(true);
        } catch (error) {
            setCreateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.message);
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

            <Button
                className={classes.addusers}
                variant="contained"
                //color="secondary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                Usuario
            </Button>

            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <InputLabel htmlFor="outlined-age-native-simple">Hospedaje</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            disabled={processing}
                            native
                            value={lodgingSelected}
                            defaultValue={id}
                            onChange={handleChangeLodging}
                            {...register("lodging_id")}
                        >
                            {lodgings.data.map((lodging) => (
                                <option key={lodging.id}  value={lodging.id}>{lodging.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Usuario</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            disabled={processing}
                            native
                            value={userSelected}
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
                                Vincular
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

export default CreateLodgingUser;