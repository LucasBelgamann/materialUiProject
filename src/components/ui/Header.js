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
} from "@mui/material";
import React, { useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

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

export default function Header() {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
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
  }, [value]);

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
              <img alt="company logo" src={logo} style={{ height: "7em" }} />
            </Button>
            <TabContainer
              textColor="secondary"
              indicatorColor="secondary"
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
              <TabClass
                component={Link}
                to="/about"
                label="About Us"
                value={3}
              />
              <TabClass
                component={Link}
                to="/contact"
                label="Contact Us"
                value={4}
              />
            </TabContainer>
            <ButtonClass variant="contained" color="secondary">
              Free Estimate
            </ButtonClass>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              elevation={0}
              sx={{
                '.MuiPaper-root': {
                  backgroundColor: theme.palette.common.blue,
                  color: "white",
                  borderRadius: 0
                },
              }}
            >
              <MenuItem
                component={Link}
                to="/customsoftware"
                onClick={() => {
                  handleClose();
                  setValue(1);
                }}
                sx={{
                  ...theme.typography.tab,
                }}
              >
                Custom Software Deveopment
              </MenuItem>
              <MenuItem
                component={Link}
                to="/mobileapps"
                onClick={() => {
                  handleClose();
                  setValue(1);
                }}
                sx={{
                  ...theme.typography.tab,
                }}
              >
                Mobile App Deveopment
              </MenuItem>
              <MenuItem
                component={Link}
                to="/websites"
                onClick={() => {
                  handleClose();
                  setValue(1);
                }}
                sx={{
                  ...theme.typography.tab,
                }}
              >
                Website Deveopment
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div style={{ height: "64px", marginBottom: "3em" }} />
    </>
  );
}
