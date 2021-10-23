import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {makeStyles} from "@material-ui/core/styles";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
    Box,
    Button,
    ClickAwayListener,
    Divider,
    Drawer,
    Grow,
    Link as MuiLink,
    ListItem,
    ListItemText,
    MenuList,
    Paper,
    Popper,
    useScrollTrigger
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import clsx from "clsx";

import Routes from "../constants/routes";
import IconsMenu from "./NavigationIcons";
import Typography from "@material-ui/core/Typography";
import {useAuth} from "@/lib/auth";
import api from "@/lib/api";


const drawerWidth = 250;
const mainMenuItems = [
    {
        text: "Inicio",
        to: Routes.HOME,
    },
    {
        text: "Festivales",
        to: Routes.FESTIVALS,
    },
    {
        text: "Conciertos",
        to: Routes.CONCERTS,
    },
    {
        text: "Ensayos",
        to: Routes.ESSAYS,
    },
    {
        text: "Artistas",
        to: Routes.ARTISTS,
    },
    {
        text: "Necesidades",
        to: Routes.RESOURCES,
    },
    {
        text: "Lugares",
        to: Routes.PLACES,
    },
    {
        text: "Calendarios",
        to: Routes.CALENDARS,
    },
    {
        text: "Transportes",
        to: Routes.TRANSPORTS,
    },
    {
        text: "Hospedajes",
        to: Routes.LODGINGS,
    },
    {
        text: "Huecas",
        to: Routes.FEEDINGPLACES,
    },
    {
        text: "Alimentación",
        to: Routes.FEEDINGS,
    },
    {
        text: "Actividades",
        to: Routes.ACTIVITIES,
    },
    {
        text: "Usuarios",
        to: Routes.USERS,
    },
];
const useStyles = makeStyles((theme) => ({
    appBar: {
        // backgroundColor: "#90caf9",
        // color: "#000000",
        maxHeight: 64,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        display: "none",
        padding: 8,
        //maxHeight: 64,
        maxHeight: 100,
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
        "& a img": {
            //maxHeight: 45,
            maxHeight: 75,
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    h3: {
        fontSize: "1rem",
        padding: 5,
    },
    titleNavs: {
        color: "white",
        //subtitle1: 'h2',
        textTransform: "capitalize",
    },

}));

function HideOnScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function MainMenu(props) {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    //const theme = useTheme();
    //--------
    const [openM4, setOpenM4] = useState(false);
    const [openM3, setOpenM3] = useState(false);
    const [openM2, setOpenM2] = useState(false);
    const [openM1, setOpenM1] = useState(false);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const anchorRefM1 = useRef(null);
    const anchorRefM2 = useRef(null);
    const anchorRefM3 = useRef(null);
    const anchorRefM4 = useRef(null);
    const { user } = useAuth();

    async function getAuthenticatedUser() {
        try {
            const response = await api.get("/user");
            console.log("response user", response);
            return response;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return error.response;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }

    useEffect(() => {
        console.log("RENDER AUTH", user);
        try {
            getAuthenticatedUser();
        } catch (error) {
            console.log("NO USER");
        }
    }, []);

    const renderUserSection = () => {

        try {
            if (user.role === 'ROLE_ADMIN' || user.user.role === 'ROLE_ADMIN'){
                return (
                    <Link href={Routes.USERS}>
                        <MenuItem onClick={handleClose}>Coordinadores</MenuItem>
                    </Link>
                );
            }
        }catch (error) {
            console.log("NO USER");
        }
    }

    //console.log('a ver2', user.role);

    const handleToggleM1 = () => {
        setOpenM1((prevOpen) => !prevOpen);
    };

    const handleToggleM2 = () => {
        setOpenM2((prevOpen) => !prevOpen);
    };

    const handleToggleM3 = () => {
        setOpenM3((prevOpen) => !prevOpen);
    };

    const handleToggleM4 = () => {
        setOpenM4((prevOpen) => !prevOpen);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {

        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            setOpenM1(false);
            setOpenM2(false);
            setOpenM3(false);
            setOpenM4(false);
            return;
        }

        if (anchorRefM1.current && anchorRefM1.current.contains(event.target)) {
            setOpen(false);
            setOpenM2(false);
            setOpenM3(false);
            setOpenM4(false);
            return;
        }

        if (anchorRefM2.current && anchorRefM2.current.contains(event.target)) {
            setOpen(false);
            setOpenM1(false);
            setOpenM3(false);
            setOpenM4(false);
            return;
        }

        if (anchorRefM3.current && anchorRefM3.current.contains(event.target)) {
            setOpen(false);
            setOpenM1(false);
            setOpenM2(false);
            setOpenM4(false);
            return;
        }

        if (anchorRefM4.current && anchorRefM4.current.contains(event.target)) {
            setOpen(false);
            setOpenM1(false);
            setOpenM2(false);
            setOpenM3(false);
            return;
        }

        setOpen(false);
        setOpenM1(false);
        setOpenM2(false);
        setOpenM3(false);
        setOpenM4(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
            setOpenM1(false);
            setOpenM2(false);
            setOpenM3(false);
            setOpenM4(false);
        }
    }

    /*const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);*/

    // const prevOpenM1 = useRef(openM1);
    // useEffect(() => {
    //     if (prevOpenM1.current === true && openM1 === false) {
    //         anchorRef.current.focus();
    //     }
    //
    //     prevOpenM1.current = openM1;
    // }, [openM1]);

    //----------
    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const renderDrawerMenu = (
        <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor="left"
            open={openDrawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            onClose={handleDrawerClose}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List className={classes.grow}>
                {mainMenuItems.map((item, index) => (
                    <Link href={item.to} key={item.text}>
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemText>{item.text}</ListItemText>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <p className={classes.h3}> © 2020 - InConcerto.</p>
        </Drawer>
    );

    return (
        <div className={classes.grow}>
            <HideOnScroll {...props}>
                <AppBar position="sticky" className={classes.appBar}>
                    <Toolbar>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                className={clsx(classes.menuButton, openDrawer && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>

                            {/*<p className={classes.h3}>InConcerto</p>*/}
                        </div>

                        <Box className={classes.logo}>
                            <Link href={Routes.HOME} passHref>
                                <MuiLink>
                                    <Image
                                        src="/logo1-inconcerto.png"
                                        alt="InConcerto"
                                        width={136}
                                        height={100}
                                    />
                                </MuiLink>
                            </Link>
                        </Box>

                        {/*<div className={classes.grow} />*/}

                        <div className={classes.sectionDesktop}>

                            {/*Inicio*/}
                            <Button
                                ref={anchorRefM1}
                                aria-controls={openM1 ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggleM1}
                            >
                                <Typography className={classes.titleNavs}>Eventos</Typography>
                            </Button>
                            <Popper open={openM1} anchorEl={anchorRefM1.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>

                                                <MenuList autoFocusItem={openM1} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <Link href={Routes.FESTIVALS}>
                                                        <MenuItem onClick={handleClose}>Festivales</MenuItem>
                                                    </Link>
                                                    <Link href={Routes.CONCERTS}>
                                                        <MenuItem onClick={handleClose}>Conciertos</MenuItem>
                                                    </Link>
                                                    <Link href={Routes.ESSAYS}>
                                                        <MenuItem onClick={handleClose}>Ensayos</MenuItem>
                                                    </Link>
                                                    {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                                    {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}

                                                </MenuList>
                                            </ClickAwayListener>

                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            {/*Fin*/}

                            {/*Inicio*/}
                            <Button
                                ref={anchorRefM2}
                                aria-controls={openM2 ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggleM2}
                            >
                                <Typography className={classes.titleNavs}>Alimentación</Typography>
                            </Button>
                            <Popper open={openM2} anchorEl={anchorRefM2.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>

                                                <MenuList autoFocusItem={openM2} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <Link href={Routes.FEEDINGS}>
                                                        <MenuItem onClick={handleClose}>Refrigerios</MenuItem>
                                                    </Link>
                                                    <Link href={Routes.FEEDINGPLACES}>
                                                        <MenuItem onClick={handleClose}>Huecas</MenuItem>
                                                    </Link>
                                                    {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                                    {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            {/*Fin*/}

                            {/*Inicio*/}
                            <Button
                                ref={anchorRefM3}
                                aria-controls={openM3 ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggleM3}
                            >
                                <Typography className={classes.titleNavs}>Tareas</Typography>
                            </Button>
                            <Popper open={openM3} anchorEl={anchorRefM3.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>

                                                <MenuList autoFocusItem={openM3} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <Link href={Routes.ACTIVITIES}>
                                                        <MenuItem onClick={handleClose}>Actividades</MenuItem>
                                                    </Link>
                                                    <Link href={Routes.RESOURCES}>
                                                        <MenuItem onClick={handleClose}>Recursos</MenuItem>
                                                    </Link>
                                                    {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                                    {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            {/*Fin*/}

                            {/*Inicio*/}
                            <Button
                                ref={anchorRefM4}
                                aria-controls={openM4 ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggleM4}
                            >
                                <Typography className={classes.titleNavs}>Logística</Typography>
                            </Button>
                            <Popper open={openM4} anchorEl={anchorRefM4.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>

                                                <MenuList autoFocusItem={openM4} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <Link href={Routes.CALENDARS}>
                                                        <MenuItem onClick={handleClose}>Calendarios</MenuItem>
                                                    </Link>
                                                    <Link href={Routes.TRANSPORTS}>
                                                        <MenuItem onClick={handleClose}>Transportes</MenuItem>
                                                    </Link>
                                                    <Link href={Routes.LODGINGS}>
                                                        <MenuItem onClick={handleClose}>Hospedajes</MenuItem>
                                                    </Link>
                                                    <Link href={Routes.PLACES}>
                                                        <MenuItem onClick={handleClose}>Lugares</MenuItem>
                                                    </Link>
                                                    {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                                    {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            {/*Fin*/}

                            {/*Inicio*/}
                            <Button
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <Typography className={classes.titleNavs}>Personal</Typography>
                            </Button>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    {/*<Link href={Routes.USERS}>*/}
                                                    {/*    <MenuItem onClick={handleClose}>Coordinadores</MenuItem>*/}
                                                    {/*</Link>*/}
                                                    {renderUserSection()}
                                                    <Link href={Routes.ARTISTS}>
                                                        <MenuItem onClick={handleClose}>Artistas</MenuItem>
                                                    </Link>
                                                    {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                                    {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            {/*Fin*/}


                          {/*  <Link href={Routes.ABOUT}>
                                <MenuItem onClick={handleClose}>About</MenuItem>
                            </Link>*/}
                            {/*{mainMenuItems.map((item) => (
                                <div>

                                    <Link href={item.to} key={item.text}>
                                        <MenuItem>{item.text}</MenuItem>
                                    </Link>

                                </div>
                            ))}*/}

                        </div>

                        <div className={classes.grow} />

                     {/*   <SearchBar />*/}

                        <IconsMenu />
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            {renderDrawerMenu}
            <Toolbar />
        </div>
    );
}