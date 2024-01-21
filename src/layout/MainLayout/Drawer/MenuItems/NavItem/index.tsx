import React from "react";
import {MainContext} from "../../../../../Context/MainContext";
import {
    Avatar,
    Chip,
    ChipProps,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {useRouter} from "next/router";

export type NavItemProps = {
    item: {
        id: number;
        icon?: JSX.Element;
        disabled?: boolean;
        chip?: ChipProps;
        title: string;
        children?: NavItemProps["item"][];
        type: "group" | "item";
        url?: string;
    };
    level: number;
};

const NavItem = ({item, level}: NavItemProps) => {
    const navigate = useRouter().push;
    const mainContext = React.useContext(MainContext);
    const theme = useTheme();
    const handleItemClick = () => {
        if (mainContext) {
            mainContext.layout.setActiveItems([item.id]);
        }
        if (item.url) {
            navigate(item.url);
        }
    };

    const isSelected = React.useMemo(() => {
        if (!mainContext) return false;
        return Boolean(mainContext.layout.activeItems.find((id) => id === item.id));
    }, [mainContext]);

    const drawerOpen = mainContext ? mainContext.layout.drawerIsOpen : false;
    const textColor =  theme.palette.grey[600];
    const iconSelectedColor = "primary.main";

    return (
        <ListItemButton
            disabled={item.disabled}
            LinkComponent="a"
            href={item.url || "#"}
            onClick={handleItemClick}
            sx={{
                zIndex: 120,
                pl: drawerOpen ? `${level * 28}px` : 1.5,
                py: !drawerOpen && level === 1 ? 1.25 : 1,
                ...(drawerOpen && {
                    "&:hover": {
                        bgcolor: "primary.lighter",
                    },
                    "&.Mui-selected": {
                        bgcolor: "primary.lighter",
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        color: iconSelectedColor,
                        "&:hover": {
                            color: iconSelectedColor,
                            bgcolor: "primary.lighter",
                        },
                    },
                }),
                ...(!drawerOpen && {
                    "&:hover": {
                        bgcolor: "transparent",
                    },
                    "&.Mui-selected": {
                        "&:hover": {
                            bgcolor: "transparent",
                        },
                        bgcolor: "transparent",
                    },
                }),
            }}
        >
            {item.icon && (
                <ListItemIcon
                    sx={{
                        minWidth: 28,
                        color: isSelected ? iconSelectedColor : textColor,
                        ...(!drawerOpen && {
                            borderRadius: 1.5,
                            width: 36,
                            height: 36,
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": {
                                bgcolor: "secondary.lighter",
                            },
                        }),
                        ...(!drawerOpen &&
                            isSelected && {
                                bgcolor: "primary.lighter",
                                "&:hover": {
                                    bgcolor: "primary.lighter",
                                },
                            }),
                    }}
                >
                    {item.icon}
                </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
                <ListItemText
                    primary={
                        <Typography
                            variant="h6"
                            sx={{color: isSelected ? iconSelectedColor : textColor}}
                        >
                            {item.title}
                        </Typography>
                    }
                />
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

export default NavItem;
