import { forwardRef } from "react";
import { Icon as Iconify, IconProps } from "@iconify/react";
import { Box, BoxProps } from "@mui/material";

type Props = BoxProps & IconProps;

const Icon = forwardRef<SVGElement, Props>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Iconify}
      icon={icon}
      sx={{
        width,
        height: width,
        flexShrink: 0,
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    />
  ),
);

Icon.displayName = 'Icon';

export default Icon;
