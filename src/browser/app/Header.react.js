import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Hero from './Hero.react';
import img1 from '../../images/img1.jpg';
import logo from '../../images/logo.png';
import orbsa40sec from '../../media/orbsa_40sec.mp4';

export default class Header extends Component {
  render() {
    let hero = this.props.hero ? <Hero /> : '';

    return (
      <div className="top-container">
        {hero}
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
                    <Link className="navbar-brand" style={{padding: 0}} to="/"><img src={logo} alt="Orbsa" /></Link>
                  </div>
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                      <li><a href="#">Pricing</a></li>
                      <li><a href="https://orbsa.readme.io">Developers</a></li>
                    </ul>
                    <div className="nav navbar-nav navbar-right">
                      <a href="#">Log-in</a> or
                      <Link to="signup" className="btn btn-default">Sign-up</Link>
                    </div>
                    <Link to="signup" className="btn btn-primary btn-demo">Request a Demo</Link>
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
