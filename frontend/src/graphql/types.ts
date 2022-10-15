export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export type Feature = {
  __typename: "Feature";
  id?: Scalars["ID"];
  name: Scalars["String"];
  project: Project;
  description: Scalars["String"];
  tags: Array<Scalars["String"]>;
  upvotes: Scalars["Int"];
  upvoters: Array<User>;
  created: Scalars["Float"];
  user: User;
  clicked: Scalars["Boolean"];
};

export type User = {
  username: Scalars["String"];
};

export type Features = {
  features: Array<Feature>;
};

export type UserLogin = {
  userLogin: Token;
};

export type Token = {
  __typename: "Token";
  accessToken: Scalars["String"];
  tokenType: Scalars["String"];
  username: Scalars["String"];
  error: Scalars["String"];
};

export type Project = {
  name: Scalars["String"];
  id: Scalars["ID"];
  admins: Array<User>;
};
