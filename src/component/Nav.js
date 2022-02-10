import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputLabel, Select, MenuItem } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getWeather } from "../redux/slices/weatherSlice";
import { getCountries } from "../redux/slices/countrySlice";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 0.5,
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "white",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 620,
        minHeight:50,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("lg")]: {
            width: "22ch",
            "&:focus": {
                width: "30ch",
            },
        },
    },
}));
export const Nav = () => {
    const [search, setSearch] = React.useState([33, 65]);
    const classes = useStyles();
    const dispatch = useDispatch();
    const weather = useSelector((state) => state.weather.value);
    const Country = useSelector((state) => state.countries.value);
    React.useEffect(() => {
        dispatch(getCountries());
    }, []);
    React.useEffect(() => {
        dispatch(getWeather({ lat: !search.latlng ? 0 : search.latlng[0], lon: !search.latlng ? 0 : search.latlng[1] }));
    }, [search]);
    return (
        <div className={classes.root}>
            <AppBar color="primary">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        HAVA DURUMU
                    </Typography>
                    <div className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label" >Şehirler</InputLabel>

                        <Select className={classes.formControl} onChange={(e) => setSearch(e.target.value)} placeholder= "Lütfen Ülke Seçiniz" >
                            {Country.map((r) => (
                                <MenuItem value={r} selected >
                                    {r.name.common}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};
