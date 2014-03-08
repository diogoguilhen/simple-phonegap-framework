/*jslint browser: true*/
/*global $, app, console */

app.pages.notificationDemo = {
    run: function () {
        "use strict";
        this.bindEvents();
        $('#camera-error').hide();
    },
    bindEvents: function () {
        "use strict";
        $('#notification-alert').unbind('click')
            .click(function () {
                app.pages.notificationDemo.showAlert();
            });
        $('#notification-vibrate').unbind('click')
            .click(function () {
                app.pages.notificationDemo.vibrate();
            });
    },
    content : null,
    setContent: function (content) {
        "use strict";
        this.content = content;
    },
    showAlert: function () {
        'use strict';
        navigator.notification.alert(
            'Example Alert!',  // message
            null,         // callback
            'Alert',            // title
            'Done'                  // buttonName
        );
    },
    vibrate: function () {
        'use strict';
        navigator.notification.vibrate(2000);
    }
};

app.pages.notificationDemo.setContent('<div class="panel panel-default">' +
    '<div class="panel-heading">' +
    '<h3>Notification Demo</h3>' +
    '</div>' +
    '<div class="panel-body">' +
    '<div id="notifications-error" class="display-none alert alert-danger"></div>' +
    '<p>' +
    '<button id="notification-alert" class="btn-app">alert</button>' +
    '</p>' +
    '<p>' +
    '<button id="notification-vibrate" class="btn-app">vibrate</button>' +
    '</p>' +
    '</div>' +
    '</div>'
    );
