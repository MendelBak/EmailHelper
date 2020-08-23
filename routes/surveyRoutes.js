const mongoose = require('mongoose');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

// Middleware
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

const Mailer = require('../services/Mailer');

// Survey template
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// models
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // ES6 destructuring
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      // These don't need to assigned from the variables above due to ES6 magic..
      title,
      subject,
      body,
      // Takes list of CSV emails, split them into an array, based on comma location, and map them into an array of objects with a property of 'email' and corresponding string value.
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      // Returns the autogenerated MongodDb user id.
      _user: req.user.id,
      dateSent: Date.now(),
    });

    try {
      const mailer = new Mailer(survey, surveyTemplate(survey));

      // Send survey to recipients via SendGrid
      await mailer.send();

      // Persist survey to DB.
      survey.save();

      // Deduct credit from user
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.redirect('/surveys/surveyComplete');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // Grabs the path from the URL
    const parserObj = new Path('/api/surveys/:surveyId/:choice');

    // _.chain is a lodash function that allows multiple lodash functions to be chained. Requires '.value()' to return the final result of the chain() function.
    _.chain(req.body)
      .map(({ url, email }) => {
        // Looks for specific pattern (as defined below) in the URL after extracting the pathname from the URL, using the URL package.
        const match = parserObj.test(new URL(url).pathname);

        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice,
          };
        }
      })
      // Filters for undefined objects.
      .compact()
      // Filters for unique events.
      .uniqBy('email', 'surveyId')
      // For each survey response, this will search the MongoDB, increment and swap responded property, of the appropriate survey/user.
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            //   increment the 'choice' property by 1.
            // Square brackets is ES6 key interpolation, not an array.
            $inc: { [choice]: 1 },
            // '$' corresponds to the found '$elemMatch' object.
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }
        ).exec(); // This executes the query.
      })
      .value();

    res.send({});
  });

  // TODO: To improve search speed and usability, return a list of survey titles, make them links, and create separate route to drill into sent surveys
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });
};