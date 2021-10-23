import {useRouter} from "next/router";
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
import {Festival} from "@/lib/festivals";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";

const useStyles = makeStyles((theme) => ({
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

const DeleteFestival = ({id}) => {

    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleOpen = () => {
        setDeleteError(false);
        setOpen(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setOpen(false);
    };

    const handleDelete = async () => {

        try {
            //await Promise.allSettled([Festival.delete(id), router.push('/festivales')]);
            setProcessing(true);
            await Festival.delete(id);
            setDeleteSuccess(true);
            handleClose();
            router.push('/festivales');
            //alert('Eliminado!');
        } catch (error) {
            setDeleteError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                //alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                //alert(error.request.message);
                console.log(error.request);
            } else {
                //alert(error.message);
                console.log("Error", error.message);
            }
        }
        //setTimeout(handleRedirect,3000); //Serás redirijodo a index en 3...2...1
    };


    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleOpen}
            >
                Eliminar
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Deseas eliminar este festival?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        🎼 Asegúrese de no tener conciertos en este festival primero.🎵 <br/>
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

export default DeleteFestival;