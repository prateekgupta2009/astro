var swaggerconf = {
    swaggerOptions: {
     swaggerDefinition:  {
         info: {
           title: 'astrology api ',
           version: '1.0.0',
          //  decription: process.env.SWAGGER_DESC
         },
         servers:'http://localhost:8000/'
        //  host: process.env.SWAGGER_HOST,
        //  basePath: process.env.SWAGGER_BASE_PATH,
       },
    //  apis:['./routes/*.js', './models/*.js', './routes/**/*.js'],
    apis:['../appjs']
    }
}

module.exports = swaggerconf
