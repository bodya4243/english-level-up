import {Link as RouterLink} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/material";

export default function BListening() {
    const link = 'src/assets/B-listening.wav'

    return (
        <Box sx={{marginTop: "100px", marginBottom: "100px"}}>
            <Stack direction="column" spacing={2} justifyContent="space-between">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        padding: "20px",
                        backgroundColor: "white",
                        maxWidth: "40%",
                        borderRadius: "10px",
                    }}
                >
                    <RouterLink
                        to="/listening-content"
                        state={{props: {link}}}
                    >
                        name of the topic
                    </RouterLink>

                    <Typography>description</Typography>
                </Box>
            </Stack>
        </Box>
    );
}
