import {fetcher} from "../../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {
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
import DeleteFestivalConcert from "@/components/festivals/concerts/DeleteFestivalConcert";
import UpdateFestivalConcert from "@/components/festivals/concerts/UpdateFestivalConcert";

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

const ReadFestivalConcerts = ({id}) => {

    const classes = useStyles();
    //const router = useRouter();
    //const {id} = router.query;
    const {data: festconcerts, error} = useSWR(`/festivals/${id}/concerts`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No se pudieron cargar los conciertos...</p>;
    if (!festconcerts) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
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
                        {festconcerts && festconcerts.map((festconcert => {

                            var free = ((festconcert.free) === 0) ? "No" : "Si" ;
                            var insitu = ((festconcert.insitu) === 0) ? "No" : "Si" ;

                            return(
                                <TableRow key={festconcert.id}>
                                    <TableCell align="left">{festconcert.name}</TableCell>
                                    <TableCell align="left">{festconcert.dateConcert}</TableCell>
                                    <TableCell align="left">{festconcert.duration}</TableCell>
                                    <TableCell align="left">{free}</TableCell>
                                    <TableCell align="left">{insitu}</TableCell>
                                    <TableCell align="center">
                                        <td>
                                            <Link href={`${Routes.CONCERTS}/${festconcert.id}`}>
                                                <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                    <FindInPageIcon />
                                                </IconButton>
                                                {/*<IconButton aria-label="delete"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>*/}
                                            </Link>
                                        </td>
                                        <td>
                                            <UpdateFestivalConcert id={festconcert.id} idFestival={id}/>
                                            {/*<UpdateConcert id={festconcert.id}/>*/}
                                        </td>
                                        <td>
                                            <DeleteFestivalConcert id={festconcert.id} idFestival={id}/>
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
                    count = {festconcerts.length}
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

export default ReadFestivalConcerts;