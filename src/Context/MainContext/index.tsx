import React, {useContext, useEffect} from "react";
import { User, useCurrentUserQuery } from "../../generated"

export type MainContext = {
    layout: {
        drawerIsOpen: boolean;
        setDrawerIsOpen: CallableFunction;
        activeItems: number[];
        setActiveItems: (items: number[]) => void;
    };
    user: User | null;
};
type ContextProps = {
    children: React.ReactNode
}
export const Context = ({children}: ContextProps) => {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [activeItems, setActiveItems] = React.useState<number[]>([]);
    const [user, setUser] = React.useState<User | null>(null);

    const {data, loading, error} = useCurrentUserQuery();

    useEffect(() => {
        if (data && data.me) {
            setUser(data.me as User)
        }
    }, [data, loading, error]);

    return <MainContext.Provider value={{
        layout: {
            drawerIsOpen: openDrawer,
            setDrawerIsOpen: setOpenDrawer,
            activeItems,
            setActiveItems: (items: number[]) => {
                setActiveItems(items);
            },
        },
        user,
    }}>{children}</MainContext.Provider>
}
export const MainContext = React.createContext<MainContext | null>(null);
export const useMainContext = () => useContext(MainContext)