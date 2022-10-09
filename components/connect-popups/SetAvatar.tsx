import classNames from "classnames";
import Avatar from "components/common/avatar";
import WhiteModal from "components/common/modal/WhiteModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { CenterFlex, FlatBtn } from "styles/globals";
import { AvatarList, BottomBtn } from "./styles";
import Check from "assets/icons/check-alt.svg";
import { useEffect, useState } from "react";
import { proveUpdateAccount } from "utils/legend-api/proof";
import { getIdByUrl } from "utils/hooks/api/media";
import { updateAccount } from "utils/legend-api/create-account";
import { updateUser } from "redux/feature/wallet";

const SetAvatar = (props: { close: () => void }) => {
  const [val, setVal] = useState("");
  const { user } = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch();
  const { links } = useLinks([
    user?.links.twitter || "",
    user?.links.telegram || "",
  ]);

  useEffect(() => {
    setVal(user?.avatar || urls[0]);
  }, [user]);

  const submit = async () => {
    props.close();
    if (!user) throw new Error("User not found.");
    if (!val) throw new Error("Please select an avatar.");
    if (val === user.avatar) return props.close();
    try {
      let timestamp = Math.floor(Date.now() / 1000);
      console.log(user.banner, "banner");
      let [signature, avatar, origin_banner] = await Promise.all([
        proveUpdateAccount(timestamp, user.name),
        getOriginID("avatar", val),
        getOriginID("banner", user.banner),
      ]);
      await updateAccount({
        signature,
        timestamp,
        profile_image: avatar,
        banner_image: origin_banner,
        account_name: user.name, // account_name
        bio: "", // bio
        email: "", // email
        external_link: links[0],
        twitter_link: links[1],
        instagram_link: links[2],
      });
      dispatch(
        updateUser({
          ...user,
          avatar: val,
          banner: user.banner,
          links: {
            ...user.links,
            official: user.links.official || links[0],
            twitter: user.links.twitter || links[1],
            instagram: user.links.instagram || links[2],
          },
        })
      );
    } catch (err) {
      throw err;
    }
  };

  return (
    <WhiteModal close={props.close} disabled>
      <AvatarList>
        <div className="wrap">
          <CenterFlex className="current">
            <Avatar url={val} size={80} />
            <div className="username">
              <label>{user?.name}</label>
              <span>Choose your avatar:</span>
            </div>
          </CenterFlex>
          <div className="list">
            {urls.map((i, index) => (
              <FlatBtn
                key={index}
                className={classNames({ ac: i === val })}
                style={{ backgroundImage: `url(${i})` }}
                onClick={() => setVal(i)}
              >
                {i === val && <Check />}
              </FlatBtn>
            ))}
          </div>
        </div>
        <BottomBtn onClick={submit}>Confirm</BottomBtn>
      </AvatarList>
    </WhiteModal>
  );
};

export default SetAvatar;

// dev
const urls = [
  "https://res.cloudinary.com/zecrey/image/upload/v1665211502/collection/pywyrz76yrdemnlnlfls.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665211502/collection/kbbvkuti0chjjiqrd8li.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665211994/collection/hn6bmzpz2vftnbd7mpem.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665211994/collection/nyfgmu6byp6obny2dedb.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212292/collection/x6xdxozl2efrcpix7xqx.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212292/collection/ufqzqdbdnfl0ay0p9yxn.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212321/collection/la7uitut437pn53psluy.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212321/collection/ibcrmeiwx9hv5aklmezq.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212352/collection/uxubkqgu8lqujxusg2gc.jpg",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212352/collection/c3cyuni7wezhe3jeunox.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212385/collection/hljdepb5yq3u85fpfefy.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212385/collection/n1nsgup1qpgipaiemaml.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212426/collection/msvmlaqho1afq8xrk4ag.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212426/collection/p16grfwpaj9ru7ggrfgr.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212456/collection/qynofrr2sjs76s4zsovj.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212456/collection/gmsh1vynv0c10zt9sdtk.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212488/collection/h3bqdwu7e6wzr8ocvuzb.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212488/collection/hfcph2wgl8qkrzrlyvr6.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212514/collection/jeajmh1mmjbv47gz4wcf.png",
  "https://res.cloudinary.com/zecrey/image/upload/v1665212514/collection/hjfwpxmhw6cdmyo7wgrx.png",
];

// test
// const urls = [
//   "https://res.cloudinary.com/zecrey/image/upload/v1661248112/collection/mchcvmr7edtafsrfvmhl.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536598/collection/lmgdlobkiekphzqixe7e.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536598/collection/hzwfoiltfinwepitzyn2.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536643/collection/ywy7biqxcakx4kc3gvf1.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536643/collection/ffpois2j6raiofq2rxqx.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1661247992/collection/ar4mk2drgjinqts0fg0f.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536680/collection/ddoizr1cbofbf4msl0fn.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536680/collection/hpjqab1bshxifgud1mc8.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536727/collection/ekj1ryyict6p2n6unpte.jpg",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536727/collection/eadkhzicymgu4z4ocnpd.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536766/collection/yxu7sii6rz61mla8ad0c.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536766/collection/eeqg6menfzetasszwqmc.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536804/collection/tns16iug9wqvrx94mrmt.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536804/collection/nvqlxivqovwc9pktnnlh.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536835/collection/earo3qvmkl6s4jwjsdw9.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536835/collection/ogcvx2ojvxgjr7xafgra.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536867/collection/kr8ss3z7vb6zvdkzn2oe.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536867/collection/s7yverpbqvw44tsagejo.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536893/collection/xon3f4angnxi1fsg6cer.png",
//   "https://res.cloudinary.com/zecrey/image/upload/v1664536893/collection/recpltns8uypheqfl1oq.png",
// ];

const useLinks = (initial?: string[]) => {
  const [links, setLinks] = useState(initial || ["", ""]);

  const handle = (val: string, index: number) => {
    if (links[index] === undefined) return;
    setLinks(links.splice(index, 1, val));
  };

  return { links, handle };
};

const getOriginID = async (type: "avatar" | "banner", url?: string) => {
  if (!url || url.startsWith("/static/image/default"))
    return type === "avatar"
      ? "collection/ufqzqdbdnfl0ay0p9yxn" // dev
      : "collection/fr6c5jhvunvc7euczsh7"; // dev
  return await getIdByUrl(url);
};
