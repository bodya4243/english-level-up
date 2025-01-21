import {Box, Toolbar} from "@mui/material";
import DropdownMenu from "./DropdownMenu.tsx";

function Navbar () {
    return (
        <Box>
            <Toolbar sx={{display: "flex",
                flexDirection: "column",
                backgroundColor: '#C2ED91',
                height: '100px',
                justifyContent: "center"
            }}>
                <DropdownMenu/>
            </Toolbar>
        </Box>
    )
}

export default Navbar