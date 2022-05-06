import { createTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles';

import { Colors } from '../theme'

export const useStyles = makeStyles((theme) => ({
    container: {
        background:' rgba(3, 152, 158, 0.04)',
        // background: "#f5f5f5",
        height: 'calc(100vh + 100px)',

        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
    },
    container2: {
        background:' rgba(3, 152, 158, 0.04)',
        // background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
  
}))



export const theme = createTheme({
    palette: {
        primary: { main: Colors.primary }, // Purple and green play nicely together.
        secondary: { main: Colors.secondary  }, // This is just green.A700 as hex.
    },
    overrides: {
        MuiTextField:{
            root:{
                width: '70%',
                marginTop: "10px"
            }
        },
        MuiButton:{
            root:{
                width: "70%", 
                marginTop: 10,
                padding: 8 
            }
        },
        MuiOutlinedInput:{
            root:{
                "& $notchedOutline": {
                  },
                  "&:hover $notchedOutline": {
                    borderColor: Colors.primary
                  },
                  "&$focused $notchedOutline": {
                    borderColor: Colors.primary,
                    borderWidth: "1.5px"
                  }
            },  
            adornedStart:{
                paddingLeft:4,
            },

            input:{
                padding: "9px 10px"
            },
          
          
        },
        MuiInputBase:{
            input:{
                fontSize: 12
            }, 
        },

        MuiPhoneNumber:{
            flagButton:{
                marginTop: 0
            }
        }
        

    },
});


