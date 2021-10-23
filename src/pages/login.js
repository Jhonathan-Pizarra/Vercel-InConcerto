import {useAuth} from "@/lib/auth";
import withoutAuth from "@/hocs/withoutAuth";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Button, Grid, Link as MuiLink, makeStyles, TextField, Typography} from "@material-ui/core";
import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import Routes from "@/constants/routes";

const schema = yup.object().shape({
    email: yup.string().email("Esé email no es válido").required("Ingresa el email"),
    password: yup.string().required("Ingresa la contraseña"),
});

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
    },
    buttonWrapper: {
        textAlign: "center",
    },
}));

const Login = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const { register, handleSubmit,  formState:{ errors }} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) =>{
        setLoading(true);
        try {
            const userData = await login(data);
            setLoading(false);
            console.log('userData', data);

        }catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
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
            setLoading(false);
            console.log(error.config);
        }
    };


    return (
        <div>
            <Grid container justify="center">
                <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} justify="center" alignItems="center">
                            <Image
                                src="/logo1-inconcerto.png"
                                alt="InConcerto"
                                width={250}
                                height={200}
                            />
                            <Grid xs={12} item>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Correo electrónico"
                                    {...register('email')}
                                    // inputRef={register}
                                    autoComplete="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Clave"
                                    {...register('password')}
                                    // inputRef={register}
                                    autoComplete="current-password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
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
                                    Iniciar sesión
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <p className={classes.buttonWrapper}>
                        <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                            <Link href={`${Routes.FORGET_PASSWORD}`} passHref>
                                <MuiLink>
                                    <h4>¿Olvidaste tu contraseña?</h4>
                                </MuiLink>
                            </Link>
                        </Typography>
                    </p>
                </Grid>
            </Grid>
        </div>
    );

};

export default withoutAuth(Login);