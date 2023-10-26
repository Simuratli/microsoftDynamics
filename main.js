const clientIdInput = document.getElementById("clientIdInput");
const tenantIdInput = document.getElementById("tenantIdInput");
const crmUrlInput = document.getElementById("crmUrlInput");
const loginButtonMain = document.getElementById("loginButton");


// const logoutButton = document.getElementById("logoutButton");
// const getAccountsButton = document.getElementById("getAccountsButton");
// const sendAccountsButton = document.getElementById("sendAccountsButton");
// const accountsTable = document.getElementById("accountsTable");
// const accountsTableBody = document.getElementById("accountsTableBody");
// const message = document.getElementById("message");


console.log("main js loaded")

function checkCredentialURLs() {
    if (clientIdInput.value !== '' && tenantIdInput.value !== '' && crmUrlInput.value !== '') {
        loginButtonMain.removeAttribute('disabled');

        console.log("test is not disabled")
    } else {
        loginButtonMain.setAttribute('disabled', 'true');
        console.log("test is  disabled")
    }
}


clientIdInput.addEventListener('input', checkCredentialURLs);
tenantIdInput.addEventListener('input', checkCredentialURLs);
crmUrlInput.addEventListener('input', checkCredentialURLs);