let auth = require("../utilities/authentication.js");
let config = require("../config/config.json");
let utils = require("../utilities/validateConfig.js");
const fetch = require('node-fetch');

async function getTileEmbedDetails(token, dashboardId,tileId) {
    const reportUrl = `https://api.powerbi.com/v1.0/myorg/dashboards/${dashboardId}/tiles/${tileId}`
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": utils.getAuthHeader(token)
    };

    // Used node-fetch to call the PowerBI REST API
    let result = await fetch(reportUrl, {
        method: 'GET',
        headers: headers,
    })
    if (!result.ok)
        throw result;
    return result.json();
}

async function getTileEmbedToken(token, embedData, workspaceId,dashboardId) {
    const embedTokenUrl = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/dashboards/${dashboardId}/tiles/${embedData.id}/GenerateToken`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": utils.getAuthHeader(token)
    };

    const formData = {
        "accessLevel":"View",
        "datasets":[{'id':embedData.datasetId}]
    };

    // Used node-fetch to call the PowerBI REST API
    let result = await fetch(embedTokenUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
    });
    if (!result.ok)
        throw result;
    return result.json();
}

async function generateEmbedToken() {

    // Check for any non-existing credential or invalid credential from config.json file
    configCheckResult = utils.validateConfig();
    if (configCheckResult) {
        return {
            "status": 400,
            "error": configCheckResult
        };
    }

    let tokenResponse = null;
    let errorResponse = null;

    // Call the function to get the response from the authentication request
    try {
        tokenResponse = await auth.getAuthenticationToken();
    } catch (err) {
        if (err.hasOwnProperty('error_description') && err.hasOwnProperty('error')) {
            errorResponse = err.error_description;
        } else {

            // Invalid PowerBI Username provided
            errorResponse = err.toString();
        }
        return {
            "status": 401,
            "error": errorResponse
        };
    }

    // Extract AccessToken from the response
    let token = tokenResponse.accessToken;

    // embedData will be used for resolution of the Promise
    let embedData = null;

    // Call the function to get the Report Embed details
    try {
        embedData = await getTileEmbedDetails(token, config.dashboardId,config.tileID);
        // console.log(embedData)
        // Call the function to get the Embed Token
        let embedToken = await getTileEmbedToken(token, embedData, config.workspaceId,config.dashboardId);
        return {
            "accessToken": embedToken.token,
            "embedUrl": embedData.embedUrl,
            "expiry": embedToken.expiration,
            "status": 200,
            "tokenId": embedToken.tokenId,
            "embedData": embedData
        };
    } catch (err) {
        console.log(err)
        return {
            "status": err.status,
            "error": 'Error while retrieving report embed details\r\n' + err.statusText + '\r\nRequestId: \n'
        }
    }
}



module.exports = {
    generateEmbedToken: generateEmbedToken
}