import { createTheme, ThemeProvider } from "@mui/material/styles";
import PlusJakartaSans from "../assets/fonts/PlusJakartaSans-Regular.ttf"

const plusJakartaSans={
  fontFamily:'PlusJakartaSans',
  src:`local('PlusJakartaSans-Regular') url(${PlusJakartaSans}) format('truetype);`
}
const theme = createTheme({
  palette: {
    primary: {
      main: "#635FC7",
      dark: "#000112",
      light:"#A8A4FF",
      
    },
    info:{
     main:"#E4EBFA",
     light:"#F4F7FD",
      dark:"#2B2C37"
    
    },
    grey:{
      700:"#828FA3"
    },
    secondary: {
      main: "#EA5555",
      dark: "#20212C",
      light:"#FF9898"
    },
    common: {},
    mode: "light",
  },
  components:{
    MuiCssBaseline:{
      styleOverrides:{
        '@font-face':[plusJakartaSans]
      }
    },
    MuiTypography:{
      styleOverrides:{
        root:{
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
        color:'#828FA3',
       
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          '&:hover': {
            backgroundColor: '#A8A4FF',
          },
        }
    }
  },
},
  typography: {
    fontFamily:  [
      'Plus Jakarta Sans',
     // 'cursive',
     // 'PlusJakartaSans'
    ].join(','), // fallback to sans-serif if 'YourFontName' is not available
    h1: {
      fontFamily: 'PlusJakartaSans', // you can set different fonts for different variants too
      fontWeight: 700,
      fontSize: '24px',
      // ... other properties
    },
  },
});


export {theme as lightTheme}