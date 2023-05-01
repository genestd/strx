const { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } = require('amazon-cognito-identity-js');

function login(email, password) {

  return new Promise((resolve, reject) => {
    const poolData = {    
      UserPoolId : "us-west-2_GaPRSslIC", // Your user pool id here    
      ClientId : "235ndfvq07kvd6vv6b0190eato" // Your client id here
    }; 
    
    const userPool = new CognitoUserPool(poolData);
        
    const userData = {
      Username: email,
      Pool: userPool,
    };
    
    const cognitoUser = new CognitoUser(userData);
    
    const authenticationData = {
      Username: email,
      Password: password // the password of the user
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        return resolve(result);
      },
      onFailure: function(err) {
        if (err.code === 'UserNotConfirmedException') {
          return resolve(err)
        }
        return reject(err);
      },
    });
  })
}

function register(email, password) {
  return new Promise((resolve, reject) => {
    const poolData = {    
      UserPoolId : "us-west-2_GaPRSslIC", // Your user pool id here    
      ClientId : "235ndfvq07kvd6vv6b0190eato" // Your client id here
      }; 
    const userPool = new CognitoUserPool(poolData);

    const dataEmail = {
      Name: 'email',
      Value: email,
    };
  
    const attributeEmail = new CognitoUserAttribute(dataEmail);
  
  
    userPool.signUp(email, password, [attributeEmail], null, (err, result) => {
      if (err) {
        // console.log(err.message);
        return reject(err)
      }
      
      resolve({ ok: true, user: result.user })
    });
  });
}

function verify(email, code) {
  return new Promise((resolve, reject) => {
    const poolData = {    
      UserPoolId : "us-west-2_GaPRSslIC", // Your user pool id here    
      ClientId : "235ndfvq07kvd6vv6b0190eato" // Your client id here
      }; 
    const userPool = new CognitoUserPool(poolData);

    const userData = {
      Username: email,
      Pool: userPool,
    };  
  
    const cognitoUser = new CognitoUser(userData);
  
    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function resendCode(email) {
  return new Promise((resolve, reject) => {
    const poolData = {    
      UserPoolId : "us-west-2_GaPRSslIC", // Your user pool id here    
      ClientId : "235ndfvq07kvd6vv6b0190eato" // Your client id here
    }; 
  
    const userPool = new CognitoUserPool(poolData);
  
    const userData = {
      Username: email,
      Pool: userPool,
    };
  
    const cognitoUser = new CognitoUser(userData);
  
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  })
}

function forgotPassword(email) {
  return new Promise((resolve, reject) => {
    const poolData = {    
      UserPoolId : "us-west-2_GaPRSslIC", // Your user pool id here    
      ClientId : "235ndfvq07kvd6vv6b0190eato" // Your client id here
    }; 
  
    const userPool = new CognitoUserPool(poolData);
  
    const userData = {
      Username: email,
      Pool: userPool,
    };
  
    const cognitoUser = new CognitoUser(userData);
  
    cognitoUser.forgotPassword({
      onSuccess: function(data) {
        // successfully initiated reset password request
        return resolve({ message: 'Reset code sent to email'});
      },
      onFailure: function(err) {
        if (err.code === 'InvalidParameterException') {
          return resolve({ unverified: true })
        }
        return reject({ error: err });
      }
    });
  })

}
function resetPassword(email, code, password) {
  return new Promise((resolve, reject) => {
    const poolData = {    
      UserPoolId : "us-west-2_GaPRSslIC", // Your user pool id here    
      ClientId : "235ndfvq07kvd6vv6b0190eato" // Your client id here
    }; 
  
    const userPool = new CognitoUserPool(poolData);
  
    const userData = {
      Username: email,
      Pool: userPool,
    };
  
    const cognitoUser = new CognitoUser(userData);
  
    cognitoUser.confirmPassword(code, password, {
      onSuccess: function(data) {
        // successfully initiated reset password request
        return resolve({ message: 'Password reset'});
      },
      onFailure: function(err) {
        return reject({ error: err });
      }
    });
  })
}
      //Optional automatic callback
      // inputVerificationCode: function(data) {
      //   console.log('Code sent to: ' + data);
      //   var verificationCode = document.getElementById('code').value;
      //   var newPassword = document.getElementById('new_password').value;
      //   cognitoUser.confirmPassword(verificationCode, newPassword, {
      //     onSuccess() {
      //       console.log('Password confirmed!');
      //     },
      //     onFailure(err) {
      //       console.log('Password not confirmed!');
      //     },
      //   });
      // },

module.exports = {
  login,
  register,
  verify,
  resendCode,
  forgotPassword,
  resetPassword
}