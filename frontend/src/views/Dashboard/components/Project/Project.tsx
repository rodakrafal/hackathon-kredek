import { Container, Divider, Grid, Skeleton } from "@mui/material";
import { Feature } from "./components/Feature";
import { SearchBar } from "./components/SearchBar";
import { useQuery } from "@apollo/client";
import { Features } from "../../../../graphql/types";
import { useContext, useEffect } from "react";
import { GET_FEATURES } from "./utils";
import { FilterContext } from "../../../../context/FilterContext";

export const Project = () => {
  const { loading, error, data } = useQuery<Features>(GET_FEATURES);
  const { filter } = useContext(FilterContext);

  const featuresToDisplay = data?.features
    .filter((feature) => {
      if (filter.name.length === 0) {
        return true;
      }
      const stringName = feature.name.toLowerCase().replaceAll(" ", "");
      return stringName.includes(filter.name);
    })
    .filter((feature) => {
      if (filter.tags.length === 0) {
        return true;
      }
      const tags = feature.tags;
      const result = tags.filter((tags) =>
        filter.tags.forEach((filterTag) =>
          tags.toLocaleLowerCase().includes(tags.toLocaleLowerCase())
        )
      );
      debugger;
      return result;
    })
    .sort((a, b) => {
      if (filter.order === "TOP") {
        return b.upvotes - a.upvotes;
      }
      return b.created - a.created;
    });

  // useEffect(() => {
  //   if (featuresToDisplay) {
  //     const newArray = featuresToDisplay.filter((feature) => {
  //       if (filter.name.length === 0) {
  //         console.log("puste");
  //         return true;
  //       }
  //       console.log("nie puste");
  //       const stringName = feature.name.toLowerCase().replaceAll(" ", "");
  //       return stringName.includes(filter.name);
  //     });
  //     debugger;
  //   }
  // }, [data, filter]);

  if (!featuresToDisplay || loading)
    return (
      <Container maxWidth="lg" sx={{ paddingTop: "24px" }}>
        <Grid container sx={{ paddingBottom: "24px" }}>
          <Skeleton
            variant="text"
            width={120}
            height={40}
            sx={{ marginRight: "32px" }}
          />
          <Skeleton
            variant="text"
            width={220}
            height={40}
            sx={{ marginRight: "420px" }}
          />
          <Skeleton
            variant="text"
            width={220}
            height={40}
            sx={{ marginRight: "20px" }}
          />
          <Skeleton variant="text" width={120} height={40} />
        </Grid>
        <Grid>
          <Skeleton variant="rectangular" width="100%" height={180} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={180}
            sx={{ marginTop: "24px" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={180}
            sx={{ marginTop: "24px" }}
          />
        </Grid>
      </Container>
    );

  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "24px" }}>
        <SearchBar />
        <Divider sx={{ marginBottom: "32px" }} />
        <Grid container direction="column">
          {featuresToDisplay.length !== 0 ? (
            featuresToDisplay.map(
              ({ name, description, tags, upvotes }, index) => (
                <Feature
                  key={`${name}_${index}`}
                  title={name}
                  description={description}
                  tags={tags}
                  upvotes={upvotes}
                />
              )
            )
          ) : (
            <>No feature was found with selected criteria!</>
          )}
        </Grid>
      </Container>
    </>
  );
};
