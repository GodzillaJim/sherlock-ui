import React, {ReactNode} from 'react';

interface AppContainerProps {
    children: ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};

export default AppContainer;
