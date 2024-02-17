import axios from "axios";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavbarContext } from "../App";

export const useAuthNavigation = () => {
    const navigation = useNavigate();
    const { setShowNav } = useContext(NavbarContext)
    const location = useLocation();


    const providerNavigation = async (userName) => {
        try {
            setShowNav(false)
            const { data } = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/provider/register?companyName=${userName}`
            );
            if (data?.data[0].newUser) {
                navigation("/register", {
                    state: {
                        isApproved: true,
                        data
                    },
                });
                return;
            }
            const { is_approved } = data.data[0];
            if (!is_approved) {
                navigation("/register", {
                    state: {
                        isApproved: false,
                    },
                });
                return;
            }
            if (location.pathname === '/' || location.pathname === '' || location.pathname.startsWith("/user") || location.pathname.startsWith("/register") || location.pathname.substring(1) !== 'provider') {
                setShowNav(true)
                return navigation('/provider')
            }
            setShowNav(true)
            navigation(location);
            return;
        } catch (error) {
            return console.log("hook error : ", error);
        }
    }
    return {
        providerNavigation
    }
}