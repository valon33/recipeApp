import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import { uploadPhoto } from "../../features/util/utilSlice";
// import "react-datepicker/dist/react-datepicker.css";

const MyProfile = () => {
  const { user: currentUser, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [photo, setPhoto] = useState("");

  console.log("wtf", currentUser);
  console.log("birthday", birthday);
  console.log(
    "birthday Converted",
    `${new Date(birthday).getDate()}-${
      new Date(birthday).getMonth() + 1
    }-${new Date(birthday).getFullYear()}`
  );

  useEffect(() => {
    setName(currentUser.name);
    setLastName(currentUser.lastName);
    setEmail(currentUser.email);
    setBirthDay(currentUser.birthday);
    setPhoto(currentUser.photo || "");
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
      dispatch(uploadPhoto(selectedFile));
      dispatch(
        updateUser({
          id,
          name,
          email,
          lastName,
          birthday,
          password,
          passwordConfirm,
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
          password,
          passwordConfirm,
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
            src={"./images/default.jpg"}
            //   photo && !previewImg
            //     ? `http://localhost:5000/api/v1/upload/${photo}`
            //     : previewImg ||
            //       (!photo && !previewImg && "./images/default.jpg")
            //   // "https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png")
            // }
            // loading="lazy"
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
                inputType="text"
                inputId="lastName"
                inputLabel="Last Name"
                placeholder="Doe"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
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
                inputType="date"
                inputId="birthday"
                inputLabel="Birth Day"
                name="birthday"
                onChange={(e) => setBirthDay(e.target.value)}
                value={birthday}
                // value={`${new Date(birthday).getFullYear()}-${
                //   new Date(birthday).getMonth() + 1
                // }-${new Date(birthday).getDate()}`}
              />
              {/* <div className="date">
                <DatePicker
                  selected={birthday}
                  onChange={(date) => setBirthDay(date)}
                  showTimeSelect
                  className="date"
                />
              </div> */}
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
