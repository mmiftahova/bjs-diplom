"use strict"

const RegistrationForm = new LogoutButton();
RegistrationForm.action = () => ApiConnector.logout(function (response) {
    if (response.success) {
        location.reload();
    }
});



ApiConnector.current(function (response) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});


const ExchangeRates = new RatesBoard();
const displayCurrency = ApiConnector.getStocks(function (response) {
    if (response.success) {
        ExchangeRates.clearTable();
        ExchangeRates.fillTable(response.data);
    }
});
setInterval(displayCurrency, 60000);


const Remittance = new MoneyManager();
Remittance.addMoneyCallback = (data) => ApiConnector.addMoney(data, function (response) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        Remittance.setMessage(response.success, 'Баланс пополнен');
    } else {
        Remittance.setMessage(response.success, response.error);
    }

});

Remittance.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, function (response) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        Remittance.setMessage(response.success, 'Конвертация валюты произведена успешно');
    } else {
        Remittance.setMessage(response.success, response.error);
    }
});

Remittance.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, function (response) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        Remittance.setMessage(response.success, 'Выполнен перевод денежных средств');
    } else {
        Remittance.setMessage(response.success, response.error);
    }
});



const FavoriteUser = new FavoritesWidget();
FavoriteUser.getFavorites = () => (function (response) {
    if (response.success) {
        FavoriteUser.clearTable();
        FavoriteUser.fillTable(response.data);
        Remittance.updateUsersList(response.data);
    }
});

FavoriteUser.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, function (response) {
    if (response.success) {
        FavoriteUser.clearTable();
        FavoriteUser.fillTable(response.data);
        Remittance.updateUsersList(response.data);
        FavoriteUser.setMessage(response.success, 'Добавлен новый пользователь')
    } else {
        FavoriteUser.setMessage(response.success, response.error);
    }
});


FavoriteUser.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, function (response) {
    if (response.success) {
        FavoriteUser.clearTable();
        FavoriteUser.fillTable(response.data);
        Remittance.updateUsersList(response.data);
        FavoriteUser.setMessage(response.success, 'Пользователь удален')
    } else {
        FavoriteUser.setMessage(response.success, response.error);
    }
});
