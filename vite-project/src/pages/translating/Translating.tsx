import {Box, Container, Typography, TextField} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {ChangeEvent, useState} from "react";
import Button from "@mui/material/Button";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const Translating: React.FC = () => {
    const boxHeight = `calc(300px + 20px)`;
    const [language, setLanguage] = useState<string>('Ua');
    const [ukrText, setUkrText] = useState<string>('');
    const [recommendation, setRecommendation] = useState<string>('');
    const getTextPrompt: string = `Generate a simple text in ${language} language at A1 level. The text should contain 5-6 sentences`;
    const [getAnswerPrompt, setGetAnswerPrompt] = useState<string>(
        'Provide grammar recommendations for improvement in 5 sentences or fewer'
    );    const [requestMessage, setRequestMessage] = useState<string>('');
    const [isGetText, setIsGetText] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRequestMessage(event.target.value);
    };

    const fetchText = async () => {
        setUkrText('');
        setIsGetText(true);

        try {
            const response = await axios.get<string>(
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

            setUkrText(response.data);
        } catch (error) {
            console.error("Error fetching text:", error);
        } finally {
            setIsGetText(false);
        }
    };

    const fetchRecommendation = async () => {
        setIsSubmit(true);

        try {
            if (language === 'En') {
                setGetAnswerPrompt('analyze whether the translation adheres to the essence of the text and provide recommendations');
            }

            const response = await axios.get<string>("http://localhost:8080/api/chat", {
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
        } catch (error) {
            console.error("Error fetching recommendation:", error);
        }
        finally {
            setIsSubmit(false);
        }
    };

    function changeLanguageStr() {
        setLanguage(language === 'Ua' ? 'En' : 'Ua');
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

                    <Typography sx={{textAlign: 'center'}}>
                        {language}
                    </Typography>
                    <Box sx={{
                        marginBottom: "20px",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                        borderRadius: "20px",
                        padding: "10px",
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: '20px'
                    }}>
                        <Typography>
                            {isGetText? (
                                <CircularProgress color="success" />
                            ) : (
                                ukrText
                            )}
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
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography>
                            {isSubmit ? (
                                <CircularProgress color="success" />
                            ) : (
                                recommendation
                            )}
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
