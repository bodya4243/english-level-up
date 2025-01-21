import { Box, Container, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

interface GrammarSectionProps {
    title: string;
    description: string;
    content: string;
}

export default function GrammarCardContent() {
    const location = useLocation();

    return (
        <Container maxWidth="md">
            {
                location.state.props.map((item: GrammarSectionProps, index: number) => (
                    <Box key={index} sx={{ margin: 4 }}>
                        <Typography variant="h3" gutterBottom>
                            {item.title}
                        </Typography>

                        <Paper sx={{ padding: 3, marginBottom: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                {item.description}
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                                {item.content}
                            </Typography>
                        </Paper>
                    </Box>
                ))
            }
        </Container>
    );
}
