import { useState, useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Grid, Paper, Stack } from "@mui/material";
import StudioCard from "./StudioCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  width: 196,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    first: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: "90vh",
    },
    parentPaper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 1600,
    },
    standalone: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: 150,
    },
    citySearchTextField: {
      width: 256,
      [`& fieldset`]: {
        borderRadius: 32,
      },
      [theme.breakpoints.only("md")]: {
        width: 196,
      },
      [theme.breakpoints.down("xs")]: {
        width: 144,
      },
    },

    categorySelect: {
      alignItems: "right",
      [`& fieldset`]: {
        borderRadius: 32,
      },
    },
    categorySelectDropdown: {
      width: 196,
      [theme.breakpoints.only("md")]: {
        width: 144,
      },
      [theme.breakpoints.only("xs")]: {
        width: 128,
      },
    },
    searchButton: {
      width: 96,
      height: 48,
      borderRadius: 32,
      fontSize: 16,
      textTransform: "none",
    },
    categorySearch: {
      display: "flex",
      alignItems: "center",
      justifyContent: "right",
    },
    citySearch: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    searchButtonWrapper: {
      textAlign: "left",
      display: "flex",
      alignItems: "center",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
    },
  };
});

const Explore = () => {
  const { user } = useAuthContext();
  const { classes } = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const saved = localStorage.getItem("category");
    const initialValue = JSON.parse(saved);
    return initialValue || "All";
  });
  const [selectedCity, setSelectedCity] = useState(() => {
    const saved = localStorage.getItem("city");
    const initialValue = JSON.parse(saved);
    return initialValue || "All";
  });
  const [searchCity, setSearchCity] = useState("All");
  const [searchCategory, setSearchCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [studios, setStudios] = useState([]);

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    localStorage.setItem("city", JSON.stringify(selectedCity));
    localStorage.setItem("category", JSON.stringify(selectedCategory));
  }, [selectedCategory, selectedCity]);

  useEffect(() => {
    const fetchAllStudios = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_API_URL}/api/studios/all`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setStudios(response.data);
          setIsLoading(false);
        });
    };
    setIsLoading(true);
    fetchAllStudios();
  }, [user, setIsLoading, setStudios]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/api/categories/all`
        );

        setCategories([
          { categoryName: "All", categoryValue: "All" },
          ...response.data,
        ]);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    setIsLoading(true);
    fetchCategoryData();
  }, [user, setIsLoading, setCategories]);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/api/cities/all`
        );

        setCities([{ cityName: "All" }, ...response.data]);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    setIsLoading(true);
    fetchCityData();
  }, [user, setIsLoading, setCities]);

  const handleCategoryRadioChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCityRadioChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleCitySearchChange = (v) => {
    setSearchCity(v);
  };
  const handleCategorySearchChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSelectedCategory(searchCategory);
    setSelectedCity(searchCity);
  };
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container direction="row" spacing={3}>
          <Grid item xs={2}>
            <Stack spacing={4}>
              <Item>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Category
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={selectedCategory}
                    name="radio-buttons-group"
                    onChange={handleCategoryRadioChange}
                    value={selectedCategory}
                  >
                    {categories.map((category, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          value={category.categoryName}
                          control={<Radio />}
                          label={category.categoryName}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </Item>
              <Item>
                {" "}
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    City
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={selectedCity}
                    name="radio-buttons-group"
                    onChange={handleCityRadioChange}
                    value={selectedCity}
                  >
                    {cities.map((city, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          value={city.cityName}
                          control={<Radio />}
                          label={city.cityName}
                          d
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </Item>
            </Stack>
          </Grid>
          <Grid item container xs={10} spacing={2}>
            <Grid item xs={12}>
              <Grid item xs container direction="row" spacing={1}>
                <Grid item md={4} className={classes.categorySearch}>
                  <FormControl
                    sx={{ m: 1, minWidth: 80 }}
                    className={classes.categorySelect}
                  >
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={searchCategory}
                      onChange={handleCategorySearchChange}
                      autoWidth
                      label="Category"
                      className={classes.categorySelectDropdown}
                    >
                      {categories.map((category, index) => {
                        return (
                          <MenuItem key={index} value={category.categoryName}>
                            {category.categoryName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={4} className={classes.citySearch}>
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={cities.map((city) => city.cityName)}
                    onChange={(e, v) => {
                      handleCitySearchChange(v);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search City"
                        className={classes.citySearchTextField}
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} className={classes.searchButtonWrapper}>
                  <Button
                    variant="contained"
                    className={classes.searchButton}
                    onClick={handleSearchSubmit}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item className={classes.grid}>
                {studios
                  .filter((studio) => {
                    if (selectedCity === "All") {
                      return studio;
                    }
                    return studio.studioCity === selectedCity;
                  })
                  .filter((studio) => {
                    if (selectedCategory === "All") {
                      return studio;
                    }
                    return (
                      studio.studioCategory.indexOf(selectedCategory) !== -1
                    );
                  })
                  .map((studio, index) => {
                    return <StudioCard {...studio} />;
                  })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Explore;
