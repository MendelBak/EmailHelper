const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);

    this.from_email = new helper.Email('adenizen55@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // This function is provided by the base class (Mail) which is provided by SendGrid (helper.mail)
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  // Helper function tho format email addresses using SendGrid helper.Email function
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  // Helper function that configures SendGrid click tracking using the SendGRid helper.Tracking Settings and ClickTracking functions.
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    this.addTrackingSettings(trackingSettings);
    trackingSettings.setClickTracking(clickTracking);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });

    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
