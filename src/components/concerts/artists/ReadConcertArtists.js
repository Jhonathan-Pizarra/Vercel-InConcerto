import {fetcher} from "../../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import IconButton from "@material-ui/core/IconButton";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Link from "next/link";
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
import Routes from "@/constants/routes";
import DeleteConcertArtist from "@/components/concerts/artists/DeleteConcertArtist";
import CreateConcertArtist from "@/components/concerts/artists/CreateConcertArtist";
import UpdateConcertArtist from "@/components/concerts/artists/UpdateConcertArtist";

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
        width: "120%",
        textAlign: "left",
    },
    titles:{
        color: "#FFFFFF",
        textAlign: "left",
    },
}));

const ReadConcertArtists = ({id}) => {

    const classes = useStyles();
    const {data: concertArtists, error} = useSWR(`/concerts/${id}/artists`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No se pudieron cargar los artistas...</p>;
    if (!concertArtists) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1>Artistas del concierto</h1>

            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                <CreateConcertArtist/>
            </Grid>

            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.titles}>Identificación</TableCell>
                            <TableCell className={classes.titles}>Nombre artístico</TableCell>
                            <TableCell className={classes.titles}>Nombre</TableCell>
                            <TableCell className={classes.titles}>Apellido</TableCell>
                            <TableCell className={classes.titles}>Nacionalidad</TableCell>
                            <TableCell className={classes.titles}>Email</TableCell>
                            <TableCell className={classes.titles}>Teléfono</TableCell>
                            <TableCell className={classes.titles}>Pasaje</TableCell>
                            <TableCell className={classes.titles}>Insitrumentos</TableCell>
                            <TableCell className={classes.titles}>Teléfono emergencia</TableCell>
                            <TableCell className={classes.titles}>Email emergencia</TableCell>
                            <TableCell className={classes.titles}>Grupo Alimenticio</TableCell>
                            <TableCell className={classes.titles}>Observación</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center" style={{color: "white"}}> Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*{concertArtists.data ? <SnackSuccess/> : <Loading/>}*/}
                        {concertArtists.data && concertArtists.data.map((concertArtist => {
                            var passage = ((concertArtist.passage) === 0) ? "No" : "Si" ;

                            return(
                                <TableRow key={concertArtist.id}>
                                    <TableCell align="left">{concertArtist.ciOrPassport}</TableCell>
                                    <TableCell align="left">{concertArtist.artisticOrGroupName}</TableCell>
                                    <TableCell align="left">{concertArtist.name}</TableCell>
                                    <TableCell align="left">{concertArtist.lastName}</TableCell>
                                    <TableCell align="left">{concertArtist.nationality}</TableCell>
                                    <TableCell align="left">{concertArtist.mail}</TableCell>
                                    <TableCell align="left">{concertArtist.phone}</TableCell>
                                    <TableCell align="left">{passage}</TableCell>
                                    <TableCell align="left">{concertArtist.instruments}</TableCell>
                                    <TableCell align="left">{concertArtist.emergencyPhone}</TableCell>
                                    <TableCell align="left">{concertArtist.emergencyMail}</TableCell>
                                    <TableCell align="left">{concertArtist.foodGroup}</TableCell>
                                    <TableCell align="left">
                                        <td className={classes.overrides}>
                                            {concertArtist.observation}
                                        </td>
                                    </TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center" >
                                        <td>
                                            <Link href={`${Routes.ARTISTS}/${concertArtist.id}`}>
                                                <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                    <FindInPageIcon />
                                                </IconButton>
                                            </Link>
                                        </td>
                                        <td>
                                            <UpdateConcertArtist idArtist={concertArtist.id} />
                                        </td>
                                        <td>
                                            <DeleteConcertArtist idArtist={concertArtist.id} idConcert={id} />
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
                    //count={artists.meta.total}
                    //count = {artists.data.length}
                    count = {(concertArtists.data && concertArtists.data.length)? concertArtists.data.length : 100 }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    )
}

export default ReadConcertArtists;
