import React, {useState} from "react";
import {useForm} from "react-hook-form";
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
    makeStyles,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import {FeedingPlace} from "@/lib/feeding_places";
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

//Este {id} lo recibe desde el componente donde lo llamemos
const UpdateFeedingPlace = ({id}) => {

    const classes = useStyles();
    const {data: fplace, error, mutate} = useSWR(`/feeding_places/${id}`, fetcher);
    const { register, handleSubmit, reset } = useForm();
    const [modal, setModal] = useState(false);
    const [checkedPermission, setCheckedPermission] = useState(true);
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!fplace) return <Loading/>;

    const handleOpen = () => {
        setUpdateInfo(false);
        setUpdateError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
    };

    const handleCheckPermission = (event) => {
        setCheckedPermission(event.target.checked);
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            setProcessing(true);
            await FeedingPlace.update(id, {
                ...data,
                name: ((data.name) === "") ? `Vacío (${fplace.id})` : data.name,
                address: ((data.address) === "") ? `Vacío (${fplace.id})` : data.address,
                permit: data.permit,
                aforo: (((data.aforo) === "") || ((data.aforo) <= 0) || (!!isNaN(data.aforo)) ) ? '1' : data.aforo,
            });
            mutateIndex('/feeding_places');
            mutate();
            handleClose();
            setUpdateInfo(true);
        } catch (error) {
            setUpdateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
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
                            id="name"
                            label="Nombre"
                            type="text"
                            defaultValue={fplace.name}
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
                            id="address"
                            label="Dirección"
                            defaultValue={fplace.address}
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('address')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent style={{textAlign: 'center'}}>
                        <FormControlLabel
                            value={checkedPermission ? "1" : "0"}
                            {...register('permit')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    checked={checkedPermission}
                                    onChange={handleCheckPermission}
                                />
                            }
                            label="Disponible"
                            labelPlacement="top"
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="aforo"
                            label="Aforo"
                            type="number"
                            defaultValue={fplace.aforo}
                            {...register('aforo')}
                            //helperText="(Déjelo en 0 si no aplica)"
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

export default UpdateFeedingPlace;