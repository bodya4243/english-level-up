import {Box, Container, TextField, Typography} from "@mui/material";
import AudioPlayer from "../../layouts/AuidioPlayer.tsx";
import {Link as RouterLink, useLocation} from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.ts";
import {ChangeEvent, useState} from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function ListeningContent() {
    const location = useLocation();
    const link = location.state.props;
    const gptPrompt: string = 'Provide recommendations for grammar improvement in 5 sentences or fewer';
    const sentenceQuestion: string = 'What do you do every day?';
    const [chatAnswer, setChatAnswer] = useState('');
    const [requestMessage, setRequestMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchAnswer = async () => {
        try {
            setIsLoading(true);

            const response = await axiosInstance.get('/chat', {
                params: {
                    prompt: gptPrompt,
                    initialText: sentenceQuestion,
                    requestMessage: requestMessage
                }
            });
            setChatAnswer(response.data);
        } catch (error) {
            console.error('Error fetching chat answer:', error);
        } finally {
            setIsLoading(false)
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRequestMessage(event.target.value);
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    marginBottom: '2%',
                }}>
                <AudioPlayer link={link}/>
            </Box>

            <Box sx={{
                marginBottom: '5%',
                width: '20%',
                textAlign: 'center',
            }}>
                <RouterLink
                    to="/quiz"
                    state={{props: 'listening'}}
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
                        listening test
                    </Typography>
                </RouterLink>
            </Box>

            <Box sx={{
                marginBottom: '3%'
            }}>
                <TextField
                    label="Enter Text"
                    multiline
                    rows={7}
                    variant="outlined"
                    fullWidth
                    value={requestMessage}
                    onChange={handleInputChange}
                    sx={{
                        wordWrap: "break-word",
                        borderRadius: "20px",
                    }}
                />
            </Box>
            <Button sx={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '10px',
                marginBottom: '3%'
            }} onClick={fetchAnswer}>
                Submit
            </Button>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
                height: '200px',
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                {isLoading ? (
                        <CircularProgress color="success" />
                    ) : chatAnswer}
            </Box>
        </Container>
    );
}
