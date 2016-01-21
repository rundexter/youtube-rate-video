var _ = require('lodash'),
    google = require('googleapis'),
    util = require('./util.js'),
    service = google.youtube('v3');

var pickInputs = {
        id: 'id',
        rating: 'rating'
    };

module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var OAuth2 = google.auth.OAuth2,
            oauth2Client = new OAuth2(),
            credentials = dexter.provider('google').credentials();
        // set credential
        oauth2Client.setCredentials({
            access_token: _.get(credentials, 'access_token')
        });
        google.options({ auth: oauth2Client });
        service.videos.rate(util.pickInputs(step, pickInputs), function (error) {
            error? this.fail(error) : this.complete({success: true});
        }.bind(this));
    }
};
