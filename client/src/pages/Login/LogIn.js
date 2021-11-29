import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SubmitLogin = () => console.log("Submiting ...");

  return (
    <MainLayout>
      <PageTitle description="Sign In" />
      <div className="login">
        <div className="login__description">
          <h2 className="login__description--heading">
            <span className="orange">Welcome to </span>
            <span>Baby's</span>
          </h2>
          <p className="login__description--text">
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true generator
            on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate
            Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
            therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </p>
        </div>

        <div className="login__form">
          <form className="login__form--box" onSubmit={(e) => SubmitLogin(e)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label login__form--label">
                Email address
              </label>
              <input
                type="email"
                className="form-control login__form--input"
                id="email"
                placeholder="johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label login__form--label"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control login__form--input"
                id="password"
                placeholder="*******"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <Input inputType="name" inputLabel="Name" />

            <button
              type="submit"
              className="btn btn-primary button green login__btn"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default LogIn;
