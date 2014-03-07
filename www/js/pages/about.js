/*jslint browser: true*/
/*global $, app, console */

app.pages.about = {
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

app.pages.about.setContent('<h1>' +
        'About' +
        '</h1>' +
        '<p>' +
        'A simple PhoneGap Framework.' +
        '</p>' +
        '<p>' +
        'It uses bootstrap, font-awesome and jquery ' +
        '</p>' +
        '<p>' +
        'Find more Infos on <a href="https://github.com/bastian-meier/simple-phonegap-framework">GitHub</a>' +
        '</p>');