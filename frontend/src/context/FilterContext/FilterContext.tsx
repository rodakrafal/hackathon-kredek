import React, { createContext } from "react";
import {
  deafultFilterValues,
  filterContext,
  FilterOptions,
  FilterOptionsContextType,
} from "./utils";
import { useSessionStorage } from "usehooks-ts";
import { SelectChangeEvent } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export const FilterContext =
  createContext<FilterOptionsContextType>(filterContext);

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const [filter, setFilters] = useSessionStorage<FilterOptions>(
    "filters",
    deafultFilterValues
  );

  //   const handleFilter =
  //     (prop: keyof FilterOptions) =>
  //     (event: React.ChangeEvent<HTMLInputElement>) => {
  //       setFilters({ ...filter, [prop]: event.target.value });
  //     };

  const handleTags = (event: SelectChangeEvent<typeof filter.tags>) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filter,
      ["tags"]: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleName = (filterName: string) => {
    setFilters({ ...filter, ["name"]: filterName });
  };
  const handleOrder = (filterOrder: string) => {
    setFilters({ ...filter, ["order"]: filterOrder });
  };

  return (
    <FilterContext.Provider
      value={{ filter, handleTags, handleName, handleOrder }}
    >
      {children}
    </FilterContext.Provider>
  );
};
