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
import DeleteCalendarArtist from "@/components/calendars/artists/DeleteCalendarArtist";
import CreateCalendarArtist from "@/components/calendars/artists/CreateCalendarArtist";
import UpdateCalendarArtist from "@/components/calendars/artists/UpdateCalendarArtist";

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

const ReadCalendarArtists = ({id}) => {

    const classes = useStyles();
    const {data: artistsCalendars, error} = useSWR(`/calendars/${id}/artists`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No se pudieron cargar los artistas...</p>;
    if (!artistsCalendars) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1>Artistas del Calendario</h1>

            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                <CreateCalendarArtist/>
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
                        {/*{artistsCalendars.data ? <SnackSuccess/> : <Loading/>}*/}
                        {artistsCalendars.data && artistsCalendars.data.map((artistCalendar => {
                            var passage = ((artistCalendar.passage) === 0) ? "No" : "Si" ;

                            return(
                                <TableRow key={artistCalendar.id}>
                                    <TableCell align="left">{artistCalendar.ciOrPassport}</TableCell>
                                    <TableCell align="left">{artistCalendar.artisticOrGroupName}</TableCell>
                                    <TableCell align="left">{artistCalendar.name}</TableCell>
                                    <TableCell align="left">{artistCalendar.lastName}</TableCell>
                                    <TableCell align="left">{artistCalendar.nationality}</TableCell>
                                    <TableCell align="left">{artistCalendar.mail}</TableCell>
                                    <TableCell align="left">{artistCalendar.phone}</TableCell>
                                    <TableCell align="left">{passage}</TableCell>
                                    <TableCell align="left">{artistCalendar.instruments}</TableCell>
                                    <TableCell align="left">{artistCalendar.emergencyPhone}</TableCell>
                                    <TableCell align="left">{artistCalendar.emergencyMail}</TableCell>
                                    <TableCell align="left">{artistCalendar.foodGroup}</TableCell>
                                    <TableCell align="left">
                                        <td className={classes.overrides}>
                                            {artistCalendar.observation}
                                        </td>
                                    </TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center" >
                                        <td>
                                            <Link href={`${Routes.ARTISTS}/${artistCalendar.id}`}>
                                                <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                    <FindInPageIcon />
                                                </IconButton>
                                            </Link>
                                        </td>
                                        <td>
                                            {/*<UpdateArtist id={artistCalendar.id} />*/}
                                            <UpdateCalendarArtist idArtist={artistCalendar.id} idCalendar={id}/>
                                        </td>
                                        <td>
                                            <DeleteCalendarArtist idArtist={artistCalendar.id} idCalendar={id} />
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
                    count = {(artistsCalendars.data && artistsCalendars.data.length)? artistsCalendars.data.length : 100 }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
            {/*<CreateArtist/>*/}
        </div>
    )
}

export default ReadCalendarArtists;
