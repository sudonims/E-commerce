import React from "react";
import Head from "../../starters/header.js";
import Info from "./info.js";
import Card from "./cardInfo.js";
import Footer from "../../starters/footer.js";

const createCard = (info, i) => {
  return (
    <Card
      key={i}
      name={info.name}
      email={info.email}
      phone={info.phone}
      img={info.img}
    />
  );
};

const ContactUs = () => {
  return (
    <>
      <Head />
      {Info.map(createCard)}
      <Footer />
    </>
  );
};

export default ContactUs;
