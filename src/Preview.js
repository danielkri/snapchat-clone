import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import { v4 as uuid } from "uuid";
import {
  db,
  storage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "./firebase";
import { uploadString } from "firebase/storage";
import "./Preview.css";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { selectUser } from "./features/appSlice";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      navigate("/", { replace: true });
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const metadata = {
      contentType: "image/jpeg",
    };

    const id = uuid();
    const storageRef = ref(storage, `posts/${id}`);
    const uploadTask = uploadBytesResumable(
      storageRef,
      cameraImage,
      "data_url"
    );
    // uploadTask.on(
    //   "state_changed",
    uploadString(storageRef, cameraImage, "data_url").then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const docRef = addDoc(collection(db, "posts"), {
          imageUrl: url,
          username: user.username,
          read: false,
          timestamp: serverTimestamp(),
          profilePic: user.profilePic,
        });
        navigate("/chats", { replace: true });
      });
    });
  };

  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon className="preview__sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
