Emotivecolor.PostNewController = Ember.ObjectController.extend({
    emotions: [
        'Happy',
        'Flirty',
        'Surprised',
        'Confused',
        'Sad',
        'Anxious',
        'Angry',
        'Love',
        'Neutral',
    ],
    init: function () {
        this.generatedColor();
        this.userData();
        this.posData();
        this.lumData();
    },
    generatedColor: function () {
        var genCol = ('000000' + (Math.floor(Math.random() * 0xFFFFFF)).toString(16)).slice(-6); // Not sure if this is random enough. Seems to favour non-dark colors.
        this.set('currentColor', genCol);
        this.set('hex', genCol);
    },
    userData: function () {
        this.set('userAgent', navigator.userAgent); //Set UserAgent
    },
    posData: function () {
        var self = this;

        function displayPosition(position) {
            self.setProperties({
                'currentLat': position.coords.latitude,
                'currentLng': position.coords.longitude
            });
        }

        function displayError(error) {
            var errors = {
                1: 'Permission denied',
                2: 'Position unavailable',
                3: 'Request timeout'
            };
            Emotivecolor.alertController.popObject(); // Removes Previous Message
            Emotivecolor.alertController.pushObject(Ember.Object.create({
                message: 'Error: ' + errors[error.code]
            }));
        }

        if (navigator.geolocation) {
            var timeoutVal = 10 * 1000 * 1000;
            navigator.geolocation.getCurrentPosition(
                displayPosition,
                displayError, {
                    enableHighAccuracy: true,
                    timeout: timeoutVal,
                    maximumAge: 0
                }
            );
        } else {
            Emotivecolor.alertController.popObject(); // Removes Previous Message
            Emotivecolor.alertController.pushObject(Ember.Object.create({
                message: 'Geolocation is not supported by this browser'
            }));
        }
    },
    lumData: function () {
        var self = this,
            listener = function (event) {
                // Read out the lux value
                self.set('currentLum', event.value);
                //Just grab the luminosity once and then remove the event handler.
                if (self.get('currentLum') !== null) {
                    this.removeEventListener('devicelight', arguments.callee, false);
                }
            };
        window.addEventListener('devicelight', listener);
    },
    controlColor: function (bgHex) {
        var rgb = ntc.rgb('#' + bgHex),
            luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; // per ITU-R BT.709

        if (luma < 128) { // If it is too dark for black
            return '#fff';
        }
        return '#333';
    },
    fillStyle: function () {
        jQuery('body').css('color', this.controlColor(this.get('hex')));
        return 'background-color:#' + this.get('hex');
    }.property('hex'),
    getName: function () {
        var n_match = ntc.name('#' + this.get('hex'));
        this.set('colorName', n_match[1]);
        return this.get('colorName');
    }.property('hex'),
    actions: {
        anonUser: function () {
            Emotivecolor.set('FBUser', 'anonymous');
        },
        click: function (emotion) {
            // Create the new Post model item
            var thisColor = this.get('currentColor'),
                thisUser = Emotivecolor.FBUser,
                post = this.store.createRecord('post', {
                    hex: thisColor,
                    emotion: emotion,
                    r: ntc.rgb('#' + thisColor)[0],
                    g: ntc.rgb('#' + thisColor)[1],
                    b: ntc.rgb('#' + thisColor)[2],
                    h: ntc.hslCamJC('#' + thisColor)[0],
                    s: ntc.hslCamJC('#' + thisColor)[1],
                    l: ntc.hslCamJC('#' + thisColor)[2],
                    date: new Date(),
                    lat: this.get('currentLat'),
                    lng: this.get('currentLng'),
                    ua: this.get('userAgent'),
                    lum: this.get('currentLum'),
                    userid: thisUser
                }),
                messageColorName = this.get('colorName'); // Otherwise it may have changed by the time the message appears. 

            // Check that emotion passed from the template matches something in the above array
            if (jQuery.inArray(emotion, this.emotions) === -1) {
                return;
            }

            // Save the new model
            post.save().then(function () {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({
                    message: messageColorName + ' made you feel ' + emotion + '.'
                }));
            }, function () {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({
                    message: 'Failed to save to database'
                }));
            });
            this.generatedColor();
        }
    }
});