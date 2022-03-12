import { Avatar } from "@material-ui/core";
import React from "react";
import "./Chats.css";

function Chats() {
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__avatar" />
      </div>
    </div>
  );
}

export default Chats;
