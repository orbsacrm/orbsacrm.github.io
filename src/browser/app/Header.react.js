import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import img1 from '../../images/img1.jpg';
import logo from '../../images/logo.png';
import orbsa40sec from '../../media/orbsa_40sec.mp4';

export default class Header extends Component {
  render() {
    return (
      <div className="top-container">
        <div className="hero-block text-center" style={{backgroundImage: 'url(' + img1  + ')'}}>
          <div className="video-area">
            <video width="640" height="360" poster={img1} preload="metadata" autoPlay loop>
              <source type="video/mp4" src={orbsa40sec}></source>
            </video>
          </div>
          <div className="hero-holder">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <strong className="title">Orbsa Connects the Dots</strong>
                  <h1>World's Leading Subscription Commerce Platform</h1>
                  <a href="#" className="btn btn-primary">Sign-Up For Free</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-trigger">&nbsp;</div>
        <header id="header">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <nav className="navbar navbar-default">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" style={{padding: 0}} href="#"><img src={logo} alt="Orbsa" /></a>
                  </div>
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                      <li><a href="/pricing.html">Pricing</a></li>
                      <li><a href="https://orbsa.readme.io">Developers</a></li>
                    </ul>
                    <div className="nav navbar-nav navbar-right">
                      <a href="#">Log-in</a> or
                      <a href="#" className="btn btn-default">Sign-up</a>
                    </div>
                    <a href="#" className="btn btn-primary btn-demo">Request a Demo</a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

}
