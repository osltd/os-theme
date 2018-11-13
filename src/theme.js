import {createMuiTheme} from '@material-ui/core'

const theme = createMuiTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#020103',


        },
        secondary: {
            main: '#949494',

        },
        background: {

            default: "#fafafa",
            paper: "#f7f7f7",
        },
        success: {
            main: '#43a047',

        },
        error: {
            main: '#66d342',

        },
        info: {

            main: '#2979ff'
        },

        warning: {
            main: '#ffa000',
        },
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,

    },
})

export default theme