/*jslint browser: true*/
/*global $, app, console */

app.pages.contactsDemo = {
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
        document.addEventListener("deviceready", this.onDeviceReady(), false);
    },
    content : null,
    setContent: function (content) {
        "use strict";
        this.content = content;
    },
    onDeviceReady: function () {
        'use strict';
        var options = new ContactFindOptions(),
            filter = ["displayName", "photos"];

        // find all contacts
        options.filter = "";
        options.multiple = true;
        navigator.contacts.find(filter, this.onSuccess, this.onError, options);
    },
    onSuccess: function (contacts) {
        'use strict';
        var i,
            contactsList = $('#contacts-list');
        console.log(contacts);
        // display the address information for all contacts
        for (i = 0; i < contacts.length; i++) {
            contactsList.append('<div class="contacts-list-item clearfix">' +
                '<div class="contacts-name">' + contacts[i].displayName  +  '</div>' +
                '</div>');
        }
    },
    onError: function (contactError) {
        'use strict';
        console.log('onError!');
        $('#contacts-error').html('Error finding contacts: <br/> ' + contactError).show();
    }
};

app.pages.contactsDemo.setContent('<div class="panel panel-default">' +
    '<div class="panel-heading">' +
    '<h3>Contacts Demo</h3>' +
    '</div>' +
    '<div class="panel-body">' +
    '<div id="contacts-error" class="display-none alert alert-danger"></div>' +
    '<div id="contacts-list">' +
    '</div>' +
    '</div>' +
    '</div>'
    );
