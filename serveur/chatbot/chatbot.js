"use strict";
const structjson = require("./structjson");
const dialogflow = require("dialogflow");
const config = require("../config/keys");

const projectID = config.googleProjectID;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};

const sessionClient = new dialogflow.SessionsClient({
  projectID,
  credentials,
});
const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

const Registration = require("../models/Registration");

module.exports = {
  textQuery: async function (text, parameters = {}) {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  eventQuery: async function (event, parameters = {}) {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  handleAction: function (responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;
    switch (queryResult.action) {
      case "recommendcourses-yes":
        console.log(queryResult.allRequiredParamsPresent);
        if (queryResult.allRequiredParamsPresent) {
          console.log(queryResult.parameters);
          self.saveRegistration(queryResult.parameters.fields);
        }
        break;
      case "recommendation-yes":
        console.log(queryResult.allRequiredParamsPresent);
        if (queryResult.allRequiredParamsPresent) {
          console.log(queryResult.parameters);
          self.saveRegistration(queryResult.parameters.fields);
        }
        break;
    }
    return responses;
  },

  saveRegistration: async function (fields) {
    const registration = new Registration({
      category: fields.category.stringValue,
      course: fields.course.stringValue,
      level: fields.level.stringValue,
    });
    try {
      let reg = await registration.save();
      console.log(reg);
    } catch (err) {
      console.log(err);
    }
  },
};
