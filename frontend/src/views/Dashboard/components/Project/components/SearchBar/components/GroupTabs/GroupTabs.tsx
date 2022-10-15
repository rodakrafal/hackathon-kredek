import { Box, ButtonGroup, Button } from "@mui/material";
import { useContext, useState } from "react";
import { FilterContext } from "../../../../../../../../context/FilterContext";

const hardCodedGroupTabs = [
  {
    groupName: "TOP",
  },
  {
    groupName: "NEW",
  },
];

export const GroupTabs = () => {
  const { filter, handleOrder } = useContext(FilterContext);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <ButtonGroup>
          {hardCodedGroupTabs.map((tab, index) => (
            <Button
              key={`${tab.groupName}_${index}`}
              onClick={() => handleOrder(`${tab.groupName}`)}
              variant={
                filter.order === tab.groupName ? "contained" : "outlined"
              }
            >
              {tab.groupName}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </>
  );
};
