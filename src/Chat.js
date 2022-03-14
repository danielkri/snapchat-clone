import { Avatar } from "@material-ui/core";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import { collection, db } from "./firebase";
import React from "react";
import { useDispatch } from "react-redux";
import ReactTimeago from "react-timeago";
import "./Chat.css";
import { selectImage } from "./features/appSlice";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Chat({ id, profilePic, username, timestamp, imageUrl, read }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));

      console.log();
      setDoc(
        doc(db, "posts", id),
        {
          read: true,
        },
        { merge: true }
      );

      navigate("/chats/view");
    }
  };
  return (
    <div onClick={open} className="chat">
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>

      {!read && <StopRoundedIcon className="chat__readIcon" />}
    </div>
  );
}

export default Chat;
