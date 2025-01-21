import {Box, Container, Typography, TextField} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {ChangeEvent, useState} from "react";
import Button from "@mui/material/Button";
import axios from 'axios';

const Translating: React.FC = () => {
    const boxHeight = `calc(300px + 20px)`;
    const [language, setLanguage] = useState<string>('Ua');
    const [ukrText, setUkrText] = useState<string>('');
    const [recommendation, setRecommendation] = useState<string>('');
    const getTextPrompt: string = `Generate a simple text in ${language} language at A1 level. The text should contain 5-6 sentences`
    const [getAnswerPrompt, setGetAnswerPrompt] = useState<string>(
        'Provide grammar recommendations for improvement in 5 sentences or fewer'
    );    const [requestMessage, setRequestMessage] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRequestMessage(event.target.value);
    };

    const fetchText = async () => {
        const response = await axios.get(
            `http://localhost:8080/api/chat`,
            {
                params: {
                    prompt: getTextPrompt,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );

        setUkrText(response.data)
    }

    const fetchRecommendation = async () => {
        if (language === 'En') {
            setGetAnswerPrompt('analyze whether the translation adheres to the essence of the text and provide recommendations');
        }

        const response = await axios.get("http://localhost:8080/api/chat", {
            params: {
                prompt: getAnswerPrompt,
                initialText: ukrText,
                requestMessage: requestMessage,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        setRecommendation(response.data);
    };

    function changeLanguageStr() {
        setLanguage(language === 'Ua' ? 'En' : 'Ua')
    }

    return (
        <Container
            maxWidth="lg"
            sx={{
                backgroundColor: "white",
                padding: "30px",
                maxHeight: "800px",
                borderRadius: "10px",
            }}
        >
            <Grid container spacing={2}>
                <Grid size={6}>
                    <Box sx={{
                        marginBottom: "20px",
                    }}>
                        <Button
                            onClick={() => changeLanguageStr()}
                            sx={{textAlign: 'center'}}
                        >
                            {language} to {language === 'Ua' ? 'En' : 'Ua'}
                        </Button>
                        <Button onClick={fetchText} sx={{textAlign: 'center'}}>
                            Get Text
                        </Button>
                    </Box>

                    <Box sx={{
                        marginBottom: "20px",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                        borderRadius: "20px",
                        padding: "10px",
                    }}>
                        <Typography sx={{textAlign: 'center'}}>
                            {language}
                        </Typography>
                        <Typography>
                            {ukrText}
                        </Typography>
                    </Box>
                    <Typography sx={{textAlign: 'center'}}>
                        {language === 'Ua' ? 'En' : 'Ua'}
                    </Typography>

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
                </Grid>

                <Grid size={6}>
                    <Box
                        sx={{
                            borderRadius: "20px",
                            marginBottom: "20px",
                            padding: "20px",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                            overflowY: "auto",
                            maxHeight: boxHeight,
                            height: boxHeight,
                        }}
                    >
                        <Typography>
                            {recommendation}
                        </Typography>
                    </Box>
                    <Button onClick={fetchRecommendation}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Translating;
