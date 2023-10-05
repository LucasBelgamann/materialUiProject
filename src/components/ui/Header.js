import {
  styled,
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import React, { useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
              disableRipple
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
                component={Link}
                to="/services"
                label="Services"
                value={1}
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
                label="Contac Us"
                value={4}
              />
            </TabContainer>
            <ButtonClass variant="contained" color="secondary">
              Free Estimate
            </ButtonClass>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div style={{ height: "64px", marginBottom: "3em" }} />
    </>
  );
}
