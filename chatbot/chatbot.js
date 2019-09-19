'use strict';

const dialogflow = require('dialogflow');
const structjson = require('./structjson.js');
const config = require('../config/keys');

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);




module.exports = {
    textQuery: async function(text, parameters = {}){

        let self = module.exports;
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: text,
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);

        responses = await self.handleAction(responses);
        return responses;

    },
    eventQuery: async function(event, parameters = {}){

        let self = module.exports;
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: event,
                parameters: structjson.jsonToStructProto(parameters),
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLanguageCode,
                },
            }
        };
        let responses = await sessionClient.detectIntent(request);

        responses = await self.handleAction(responses);
        return responses;

    },
    handleAction: function(responses){
        return responses;
    }
}