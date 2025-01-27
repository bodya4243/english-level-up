import {Box, Typography} from "@mui/material";
import axiosInstance from "../../api/axiosInstance.ts";
import {useEffect, useState} from "react";
import {Link as RouterLink} from "react-router-dom";

interface ResponseData {
    id: number;
    level: number;
    title: string;
}

interface propsData {
    link: string;
}

export default function Writing(props: propsData) {
    const [essay, setEssay] = useState<ResponseData[]>([]);

    const fetchData = async () => {
        const response = await axiosInstance.get(props.link);
        setEssay(response.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (

        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    gap: '20px',

                }}>
                {essay?.map((item, index) => (
                    <Box sx={{
                        padding: "20px",
                        flex: 4,
                        display: "flex",
                        width: '30%',
                    }}
                         key={index}
                    >
                        <RouterLink
                            to="/writing-content"
                            state={item.title}
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    color: "#5E8C3A",
                                    padding: '3px',
                                    backgroundColor: "#ffffff",
                                    border: "5px solid transparent",
                                    borderColor: '#9ccf62',
                                    borderRadius: "10px",
                                }}
                            >
                                {item.title}
                            </Typography>
                        </RouterLink>
                    </Box>
                ))}
            </Box>
        </>
    );
}
