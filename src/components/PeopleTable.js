import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Container,
  Box,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";

// redux
import { LOAD_USERS } from "../redux/reducers/people/actions";

// components
import { PeopleTablePagination } from "./PeopleTablePagination";

export const PeopleTable = () => {
  const dispatch = useDispatch();

  const people = useSelector((state) => state.people);

  const setPage = (newPage) => {
    dispatch({
      type: LOAD_USERS,
      payload: { page: newPage, search: people.search },
    });
  };

  const setSearch = (e) => {
    dispatch({
      type: LOAD_USERS,
      payload: { page: 1, search: e.target.value },
    });
  };

  const renderRow = (character) => {
    const userId = character?.url?.split("/")[5];

    return (
      <TableRow key={character?.name}>
        <TableCell component="th" scope="row">
          {character?.name}
        </TableCell>
        <TableCell>{character?.birth_year}</TableCell>
        <TableCell>{character?.eye_color}</TableCell>
        <TableCell>{character?.gender}</TableCell>
        <TableCell>{character?.hair_color}</TableCell>
        <TableCell>{character?.height}</TableCell>
        <TableCell>
          <Link to={`/people/${userId}`}>Details</Link>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="16px 0"
      >
        <Typography variant="h6" sx={{ my: 2 }} textTransform="uppercase">
          Star Wars Characters
        </Typography>
        <TextField
          size="small"
          type="text"
          value={people.search}
          placeholder="Search people..."
          onChange={setSearch}
        />
      </Box>

      <Divider />

      <TableContainer component={Paper} loading={people.loading}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="700">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="700">Birth year</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="700">Eye color</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="700">Gender</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="700">Hair color</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="700">Height</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="700">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people?.loading ? (
              <TableCell colSpan={7}>
                <Box
                  height={496}
                  minWidth="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress />
                </Box>
              </TableCell>
            ) : (
              people?.data?.results.map(renderRow)
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box padding="24px 0" display="flex" justifyContent="flex-end">
        <PeopleTablePagination
          page={people?.page}
          total={people?.data?.count}
          onChange={setPage}
        />
      </Box>
    </Container>
  );
};
