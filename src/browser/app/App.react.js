import './App.css';
import './bootstrap.css';
import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Header from './Header.react';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import RouterHandler from '../components/RouterHandler.react';
import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import {connect} from 'react-redux';

if(typeof window !== 'undefined') {
  let $ = require('jquery');
  window.$ = window.jQuery = $;
  require('bootstrap');
  require('../lib/js/jquery.main.js');
}

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };

  render() {
    const {
      location: {pathname},
      msg,
      users: {viewer}
    } = this.props;

    return (
      // Pass data-pathname to allow route specific styling.
      <div id="wrapper" data-pathname={pathname}>
        <Helmet
          link={[
            {rel: 'shortcut icon', href: require('./favicon.ico')}
          ]}
          meta={[{
            name: 'description',
            content: 'Dev stack and starter kit for functional and universal React web apps'
          }]}
          titleTemplate="%s - Orbsa"
        />
        {/* Pathname enforces rerender so activeClassName is updated. */}
        <Header msg={msg} pathname={pathname} viewer={viewer} />
        <RouterHandler {...this.props} />
        <Footer msg={msg.app.footer} />
      </div>
    );
  }
}

// // logRenderTime is useful for app with huge UI to check render performance.
// import logRenderTime from '../lib/logRenderTime';
// App = logRenderTime(App)

export default connect(mapStateToProps, mapDispatchToProps)(App);
