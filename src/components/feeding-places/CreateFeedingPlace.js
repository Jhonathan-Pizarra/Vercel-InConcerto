import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR from "swr";
import {
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    FormControlLabel,
    makeStyles,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {FeedingPlace} from "@/lib/feeding_places";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";
import translateMessage from "@/constants/messages";

const schema = yup.object().shape({
    name: yup.string().required("Este campo es necesario..."),
    address: yup.string().required("Este campo es necesario..."),
    aforo: yup.number().typeError('Debes escribir un número').positive('La cantidad no es válida').min(1, 'Capacidad mínima es 1').max(150000, "Lo máximo posible es 150.000").required("Este campo es necesario..."),
});

const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(2),
        right: theme.spacing(2),
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

const CreateFeedingPlace = () => {

    const classes = useStyles();
    const {data: fplace, error, mutate} = useSWR(`/feeding_places`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [modal, setModal] = React.useState(false);
    const [checkedPermission, setCheckedPermission] = useState(true);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"No se pudo crear el lugar..."</div>;
    if(!fplace) return <Loading/>;

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

    const handleCheckPermission = (event) => {
        setCheckedPermission(event.target.checked);
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        const newFeedingPlace = {
            name: data.name,
            address: data.address,
            permit: data.permit,
            aforo: data.aforo,
        };

        const formData = new FormData();
        formData.append("name", newFeedingPlace.name);
        formData.append("address", newFeedingPlace.address);
        formData.append("permit", newFeedingPlace.permit);
        formData.append("aforo", newFeedingPlace.aforo);

        try {
            setProcessing(true);
            await FeedingPlace.create(formData);
            mutate("/feeding_places");
            handleClose();
            setCreateSuccess(true);
        } catch (error) {
            setCreateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                if (error.response.data.errors.name) {
                    alert(translateMessage(error.response.data.errors.name));
                }
                if (error.response.data.errors.address) {
                    alert(translateMessage(error.response.data.errors.address));
                }
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
                            id="address"
                            label="Dirección"
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('address')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.address?.message}
                        </DialogContentText>
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
                            disabled={processing}
                            margin="dense"
                            id="aforo"
                            label="Aforo"
                            type="number"
                            {...register('aforo')}
                            //helperText="(Déjelo en 0 si no aplica)"
                        />
                        <DialogContentText color="secondary">
                            {errors.aforo?.message}
                        </DialogContentText>
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
                    </DialogActions>
                </form>
            </Dialog>
            {createSuccess && <SnackSuccess/>}
            {createError && <SnackError/>}
        </div>
    );
};

export default CreateFeedingPlace;