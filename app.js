var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
const Pusher = require('pusher')
var mongoose = require('mongoose');
var cors = require('cors');
var database = require('./config/database');
var path = require('path')
var https = require('https')
var http = require('http')
var fs = require('fs')
var morgan = require('morgan')
var debug = require('debug')('vcloudx-server-api:server');
var auth = require('http-auth');
var basicAuth = require('basic-auth');
var vcxconfig = require('./config/vcxconfig')
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
var port = normalizePort(vcxconfig.SERViCE.port);

const httpServer = require("http").createServer(app);
var server = app.listen(port, "0.0.0.0", ()=>{
  console.log(`server is running at ${port}`)

  io.on('connection', function(socket) {
    const { id } = socket.client;
    console.log("user"+ id)
    // const data={
    //   id:id,
    //   name:'raju',
    //   astrid:'123'
    // }
    socket.on('chat',function(user){
      console.log(user)
          socket.broadcast.emit("chat",user)

    })
  })
});
let io     = require('socket.io')(server);

// var io = socket(server);
// io.on('connection', function(socket) {
//   const { id } = socket.client;

//   console.log(`Client connected: ${id}`);
//      socket.emit('chat', id);

//   // socket.on('chat', function (data) {
//   //     console.log('Sending update!');
//   //     socket.emit(`chat, ${id}`);
//   // });
// }); 





var index = require('./routes/index');
var sendOtp = require('./routes/sendOtp');
var signUpUser = require('./routes/signUpUser');
var askQuestionUser = require('./routes/askQuestion');
var loginUser = require('./routes/loginUser');
var astrologerList = require('./routes/astrologer');
var astrologer_price = require('./routes/astrologer_prices');
var astrologer_language = require('./routes/astrologer_languages');
var astrologer_time = require('./routes/astrologer_time_availabilities');
var astrologer_bank_detail = require('./routes/astrologer_bank_details');
var astrologer_categories = require('./routes/astrologer_categories');
var astrologer_commissions = require('./routes/astrologer_commissions');
var e_storeProduct_Router= require('./routes/e_store');
var estore_addons_List= require('./routes/estore_addons');
var astrologer_detail = require('./routes/astrologer_detail');
var daily_panchang= require('./routes/dailyPunchang');
var match_kundli = require('./routes/matchKundli');
const { request } = require('express');
var rozerpayRouter = require('./routes/paymentGetway');
var doshaRouter = require('./routes/dosha');
var horoscopeRouter = require('./routes/horoscope');
var audioCallingRouter = require('./routes/audiocalling');
var subcategoriesRouter = require('./routes/subcategories');
var categoriesRouter = require('./routes/categories');
var onlinePujaRouter = require('./routes/online_puja');
// var addCartRouter = require('./routes/addCart');
var walletHistoryRouter= require('./routes/walletHistory');
var dailyHorscopeRouter = require('./routes/dailyHorscope');
var estore_userRouter = require('./routes/estore_User_address');
var estore_dispatch_Router = require('./routes/estoreDispatchUser');
var onlinePujaBookUserRoter = require('./routes/onlinePujaBookUser');
var User_addressRouter = require('./routes/userAddress');
// var VideoCallRouter = require('./routes/VideoCallRoom');
var user_CartRouter = require('./routes/userCart');
var ProductOrdrDetailRouter = require('./routes/product_order_detail');
var UserWalletBalRouter = require('./routes/user_walletBalence');
var PranichealingRouter = require('./routes/pranicHealing');
var ReportpranicHealer= require('./routes/reportPrenicHealer');
var AstrologerStatus = require('./routes/astrologerStatus');
var AstrologerReport = require('./routes/astrologerReport');
var AstrologerLogin =require('./routes/astrologerLogin');
var AstrologinHistory=require('./routes/astrologinHistory');
var AstroReviewRouter = require('./routes/astroReview'); 
var UserDispatchAddRouter= require('./routes/userDispatchAdd');
var VideoCallRouter= require('./routes/vcxroom');
var VideoCallNotification= require('./routes/VideoCallnotification');
var AskquestionUserRouter = require('./routes/askQuestionUser');
var AddonelabelsRouter = require('./routes/addone_labels');
var PujaAddoneRouter = require('./routes/onlinePujaAddone_Labels');
var GoogleapiRouter = require('./routes/googleMap');
var AudioCallRouter = require('./routes/AudioCall');
var Estore_CreateOrderRouter = require('./routes/estore_order')
var Estore_order_DetailRouter = require('./routes/estore_order_detail')
var Estore_payment_getwayRouter=require('./routes/estore_payment_getway');
var Estore_payment_detailRouter=require('./routes/estore_payment_detail');
var CallUserDetailRouter=require('./routes/callUserDetail');
var OnlinePujaCreateOrder = require('./routes/onlinePuja_create_order');
var OnnlinePuja_Create_order_detail= require('./routes/onlinePuja_order_detail')
var OnlinePujaCreateOrderDetailRouter=require('./routes/product_order_detail');
var OnlinePujaPayementDetailRouter= require('./routes/onlinePuja_payment_detail');
var pranicHealingCreateOrderRouter= require('./routes/pranicHealing_Create_order');
var pranichealingCreatePaymentDeatilRouter= require('./routes/pranicHealing_payment_detail');
var askquestionnPriceRouter  = require('./routes/ask_question_price');
var askquestionnCreateOrder= require('./routes/askQuestion_order');
var AskquestionnOrderDetailRouter = require('./routes/askQuestion_order_detail');
var AskQuestionPayemenntDetail = require('./routes/ask_question_payment_detail');
var Chat_OrderRouter = require('./routes/chat_order');
var VideoCallOrderRouter = require('./routes/videoCall_order');
var InternationalAudioCallRouter = require('./routes/internationalAudioCall');
var ReportDetailRouter = require('./routes/reporterDetail');
var AstrologerListFilter = require('./routes/astrologerListFilter');
var OnlinePujaListFilter = require('./routes/onlinePujaListFilter');

// var app = express();
global.__base = __dirname + "/"



mongoose.Promise = global.Promise;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(fileUpload(
  {
    useTempFiles : true,
    tempFileDir : path.join(__dirname,'tmp'),
}
));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// io.set('origins', '*localhost:8000');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//  app.post('/message',(req,res)=>{
//    const name=req.body.name
//  }
// app.post('/message',async(req,res)=>{
//   try{

//     const name=req.body.name;
//     const astroid=req.body.astroid
//     // console.log(name)
//     io.on('connection', function(socket) {
//       const { id } = socket.client;
//       const data={
//         id:id,
//         name:name,
//         astrid:astroid
//       }
    
//     //  console.log(`Client connected: ${id}`);
//          io.emit('chat', data)
//     }); 
//    await res.send(name)
//   }catch(err){
//     res.send({msg:err})

//   }
  
// })


//   console.log(`Client connected: ${id}`);
//      io.emit('chat', id)
// }); 
// app.use(require('morgan')('short'));
// const pusher = new Pusher({
//   appId:'1167435',
//   key:'175baa55b21d13c21bca',
//   secret:'87c09e703496f62cb00b',
//   cluster:'ap2',
//   encrypted:true
// })

// app.post('/message',(req,res)=>{
//   const payload= req.body;
//   pusher.trigger('chat','message',payload);
//   res.send(payload)
// })

//  app.post('/message',(req,res)=>{
//   io.on('connection', function(socket) {
//     const { id } = socket.client;
  
//     console.log(`Client connected: ${id}`);
//     const  data=req.body
//        socket.emit('chat',data );
//       // socket.emit('chat', id);
  
//     // socket.on('chat', function (data) {
//     //     console.log('Sending update!');
//     //     socket.emit(`chat, ${id}`);
//     // });
//   });
  

  //})




app.use('/', index);

app.use('/api', sendOtp);
app.use('/api', signUpUser);
app.use('/api', askQuestionUser);
app.use('/api', loginUser);
app.use('/api',astrologerList);
app.use('/api',astrologer_price);
app.use('/api',astrologer_language);
app.use('/api',astrologer_time);
app.use('/api',astrologer_bank_detail);
app.use('/api',astrologer_categories);
app.use('/api',astrologer_commissions);
app.use('/api',e_storeProduct_Router);
app.use('/api',estore_addons_List);
app.use('/api',astrologer_detail);
app.use('/api',daily_panchang);
app.use('/api',match_kundli);
app.use('/api',rozerpayRouter);
app.use('/api',doshaRouter);
app.use('/api',horoscopeRouter);
app.use('/api',audioCallingRouter);
app.use('/api',subcategoriesRouter);
app.use('/api',categoriesRouter);
app.use('/api',onlinePujaRouter);
// app.use('/api',addCartRouter);
app.use('/api',walletHistoryRouter)
app.use('/api',dailyHorscopeRouter);
app.use('/api',estore_userRouter);
app.use('/api',estore_dispatch_Router);
app.use('/api',onlinePujaBookUserRoter);
app.use('/api',User_addressRouter);
// app.use('/api',VideoCallRouter);
app.use('/api',user_CartRouter);
app.use('/api',ProductOrdrDetailRouter);
app.use('/api',UserWalletBalRouter);
app.use('/api',PranichealingRouter);
app.use('/api',ReportpranicHealer);
app.use('/api',AstrologerStatus);
app.use('/api',AstrologerReport);
app.use('/api',AstrologerLogin);
app.use('/api',AstrologinHistory);
app.use('/api',AstroReviewRouter);
app.use('/api',UserDispatchAddRouter);
app.use('/api',VideoCallRouter);
app.use('/api',VideoCallNotification);
app.use('/api',AskquestionUserRouter);
app.use('/api',AddonelabelsRouter);
app.use('/api',PujaAddoneRouter);
app.use('/api',GoogleapiRouter);
app.use('/api',AudioCallRouter)
app.use('/api',Estore_CreateOrderRouter);
app.use('/api',Estore_order_DetailRouter);

app.use('/api',Estore_payment_getwayRouter);
app.use('/api',Estore_payment_detailRouter);
app.use('/api',CallUserDetailRouter);
app.use('/api',OnlinePujaCreateOrder);
app.use('/api',OnlinePujaCreateOrderDetailRouter);
app.use('/api',OnlinePujaPayementDetailRouter);
app.use('/api',pranicHealingCreateOrderRouter);
app.use('/api',pranichealingCreatePaymentDeatilRouter);
app.use('/api',askquestionnPriceRouter);
app.use('/api',askquestionnCreateOrder);
app.use('/api',AskquestionnOrderDetailRouter);
app.use('/api',AskQuestionPayemenntDetail);
app.use('/api',Chat_OrderRouter);
app.use('/api',VideoCallOrderRouter);
app.use('/api',InternationalAudioCallRouter);
app.use('/api',ReportDetailRouter);
app.use('/api',OnnlinePuja_Create_order_detail);
app.use('/api',AstrologerListFilter);
app.use('/api',OnlinePujaListFilter);


















app.get('/log', (req, res) => {
  res.sendFile(path.join(__dirname + '/logs.log'));
});





/* configure the storage in multer */

mongoose.connect(database.dbConnection, { useNewUrlParser: true
   , useUnifiedTopology: true
  , useFindAndModify: false, useCreateIndex: true,
  

})
  .then(() => console.log('connection successfull'))
  .catch((err)=>{
    console.log(err)
  });

  // Initialization of basic HTTP / HTTPS Service

  var server;

if (vcxconfig.SERViCE.listen_ssl === true) {
    var options = {
        key: fs.readFileSync(vcxconfig.Certificate.ssl_key).toString(),
        cert: fs.readFileSync(vcxconfig.Certificate.ssl_cert).toString(),
    }
    if (vcxconfig.Certificate.sslCaCerts) {
        options.ca = [];
        for (var ca in vcxconfig.Certificate.sslCaCerts) {
            options.ca.push(fs.readFileSync(vcxconfig.Certificate.sslCaCerts[ca]).toString());
        }
    }
    server = https.createServer(options, app);
} else {
    server = http.createServer(app);
}
// var port = normalizePort(vcxconfig.SERViCE.port);

// app.use(expressStatusMonitor({ websocket: io, port: app.get('8000') })); 

// Utility Function: Sanitizing Configured Port No.

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
      return val;
  }

  if (port >= 0) {
      return port;
  }

  return false;
}



if(process.env.NODE_ENV==='development'){
  // set static folder
  app.use(express.static('./frontend/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
  })
}
//'0.0.0.0'
  // const port = 8000;
// app.listen(port, "0.0.0.0", ()=>{
//   console.log(`server is running at ${port}`)
// })
// app.listen(port, "0.0.0.0", ()=>{
//   console.log(`server is running at ${port}`)
// })
module.exports = app;
