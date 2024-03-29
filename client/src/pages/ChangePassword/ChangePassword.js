import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";
import { useDispatch } from "react-redux";
import { changeUserPassword } from "../../features/auth/authSlice";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const submitChangePassword = (e) => {
    e.preventDefault();
    dispatch(
      changeUserPassword({
        oldPassword,
        password,
        passwordConfirm,
      })
    );
  };

  return (
    <MainLayout>
      <PageTitle
        description="Change Password"
        logo={
          <TiArrowBack
            onClick={() => navigate("/myprofile")}
            style={{ cursor: "pointer" }}
          />
        }
      />
      <div className="changepassword">
        <form
          className="changepassword__form"
          onSubmit={(e) => submitChangePassword(e)}
        >
          <div className="changepassword__form-inputs">
            <Input
              inputType="password"
              inputId="oldPassword"
              inputLabel="Old Password"
              placeholder="*******"
              name="oldPassword"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
            />
            <Input
              inputType="password"
              inputId="password"
              inputLabel="Password"
              placeholder="*******"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Input
              inputType="password"
              inputId="passwordConfirm"
              inputLabel="Password Confirm"
              placeholder="*******"
              name="passwordConfirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
            />
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary button green signup__btn"
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ChangePassword;
