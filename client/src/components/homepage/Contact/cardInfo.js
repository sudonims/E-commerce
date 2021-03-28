import React from "react";

function cardInfo(props) {
  return (
    <div className="body">
      <div className="card">
        <div className="top">
          <h2 className="name">{props.name}</h2>
          <img className="circle-img" src={props.img} alt="avatar_img" />
        </div>
        <div className="bottom">
          <p className="text-white font-black">
            Contact No : &nbsp;
            <a href={`tel:${props.phone}`} className="info no-underline	">
              {props.phone}
            </a>
          </p>
          <p className="text-white font-black">
            Email : &nbsp;
            <a href={`mailto:${props.email}`} className="info no-underline	">
              {props.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default cardInfo;
