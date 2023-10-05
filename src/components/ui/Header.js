import {
  styled,
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import React from "react";
import logo from "../../assets/logo.svg";

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
  color: "white"
}));

export default function Header() {
  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <img alt="company logo" src={logo} style={{ height: "7em" }} />
            <TabContainer>
              <TabClass label="Home" />
              <TabClass label="Services" />
              <TabClass label="The Revolution" />
              <TabClass label="About Us" />
              <TabClass label="Contac Us" />
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
