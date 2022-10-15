import { gql } from "@apollo/client";

export type FilterOptionsType = {
  featureTags: Array<String>;
  featureName: String;
  fetureOrder: String;
};

export const GET_FEATURES = gql`
  query features {
    features {
      name
      description
      upvotes
      clicked
      tags
      created
    }
  }
`;
