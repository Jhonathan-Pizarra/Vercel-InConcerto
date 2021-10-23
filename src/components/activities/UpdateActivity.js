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
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import {Activity} from "@/lib/activities";
import IconButton from "@material-ui/core/IconButton";
import SnackInfo from "@/components/SnackInfo";
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

//Este {id} lo recibe desde el componente donde lo llamemos
const UpdateActivity = ({id}) => {

    const classes = useStyles();
    const {data: activity, error, mutate} = useSWR(`/activityfestivals/${id}`, fetcher);
    const {data: festivals} = useSWR(`/festivals`, fetcher);
    const {data: users} = useSWR(`/users`, fetcher);
    const { register, handleSubmit, reset } = useForm();
    const [modal, setModal] = useState(false);
    const [stateFestival, setStateFestival] = useState(null);
    const [stateUser, setUser] = useState(null);
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!activity) return <Loading/>;
    if(!festivals) return <Loading/>;
    if(!users) return <Loading/>;

    var d = new Date(activity.date); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
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
        setStateFestival({stateFestival});
    };

    const handleChangeUser = () => {
        setUser({stateUser});
    };

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            setProcessing(true);
            await Activity.update(id, {
                ...data,
                name: ((data.name) === "") ? `Vacío (${activity.id})` : data.name,
                date: ((data.date) === "") ? fulldate : data.date,
                description: ((data.description) === "") ? `Vacío (${activity.id})` : data.description,
                observation: ((data.observation) === "") ? `Vacío (${activity.id})` : data.observation,
                festival_id: data.festival_id,
                user_id: data.user_id,
            });
            mutateIndex('/activityfestivals');
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

            <IconButton aria-label="editar"  className={classes.edit} size="small" onClick={handleOpen} >
                <EditIcon />
            </IconButton>
            {/*<Button
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={handleOpen}
            >
                Editar
            </Button>*/}

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
                            defaultValue={activity.name}
                            type="text"
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            id="datetime-local"
                            label="Fecha"
                            type="datetime-local"
                            defaultValue={fulldate}
                            InputProps={{inputProps: { min: fulldate} }}
                            margin="dense"
                            //className={classes.textField}
                            {...register('date')}
                            //dateConcert
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="outlined-basic"
                            label="Descripcion"
                            defaultValue={activity.description}
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('description')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            disabled={processing}
                            margin="dense"
                            id="outlined-basic"
                            label="Observación"
                            defaultValue={activity.observation}
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('observation')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Festival</InputLabel>
                        <Select
                            autoFocus={true}
                            disabled={processing}
                            fullWidth
                            native
                            value={stateFestival}
                            defaultValue={activity.festival_pk}
                            onChange={handleChangeFestival}
                            {...register("festival_id")}
                        >
                            <option key={activity.festival_pk}  value={activity.festival_pk} disabled={true}>{activity.festival}</option>
                            {festivals.data.map((festival) => (
                                <option key={festival.id}  value={festival.id}>{festival.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Responasble</InputLabel>
                        <Select
                            autoFocus={true}
                            disabled={processing}
                            fullWidth
                            native
                            value={stateUser}
                            defaultValue={activity.user_pk}
                            onChange={handleChangeUser}
                            {...register("user_id")}
                        >
                            <option key={activity.user_pk}  value={activity.user_pk} disabled={true}>{activity.user}</option>
                            {users.map((user) => (
                                <option key={user.id}  value={user.id}>{user.name}</option>
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

export default UpdateActivity;