import { useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import {Link as RouterLink, useLocation} from "react-router-dom";
import ListeningContent from "../pages/listening/ListeningContent";

export default function Listening() {
    const location = useLocation();
    const link = location.state.props;
    const [showListeningContent, setShowListeningContent] = useState(false);

    return (
        <>
            {showListeningContent ? (
                <ListeningContent link={link} />
            ) : (
                <Box sx={{ marginTop: "100px", marginBottom: "100px" }}>
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
                            <RouterLink to="/audio-player">name of the topic</RouterLink>
                            <Typography>description</Typography>
                        </Box>
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
                            <Button onClick={() => setShowListeningContent(true)}>
                                name of the topic
                            </Button>
                            <Typography>description</Typography>
                        </Box>
                    </Stack>
                </Box>
            )}
        </>
    );
}
