import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Festival} from "@/lib/festivals";
import useSWR from "swr";
import {useRouter} from "next/router";
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
import EditIcon from "@material-ui/icons/Edit";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import translateMessage from "@/constants/messages";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import SnackInfo from "@/components/SnackInfo";
import SnackError from "@/components/SnackError";

const schema = yup.object().shape({
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),
});

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

const UpdateFestival = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: festival, error, mutate} = useSWR(`/festivals/${id}`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors }  } = useForm({
        resolver: yupResolver(schema)
    });
    const [open, setOpen] = useState(false);
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"No se puede editar el festival..."</div>;
    if(!festival) return <Loading/>

    const handleOpen = () => {
        setUpdateInfo(false);
        setUpdateError(false);
        setOpen(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setOpen(false);
    };

    const onSubmit = async (data) => {
        console.log('data', data);
        //console.log("imagen", data.image[0]);
        try {
            setProcessing(true);
            await Festival.update(id, {
                ...data,
                name: ((data.name) === "") ? `Vacío (${festival.id})` : data.name,
                description: ((data.description) === "") ? `Ninguna descripción` : data.description,
                //image: data.image[0],
            });
            //mutate(`/festivals/${id}`);
            mutate();
            handleClose();
            setUpdateInfo(true);
            /*mutate(`/festivals/${data.id}`);*/
        } catch (error) {
            setUpdateError(true);
            setProcessing(false);
            handleClose();
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                //alert(error.response.message);
                //alert(translateMessage(error.response.data.message));
                if (error.response.data.errors.name) {
                    alert(translateMessage(error.response.data.errors.name));
                } else if (error.response.data.errors.description) {
                    alert(translateMessage(error.response.data.errors.description));
                }
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
        //handleUpdate();
        reset(); //Limpiar los imput después del submit
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

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">Editar Festival</DialogTitle>

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
                            type="text"
                            defaultValue={festival.name}
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
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="description"
                            label="Descripción"
                            multiline
                            rows={3}
                            rowsMax={6}
                            type="text"
                            defaultValue={festival.description}
                            {...register('description')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.description?.message}
                        </DialogContentText>
                    </DialogContent>

                    {/*<DialogContentText>
                        <DialogContent>
                            Cargar imagen:
                            <input
                                name="image"
                                type="file"
                                // ref={register}
                                {...register('image')}
                            />
                        </DialogContent>
                    </DialogContentText>*/}

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        {/*<Button onClick={handleClose} color="primary" type="submit">
                            Editar
                        </Button>*/}
                        <div className={classes.wrapper}>
                            <Button
                                color="primary"
                                disabled={processing}
                                //onClick={handlePreUpdate}
                                type="submit"
                            >
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

export default UpdateFestival;