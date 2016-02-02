import Component from 'react-pure-render/component';
import React from 'react';

import bg5 from '../../images/bg5.jpg';

export default class Page extends Component {
  render() {
    return (
      <form action="#"
            className="SignupPage form-subscribe text-center"
            style={{
              background: '#141a20'
            }}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <strong className="title">Go Ahead</strong>
              <h2>Take it for a Spin</h2>
              <div className="fields-holder">
                <input type="text" placeholder="Your name" className="form-control" />
                <input type="email" placeholder="youremail@example.com" className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">See Orbsa</button>
              <p>We guarantee 100% privacy. Your information will not be shared.</p>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
