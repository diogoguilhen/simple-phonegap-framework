/*jslint browser: true*/
/*global $, app, console */

app.pages.contact = {
    run: function () {
        "use strict";
        this.bindEvents();
    },
    bindEvents: function () {
        "use strict";
        $('#send_mail').unbind('click')
            .click(function () {
                app.pages.contact.validateMailForm();
            });
    },
    content : null,
    setContent: function (content) {
        "use strict";
        this.content = content;
    },
    setUiError: function (element, error) {
        "use strict";
        var holder,
            error_text;
        holder = $('#mail-' + element);
        error_text = $('#mail-' + element + ' > .form_error_text');
        if (error) {
            holder.addClass('alert alert-danger');
            error_text.slideDown('slow');
        } else {
            error_text.hide();
            holder.removeClass('alert alert-danger');
        }
    },
    validateMailForm: function () {
        "use strict";
        var mail,
            error;
        mail = {};
        error = false;
        $('.Mail-form > .form-group').removeClass('alert alert-danger');
        $('#mail_success, #mail_error').slideUp('slow');
        mail.name = $('#mail-name-input').val();
        mail.email = $('#mail-email-input').val();
        mail.body = $('#mail-body-input').val();

        if (!app.validate.isValidEmail(mail.email)) {
            error = true;
            this.setUiError('email', true);
        } else {
            this.setUiError('email', false);
        }
        if (!app.validate.hasLength(mail.name, 3)) {
            error = true;
            this.setUiError('name', true);
        } else {
            this.setUiError('name', false);
        }
        if (!app.validate.hasLength(mail.body, 1)) {
            error = true;
            this.setUiError('body', true);
        } else {
            this.setUiError('body', false);
        }

        if (!error) {
            mail.body = 'Mail from SiPhoGaFra: <br/>' + mail.body;
            this.sendMail(mail);
        }
    },
    sendMail: function (mail) {
        "use strict";
        app.ajax.jsonp('kontakt/Mail', mail,
            function (data) {
                $('#mail_success').slideDown('slow');
                $('#mail-name-input').val('');
                $('#mail-email-input').val('');
                $('#mail-body-input').val('');
            },
            function (data) {
                $('#mail_error').slideDown('slow');
                if (data.email) {
                    app.pages.contact.setUiError('email', true);
                }
                if (data.name) {
                    app.pages.contact.setUiError('name', true);
                }
                if (data.body) {
                    app.pages.contact.setUiError('body', true);
                }
            });
    }
};

app.pages.contact.setContent('<h1>' +
        'Contact me:' +
        '</h1>' +
        '<div class="Mail-form">' +
        '<div class="form-group" id="mail-name">' +
        '<div class="form_error_text">Please type in a your name</div>' +
        '<div class="input-group">' +
        '<span class="input-group-addon"><span class="fa fa-user"></span></span>' +
        '<input id="mail-name-input" type="text" class="form-control" placeholder="Your Name">' +
        '</div>' +
        '</div>' +
        '<div class="form-group" id="mail-email">' +
        '<div class="form_error_text">This is not a valid Email Adress</div>' +
        '<div class="input-group">' +
        '<span class="input-group-addon"><span class="fa fa-envelope"></span></span>' +
        '<input id="mail-email-input" type="text" class="form-control" placeholder="Your EmailAdress">' +
        '</div>' +
        '</div>' +
        '<div class="form-group" id="mail-body">' +
        '<div class="form_error_text">No Message?</div>' +
        '<div class="input-group">' +
        '<span class="input-group-addon"><span class="fa fa-keyboard-o"></span></span>' +
        '<textarea id="mail-body-input" class="form-control" placeholder="Your Message"></textarea>' +
        '</div>' +
        '</div>' +
        '<div id="mail_success" class="display-none alert alert-success">Thanks for your message ...</div> ' +
        '<div id="mail_error" class="display-none alert alert-danger">An error occurred!</div>' +
        '<p>' +
        '<button id="send_mail" class="btn-app">' +
        '<span class="glyphicon glyphicon-export"> </span>' +
        ' Send' +
        '</button>' +
        '</div>' +
        '</p>');