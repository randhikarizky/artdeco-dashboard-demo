import React from "react";
import type { Theme, Components } from '@mui/material/styles';

import { buttonClasses } from '@mui/material/Button';
import { dialogActionsClasses } from '@mui/material/DialogActions';

import { stylesMode } from '@/theme/styles';
import Icon from "@/components/Icon";

const defaultProps = {
  date: {
    openPickerIcon: () => <Icon icon="eva:calendar-outline" />,
    leftArrowIcon: () => <Icon icon="eva:arrow-back-fill" />,
    rightArrowIcon: () => <Icon icon="eva:arrow-forward-fill" />,
    switchViewIcon: () => <Icon icon="eva:chevron-down-outline" />,
  },
  time: {
    openPickerIcon: () => <Icon icon="eva:calendar-outline" />,
    rightArrowIcon: () => <Icon icon="eva:arrow-forward-fill" />,
    switchViewIcon: () => <Icon icon="eva:chevron-down-outline" />,
  },
};

const MuiDatePicker: Components<Theme>['MuiDatePicker'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { slots: defaultProps.date },
};

const MuiDateTimePicker: Components<Theme>['MuiDateTimePicker'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { slots: defaultProps.date },
};

const MuiStaticDatePicker: Components<Theme>['MuiStaticDatePicker'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { slots: defaultProps.date },
};

const MuiDesktopDatePicker: Components<Theme>['MuiDesktopDatePicker'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { slots: defaultProps.date },
};

const MuiDesktopDateTimePicker: Components<Theme>['MuiDesktopDateTimePicker'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { slots: defaultProps.date },
};

const MuiMobileDatePicker: Components<Theme>['MuiMobileDatePicker'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { slots: defaultProps.date },
};

const MuiMobileDateTimePicker: Components<Theme>['MuiMobileDateTimePicker'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { slots: defaultProps.date },
};

const MuiTimePicker: Components<Theme>['MuiTimePicker'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { slots: defaultProps.time },
};

const MuiMobileTimePicker: Components<Theme>['MuiMobileTimePicker'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { slots: defaultProps.time },
};

const MuiStaticTimePicker: Components<Theme>['MuiStaticTimePicker'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { slots: defaultProps.time },
};

const MuiDesktopTimePicker: Components<Theme>['MuiDesktopTimePicker'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { slots: defaultProps.time },
};

const MuiPickersLayout: Components<Theme>['MuiPickersLayout'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      [`& .${dialogActionsClasses.root}`]: {
        [`& .${buttonClasses.root}`]: {
          [`&:last-of-type`]: {
            color: theme.vars.palette.common.white,
            backgroundColor: theme.vars.palette.text.primary,
            [stylesMode.dark]: { color: theme.vars.palette.grey[800] },
          },
        },
      },
    }),
  },
};

const MuiPickersPopper: Components<Theme>['MuiPickersPopper'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  styleOverrides: {
    paper: ({ theme }) => ({
      boxShadow: theme.customShadows.dropdown,
      borderRadius: theme.shape.borderRadius * 1.5,
    }),
  },
};

// ----------------------------------------------------------------------

export const datePicker = {
  MuiPickersPopper,
  MuiPickersLayout,
  // Date
  MuiDatePicker,
  MuiDateTimePicker,
  MuiStaticDatePicker,
  MuiDesktopDatePicker,
  MuiDesktopDateTimePicker,
  MuiMobileDatePicker,
  MuiMobileDateTimePicker,
  // Time
  MuiTimePicker,
  MuiMobileTimePicker,
  MuiStaticTimePicker,
  MuiDesktopTimePicker,
};
