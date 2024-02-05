import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import Toolbar from "@mui/material/Toolbar";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GroupIcon from "@mui/icons-material/Group";
import DomainIcon from "@mui/icons-material/Domain";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CollapsableList from "./components/CollapsableList";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";
import { useSignOutMutation } from "@/mutations/useSignOutMutation";
import { toast } from "react-toastify";
import { TAxiosResponseError } from "@/generalTypes";

export type TSideBarProps = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
};

export type TSideBarItem = {
  title: string;
  icon: JSX.Element;
  path?: `/${string}`;
  nestedList?: TSideBarItem[];
  onClickFn?: () => void;
};

function SideBar({
  drawerWidth,
  handleDrawerToggle,
  mobileOpen,
}: TSideBarProps) {
  const [, i18n] = useTranslation();

  const sideBarItems: TSideBarItem[] = [
    { title: "profile", icon: <AssignmentIndIcon />, path: "/profile" },
    { title: "users", icon: <GroupAddIcon />, path: "/users" },
    { title: "teams", icon: <GroupIcon />, path: "/teams" },
    { title: "departments", icon: <GroupsIcon />, path: "/departments" },
    {
      title: "domains",
      icon: <DomainIcon />,
      nestedList: [
        {
          title: "Change Domain",
          icon: <ChangeCircleIcon />,
          path: "/choose-domain",
        },
        {
          title: "Delete Domain",
          icon: <DeleteIcon />,
        },
      ],
    },
    {
      title: i18n.language.toUpperCase(),
      icon: <LanguageIcon />,
      nestedList: [
        {
          title: "English",
          icon: <div>icon</div>,
          onClickFn: () => {
            i18n.changeLanguage("eng");
          },
        },
        {
          title: "French",
          icon: <div>icon</div>,
          onClickFn: () => {
            i18n.changeLanguage("fra");
          },
        },
        {
          title: "German",
          icon: <div>icon</div>,
          onClickFn: () => {
            i18n.changeLanguage("ger");
          },
        },
        {
          title: "Russian",
          icon: <div>icon</div>,
          onClickFn: () => {
            i18n.changeLanguage("rus");
          },
        },
      ],
    },
    {
      title: "Logout",
      icon: <LogoutIcon />,
      onClickFn: () => {
        mutate();
      },
    },
  ];

  const onError = (error: TAxiosResponseError) => {
    toast.error(error.response?.data.message);
  };
  const { mutate } = useSignOutMutation(onError);

  const { pathname } = useLocation();

  const [t] = useTranslation();
  const drawer = (
    <div>
      <Toolbar>
        <strong>Zaken CRM</strong>
      </Toolbar>
      <Divider />
      <List sx={{ bgcolor: "background.paper" }}>
        {sideBarItems.map((item) => {
          if (item?.nestedList?.length) {
            return (
              <CollapsableList
                key={item.title}
                icon={item.icon}
                title={item.title}
                nestedList={item.nestedList}
              />
            );
          }
          return (
            <Link
              key={item.title}
              to={item.path ? item.path : ""}
              style={{ textDecoration: "none", color: "black" }}
              onClick={item.onClickFn ? item.onClickFn : () => {}}
            >
              <ListItem disablePadding>
                <ListItemButton selected={pathname === item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={t(item.title)} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default SideBar;
