import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
// import { useTranslation } from "react-i18next";
import { TSideBarItem } from "..";
import NestedList from "./NestedList";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

type TCollapsableListProps = TSideBarItem;

function CollapsableList({ icon, title, nestedList }: TCollapsableListProps) {
  const [open, setOpen] = useState(false);
  //   const [t] = useTranslation();

  console.log(nestedList);
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen((prev) => !prev)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      {nestedList?.length
        ? nestedList.map((listItem) => (
            <NestedList
              key={listItem.title}
              icon={listItem.icon}
              open={open}
              title={listItem.title}
              path={listItem.path ? listItem.path : ""}
              onClickFn={listItem.onClickFn ? listItem.onClickFn : () => {}}
            />
          ))
        : null}
    </>
  );
}

export default CollapsableList;
