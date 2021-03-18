"use strict"
 const AutoForm  = new UserForm; 

AutoForm.loginFormCallback = (data) => ApiConnector.login(data, function (response) {
        if (response.success) {
            location.reload();
        } else {
       AutoForm.setLoginErrorMessage(response.error);
}
});

AutoForm.registerFormCallback = (data) => ApiConnector.register(data, function (response) {
    if (response.success) {
        location.reload();
    } else {
   AutoForm.setRegisterErrorMessage(response.error);
}
});

