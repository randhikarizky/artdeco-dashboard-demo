import React from "react";
import type {Theme, Components} from '@mui/material/styles';

import {radioClasses} from '@mui/material/Radio';
import Icon from "@/components/Icon";

// ----------------------------------------------------------------------

const MuiRadio: Components<Theme>['MuiRadio'] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: {
        size: 'small',
        icon: <Icon icon="eva:radio-button-off-outline"/>,
        checkedIcon: <Icon icon="eeva:radio-button-on-fill"/>,
    },

    /** **************************************
     * STYLE
     *************************************** */
    styleOverrides: {
        root: ({ownerState, theme}) => ({
            padding: theme.spacing(1),
            ...(ownerState.color === 'default' && {
                [`&.${radioClasses.checked}`]: {color: theme.vars.palette.text.primary},
            }),
            [`&.${radioClasses.disabled}`]: {color: theme.vars.palette.action.disabled},
        }),
    },
};

// ----------------------------------------------------------------------

export const radio = {MuiRadio};
