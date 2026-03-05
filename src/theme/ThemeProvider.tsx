'use client';

import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';

import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider as CssVarsProvider } from '@mui/material/styles';

import {createTheme} from './create-theme';
import {useSettingsContext} from "@/theme/settings/context/useSettingsContext";
import {defaultSetting} from "@/theme/types";

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export function ThemeProvider({children}: Props) {
    const setting = useSettingsContext()
    const theme = createTheme(setting)

    return (
        <CssVarsProvider
            theme={theme}
            defaultMode={defaultSetting.colorScheme}
            modeStorageKey={"theme-mode"}
        >
            <CssBaseline/>
            {children}
        </CssVarsProvider>
    );
}
