import { SelectChangeEvent } from "@mui/material";

export type FilterOptions = {
  tags: string[];
  name: string;
  order: string;
};

export type FilterOptionsContextType = {
  filter: FilterOptions;
  handleTags: (event: SelectChangeEvent<string[]>) => void;
  handleName: (filterName: string) => void;
  handleOrder: (filterOrder: string) => void;
};

export const deafultFilterValues = {
  tags: [],
  name: "",
  order: "TOP",
};

export const filterContext = {
  filter: deafultFilterValues,
  handleTags: () => {},
  handleName: () => {},
  handleOrder: () => {},
};
