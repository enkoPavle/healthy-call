import React, { createContext, useContext, useMemo, useState } from "react";
import { useAuthContext } from "./auth";

interface IUserInfo {
  goal: "lose" | "maintain" | "gain" | null;
  gender: "male" | "female" | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  desiredWeight: number | null;
  activityLevel: "sedentary" | "active" | "veryActive" | null;
  name: string | null;
}

export interface RegisterContextValue {
  userInfo: IUserInfo;
  setUserProperty: (
    key: keyof IUserInfo,
    value: IUserInfo[keyof IUserInfo]
  ) => void;
  register: () => void;
  // signIn: (token: string) => void;
  // signOut: () => void;
}

const initialUserInfo: IUserInfo = {
  goal: null,
  gender: null,
  age: null,
  height: null,
  weight: null,
  desiredWeight: null,
  activityLevel: null,
  name: null,
};

export const RegisterContext = createContext<RegisterContextValue | null>(null);

export const RegisterProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const { setUserAuthCredential } = useAuthContext();
  // const { signIn } = useAuthContext();

  const setUserProperty = (
    key: keyof IUserInfo,
    value: IUserInfo[keyof IUserInfo]
  ) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [key]: value,
    }));
  };

  const register = () => {
    setUserAuthCredential({
      authorizationCode:
        "c1d3b03de572744499496e45218cc5bb2.0.srsvs.miIkWfC2bf8ZiSktR6NOcw",
      email: null,
      fullName: {
        familyName: null,
        givenName: null,
        middleName: null,
        namePrefix: null,
        nameSuffix: null,
        nickname: null,
      },
      identityToken:
        "eyJraWQiOiJmaDZCczhDIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiaG9zdC5leHAuRXhwb25lbnQiLCJleHAiOjE3MDY4MDYxODQsImlhdCI6MTcwNjcxOTc4NCwic3ViIjoiMDAxMjUyLjIyZjU2ZDcyZmMyNjRhZWE4NGRjYWRlYzU0ZGZmN2I1LjEwNTAiLCJjX2hhc2giOiI2S2I3LW5zZXdXSGw0aTBTckdLM2FBIiwiZW1haWwiOiJlbmtvcGF2bGVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwiYXV0aF90aW1lIjoxNzA2NzE5Nzg0LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.dlZqjYaiY9uE1K_1Q8eSL7NhCRlyT0Y2wWFAIp9JjcodXWb6ZhlSryWbPJ2edbc8LjV0Mr12v2X83TVRhA-zy1iP9Lexw9IqEUXHNxjlQRehnYLnX2AWe4nMGNmzpOT-k0OOystCERgWfPwe1gEc6cSjl6QS_YzXafgSx94SrWF5ulw0igNKM4tSG3JztDHHzLLuIyPcheZXlo7yCSuvx--PnqMqHVRuYAvkaJHBJZuUyvXIDCckcYmpV-6RyRz6H0ff4n7YCUaJzANufN2XEJRHKIFUBdGGxNFiYji7wh8V2RTzL1Vqcp6eDVRiIc-V91KiCT3HIwPj3lxGrNm3xw",
      realUserStatus: 1,
      state: null,
      user: "001252.22f56d72fc264aea84dcadec54dff7b5.1050",
    });
  };

  const value = useMemo(() => {
    return {
      userInfo,
      setUserProperty,
      register,
    };
  }, [userInfo]);

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisterContext = () => {
  const registerContext = useContext(RegisterContext);

  return registerContext as RegisterContextValue;
};
