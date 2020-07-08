import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = React.createContext();

export const UserProfileProvider = (props) => {
    const [userProfiles, setUserProfiles] = useState([]);

    const apiUrl = "/api/userprofile";

    const userProfile = sessionStorage.getItem("userProfile");
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsLoggedIn(!!u);
            setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {
        return firebase.auth().signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUserProfile(signInResponse.user.uid))
            .then((userProfile) => sessionStorage.setItem("userProfile", JSON.stringify(userProfile)));
    };

    const logout = () => {
        return firebase.auth().signOut()
            .then(() => sessionStorage.clear());
    };

    const register = (userProfile, password) => {
        return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
            .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
            .then((savedUserProfile) => sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile)));
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserProfile = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

    const saveUser = (userProfile) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userProfile)
            }).then(resp => resp.json()));
    };


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
        <UserProfileContext.Provider value={{ getAllUserProfiles, addUserProfile, userProfiles, isLoggedIn, login, logout, register, getToken }}>
            {isFirebaseReady
                ? props.children
                : <Spinner className="app-spinner dark" />}
        </UserProfileContext.Provider>
    );
}