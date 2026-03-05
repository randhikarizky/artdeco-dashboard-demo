import React from "react";
import type {AlertProps} from '@mui/material/Alert';
import {alertClasses} from '@mui/material/Alert';
import type {Components, CSSObject, Theme} from '@mui/material/styles';

import {stylesMode, varAlpha} from '@/theme/styles';
import Icon from "@/components/Icon";

// ----------------------------------------------------------------------

const COLORS = ['info', 'success', 'warning', 'error'] as const;

type ColorType = (typeof COLORS)[number];

function styleColors(ownerState: AlertProps, styles: (val: ColorType) => CSSObject) {
    return COLORS.reduce((acc, color) => {
        if (ownerState.severity === color) {
            acc = styles(color);
        }
        return acc;
    }, {});
}

// ----------------------------------------------------------------------

const MuiAlert: Components<Theme>['MuiAlert'] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: {
        iconMapping: {
            error: <Icon icon="solar:danger-bold" width={24}/>,
            info: <Icon icon="eva:info-fill" width={24}/>,
            success: <Icon icon="eva:checkmark-circle-2-fill" width={24}/>,
            warning: <Icon icon="eva:alert-triangle-fill" width={24}/>,
        },
    },

    /** **************************************
     * STYLE
     *************************************** */
    styleOverrides: {
        icon: {opacity: 1},
        action: {padding: 0},
        /**
         * @variant standard
         */
        standard: ({ownerState, theme}) => {
            const styled = {
                colors: styleColors(ownerState, (color) => ({
                    color: theme.vars.palette[color].darker,
                    backgroundColor: theme.vars.palette[color].lighter,
                    [stylesMode.dark]: {
                        color: theme.vars.palette[color].lighter,
                        backgroundColor: theme.vars.palette[color].darker,
                    },
                    [`& .${alertClasses.icon}`]: {
                        color: theme.vars.palette[color].main,
                        [stylesMode.dark]: {color: theme.vars.palette[color].light},
                    },
                })),
            };

            return {...styled.colors};
        },
        /**
         * @variant filled
         */
        filled: ({ownerState, theme}) => {
            const styled = {
                colors: styleColors(ownerState, (color) => ({
                    color: theme.vars.palette[color].contrastText,
                })),
            };

            return {...styled.colors};
        },
        /**
         * @variant outlined
         */
        outlined: ({ownerState, theme}) => {
            const styled = {
                colors: styleColors(ownerState, (color) => ({
                    backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.1),
                    color: theme.vars.palette[color].dark,
                    border: `solid 1px ${varAlpha(theme.vars.palette[color].mainChannel, 0.16)}`,
                    [stylesMode.dark]: {color: theme.vars.palette[color].light},
                    [`& .${alertClasses.icon}`]: {color: theme.vars.palette[color].main},
                })),
            };

            return {...styled.colors};
        },
    },
};

// ----------------------------------------------------------------------

const MuiAlertTitle: Components<Theme>['MuiAlertTitle'] = {
    /** **************************************
     * STYLE
     *************************************** */
    styleOverrides: {
        root: ({theme}) => ({
            marginBottom: theme.spacing(0.5),
            fontWeight: theme.typography.fontWeightSemiBold,
        }),
    },
};

// ----------------------------------------------------------------------

export const alert = {MuiAlert, MuiAlertTitle};
