
import { AppBar, MenuItem, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { SettingProvider } from "../SetingsContext";
import { GameProvider } from "../TriviaContext";
import './Layout.css'




export default function Layout() {

    const currLocation = useLocation()
    console.log('Layout:', currLocation)

    let activeStyle = {
        textDecoration: "underline",
      };

    return(
        <>
        <Box>
            <AppBar position="static">
                <Toolbar variant="dense">
                <MenuItem>
                    <NavLink to='/' className='nav-link'
                        style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                      }
                    >
                        Home
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='setting/'
                            className='nav-link'
                            style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                      }>
                        setting
                    </NavLink>
                </MenuItem>

                
                </Toolbar>
            </AppBar>
            
            <SettingProvider>
            <GameProvider>
            <Outlet />
            </GameProvider>
            </SettingProvider>
        </Box>
        </>
    )
}



