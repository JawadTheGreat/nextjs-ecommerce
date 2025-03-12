"use client";
import { useContext } from "react";
import { WixClientContext } from "../context/wixContext";

const useWixClient = () => {
  return useContext(WixClientContext);
};
export default useWixClient;
