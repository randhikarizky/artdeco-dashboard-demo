import React from "react";
import type { Theme, Components } from '@mui/material/styles';

import { checkboxClasses } from '@mui/material/Checkbox';
import Icon from "@/components/Icon";

// ----------------------------------------------------------------------

const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: {
    size: 'small',
    icon: <Icon icon="eva:square-outline" />,
    checkedIcon: <Icon icon="eva:checkmark-square-2-fill" />,
    indeterminateIcon: <Icon icon="eva:minus-square-outline" />,
  },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      padding: theme.spacing(1),
      ...(ownerState.color === 'default' && {
        [`&.${checkboxClasses.checked}`]: { color: theme.vars.palette.text.primary },
      }),
      [`&.${checkboxClasses.disabled}`]: { color: theme.vars.palette.action.disabled },
    }),
  },
};

// ----------------------------------------------------------------------

export const checkbox = { MuiCheckbox };
