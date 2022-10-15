import {
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";
export const Feature = ({
  title,
  description,
  tags,
  upvotes,
}: {
  title: string;
  description: string;
  tags: Array<string>;
  upvotes: number;
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <Grid container sx={{ backgroundColor: "lightgrey", margin: "8px 0" }}>
        <Grid
          item
          xs
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ flexDirection: "column" }}
        >
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => handleClick()}
          >
            <ArrowUpwardIcon
              fontSize="inherit"
              color={isClicked ? "primary" : "inherit"}
            />
          </IconButton>

          <Typography
            sx={{ fontSize: 14 }}
            color={isClicked ? "primary" : "text.secondary"}
            gutterBottom
          >
            {upvotes}
          </Typography>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid
          item
          xs={11}
          display="flex"
          justifyContent="center"
          alignItems="left"
          sx={{ margin: "16px", flexDirection: "column" }}
        >
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Divider variant="middle" flexItem sx={{ margin: "16px 0px" }} />
          <Stack direction="row" spacing={1}>
            {tags.map((tag, index) => (
              <Chip
                key={`${tag}_${index}`}
                label={tag}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
