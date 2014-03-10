/*jslint browser: true*/
/*global $, app, console */

app.pages.home = {
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

app.pages.home.setContent('<div class="panel panel-default">' +
        '<div class="panel-heading">' +
        '<h3>SiPhoGaFra</h3>' +
        '</div>' +
        '<div class="panel-body">' +
        '<h2>Simple PhoneGap Framework</h2>' +
        '<p>' +
        'With this Framework you can build Smartphone Apps with html5, css3 and js. ' +
        '</p>' +
        '<p>' +
        'It is a Hobby Project of <a target="_blank" href="http://bastianmeier.de">me</a>.' +
        '</p>' +
        '<img class="img-responsive" src="img/basti.jpg" />' +
        '</div>' +
        '</div>'
        );