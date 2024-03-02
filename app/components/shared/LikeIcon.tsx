"user client";
import React from "react";
import { motion } from "framer-motion";
import styles from "../shared/LikeIcon.module.css";
interface Props {
  like?: boolean | undefined;
  productInfo?: boolean | undefined;
}
const LikeIcon = ({ like, productInfo }: Props) => {
  return (
    <div
      className={` ${
        !productInfo ? "hover:bg-[rgba(0,0,0,.1)]" : "!h-[44px] !w-[44px]"
      } !absolute top-0  transition-all  ${styles.like}  ${
        like && styles.liked
      }`}
    >
      <svg
        style={{ margin: productInfo ? "11px 9px 7px 9px" : "" }}
        className={`${like ? "" : styles.i} `}
        width="20"
        height="20"
        viewBox="0 0 24 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 7.827C1.5 4.0992 3.5 1.5 7.54036 1.5C10 1.5 11.5646 2.93172 13.5323 5.5C15.5 8.06828 16 12 12 12C8 12 8.5 7.827 10.4677 5.5C12 3.5 14 1.5 16.4596 1.5C20.5 1.5 22.5 4.0992 22.5 7.827C22.5 14.5 12.525 20.5 12 20.5C11.475 20.5 1.5 14.5 1.5 7.827Z"
          stroke="#FF3040"
          strokeWidth="3"
          className={styles.thread}
        />
        <path
          d="M1 7.66C1 12.235 4.899 16.746 10.987 20.594C11.325 20.797 11.727 21 12 21C12.283 21 12.686 20.797 13.013 20.594C19.1 16.746 23 12.234 23 7.66C23 3.736 20.245 1 16.672 1C14.603 1 12.98 1.94 12 3.352C11.042 1.952 9.408 1 7.328 1C3.766 1 1 3.736 1 7.66Z"
          stroke="white"
          strokeWidth="2"
          className={styles.heart}
        />
      </svg>
    </div>
  );
};

export default LikeIcon;
