import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {
    Link as MUILink,
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
import UpdateFeeding from "@/components/feedings/UpdateFeeding";
import DeleteFeeding from "@/components/feedings/DeleteFeeding";
import CreateFeeding from "@/components/feedings/CreateFeeding";

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

const ReadFeeding = () => {

    const classes = useStyles();
    const {data: feedings, error} = useSWR(`/feedings`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No se pudieron cargar los cuadros alimenticios...</p>;
    if (!feedings) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1>Cuadros alimenticios Inconcerto</h1>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.titles}>Fecha</TableCell>
                            <TableCell className={classes.titles}>Nombre</TableCell>
                            <TableCell className={classes.titles}>Cantidad</TableCell>
                            <TableCell className={classes.titles}>Observación</TableCell>
                            <TableCell className={classes.titles}>Lugar</TableCell>
                            <TableCell className={classes.titles}>Artista</TableCell>
                            <TableCell className={classes.titles}>Responsable</TableCell>
                            {/*<TableCell className={classes.titles}>Lugar</TableCell>*/}
                            {/*<TableCell className={classes.titles}>Artista</TableCell>*/}
                            {/*<TableCell className={classes.titles}>Administrador</TableCell>*/}
                            <TableCell align="center" style={{color: "white"}}> Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*{feedings.data ? <SnackSuccess/> : <Loading/>}*/}
                        {feedings.data && feedings.data.map((feeding => {
                            //var fid = ((feeding.id) === 0) ? "No" : "Si" ;

                            return(
                                <TableRow key={feeding.id}>
                                    <TableCell align="left">{feeding.date}</TableCell>
                                    <TableCell align="left">{feeding.food}</TableCell>
                                    <TableCell align="left">{feeding.quantityLunchs}</TableCell>
                                    <TableCell align="left">{feeding.observation}</TableCell>
                                    {/*<TableCell align="left">{feeding.place}</TableCell>*/}
                                    <TableCell align="left">{feeding.fplace}</TableCell>
                                    <TableCell align="left">{feeding.artist} {feeding.artistLst}</TableCell>
                                    <TableCell align="left">{feeding.user}</TableCell>
                                    <TableCell align="center" >
                                        <td>
                                            <Link href={`${Routes.FEEDINGS}/${feeding.id}`}>
                                                <MUILink>
                                                    <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                        <FindInPageIcon />
                                                    </IconButton>
                                                </MUILink>
                                            </Link>
                                        </td>
                                        <td>
                                            <UpdateFeeding id={feeding.id}/>
                                        </td>
                                        <td>
                                            <DeleteFeeding id={feeding.id}/>
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
                    //count={feedings.data.length}
                    count = {(feedings.data && feedings.data.length)? feedings.data.length : 100 }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
            <CreateFeeding/>
        </div>
    )
}

export default ReadFeeding;