/*jslint browser: true*/
/*global $, app, console */

app.pages.imageDemo = {
    run: function () {
        "use strict";
        this.bindEvents();
        $('#camera-error').hide();
    },
    bindEvents: function () {
        "use strict";
        $('#camera-button').unbind('click')
            .click(function () {
                console.log('trying to take picture');
                navigator.camera.getPicture(this.onSuccess, this.onFail, { quality: 10,
                    destinationType: 0
                });
            });
    },
    content : null,
    setContent: function (content) {
        "use strict";
        this.content = content;
    },
    onSuccess: function (imageData) {
        'use strict';
        var image = document.getElementById('camera-img');
        image.src = "data:image/jpeg;base64," + imageData;
    },
    onFail: function (message) {
        'use strict';
        console.log('Failed because: ' + message);
        $('#camera-error').html('Failed because: <br/>' + message).fadeIn('slow');
    }
};

app.pages.imageDemo.setContent('<div class="panel panel-default">' +
    '<div class="panel-heading">' +
    '<h3>Camera Demo</h3>' +
    '</div>' +
    '<div class="panel-body">' +
    '<p>' +
    '<button class="btn-app" id="camera-button"><span class="fa fa-camera"></span> Replace the Picture</button>' +
    '</p>' +
    '<div id="camera-error" class="display-none alert alert-danger"></div>' +
    '<img id ="camera-img" class="img-responsive" src="img/basti.jpg" />' +
    '</div>' +
    '</div>'
    );
