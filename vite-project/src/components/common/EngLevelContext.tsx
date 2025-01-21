import React, { createContext, useState, useContext, ReactNode } from "react";

export enum Levels {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1",
    B2 = "B2",
    C1 = "C1",
    C2 = "C2",
}

interface EngLevelContextType {
    engLevel: Levels;
    setEngLevel: (level: Levels) => void;
}

const EngLevelContext = createContext<EngLevelContextType | undefined>(
    undefined
);

export const EngLevelProvider: React.FC<{ children: ReactNode }> = ({
                                                                        children,
                                                                    }) => {
    const [engLevel, setEngLevel] = useState<Levels>(Levels.A1);

    return (
        <EngLevelContext.Provider value={{ engLevel, setEngLevel }}>
            {children}
        </EngLevelContext.Provider>
    );
};

export const useEngLevel = (): EngLevelContextType => {
    const context = useContext(EngLevelContext);
    if (!context) {
        throw new Error(
            "useEngLevel must be used within an EngLevelProvider"
        );
    }
    return context;
};
