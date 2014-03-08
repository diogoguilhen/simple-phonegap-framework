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
                var text = '';
                if (navigator.camera !== undefined) {
                    text += 'navigator.camera is definded';
                } else {
                    text += 'navigator.camera is undefinded';
                }
                if (navigator.camera.getPicture !== undefined) {
                    text += '<br>navigator.camera.getPicture is definded';
                } else {
                    text += '<br>navigator.camera.getPicture is undefinded';
                }
                if (typeof navigator.camera.getPicture !== 'function') {
                    text += '<br>navigator.camera.getPicture is not a function';
                } else {
                    text += '<br>navigator.camera.getPicture is a function';
                }
                if (navigator.camera.DestinationType !== undefined) {
                    text += '<br>navigator.camera.DestinationType is definded';
                } else {
                    text += '<br>navigator.camera.DestinationType is undefinded';
                }
                if (navigator.camera.DestinationType.DATA_URL !== undefined) {
                    text += '<br>navigator.camera.DestinationType.DATA_URL is definded';
                    text += '<br>navigator.camera.DestinationType.DATA_URL: ' + navigator.camera.DestinationType.DATA_URL;
                } else {
                    text += '<br>navigator.camera.DestinationType.DATA_URL is undefinded';
                }
                if (Camera !== undefined) {
                    text += '<br>Camera is definded';
                } else {
                    text += '<br>Camera is undefinded';
                }
                if (Camera.DestinationType !== undefined) {
                    text += '<br>Camera.DestinationType is definded';
                } else {
                    text += '<br>Camera.DestinationType is undefinded';
                }
                if (Camera.DestinationType.DATA_URL !== undefined) {
                    text += '<br>Camera.DestinationType.DATA_URL is definded';
                    text += '<br>Camera.DestinationType.DATA_URL : ' + Camera.DestinationType.DATA_URL;
                } else {
                    text += '<br>Camera.DestinationType.DATA_URL is undefinded';
                }

                $('#camera-error').html(text).fadeIn('slow');
                navigator.camera.getPicture(this.onSuccess, this.onFail, { quality: 20,
                    destinationType: navigator.camera.DestinationType.DATA_URL
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
