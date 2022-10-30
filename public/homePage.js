'use strict';
const exit = new LogoutButton();
exit.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};

ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

const tableBody = new RatesBoard();
const showStocks = () => {
    ApiConnector.getStocks(response => {
        if (response.success === true) {
            tableBody.clearTable();
            tableBody.fillTable(response.data);

        }

    });
}
showStocks();
setInterval(() => {
    showStocks()
}, 1000);


const addMoneyForm = new MoneyManager();
addMoneyForm.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
        }
        addMoneyForm.setMessage(response.success, response.success ? 'Кошелек пополнен' : response.error);

    });
};

addMoneyForm.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
        }
        addMoneyForm.setMessage(response.success, response.success ? 'Успешно сконвертирована валюта' : response.error);

    })
}

addMoneyForm.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
        }
        addMoneyForm.setMessage(response.success, response.success ? 'Перевод выполнен' : response.error);

    })
}
const favoritesTableBody = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favoritesTableBody.clearTable();
        favoritesTableBody.fillTable(response.data);
        addMoneyForm.updateUsersList(response.data);
    }
});

favoritesTableBody.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        console.log(response)
        if (response.success === true) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(response.data);
            addMoneyForm.updateUsersList(response.data);
        }
        favoritesTableBody.setMessage(response.success, response.success ? 'Контакт успешно добавлен в избранное' : response.error);

    });
};


favoritesTableBody.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(response.data);
            addMoneyForm.updateUsersList(response.data);
        }

        favoritesTableBody.setMessage(response.success, response.success ? 'Контакт успешно удален' : response.error);

    });
}