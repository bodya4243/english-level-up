import {Link as RouterLink} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/material";
import axiosInstance from "../../api/axiosInstance.ts";
import {useEffect, useState} from "react";

interface ResponseData {
    "id": number,
    "title": string,
    "description": string,
    "level": string,
    "filePath": string
}

export default function AListening() {
    const [listeningData, setListeningData] = useState<ResponseData[]>([]);

    const fetchData = async () => {
        const response = await axiosInstance.get('/listening?level=A1');
        setListeningData(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box sx={{marginTop: "100px", marginBottom: "100px"}}>
            <Stack direction="column" spacing={2} justifyContent="space-between">
                {listeningData?.map((item, index) => (
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
                        key={index}
                    >
                        <RouterLink
                            to="/listening-content"
                            state={{props: item.filePath}}
                        >
                            {item.title}
                        </RouterLink>

                        <Typography>
                            {item.description}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
