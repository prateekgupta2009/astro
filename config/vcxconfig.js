///////////////////////////////////////////////////////
//
// Application: Sample Web App
// Version: 1.0.0
// The Sample Web App demonstrates the use of EnableX Server API & Web Toolkit.
// The main motivation behind this application is to demonstrate usage of APIs and
// allow developers to ramp up on app by hosting on their own devices instead of
// directly using servers.
//
// Released: Nov 26, 2018
//
// File: config.js
// Service Configuration File, need to be modified as needed.
//
/////////////////////////////////////////////////////


var vcxconfig={};

vcxconfig.pwdFilePath = "./files/users.htpasswd"

vcxconfig.SERViCE={
    name: "EnableX Sample Web App",                // Name of the App
    version: "1.0.0",                               // Version
    path: "/v1",                                    // EnableX Server API Version Route to access
    domain: "localhost",                       // Domain / Sub-Domain to host this Service
    port  : "8000",                                 // Port No. of this Service
    listen_ssl : true                               // Enable SSL. Set always to "true"
};



// SSL Certificate (Self Signed or Registered)

vcxconfig.Certificate={
    ssl_key:"cert/yourdomain.key",
    ssl_cert:"cert/yourdomain.crt",              // Path to .key file
    sslCaCerts : ["cert/yourdomain.ca-bundle"]    // Path to CA[chain]
};



// Enbalex Server API Infomration

vcxconfig.SERVER_API_SERVER={
    host: 'api.enablex.io',                    // FQDN of Service
    port: '',                                       // PORT of Service (If specified by EnableX)
};

vcxconfig.APP_ID    = "60cb0edc7b4a080d793ea6ac";               // APP ID to access Server API
vcxconfig.APP_KEY   = "yEyEymeGaqaaaAaAaNybagaZuZyzyHupyMa2";   // APP KEY to access Server API



// vcxconfig.clientPath = "/Users/rajukumar/Desktop/One-to-One-Video-Sample-Web-Application-Nodejs/client";                 // Client End Point UI Route

var module = module || {};
module.exports = vcxconfig;
