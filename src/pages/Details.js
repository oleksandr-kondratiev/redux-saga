import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  CircularProgress,
  Container,
  Breadcrumbs,
} from "@mui/material";
import { Link } from "react-router-dom";

export const Details = () => {
  const details = useSelector((state) => state.peopleDetails);

  if (details.loading) {
    return (
      <Box
        width="100%"
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  const {
    name,
    birth_year,
    skin_color,
    mass,
    height,
    hair_color,
    eye_color,
    gender,
  } = details.data;

  return (
    <Container>
      <Box width="100%" margin="32px 0">
        <Box marginBottom="16px">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography color="black">Table</Typography>
            </Link>
            <Typography color="#0051FF">Breadcrumbs</Typography>
          </Breadcrumbs>
        </Box>
        <Typography variant="h4" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Birth Year: {birth_year}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Skin Color: {skin_color}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Mass: {mass}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Height: {height}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Hair Color: {hair_color}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Eye Color: {eye_color}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Gender: {gender}
        </Typography>
      </Box>
    </Container>
  );
};
