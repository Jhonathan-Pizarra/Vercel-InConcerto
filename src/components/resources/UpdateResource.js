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
    makeStyles,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import {Resource} from "@/lib/resources";
import SnackInfo from "@/components/SnackInfo";
import SnackError from "@/components/SnackError";
import translateMessage from "@/constants/messages";

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

//Este {id} lo recibe desde el componente donde lo llamemos, en este caso sería: <UpdateResorce id={resource.id}/>
const UpdateResource = ({id}) => {

    const classes = useStyles();
    const {data: resource, mutate, error} = useSWR(`/resources/${id}`, fetcher);
    const { register, handleSubmit, reset } = useForm();
    const [modal, setModal] = useState(false);
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!resource) return <Loading/>;

    const handleOpen = () => {
        setUpdateInfo(false);
        setUpdateError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            setProcessing(true);
            await Resource.update(id, {
                ...data,
                name: ((data.name) === "") ? `Vacío (${resource.id})` : data.name,
                quantity: (((data.quantity) === "") || ((data.quantity) < 0) ) ? '0' : data.quantity,
                description: ((data.description) === "") ? `Sin descripción` : data.description,
            });
            mutateIndex('/resources');
            mutate();
            handleClose();
            setUpdateInfo(true);
        } catch (error) {
            setUpdateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                alert(translateMessage(error.response.data.errors.name));
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
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={handleOpen}
            >
                Editar
            </Button>


            {/*<IconButton aria-label="editar"  className={classes.edit} size="small" onClick={handleOpen} >*/}
            {/*    <EditIcon />*/}
            {/*</IconButton>*/}

            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            //autoFocus
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Nombre"
                            defaultValue={resource.name}
                            type="text"
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="standard-number"
                            label="Cantidad"
                            type="number"
                            defaultValue={resource.quantity}
                            //autoFocus
                            {...register('quantity')}
                            helperText="(0 si no aplica)"
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="outlined-basic"
                            label="Observación"
                            defaultValue={resource.description}
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('description')}
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

export default UpdateResource;