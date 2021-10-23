import React, {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SnackMailed() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [position] = useState({
        vertical: 'bottom',
        horizontal: 'left',
    });

    const { vertical, horizontal } = position;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar
                open={open}
                autoHideDuration={8000}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity="info">
                    ¡Completado! ¡Por favor, revisa tu correo electrónico!
                </Alert>
            </Snackbar>
        </div>
    );
}