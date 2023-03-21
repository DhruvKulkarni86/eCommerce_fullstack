import { createTheme } from '@mui/material/styles';

const StoreTheme = createTheme({
    palette:{
        primary:{
            main: '#002E3D'
            // main: '#57bd43'
        },
        secondary: {
            main: '#72D35F'
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
            main:'#f6f9fc',
            // main:'#f5fff2',
            contrastText:'#9da4b4'
        },
        footBack:{
            main:'#f9fafb',
            contrastText:'#9da4b4'
        },
        buttonBack:{
            main:'#f1f2f2',
            contrastText:'#9da4b4'
        }
    },
    typography:{
        fontFamily: ['Poppins','Open Sans', 'Inter'],
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600
    }
});

export default StoreTheme;

// https://coolors.co/palette/234111-72d35f-fffbbd-e6aa68-ca3c25