import React from "react";
import Header from "../../starters/header.js";
import Footer from "../../starters/footer.js";
import DskImg from "../Contact/imagesOfOwner/dsk.jpg";
import NimishImg from "../Contact/imagesOfOwner/nimish.jpeg";
import AbhijitImg from "../Contact/imagesOfOwner/abhi.jpeg";
import DNALogo from "../../assets/logo.png";
import { Grid } from "@material-ui/core";

export default function AboutUs() {
  return (
    <>
      <Header />
      <div>
        <section id="banner" style={{ backgroundColor: "#ff084e" }}>
          <div className="inner">
            <header>
              <h1>DNA Match</h1>
              <p>
                <b style={{ color: "white" }}>DNA Match</b> platform is
                dedicated to help people find their best clothes. Our vision is
                to create a better everyday life for people. Our project idea is
                to let people try clothes virtually before buying so they would
                have a perfect idea of how the product would look on them. Using
                industry standard ML algorithm, the tried on clothes look like
                they are real. We hope that you like what we are trying to
                achieve.
              </p>

              <p>
                <b style={{ color: "white" }}>Thank you for visiting!!</b>
              </p>
            </header>
          </div>
        </section>
        <div id="main">
          {/* Section */}
          <section className="wrapper style1">
            <div className="inner">
              {/* 2 Columns */}
              <Grid container>
                <Grid
                  item
                  style={{ paddingLeft: 40 }}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <a href="/" className="link">
                    <img width={350} src={DNALogo} alt="" />
                  </a>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <h2 className="font-black text-4xl md:mt-16 text-center md:text-left ">
                    Our Features
                  </h2>
                  <p
                    className="text-lg md:text-xl font-bold text-center"
                    style={{ margin: 0 }}
                  >
                    Virtual Clothes Try On
                  </p>
                  <p
                    className="text-lg md:text-xl font-bold text-center"
                    style={{ margin: 0 }}
                  >
                    Mobile Compatibility
                  </p>

                  <p
                    className="text-lg md:text-xl font-bold text-center"
                    style={{ margin: 0 }}
                  >
                    Accessible to All Users.
                  </p>
                  <p
                    className="text-lg md:text-xl font-bold text-center"
                    style={{ margin: 0 }}
                  >
                    Well Planned Information Architecture.
                  </p>
                  <p
                    className="text-lg md:text-xl font-bold text-center"
                    style={{ margin: 0 }}
                  >
                    Fast Load Times.
                  </p>
                  <p
                    className="text-lg md:text-xl font-bold text-center"
                    style={{ margin: 0 }}
                  >
                    Effective Navigation.
                  </p>
                </Grid>
              </Grid>
            </div>
          </section>
          {/* Section */}

          {/* Section */}
          <section className="wrapper style1">
            <div className="inner">
              <header className="align-center">
                <h2>Meet our Leaders</h2>
              </header>
              <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div className="col align-center">
                    <div className="image round fit">
                      <img src={DskImg} alt="" />
                    </div>
                    <p className="text-black font-black">
                      To succeed in an environment of growth and excellence and
                      earn a job which provides me job satisfaction and
                      self-development and help me to achieve personal as well
                      as organizational goals.
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div className="col align-center">
                    <div className="image round fit">
                      <img src={NimishImg} alt="" />
                    </div>
                    <p className="text-black font-black">
                      Tech enthusiast with will to try out new things without
                      hesitation. Linux lover. Loves to try out new Operating
                      Systems/ROMs/kernels on mobile and laptop. Full stack Web
                      Developer. Competitive Coder.
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div className="col align-center">
                    <div className="image round fit">
                      <img src={AbhijitImg} alt="" />
                    </div>
                    <p className="text-black font-black">
                      To secure a challenging position in a reputable
                      organization to expand my learnings, knowledge, and
                      skills. Secure a responsible career opportunity to fully
                      utilize my training and skills, while making a significant
                      contribution to the success of the company.
                    </p>
                  </div>
                </Grid>
              </Grid>
              <div className="flex flex-row">
                <div className="flex-1"></div>
                <a href="/contactus" className="button">
                  Learn More
                </a>
                <div className="flex-1"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
