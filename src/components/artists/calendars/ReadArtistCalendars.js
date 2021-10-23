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
import UpdateArtistCalendar from "@/components/artists/calendars/UpdateArtistCalendar";
import DeleteArtistCalendar from "@/components/artists/calendars/DeleteArtistCalendar";
import CreateArtistCalendar from "@/components/artists/calendars/CreateArtistCalendar";

const useStyles = makeStyles((theme) => ({
    detail:{
        color: "#3f51b5",
    },
    head: {
        backgroundColor: "#3f51b5",
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

const ReadArtistCalendars = ({id}) => {

    const classes = useStyles();
    const {data: artistCalendars, error} = useSWR(`/artists/${id}/calendars`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No se pudieron cargar los calendarios...</p>;
    if (!artistCalendars) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1>Calendarios del Artista</h1>

            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                <CreateArtistCalendar/>
            </Grid>

            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.titles}>Fecha de Entrada</TableCell>
                            <TableCell className={classes.titles}>Fecha de Salida</TableCell>
                            <TableCell className={classes.titles}>País del que proviene</TableCell>
                            <TableCell className={classes.titles}>Número de vuelo</TableCell>
                            {/*<TableCell align="center"></TableCell>*/}
                            {/*<TableCell align="center"></TableCell>*/}
                            {/*<TableCell align="center"></TableCell>*/}
                            {/*<TableCell align="center"></TableCell>*/}
                            <TableCell align="left" style={{color: "white"}}> Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*{userCalendars.data ? <SnackSuccess/> : <Loading/>}*/}
                        {artistCalendars.data && artistCalendars.data.map((artistCalendar => {

                            return(
                                <TableRow key={artistCalendar.id}>
                                    <TableCell align="left">{artistCalendar.checkIn_Artist}</TableCell>
                                    <TableCell align="left">{artistCalendar.checkOut_Artist}</TableCell>
                                    <TableCell align="left">{artistCalendar.comingFrom}</TableCell>
                                    <TableCell align="left">{artistCalendar.flyNumber}</TableCell>
                                    {/*<TableCell align="center"></TableCell>*/}
                                    {/*<TableCell align="center"></TableCell>*/}
                                    {/*<TableCell align="center"></TableCell>*/}
                                    {/*<TableCell align="center"></TableCell>*/}
                                    <TableCell align="center" >
                                        <td>
                                            <Link href={`${Routes.CALENDARS}/${artistCalendar.id}`}>
                                                <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                    <FindInPageIcon />
                                                </IconButton>
                                            </Link>
                                        </td>
                                        <td>
                                            <UpdateArtistCalendar idCalendar={artistCalendar.id}/>
                                            {/*<UpdateUserCalendar idCalendar={userCalendar.id}/>*/}
                                            {/*<UpdateCalendar id={userCalendar.id}/>*/}
                                        </td>
                                        <td>
                                            <DeleteArtistCalendar idCalendar={artistCalendar.id}/>
                                            {/*<DeleteUserCalendar idCalendar={userCalendar.id}/>*/}
                                            {/*<DeleteCalendarUser idUser={userCalendar.id} />*/}
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
                    count = {(artistCalendars.data && artistCalendars.data.length)? artistCalendars.data.length : 100 }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    )
}

export default ReadArtistCalendars;
