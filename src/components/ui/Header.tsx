import { AppBar, Toolbar } from "@mui/material";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React from "react";

interface Props {
    children: React.ReactElement;
  }

function ElevationScroll(props: Props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

export default function Header() {
    return (
      <ElevationScroll>
        <AppBar position="fixed">
            <Toolbar>
                Arc Development
            </Toolbar>
        </AppBar>
      </ElevationScroll>
    )
}