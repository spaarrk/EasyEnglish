import { useState } from 'react';

export const usePopover = (popoverId = 'popover-id') => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    e && e.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? popoverId : undefined;

  return {
    handleClick,
    handleClose,
    anchorEl,
    open,
    id,
  };
};
