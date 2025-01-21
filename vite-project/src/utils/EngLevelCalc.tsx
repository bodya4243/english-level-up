import axiosInstance from "../api/axiosInstance.ts";
import {Levels} from "./Level.ts";

const determineLevel = (avg: number): Levels => {
    if (avg < 0.3) return Levels.A1;
    if (avg < 0.5) return Levels.A2;
    if (avg === 0.5) return Levels.B1;
    if (avg === 0.6) return Levels.B2;
    if (avg < 0.8) return Levels.C1;
    if (avg === 1.0) return Levels.C2;
    return Levels.A1;
};

const submitLevel = async (engLevel: Levels) => {
    await axiosInstance.put(`/level?level=${engLevel}`);
};

export const UpdateEngLevel = async (avg: number) => {
    const engLevel = determineLevel(avg);
    submitLevel(engLevel);
};
