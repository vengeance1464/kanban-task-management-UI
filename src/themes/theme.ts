import { createMuiTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import PlusJakartaSans from "../assets/fonts/PlusJakartaSans-Regular.ttf"
import { Color, PaletteMode } from "@mui/material";
import { paletteLight } from "./paletteLight";
import { paletteDark } from "./paletteDark";


declare module '@mui/material/styles/createPalette'{
  export interface Palette{
  common: CommonColors;
  mode: PaletteMode;
  contrastThreshold: number;
  tonalOffset: PaletteTonalOffset;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  grey: Color;
  modalColor:Record<string,string>
  buttonColor:Record<string,string>
  otherColor:Record<string,string>
  }

  export interface PaletteOptions{
    // common: Partial<CommonColors>;
    // mode: PaletteMode;
    // contrastThreshold: number;
    // tonalOffset: PaletteTonalOffset;
    // primary: PaletteColorOptions;
    // secondary: PaletteColorOptions;
    // error: PaletteColorOptions;
    // warning: PaletteColorOptions;
    // info: PaletteColorOptions;
    // success: PaletteColorOptions;
    // grey: Partial<Color>;
    modalColor:Record<string,string>
  buttonColor:Record<string,string>
  otherColor:Record<string,string>


  }
}


const plusJakartaSans={
  fontFamily:'PlusJakartaSans',
  src:`local('PlusJakartaSans-Regular') url(${PlusJakartaSans}) format('truetype);`
}

export const getTheme=(themeMode:PaletteMode)=>{

  console.log("themeMode",themeMode)

const theme = createMuiTheme({
  palette: themeMode==='light'?{...paletteLight, common: {},
  mode: 'light' }:{...paletteDark, common: {},
  mode: 'dark' },
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,   // custom value
      md: 1024,  // custom value
      lg: 1440,  // custom value
      xl: 1920,
    },
  },
});

return theme
}


