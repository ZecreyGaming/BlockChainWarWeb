import { useEffect, useState } from "react";
import { getUrlByPub } from "utils/hooks/api/media";
import ImgBox from "../img";
import styles from "./style.module.css";

const Avatar = (props: { url: string; name?: string; size?: number }) => {
  const url = useURL(props.url);
  return (
    <ImgBox
      className={`${styles.avatar} avatar`}
      src={url || "/static/image/default_avatar_1.png"}
      alt={props.name || "avatar"}
      width={props.size || 140}
      height={props.size || 140}
    />
  );
};

export default Avatar;

const isURL = (val: string) => {
  try {
    new URL(val);
    return true;
  } catch (err) {
    return false;
  }
};

export const isPubId = (val: string) => val && val.startsWith("collection/");

const useURL = (val: string) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (isURL(val)) setUrl(val);
    if (isPubId(val)) getUrlByPub(val).then((res) => setUrl(res));
  }, [val]);

  return url;
};
