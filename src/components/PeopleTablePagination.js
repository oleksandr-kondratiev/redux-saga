import Pagination from "@mui/material/Pagination";

export const PeopleTablePagination = ({
  page = 1,
  total = 10,
  onChange = () => {},
}) => {
  const totalPages = Math.ceil(total / 10);

  const handleChange = (_event, value) => {
    onChange(value);
  };

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      shape="rounded"
    />
  );
};
