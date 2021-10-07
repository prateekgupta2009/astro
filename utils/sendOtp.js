const request = require('request');
var messagebird = require('messagebird')('AIzaSyBG-EQ-9T1Wha3pP3YtfXE6_MsaMFFB2H4');
module.exports = sendOtp = {
    sendOTP:(mobileno)=>{
        const otp = sendOtp.generateOTP(6);
        const msg = `${otp} is Your verification code`;
        var params = {
            'originator': 'MessageBird',
            'recipients': [
                    `91${mobileno}`
              ],
              'body':msg
        }
      return  new Promise((resolve,reject) => {
        messagebird.messages.create(params, function (err, response) {
            if (err) {
              return console.log(err);
            }
            console.log(response.body);
            resolve({body:response.body,otp:otp,message:msg})

          });
      })
      
    },


// module.exports = sendOtp = {
//     sendOTP: (mobileno) => {
//         const otp = sendOtp.generateOTP(6);
//         const msg = `${otp} is your verification code.`;
//         const auth = {
//             username: 'innovianstechnologies',
//             password: 'gupta1989',
//             sender: 'INOVIN',
//             sendto: `91${mobileno}`,
//             message: msg
//         }
//         const options = {
//             'method': 'GET',
//             'url': `http://45.249.108.134/api.php?username=${auth.username}&password=${auth.password}&sender=${auth.sender}&sendto=${auth.sendto}&message=${auth.message}`,
//         };
//         return new Promise((resolve, reject) => {
//             request(options, (error, response) => {
//                 if (error) {
//                     console.log(error)
//                     reject(error);
//                 }
//                 console.log(response.body);
//                 resolve({body: response.body, otp: otp, message: msg})
//             });
//         })


//     },
    generateOTP: (length) => {
        try {
            const digits = '0123456789';
            const alphabets = 'abcdefghijklmnopqrstuvwxyz';
            const upperCase = alphabets.toUpperCase();
            const specialChars = '#!&@';
            const rand = (min, max) => {
                const random = Math.random();
                return Math.floor(random * (max - min) + min);
            };
            const arrLength = length || 10;
            const generateOptions = {};
            generateOptions.digits = true;
            generateOptions.alphabets = false;
            generateOptions.upperCase = false;
            generateOptions.specialChars = false;
            const allowsChars =
                ((generateOptions.digits || '') && digits) +
                ((generateOptions.alphabets || '') && alphabets) +
                ((generateOptions.upperCase || '') && upperCase) +
                ((generateOptions.specialChars || '') && specialChars);
            let otp = '';
            for (let index = 0; index < arrLength; ++index) {
                const charIndex = rand(0, allowsChars.length - 1);
                otp += allowsChars[charIndex];
            }
            return otp;
        } catch (error) {
            console.log(error);
        }
    }
}