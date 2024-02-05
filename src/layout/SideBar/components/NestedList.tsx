import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

type TNestedListProps = {
  open: boolean;
  icon: JSX.Element;
  title: string;
  path?: string;
  onClickFn: () => void;
};

function NestedList({ icon, open, title, path, onClickFn }: TNestedListProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (path) {
      navigate(path);
    } else {
      onClickFn();
    }
  };

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List onClick={handleClick} component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={t(title)} />
        </ListItemButton>
      </List>
    </Collapse>
  );
}

export default NestedList;
