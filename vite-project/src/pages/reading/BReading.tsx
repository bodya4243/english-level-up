import {Box, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.ts";
import {useEffect, useState} from "react";

interface fetchedData {
    "id": number,
    "title": string,
    "description": string,
    "content": string,
    "level": string
}

export default function ReadingPage() {
    const [readingData, setReadingData] = useState<fetchedData[]>([]);

    const fetchData = async () => {
        const response = await axiosInstance.get('/reading?level=B1');
        const fetchedResponse: fetchedData[] = response.data;
        setReadingData(fetchedResponse);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Box
            sx={{
                marginTop: '100px',
                marginBottom: '100px',
            }}>
            <Stack
                direction="column"
                spacing={2}
                justifyContent="space-between"
            >
                {readingData?.map((item, index) => (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        gap: '20px',
                        padding: '20px',
                        backgroundColor: 'white',
                        maxWidth: '40%',
                        borderRadius: '10px',
                    }}
                         key={index}
                    >
                        <RouterLink
                            to="/reading-content"
                            state={{ props: item.content }}
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
