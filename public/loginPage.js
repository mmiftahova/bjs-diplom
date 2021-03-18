"use strict"
 const AutoForm  = new UserForm; 



AutoForm.loginFormCallback = (data) => ApiConnector.login(data, function (response) {
        if (response.success === true) {
            location.reload();
        } else {
       AutoForm.setLoginErrorMessage("Ошибка");
}
});

AutoForm.registerFormCallback = (data) => ApiConnector.register(data, function (response) {
    if (response.success === true) {
        location.reload();
    } else {
   AutoForm.setRegisterErrorMessage("Ошибка");
}
});

