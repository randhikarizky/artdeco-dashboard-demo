import React from "react";
import type { Theme, Components } from '@mui/material/styles';

import { varAlpha } from '@/theme/styles';
import Icon from "@/components/Icon";
import { ratingClasses } from "@mui/material";
import {svgIconClasses} from "@mui/material/SvgIcon";

// ----------------------------------------------------------------------

const MuiRating: Components<Theme>['MuiRating'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { emptyIcon: <Icon icon="eva:star-fill" />, icon: <Icon icon="eva:star-fill" /> },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: { [`&.${ratingClasses.disabled}`]: { opacity: 0.48 } },
    iconEmpty: ({ theme }) => ({ color: varAlpha(theme.vars.palette.grey['500Channel'], 0.48) }),
    sizeSmall: { [`& .${svgIconClasses.root}`]: { width: 20, height: 20 } },
    sizeMedium: { [`& .${svgIconClasses.root}`]: { width: 24, height: 24 } },
    sizeLarge: { [`& .${svgIconClasses.root}`]: { width: 28, height: 28 } },
  },
};

// ----------------------------------------------------------------------

export const rating = { MuiRating };
