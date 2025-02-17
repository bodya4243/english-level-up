import { useState, useRef } from "react";
import { Box, IconButton, Slider } from "@mui/material";
import { PlayArrow, Pause, VolumeUp } from "@mui/icons-material";
import Divider from "@mui/material/Divider";

interface PropsType {
    link: string;
}

function AudioPlayer ( {link}:PropsType ) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [progress, setProgress] = useState(0);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        const newVolume = newValue as number;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    };


    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(
                (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0
            );
        }
    };

    const handleSeek = (_: Event, newValue: number | number[]) => {
        if (audioRef.current) {
            const newProgress = newValue as number;
            audioRef.current.currentTime =
                (newProgress / 100) * audioRef.current.duration;
            setProgress(newProgress);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                padding: '20px',
                borderRadius: '50px',
                backgroundColor: "#f5f5f5",
            }}
        >
            <audio
                ref={audioRef}
                src={link}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            ></audio>
            <Box display="flex" alignItems="center" gap={1}>
                <IconButton onClick={handlePlayPause}>
                    {isPlaying ? <Pause/> : <PlayArrow/>}
                </IconButton>
                <Slider
                    value={progress}
                    onChange={handleSeek}
                    aria-labelledby="progress-slider"
                    sx={{ flex: 7 }}
                />
                <Divider orientation="vertical" flexItem sx={{ backgroundColor: "#4A4A4A" }} />
                <VolumeUp />
                <Slider
                    value={volume}
                    onChange={handleVolumeChange}
                    aria-labelledby="volume-slider"
                    sx={{ flex: 1 }}
                />
            </Box>
        </Box>
    );
};

export default AudioPlayer;
