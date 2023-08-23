declare module "*.module.css";
declare module "*.scss";
declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
declare module "jwt-decode";
declare module "react-i18next";
/* eslint-disable */
declare namespace React {
  export default interface RefObject<T> {
    current: T | null;
  }
}