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
import CreateConcertPlaceConcert from "@/components/concert-places/concerts/CreateConcertPlaceConcert";

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

const ReadConcertPlaceConcerts = ({id}) => {

    const classes = useStyles();
    //const router = useRouter();
    //const {id} = router.query;
    const {data: placeConcerts, error} = useSWR(`/places/${id}/concerts`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No se pudieron cargar los conciertos...</p>;
    if (!placeConcerts) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1>Conciertos en este lugar</h1>
            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                {/*<CreateResourceConcert/>*/}
                {/*<CreatePlaceConcert/>*/}
                <CreateConcertPlaceConcert/>
            </Grid>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>

                        <TableRow>
                            <TableCell className={classes.titles}>Concierto </TableCell>
                            <TableCell className={classes.titles}>Fecha</TableCell>
                            <TableCell className={classes.titles}>Duración&nbsp;(horas)</TableCell>
                            <TableCell className={classes.titles}>Gratuidad&nbsp;(Si - No)</TableCell>
                            <TableCell className={classes.titles}>Insitu&nbsp;(Si - No)</TableCell>
                            {/*<TableCell align="center">Lugar</TableCell>*/}
                            {/*<TableCell align="center">Festival</TableCell>*/}
                            <TableCell align="center" style={{color: "white"}}>Detalle</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {placeConcerts && placeConcerts.map((placeConcert => {

                            var free = ((placeConcert.free) === 0) ? "No" : "Si" ;
                            var insitu = ((placeConcert.insitu) === 0) ? "No" : "Si" ;

                            return(
                                <TableRow key={placeConcert.id}>
                                    <TableCell align="left">{placeConcert.name}</TableCell>
                                    <TableCell align="left">{placeConcert.dateConcert}</TableCell>
                                    <TableCell align="left">{placeConcert.duration}</TableCell>
                                    <TableCell align="left">{free}</TableCell>
                                    <TableCell align="left">{insitu}</TableCell>
                                    <TableCell align="center">
                                        <td>
                                            <Link href={`${Routes.CONCERTS}/${placeConcert.id}`}>
                                                <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                    <FindInPageIcon />
                                                </IconButton>
                                                {/*<IconButton aria-label="delete"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>*/}
                                            </Link>
                                        </td>
                                        <td>
                                            {/*<UpdateFestivalConcert id={festconcert.id} idFestival={id}/>*/}
                                            {/*<UpdateConcert id={festconcert.id}/>*/}
                                        </td>
                                        <td>
                                            {/*<DeleteFestivalConcert id={festconcert.id} idFestival={id}/>*/}
                                            {/*<DeleteConcert id={festconcert.id}/>*/}
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
                    count = {placeConcerts.length}
                    //count = {(placeConcerts.data && placeConcerts.data.length)? placeConcerts.data.length : 100 }
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

export default ReadConcertPlaceConcerts;