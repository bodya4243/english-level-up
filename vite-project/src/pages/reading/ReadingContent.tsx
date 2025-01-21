import {Box, Container, Typography} from "@mui/material";
import {Link as RouterLink, useLocation} from "react-router-dom";

export default function ReadingContent() {
    const location = useLocation();

    return (
        <Container maxWidth="md">
            <Box>
                <Typography>
                    {location.state.props}
                </Typography>
            </Box>
            <Box>
                <RouterLink
                    to="/quiz"
                    state={{ props: 'reading' }}
                >
                    reading test
                </RouterLink>
            </Box>
        </Container>
    );
}
