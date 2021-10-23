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
import {Lodging} from "@/lib/lodgings";
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

const DeleteLodging = ({id}) => {

    const classes = useStyles();
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [processing, setProcessing] = useState(false);
    //const {data: lodging, error, mutate} = useSWR(`/lodgings`, fetcher);

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
            await Lodging.delete(id);
            setDeleteSuccess(true);
            handleClose();
            mutateIndex('/lodgings');
            router.push(Routes.LODGINGS);
        } catch (error) {
            setDeleteError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
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
                <DialogTitle id="alert-dialog-title">{"¿Deseas eliminar este hospedaje?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        🎼 Asegúrese de no tener artistas y/o usuarios en este hospedaje primero.🎵 <br/>
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

export default DeleteLodging;
