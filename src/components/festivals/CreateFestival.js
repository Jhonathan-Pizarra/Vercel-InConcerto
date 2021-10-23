import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Festival} from "@/lib/festivals";
import useSWR from "swr";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    makeStyles,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import AddIcon from "@material-ui/icons/Add";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import translateMessage from "@/constants/messages";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";

const schema = yup.object().shape({
    name: yup.string().required("Este campo es necesario..."),
    description: yup.string().required("Este campo es necesario..."),
    //image: yup.string().required("Este campo es necesario..."),
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
    // cancel: {
    //     position: 'fixed', //a la izquierda...
    // },
}));

const CreateFestival = () => {

    const classes = useStyles();
    const {data: festival, error, mutate} = useSWR(`/festivals`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [modal, setModal] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);
    // const fileInputRef = useRef();

    if(error) return <div>"No se pudo crear el festival..."</div>;
    if(!festival) return <Loading/>;

    const handleOpen = () => {
        reset();
        setCreateSuccess(false);
        setCreateError(false);
        setModal(true);
    };

    const handleClose =  () => {
        setProcessing(false);
        setModal(false);
    };

    const onSubmit = async (data) => {

        console.log('data', data);
        console.log("imgen ", data.image[0]);

        const newFestival = {
            name: data.name,
            description: data.description,
            image: data.image[0],
        };

        const formData = new FormData();
        formData.append("name", newFestival.name);
        formData.append("description", newFestival.description);
        formData.append("image", newFestival.image);

        try {
            setProcessing(true);
            await Festival.create(formData);
            mutate("/festivals");
            handleClose();
            setCreateSuccess(true);
            // console.log("file", fileInputRef.current.files[0]);
        } catch (error) {
            setCreateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                //alert(error.response.data.message);
                // alert(translateMessage(error.response.data.message));
                if (error.response.data.errors.name) {
                    alert(translateMessage(error.response.data.errors.name));
                } else if (error.response.data.errors.description) {
                    alert(translateMessage(error.response.data.errors.description));
                } else if(error.response.data.errors.image[0]) {
                    alert(translateMessage(error.response.data.errors.image[0]));
                } else if(error.response.data.errors.image[1]) {
                    alert(translateMessage(error.response.data.errors.image[1]));
                }
                console.error(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                //alert(error.request);
                console.error("Error en request:", error.request);
            } else {
                //alert(error.message);
                // Something happened in setting up the request that triggered an Error
                console.error("Error:", error.message);
            }
            //alert(error.config);
            //console.error(error.config);
        }
        reset(); //Limpiar los imput después del submit
    };

    return (
        <div>
            <Tooltip title="Nuevo" aria-label="add" className={classes.fixed}>
                <Fab  color="secondary" onClick={handleOpen} > {/*className={classes.fixed}*/}
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" >
                {/*<Grid*/}
                {/*    container*/}
                {/*    direction="row"*/}
                {/*    justify="flex-end"*/}
                {/*    alignItems="flex-start"*/}
                {/*>*/}
                {/*    <Button onClick={handleClose} color="secondary" className={classes.cancel}>*/}
                {/*        <CloseIcon/>*/}
                {/*    </Button>*/}
                {/*</Grid>*/}
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
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            value={festival.name}
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
                            // className={classes.body}
                            disabled={processing}
                            margin="dense"
                            id="description"
                            label="Descripción"
                            multiline
                            rows={3}
                            rowsMax={6}
                            type="text"
                            value={festival.description}
                            {...register('description')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.description?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContentText>
                        <DialogContent>
                            Cargar imagen:
                            <input
                                name="image"
                                type="file"
                                {...register('image')}
                            />
                            {/*<DialogContentText color="secondary">
                                {errors.image?.message}
                            </DialogContentText>*/}
                        </DialogContent>
                    </DialogContentText>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>

                        <div className={classes.wrapper}>
                            <Button
                                color="primary"
                                //onClick={handleValidate}
                                disabled={processing}
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

export default CreateFestival;