import React from "react";

function cardInfo(props) {
  return (
    <div className='body'>
    <div className="card">
      <div className="top">
        <h2 className="name">{props.name}</h2>
        <img className="circle-img" src={props.img} alt="avatar_img" />
      </div>
      <div className="bottom">
        <p className="info">Contact No : {props.phone}</p>
        <p className="info">Email : {props.email}</p>
      </div>
    </div>
    </div>
  );
}

export default cardInfo;
