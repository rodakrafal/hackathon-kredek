export interface UserInfo {
  token: string;
  displayName: string;
}
export type UserInfoContextType = {
  user: UserInfo;
  setUser: (user: UserInfo) => void;
  login: (user: UserInfo) => void;
  logout: () => void;
};

export const deafultUser = {
  token: "",
  displayName: "",
};

export const userInfoContext = {
  user: deafultUser,
  setUser: () => {},
  login: () => {},
  logout: () => {},
};
