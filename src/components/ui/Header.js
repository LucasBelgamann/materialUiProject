import {
  styled,
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useScrollTrigger,
  Menu,
  MenuItem,
  useMediaQuery,
  SwipeableDrawer,
  List,
  ListItem,
  Drawer,
  ListItemText,
  IconButton,
  ListItemButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import logo from "../../assets/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

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

const ToolbarMargin = styled(Toolbar)(({ theme }) => ({
  ...theme.mixins.toolbar,
  marginBottom: "3em",
  [theme.breakpoints.down("md")]: {
    marginBottom: "2em",
  },
  [theme.breakpoints.down("xs")]: {
    marginBottom: "1.25em",
  },
}));

const TabContainer = styled(Tabs)({
  marginLeft: "auto",
});

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
  color: "white",
}));

const LogoStyles = styled("img")(({ theme }) => ({
  height: "6em",
  [theme.breakpoints.down("md")]: {
    height: "5.5",
  },
  [theme.breakpoints.down("xs")]: {
    height: "5em",
  },
}));

const DrawerItem = styled(ListItemText)(({ theme }) => ({
  ...theme.typography.tab,
  color: "white",
  opacity: 0.7,
}));

const DrawerIcon = styled(MenuIcon)(({ theme }) => ({
  height: "50px",
  width: "50px",
  color: "white",
}));

export default function Header(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const isBrowser = typeof window !== "undefined";
  const iOS = isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/services" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/revolution" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/about" && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === "/contact" && value !== 4) {
      setValue(4);
    } else if (window.location.pathname === "/estimate" && value !== 5) {
      setValue(5);
    }

    switch (window.location.pathname) {
      case "/":
        if (value !== 1) {
          setValue(0);
        }
        break;
      case "/services":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }
        break;
      case "/customsoftware":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      case "/mobileapps":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      case "/websites":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(3);
        }
        break;
      case "/revolution":
        if (value !== 2) {
          setValue(2);
        }
        break;
      case "/about":
        if (value !== 3) {
          setValue(3);
        }
        break;
      case "/contact":
        if (value !== 4) {
          setValue(4);
        }
        break;
      case "/estimate":
        if (value !== 5) {
          setValue(5);
        }
        break;
      default:
        break;
    }
  }, [value]);

  const menuOptions = [
    {
      name: "All Services",
      link: "/services",
      activeIndex: 1,
      selectedIndex: 0,
    },
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

  const routes = [
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

  const tabs = (
    <>
      <TabContainer
        textColor="secondary"
        indicatorColor="none"
        value={value}
        onChange={handleChange}
      >
        <TabClass component={Link} to="/" label="Home" value={0} />
        <TabClass
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          component={Link}
          to="/services"
          label="Services"
          value={1}
          onMouseOver={(event) => handleClick(event)}
          onMouseOout={(event) => handleClose(event)}
        />
        <TabClass
          component={Link}
          to="/revolution"
          label="The Revolution"
          value={2}
        />
        <TabClass component={Link} to="/about" label="About Us" value={3} />
        <TabClass component={Link} to="/contact" label="Contact Us" value={4} />
      </TabContainer>
      <ButtonClass variant="contained" color="secondary">
        Free Estimate
      </ButtonClass>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
        sx={{
          ".MuiPaper-root": {
            backgroundColor: theme.palette.common.blue,
            color: "white",
            borderRadius: 0,
          },
        }}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={option}
            component={Link}
            to={option.link}
            sx={{
              ...theme.typography.tab,
            }}
            selected={index === selectedIndex && value === 1}
            onClick={(event) => {
              handleMenuItemClick(event, index);
              setValue(1);
              handleClose();
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: theme.palette.common.blue,
            width: "250px",
          },
        }}
      >
        <ToolbarMargin />
        <List disablePadding>
          {routes.map((route) => (
            <ListItemButton
              divider
              key={`${route}${route.activeIndex}`}
              component={Link}
              to={route.link}
              sx={{
                opacity: 1,
              }}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(route.activeIndex);
              }}
              selected={props.value === route.activeIndex}
            >
              <ListItemText primary={route.name} />
            </ListItemButton>
          ))}

          <ListItemButton
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(5);
            }}
            divider
            button
            component={Link}
            to="/estimate"
            sx={{
              backgroundColor:
                props.value === 5 ? theme.palette.common.orange : "transparent",
            }}
            selected={props.value === 5}
          >
            <DrawerItem disableTypography>Free Estimate</DrawerItem>
          </ListItemButton>
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
        <DrawerIcon />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              sx={{ padding: 0 }}
              onClick={() => setValue(0)}
            >
              <LogoStyles alt="company logo" src={logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div style={{ height: "64px", marginBottom: "3em" }} />
    </>
  );
}
