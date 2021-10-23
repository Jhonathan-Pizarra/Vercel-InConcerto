import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {
    IconButton,
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
import CreateConcert from "@/components/concerts/CreateConcert";
import Link from "next/link";
import Routes from "@/constants/routes";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import UpdateConcert from "@/components/concerts/UpdateConcert";
import DeleteConcert from "@/components/concerts/DeleteConcert";

const useStyles = makeStyles((theme) => ({
    detail:{
        color: "#3f51b5",
    },
    head: {
        backgroundColor: "#f44336",
    },
    titles:{
        color: "#FFFFFF",
        textAlign: "left",
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

const ReadConcerts = () => {

    const classes = useStyles();
    const {data: concerts, error} = useSWR(`/concerts`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No se pudieron cargar los conciertos...</p>;
    if (!concerts) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1>Conciertos InConcerto</h1>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>

                        <TableRow>
                            <TableCell className={classes.titles}>Concierto </TableCell>
                            <TableCell className={classes.titles}>Fecha</TableCell>
                            <TableCell className={classes.titles}>Duración</TableCell>
                            <TableCell className={classes.titles}>Gratuidad&nbsp;(Si - No)</TableCell>
                            <TableCell className={classes.titles}>InsiItu&nbsp;(Si - No)</TableCell>
                            <TableCell className={classes.titles}>Lugar</TableCell>
                            <TableCell className={classes.titles}>Festival</TableCell>
                            {/*<TableCell align="center">Lugar</TableCell>*/}
                             {/*<TableCell align="center">Festival</TableCell>*/}
                            <TableCell align="left" style={{color: "white"}}>&emsp;Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                       {/* {concerts.data ? <SnackSuccess/> : <Loading/>}*/}
                        {concerts.data && concerts.data.map((concert => {

                            var free = ((concert.free) === 0) ? "No" : "Si" ;
                            var insitu = ((concert.insitu) === 0) ? "No" : "Si" ;

                            return(
                                <TableRow key={concert.id}>
                                    <TableCell align="left">{concert.name}</TableCell>
                                    <TableCell align="left">{concert.dateConcert}</TableCell>
                                    <TableCell align="left">{concert.duration}</TableCell>
                                    <TableCell align="left">{free}</TableCell>
                                    <TableCell align="left">{insitu}</TableCell>
                                    <TableCell align="left">{concert.place}</TableCell>
                                    <TableCell align="left">{concert.festival}</TableCell>
                                    {/*<TableCell align="center">
                                        <Link href={concert.place} passHref>
                                            <MuiLink>
                                                Ir
                                            </MuiLink>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Link href={concert.festival} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </TableCell>*/}
                                    <TableCell align="left">
                                        <td>
                                            <Link href={`${Routes.CONCERTS}/${concert.id}`}>
                                                <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                    <FindInPageIcon />
                                                </IconButton>
                                            </Link>
                                        </td>
                                        <td>
                                            <UpdateConcert id={concert.id}/>
                                        </td>
                                        <td>
                                            <DeleteConcert id={concert.id}/>
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
                    //count = {concerts.data.length}
                    count = {(concerts.data && concerts.data.length)? concerts.data.length : 100 }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
            <CreateConcert/>
        </div>
    );
}

export default ReadConcerts;