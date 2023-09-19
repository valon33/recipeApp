import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../features/auth/authSlice";

const SignUp = () => {
  const { user } = useSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    lastName: "",
    birthDay: "",
  });
  const { email, password, passwordConfirm, name, lastName, birthDay } =
    inputValue;
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    user && navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const SubmitSignUp = async (e) => {
    e.preventDefault();
    dispatch(signUp(inputValue));
    navigate('/')
  };

  return (
    <MainLayout>
      <PageTitle description="Sign Up" />
      <div className="signup">
        <div className="signup__description">
          <h2 className="signup__description--heading">
            <span>Create your</span>
            <br />
            <span
              style={{
                fontWeight: 900,
              }}
            >
              account
            </span>
          </h2>
          <p className="signup__description--text">
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true generator
            on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate
            Lorem Ipsum which looks reasonable.
          </p>
        </div>

        <div className="signup__form">
          <form
            className="row g-3 "
            onSubmit={(e) => SubmitSignUp(e)}
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div style={{ width: "50%", padding: "5px" }}>
              <Input
                name="name"
                inputType="text"
                inputId="first-name"
                placeholder="John"
                inputLabel="First Name"
                onChange={handleChange}
                value={name}
              />
              <Input
                name="lastName"
                inputType="text"
                inputId="last-name"
                placeholder="Doe"
                inputLabel="Last Name"
                onChange={handleChange}
                value={lastName}
              />
              <Input
                name="email"
                inputType="email"
                inputId="email"
                placeholder="johndoe@example.com"
                inputLabel="Email"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div style={{ width: "50%", padding: "5px" }}>
              <Input
                name="birthDay"
                inputType="date"
                inputId="birth-day"
                placeholder={"display From"}
                inputLabel="Birth Day"
                onChange={handleChange}
                value={birthDay}
              />
              <Input
                name="password"
                inputType="password"
                inputId="password"
                placeholder="***********"
                inputLabel="Password"
                onChange={handleChange}
                value={password}
              />
              <Input
                name="passwordConfirm"
                inputType="password"
                inputId="password-confirm"
                placeholder="***********"
                inputLabel="Password Confirm"
                onChange={handleChange}
                value={passwordConfirm}
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary button green signup__btn"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignUp;
