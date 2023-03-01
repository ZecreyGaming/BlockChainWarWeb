import ImgBox from "components/common/img";
import Modal from "components/common/modal";
import { BetweenFlex, CenterFlex, PrimaryBtn } from "styles/globals";
import {
  Btn,
  FreeText,
  Info,
  Input,
  RegsiterForm,
  ResultWrap,
  SuffixWrap,
  Total,
} from "./styles";
import User from "assets/icons/user-alt.svg";
import classNames from "classnames";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DEFAULT_SUFFIX, DEFAULT_TOKEN } from "config";
import Warn from "assets/icons/warn-alt.svg";
import Spinner from "assets/icons/spinner.svg";
import Check from "assets/icons/check.svg";
import Gift from "assets/icons/gift.svg";
import File from "assets/icons/file.svg";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { BigNumber } from "ethers";
import { registerWithDiscount } from "utils/register-l2";
import { formatUnits, isAddress } from "ethers/lib/utils";
import TokenIcon from "components/common/token-icon";
import LoadingWrap from "components/common/modal/LoadingWrap";
import { getUserByName } from "utils/connect-wallet";
import { updateUser } from "redux/feature/wallet";
import { SDK } from "@zecrey/zecrey-legend-js-sdk";

const RegisterL2 = (props: { close: () => void }) => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);

  return (
    <>
      <Modal label="Register Zecrey Layer-2" close={props.close} width={600}>
        {page === 1 && (
          <Form value={value} setValue={setValue} next={() => setPage(2)} />
        )}
        {page === 2 && <Confirm name={value} next={() => setPage(3)} />}
        {page === 3 && <Pending name={value} />}
      </Modal>
    </>
  );
};

export default RegisterL2;

const sdk = new SDK();
sdk.initial();

const Form = (props: {
  value: string;
  setValue: (val: string) => void;
  next: () => void;
}) => {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState("");
  const [err, setErr] = useState("");
  const [checked, setChecked] = useState("");
  const { suffix } = useSelector((state: RootState) => state.config);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    setErr("");
    setChecked("");
    let reg = new RegExp(/^[0-9a-zA-Z]*$/);
    if (reg.test(val) && val.length <= 32) props.setValue(val);
    if (val && val.length < 3) setErr("Name too short. (3~32 characters)");
    if (val && val.length >= 3 && val.length <= 32 && reg.test(val))
      func(val, suffix);
  };

  const func = useRef(
    debounce(async (value: string, suffix: string) => {
      if (value.length < 3 || value.length > 32)
        return console.log("Invalid length of name.");
      if (!(global as any).getAccountNameHash)
        return setErr("No wasm module found.");
      setLoading("Checking Account ID…");
      try {
        let isTaken = await sdk.ifAccountRegistered(value + suffix);
        if (isTaken) {
          setErr(value + suffix + " already registered.");
          setChecked("");
        } else {
          setChecked(value + suffix + " is available.");
          setErr("");
        }
      } catch (err: any) {
        setErr(err.message);
        setChecked("");
      } finally {
        setLoading("");
      }
    }, 500)
  ).current;

  return (
    <RegsiterForm className="register-wrap">
      <CenterFlex className="card">
        <ImgBox
          src="/static/image/legend-logo.png"
          alt=""
          width={80}
          height={80}
        />
        <div className="text">
          <div className="main">
            Zecrey NFT Market is developed based on Zecrey Legend system. Before
            getting started, you need to sign up for a Legend account.
          </div>
          <div className="sub">
            Account ID will permanently correspond to your Layer-1 address.
          </div>
        </div>
      </CenterFlex>
      <Input>
        <BetweenFlex className="title">
          <div className="label">Set Account ID</div>
          <User />
        </BetweenFlex>
        <SuffixWrap className={classNames("input", { focused })}>
          <input
            className="input-with-prefix"
            type="text"
            placeholder="Account ID"
            value={props.value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <span className="suffix">{DEFAULT_SUFFIX}</span>
        </SuffixWrap>
        {loading && (
          <div className="msg loading">
            <Spinner className="spinner spin" /> {loading}
          </div>
        )}
        {err && (
          <div className="msg err">
            <Warn className="warn" /> {err}
          </div>
        )}
        {checked && (
          <div className="msg success">
            <Check /> {checked}
          </div>
        )}
        {!loading && !err && !checked && <div className="msg"></div>}
      </Input>
      <Btn className="submit-btn">
        <PrimaryBtn disabled={!checked} onClick={props.next}>
          Register
        </PrimaryBtn>
      </Btn>
    </RegsiterForm>
  );
};

const Confirm = (props: { name: string; next: () => void }) => {
  const [price, setPrice] = useState("");
  const { suffix } = useSelector((state: RootState) => state.config);

  const func = useRef(
    debounce((name: string) => {
      if (name.length < 3 || name.length > 32)
        return console.log("Invalid length of name.");
      sdk
        .getRegisterFee(props.name)
        .then((res) => setPrice(formatUnits(BigNumber.from(res), 18)));
    }, 100)
  ).current;

  useEffect(() => {
    func(props.name);
  }, [props.name, func]);

  return (
    <>
      <Info>
        <BetweenFlex className="header">
          <div className="label">Checkout</div>
          <File />
        </BetweenFlex>
        <BetweenFlex className="info">
          <div className="label">Account ID:</div>
          <div className="value name">
            {props.name}
            {suffix}
          </div>
        </BetweenFlex>
        <BetweenFlex className="info">
          <div className="label">Price:</div>
          <CenterFlex className="value price">
            <TokenIcon chain="binance" size={20} />
            {price || "..."} {DEFAULT_TOKEN.symbol}
          </CenterFlex>
        </BetweenFlex>
        <BetweenFlex className="info">
          <div className="label">Discount:</div>
          <div className="value discount">
            {price ? -price : "..."} {DEFAULT_TOKEN.symbol}
          </div>
        </BetweenFlex>
      </Info>
      {/* <FreeText>
        <Gift />
        <div>
          Account ID is not free to register, but the first 10,000 register
          users will get a 100% discount, which means you can register for an{" "}
          <b>Account ID for free!</b>
        </div>
      </FreeText> */}
      {/* <Total>
        <div className="label">You will pay:</div>
        <CenterFlex>
          <div>
            <div className="main">0.00 {DEFAULT_TOKEN.symbol}</div>
            <div className="sub">$ 0.00</div>
          </div>
          <TokenIcon chain="binance" size={40} />
        </CenterFlex>
      </Total> */}
      <Btn>
        <PrimaryBtn onClick={props.next}>Confirm</PrimaryBtn>
      </Btn>
    </>
  );
};

const Pending = (props: { name: string }) => {
  const [done, setDone] = useState<boolean | null>(null);
  const [err, setErr] = useState("");
  const { selectedAddress, pk, type } = useSelector(
    (state: RootState) => state.wallet
  );
  const dispatch = useDispatch();

  const register = useRef(
    debounce((name: string, addr: string, pk: string) => {
      registerWithDiscount(name, pk, addr, type)
        .then(() => {
          let timer = setInterval(() => {
            getUserByName(name)
              .then((user) => {
                setDone(true);
                dispatch(updateUser(user));
                clearInterval(timer);
              })
              .catch(() => console.log("Fetch new account from tables..."));
          }, 3 * 1000);
        })
        .catch((err) => {
          setDone(false);
          setErr(err.response?.data || err.message);
        });
    }, 200)
  ).current;

  useEffect(() => {
    if (props.name && isAddress(selectedAddress) && pk)
      register(props.name, selectedAddress, pk);
  }, [props.name, selectedAddress, pk, register]);

  return (
    <ResultWrap>
      <LoadingWrap
        success={done === true}
        failed={done === false}
        label={
          done === null
            ? "Register…"
            : done
            ? "Register success!"
            : "Register fails."
        }
        subLabel={done === null ? "Request is in progress." : done ? "" : err}
      />
      <Btn style={{ height: "3rem" }}></Btn>
    </ResultWrap>
  );
};
