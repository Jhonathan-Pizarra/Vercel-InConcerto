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
import CreateArtistLodging from "@/components/artists/lodgings/CreateArtistLodging";
import UpdateArtistLodging from "@/components/artists/lodgings/UpdateArtistLodging";
import DeleteArtistLodging from "@/components/artists/lodgings/DeleteArtistLodging";

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

const ReadArtistLodgings = ({id}) => {

    const classes = useStyles();
    const {data: artistLodgings, error} = useSWR(`/artists/${id}/lodgings`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No se pudieron cargar los hospedajes...</p>;
    if (!artistLodgings) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1>Hospedajes Artista</h1>

            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                <CreateArtistLodging/>
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
                        {artistLodgings.data && artistLodgings.data.map((artistLodging => {
                            //var passage = ((artist.passage) === 0) ? "No" : "Si" ;

                            return(
                                <TableRow key={artistLodging.id}>
                                    <TableCell align="left">{artistLodging.name}</TableCell>
                                    <TableCell align="left">{artistLodging.type}</TableCell>
                                    <TableCell align="left">{artistLodging.description}</TableCell>
                                    <TableCell align="left">{artistLodging.observation}</TableCell>
                                    <TableCell align="left">{artistLodging.checkIn}</TableCell>
                                    <TableCell align="left">{artistLodging.checkOut}</TableCell>
                                    <TableCell align="center" >
                                        <td>
                                            <Link href={`${Routes.LODGINGS}/${artistLodging.id}`}>
                                                <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                    <FindInPageIcon />
                                                </IconButton>
                                            </Link>
                                        </td>
                                        <td>
                                            <UpdateArtistLodging idLodging={artistLodging.id} idArtist={id}/>
                                            {/*<UpdateUserLodging idLodging={userLodging.id}/>*/}
                                            {/*<UpdateLodging id={lodging.id}/>*/}
                                        </td>
                                        <td>
                                            <DeleteArtistLodging idLodging={artistLodging.id} idArtist={id}/>
                                            {/*<DeleteUserLodging idLodging={userLodging.id}/>*/}
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
                    count = {(artistLodgings.data && artistLodgings.data.length)? artistLodgings.data.length : 100 }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    )
}

export default ReadArtistLodgings;