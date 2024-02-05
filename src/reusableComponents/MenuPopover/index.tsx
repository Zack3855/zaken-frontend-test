import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type TMenuPopoverProps = {
  OpenerComponent: React.ReactElement;
  menuItems: {
    title: string;
    onClickFn: () => void;
  }[];
};

export default function MenuPopover({
  OpenerComponent,
  menuItems,
}: TMenuPopoverProps) {
  const [t] = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (currentTarget: HTMLDivElement) => {
    setAnchorEl(currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        onClick={(e) => {
          handleClick(e.currentTarget);
        }}
        id="basic-button"
        aria-controls={open ? "menu-popover" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {OpenerComponent}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            onClick={() => {
              item.onClickFn();
              handleClose();
            }}
          >
            {t(item.title)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
