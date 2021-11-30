import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";
import { useState } from "react";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDay, setBirthDay] = useState(null);

    const SubmitSignUp = async (e) => {
        e.preventDefault();
        console.log("Sign Up !");
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
                        All the Lorem Ipsum generators on the Internet tend to
                        repeat predefined chunks as necessary, making this the
                        first true generator on the Internet. It uses a
                        dictionary of over 200 Latin words, combined with a
                        handful of model sentence structures, to generate Lorem
                        Ipsum which looks reasonable.
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
                                inputType="text"
                                inputId="first-name"
                                placeholder="John"
                                inputLabel="First Name"
                            />
                            <Input
                                inputType="text"
                                inputId="last-name"
                                placeholder="Doe"
                                inputLabel="Last Name"
                            />
                            <Input
                                inputType="email"
                                inputId="email"
                                placeholder="johndoe@example.com"
                                inputLabel="Email"
                            />
                        </div>
                        <div style={{ width: "50%", padding: "5px" }}>
                            <Input
                                inputType="date"
                                inputId="birth-day"
                                placeholder={"display From"}
                                inputLabel="Birth Day"
                            />
                            <Input
                                inputType="password"
                                inputId="password"
                                placeholder="***********"
                                inputLabel="Password"
                            />
                            <Input
                                inputType="password"
                                inputId="password-confirm"
                                placeholder="***********"
                                inputLabel="Password Confirm"
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
