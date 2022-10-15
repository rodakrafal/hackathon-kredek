import {
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { State } from "../../utils";

export const UserNameInput = ({
  values,
  setValues,
  handleChange,
}: {
  values: State;
  setValues: React.Dispatch<React.SetStateAction<State>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
        <OutlinedInput
          id="outlined-adornment-username"
          value={values.username}
          onChange={handleChange}
          label="Username"
        />
      </FormControl>
    </>
  );
};
