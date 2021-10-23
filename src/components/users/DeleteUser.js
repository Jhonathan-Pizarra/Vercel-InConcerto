import {mutate as mutateIndex} from "swr";
import {useRouter} from "next/router";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles
} from "@material-ui/core";
import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {User} from "@/lib/users";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";

const useStyles = makeStyles((theme) => ({
    delete: {
        color: "#f50057",
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

const DeleteUser = ({id}) => {

    const classes = useStyles();
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [processing, setProcessing] = useState(false);

    //const {data: user, error} = useSWR(`/users/${id}`, fetcher);

    const handleOpen = () => {
        setDeleteError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
        //router.push('/festivales');
    };

    const handleDelete = async () => {
        try {
            setProcessing(true);
            await User.delete(id);
            setDeleteSuccess(true);
            handleClose();
            mutateIndex('/users');
            router.push(Routes.USERS);
        } catch (error) {
            setDeleteError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                //alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            //alert(translateMessage(error.config));
            console.log(error.config);
        }
    };


    return (
        <div>
            <IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleOpen} >
                <DeleteIcon />
            </IconButton>

            <Dialog
                open={modal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Deseas eliminar este usuario?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        🎼 Asegúrese de no ocupar este usuario en:
                        <ul>
                            <li>Actividades</li>
                            <li>Calendarios</li>
                            <li>Alimentaciones</li>
                            <li>Hospedajes</li>
                        </ul>
                        De lo contrario no podrá eliminarlo ❌
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>

                    <div className={classes.wrapper}>
                        <Button
                            color="primary"
                            disabled={processing}
                            onClick={handleDelete}
                        >
                            Confirmar
                        </Button>
                        {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </DialogActions>
            </Dialog>
            {deleteSuccess && <SnackSuccess/>}
            {deleteError && <SnackError/>}
        </div>
    );

};

export default DeleteUser;
