import { Theme, useTheme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import { useContext, useState } from "react";
import {
  Stack,
  Chip,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { FilterContext } from "../../../../../../../../context/FilterContext";

const hardCodedChips = [
  {
    filterName: "Done",
    featuresNumber: "0",
  },
  {
    filterName: "Rejected",
    featuresNumber: "0",
  },
  {
    filterName: "In Progress",
    featuresNumber: "0",
  },
  {
    filterName: "In Backlog",
    featuresNumber: "0",
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const SelectTags = () => {
  const theme = useTheme();
  const { filter, handleTags } = useContext(FilterContext);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }} size="small">
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={filter.tags}
          onChange={handleTags}
          input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
          renderValue={(selected) => (
            <Stack direction="row" spacing={1}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
              ))}
            </Stack>
          )}
          MenuProps={MenuProps}
        >
          {hardCodedChips.map((chip) => (
            <MenuItem
              key={chip.filterName}
              value={chip.filterName}
              style={getStyles(chip.filterName, filter.tags, theme)}
            >
              {chip.filterName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
