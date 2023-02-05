import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {AppBar, IconButton, Theme, Toolbar} from "@mui/material";
import HeaderContent from "./HeaderContent";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        height: 56,
        borderBottom: '1px',
        borderColor: theme.palette.divider
    }
}))

type HeaderProps = {
    open: boolean;
    handleDrawerToggle: () => void;
};

const Header = ({open, handleDrawerToggle}: HeaderProps) => {
    const classes = useStyles();
    const isServerSide = typeof window === undefined

    const iconBackColor = "grey.100";
    const iconBackColorOpen = "grey.200";

    const mainHeader = (
        <Toolbar>
            <IconButton
                disableRipple
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                color="secondary"
                sx={{
                    color: "text.primary",
                    bgColor: open ? iconBackColorOpen : iconBackColor,
                    ml: {xs: 0, lg: -2},
                    minHeight: 40,
                    minWidth: 40,
                }}
            >
                {!open ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
            </IconButton>
            <HeaderContent/>
        </Toolbar>
    );

    return (
        <>
            {!isServerSide && <AppBar
                position="fixed"
                color="primary"
                elevation={0}
                className={classes.appBar}

            >
                {mainHeader}
            </AppBar>}
        </>
    );
};

export default Header;
