import {fetcher} from "../../../utils";
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
import FindInPageIcon from "@material-ui/icons/FindInPage";
import IconButton from "@material-ui/core/IconButton";
import CreateUserFeeding from "@/components/users/feedings/CreateUserFeeding";
import UpdateUserFeeding from "@/components/users/feedings/UpdateUserFeeding";
import DeleteUserFeeding from "@/components/users/feedings/DeleteUserFeeding";

const useStyles = makeStyles((theme) => ({
    detail:{
        color: "#3f51b5",
    },
    head: {
        backgroundColor: "#3f51b5",
    },
    titles:{
        color: "#FFFFFF",
        textAlign: "left",
    },
    button:{
        backgroundColor: "#ffeb3b",
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
}));

const ReadUserFeedings = ({id}) => {

    const classes = useStyles();
    const {data: userFeedings, error} = useSWR(`/users/${id}/feedings`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No se pudieron cargar los cuadros alimenticios...</p>;
    if (!userFeedings) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <div>
            <h1>Cuadros Alimenticios</h1>
            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                <CreateUserFeeding/>
            </Grid>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>

                        <TableRow>
                            <TableCell className={classes.titles}>Fecha</TableCell>
                            <TableCell className={classes.titles}>Comensal&nbsp;</TableCell>
                            <TableCell className={classes.titles}>Plato&nbsp;</TableCell>
                            <TableCell className={classes.titles}>Cantidad&nbsp;</TableCell>
                            <TableCell className={classes.titles}>Oservación&nbsp;</TableCell>
                            {/*<TableCell align="center">Lugar</TableCell>*/}
                            {/*<TableCell align="center">Festival</TableCell>*/}
                            <TableCell align="left" style={{color: "white"}}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userFeedings && userFeedings.map((userFeed => {

                            return(
                                <TableRow key={userFeed.id}>
                                    <TableCell align="left">{userFeed.date}</TableCell>
                                    <TableCell align="left">{userFeed.artist}</TableCell>
                                    <TableCell align="left">{userFeed.food}</TableCell>
                                    <TableCell align="left">{userFeed.quantityLunchs}</TableCell>
                                    <TableCell align="left">{userFeed.observation}</TableCell>
                                    <TableCell align="center">
                                        <td>
                                            <Link href={`${Routes.FEEDINGS}/${userFeed.id}`}>
                                                <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                    <FindInPageIcon />
                                                </IconButton>
                                                {/*<IconButton aria-label="delete"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>*/}
                                            </Link>
                                        </td>
                                        <td>
                                            <UpdateUserFeeding id={userFeed.id} idUser={id}/>
                                        </td>
                                        <td>
                                            <DeleteUserFeeding id={userFeed.id} idUser={id}/>
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
                    //count={concerts.meta.total}
                    count = {userFeedings.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
            {/*<CreateConcert/>*/}
        </div>
    );
}

export default ReadUserFeedings;