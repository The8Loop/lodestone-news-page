import React from "react";
import "./news-post.css";

export function NewsPost(props) {
  return (
    <div className="news-post">
      <a href={props.lodestoneDataRXJSn.url}>
        <img
          src={props.lodestoneDataRXJSn.image}
          alt={props.lodestoneDataRXJSn.title}
        ></img>
      </a>
      <div>{props.lodestoneDataRXJSn.time}</div>
      <div>{props.lodestoneDataRXJSn.description}</div>
    </div>
  );
}
