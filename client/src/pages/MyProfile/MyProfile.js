import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import { uploadPhoto } from "../../features/util/utilSlice";

const MyProfile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImg, setPreviewImg] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthDay] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setLastName(currentUser.lastName);
            setEmail(currentUser.email);
            setBirthDay(currentUser.birthday);
            setPhoto(currentUser.photo || "");
        }
    }, [currentUser]);

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
        const id = currentUser._id;
        if (selectedFile) {
            let photo = selectedFile.name;
            dispatch(uploadPhoto({selectedPhoto:selectedFile, photoName:photo}));
            dispatch(
                updateUser({
                    id,
                    name,
                    email,
                    lastName,
                    birthday,
                    photo,
                })
            );
        } else {
            dispatch(
                updateUser({
                    id,
                    name,
                    email,
                    lastName,
                    birthday,
                })
            );
        }
    };

    return (
        <MainLayout>
            <PageTitle description="My Profile" />
            <div className="myprofile">
                <div className="myprofile__photo">
                    <img
                        src={
                            photo && !previewImg
                                ? `https://res.cloudinary.com/valonsaidi/image/upload/${photo}`
                                : previewImg ||
                                  (!photo &&
                                      !previewImg &&
                                      "./images/default.jpg")
                        }
                        loading="lazy"
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
                                inputId="name"
                                inputLabel="First Name"
                                placeholder="John"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />

                            <Input
                                inputType="email"
                                inputId="email"
                                inputLabel="Email"
                                placeholder="johndoe@example.com"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div style={{ width: "50%", padding: "5px" }}>
                            <Input
                                inputType="text"
                                inputId="lastName"
                                inputLabel="Last Name"
                                placeholder="Doe"
                                name="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />

                            <Input
                                inputType="date"
                                inputId="birthday"
                                inputLabel="Birth Day"
                                name="birthday"
                                onChange={(e) => setBirthDay(e.target.value)}
                                value={birthday.split("T")[0]}
                            />
                        </div>

                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                gap: "15px",
                                justifyContent: "space-between",
                                alignItems: "end",
                            }}
                        >
                            <button
                                type="submit"
                                className="btn btn-primary button green signup__btn"
                            >
                                Save
                            </button>
                            <div className="myprofile__change-password">
                                <Link to={"/change-password"}>
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default MyProfile;
