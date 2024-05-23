import { Popover, Typography, useMediaQuery } from '@mui/material';
import React from 'react';

const CustomPopoverShell = (props) => {
  const { children, popoverProps, onlyMobile, sx } = props;
  const isMobile = useMediaQuery('(max-width:800px)');
  const CurrentComp = onlyMobile && !isMobile ? React.Fragment : Popover;
  const currentProps =
    onlyMobile && !isMobile
      ? {}
      : {
          sx: sx,
          open: popoverProps.open,
          onClose: popoverProps.handleClose,
          anchorEl: popoverProps.anchorEl,
          id: popoverProps.id,
        };
  return <CurrentComp {...currentProps}>{children}</CurrentComp>;
};
export default CustomPopoverShell;
