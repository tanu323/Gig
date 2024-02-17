/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavbarContext } from "../../App";
import ProviderNavbar from "../ProviderNavbar";
import UserNavbar from "../UserNavbar";
import { useAuthNavigation } from "../../Hooks/useAuthNavigation";
import axios from "axios";

function PageWrapper(props) {

  const { showNav } = useContext(NavbarContext);
  const navigation = useNavigate();
  const { providerNavigation } = useAuthNavigation();
  const location = useLocation();


  useEffect(() => {
    (async () => {
      if (!sessionStorage.getItem('user_data')) {
        const token = location.search.split('=')[1];
        if (!token) return navigation("/page-not-found");
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}?token=${token}`)
        if (!data.data.name || !data.data.type) return navigation("/page-not-found");
        // const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}?token=${token}`)
        sessionStorage.setItem('user_data', JSON.stringify(data.data))
      }
      if (JSON.parse(sessionStorage.getItem('user_data')).type === "user") {
        if (location.pathname.startsWith("/provider")) {
          navigation("/user");
          return;
        }
        if (location.pathname === '/' || location.pathname.startsWith("/register")) {
          return navigation('/user')
        }
        navigation(location);
        return;
      }
      providerNavigation(JSON.parse(sessionStorage.getItem('user_data')).name);
    })()
  }, []);

  return (
    <div>
      {sessionStorage.getItem('user_data') ?
        JSON.parse(sessionStorage.getItem('user_data')).type === "provider" ? showNav &&
          <ProviderNavbar /> : <UserNavbar /> : ''}
      {props.children}
    </div>
  );
}

export default PageWrapper;
