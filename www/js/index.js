/*jslint browser: true*/
/*global $, app, console */
var app = {
    // Application Constructor
    initialize: function () {
        'use strict';
        this.events.bindEvents();
        this.navigation.bindEvents();
        this.navigation.changePage('home');
    },
    navigation: {
        pageHistory: [],
        activePage: 'home',
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
                app.navigation.changePage(target);
                $('#navbar-collapse').slideUp('fast', function () {
                    $('#navbar-collapse').removeClass('in').height(1).css('display', false);
                    $('.navbar-toggle').addClass('collapsed');
                });
            });

        },
        changePage: function (page) {
            "use strict";
            $('.app-page').hide();
            $('#' + page + '-page').slideDown('slow');
            $('.app-page-button').removeClass('active-app-page-button');
            $('.app-page-button [rel="' + page + '"]').addClass('active-app-page-button');
            if (page !== 'home') {
                $('#navbar-back-button').fadeIn('slow');
            } else {
                $('#navbar-back-button').hide();
            }
            app.navigation.activePage = page;
            this.setPageHistory(page);
        },
        setPageHistory: function (page) {
            "use strict";
            this.pageHistory.push(page);
            console.log(this.pageHistory);
        },
        goBackInHistory: function () {
            "use strict";
            /**
             * we have to pop the array to remove the actual page
             */
            app.navigation.pageHistory.pop();
            if (app.navigation.pageHistory.length > 0) {
                var lastPage = app.navigation.pageHistory.pop();
                app.navigation.changePage(lastPage);
            } else {
                if (app.navigation.activePage !== 'home') {
                    app.navigation.changePage('home');
                }
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
    }
};
