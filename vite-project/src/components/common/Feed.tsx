import {Box, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

function Feed() {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: '70%',
                    margin: "0 auto",
                    background: "#C2ED91FF",
                    borderRadius: "20px",
                }}
            >
                <Typography
                    sx={{
                        color: "#4A4A4A",
                        padding: '20px',
                        fontWeight: 'bold',
                        fontSize: "2rem",
                    }}
                >
                    Improve your English with fun and engaging exercises. Start your journey now!
                </Typography>
            </Box>

            <Box
                sx={{
                    padding: "20px",
                    flex: 4,
                    display: "flex",
                    background: "linear-gradient(to right, #C2ED91FF, rgba(255, 255, 255, 0))",
                    borderRadius: "90px",
                    alignItems: "center",
                    width: '70%',
                    marginLeft: 'auto',
                    gap: '5%'
                }}
            >
                <RouterLink
                    to="/quiz"
                    state={{props: "start", levelChange: true}}
                    style={{
                        textDecoration: "hover",
                        marginLeft: "-6%"
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
                        What is your English level?
                    </Typography>
                </RouterLink>
                <Typography
                    sx={{
                        color: "#4A4A4A",
                    }}
                >
                    You can set your English level every time you want.
                </Typography>
            </Box>
        </>
    );
}

export default Feed;
