import React from 'react';
import Head from '../../header.js';
import Info from './info.js';
import Card from './cardInfo.js';


const createCard = (info) =>{
  return (
    <>
       <Card
    name={info.name}
    email={info.email}
    phone={info.phone}
    
    img={info.img}/>
    </>
  );
}

const ContactUs = () =>{
  console.log(Info);
    return (

        <>
        <Head />
        {Info.map(createCard)}
        </>
    )
}

export default ContactUs;