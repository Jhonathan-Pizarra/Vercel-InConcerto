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
    InputLabel,
    makeStyles,
    Select,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import {Essay} from "@/lib/essays";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
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

const UpdateEssay = ({id}) => {

    //const {id} = router.query;
    //const router = useRouter();
    const classes = useStyles();
    const {data: essay, error, mutate} = useSWR(`/essays/${id}`, fetcher);
    const {data: festivals} = useSWR(`/festivals`, fetcher);
    const { register, handleSubmit, reset } = useForm();
    const [modal, setModal] = useState(false);
    const [selectFestival, setSelectFestival] = useState(null);
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"No se pudo editar el ensayo..."</div>;
    if(!essay) return <Loading/>;
    if(!festivals) return <Loading/>;

    var d = new Date(essay.dateEssay); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    var year = d.getFullYear();
    var month = (d.getMonth()+1).toString().padStart(2, "0");
    var day = d.getDate().toString().padStart(2, "0");
    var hours = ('0'+d.getHours()).substr(-2);
    var min = d.getMinutes().toString().padStart(2, "0");
    const fulldate = year+'-'+month+'-'+day+'T'+hours+':'+min;

    const handleOpen = () => {
        setUpdateInfo(false);
        setUpdateError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
    };

    const handleChangeFestival = () => {
        setSelectFestival({selectFestival});
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            setProcessing(true);
            await Essay.update(id, {
                ...data,
                name: ((data.name) === "") ? `Vacío (${essay.id})` : data.name,
                dateEssay: data.dateEssay,
                place: ((data.place) === "") ? `Vacío (${essay.id})` : data.place,
                festival_id: data.festival_id,
            });
            mutateIndex('/essays');
            mutate();
            handleClose();
            setUpdateInfo(true);
            //alert("Editado!");
        } catch (error) {
            setUpdateError(true);
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
            console.log(error.config);
        }
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
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            defaultValue={essay.name}
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            //autoFocus
                            autoFocus={true}
                            disabled={processing}
                            id="datetime-local"
                            label="Fecha"
                            type="datetime-local"
                            //defaultValue={`2017-05-24T10:30`}
                            defaultValue={fulldate}
                            InputProps={{inputProps: { min: fulldate} }}
                            margin="dense"
                            //className={classes.textField}
                            {...register('dateEssay')}
                            //dateConcert
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
                            id="place"
                            label="Lugar"
                            type="text"
                            defaultValue={essay.place}
                            {...register('place')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Festival</InputLabel>
                        <Select
                            //autoFocus
                            autoFocus={true}
                            disabled={processing}
                            fullWidth
                            native
                            value={selectFestival}
                            defaultValue={essay.festival_pk}
                            onChange={handleChangeFestival}
                            {...register("festival_id")}
                        >
                            <option key={essay.festival_pk}  value={essay.festival_pk} disabled={true}>{essay.festival}</option>
                            {festivals.data.map((festival) => (
                                <option key={festival.id}  value={festival.id}>{festival.name}</option>
                            ))}
                        </Select>
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

export default UpdateEssay;