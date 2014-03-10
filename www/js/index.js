/*jslint browser: true*/
/*global $, config, app, console */
var app = {
    // Application Constructor
    initialize: function () {
        'use strict';
        this.template.createPages();
        app.events.bindEvents();
        app.navigation.bindEvents();
        if (app.pages.home.run !== undefined && typeof app.pages.home.run === 'function') {
            app.pages.home.run();
        }
        this.template.includeColorScheme(config.colorScheme);
    },
    template: {
        createPages: function () {
            "use strict";
            var key;
            for (key in app.pages) {
                //noinspection JSUnfilteredForInLoop
                if (app.pages.hasOwnProperty(key) && app.pages[key].run !== undefined && typeof app.pages[key].run === 'function' && app.pages[key].content !== undefined) {
                    //noinspection JSUnfilteredForInLoop
                    $('#' + key + '-page > .container').html(app.pages[key].content);
                }
            }
        },
        includeColorScheme: function (colorScheme) {
            "use strict";
            if (colorScheme === 'green') {
                var cssInclude = '<link href="css/' + colorScheme + '.css" rel="stylesheet">';
                //$('head').append(cssInclude);
            }
        }
    },
    pages: {
    },
    navigation: {
        pageHistory: [],
        activePage: 'home',
        collapseNavbar: function () {
            'use strict';
            $('#navbar-collapse').slideUp('fast', function () {
                $('#navbar-collapse').removeClass('in')
                    .height(1).css('display', false);
                $('.navbar-toggle').addClass('collapsed');
            });
        },
        bindEvents: function () {
            "use strict";
            /**
             * back button
             */
            $('#navbar-back-button').click(function () {
                app.navigation.goBackInHistory();
            });
            document.addEventListener("backbutton", app.navigation.goBackInHistory, false);
            /**
             * menue button
             */
            document.addEventListener("menubutton", app.navigation.onMenuButton, false);
            /**
             * menu item click
             */
            $('.app-page-button').click(function () {
                var target = $(this).attr('rel');
                app.navigation.collapseNavbar();
                app.navigation.changePage(target);
            });

        },
        changePage: function (page) {
            "use strict";
            app.navigation.collapseNavbar();
            console.log('change to ' + page);
            if (page !== undefined && page !== app.navigation.activePage && app.pages[page] !== undefined) {
                $('.app-page').hide();
                $('.app-page-button').removeClass('active-app-page-button');
                $('.app-page-button [rel="' + page + '"]').addClass('active-app-page-button');
                if (page !== 'home') {
                    $('#navbar-back-button').fadeIn('slow');
                } else {
                    $('#navbar-back-button').hide();
                }
                app.navigation.activePage = page;
                this.setPageHistory(page);
                $('#' + page + '-page').slideDown('slow');
                if (app.pages[page].run !== undefined && typeof app.pages[page].run === 'function') {
                    app.pages[page].run();
                }
            }
        },
        setPageHistory: function (page) {
            "use strict";
            if (page !== this.pageHistory[this.pageHistory.length - 1]) {
                this.pageHistory.push(page);
            }
            console.log(this.pageHistory);
        },
        goBackInHistory: function () {
            "use strict";
            /**
             * we have to pop the array to remove the actual page
             */
            var newPage;
            app.navigation.pageHistory.pop();
            if (app.navigation.pageHistory.length > 0) {
                newPage = app.navigation.pageHistory.pop();
            } else {
                if (app.navigation.activePage !== 'home') {
                    newPage = 'home';
                }
            }
            if (newPage !== app.navigation.activePage) {
                app.navigation.changePage(newPage);
            }
        },
        onMenuButton: function () {
            "use strict";
            app.navigation.changePage('config');
        }
    },
    events: {
        bindEvents: function () {
            'use strict';
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        onDeviceReady: function () {
            'use strict';
            app.navigation.pageHistory = [];
        }
    },
    validate: {
        isValidEmail: function (str) {
            "use strict";
            var filter;
            filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return filter.test(str);
        },
        hasLength: function (str, length) {
            "use strict";
            return str.length >= length;
        }
    },
    ajax: {
        ajaxError: function (error) {
            "use strict";
            console.log(error);
        },
        jsonp: function (script, request, callbackSuccess, callbackError) {
            'use strict';
            $.ajax({
                type: "POST",
                url: "http://bastianmeier.de/Ajax/" + script,
                dataType: 'jsonp',
                data: request,
                success: function (data) {
                    if (data.result === 'true') {
                        if (callbackSuccess && typeof callbackSuccess === 'function') {
                            if (data.content) {
                                callbackSuccess(data.content);
                            } else {
                                callbackSuccess();
                            }
                        }
                    } else {
                        if (callbackError && typeof callbackError === 'function') {
                            if (data.error) {
                                callbackError(data.error);
                            } else {
                                callbackError();
                            }
                        } else {
                            app.ajax.ajaxError(data.error);
                        }
                    }
                }
            });
        }
    }
};
