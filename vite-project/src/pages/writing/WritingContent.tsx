import {Box, Container, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import axiosInstance from "../../api/axiosInstance.ts";
import {useLocation} from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function ReadingContent() {
    const location = useLocation();
    const sentenceQuestion = location.state.title
    const [requestMessage, setRequestMessage] = useState<string>('');
    const gptPrompt: string = 'Provide recommendations for grammar improvement in 5 sentences or fewer';
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRequestMessage(event.target.value);
    };

    const [chatAnswer, setChatAnswer] = useState('');

    const fetchAnswer = async () => {
        try {
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
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box>
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
            <Button onClick={fetchAnswer}>
                submit
            </Button>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
                height: '300px',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {isLoading ? (
                    <CircularProgress color="success" />
                ) : chatAnswer}
            </Box>
        </Container>
    );
}
