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
import {PlaceConcert} from "@/lib/concert_places";
import SnackInfo from "@/components/SnackInfo";
import translateMessage from "@/constants/messages";
import SnackError from "@/components/SnackError";

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

//Este {id} lo recibe desde el componente donde lo llamemos, en este caso sería: <UpdateConcertPlace id={place.id}/>
const UpdateConcertPlace = ({id}) => {

    const classes = useStyles();
    const {data: place, mutate, error} = useSWR(`/places/${id}`, fetcher);
    const { register, handleSubmit, reset } = useForm();
    const [modal, setModal] = useState(false);
    const [checkedPermission, setCheckedPermission] = useState(true);
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"No se puede editar el lugar..."</div>;
    if(!place) return <Loading/>;

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
            await PlaceConcert.update(id, {
                ...data,
                name: ((data.name) === "") ? `Vacío (${place.id})` : data.name,
                address: ((data.address) === "") ? `Vacío (${place.id})` : data.address,
                permit: data.permit,
                aforo: (((data.aforo) === "") || ((data.aforo) <= 0) ) ? '1' : data.aforo,
                description: ((data.description) === "") ? `Vacío (${place.id})` : data.description,
            });
            mutateIndex('/places');
            mutate();
            handleClose();
            setUpdateInfo(true);
        } catch (error) {
            setUpdateError(true);
            setProcessing(false);
            handleClose();
            //console.log(data.errors.aforo);
            if (error.response) {
                //alert(translateMessage(error.response.data.message));
                //console.log(data.errors.aforo);
                alert(translateMessage(error.response.data.errors.aforo));
                console.error(error.response);
            } else if (error.request) {
                alert(translateMessage(error.request));
                console.error(error.request);
            } else {
                alert(translateMessage(error.message));
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
                                //autoFocus
                                // className={classes.title}
                                disabled={processing}
                                autoFocus={true}
                                margin="dense"
                                id="name"
                                label="Nombre"
                                defaultValue={place.name}
                                type="text"
                                {...register('name')}
                                fullWidth
                            />
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                //autoFocus
                                // className={classes.title}
                                disabled={processing}
                                autoFocus={true}
                                margin="dense"
                                id="address"
                                label="Dirección"
                                type="text"
                                defaultValue={place.address}
                                multiline
                                rows={3}
                                rowsMax={6}
                                {...register('address')}
                                fullWidth
                            />
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                disabled={processing}
                                autoFocus={true}
                                margin="dense"
                                id="aforo"
                                label="Aforo"
                                type="number"
                                defaultValue={place.aforo}
                                {...register('aforo')}
                                //helperText="(Déjelo en 0 si no aplica)"
                            />
                        </DialogContent>

                        <DialogContent style={{textAlign: 'center'}}>
                            <FormControlLabel
                                value={checkedPermission ? "1" : "0"}
                                {...register('permit')}
                                control={
                                    <Checkbox
                                        disabled={processing}
                                        autoFocus={true}
                                        checked={checkedPermission}
                                        onChange={handleCheckPermission}
                                    />
                                }
                                //defaultValue={place.permit}
                                label="Permiso"
                                labelPlacement="top"
                            />
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                //autoFocus
                                // className={classes.title}
                                disabled={processing}
                                autoFocus={true}
                                margin="dense"
                                id="description"
                                label="Descripción"
                                type="text"
                                defaultValue={place.description}
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

export default UpdateConcertPlace;