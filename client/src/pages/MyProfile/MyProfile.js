import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";
import { useGlobalContext } from "../../Context/context";

const MyProfile = () => {
    const { currentUser, updatUser, uploadPhoto } = useGlobalContext();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImg, setPreviewImg] = useState("");
    const [inputValue, setInputValue] = useState({
        name: "",
        lastName: "",
        email: "",
        birthday: "",
        password: "",
        passwordConfirm: "",
    });
    console.log("wtf", currentUser);

    const { name, lastName, email, birthday, password, passwordConfirm } =
        inputValue;

    useEffect(() => {
        setInputValue((prev) => ({
            ...prev,
            name: currentUser.name,
            lastName: currentUser.lastName,
            email: currentUser.email,
            birthday: currentUser.birthday,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    }, [selectedFile]);

    const submitUpdate = (e) => {
        e.preventDefault();
        if (password && passwordConfirm && selectedFile) {
            const photo = selectedFile.name;
            uploadPhoto(selectedFile);
            return updatUser(
                currentUser._id,
                name,
                email,
                lastName,
                birthday,
                photo,
                password,
                passwordConfirm
            );
        }
        if (selectedFile) {
            const photo = selectedFile.name;
            uploadPhoto(selectedFile);
            return updatUser(
                currentUser._id,
                name,
                email,
                lastName,
                birthday,
                photo
            );
        }

        updatUser(currentUser._id, name, email, lastName, birthday);
    };

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
                    <div>
                        <input
                            type="file"
                            id="myfile"
                            name="myfile"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                        <label htmlFor="myfile" className="upload--photo">
                            Upload Photo
                        </label>
                    </div>
                </div>

                <div className="signup__form">
                    <form
                        className="row g-3 "
                        onSubmit={(e) => submitUpdate(e)}
                        style={{ display: "flex", flexWrap: "wrap" }}
                    >
                        <div style={{ width: "50%", padding: "5px" }}>
                            <Input
                                inputType="text"
                                inputId="first-name"
                                inputLabel="First Name"
                                placeholder="John"
                                name="name"
                                onChange={handleChange}
                                value={name}
                            />
                            <Input
                                inputType="text"
                                inputId="last-name"
                                inputLabel="Last Name"
                                placeholder="Doe"
                                name="lastName"
                                onChange={handleChange}
                                value={lastName}
                            />
                            <Input
                                inputType="email"
                                inputId="email"
                                inputLabel="Email"
                                placeholder="johndoe@example.com"
                                name="email"
                                onChange={handleChange}
                                value={email}
                            />
                        </div>

                        <div style={{ width: "50%", padding: "5px" }}>
                            <Input
                                inputType="date"
                                inputId="birth-day"
                                inputLabel="Birth Day"
                                // placeholder="displayFrom"
                                name="birthday"
                                onChange={handleChange}
                                value={`${new Date(
                                    birthday
                                ).getFullYear()}-${new Date(
                                    birthday
                                ).getMonth()}-${new Date(birthday).getDate()}`}
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
