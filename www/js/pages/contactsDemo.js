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
            contactsList = $('#contacts-list'),
            contactsListInner = '';
        contactsList.html('<div class="spinner"><span class="fa fa-spin fa-spinner"></span></div>');
        // display the address information for all contacts
        for (i = 0; i < contacts.length; i++) {
            contactsListInner += '<div class="contacts-list-item clearfix">' +
                '<div class="contacts-name">' + contacts[i].displayName  +  '</div>' +
                '</div>';
        }
        contactsList.html(contactsListInner);
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
    '<div class="spinner"><span class="fa fa-spin fa-spinner"></span></div>' +
    '</div>' +
    '</div>' +
    '</div>'
    );
