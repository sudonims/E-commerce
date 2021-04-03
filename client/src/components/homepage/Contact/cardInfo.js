import React from "react";

function cardInfo(props) {
  return (
    <div className="body">
      <div className="card">
        <div className="top">
          <h2 className="name">{props.name}</h2>
          <img className="circle-img" src={props.img} alt="avatar_img" />
        </div>
        <div className="bottom flex flex-col">
          <p className="text-white font-black">
            Contact No : &nbsp;
            <a href={`tel:${props.phone}`} className="info no-underline	">
              {props.phone}
            </a>
          </p>
          <div className="flex flex-row justify-start justify-items-start">
            <p className="text-white font-black">Email: </p>
            <a
              href={`mailto:${props.email}`}
              className="text-white font-bold no-underline left-0"
            >
              {props.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default cardInfo;
