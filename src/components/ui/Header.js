import React, { useState, useEffect, useMemo } from "react";

import logo from "../../assets/logo.svg";
import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const ToolbarClass = styled(Toolbar)(({ theme }) => ({
  ...theme.mixins.toolbar,
  marginBottom: "3em",
  [theme.breakpoints.down("md")]: {
    marginBottom: "2em",
  },
  [theme.breakpoints.down("xs")]: {
    marginBottom: "1.25em",
  },
}));

const Logo = styled("img")(({ theme }) => ({
  height: "6em",
  [theme.breakpoints.down("md")]: {
    height: "5.5",
  },
  [theme.breakpoints.down("xs")]: {
    height: "5em",
  },
}));

const TabClass = styled(Tab)(({ theme }) => ({
  ...theme.typography.tab,
  minWidth: 10,
  marginLeft: "25px",
}));

const ButtonClass = styled(Button)(({ theme }) => ({
  ...theme.typography.estimate,
  borderRadius: "50px",
  marginLeft: "50px",
  marginRight: "25px",
  height: "45px",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
}));

const MenuClass = styled(Menu)(({ theme }) => ({
  backgroundColor: theme.palette.common.blue,
  color: "white",
  borderRadius: "0px",
}));

const MenuItemClass = styled(MenuItem)(({ theme }) => ({
  ...theme.typography.tab,
  opacity: 0.7,
  "&:hover": {
    opacity: 1,
  },
}));

const DrawerItemClass = styled(ListItemText)(({ theme }) => ({
  ...theme.typography.tab,
  color: "white",
  opacity: 0.7,
}));

const useStyles = styled((theme) => ({
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  drawerItem: {
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isBrowser = typeof window !== "undefined";
  const iOS = isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const menuOptions = useMemo(() => {
    return [
      { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
      {
        name: "Custom Software Development",
        link: "/customsoftware",
        activeIndex: 1,
        selectedIndex: 1,
      },
      {
        name: "iOS/Android App Development",
        link: "/mobileapps",
        activeIndex: 1,
        selectedIndex: 2,
      },
      {
        name: "Website Development",
        link: "/websites",
        activeIndex: 1,
        selectedIndex: 3,
      },
    ];
  }, []);

  const routes = useMemo(() => {
    return [
      { name: "Home", link: "/", activeIndex: 0 },
      {
        name: "Services",
        link: "/services",
        activeIndex: 1,
        ariaOwns: anchorEl ? "simple-menu" : undefined,
        ariaPopup: anchorEl ? "true" : undefined,
        mouseOver: (event) => handleClick(event),
      },
      { name: "The Revolution", link: "/revolution", activeIndex: 2 },
      { name: "About Us", link: "/about", activeIndex: 3 },
      { name: "Contact Us", link: "/contact", activeIndex: 4 },
    ];
  }, [anchorEl]);

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);
            if (
              route.selectedIndex &&
              route.selectedIndex !== props.selectedIndex
            ) {
              props.setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        case "/estimate":
          props.setValue(5);
          break;
        default:
          break;
      }
    });
  }, [props.value, menuOptions, props.selectedIndex, routes, props]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.value}
        onChange={handleChange}
        sx={{ marginLeft: "auto" }}
        indicatorColor="primary"
      >
        {routes.map((route, index) => (
          <TabClass
            key={`${route}${index}`}
            component={Link}
            to={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      <ButtonClass
        component={Link}
        to="/estimate"
        variant="contained"
        color="secondary"
        onClick={() => props.setValue(5)}
      >
        Free Estimate
      </ButtonClass>
      <MenuClass
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          onMouseLeave: handleClose,
        }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        {menuOptions.map((option, i) => (
          <MenuItemClass
            key={`${option}${i}`}
            component={Link}
            to={option.link}
            onClick={(event) => {
              handleMenuItemClick(event, i);
              props.setValue(1);
              handleClose();
            }}
            selected={i === props.selectedIndex && props.value === 1}
          >
            {option.name}
          </MenuItemClass>
        ))}
      </MenuClass>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        PaperProps={{
          sx: { backgroundColor: theme.palette.common.blue, width: "250px" },
        }}
      >
        <ToolbarClass />
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              divider
              key={`${route}${route.activeIndex}`}
              button
              component={Link}
              to={route.link}
              selected={props.value === route.activeIndex}
              classes={{
                selected: classes.drawerItemSelected,
                root: classes.drawerItem,
              }}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(route.activeIndex);
              }}
            >
              <DrawerItemClass disableTypography>{route.name}</DrawerItemClass>
            </ListItem>
          ))}
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(5);
            }}
            divider
            button
            component={Link}
            to="/estimate"
            classes={{
              selected: classes.drawerItemSelected,
              root: classes.drawerItemEstimate,
            }}
            selected={props.value === 5}
          >
            <DrawerItemClass disableTypography>Free Estimate</DrawerItemClass>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        sx={{
          marginLeft: "auto",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon sx={{ height: "50px", width: "50px" }} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.modal + 1 }}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              onClick={() => props.setValue(0)}
              sx={{
                padding: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Logo alt="company logo" src={logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <ToolbarClass />
    </React.Fragment>
  );
}
