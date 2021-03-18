"use strict"

const RegistrationForm = new LogoutButton();
RegistrationForm.action = () => ApiConnector.logout(function (response) {
    if (response.success === true) {
        location.reload();
    }
});



ApiConnector.current(function (response) {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});


const ExchangeRates = new RatesBoard();
const displayCurrency = ApiConnector.getStocks(function (response) {
    if (response.success === true) {
        ExchangeRates.clearTable();
        ExchangeRates.fillTable(response.data);
    }
});
setInterval(displayCurrency, 60000);


const Remittance = new MoneyManager();
Remittance.addMoneyCallback = (data) => ApiConnector.addMoney(data, function (response) {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
        Remittance.setMessage(response.success, 'Успешно');
    } else {
        Remittance.setMessage(response.success, 'Ошибка');
    }

});

Remittance.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, function (response) {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
        Remittance.setMessage(response.success, 'Успешно');
    } else {
        Remittance.setMessage(response.success, 'Ошибка');
    }
});

Remittance.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, function (response) {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
        Remittance.setMessage(response.success, 'Успешно');
    } else {
        Remittance.setMessage(response.success, 'Ошибка');
    }
});



const FavoriteUser = new FavoritesWidget();
FavoriteUser.getFavorites = () => (function (response) {
    if (response.success === true) {
        FavoriteUser.clearTable();
        FavoriteUser.fillTable(response.data);
        Remittance.updateUsersList(response.data);
    }
});

FavoriteUser.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, function (response) {
    if (response.success === true) {
        FavoriteUser.clearTable();
        FavoriteUser.fillTable(response.data);
        Remittance.updateUsersList(response.data);
        FavoriteUser.setMessage(response.success, 'Успешно')
    } else {
        FavoriteUser.setMessage(response.success, 'Ошибка');
    }
});


FavoriteUser.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, function (response) {
    if (response.success === true) {
        FavoriteUser.clearTable();
        FavoriteUser.fillTable(response.data);
        Remittance.updateUsersList(response.data);
        FavoriteUser.setMessage(response.success, 'Успешно')
    } else {
        FavoriteUser.setMessage(response.success, 'Ошибка');
    }
});
