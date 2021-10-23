import {createMuiTheme} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
    typography: {
        // Tell Material-UI what's the font-size on the html element is.
        // htmlFontSize: 16,
        fontFamily: 'Neuton',

        h3: {
            marginBottom: "12px",
        },
    },
    palette: {
        type: "light",
        primary: {
            //main: "#0088ff",
            main: "#0d47a1",
            //main: "#FF7D23"
        },
        secondary: {
            //main: "#19857b",
            main: "#f44336",
            //main: "#FAC800"
        },
        error: {
            main: red.A400,
            // o también main: red[500];
        },
        background: {
            //default: "#f9f9f9",
            default: "#F0E68CFF",
        },
    },
    overrides: {
        MuiTextField: {
            root: {
                // backgroundColor: "#ccc",
                width: "100%",
            },
        },
    },
    props: {
        MuiTextField: {
            variant: "outlined",
        },
    },
});

export default theme;