import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";

const MyProfile = () => {
    return (
        <MainLayout>
            <PageTitle description="My Profile" />
            <div className="myprofile">
                <div className="myprofile__photo">
                    <img
                        src={
                            "https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png"
                        }
                        alt="Avatar"
                        className="avatar"
                    />
                    <Input
                        inputType="file"
                        inputId="myfile"
                        inputLabel="Change Avatar"
                        // placeholder="Choose Photo"
                    />
                </div>

                <div className="signup__form">
                    <form
                        className="row g-3 "
                        onSubmit={(e) => console.log("Submiting...")}
                        style={{ display: "flex", flexWrap: "wrap" }}
                    >
                        <div style={{ width: "50%", padding: "5px" }}>
                            <Input
                                inputType="text"
                                inputId="first-name"
                                inputLabel="First Name"
                                placeholder="John"
                            />
                            <Input
                                inputType="text"
                                inputId="last-name"
                                inputLabel="Last Name"
                                placeholder="Doe"
                            />
                            <Input
                                inputType="email"
                                inputId="email"
                                inputLabel="Email"
                                placeholder="johndoe@example.com"
                            />
                        </div>

                        <div style={{ width: "50%", padding: "5px" }}>
                            <Input
                                inputType="date"
                                inputId="birth-day"
                                inputLabel="Birth Day"
                                placeholder="displayFrom"
                            />
                            <Input
                                inputType="password"
                                inputId="password"
                                inputLabel="Password"
                                placeholder="*******"
                            />
                            <Input
                                inputType="password"
                                inputId="password confirm"
                                inputLabel="Password Confirm"
                                placeholder="*******"
                            />
                        </div>

                        <div className="col-12">
                            <button
                                type="submit"
                                className="btn btn-primary button green signup__btn"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default MyProfile;
