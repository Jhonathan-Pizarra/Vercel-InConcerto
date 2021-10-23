import {mutate as mutateID} from "swr";
import {useRouter} from "next/router";
import {Button, CircularProgress, Dialog, DialogActions, DialogTitle, makeStyles} from "@material-ui/core";
import React, {useState} from "react";
import {ConcertResource} from "@/lib/concert_resources";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";
import BackspaceIcon from "@material-ui/icons/Backspace";

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

const DeleteConcertResource = ({idResource, idConcert}) => {

    const classes = useStyles();
    const router = useRouter();
    //const {id} = router.query;
    //const {data: concertResource, error} = useSWR(`/concerts/${id}/resources/${idResource}`, fetcher);
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
            await ConcertResource.delete(idConcert, idResource);
            setDeleteSuccess(true);
            handleClose();
            mutateID(`/concerts/${idConcert}/resources`);
        } catch (error) {
            setDeleteError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                alert(error.response);
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
            {/*<IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleDelete} >*/}
            {/*    <LinkOffIcon />*/}
            {/*</IconButton>*/}
            <Button
                variant="outlined"
                color="primary"
                startIcon={<BackspaceIcon />}
                onClick={handleOpen}
            >
                Remover
            </Button>
            <Dialog
                open={modal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Deseas remover este recurso?"}</DialogTitle>
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

export default DeleteConcertResource;
