import Component from 'react-pure-render/component';
import React from 'react';
import logoFooter from '../../images/logo-footer.png';

export default class Footer extends Component {
  render() {
    return (
      <div className="bottom-container">
        <nav className="footer-nav container">
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-2 nav-holder">
              <h3>HR Services</h3>
              <ul className="list-unstyled">
                <li><a href="#">Payroll</a></li>
                <li><a href="#">Health Insurance</a></li>
                <li><a href="#">Employee Benefits</a></li>
                <li><a href="#">Compliance</a></li>
                <li><a href="#">HR Outsourcing</a></li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-2 nav-holder">
              <h3>HR Software</h3>
              <ul className="list-unstyled">
                <li><a href="#">HR Cloud Platform</a></li>
                <li><a href="#">HRIS Software</a></li>
                <li><a href="#">Reports &amp; Analytics</a></li>
                <li><a href="#">Onboarding</a></li>
                <li><a href="#">Benefits Admin</a></li>
                <li><a href="#">Vacation &amp; PTO</a></li>
                <li><a href="#">Time &amp; Attendance</a></li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-2 nav-holder">
              <h3>Support</h3>
              <ul className="list-unstyled">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Support</a></li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-2 nav-holder">
              <h3>Resources</h3>
              <ul className="list-unstyled">
                <li><a href="#">Blog</a></li>
                <li><a href="#">HR Answers</a></li>
                <li><a href="#">Broker Comparison</a></li>
                <li><a href="#">White Papers</a></li>
                <li><a href="#">Customers</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-2 nav-holder">
              <h3>Company</h3>
              <a href="tel:8882493263" className="tel">(888) 249-3263</a>
              <ul className="list-unstyled">
                <li><a href="#">Press</a></li>
                <li><a href="#">Events</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <footer id="footer">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <strong className="pull-left logo"><a href="#"><img src={logoFooter} alt="Orbsa" /></a></strong>
                <p className="pull-right">&copy; 2015 ORBSA co.<br /><a href="#">Terms</a> | <a href="#">Privacy</a> | <a href="#">Insurance</a> | <a href="#">Carriers</a></p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

}
