// page init
exports = module.exports = function() {
  initFixedScrollBlock();
  // initTouchNav();
  initSlideShow();
  initTooltip();
  initMobileNav();
  initVideoBg();
  jQuery('input, textarea').placeholder();
};

jQuery(window).on('load resize orientationchange', initSameHeight);

// fade gallery init
function initSlideShow() {
  jQuery('.testimonial').fadeGallery({
    slides: 'div.slide',
    btnPrev: 'a.btn-prev',
    btnNext: 'a.btn-next',
    pagerLinks: '.pagination li',
    event: 'click',
    useSwipe: true,
    autoRotation: true,
    autoHeight: true,
    switchTime: 4000,
    animSpeed: 500
  });
}

// hover tooltip init
function initTooltip() {
  jQuery('div[title]').hoverTooltip({
    attribute: 'title',
    positionTypeX: 'left',
    positionTypeY: 'bottom',
    tooltipStructure: '<div class="custom-tooltip"><strong>Boost Performance</strong><div class="tooltip-text"></div></div>',
    tooltipSelector: '.tooltip-text'
  });
}

// mobile menu init
function initMobileNav() {
  jQuery('.tabs-list').mobileNav({
    hideOnClickOutside: true,
    menuActiveClass: 'tab-active',
    menuOpener: '.tabs-opener',
    menuDrop: '.tabs-list'
  });
}

// initialize fixed blocks on scroll
function initFixedScrollBlock() {
  jQuery('#wrapper').fixedScrollBlock({
    slideBlock: '.header-trigger',
    positionType: 'fixed',
    fixedOnlyIfFits: false
  });
}

// align blocks height
function initSameHeight() {
  jQuery('.features-holder').sameHeight({
    elements: 'h2',
    flexible: true,
    multiLine: true,
    biggestHeight: true
  });
  jQuery('.tabs-list .nav-tabs').sameHeight({
    elements: 'li',
    flexible: true,
    multiLine: true
  });
}

// handle dropdowns on mobile devices
// function initTouchNav() {
//   jQuery('.footer-nav').each(function(){
//     new TouchNav({
//       navBlock: this,
//       menuOpener: 'h3',
//       menuItems: '.nav-holder'
//     });
//   });
// }

// video background init
function initVideoBg() {
  jQuery('.video-area').videoBG();
}

/*
 * jQuery video background plugin
*/
;(function($) {
  function VideoBG(options) {
    this.options = $.extend({
      autoPlay: true,
      loop: true,
      activeClass: 'video-is-playing'
    }, options);
    this.init();
  }

  VideoBG.prototype = {
    init: function() {
      if (this.options.holder) {
        this.findElements();
        if (!isTouchDevice && this.video.length) {
          this.attachEvents();
          this.buildPoster();
          this.makeCallback('onInit', true);
        }
      }
    },

    findElements: function() {
      this.holder = $(this.options.holder);
      this.video = this.holder.find('video').css({
        visibility: 'hidden',
        display: 'block'
      })

      this.video.prop('muted', true);

      // if (this.options.loop) {
      //   this.video.attr('loop', 'loop');
      // }

      if (this.options.autoPlay) {
        this.video.attr('autoplay', '');
      }

      if (isTouchDevice) {
        this.video.remove();
      }
    },

    buildPoster: function() {
      this.holder.css({
        'background-image': 'url(' + this.video.attr('poster') + ')',
        'background-repeat':'no-repeat',
        'background-size':'cover'
      });
    },

    attachEvents: function() {
      var self = this;

      this.video[0].oncanplaythrough = function() {
        console.log('oncanplaythrough');
        self.ratio = self.video.width() / self.video.height();
        self.resizeHandler();
        win.on('load resize orientationchange', self.resizeHandler);
        self.resizeVideo();
        self.makeCallback('onReady', true);
      }

      this.video[0].load();

      this.video[0].onplay = function() {
        self.holder.addClass(self.options.activeClass);
        self.video.css({
          visibility: 'visible'
        });
      };

      this.video[0].addEventListener('ended', function() {
        self.video[0].load();
        self.video[0].play();
      }, false);

      this.resizeHandler = function() {
        self.resizeVideo();
      };
    },

    resizeVideo: function() {
      var styles = this.getDimensions({
        videoRatio: this.ratio,
        maskWidth: this.holder.width(),
        maskHeight: this.holder.height()
      });

      this.video.css({
        width: styles.width,
        height: styles.height,
        marginTop: styles.top,
        marginLeft: styles.left
      });
    },

    getDimensions: function(data) {
      var ratio = data.videoRatio,
        slideWidth = data.maskWidth,
        slideHeight = slideWidth / ratio;

      if (slideHeight < data.maskHeight) {
        slideHeight = data.maskHeight;
        slideWidth = slideHeight * ratio;
      }
      return {
        width: slideWidth,
        height: slideHeight,
        top: (data.maskHeight - slideHeight) / 2,
        left: (data.maskWidth - slideWidth) / 2
      };
    },

    makeCallback: function(name) {
      if (typeof this.options[name] === 'function') {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    }
  };

  var win = $(window);
  var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

  $.fn.videoBG = function(opt) {
    return this.each(function() {
      $(this).data('VideoBG', new VideoBG($.extend({
        holder: this
      }, opt)));
    });
  };
}(jQuery));

/*
 * jQuery SlideShow plugin
 */
;(function($){
  function FadeGallery(options) {
    this.options = $.extend({
      slides: 'ul.slideset > li',
      activeClass:'active',
      disabledClass:'disabled',
      btnPrev: 'a.btn-prev',
      btnNext: 'a.btn-next',
      generatePagination: false,
      pagerList: '<ul>',
      pagerListItem: '<li><a href="#"></a></li>',
      pagerListItemText: 'a',
      pagerLinks: '.pagination li',
      currentNumber: 'span.current-num',
      totalNumber: 'span.total-num',
      btnPlay: '.btn-play',
      btnPause: '.btn-pause',
      btnPlayPause: '.btn-play-pause',
      galleryReadyClass: 'gallery-js-ready',
      autorotationActiveClass: 'autorotation-active',
      autorotationDisabledClass: 'autorotation-disabled',
      autorotationStopAfterClick: false,
      circularRotation: true,
      switchSimultaneously: true,
      disableWhileAnimating: false,
      disableFadeIE: false,
      autoRotation: false,
      pauseOnHover: true,
      autoHeight: false,
      useSwipe: false,
      swipeThreshold: 15,
      switchTime: 4000,
      animSpeed: 600,
      event:'click'
    }, options);
    this.init();
  }
  FadeGallery.prototype = {
    init: function() {
      if(this.options.holder) {
        this.findElements();
        this.attachEvents();
        this.refreshState(true);
        this.autoRotate();
        this.makeCallback('onInit', this);
      }
    },
    findElements: function() {
      // control elements
      this.gallery = $(this.options.holder).addClass(this.options.galleryReadyClass);
      this.slides = this.gallery.find(this.options.slides);
      this.slidesHolder = this.slides.eq(0).parent();
      this.stepsCount = this.slides.length;
      this.btnPrev = this.gallery.find(this.options.btnPrev);
      this.btnNext = this.gallery.find(this.options.btnNext);
      this.currentIndex = 0;

      // disable fade effect in old IE
      if(this.options.disableFadeIE && !$.support.opacity) {
        this.options.animSpeed = 0;
      }

      // create gallery pagination
      if(typeof this.options.generatePagination === 'string') {
        this.pagerHolder = this.gallery.find(this.options.generatePagination).empty();
        this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
        for(var i = 0; i < this.stepsCount; i++) {
          $(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i+1);
        }
        this.pagerLinks = this.pagerList.children();
      } else {
        this.pagerLinks = this.gallery.find(this.options.pagerLinks);
      }

      // get start index
      var activeSlide = this.slides.filter('.'+this.options.activeClass);
      if(activeSlide.length) {
        this.currentIndex = this.slides.index(activeSlide);
      }
      this.prevIndex = this.currentIndex;

      // autorotation control buttons
      this.btnPlay = this.gallery.find(this.options.btnPlay);
      this.btnPause = this.gallery.find(this.options.btnPause);
      this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);

      // misc elements
      this.curNum = this.gallery.find(this.options.currentNumber);
      this.allNum = this.gallery.find(this.options.totalNumber);

      // handle flexible layout
      this.slides.css({display:'block',opacity:0}).eq(this.currentIndex).css({
        opacity:''
      });
    },
    attachEvents: function() {
      var self = this;

      // flexible layout handler
      this.resizeHandler = function() {
        self.onWindowResize();
      };
      $(window).bind('load resize orientationchange', this.resizeHandler);

      if(this.btnPrev.length) {
        this.btnPrevHandler = function(e){
          e.preventDefault();
          self.prevSlide();
          if(self.options.autorotationStopAfterClick) {
            self.stopRotation();
          }
        };
        this.btnPrev.bind(this.options.event, this.btnPrevHandler);
      }
      if(this.btnNext.length) {
        this.btnNextHandler = function(e) {
          e.preventDefault();
          self.nextSlide();
          if(self.options.autorotationStopAfterClick) {
            self.stopRotation();
          }
        };
        this.btnNext.bind(this.options.event, this.btnNextHandler);
      }
      if(this.pagerLinks.length) {
        this.pagerLinksHandler = function(e) {
          e.preventDefault();
          self.numSlide(self.pagerLinks.index(e.currentTarget));
          if(self.options.autorotationStopAfterClick) {
            self.stopRotation();
          }
        };
        this.pagerLinks.bind(self.options.event, this.pagerLinksHandler);
      }

      // autorotation buttons handler
      if(this.btnPlay.length) {
        this.btnPlayHandler = function(e) {
          e.preventDefault();
          self.startRotation();
        };
        this.btnPlay.bind(this.options.event, this.btnPlayHandler);
      }
      if(this.btnPause.length) {
        this.btnPauseHandler = function(e) {
          e.preventDefault();
          self.stopRotation();
        };
        this.btnPause.bind(this.options.event, this.btnPauseHandler);
      }
      if(this.btnPlayPause.length) {
        this.btnPlayPauseHandler = function(e){
          e.preventDefault();
          if(!self.gallery.hasClass(self.options.autorotationActiveClass)) {
            self.startRotation();
          } else {
            self.stopRotation();
          }
        };
        this.btnPlayPause.bind(this.options.event, this.btnPlayPauseHandler);
      }

      // swipe gestures handler
      if(this.options.useSwipe && window.Hammer && isTouchDevice) {
        this.swipeHandler = new Hammer.Manager(this.gallery[0]);
        this.swipeHandler.add(new Hammer.Swipe({
          direction: Hammer.DIRECTION_HORIZONTAL,
          threshold: self.options.swipeThreshold
        }));
        this.swipeHandler.on('swipeleft', function() {
          self.nextSlide();
        }).on('swiperight', function() {
          self.prevSlide();
        });
      }

      // pause on hover handling
      if(this.options.pauseOnHover) {
        this.hoverHandler = function() {
          if(self.options.autoRotation) {
            self.galleryHover = true;
            self.pauseRotation();
          }
        };
        this.leaveHandler = function() {
          if(self.options.autoRotation) {
            self.galleryHover = false;
            self.resumeRotation();
          }
        };
        this.gallery.bind({mouseenter: this.hoverHandler, mouseleave: this.leaveHandler});
      }
    },
    onWindowResize: function(){
      if(this.options.autoHeight) {
        this.slidesHolder.css({height: this.slides.eq(this.currentIndex).outerHeight(true) });
      }
    },
    prevSlide: function() {
      if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
        this.prevIndex = this.currentIndex;
        if(this.currentIndex > 0) {
          this.currentIndex--;
          this.switchSlide();
        } else if(this.options.circularRotation) {
          this.currentIndex = this.stepsCount - 1;
          this.switchSlide();
        }
      }
    },
    nextSlide: function(fromAutoRotation) {
      if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
        this.prevIndex = this.currentIndex;
        if(this.currentIndex < this.stepsCount - 1) {
          this.currentIndex++;
          this.switchSlide();
        } else if(this.options.circularRotation || fromAutoRotation === true) {
          this.currentIndex = 0;
          this.switchSlide();
        }
      }
    },
    numSlide: function(c) {
      if(this.currentIndex != c) {
        this.prevIndex = this.currentIndex;
        this.currentIndex = c;
        this.switchSlide();
      }
    },
    switchSlide: function() {
      var self = this;
      if(this.slides.length > 1) {
        this.galleryAnimating = true;
        if(!this.options.animSpeed) {
          this.slides.eq(this.prevIndex).css({opacity:0});
        } else {
          this.slides.eq(this.prevIndex).stop().animate({opacity:0},{duration: this.options.animSpeed});
        }

        this.switchNext = function() {
          if(!self.options.animSpeed) {
            self.slides.eq(self.currentIndex).css({opacity:''});
          } else {
            self.slides.eq(self.currentIndex).stop().animate({opacity:1},{duration: self.options.animSpeed});
          }
          clearTimeout(this.nextTimer);
          this.nextTimer = setTimeout(function() {
            self.slides.eq(self.currentIndex).css({opacity:''});
            self.galleryAnimating = false;
            self.autoRotate();

            // onchange callback
            self.makeCallback('onChange', self);
          }, self.options.animSpeed);
        };

        if(this.options.switchSimultaneously) {
          self.switchNext();
        } else {
          clearTimeout(this.switchTimer);
          this.switchTimer = setTimeout(function(){
            self.switchNext();
          }, this.options.animSpeed);
        }
        this.refreshState();

        // onchange callback
        this.makeCallback('onBeforeChange', this);
      }
    },
    refreshState: function(initial) {
      this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
      this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
      this.curNum.html(this.currentIndex+1);
      this.allNum.html(this.stepsCount);

      // initial refresh
      if(this.options.autoHeight) {
        if(initial) {
          this.slidesHolder.css({height: this.slides.eq(this.currentIndex).outerHeight(true) });
        } else {
          this.slidesHolder.stop().animate({height: this.slides.eq(this.currentIndex).outerHeight(true)}, {duration: this.options.animSpeed});
        }
      }

      // disabled state
      if(!this.options.circularRotation) {
        this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
        if(this.currentIndex === 0) this.btnPrev.addClass(this.options.disabledClass);
        if(this.currentIndex === this.stepsCount - 1) this.btnNext.addClass(this.options.disabledClass);
      }

      // add class if not enough slides
      this.gallery.toggleClass('not-enough-slides', this.stepsCount === 1);
    },
    startRotation: function() {
      this.options.autoRotation = true;
      this.galleryHover = false;
      this.autoRotationStopped = false;
      this.resumeRotation();
    },
    stopRotation: function() {
      this.galleryHover = true;
      this.autoRotationStopped = true;
      this.pauseRotation();
    },
    pauseRotation: function() {
      this.gallery.addClass(this.options.autorotationDisabledClass);
      this.gallery.removeClass(this.options.autorotationActiveClass);
      clearTimeout(this.timer);
    },
    resumeRotation: function() {
      if(!this.autoRotationStopped) {
        this.gallery.addClass(this.options.autorotationActiveClass);
        this.gallery.removeClass(this.options.autorotationDisabledClass);
        this.autoRotate();
      }
    },
    autoRotate: function() {
      var self = this;
      clearTimeout(this.timer);
      if(this.options.autoRotation && !this.galleryHover && !this.autoRotationStopped) {
        this.gallery.addClass(this.options.autorotationActiveClass);
        this.timer = setTimeout(function(){
          self.nextSlide(true);
        }, this.options.switchTime);
      } else {
        this.pauseRotation();
      }
    },
    makeCallback: function(name) {
      if(typeof this.options[name] === 'function') {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },
    destroy: function() {
      // navigation buttons handler
      this.btnPrev.unbind(this.options.event, this.btnPrevHandler);
      this.btnNext.unbind(this.options.event, this.btnNextHandler);
      this.pagerLinks.unbind(this.options.event, this.pagerLinksHandler);
      $(window).unbind('load resize orientationchange', this.resizeHandler);

      // remove autorotation handlers
      this.stopRotation();
      this.btnPlay.unbind(this.options.event, this.btnPlayHandler);
      this.btnPause.unbind(this.options.event, this.btnPauseHandler);
      this.btnPlayPause.unbind(this.options.event, this.btnPlayPauseHandler);
      this.gallery.unbind('mouseenter', this.hoverHandler);
      this.gallery.unbind('mouseleave', this.leaveHandler);

      // remove swipe handler if used
      if(this.swipeHandler) {
        this.swipeHandler.destroy();
      }
      if(typeof this.options.generatePagination === 'string') {
        this.pagerHolder.empty();
      }

      // remove unneeded classes and styles
      var unneededClasses = [this.options.galleryReadyClass, this.options.autorotationActiveClass, this.options.autorotationDisabledClass];
      this.gallery.removeClass(unneededClasses.join(' '));
      this.slidesHolder.add(this.slides).removeAttr('style');
    }
  };

  // detect device type
  var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

  // jquery plugin
  $.fn.fadeGallery = function(opt){
    return this.each(function(){
      $(this).data('FadeGallery', new FadeGallery($.extend(opt,{holder:this})));
    });
  };
}(jQuery));

/*
 * jQuery Tooltip plugin
 */
;(function($){
  var win = jQuery(window);
  $.fn.hoverTooltip = function(o) {
    var options = $.extend({
      tooltipStructure: '<div class="hover-tooltip"><div class="tooltip-text"></div></div>',
      tooltipSelector: '.tooltip-text',
      positionTypeX: 'right',
      positionTypeY: 'top',
      attribute:'title',
      leftPositionClass : 'left-position',
      rightPositionClass : 'right-position',
      extraOffsetX: 10,
      extraOffsetY: 10,
      showOnTouchDevice: true
    },o);

    // create tooltip
    var tooltip = $('<div>').html(options.tooltipStructure).children().css({position:'absolute'});
    var tooltipTextBox = tooltip.find(options.tooltipSelector);
    var tooltipWidth, tooltipHeight;
    
    
    if (typeof options.onInit === 'function') options.onInit(tooltip);
    
    // tooltip logic
    function initTooltip(item) {
      var tooltipText = item.attr(options.attribute);
      item.removeAttr(options.attribute);
      if(!tooltipText) return;

      if(isTouchDevice) {
        if(options.showOnTouchDevice) {
          item.bind('touchstart', function(e) {
            showTooltip(item, tooltipText, getEvent(e));
            jQuery(document).one('touchend', hideTooltip);
          });
        }
      } else {
        item.bind('mouseenter', function(e) {
          showTooltip(item, tooltipText, e);
        }).bind('mouseleave', hideTooltip).bind('mousemove', moveTooltip);
      }
    }
    function showTooltip(item, text, e) {
      tooltipTextBox.html(text);
      tooltip.appendTo(document.body).show();
      tooltipWidth = tooltip.outerWidth(true);
      tooltipHeight = tooltip.outerHeight(true);
      moveTooltip(e, item);
    }
    function hideTooltip() {
      tooltip.remove();
    }
    function moveTooltip(e) {
      var top, left, x = e.pageX, y = e.pageY;

      switch(options.positionTypeY) {
        case 'top':
          top = y - tooltipHeight - options.extraOffsetY;
          break;
        case 'center':
          top = y - tooltipHeight / 2;
          break;
        case 'bottom':
          top = y + options.extraOffsetY;
          break;
      }

      switch(options.positionTypeX) {
        case 'left':
          left = x - tooltipWidth - options.extraOffsetX;
          break;
        case 'center':
          left = x - tooltipWidth / 2;
          break;
        case 'right':
          left = x + options.extraOffsetX;
          break;
      }
      
      tooltip.css({
        top: top,
        left: left
      });


      if (left < 0) {
        tooltip.removeClass(options.rightPositionClass).addClass(options.leftPositionClass);
        tooltip.css({
          marginLeft: left * (-1)
        });
      } else if (left + tooltipWidth  > win.width()) {
        tooltip.removeClass(options.leftPositionClass).addClass(options.rightPositionClass);
      } else {
        tooltip.removeClass(options.leftPositionClass).removeClass(options.rightPositionClass);
        tooltip.css({
          margin: 0
        });
      }
    }
    
    // add handlers
    return this.each(function(){
      initTooltip($(this));
    });
  };
  
  // parse event
  function getEvent(e) {
    return e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
  }
  
  // detect device type
  var isTouchDevice = (function() {
    try {
      return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    } catch (e) {
      return false;
    }
  }());
  
}(jQuery));

/*
 * Simple Mobile Navigation
 */
;(function($) {
  function MobileNav(options) {
    this.options = $.extend({
      container: null,
      hideOnClickOutside: false,
      menuActiveClass: 'nav-active',
      menuOpener: '.nav-opener',
      menuDrop: '.nav-drop',
      toggleEvent: 'click',
      outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
    }, options);
    this.initStructure();
    this.attachEvents();
  }
  MobileNav.prototype = {
    initStructure: function() {
      this.page = $('html');
      this.container = $(this.options.container);
      this.opener = this.container.find(this.options.menuOpener);
      this.drop = this.container.find(this.options.menuDrop);
    },
    attachEvents: function() {
      var self = this;

      if(activateResizeHandler) {
        activateResizeHandler();
        activateResizeHandler = null;
      }

      this.outsideClickHandler = function(e) {
        if(self.isOpened()) {
          var target = $(e.target);
          if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
            self.hide();
          }
        }
      };

      this.openerClickHandler = function(e) {
        e.preventDefault();
        self.toggle();
      };

      this.opener.on(this.options.toggleEvent, this.openerClickHandler);
    },
    isOpened: function() {
      return this.container.hasClass(this.options.menuActiveClass);
    },
    show: function() {
      this.container.addClass(this.options.menuActiveClass);
      if(this.options.hideOnClickOutside) {
        this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    hide: function() {
      this.container.removeClass(this.options.menuActiveClass);
      if(this.options.hideOnClickOutside) {
        this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    toggle: function() {
      if(this.isOpened()) {
        this.hide();
      } else {
        this.show();
      }
    },
    destroy: function() {
      this.container.removeClass(this.options.menuActiveClass);
      this.opener.off(this.options.toggleEvent, this.clickHandler);
      this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
    }
  };

  var activateResizeHandler = function() {
    var win = $(window),
      doc = $('html'),
      resizeClass = 'resize-active',
      flag, timer;
    var removeClassHandler = function() {
      flag = false;
      doc.removeClass(resizeClass);
    };
    var resizeHandler = function() {
      if(!flag) {
        flag = true;
        doc.addClass(resizeClass);
      }
      clearTimeout(timer);
      timer = setTimeout(removeClassHandler, 500);
    };
    win.on('resize orientationchange', resizeHandler);
  };

  $.fn.mobileNav = function(options) {
    return this.each(function() {
      var params = $.extend({}, options, {container: this}),
        instance = new MobileNav(params);
      $.data(this, 'MobileNav', instance);
    });
  };
}(jQuery));

/*
 * FixedScrollBlock
 */
;(function($) {
  'use strict';
  var isMobileDevice = ('ontouchstart' in window) ||
            (window.DocumentTouch && document instanceof DocumentTouch) ||
            /Windows Phone/.test(navigator.userAgent);

  function FixedScrollBlock(options) {
    this.options = $.extend({
      fixedActiveClass: 'fixed-position',
      slideBlock: '[data-scroll-block]',
      positionType: 'auto',
      fixedOnlyIfFits: true,
      container: null,
      animDelay: 100,
      animSpeed: 200,
      extraBottom: 0,
      extraTop: 0
    }, options);
    this.initStructure();
    this.attachEvents();
  }
  FixedScrollBlock.prototype = {
    initStructure: function() {
      // find elements
      this.win = $(window);
      this.container = $(this.options.container);
      this.slideBlock = this.container.find(this.options.slideBlock);

      // detect method
      if(this.options.positionType === 'auto') {
        this.options.positionType = isMobileDevice ? 'absolute' : 'fixed';
      }
    },
    attachEvents: function() {
      var self = this;

      // bind events
      this.onResize = function() {
        self.resizeHandler();
      };
      this.onScroll = function() {
        self.scrollHandler();
      };

      // handle events
      this.win.on({
        resize: this.onResize,
        scroll: this.onScroll
      });

      // initial handler call
      this.resizeHandler();
    },
    recalculateOffsets: function() {
      var defaultOffset = this.slideBlock.offset(),
        defaultPosition = this.slideBlock.position(),
        holderOffset = this.container.offset(),
        windowSize = this.win.height();

      this.data = {
        windowHeight: this.win.height(),
        windowWidth: this.win.width(),

        blockPositionLeft: defaultPosition.left,
        blockPositionTop: defaultPosition.top,

        blockOffsetLeft: defaultOffset.left,
        blockOffsetTop: defaultOffset.top,
        blockHeight: this.slideBlock.innerHeight(),

        holderOffsetLeft: holderOffset.left,
        holderOffsetTop: holderOffset.top,
        holderHeight: this.container.innerHeight()
      };
    },
    isVisible: function() {
      return this.slideBlock.prop('offsetHeight');
    },
    fitsInViewport: function() {
      if(this.options.fixedOnlyIfFits && this.data) {
        return this.data.blockHeight + this.options.extraTop <= this.data.windowHeight;
      } else {
        return true;
      }
    },
    resizeHandler: function() {
      if(this.isVisible()) {
        FixedScrollBlock.stickyMethods[this.options.positionType].onResize.apply(this, arguments);
        this.scrollHandler();
      }
    },
    scrollHandler: function() {
      if(this.isVisible()) {
        if(!this.data) {
          this.resizeHandler();
          return;
        }
        this.currentScrollTop = this.win.scrollTop();
        this.currentScrollLeft = this.win.scrollLeft();
        FixedScrollBlock.stickyMethods[this.options.positionType].onScroll.apply(this, arguments);
      }
    },
    refresh: function() {
      // refresh dimensions and state if needed
      if(this.data) {
        this.data.holderHeight = this.container.innerHeight();
        this.data.blockHeight = this.slideBlock.innerHeight();
        this.scrollHandler();
      }
    },
    destroy: function() {
      // remove event handlers and styles
      this.slideBlock.removeAttr('style').removeClass(this.options.fixedActiveClass);
      this.win.off({
        resize: this.onResize,
        scroll: this.onScroll
      });
    }
  };

  // sticky methods
  FixedScrollBlock.stickyMethods = {
    fixed: {
      onResize: function() {
        this.slideBlock.removeAttr('style');
        this.recalculateOffsets();
      },
      onScroll: function() {
        if(this.fitsInViewport() && this.currentScrollTop + this.options.extraTop > this.data.blockOffsetTop) {
          if(this.currentScrollTop + this.options.extraTop + this.data.blockHeight > this.data.holderOffsetTop + this.data.holderHeight - this.options.extraBottom) {
            this.slideBlock.css({
              position: 'absolute',
              top: this.data.blockPositionTop + this.data.holderHeight - this.data.blockHeight - this.options.extraBottom - (this.data.blockOffsetTop - this.data.holderOffsetTop),
              left: this.data.blockPositionLeft
            });
          } else {
            this.slideBlock.css({
              position: 'fixed',
              top: this.options.extraTop,
              left: this.data.blockOffsetLeft - this.currentScrollLeft
            });
          }
          this.slideBlock.addClass(this.options.fixedActiveClass);
        } else {
          this.slideBlock.removeClass(this.options.fixedActiveClass).removeAttr('style');
        }
      }
    },
    absolute: {
      onResize: function() {
        this.slideBlock.removeAttr('style');
        this.recalculateOffsets();

        this.slideBlock.css({
          position: 'absolute',
          top: this.data.blockPositionTop,
          left: this.data.blockPositionLeft
        });

        this.slideBlock.addClass(this.options.fixedActiveClass);
      },
      onScroll: function() {
        var self = this;
        clearTimeout(this.animTimer);
        this.animTimer = setTimeout(function() {
          var currentScrollTop = self.currentScrollTop + self.options.extraTop,
            initialPosition = self.data.blockPositionTop - (self.data.blockOffsetTop - self.data.holderOffsetTop),
            maxTopPosition =  self.data.holderHeight - self.data.blockHeight - self.options.extraBottom,
            currentTopPosition = initialPosition + Math.min(currentScrollTop - self.data.holderOffsetTop, maxTopPosition),
            calcTopPosition = self.fitsInViewport() && currentScrollTop > self.data.blockOffsetTop ? currentTopPosition : self.data.blockPositionTop;

          self.slideBlock.stop().animate({
            top: calcTopPosition
          }, self.options.animSpeed);
        }, this.options.animDelay);
      }
    }
  };

  // jQuery plugin interface
  $.fn.fixedScrollBlock = function(options) {
    return this.each(function() {
      var params = $.extend({}, options, {container: this}),
        instance = new FixedScrollBlock(params);
      $.data(this, 'FixedScrollBlock', instance);
    });
  };

  // module exports
  window.FixedScrollBlock = FixedScrollBlock;
}(jQuery, this));

/*
 * jQuery SameHeight plugin
 */
;(function($){
  $.fn.sameHeight = function(opt) {
    var options = $.extend({
      skipClass: 'same-height-ignore',
      leftEdgeClass: 'same-height-left',
      rightEdgeClass: 'same-height-right',
      elements: '>*',
      flexible: false,
      multiLine: false,
      useMinHeight: false,
      biggestHeight: false
    },opt);
    return this.each(function(){
      var holder = $(this), postResizeTimer, ignoreResize;
      var elements = holder.find(options.elements).not('.' + options.skipClass);
      if(!elements.length) return;

      // resize handler
      function doResize() {
        elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
        if(options.multiLine) {
          // resize elements row by row
          resizeElementsByRows(elements, options);
        } else {
          // resize elements by holder
          resizeElements(elements, holder, options);
        }
      }
      doResize();

      // handle flexible layout / font resize
      var delayedResizeHandler = function() {
        if(!ignoreResize) {
          ignoreResize = true;
          doResize();
          clearTimeout(postResizeTimer);
          postResizeTimer = setTimeout(function() {
            doResize();
            setTimeout(function(){
              ignoreResize = false;
            }, 10);
          }, 100);
        }
      };

      // handle flexible/responsive layout
      if(options.flexible) {
        $(window).bind('resize orientationchange fontresize', delayedResizeHandler);
      }

      // handle complete page load including images and fonts
      $(window).bind('load', delayedResizeHandler);
    });
  };

  // detect css min-height support
  var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

  // get elements by rows
  function resizeElementsByRows(boxes, options) {
    var currentRow = $(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
    boxes.each(function(ind){
      var curItem = $(this);
      if(curItem.offset().top === firstOffset) {
        currentRow = currentRow.add(this);
      } else {
        maxHeight = getMaxHeight(currentRow);
        maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
        currentRow = curItem;
        firstOffset = curItem.offset().top;
      }
    });
    if(currentRow.length) {
      maxHeight = getMaxHeight(currentRow);
      maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
    }
    if(options.biggestHeight) {
      boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
    }
  }

  // calculate max element height
  function getMaxHeight(boxes) {
    var maxHeight = 0;
    boxes.each(function(){
      maxHeight = Math.max(maxHeight, $(this).outerHeight());
    });
    return maxHeight;
  }

  // resize helper function
  function resizeElements(boxes, parent, options) {
    var calcHeight;
    var parentHeight = typeof parent === 'number' ? parent : parent.height();
    boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
      var element = $(this);
      var depthDiffHeight = 0;
      var isBorderBox = element.css('boxSizing') === 'border-box' || element.css('-moz-box-sizing') === 'border-box' || element.css('-webkit-box-sizing') === 'border-box';

      if(typeof parent !== 'number') {
        element.parents().each(function(){
          var tmpParent = $(this);
          if(parent.is(this)) {
            return false;
          } else {
            depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
          }
        });
      }
      calcHeight = parentHeight - depthDiffHeight;
      calcHeight -= isBorderBox ? 0 : element.outerHeight() - element.height();

      if(calcHeight > 0) {
        element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
      }
    });
    boxes.filter(':first').addClass(options.leftEdgeClass);
    boxes.filter(':last').addClass(options.rightEdgeClass);
    return calcHeight;
  }
}(jQuery));

/*
 * jQuery FontResize Event
 */
jQuery.onFontResize = (function($) {
  $(function() {
    var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
    var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');

    // required styles
    resizeFrame.css({
      width: '100em',
      height: '10px',
      position: 'absolute',
      borderWidth: 0,
      top: '-9999px',
      left: '-9999px'
    }).appendTo('body');

    // use native IE resize event if possible
    if (window.attachEvent && !window.addEventListener) {
      resizeFrame.bind('resize', function () {
        $.onFontResize.trigger(resizeFrame[0].offsetWidth / 100);
      });
    }
    // use script inside the iframe to detect resize for other browsers
    else {
      var doc = resizeFrame[0].contentWindow.document;
      doc.open();
      doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
      doc.close();
    }
    jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
  });
  return {
    // public method, so it can be called from within the iframe
    trigger: function (em) {
      $(window).trigger("fontresize", [em]);
    }
  };
}(jQuery));

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

  // Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
  var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
  var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
  var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
  var prototype = $.fn;
  var valHooks = $.valHooks;
  var propHooks = $.propHooks;
  var hooks;
  var placeholder;

  if (isInputSupported && isTextareaSupported) {

    placeholder = prototype.placeholder = function() {
      return this;
    };

    placeholder.input = placeholder.textarea = true;

  } else {

    placeholder = prototype.placeholder = function() {
      var $this = this;
      $this
        .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
        .not('.placeholder')
        .bind({
          'focus.placeholder': clearPlaceholder,
          'blur.placeholder': setPlaceholder
        })
        .data('placeholder-enabled', true)
        .trigger('blur.placeholder');
      return $this;
    };

    placeholder.input = isInputSupported;
    placeholder.textarea = isTextareaSupported;

    hooks = {
      'get': function(element) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value;
        }

        return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
      },
      'set': function(element, value) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value = value;
        }

        if (!$element.data('placeholder-enabled')) {
          return element.value = value;
        }
        if (value == '') {
          element.value = value;
          // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
          if (element != safeActiveElement()) {
            // We can't use `triggerHandler` here because of dummy text/password inputs :(
            setPlaceholder.call(element);
          }
        } else if ($element.hasClass('placeholder')) {
          clearPlaceholder.call(element, true, value) || (element.value = value);
        } else {
          element.value = value;
        }
        // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
        return $element;
      }
    };

    if (!isInputSupported) {
      valHooks.input = hooks;
      propHooks.value = hooks;
    }
    if (!isTextareaSupported) {
      valHooks.textarea = hooks;
      propHooks.value = hooks;
    }

    $(function() {
      // Look for forms
      $(document).delegate('form', 'submit.placeholder', function() {
        // Clear the placeholder values so they don't get submitted
        var $inputs = $('.placeholder', this).each(clearPlaceholder);
        setTimeout(function() {
          $inputs.each(setPlaceholder);
        }, 10);
      });
    });

    // Clear placeholder values upon page reload
    $(window).bind('beforeunload.placeholder', function() {
      $('.placeholder').each(function() {
        this.value = '';
      });
    });

  }

  function args(elem) {
    // Return an object of element attributes
    var newAttrs = {};
    var rinlinejQuery = /^jQuery\d+$/;
    $.each(elem.attributes, function(i, attr) {
      if (attr.specified && !rinlinejQuery.test(attr.name)) {
        newAttrs[attr.name] = attr.value;
      }
    });
    return newAttrs;
  }

  function clearPlaceholder(event, value) {
    var input = this;
    var $input = $(input);
    if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
      if ($input.data('placeholder-password')) {
        $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
        // If `clearPlaceholder` was called from `$.valHooks.input.set`
        if (event === true) {
          return $input[0].value = value;
        }
        $input.focus();
      } else {
        input.value = '';
        $input.removeClass('placeholder');
        input == safeActiveElement() && input.select();
      }
    }
  }

  function setPlaceholder() {
    var $replacement;
    var input = this;
    var $input = $(input);
    var id = this.id;
    if (input.value == '') {
      if (input.type == 'password') {
        if (!$input.data('placeholder-textinput')) {
          try {
            $replacement = $input.clone().attr({ 'type': 'text' });
          } catch(e) {
            $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
          }
          $replacement
            .removeAttr('name')
            .data({
              'placeholder-password': $input,
              'placeholder-id': id
            })
            .bind('focus.placeholder', clearPlaceholder);
          $input
            .data({
              'placeholder-textinput': $replacement,
              'placeholder-id': id
            })
            .before($replacement);
        }
        $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
        // Note: `$input[0] != input` now!
      }
      $input.addClass('placeholder');
      $input[0].value = $input.attr('placeholder');
    } else {
      $input.removeClass('placeholder');
    }
  }

  function safeActiveElement() {
    // Avoid IE9 `document.activeElement` of death
    // https://github.com/mathiasbynens/jquery-placeholder/pull/99
    try {
      return document.activeElement;
    } catch (err) {}
  }

}(window, document, jQuery));

// navigation accesibility module
// function TouchNav(opt) {
//   this.options = {
//     hoverClass: 'hover',
//     menuItems: 'li',
//     menuOpener: 'a',
//     menuDrop: 'ul',
//     navBlock: null
//   };
//   for(var p in opt) {
//     if(opt.hasOwnProperty(p)) {
//       this.options[p] = opt[p];
//     }
//   }
//   this.init();
// }
// TouchNav.isActiveOn = function(elem) {
//   return elem && elem.touchNavActive;
// };
// TouchNav.prototype = {
//   init: function() {
//     if(typeof this.options.navBlock === 'string') {
//       this.menu = document.getElementById(this.options.navBlock);
//     } else if(typeof this.options.navBlock === 'object') {
//       this.menu = this.options.navBlock;
//     }
//     if(this.menu) {
//       this.addEvents();
//     }
//   },
//   addEvents: function() {
//     // attach event handlers
//     var self = this;
//     var touchEvent = (navigator.pointerEnabled && 'pointerdown') || (navigator.msPointerEnabled && 'MSPointerDown') || (this.isTouchDevice && 'touchstart');
//     this.menuItems = lib.queryElementsBySelector(this.options.menuItems, this.menu);

//     var initMenuItem = function(item) {
//       var currentDrop = lib.queryElementsBySelector(self.options.menuDrop, item)[0],
//         currentOpener = lib.queryElementsBySelector(self.options.menuOpener, item)[0];

//       // only for touch input devices
//       if( currentDrop && currentOpener && (self.isTouchDevice || self.isPointerDevice) ) {
//         lib.event.add(currentOpener, 'click', lib.bind(self.clickHandler, self));
//         lib.event.add(currentOpener, 'mousedown', lib.bind(self.mousedownHandler, self));
//         lib.event.add(currentOpener, touchEvent, function(e){
//           if( !self.isTouchPointerEvent(e) ) {
//             self.preventCurrentClick = false;
//             return;
//           }
//           self.touchFlag = true;
//           self.currentItem = item;
//           self.currentLink = currentOpener;
//           self.pressHandler.apply(self, arguments);
//         });
//       }
//       // for desktop computers and touch devices
//       jQuery(item).bind('mouseenter', function(){
//         if(!self.touchFlag) {
//           self.currentItem = item;
//           self.mouseoverHandler();
//         }
//       });
//       jQuery(item).bind('mouseleave', function(){
//         if(!self.touchFlag) {
//           self.currentItem = item;
//           self.mouseoutHandler();
//         }
//       });
//       item.touchNavActive = true;
//     };

//     // addd handlers for all menu items
//     for(var i = 0; i < this.menuItems.length; i++) {
//       initMenuItem(self.menuItems[i]);
//     }

//     // hide dropdowns when clicking outside navigation
//     if(this.isTouchDevice || this.isPointerDevice) {
//       lib.event.add(document.documentElement, 'mousedown', lib.bind(this.clickOutsideHandler, this));
//       lib.event.add(document.documentElement, touchEvent, lib.bind(this.clickOutsideHandler, this));
//     }
//   },
//   mousedownHandler: function(e) {
//     if(this.touchFlag) {
//       e.preventDefault();
//       this.touchFlag = false;
//       this.preventCurrentClick = false;
//     }
//   },
//   mouseoverHandler: function() {
//     lib.addClass(this.currentItem, this.options.hoverClass);
//     jQuery(this.currentItem).trigger('itemhover');
//   },
//   mouseoutHandler: function() {
//     lib.removeClass(this.currentItem, this.options.hoverClass);
//     jQuery(this.currentItem).trigger('itemleave');
//   },
//   hideActiveDropdown: function() {
//     for(var i = 0; i < this.menuItems.length; i++) {
//       if(lib.hasClass(this.menuItems[i], this.options.hoverClass)) {
//         lib.removeClass(this.menuItems[i], this.options.hoverClass);
//         jQuery(this.menuItems[i]).trigger('itemleave');
//       }
//     }
//     this.activeParent = null;
//   },
//   pressHandler: function(e) {
//     // hide previous drop (if active)
//     if(this.currentItem !== this.activeParent) {
//       if(this.activeParent && this.currentItem.parentNode === this.activeParent.parentNode) {
//         lib.removeClass(this.activeParent, this.options.hoverClass);
//       } else if(!this.isParent(this.activeParent, this.currentLink)) {
//         this.hideActiveDropdown();
//       }
//     }
//     // handle current drop
//     this.activeParent = this.currentItem;
//     if(lib.hasClass(this.currentItem, this.options.hoverClass)) {
//       this.preventCurrentClick = false;
//     } else {
//       e.preventDefault();
//       this.preventCurrentClick = true;
//       lib.addClass(this.currentItem, this.options.hoverClass);
//       jQuery(this.currentItem).trigger('itemhover');
//     }
//   },
//   clickHandler: function(e) {
//     // prevent first click on link
//     if(this.preventCurrentClick) {
//       e.preventDefault();
//     }
//   },
//   clickOutsideHandler: function(event) {
//     var e = event.changedTouches ? event.changedTouches[0] : event;
//     if(this.activeParent && !this.isParent(this.menu, e.target)) {
//       this.hideActiveDropdown();
//       this.touchFlag = false;
//     }
//   },
//   isParent: function(parent, child) {
//     while(child.parentNode) {
//       if(child.parentNode == parent) {
//         return true;
//       }
//       child = child.parentNode;
//     }
//     return false;
//   },
//   isTouchPointerEvent: function(e) {
//     return (e.type.indexOf('touch') > -1) ||
//         (navigator.pointerEnabled && e.pointerType === 'touch') ||
//         (navigator.msPointerEnabled && e.pointerType == e.MSPOINTER_TYPE_TOUCH);
//   },
//   isPointerDevice: (function() {
//     return !!(navigator.pointerEnabled || navigator.msPointerEnabled);
//   }()),
//   isTouchDevice: (function() {
//     return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
//   }())
// };

/*
 * Utility module
 */
// lib = {
//   hasClass: function(el,cls) {
//     return el && el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
//   },
//   addClass: function(el,cls) {
//     if (el && !this.hasClass(el,cls)) el.className += " "+cls;
//   },
//   removeClass: function(el,cls) {
//     if (el && this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
//   },
//   extend: function(obj) {
//     for(var i = 1; i < arguments.length; i++) {
//       for(var p in arguments[i]) {
//         if(arguments[i].hasOwnProperty(p)) {
//           obj[p] = arguments[i][p];
//         }
//       }
//     }
//     return obj;
//   },
//   each: function(obj, callback) {
//     var property, len;
//     if(typeof obj.length === 'number') {
//       for(property = 0, len = obj.length; property < len; property++) {
//         if(callback.call(obj[property], property, obj[property]) === false) {
//           break;
//         }
//       }
//     } else {
//       for(property in obj) {
//         if(obj.hasOwnProperty(property)) {
//           if(callback.call(obj[property], property, obj[property]) === false) {
//             break;
//           }
//         }
//       }
//     }
//   },
//   event: (function() {
//     var fixEvent = function(e) {
//       e = e || window.event;
//       if(e.isFixed) return e; else e.isFixed = true;
//       if(!e.target) e.target = e.srcElement;
//       e.preventDefault = e.preventDefault || function() {this.returnValue = false;};
//       e.stopPropagation = e.stopPropagation || function() {this.cancelBubble = true;};
//       return e;
//     };
//     return {
//       add: function(elem, event, handler) {
//         if(!elem.events) {
//           elem.events = {};
//           elem.handle = function(e) {
//             var ret, handlers = elem.events[e.type];
//             e = fixEvent(e);
//             for(var i = 0, len = handlers.length; i < len; i++) {
//               if(handlers[i]) {
//                 ret = handlers[i].call(elem, e);
//                 if(ret === false) {
//                   e.preventDefault();
//                   e.stopPropagation();
//                 }
//               }
//             }
//           };
//         }
//         if(!elem.events[event]) {
//           elem.events[event] = [];
//           if(elem.addEventListener) elem.addEventListener(event, elem.handle, false);
//           else if(elem.attachEvent) elem.attachEvent('on'+event, elem.handle);
//         }
//         elem.events[event].push(handler);
//       },
//       remove: function(elem, event, handler) {
//         var handlers = elem.events[event];
//         for(var i = handlers.length - 1; i >= 0; i--) {
//           if(handlers[i] === handler) {
//             handlers.splice(i,1);
//           }
//         }
//         if(!handlers.length) {
//           delete elem.events[event];
//           if(elem.removeEventListener) elem.removeEventListener(event, elem.handle, false);
//           else if(elem.detachEvent) elem.detachEvent('on'+event, elem.handle);
//         }
//       }
//     };
//   }()),
//   queryElementsBySelector: function(selector, scope) {
//     scope = scope || document;
//     if(!selector) return [];
//     if(selector === '>*') return scope.children;
//     if(typeof document.querySelectorAll === 'function') {
//       return scope.querySelectorAll(selector);
//     }
//     var selectors = selector.split(',');
//     var resultList = [];
//     for(var s = 0; s < selectors.length; s++) {
//       var currentContext = [scope || document];
//       var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
//       for (var i = 0; i < tokens.length; i++) {
//         token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
//         if (token.indexOf('#') > -1) {
//           var bits = token.split('#'), tagName = bits[0], id = bits[1];
//           var element = document.getElementById(id);
//           if (element && tagName && element.nodeName.toLowerCase() != tagName) {
//             return [];
//           }
//           currentContext = element ? [element] : [];
//           continue;
//         }
//         if (token.indexOf('.') > -1) {
//           var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
//           for (var h = 0; h < currentContext.length; h++) {
//             var elements;
//             if (tagName == '*') {
//               elements = currentContext[h].getElementsByTagName('*');
//             } else {
//               elements = currentContext[h].getElementsByTagName(tagName);
//             }
//             for (var j = 0; j < elements.length; j++) {
//               found[foundCount++] = elements[j];
//             }
//           }
//           currentContext = [];
//           var currentContextIndex = 0;
//           for (var k = 0; k < found.length; k++) {
//             if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
//               currentContext[currentContextIndex++] = found[k];
//             }
//           }
//           continue;
//         }
//         if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
//           var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
//           if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
//             attrName = 'htmlFor';
//           }
//           var found = [], foundCount = 0;
//           for (var h = 0; h < currentContext.length; h++) {
//             var elements;
//             if (tagName == '*') {
//               elements = currentContext[h].getElementsByTagName('*');
//             } else {
//               elements = currentContext[h].getElementsByTagName(tagName);
//             }
//             for (var j = 0; elements[j]; j++) {
//               found[foundCount++] = elements[j];
//             }
//           }
//           currentContext = [];
//           var currentContextIndex = 0, checkFunction;
//           switch (attrOperator) {
//             case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
//             case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
//             case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
//             case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
//             case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
//             case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
//             default : checkFunction = function(e) { return e.getAttribute(attrName) };
//           }
//           currentContext = [];
//           var currentContextIndex = 0;
//           for (var k = 0; k < found.length; k++) {
//             if (checkFunction(found[k])) {
//               currentContext[currentContextIndex++] = found[k];
//             }
//           }
//           continue;
//         }
//         tagName = token;
//         var found = [], foundCount = 0;
//         for (var h = 0; h < currentContext.length; h++) {
//           var elements = currentContext[h].getElementsByTagName(tagName);
//           for (var j = 0; j < elements.length; j++) {
//             found[foundCount++] = elements[j];
//           }
//         }
//         currentContext = found;
//       }
//       resultList = [].concat(resultList,currentContext);
//     }
//     return resultList;
//   },
//   trim: function (str) {
//     return str.replace(/^\s+/, '').replace(/\s+$/, '');
//   },
//   bind: function(f, scope, forceArgs){
//     return function() {return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments);};
//   }
// };

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
;window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);

/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
;(function(a){a.picturefill=function(){var b=a.document.getElementsByTagName("span");for(var f=0,l=b.length;f<l;f++){if(b[f].getAttribute("data-picture")!==null){var c=b[f].getElementsByTagName("span"),h=[];for(var e=0,g=c.length;e<g;e++){var d=c[e].getAttribute("data-media");if(!d||(a.matchMedia&&a.matchMedia(d).matches)){h.push(c[e])}}var m=b[f].getElementsByTagName("img")[0];if(h.length){var k=h.pop();if(!m||m.parentNode.nodeName==="NOSCRIPT"){m=a.document.createElement("img");m.alt=b[f].getAttribute("data-alt")}if(k.getAttribute("data-width")){m.setAttribute("width",k.getAttribute("data-width"))}else{m.removeAttribute("width")}if(k.getAttribute("data-height")){m.setAttribute("height",k.getAttribute("data-height"))}else{m.removeAttribute("height")}m.src=k.getAttribute("data-src");k.appendChild(m)}else{if(m){m.parentNode.removeChild(m)}}}}};if(a.addEventListener){a.addEventListener("resize",a.picturefill,false);a.addEventListener("DOMContentLoaded",function(){a.picturefill();a.removeEventListener("load",a.picturefill,false)},false);a.addEventListener("load",a.picturefill,false)}else{if(a.attachEvent){a.attachEvent("onload",a.picturefill)}}}(window));
