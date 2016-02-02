import Component from 'react-pure-render/component';
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import img1 from '../../images/img1.jpg';
import orbsa40sec from '../../media/orbsa_40sec.mp4';

var boot;
if(typeof window !== 'undefined') {
  let $ = require('jquery');
  window.$ = window.jQuery = $;
  require('bootstrap');
  boot = require('../lib/js/jquery.main.js');
}

export default class Hero extends Component {
  setupVideo() {
    if(boot) {
      boot();
      picturefill();
    }
  }

  componentDidMount() {
    this.setupVideo();
  }

  componentDidUpdate() {
    this.setupVideo();
  }

  render() {
    return (
      <div className="hero-block text-center" style={{backgroundImage: 'url(' + img1  + ')'}}>
        <div className="video-area">
          <video muted width="640" height="360" poster={img1} preload="metadata" autoPlay src={orbsa40sec} />
        </div>
        <div className="hero-holder">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <strong className="title">Orbsa Connects the Dots</strong>
                <h1>World Leading Subscription Commerce Platform</h1>
                <Link to="/signup" className="btn btn-primary">Sign-Up For Free</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
