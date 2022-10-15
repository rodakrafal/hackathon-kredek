import { useContext } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FilterContext } from "../../../../../../../../context/FilterContext";

export const FilterName = () => {
  const { filter, handleName } = useContext(FilterContext);

  return (
    <>
      <TextField
        id="input-with-icon-textfield"
        label="Search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={filter.name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleName(event.target.value);
        }}
        variant="outlined"
        size="small"
      />
    </>
  );
};
