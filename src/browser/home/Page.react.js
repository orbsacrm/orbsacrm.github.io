import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';

import icon1 from '../../images/icon1.svg';
import icon2 from '../../images/icon2.svg';
import icon3 from '../../images/icon3.svg';
import icon4 from '../../images/icon4.svg';
import icon5 from '../../images/icon5.svg';
import icon6 from '../../images/icon6.svg';
import icon7 from '../../images/icon7.svg';
import icon8 from '../../images/icon8.svg';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img3x from '../../images/img3-x.png';
import img4 from '../../images/img4.png';
import img5 from '../../images/img5.png';
import img6 from '../../images/img6.png';
import logo2 from '../../images/logo2.png';
import bg2 from '../../images/bg2.jpg';
import bg3 from '../../images/bg3.png';
import bg4 from '../../images/bg4.jpg';
import bg5 from '../../images/bg5.jpg';

var boot;
if(typeof window !== 'undefined') {
  let $ = require('jquery');
  window.$ = window.jQuery = $;
  require('bootstrap');
  boot = require('../lib/js/jquery.main.js');
}

export default class Page extends Component {
  static propTypes = {
    // Why not PropTypes.object.isRequired? Because:
    // https://github.com/rackt/react-router/issues/1505
    msg: PropTypes.object
  };

  componentDidMount() {
    if(boot) {
      boot();
      picturefill();
    }
  }

  render() {
    const {msg: {home: msg}} = this.props;

    return (
      <div>
        <section className="about-us">
          <div className="container">
            <div className="row">
              <article className="col-xs-12 col-sm-6 col-md-5 article">
                <strong className="title">What we do</strong>
                <h1>Subscription Business Operating System</h1>
                <p>
                  Orbsa has APIs, example applications and third-party integrations
                  for you to build anything and everything you want on top of the
                  Orbsa platform. Imagine the possibilities and take the reins of
                  your subscription business.
                </p>
                <a href="#" className="btn btn-default">What we do</a>
              </article>
              <div className="col-xs-12 col-sm-6 col-md-7 img-holder">
                <img src={img2} alt="image description" />
              </div>
            </div>
          </div>
        </section>

        <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner" role="listbox">
            <div className="item active">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-8 col">
                    <blockquote>
                      <strong className="author"><a href="#">DRIVE CHANGE</a></strong>
                      <q>
                        "We are a data driven company at Shopify. With Insights, we can
                        use all of our customer support data to improve our products."
                      </q>
                      <cite className="clearfix">
                        <span className="author pull-left">– <a href="#">Richard Hall, Trendy Butler</a></span>
                        <strong className="author-logo pull-right"><a href="#"><img src={logo2} width="200" height="95"  alt="Trendy Butler" /></a></strong>
                      </cite>
                    </blockquote>
                  </div>
                  <div className="col-xs-12 col-sm-4 col">
                    <div className="img-holder">
                      <span data-picture data-alt="drive change">
                        <span data-src={img3} ></span>
                        <span data-src={img3x} data-width="442" data-media="(-webkit-min-device-pixel-ratio:1.5), (min-resolution:1.5dppx)" ></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-8 col">
                    <blockquote>
                      <strong className="author"><a href="#">DRIVE CHANGE</a></strong>
                      <q>"We are a data driven company at Shopify. With Insights, we can use all of our customer support data to improve our products."</q>
                      <cite className="clearfix">
                        <span className="author pull-left">– <a href="#">Richard Hall, Trendy Butler</a></span>
                        <strong className="author-logo pull-right"><a href="#"><img src={logo2} width="200" height="95"  alt="Trendy Butler" /></a></strong>
                      </cite>
                    </blockquote>
                  </div>
                  <div className="col-xs-12 col-sm-4 col">
                    <div className="img-holder">
                      <span data-picture data-alt="drive change">
                        <span data-src={img3} ></span>
                        <span data-src={img3x} data-width="442" data-media="(-webkit-min-device-pixel-ratio:1.5), (min-resolution:1.5dppx)" ></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="switchers">
            <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
              <i className="icon-arrow-left"></i>
            </a>
            <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
              <i className="icon-arrow-right"></i>
            </a>
          </div>
        </div>

        <section className="infoarea" style={{backgroundImage: `url(${bg2})`}}>
          <div className="container">
            <div className="row">
              <article className="col-xs-12 col-sm-6 col-md-7 article">
                <strong className="title">Bespoke Billing</strong>
                <h1>Powerful Billing Configuration and Control</h1>
                <ul className="list-unstyled">
                  <li>
                    <i className="icon-check"></i>
                    Browse resumes in your secure online candidate database
                  </li>
                  <li>
                    <i className="icon-check"></i>
                    Access notes, feedback and communication anywhere
                  </li>
                  <li>
                    <i className="icon-check"></i>
                    Send bulk emails and schedule interviews
                  </li>
                </ul>
                <p>Orbsa's got APIs, custom apps, and integrations for you to build anything and everything you want on top of the Orbsa platform. Imagine the possibilities and take the reins of your subscription business</p>
                <a href="#" className="btn btn-primary">See features</a>
                <a href="#" className="btn btn-default">More Examples</a>
              </article>
              <div className="col-xs-12 col-sm-6 col-md-5 posts-holder">
                <article className="post clearfix">
                  <div className="img-holder pull-left icon">
                    <img src={icon1} alt="image description" />
                  </div>
                  <div className="post-content">
                    <h2><a href="#">Be Competitive</a></h2>
                    <p>Stand out from the competition by offering refund advances</p>
                  </div>
                </article>
                <article className="post clearfix">
                  <div className="img-holder pull-left icon2">
                    <img src={icon2} alt="image description" />
                  </div>
                  <div className="post-content">
                    <h2><a href="#">Be a Hero</a></h2>
                    <p>Empower your client to be financially independent</p>
                  </div>
                </article>
                <article className="post clearfix">
                  <div className="img-holder pull-left icon3">
                    <img src={icon3} alt="image description" />
                  </div>
                  <div className="post-content">
                    <h2><a href="#">Be Original</a></h2>
                    <p>Associate your brand with innovation and trust</p>
                  </div>
                </article>
                <article className="post clearfix">
                  <div className="img-holder pull-left icon4">
                    <img src={icon4} alt="image description" />
                  </div>
                  <div className="post-content">
                    <h2><a href="#">Be a Positive</a></h2>
                    <p>Stand out from the competition by offering refund advances</p>
                  </div>
                </article>
                <article className="post clearfix">
                  <div className="img-holder pull-left icon5">
                    <img src={icon5} alt="image description" />
                  </div>
                  <div className="post-content">
                    <h2><a href="#">Be a Wealthy</a></h2>
                    <p>Empower your client to be financially independent</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
        <section className="charts-info text-center" style={{backgroundImage: `url(${bg3})`}}>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <strong className="title">Business Intelligence</strong>
                <h1>Discover Profits, Amplify LTV, Increase Retention</h1>
                <p>Start with our collection of best practice dashboards, then build your own customized reports. Insights puts <br />everything into perspective, so you can see how each trend or correlation affects your business.</p>
                <a href="#" className="btn btn-default">See examples</a>
                <div className="tabs-area">
                  <nav className="tabs-list">
                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="#kpis" aria-controls="kpis" role="tab" data-toggle="tab"><span>Understand KPI’s</span></a></li>
                      <li role="presentation"><a href="#cohorts" aria-controls="cohorts" role="tab" data-toggle="tab"><span>Build Cohorts</span></a></li>
                      <li role="presentation"><a href="#down-data" aria-controls="down-data" role="tab" data-toggle="tab"><span>Drill Down Data</span></a></li>
                      <li role="presentation"><a href="#attribute" aria-controls="attribute" role="tab" data-toggle="tab"><span>Attribute</span></a></li>
                      <li role="presentation"><a href="#forecast" aria-controls="forecast" role="tab" data-toggle="tab"><span>Forecast</span></a></li>
                    </ul>
                    <span className="tabs-opener">&nbsp;</span>
                  </nav>
                  <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="kpis">
                      <div className="img-holder" title="Use agent activity as one way to stack team performance, then raise the standards">
                        <img src={img5} alt="imaged escription" className="image" />
                        <div className="info-holder">
                          <img src={img6} alt="image description" className="info-img" />
                        </div>
                      </div>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="cohorts">
                      <div className="img-holder" title="Use agent activity as one way to stack team performance, then raise the standards">
                        <img src={img5} alt="imaged escription" className="image" />
                        <div className="info-holder">
                          <img src={img6} alt="image description" className="info-img" />
                        </div>
                      </div>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="down-data">
                      <div className="img-holder" title="Use agent activity as one way to stack team performance, then raise the standards">
                        <img src={img5} alt="imaged escription" className="image" />
                        <div className="info-holder">
                          <img src={img6} alt="image description" className="info-img" />
                        </div>
                      </div>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="attribute">
                      <div className="img-holder" title="Use agent activity as one way to stack team performance, then raise the standards">
                        <img src={img5} alt="imaged escription" className="image" />
                        <div className="info-holder">
                          <img src={img6} alt="image description" className="info-img" />
                        </div>
                      </div>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="forecast">
                      <div className="img-holder" title="Use agent activity as one way to stack team performance, then raise the standards">
                        <img src={img5} alt="imaged escription" className="image" />
                        <div className="info-holder">
                          <img src={img6} alt="image description" className="info-img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="developers-info">
          <div className="container">
            <div className="row">
              <article className="col-xs-12 col-sm-6">
                <strong className="title">For Developers</strong>
                <h1>Extend Orbsa Platform</h1>
                <p>Orbsa's got APIs, custom apps, and integrations for you to build<br/>anything and everything you want on top of the Orbsa platform.<br/>Imagine the possibilities and take the reins of your subscription<br/>business</p>
                <a href="#" className="btn btn-info">See examples</a>
              </article>
              <div className="col-xs-12 col-sm-6 img-holder">
                <img src={img4} alt="image description" />
              </div>
            </div>
          </div>
        </section>
        <section className="features text-center" style={{backgroundImage: `url(${bg4})`}}>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <strong className="title">More Great Features...</strong>
                <h1>Trusted by Thousands of Companies</h1>
                <div className="features-holder row">
                  <article className="col-xs-12 col-sm-4 feature-box">
                    <img src={icon6} alt="Personal Customer Service" className="icon" />
                    <h2><a href="#">Personal Customer Service</a></h2>
                    <p>Email <a href="mailto:&#115;&#117;&#112;&#112;&#111;&#114;&#116;&#064;&#111;&#114;&#098;&#115;&#097;&#046;&#099;&#111;&#109;">&#115;&#117;&#112;&#112;&#111;&#114;&#116;&#064;&#111;&#114;&#098;&#115;&#097;&#046;&#099;&#111;&#109;</a>, Monday through Friday, 8am-6pm, to chat with our team. We’re here to help.</p>
   
                  </article>
                  <article className="col-xs-12 col-sm-4 feature-box">
                    <img src={icon7} alt="No Gateway Lock-In" className="icon2" />
                    <h2><a href="#">No Gateway Lock-In</a></h2>
                    <p>Choose from over 100 payment to ensure that you have plenty of mobility for your business to grow.</p>
                  </article>
                  <article className="col-xs-12 col-sm-4 feature-box">
                    <img src={icon8} alt="Worry Free Security" className="icon3" />
                    <h2><a href="#">Worry Free Security</a></h2>
                    <p>ORBSA credit cards on your behalf, so your CO. can achieve PCI compliance more easily and at less cost.</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
        <form action="#" className="form-subscribe text-center" style={{backgroundImage: `url(${bg5})`}}>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <strong className="title">Go Ahead</strong>
                <h2>Take it for a Spin</h2>
                <div className="fields-holder">
                  <input type="text" placeholder="Your name" className="form-control" />
                  <input type="email" placeholder="youremail@example.com" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">See Orbsa <span className="symbol">»</span></button>
                <p>We guarantee 100% privacy. Your information will not be shared.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

}
