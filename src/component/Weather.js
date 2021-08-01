import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { fetchWeather, fetchCountry } from "./WeatherApi";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 400,
    margin: theme.spacing(12),

    backgroundColor: "#7e9b7a",
    opacity: 0.8,
    alignItems: "center",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(12),
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },

  formControl: {
    margin: theme.spacing(2),
    minWidth: 220,
  },
}));

export default function Weather() {
  const [countryWeather, setWeather] = useState([]);
  const [country, setCountry] = useState([]);
  const [search, setSearch] = useState("Turkey");

  useEffect(() => {
    const countries = async () => {
      const country = await fetchCountry();
      setCountry(country);
    };
    countries();
  }, []);

  useEffect(() => {
    const weather = async () => {
      const weathers = await fetchWeather(search);
      setWeather(weathers);
    };

    weather();
  }, [search]);
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Şehirler</InputLabel>
              <Select onChange={(e) => setSearch(e.target.value)}>
                {country.map((r) => (
                  <MenuItem value={r.name}>{r.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </div>
        <CardContent className={classes.controls}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              Ülke İsmi : {countryWeather.name}
            </Typography>
            <Typography>
              SIcaklık: {parseInt(countryWeather.main.temp - 272.15)}
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
    </Container>
  );
}
