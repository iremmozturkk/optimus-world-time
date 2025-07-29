import { useContext } from "react";
import { ConfigContext } from "../contexts/configContext";

export const useConfig = () => useContext(ConfigContext);
//useContext ile ConfigContext içindeki değerleri döner.