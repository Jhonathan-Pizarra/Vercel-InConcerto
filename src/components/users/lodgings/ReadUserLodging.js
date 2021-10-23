import useSWR from "swr";
import Loading from "@/components/Loading";
import {
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import React, {useState} from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import IconButton from "@material-ui/core/IconButton";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import {fetcher} from "../../../utils";
import UpdateUserLodging from "@/components/users/lodgings/UpdateUserLodging";
import DeleteUserLodging from "@/components/users/lodgings/DeleteUserLodging";
import CreateUserLodging from "@/components/users/lodgings/CreateUserLodging";

const useStyles = makeStyles((theme) => ({
    detail:{
        color: "#3f51b5",
    },
    head: {
        backgroundColor: "#f44336",
    },
    overrides: {
        color: "rgba(0, 0, 0, 0.87)",
        display: "table",
        fontSize: "0.875rem",
        fontFamily: "Neuton",
        fontWeight: "400",
        verticalAlign: "inherit",
        boxSizing: "inherit",
        width: "320%",
        textAlign: "left",
    },
    titles:{
        color: "#FFFFFF",
        textAlign: "left",
    },
}));

const ReadUserLodging = ({id}) => {

    const classes = useStyles();
    const {data: userLodgings, error} = useSWR(`/users/${id}/lodgings`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No se pudieron cargar los hospedajes...</p>;
    if (!userLodgings) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1>Hospedajes Usuario</h1>

            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                <CreateUserLodging/>
            </Grid>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.titles}>Nombre</TableCell>
                            <TableCell className={classes.titles}>Características</TableCell>
                            <TableCell className={classes.titles}>Descripción</TableCell>
                            <TableCell className={classes.titles}>Observación</TableCell>
                            <TableCell className={classes.titles}>Fecha de entrada</TableCell>
                            <TableCell className={classes.titles}>Fecha de salida</TableCell>
                            <TableCell align="center" style={{color: "white"}}> Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*{lodgings.data ? <SnackSuccess/> : <Loading/>}*/}
                        {userLodgings.data && userLodgings.data.map((userLodging => {
                            //var passage = ((artist.passage) === 0) ? "No" : "Si" ;

                            return(
                                <TableRow key={userLodging.id}>
                                    <TableCell align="left">{userLodging.name}</TableCell>
                                    <TableCell align="left">{userLodging.type}</TableCell>
                                    <TableCell align="left">{userLodging.description}</TableCell>
                                    <TableCell align="left">{userLodging.observation}</TableCell>
                                    <TableCell align="left">{userLodging.checkIn}</TableCell>
                                    <TableCell align="left">{userLodging.checkOut}</TableCell>
                                    <TableCell align="center" >
                                        <td>
                                            <Link href={`${Routes.LODGINGS}/${userLodging.id}`}>
                                                <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                    <FindInPageIcon />
                                                </IconButton>
                                            </Link>
                                        </td>
                                        <td>
                                            <UpdateUserLodging idLodging={userLodging.id} idUser={id}/>
                                            {/*<UpdateLodging id={lodging.id}/>*/}
                                        </td>
                                        <td>
                                            <DeleteUserLodging idLodging={userLodging.id} idUser={id}/>
                                            {/*<DeleteLodging id={lodging.id}/>*/}
                                        </td>
                                    </TableCell>
                                </TableRow>
                            )
                        })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    //count={lodgings.data.length}
                    count = {(userLodgings.data && userLodgings.data.length)? userLodgings.data.length : 100 }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    )
}

export default ReadUserLodging;