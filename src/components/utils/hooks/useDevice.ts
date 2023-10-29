import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { DeviceType } from "../types";


export const useDevice=()=>{
    const theme=useTheme()

    const [deviceType,setDeviceType]=useState({
        isMobile:false,
        isDesktop:false,
        isTablet:false
    })
    const desktopMatch=useMediaQuery(theme.breakpoints.up('lg'))
    const mobileMatch=useMediaQuery( theme.breakpoints.down('sm'))
   
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    useEffect(() => {
      // This code will run whenever windowWidth changes
    
        
    
        if(desktopMatch) { 

            setDeviceType({
                isMobile:false,
                isTablet:false,
                isDesktop:true
                
            })
            
        }
        else if(mobileMatch)
       {
         setDeviceType({
            isTablet:false,
            isDesktop:false,
            isMobile:true
         })
       }

       else
       {
         setDeviceType({
            isDesktop:false,
            isMobile:false,
            isTablet:true
       })
       }
      
    }, [windowWidth]);


  return deviceType
}