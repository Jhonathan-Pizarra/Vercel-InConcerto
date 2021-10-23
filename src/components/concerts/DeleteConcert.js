import {useRouter} from "next/router";
import DeleteIcon from "@material-ui/icons/Delete";
import {mutate as mutateIndex} from "swr";
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
import {Concert} from "@/lib/concerts";
import IconButton from "@material-ui/core/IconButton";
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

const DeleteConcert = ({id}) => {

    const classes = useStyles();
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [processing, setProcessing] = useState(false);

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
            await Concert.delete(id);
            setDeleteSuccess(true);
            handleClose();
            mutateIndex('/concerts');
            router.push('/conciertos');
            //router.push(Routes.CONCERTS);
        } catch (error) {
            setDeleteError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                //alert(error.response.message);
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
        }
        //setTimeout(handleRedirect,3000); //Serás redirijodo a index en 3...2...1
    };


    return (
        /*<div>
            <IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleDelete} >
                <DeleteIcon />
            </IconButton>
        </div>*/
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
                <DialogTitle id="alert-dialog-title">{"¿Deseas eliminar este concierto?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        🎼 Asegúrese de no tener <em><strong>artistas</strong></em> y/o <em><strong>recursos</strong></em> en este concierto primero.🎹 <br/>
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

export default DeleteConcert;
