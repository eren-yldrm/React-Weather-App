import React from "react";
import "./App.css";
import { Grid, CssBaseline, ThemeProvider } from "@material-ui/core";
import Weather from "./component/Weather";
import { Nav } from "./component/Nav";
import theme from "./utils/theme";

export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Nav />
      </ThemeProvider>
      <CssBaseline />

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="left"
        justify="center"
        style={{ minHeight: "90vh" }}
        
      >
        <Grid >
          <Weather/>
        </Grid>
      </Grid>
      
    </div>
  );
}
