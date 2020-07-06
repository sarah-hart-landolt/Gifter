import React, { useState, useEffect } from "react";

export const UserProfileContext = React.createContext();

export const UserProfileProvider = (props) => {
  const [userProfiles, setUserProfiles] = useState([]);

  const getAllUserProfiles = () => {
    return fetch("api/userprofile")
      .then((res) => res.json()).then(setUserProfiles)
  };

  const addUserProfile = (userProfile) => {
    return fetch("api/userprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userProfile),
    });
  };

  return (
    <UserProfileContext.Provider value={{ getAllUserProfiles, addUserProfile, userProfiles }}>
      {props.children}
    </UserProfileContext.Provider>
  );
};