import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../redux/slices/countrySlice";
import { getWeather } from "../redux/slices/weatherSlice";
import CardMedia from '@mui/material/CardMedia';
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

const Weather = () => {
    const [search, setSearch] = useState([33, 65]);
    const dispatch = useDispatch();
    const Country = useSelector((state) => state.countries.value);
    const Weather = useSelector((state) => state.weather.value);

    useEffect(() => {
        dispatch(getCountries());
    }, []);

    useEffect(() => {
        dispatch(getWeather({ lat: search[0], lon: search[1] }));
    }, [search]);

    const dtCheck = () => {
        if (Weather.current)
            if (Weather.current.dt) return Weather.current.dt;
            else return "";
    };
    const sunriseCheck = () => {
        if (Weather.current)
            if (Weather.current.sunrise) return Weather.current.sunrise;
            else return "";
    };
    const sunsetCheck = () => {
        if (Weather.current)
            if (Weather.current.sunset) return Weather.current.sunset;
            else return "";
    };
    const tempCheck = () => {
        if (Weather.current)
            if (Weather.current.temp) return Weather.current.temp;
            else return "";
    };
    const classes = useStyles();
    let time;
    const weatherLatLng= [ parseInt(Weather.lat), parseInt(Weather.lon)]
    const filteredCountry = Country.map((country) => country).filter((country) => country.latlng[0] === weatherLatLng[0] && country.latlng[1] === weatherLatLng[1]);
    return (
        <Container>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <CardMedia component="img" alt="a" height="140" image={!filteredCountry[0]? <div>loading...</div>: filteredCountry[0].flags.png}/>
                    </CardContent>
                </div>
                <CardContent className={classes.controls}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Zaman Dilimi : {Weather.timezone}
                        </Typography>
                        <Typography component="h5" variant="h5">
                            Anlık Zaman : {(time = new Date(dtCheck() * 1000).toLocaleTimeString("tr-TR"))}
                        </Typography>
                        <Typography component="h5" variant="h5">
                            Gün DOğumu : {(time = new Date(sunriseCheck() * 1000).toLocaleTimeString("tr-TR"))}
                        </Typography>
                        <Typography component="h5" variant="h5">
                            Gün Batımı : {(time = new Date(sunsetCheck() * 1000).toLocaleTimeString("tr-TR"))}
                        </Typography>
                        <Typography component="h5" variant="h5">
                            SIcaklık: {parseInt(tempCheck() - 272.15)}
                        </Typography>
                    </CardContent>
                </CardContent>
            </Card>
        </Container>
    );
};
export default Weather;
