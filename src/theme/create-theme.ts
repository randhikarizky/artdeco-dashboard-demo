import type {Theme} from '@mui/material/styles';

import {overridesTheme} from './overrides-theme';
import {shadows, typography, colorSchemes, customShadows, customizedComponents} from './core';
import {extendTheme} from "@mui/material";
import {ThemeSettings} from "@/theme/settings/SettingsProvider";

//$120 theme stuff
function shouldSkipGeneratingVar(keys: string[], value: string | number): boolean {
    const skipGlobalKeys = [
        'mixins',
        'overlays',
        'direction',
        'breakpoints',
        'cssVarPrefix',
        'unstable_sxConfig',
        'typography',
        // 'transitions',
    ];

    const skipPaletteKeys: {
        [key: string]: string[];
    } = {
        global: ['tonalOffset', 'dividerChannel', 'contrastThreshold'],
        grey: ['A100', 'A200', 'A400', 'A700'],
        text: ['icon'],
    };

    const isPaletteKey = keys[0] === 'palette';

    if (isPaletteKey) {
        const paletteType = keys[1];
        const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global;

        return keys.some((key) => skipKeys?.includes(key));
    }

    return keys.some((key) => skipGlobalKeys?.includes(key));
}

export function createTheme(
    setting: ThemeSettings
): Theme {
    const initialTheme = {
        colorSchemes,
        shadows: shadows(setting.colorScheme),
        customShadows: customShadows(setting.colorScheme),
        shape: {borderRadius: 14},
        components: customizedComponents,
        typography,
        cssVarPrefix: '',
        shouldSkipGeneratingVar,
    };

    const theme = extendTheme(initialTheme, overridesTheme);

    return theme;
}
