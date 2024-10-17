import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.tsx";

export const useAuth = () => {
    return useContext(AuthContext);
};