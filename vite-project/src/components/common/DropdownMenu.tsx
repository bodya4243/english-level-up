import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useState} from 'react';
import {Stack} from "@mui/material";
import CustomButton from "../ui/CustomButton.ts";
import {Link as RouterLink} from "react-router-dom";

export default function DropdownMenu() {
    const DEFAULT_MENU_ITEM_KEY = 'Writing';

    const navStrings: string[] = ['Home', 'Writing', 'Reading', 'Grammar', 'Listening', 'Tests', 'Translating'];

    const menuItems: { [key: string]: string[] } = {
        Home: ['/'],
        Writing: ['A-writing', 'B-writing', 'C-writing'],
        Reading: ['A-reading','B-reading','C-reading'],
        Grammar: ['A-grammar','B-grammar','C-grammar'],
        Listening: ['A-listening', 'B-listening','C-listening'],
        Tests: ['start-test', 'grammar-test'],
        Translating: ['translating']
    };

    const [menuItemsKey, setMenuItemsKey] = useState<string>(DEFAULT_MENU_ITEM_KEY);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (
        event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
        key: string
    ) => {
        setMenuItemsKey(key);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Stack direction="row" spacing={8} justifyContent="center">
                {navStrings.map((value) => (
                    value === 'Home' ? (
                        <Button
                            key={value}
                            href="/"
                            sx={CustomButton}
                        >
                            {value}
                        </Button>
                    ) : (
                        <Button
                            key={value}
                            onClick={(event) => handleOpenMenu(event, value)}
                            sx={CustomButton}
                        >
                            {value}
                        </Button>
                    )
                ))}
            </Stack>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {menuItems[menuItemsKey]?.map((item) => (
                    <MenuItem key={item} onClick={handleCloseMenu}>
                        <RouterLink
                            to={item}
                            state={{ props: item.substring(0, item.indexOf('-')) }}
                        >
                            {item}
                        </RouterLink>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
