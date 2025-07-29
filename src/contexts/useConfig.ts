import { useContext } from "react";
import { ConfigContext } from "../contexts/configContext";

export const useConfig = () => useContext(ConfigContext);
