import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";
import Button from "../../components/Button/Button";
import { useGlobalContext } from "../../Context/context";

const LogIn = () => {
  let navigate = useNavigate();
  const { login } = useGlobalContext();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const SubmitLogin = (e) => {
    console.log(email, password);
    e.preventDefault();
    login(email, password);
    navigate("/");
  };

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
            <Input
              name="email"
              inputType="email"
              inputLabel="Email"
              inputId="email"
              placeholder="example@example.com"
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleChange}
              value={email}
            />
            <Input
              name="password"
              inputType="password"
              inputLabel="Password"
              inputId="password"
              placeholder="***********"
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handleChange}
              value={password}
            />

            <Button
              type="submit"
              button="Log In"
              color="green"
              className="mbot-15"
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default LogIn;
