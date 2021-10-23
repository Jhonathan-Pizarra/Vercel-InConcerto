import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    TextField
} from "@material-ui/core";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "@/lib/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import SnackMailed from "@/components/SnackMailed";
import SnackError from "@/components/SnackError";


const schema = yup.object().shape({
    email: yup.string().email("Ingresa un correo válido").required("Ingresa tu correo electrónico"),
});

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
    },
    buttonWrapper: {
        textAlign: "center",
    },
}));

const SendPasswordResetEmailPage = () => {
    const classes = useStyles();
    const { sendPasswordResetEmail } = useAuth();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);

    const onSendEmail = async ({email}) => {
        setLoading(true);
        console.log('userData', email);

        try {
            await sendPasswordResetEmail(email);
            setLoading(false);
            setCreateSuccess(true);
            //alert('¡Por favor, revisa tu correo electrónico!');

        } catch (error) {
            setCreateError(true);
            if (error.response) {
                setCreateError(true);
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

            } else if (error.request) {
                setCreateError(true);
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);

            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);

            }
            setLoading(false);
            console.log(error.config);
        }
        reset();
    };

    return (
        <div>
            <Grid container justify="center">
                <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSendEmail)}>
                    <Grid container spacing={2} justify="center" alignItems="center">
                        <Image
                            src="/logo1-inconcerto.png"
                            alt="InConcerto"
                            width={250}
                            height={200}
                        />

                        <Grid xs={12} item>
                            <DialogContentText s>
                                Por favor ingresa tu correo electrónico:
                            </DialogContentText>

                            <TextField
                                id="email"
                                name="email"
                                type="email"
                                label="Correo electrónico"
                                {...register('email')}
                                //inputRef={register}
                                autoComplete="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid xs={12} item className={classes.buttonWrapper}>
                            <Button
                                name="submit"
                                variant="contained"
                                type="submit"
                                color="secondary"
                                disabled={loading}
                            >
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {createSuccess && <SnackMailed/>}
                {createError && <SnackError/>}
                </Grid>
            </Grid>
        </div>

    );
};

export default SendPasswordResetEmailPage;