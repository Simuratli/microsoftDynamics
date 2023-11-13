const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const setupButton = document.getElementById("setupButton");
const getAccountsButton = document.getElementById("getAccountsButton");
const sendAccountsButton = document.getElementById("sendAccountsButton");
const accountsTable = document.getElementById("accountsTable");
const accountsTableBody = document.getElementById("accountsTableBody");
const message = document.getElementById("message");
const loginWithButtonForm = document.getElementById("loginWithButton")
const mainCredentialsForm = document.getElementById('mainCredentials')
const clientIdInput = document.getElementById("clientIdInput");
const tenantIdInput = document.getElementById("tenantIdInput");
const crmUrlInput = document.getElementById("crmUrlInput");
const mainCapture = document.getElementById('mainCapture')
const list = document.getElementById('list')
let username = "";
let contacts = null;
let accounts = null;
// Create the main myMSALObj instance


let baseUrl = localStorage.getItem("crmUrlInput");      //<= Change this
let clientId = localStorage.getItem("clientIdInput");; //<= Change this
let tenantId = localStorage.getItem("tenantIdInput");; //<= Change this
const redirectUrl = "/";
let webAPIEndpoint = baseUrl + "/api/data/v9.2";


// base "https://orgfdbab4d2.api.crm.dynamics.com"
// clientId "8d5c861b-044a-4978-b3ac-d9d913169ff2"
// tenantId "b1f4d83b-a807-43ec-b4af-fc3b4c20f9c1"


const changeRequestedNames = (name) => {
   switch (name) {
      case 'userName':
         return 'fullName';
      case 'jobTitle':
         return 'jobtitle';
      case 'location':
         return 'address1_name';
      case 'customer':
         return 'parentcustomerid_account';
      case 'phone':
         return 'mobilephone';
      case 'email':
         return 'emailaddress1';
      case 'linkedinUrl':
         return "uds_linkedin"
      case 'customerId':
         return "uds_linkedincompanyid"
      case 'companyName':
         return "name"
      case 'numberOfWorkers':
         return "numberofemployees"
      case 'companyUrl':
         return "websiteurl"
      case 'idOfCompany':
         return "uds_linkedincompanyid"
      case 'linkedinCompanyUrl':
         return "uds_linkedinprofilecompanyurl"
      case 'salesCompanyUrl':
         return "uds_salesnavigatorcompanyurl"
      case 'salesUrl':
         return "uds_salesnavigatoruserurl"
      default:
         return "aaa";
   }
}






// Configuration object to be passed to MSAL instance on creation. 

let msalConfig = {
   auth: {
      clientId: clientId,
      // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
      authority: "https://login.microsoftonline.com/" + tenantId,
      redirectUri: redirectUrl,
   },
   cache: {
      cacheLocation: "localStorage" // This configures where your cache will be stored
   },
   system: {
      loggerOptions: {
         loggerCallback: (level, message, containsPii) => {
            if (containsPii) {
               return;
            }
            switch (level) {
               case msal.LogLevel.Error:
                  console.error(message);
                  return;
               case msal.LogLevel.Info:
                  console.info(message);
                  return;
               case msal.LogLevel.Verbose:
                  console.debug(message);
                  return;
               case msal.LogLevel.Warning:
                  console.warn(message);
                  return;
            }
         }
      }
   }
};


let myMSALObj = new msal.PublicClientApplication(msalConfig);




// Called from signIn or selectAccount functions
function showWelcomeMessage(username) {
   message.innerHTML = `Welcome ${username}`;
   loginWithButtonForm.style.display = "none";
   logoutButton.style.display = "block";
   // getAccountsButton.style.display = "block";
   sendAccountsButton.style.display = "block";
   mainCredentialsForm.style.display = 'none'
   mainCapture.style.display = 'block'
   list.style.visibility = 'visible'
   list.style.position = 'relative'
   list.style.display = 'flex'

}




// new part here 


const updateMsalFunction = () => {
   // console.log('client',localStorage.getItem("clientIdInput"))
   // console.log('tenant',localStorage.getItem("tenantIdInput"))
   // console.log('crm',localStorage.getItem("crmUrlInput"))
   baseUrl = localStorage.getItem("crmUrlInput")
   webAPIEndpoint = localStorage.getItem("crmUrlInput") + "/api/data/v9.2";
   clientId = localStorage.getItem("clientIdInput")
   tenantId = localStorage.getItem("tenantIdInput")
   myMSALObj = new msal.PublicClientApplication(msalConfig);
   msalConfig = {
      auth: {
         clientId: localStorage.getItem("clientIdInput"),
         // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
         authority: "https://login.microsoftonline.com/" + localStorage.getItem("tenantIdInput"),
         redirectUri: redirectUrl,
      },
      cache: {
         cacheLocation: "localStorage" // This configures where your cache will be stored
      },
      system: {
         loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
               if (containsPii) {
                  return;
               }
               switch (level) {
                  case msal.LogLevel.Error:
                     console.error(message);
                     return;
                  case msal.LogLevel.Info:
                     console.info(message);
                     return;
                  case msal.LogLevel.Verbose:
                     console.debug(message);
                     return;
                  case msal.LogLevel.Warning:
                     console.warn(message);
                     return;
               }
            }
         }
      }
   }


}




function checkCredentialURLs(e) {

   switch (e.target.name) {
      case 'clientIdInput':
         localStorage.setItem("clientIdInput", e.target.value);
         break;
      case 'tenantIdInput':
         localStorage.setItem("tenantIdInput", e.target.value);
         break;
      case 'crmUrlInput':
         localStorage.setItem("crmUrlInput", e.target.value);
         break;
   }


   if (clientIdInput.value !== '' && tenantIdInput.value !== '' && crmUrlInput.value !== '') {
      setupButton.removeAttribute('disabled');
   } else {
      setupButton.setAttribute('disabled', 'true');
   }
}


clientIdInput.addEventListener('input', checkCredentialURLs);
tenantIdInput.addEventListener('input', checkCredentialURLs);
crmUrlInput.addEventListener('input', checkCredentialURLs);

clientIdInput.addEventListener("blur", updateMsalFunction)
tenantIdInput.addEventListener("blur", updateMsalFunction)
crmUrlInput.addEventListener("blur", updateMsalFunction)


updateMsalFunction()

// new part finished here 






// Sets the username. Called at the end of this script.
function selectAccount() {
   const currentAccounts = myMSALObj.getAllAccounts();
   if (currentAccounts.length === 0) {
      return;
   } else if (currentAccounts.length > 1) {
      // Add choose account code here
      console.warn("Multiple accounts detected.");
   } else if (currentAccounts.length === 1) {
      username = currentAccounts[0].name;
      console.log(currentAccounts, 'currentAccounts')
      showWelcomeMessage(username);
   }
}





const setup = () => {
   updateMsalFunction()
   mainCredentialsForm.style.display = 'none'
   setupButton.style.display = 'none'
   loginButton.style.display = 'block'
   loginWithButtonForm.style.display = 'flex'
}



console.log(localStorage.getItem('tenantIdInput'), "tenantIdInput")
console.log(localStorage.getItem('clientIdInput'), "clientIdInput")
console.log(localStorage.getItem('crmUrlInput'), "crmUrlInput")


if (localStorage.getItem('tenantIdInput') && localStorage.getItem('crmUrlInput') && localStorage.getItem('clientIdInput')) {
   const currentAccounts = myMSALObj.getAllAccounts();


   if(currentAccounts.length ===0){
      setup()
      console.log(currentAccounts,'allalalala in')
   }else{
      selectAccount()
      console.log(currentAccounts,'allalalala out')
   }
}


// Called by the loginButton
function signIn() {

   console.log(msalConfig, 'aloye')

   myMSALObj.loginPopup({
      scopes: ["User.Read", baseUrl + "/user_impersonation"] //<= Includes Dataverse scope
   })
      .then(response => {
         if (response !== null) {
            username = response.account.name;
            console.log(response.account, 'account')
            showWelcomeMessage(username);
         } else {
            selectAccount();
         }
      })
      .catch(error => {
         console.error(error);
      });
}

// Shows greeting and enables logoutButton and getAccountsButton



// Called by the logoutButton
function signOut() {
   const logoutRequest = {
      account: myMSALObj.getAccountByUsername(username),
      postLogoutRedirectUri: msalConfig.auth.redirectUri,
      mainWindowRedirectUri: msalConfig.auth.redirectUri
   };

   console.log(logoutRequest, 'logoutRequest')

   myMSALObj.logoutPopup(logoutRequest);
}

// Provides the access token for a request, opening pop-up if necessary.
// Used by GetAccounts function
function getTokenPopup(request) {
   request.account = myMSALObj.getAccountByUsername(username);
   return myMSALObj.acquireTokenSilent(request)
      .catch(error => {
         console.warn("Silent token acquisition fails. Acquiring token using popup");
         if (error instanceof msal.InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails
            return myMSALObj.acquireTokenPopup(request)
               .then(tokenResponse => {
                  console.log(tokenResponse);
                  return tokenResponse;
               }).catch(error => {
                  console.error(error);
               });
         } else {
            console.warn(error);
         }
      });
}


// get url parameters and show inside list


let urlParameters = {}

const url = new URL(window.location.href);

const trimmedQueryString = url.search.slice(1);
const keyValuePairs = trimmedQueryString.split('&');

keyValuePairs.forEach(pair => {
   const [key, value] = pair.split('=');
   urlParameters[key] = decodeURIComponent(value.replace(/\+/g, ' '));
});

// urlParams.forEach((value, name) => {
//    urlParameters = JSON.parse(value)
//    console.log(value, 'value')
// });
console.log(urlParameters,'urlParameters')

const entries = Object.entries(urlParameters);

// for (const [key, value] of entries) {
//    const inputElement = document.createElement('input')
//    inputElement.value = value
//    inputElement.classList.add('input')
//    inputElement.placeholder = key
//    inputElement.name = key
//    list && list.appendChild(inputElement)
// }

const fieldsForUserForms = document.getElementById('fieldsForUser')
const addValuesToInputFields = () => {
   
   const inputfields = document.querySelectorAll(".inputForUser")
   for (const [key, value] of entries) {
      for (i = 0; i < inputfields.length; ++i) {
        console.log(key, inputfields[i].getAttribute('name'), 'outside comer inputfields')
         if(inputfields[i].getAttribute('name') === key){
            inputfields[i].setAttribute("value",value)
         }
      }
   }
}

addValuesToInputFields()



// get url parameters and show inside list end


// Retrieves top 10 account records from Dataverse
function getAccounts(callback) {
   // Gets the access token
   getTokenPopup({
      scopes: [baseUrl + "/.default"]
   })
      .then(response => {
         //filter contacts?$select=name&$filter=contains(name,'Eljan')
         getDataverse("contacts?$select=uds_linkedin&$filter=contains(uds_linkedin,'https://www.linkedin.com/in/simuratli/')", response.accessToken, callback);
      }).catch(error => {
         console.error(error);
      });
}

async function getContacts(callback) {
   // Gets the access token
   const response = await getTokenPopup({ scopes: [baseUrl + "/.default"] })
   getDataverse("contacts", response.accessToken, callback);
}





async function filterBackend(url, callback) {
   // Gets the access token
   // "contacts?$select=name&$filter=contains(name,'Eljan')"

   const response = await getTokenPopup({ scopes: [baseUrl + "/.default"] });
   const data = await getDataverse(url, response.accessToken, callback);
   return data

}

async function sendAccounts(callback) {
   console.log(baseUrl, 'response for send', msalConfig)
   const response = await getTokenPopup({ scopes: [baseUrl + "/.default"] })

   if (!urlParameters['companyName']) {
      console.log("nani yoxdur")
      getContacts()
      sendDataverse("contacts", response.accessToken, callback);
   } else {
      console.log("nani vardir")
      const companies = await filterBackend(`accounts`, writeTable)
      accounts = companies.value


      if (companies.value.filter((company => company.uds_linkedinprofilecompanyurl === urlParameters.linkedinCompanyUrl)).length !== 0) {
         message.innerHTML = 'Company updating...'
         await createCompany(`accounts(${companies.value.filter((company => company.uds_linkedinprofilecompanyurl === urlParameters.linkedinCompanyUrl))[0].accountid})`, response.accessToken, 'PATCH')
         message.innerHTML = 'Company updated'
      } else {
         console.log(companies.value.filter((company => company.uds_salesnavigatorcompanyurl === urlParameters.salesCompanyUrl)), 'companies.value')
         if (companies.value.filter((company => company.uds_salesnavigatorcompanyurl === urlParameters.salesCompanyUrl)).length !== 0) {
            const accountID = companies.value.filter((company => company.uds_salesnavigatorcompanyurl === urlParameters.salesCompanyUrl))[0].accountid
            message.innerHTML = 'Company updating...'
            await createCompany(`accounts(${accountID})`, response.accessToken, 'PATCH')
            message.innerHTML = 'Company updated'
         } else {
            message.innerHTML = 'Company creating ...'
            await createCompany("accounts", response.accessToken, 'POST')
            message.innerHTML = 'Company created'
         }
      }


   }
}



/** 
 * Helper function to get data from Dataverse
* using the authorization bearer token scheme
* callback is the writeTable function below
*/
async function getDataverse(url, token, callback) {
   const headers = new Headers();
   const bearer = `Bearer ${token}`;
   headers.append("Authorization", bearer);
   // Other Dataverse headers
   headers.append("Accept", "application/json");
   headers.append("OData-MaxVersion", "4.0");
   headers.append("OData-Version", "4.0");

   const options = {
      method: "GET",
      headers: headers,

   }

   console.log('GET Request made to Dataverse at: ' + new Date().toString());

   const response = await fetch(webAPIEndpoint + "/" + url, options);
   const data = response.json()
   return data

}


const createCompanyWithId = async (url, token) => {
   message.innerHTML = 'Loading...'
   const headers = new Headers();
   const bearer = `Bearer ${token}`;
   headers.append("Authorization", bearer);
   // Other Dataverse headers
   headers.append("Accept", "application/json");
   headers.append("OData-MaxVersion", "4.0");
   headers.append("OData-Version", "4.0");
   headers.append("Content-Type", "application/json");

   const entries = Object.entries(urlParameters);
   const dataObjectForRequest = {}

   const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
         uds_linkedincompanyid: urlParameters['customerId']
      })
   }

   console.log('GET Request made to Dataverse at: ' + new Date().toString());


   const response = fetch(webAPIEndpoint + "/" + url, options)
   const data = response
   return data
}


const createCompany = async (url, token, method) => {


   message.innerHTML = 'Creating Company...'
   const headers = new Headers();
   const bearer = `Bearer ${token}`;
   headers.append("Authorization", bearer);
   // Other Dataverse headers
   headers.append("Accept", "application/json");
   headers.append("OData-MaxVersion", "4.0");
   headers.append("OData-Version", "4.0");
   headers.append("Content-Type", "application/json");
   headers.append("Prefer", "return=representation");
   console.log(urlParameters, 'Company urlParameters')
   let requestData = {}
   for (const [key, value] of Object.entries(urlParameters)) {
      requestData[changeRequestedNames(key)] = value
   }


   let countOfEmployees = 0

   if (requestData['numberofemployees'].includes('-')) {
      countOfEmployees = Number(requestData['numberofemployees'].split(' ')[0].split('-')[1])
   } else {
      Number(requestData['numberofemployees'].split(' ')[0].replace(',', ''))
   }
   console.log(countOfEmployees, 'nunberofempl')


   const requestForCreateCompany = {
      uds_linkedincompanyid: requestData['uds_linkedincompanyid'].toString(),
      name: requestData['name'],
      numberofemployees: countOfEmployees,
      uds_new_linkedin: requestData['uds_linkedin'],
      address1_line1: requestData['address1_name'],
      websiteurl: requestData['websiteurl']
   }

   if (urlParameters.linkedinCompanyUrl) {
      Object.assign(requestForCreateCompany, { uds_linkedinprofilecompanyurl: urlParameters.linkedinCompanyUrl })
   }

   if (urlParameters.salesCompanyUrl) {
      Object.assign(requestForCreateCompany, { uds_salesnavigatorcompanyurl: urlParameters.salesCompanyUrl })
   }

   const options = {
      method: method,
      headers: headers,
      body: JSON.stringify(requestForCreateCompany)
   }

   console.log('GET Request made to Dataverse at: ' + new Date().toString());


   const response = fetch(webAPIEndpoint + "/" + url, options)
   const data = response ? response.json() : true
   return data
}








const createAccount = async (url, token, method) => {
   const filtered = await filterBackend(`accounts`, writeTable)
   accounts = filtered.value
   const headers = new Headers();
   const bearer = `Bearer ${token}`;
   headers.append("Authorization", bearer);
   // Other Dataverse headers
   headers.append("Accept", "application/json");
   headers.append("OData-MaxVersion", "4.0");
   headers.append("OData-Version", "4.0");
   headers.append("Content-Type", "application/json");
   headers.append("Prefer", 'odata.include-annotations="*"');
   headers.append("Prefer", "return=representation");
   const entries = Object.entries(urlParameters);
   const dataObjectForRequest = {}
   for (const [key, value] of entries) {
      dataObjectForRequest[changeRequestedNames(key)] = value
   }

   dataObjectForRequest['firstname'] = dataObjectForRequest.fullName.split(" ")[0]
   dataObjectForRequest['lastname'] = dataObjectForRequest.fullName.split(" ")[1]



   const bodyOfReq = {
      firstname: dataObjectForRequest.fullName.split(" ")[0],
      lastname: dataObjectForRequest.fullName.split(" ")[1],
      fullname: dataObjectForRequest.fullName,
      jobtitle: dataObjectForRequest.jobtitle,
      address1_name: dataObjectForRequest.address1_name,
      // _parentcustomerid_value: accounts.filter(account=>account.uds_linkedincompanyid === urlParameters['customerId'])[0].accountid,
      'parentcustomerid_account@odata.bind': `/accounts(${accounts.filter(account => account.uds_linkedincompanyid === urlParameters['customerId'])[0].accountid})`,
      telephone1: dataObjectForRequest.telephone1,
      mobilephone: dataObjectForRequest.mobilephone,
      emailaddress1: dataObjectForRequest.emailaddress1,
      // uds_linkedin:dataObjectForRequest.uds_linkedin,
      // uds_salesnavigatoruserurl:dataObjectForRequest.uds_salesnavigatoruserurl
   }


   if (urlParameters.linkedinUrl) {
      Object.assign(bodyOfReq, { uds_linkedin: dataObjectForRequest.uds_linkedin })
   }

   if (urlParameters.salesUrl) {
      Object.assign(bodyOfReq, { uds_salesnavigatoruserurl: dataObjectForRequest.uds_salesnavigatoruserurl })
   }

   const options = {
      method: method,
      headers: headers,
      body: JSON.stringify(bodyOfReq)
   }

   console.log('GET Request made to Dataverse at: ' + new Date().toString());
   const response = await fetch(webAPIEndpoint + "/" + url, options)
   const data = response.json()
}

async function sendDataverse(url, token, callback) {
   // filterBackend(`accounts?$select=uds_linkedincompanyid&$filter=contains(uds_linkedincompanyid,123123)`, writeTable)
   const filtered = await filterBackend(`accounts`, writeTable)
   accounts = filtered.value
   const filteredcontacts = await filterBackend(`contacts`, writeTable)
   // contacts = filteredcontacts.value
   accounts = filtered.value

   console.log(filteredcontacts.value.filter(contact => contact.uds_linkedin === urlParameters['linkedinUrl']), 'filteredcontacts.value')

   if (filtered.value.some(account => account.uds_linkedincompanyid === urlParameters['customerId'])) {
      if (filteredcontacts.value.filter(contact => contact.uds_linkedin === urlParameters['linkedinUrl']).length !== 0) {
         const existedContact = filteredcontacts.value.filter(contact => contact.uds_linkedin === urlParameters['linkedinUrl'])[0]
         message.innerHTML = 'contact updating... '
         await createAccount(`contacts(${existedContact.contactid})`, token, 'PATCH')
         message.innerHTML = 'Contact Updated'
      } else {
         if (filteredcontacts.value.filter(contact => contact.uds_salesnavigatoruserurl === urlParameters['salesUrl']).length !== 0) {
            const existedContact = filteredcontacts.value.filter(contact => contact.uds_salesnavigatoruserurl === urlParameters['salesUrl'])[0]
            message.innerHTML = 'contact updating... '
            await createAccount(`contacts(${existedContact.contactid})`, token, 'PATCH')
            message.innerHTML = 'Contact Updated'
         } else {
            message.innerHTML = 'there have company with this id: ' + urlParameters['customerId']
            await createAccount('contacts', token, "POST")
            message.innerHTML = 'Contact Created'
         }

      }

   } else {
      message.innerHTML = '0 company find. You need to create company first'
      const createdCompany = await createCompanyWithId('accounts', token)
      console.log(createdCompany, 'createdCompany')
      message.innerHTML = 'Company created'
      await createAccount('contacts', token, "POST")
      message.innerHTML = 'Contact created'
   }
}




// Renders the table with data from GetAccounts
function writeTable(data) {
   console.log(data, 'dataaa i am back')
   // if(data.value.some(account=>account.uds_linkedincompanyid === urlParameters['customerId'])){
   //    console.log('there have company with this id' + urlParameters['customerId'])
   //    message.innerHTML = 'there have company with this id' + urlParameters['customerId']
   // }else{
   //    console.log('0 company find')

   //    message.innerHTML = '0 company find. You need to create company first'
   // }
}

selectAccount();