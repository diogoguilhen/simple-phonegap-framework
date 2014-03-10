/*jslint browser: true*/
/*global $, app, console */

app.pages.config = {
    run: function () {
        "use strict";
        this.bindEvents();
    },
    bindEvents: function () {
        "use strict";
    },
    content : null,
    setContent: function (content) {
        "use strict";
        this.content = content;
    }
};

app.pages.config.setContent('<h1>Settings</h1>' +
        '<div class="panel panel-default">' +
        '<div class="panel-heading">' +
        '<h3>Login</h3>' +
        '</div>' +
        '<div class="panel-body">' +
        '<p>' +
        '<div class="input-group">' +
        '<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>' +
        '<input type="text" class="form-control" placeholder="Username">' +
        '</div>' +
        '</p>' +
        '<p>' +
        '<div class="input-group">' +
        '<span class="input-group-addon"><span class="glyphicon glyphicon-credit-card"></span></span>' +
        '<input type="password" class="form-control" placeholder="Password">' +
        '</div>' +
        '</p>' +
        '</div>' +
        '</div>' +
        '<p>' +
        '<button id="config-save" class="btn-app">' +
        '<span class="glyphicon glyphicon-lock"> </span>' +
        ' Save' +
        '</button>' +
        '</p>'
        );