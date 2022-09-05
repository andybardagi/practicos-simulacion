import React, { useContext, useState } from 'react';

type StateType = {
    sidebarDisplay: boolean;
};
const DEFAULT_STATE: StateType = {
    sidebarDisplay: true,
};

const NavigationContext = React.createContext(DEFAULT_STATE);
const NavigationUpdateContext = React.createContext(() => {});

export function useNavigationContext() {
    return useContext(NavigationContext);
}

export function useNavigationContextUpdate() {
    return useContext(NavigationUpdateContext);
}

export function NavigationProvider({
    children,
}: {
    children: React.ReactNode | React.ReactNode[];
}) {
    const [navigationContext, setNavigationContext] = useState(DEFAULT_STATE as StateType);
    const toggleSidebarDisplay = () => {
        console.log(navigationContext);
        setNavigationContext((prev) => ({ ...prev, sidebarDisplay: !prev.sidebarDisplay }));
    };
    return (
        <NavigationContext.Provider value={navigationContext}>
            <NavigationUpdateContext.Provider value={toggleSidebarDisplay}>
                {children}
            </NavigationUpdateContext.Provider>
        </NavigationContext.Provider>
    );
}
