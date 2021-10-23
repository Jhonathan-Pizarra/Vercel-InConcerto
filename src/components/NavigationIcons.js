/**
 * Created by Chalo
 */
import React, {useRef, useState} from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {useAuth} from "@/lib/auth";
import Link from "next/link";
import Routes from "@/constants/routes";
import {Button, ClickAwayListener, Grow, MenuList, Paper, Popper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
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
    colors: {
        color: "white",
        textTransform: "capitalize",
    }
}));

const NavigationIcons = () => {

    const { logout, user } = useAuth();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const anchorRefMobile = useRef(null);

    if(!user) return <Link href={Routes.LOGIN}><MenuItem>Iniciar sesión</MenuItem></Link>

    const ward = (user.id === undefined) ? user.user.id: user.id;
    const ward2 = (user.name === undefined) ? user.user.name: user.name;
    console.log("Valor?", ward)

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {

        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleLogout = async () => {
        logout();
        //handleClose();
    };

    const renderDesktop = (
        <div className={classes.sectionDesktop}>

            {user ? (
                <>
                    <Button
                        className={classes.colors}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        //onClick={handleMenuAccountOpen}
                    >
                        <AccountCircle style={{ marginRight: 5 }} />
                        {ward2}
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
                                            <Link href={`${Routes.USERS}/${ward}`}>
                                                <MenuItem onClick={handleClose}>
                                                    Perfil
                                                </MenuItem>
                                            </Link>
                                            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                                            {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                            {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </>
            ) : (
                <Link href={Routes.LOGIN}>
                    <MenuItem>Iniciar Sesión</MenuItem>
                    {/*<Button variant="contained" color="secondary">Iniciar Sesión</Button>*/}
                </Link>
            )}
        </div>
    );

    const renderMobile = (
        <div className={classes.sectionMobile}>
            {user ? (
                <>
                    <Button
                        className={classes.colors}
                        ref={anchorRefMobile}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        //onClick={handleMenuAccountOpen}
                    >
                        <AccountCircle style={{ marginRight: 5 }} />
                        {ward2}
                    </Button>
                    <Popper open={open} anchorEl={anchorRefMobile.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            <Link href={`${Routes.USERS}/${ward}`}>
                                                <MenuItem onClick={handleClose}>
                                                    Perfil
                                                </MenuItem>
                                            </Link>
                                            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                                            {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                            {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </>
            ) : (
                <Link href={Routes.LOGIN}>
                    <MenuItem>Iniciar sesión</MenuItem>
                    {/*<Button variant="contained" color="secondary">Iniciar Sesión</Button>*/}
                </Link>
            )}
        </div>
    );

    return (
        <div>
            {renderDesktop}
            {renderMobile}
        </div>
    );
};

export default NavigationIcons;