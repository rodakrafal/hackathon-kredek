import { Grid } from "@mui/material";
import { FeatureAdd } from "./components/FeatureAdd";
import { FilterName } from "./components/FilterName";
import { GroupTabs } from "./components/GroupTabs";
import { SelectTags } from "./components/SelectTags";

export const SearchBar = () => {
  return (
    <>
      <Grid container alignItems="center">
        <Grid item sx={{ paddingRight: "8px" }}>
          <GroupTabs />
        </Grid>
        <Grid item sx={{ paddingRight: "285px" }}>
          <FeatureAdd />
        </Grid>
        <Grid item>
          <SelectTags />
        </Grid>
        <Grid item>
          <FilterName />
        </Grid>
      </Grid>
    </>
  );
};
