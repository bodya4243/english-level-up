import React, {createContext, ReactNode, useContext, useState} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
                                                                        children,
                                                                    }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthentication = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuthentication must be used within an AuthContextProvider"
        );
    }
    return context;
};
