import React, {useEffect, useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {Box, Typography} from "@mui/material";
import axiosInstance from "../api/axiosInstance.ts";
import {useLocation} from "react-router-dom";
import {UpdateEngLevel} from "../utils/EngLevelCalc.tsx";

interface QuizQuestion {
    question: string;
    options: string[];
    correct_answer: number;
}
interface QuizData {
    title: string;
    questions: QuizQuestion[];
}

export default function Quiz() {
    const [quiz, setQuiz] = useState<QuizData | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [helperText, setHelperText] = useState<string>('choose wisely');
    const [mark, setMark] = useState<number>(0);
    const location = useLocation();
    const requestParam: string = location.state.props;

    const fetchData = async () => {
        const response = await axiosInstance.get<QuizData>(`/quiz?focus=${requestParam}`);
        const fetchedQuiz = response.data;
        setQuiz(fetchedQuiz);
        setAnswers(new Array(fetchedQuiz.questions.length).fill(-1));
    };

    useEffect(() => {
        fetchData();
    }, [requestParam]);

    const handleRadioChange = (questionIndex: number, optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!quiz) return;

        quiz.questions.map((question: QuizQuestion, index) => {
            if (question.correct_answer === answers[index]) {
                setHelperText('You got it!');
            } else if (question.correct_answer !== answers[index]) {
                setHelperText('Sorry, wrong answer!');
            } else {
                setHelperText('Please select an option.');
            }
        });

        const total: number = quiz.questions.reduce(
            (total, q, i) => total + (q.correct_answer === answers[i] ? 1 : 0),
            0
        );

        const avg: number = total / quiz.questions.length;
        setMark(total);


        if (location.state.levelChange) {
            UpdateEngLevel(avg);
        }
    };

    return (
        <Box sx={{
            padding: '20px',
            borderRadius: '20px',
        }}>
            {quiz ? (
                <>
                    <form onSubmit={handleSubmit}>
                        {quiz.questions.map((question, index) => (
                            <FormControl
                                key={index}
                                sx={{
                                    display: 'flex',
                                    m: 3,
                                    backgroundColor: '#C2ED91FF',
                                    padding: '10px',
                                    borderRadius: '10px',
                                }}
                                variant="standard"
                            >
                                <FormLabel id={`question-${index}`}>{`${index + 1}. ${question.question}`}</FormLabel>
                                <RadioGroup
                                    aria-labelledby={`question-${index}`}
                                    name={`quiz-${index}`}
                                    value={answers[index] !== -1 ? answers[index].toString() : ''}
                                    onChange={(event) =>
                                        handleRadioChange(index, parseInt(event.target.value, 10))
                                    }
                                >
                                    {question.options.map((option, optionIndex) => (
                                        <FormControlLabel
                                            key={optionIndex}
                                            value={optionIndex.toString()}
                                            control={<Radio />}
                                            label={
                                                <Typography noWrap>
                                                    {option.length > 20 ? `${option.slice(0, 50)}` : option}
                                                </Typography>
                                            }
                                        />
                                    ))}
                                </RadioGroup>
                                <FormHelperText>{helperText}</FormHelperText>
                            </FormControl>
                        ))}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '20px',
                                padding: '20px',
                            }}
                        >
                            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                                Submit
                            </Button>

                            <Typography sx={{ fontWeight: 'bold' }}>
                                {mark}/{quiz.questions.length}
                            </Typography>
                        </Box>
                    </form>
                </>
            ) : (
                <p>Loading quiz...</p>
            )}
        </Box>
    );
}
