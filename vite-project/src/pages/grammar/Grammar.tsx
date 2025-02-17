import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.ts";
import {useEffect, useState} from "react";

interface CardContentData {
    title: string,
    description: string,
    content: string;
}

interface fetchedData {
    level: string;
    title: string;
    description: string;
    content: CardContentData;
}

interface propsData {
    link: string;
}

export default function Grammar( props: propsData ) {
    const [cardData, setCardData] = useState<fetchedData[] | null>(null);

    const fetchData = async () => {
        const response = await axiosInstance.get<fetchedData[]>(`${props.link}`);
        const fetchedCard: fetchedData[] = response.data;
        setCardData(fetchedCard);
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: '20px',
                padding: '50px 0',
            }}
        >
            {cardData?.map((card, index) => (
                <Card
                    key={index}
                    sx={{
                        maxWidth: 345,
                        flex: '1 1 calc(33.33% - 40px)',
                        margin: '0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}
                >
                    <CardMedia
                        sx={{ height: 140 }}
                        image={'img.png'}
                        title={card.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {card.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitLineClamp: 2,
                            }}
                        >
                            {card.description}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ marginTop: 'auto' }}>
                        <RouterLink
                            to="/grammar-content"
                            state={{ props: card.content }}
                        >
                            Learn more
                        </RouterLink>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
}
