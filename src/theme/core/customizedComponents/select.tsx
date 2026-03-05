import React from "react";
import type { Theme, Components } from "@mui/material/styles";
import Icon from "@/components/Icon";

// ----------------------------------------------------------------------

const MuiSelect: Components<Theme>["MuiSelect"] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: {
    IconComponent: () => (
      <Icon
        icon="material-symbols:keyboard-arrow-down-rounded"
        sx={{ mr: 1, }}
      />
    ),
  },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    icon: {
      width: 18,
      height: 18,
      top: "calc(50% - 9px)",
    },
  },
};

// ----------------------------------------------------------------------

const MuiNativeSelect: Components<Theme>["MuiNativeSelect"] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: {
    IconComponent: () => <Icon icon="eva:arrow-downward-outline" />,
  },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    icon: {
      right: 10,
      width: 18,
      height: 18,
      top: "calc(50% - 9px)",
    },
  },
};

// ----------------------------------------------------------------------

export const select = { MuiSelect, MuiNativeSelect };
