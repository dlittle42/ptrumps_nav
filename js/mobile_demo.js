var _demo = (function(){
    var _current_feed = 0, _current_section = null, _dir, _scroll = 0, method = {
        init: function(){
            method.nav_buttons();
            method.catch_resize();
            setTimeout(function(){
                method.show_section('feed');
            }, 500);
        },
        nav_buttons: function(){
            jQuery('.mainNavBtn, .moreNavItem').each(function(){
                jQuery(this).find('a').on('click', function(e){
                    if (jQuery(this).attr('id') != 'linkPF') {
                        e.preventDefault();
                    }
                    if(jQuery(this).attr('id').split('menu_')[1] != _current_section && jQuery(this).attr('id') != 'menu_more' && jQuery(this).attr('id') != 'linkPF') {
                        method.show_section(jQuery(this).attr('id').split('menu_')[1]);
                    } else if (jQuery(this).attr('id') == 'menu_more') {
                        if (jQuery('#main_nav_list').hasClass('moreNavActive')) {
                            jQuery('#main_nav_list').css({
                                'top': 0
                            }).removeClass('moreNavActive')
                        } else {
                            jQuery('#main_nav_list').css({
                                'top': -(parseFloat(jQuery('#menu_more').parent().position().top))
                            }).addClass('moreNavActive')
                        }
                    }
                });
            });
            jQuery('.navButton').on('click', function(){
                jQuery('.navItemsList').css({
                    'height': jQuery('#main_nav_list').height() - jQuery('.moreNavItems').height()
                })
                jQuery('.navMenu').css({
                    'height': window.innerHeight
                });
                if (jQuery('.navMenu').hasClass('navMenuActive')) {
                    jQuery('.navMenu').removeClass('navMenuActive');
                    jQuery('.navButton').removeClass('navButtonActive');
                    jQuery('.navIcon').removeClass('navIconActive');
                    jQuery('body').removeClass('bodyDisableScroll');
                    jQuery('.siteWrapper').css({
                        'min-height': jQuery('#section_'+_current_section).height() + jQuery('.mainNavBar').height() 
                    });
                    jQuery(window).scrollTop(_scroll)
                } else {
                    jQuery('.navMenu').addClass('navMenuActive');
                    jQuery('.navButton').addClass('navButtonActive');
                    jQuery('.navIcon').addClass('navIconActive');
                    _scroll = jQuery(window).scrollTop();
                    jQuery('.siteWrapper').css({
                        'min-height': window.innerHeight
                    });
                    jQuery('body').addClass('bodyDisableScroll'); 
                }
            });
        },
        catch_resize: function(){
            jQuery(window).on('resize scroll', function(){
                if (jQuery('.navMenu').hasClass('navMenuActive')){
                    jQuery('.navMenu').css({
                        'height': window.innerHeight
                    });
                } else {
                    jQuery('.siteWrapper').css({
                        'min-height': jQuery('#section_'+_current_section).height() + jQuery('.mainNavBar').height() 
                    });
                }
                var _last = jQuery('.feedButton:nth-last-child(2)');
                if (parseFloat(_last.position().left) > parseFloat(jQuery('.feedBtnContainer').width())) {
                    jQuery('.feedBtnContainerInner').css({
                        'width': _last.position().left + _last.width() + (parseFloat(_last.css('padding-right')) * 2) + 2 
                    });
                    jQuery('.feedBtnContainer').addClass('feedBtnContainerScroll');
                } else if (jQuery('.feedBtnContainer').width() > jQuery('.feedBtnContainerInner').width()){
                    jQuery('.feedBtnContainer').removeClass('feedBtnContainerScroll');
                    jQuery('.feedBtnContainerInner').css({
                        'width': 'auto'
                    })
                }
            })
        },
        show_section: function(section){
            jQuery('.siteWrapper').css({
                'min-height': jQuery('#section_'+section).height() + jQuery('.mainNavBar').height()
            });
            jQuery('.mainNavBtnActive').removeClass('mainNavBtnActive');
            jQuery('#menu_'+section).parent().addClass('mainNavBtnActive');
            if (_current_section == null) {
              jQuery('#section_'+section).addClass('transitionAll').addClass('sectionContainerActive');
            } else {
                var _old = jQuery('.sectionContainerActive'),
                _new = jQuery('#section_'+section);
                _old.removeClass('transitionAll').removeClass('sectionContainerActiveSlide');
                _new.addClass('transitionAll').addClass('sectionContainerActive').addClass('sectionContainerActiveSlide');
                setTimeout(function(){
                    _old.removeClass('sectionContainerActive');
                }, 300);
            }
            _current_section = section;
            setTimeout(function(){
                if (jQuery('#main_nav_list').hasClass('moreNavActive')) {
                    jQuery('#main_nav_list').css({
                        'top': 0
                    }).removeClass('moreNavActive')
                } 
                jQuery('.navMenu').removeClass('navMenuActive');
                jQuery('.navButton').removeClass('navButtonActive');
                jQuery('.navIcon').removeClass('navIconActive');
                if (jQuery('body').hasClass('bodyAbsolute')) {
                    jQuery('body').removeClass('bodyAbsolute');
                }
            }, 300);
            if (section == 'feed' && jQuery('#section_feed').attr('data-value') != 'set') {
                method.feed_setup();
            }
        },
        feed_setup: function(){
            jQuery('.feedButton').each(function(){
                jQuery(this).on('click', function(){
                    method.feed_change(jQuery(this).attr('data-value'))
                })
            });
            var _last = jQuery('.feedButton:nth-last-child(2)');
            if (parseFloat(_last.position().left) > parseFloat(jQuery('.feedBtnContainer').width())) {
                jQuery('.feedBtnContainerInner').css({
                    'width': _last.position().left + _last.width() + (parseFloat(_last.css('padding-right')) * 2) + 2 
                });
                jQuery('.feedBtnContainer').addClass('feedBtnContainerScroll');
            }
            jQuery('#feed-demo').swipe({
                triggerOnTouchEnd: true,
                swipeStatus: method.swipeStatus,
                allowPageScroll: "vertical",
                threshold: 100
            });
            jQuery('#section_feed').attr('data-value', 'set');
        },
        feed_change: function(val) {
            if ((parseFloat(val) != parseFloat(_current_feed))) {
                if ((parseFloat(val) > parseFloat(_current_feed))) {
                    for (var i=0; i < val; i++){
                        jQuery('#feed_'+(jQuery('.feedBtnContainerInner').find('div[data-value="'+i+'"]').attr('id').split('feed_btn_')[1])).removeClass('feedActive').removeClass('feedLeft').removeClass('feedRight').css({
                            "transition-duration": ".3s",
                            "opacity": 0,
                            "transform": "translate3d(0, 0, 0)"
                        });
                    }
                } else if ((parseFloat(val) < parseFloat(_current_feed))) {
                    for (var i=val; i < (jQuery('#feed-demo').children().length -1); i++){
                        jQuery('#feed_'+(jQuery('.feedBtnContainerInner').find('div[data-value="'+i+'"]').attr('id').split('feed_btn_')[1])).removeClass('feedActive').removeClass('feedLeft').removeClass('feedRight').css({
                            "transition-duration": ".3s",
                            "opacity": 0,
                            "transform": "translate3d(100%, 0, 0)"
                        });
                    }
                }
                jQuery('#feed_'+(jQuery('.feedBtnContainerInner').find('div[data-value="'+val+'"]').attr('id').split('feed_btn_')[1])).removeClass('feedRight').removeClass('feedLeft').addClass('feedActive').css({
                    "transition-duration": ".3s",
                    "opacity": 1,
                    "transform": "translate3d(0%, 0, 0)"
                });
                method.adjust_feed(jQuery('#feed_'+(jQuery('.feedBtnContainerInner').find('div[data-value="'+val+'"]').attr('id').split('feed_btn_')[1])))
            } 
        },
        swipeStatus: function(event, phase, direction, distance) {
            if (phase == "move" && (direction == "left" || direction == "right")) {
                var duration = 0, _distance = 50;
                _dir = direction;
                if (direction == "left" && distance >= _distance) {
                    method.drag_feed(distance, duration, direction);
                } else if (direction == "right" && distance >= _distance) {
                    method.drag_feed(-distance, duration, direction);
                }
            } else if (phase == "cancel") {
                method.cancel_drag_feed(direction);
            } else if (phase == "end") {
                if (direction == "right") {
                    if (jQuery('.feedActive').prev()[0]){
                        method.feed_change_swipe('prev');
                    }
                } else if (direction == "left") {
                    if (!jQuery('.feedActive').next().hasClass('clearAll')) {
                        method.feed_change_swipe('next');
                    }
                } else if (direction == "up" || direction == "down") {
                    method.cancel_drag_feed(direction);  
                }
            }
        },
        drag_feed: function(distance, duration, direction){
            if ((direction == 'left' && !jQuery('.feedActive').next().hasClass('clearAll')) || (direction == 'right' && jQuery('.feedActive').prev()[0])) {
                jQuery('.feedActive').css("transition-duration", (duration / 1000).toFixed(1) + "s");
                (direction == 'right' && jQuery('.feedActive').prev()[0]) ? jQuery('.feedActive').prev().css("transition-duration", (duration / 1000).toFixed(1) + "s") : jQuery('.feedActive').next().css("transition-duration", (duration / 1000).toFixed(1) + "s");
                var _percent = (Math.abs(distance) / jQuery('.feedActive').width())
                if (direction == 'right' && jQuery('.feedActive').prev()[0]) {
                    jQuery('.feedActive').prev().css({
                        'opacity': 1
                    });
                    jQuery('.feedActive').css({
                        "transform": "translate3d(" + (((_percent) * 100).toString()) + "%,0,0)",
                        'opacity': (1 - _percent)
                    });
                } else {
                    jQuery('.feedActive').css({
                        'opacity': 1
                    });
                    jQuery('.feedActive').next().css({
                        "transform": "translate3d(" + (((1 - _percent) * 100).toString()) + "%, 0,0)",
                        'opacity': _percent
                    });
                }
            }
        },
        cancel_drag_feed: function(direction) {
            if ((direction == 'left' || _dir == 'left') && !jQuery('.feedActive').next().hasClass('clearAll')) {
                jQuery('.feedActive').next().css({
                    "transform": "translate3d(100%, 0, 0)",
                    'opacity': 0
                });
            } else if((direction == 'right' || _dir == 'right') && jQuery('.feedActive').prev()[0]) {
                jQuery('.feedActive').css({
                    "transform": "translate3d(0%, 0, 0)",
                    'opacity': 1
                });
            }
        },
        feed_change_swipe: function(dir) {
            var _active = jQuery('.feedActive'), 
            _next = ((dir == 'next') ? jQuery('.feedActive').next() : jQuery('.feedActive').prev());
            _active.removeClass('feedActive').addClass('feed'+((dir == 'next') ? 'Right' : 'Left')).css({
                "transition-duration": ".3s",
                "opacity": 0,
                "transform": "translate3d("+((dir == 'next') ? '0%' : '100%')+",0,0)"
            });
            _next.removeClass('feedLeft').removeClass('feedRight').addClass('feedActive').css({
                "transition-duration": ".3s",
                "opacity": 1,
                "transform":"translate3d(0%,0,0)"
            });
            method.adjust_feed(_next);
        },
        adjust_feed: function(btn) {
            _current_feed = btn.attr('data-value');
            jQuery('.feedButtonActive').removeClass('feedButtonActive');
            jQuery('#feed_btn_'+btn.attr('id').split('feed_')[1]).addClass('feedButtonActive');
            if (jQuery('.feedBtnContainer').hasClass('feedBtnContainerScroll')) {
                jQuery('.feedBtnContainer').stop().animate({
                    'scrollLeft' : jQuery('#feed_btn_'+btn.attr('id').split('feed_')[1]).position().left - 20
                }, 300);
            }
            jQuery(window).scrollTop(0)
        }

    }
    return method;
})();

jQuery(document).ready(function() {
    _demo.init();  
});