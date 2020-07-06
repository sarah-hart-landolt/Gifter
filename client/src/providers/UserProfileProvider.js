import React, { useState } from "react";

export const UserProfileContext = React.createContext();

export const UserProfileProvider = (props) => {
  const [userProfiles, setUserProfiles] = useState([]);

  const getAllUserProfiles = () => {
    return fetch("api/userprofile")
      .then((res) => res.json())
      .then(setUserProfiles);
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
    <UserProfileContext.Provider value={{ userProfiles, getAllUserProfiles, addUserProfile }}>
      {props.children}
    </UserProfileContext.Provider>
  );
};