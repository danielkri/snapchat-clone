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

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    uploadString(storageRef, cameraImage, "data_url").then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const docRef = addDoc(collection(db, "posts"), {
            imageUrl: url,
            username: "Danne",
            read: false,
            timestamp: serverTimestamp(),
            //   profilePic,
          });
          navigate("/chats", { replace: true });
        });
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      }
      //   ,
      //   (error) => {
      //     console.log(error);
      //     //   switch (error.code) {
      //     //     case 'storage/unauthorized':
      //     //       break;
      //     //     case 'storage/canceled':
      //     //       break;
      //     //     case 'storage/unknown':
      //     //       break;
      //     //   }
      //   },
      //   () => {
      //     // Upload completed successfully, now we can get the download URL
      //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      //       const docRef = addDoc(collection(db, "posts"), {
      //         imageUrl: url,
      //         username: "Danne",
      //         read: false,
      //         timestamp: serverTimestamp(),
      //         //   profilePic,
      //       });
      //       navigate("/chats", { replace: true });
      //       //   console.log("File available at", url);
      //     });
      //   }
    );
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
