import { createTheme } from '@mui/material/styles';

const StoreTheme = createTheme({
    palette:{
        primary:{
            // main: '#2c5515'
            main: '#134E5E'
            // main: '#57bd43'
        },
        secondary: {
            // main: '#72D35F'
            main: '#71b280'
        },
        seed:{
            main: '#E6AA68',
            contrastText: '#fff',
        },
        pots:{
            main:'#CA3C25',
            contrastText: '#fff',
        },
        can:{
            main: '#4999c7',
            contrastText: '#fff',
        },
        pageBack:{
            main:'#f9fafb',
            // main:'#f5fff2',
            contrastText:'#9da4b4'
        },
        footBack:{
            main:'#eef2f7',
            contrastText:'#9da4b4'
        },
        cardBack:{
            main:'#fff',
            contrastText:'#9da4b4'
        },
    },
    typography:{
        fontFamily: ['Open Sans', 'Bebas Neue', 'Orelega One', 'Inter','Poppins'],
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600
    }
});

export default StoreTheme;

// https://coolors.co/palette/234111-72d35f-fffbbd-e6aa68-ca3c25
