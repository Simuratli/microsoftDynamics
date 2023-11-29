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
const fieldsForUserForms = document.getElementById('fieldsForUser')
const fieldsForCompanyForms = document.getElementById('fieldsForCompany')
const ifExistUserTable = document.getElementById('ifExistUser')
const goToCRMButton = document.getElementById('goToCRMButton')
const updateDataButton = document.getElementById('updateDataButton')
const successMessageIndividual = document.querySelector('.successMessageIndividual')


// inputFields 
const linkedinCompanyUrlInput = document.querySelector(".linkedinCompanyUrl")

// inputfields end 


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
         return 'fullname';
      case 'jobTitle':
         return 'jobtitle';
      case 'location':
         return 'address1_name';
      case 'customer':
         return 'parentcustomerid_account';
      case 'phone':
         return 'telephone1';
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
      case 'comment':
         return "uds_linkedinusercommentary"
      case 'tel':
         return "mobilephone"
      default:
         return "aaa";
   }
}




const inputElements = document.querySelectorAll('.inputForUser');
inputElements.forEach(input => {
   input.addEventListener('input', handleInputChange);
});


function handleInputChange(event) {
   // Get the ID and value of the changed input
   const inputId = event.target.id;
   const inputValue = event.target.value;

   console.log(inputId, inputValue, 'inputValue')
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
   // message.innerHTML = `Welcome ${username}`;
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
      username = currentAccounts[0].username;
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


   if (currentAccounts.length === 0) {
      setup()
      console.log(currentAccounts, 'allalalala in')
   } else {
      selectAccount()
      console.log(currentAccounts, 'allalalala out')
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
            username = response.account.username;
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
   console.log('request', username)
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


const url = new URL(window.location.href);
const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());
console.log(url, 'params url')
console.log(urlParams, 'params urlParams')
console.log(params, 'params')
let entries = JSON.parse(params.query)
let urlParameters = Object.entries(entries);
console.log(urlParameters,'urlParameters')
// const entries = Object.entries(urlParameters);

// for (const [key, value] of entries) {
//    const inputElement = document.createElement('input')
//    inputElement.value = value
//    inputElement.classList.add('input')
//    inputElement.placeholder = key
//    inputElement.name = key
//    list && list.appendChild(inputElement)
// }



const addValuesToInputFields = () => {
   let inputfields = null

   fieldsForCompanyForms.style.display = 'none'
   fieldsForUserForms.style.display = 'none'

   if ('companyName' in entries) {
      fieldsForCompanyForms.style.display = 'flex'
      fieldsForUserForms.style.display = 'none'
      inputfields = document.querySelector("#fieldsForCompany").querySelectorAll(".inputForUser")
   } else {
      fieldsForCompanyForms.style.display = 'none'
      fieldsForUserForms.style.display = 'flex'
      inputfields = document.querySelector("#fieldsForUser").querySelectorAll(".inputForUser")
   }



   if(inputfields){
      for (const [key, value] of urlParameters) {
         for (i = 0; i < inputfields.length; ++i) {
            console.log(inputfields[i].getAttribute('name'), 'value deneme', key)
            if (inputfields[i].getAttribute('name') === key) {
               inputfields[i].setAttribute("value", value)
            }
            if(inputfields[i].getAttribute('name') === 'linkedinUrl'){
               if(entries['salesUrl']){
                  console.log('iam here')
                  inputfields[i].setAttribute("value", entries['salesUrl'])
               }
            }
            
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
         getDataverse("contacts?$filter=contains(uds_linkedin,'https://www.linkedin.com/in/simuratli/')", response.accessToken, callback);
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


const getUserUpdatedRequestObject = async () => {
   const parameters = JSON.parse(params.query);
   const accounts = await filterBackend(`accounts?$filter=contains(uds_linkedincompanyid, '${parameters.customerId}')`)
   const bodyOfReq = {
      firstname: document.querySelector('.userNameUpdated').value.split(" ")[0],
      lastname: document.querySelector('.userNameUpdated').value.split(" ")[1] ? document.querySelector('.userNameUpdated').value.split(" ")[1] : " ",
      fullname: document.querySelector('.userNameUpdated').value,
      jobtitle: document.querySelector('.jobTitleUpdated').value,
      address1_name: document.querySelector('.locationUpdated').value,
      // _parentcustomerid_value: accounts.filter(account=>account.uds_linkedincompanyid === urlParameters['customerId'])[0].accountid,
      'parentcustomerid_account@odata.bind': `/accounts(${accounts.value[0].accountid})`,
      telephone1: document.querySelector('.phoneUpdated').value,
      mobilephone: document.querySelector('.telUpdated').value,
      emailaddress1: document.querySelector('.emailUpdated').value,
      uds_linkedinusercommentary: document.querySelector('.commentUpdated').value
      // uds_linkedin:dataObjectForRequest.uds_linkedin,
      // uds_salesnavigatoruserurl:dataObjectForRequest.uds_salesnavigatoruserurl
   }


   if (parameters.linkedinUrl) {
      Object.assign(bodyOfReq, { uds_linkedin: parameters.linkedinUrl })
   }

   if (parameters.salesUrl) {
      Object.assign(bodyOfReq, { uds_salesnavigatoruserurl: parameters.salesUrl })
   }


   return bodyOfReq
}


const updateData = async () => {
   const response = await getTokenPopup({ scopes: [baseUrl + "/.default"] });
   const parameters = JSON.parse(params.query);
   const bodyOfReq = await getUserUpdatedRequestObject()
   const elements = document.querySelector('#ifExistUser').querySelectorAll(".inputForUser")
   const existedInputs = document.querySelector('#ifExistUser').querySelectorAll(".existed");


   if (!parameters['companyName']) {
      getContacts()
      const filteredcontacts = parameters.linkedinUrl ? await filterBackend(`contacts?$filter=contains(uds_linkedin, '${parameters.linkedinUrl}')`) : await filterBackend(`contacts?$filter=contains(uds_salesnavigatoruserurl, '${parameters.salesUrl}')`)
      await createAccount(`contacts(${filteredcontacts.value[0].contactid})`, response.accessToken, 'PATCH', bodyOfReq)
      updateExistedTableForEditableFields(elements,elements,existedInputs,filteredcontacts.value[0])

   } else {
      console.log("company logic not maked")
   }

}



async function sendAccounts(callback) {
   const response = await getTokenPopup({ scopes: [baseUrl + "/.default"] })
   const parameters = JSON.parse(params.query)

   if (!parameters['companyName']) {
      getContacts()
      await sendDataverse("contacts", response.accessToken, callback);

   } else {
      const companies = parameters.linkedinCompanyUrl ? await filterBackend(`accounts?$filter=contains(uds_linkedinprofilecompanyurl, '${parameters.linkedinCompanyUrl}')`) : await filterBackend(`accounts?$filter=contains(uds_salesnavigatorcompanyurl, '${parameters.salesCompanyUrl}')`)
      console.log(companies.value,'companies')
      
      if (companies.value.length !== 0) {
         message.innerHTML = 'Company updating...'
         const createdCompanyResponse = await createCompany(`accounts(${companies.value[0].accountid})`, response.accessToken, 'PATCH')
         console.log(createdCompanyResponse,'i am waiting')
         message.innerHTML = 'Company updated'
      } else {
         message.innerHTML = 'Company creating ...'
         await createCompany("accounts", response.accessToken, 'POST')
         message.innerHTML = 'Company created'
      }
   }

   sendAccountsButton.style.display = 'none'
   
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

   const parameters = JSON.parse(params.query)
   message.innerHTML = 'Loading...'
   const headers = new Headers();
   const bearer = `Bearer ${token}`;
   headers.append("Authorization", bearer);
   // Other Dataverse headers
   headers.append("Accept", "application/json");
   headers.append("OData-MaxVersion", "4.0");
   headers.append("OData-Version", "4.0");
   headers.append("Content-Type", "application/json");

   const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
         uds_linkedincompanyid: parameters.customerId
      })
   }

   console.log('GET Request made to Dataverse at: ' + new Date().toString());


   const response = fetch(webAPIEndpoint + "/" + url, options)
   const data = response
   return data
}


const createCompany = async (url, token, method) => {
   console.log(url,'test heredd')
   const parameteres = JSON.parse(params.query)
   console.log(parameteres, 'parameteres')
   const headers = new Headers();
   const bearer = `Bearer ${token}`;
   headers.append("Authorization", bearer);
   // Other Dataverse headers
   headers.append("Accept", "application/json");
   headers.append("OData-MaxVersion", "4.0");
   headers.append("OData-Version", "4.0");
   headers.append("Content-Type", "application/json");
   headers.append("Prefer", "return=representation");

   const requestForCreateCompany = {
      uds_linkedincompanyid: parameteres.idOfCompany,
      name: document.querySelector(".companyName").value,
      numberofemployees: 0,
      uds_geocodes: document.querySelector(".location").value,
      websiteurl: document.querySelector(".companyUrl").value,
      uds_linkedinsize: 0,
      uds_linkedincompanycommentary: document.querySelector(".comment").value,

   }

   if (parameteres.linkedinCompanyUrl) {
      Object.assign(requestForCreateCompany, { uds_linkedinprofilecompanyurl: parameteres.linkedinCompanyUrl })
   }

   if (parameteres.salesCompanyUrl) {
      Object.assign(requestForCreateCompany, { uds_salesnavigatorcompanyurl: parameteres.salesCompanyUrl })
   }

   const options = {
      method: method,
      headers: headers,
      body: JSON.stringify(requestForCreateCompany)
   }

   console.log('GET Request made to Dataverse at: ' + new Date().toString());


   const response = fetch(webAPIEndpoint + "/" + url, options)
   return response
}








const createAccount = async (url, token, method, bodyOfReq) => {
   const filtered = await filterBackend(`accounts`, writeTable)
   const parameters = JSON.parse(params.query)
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

   const options = {
      method: method,
      headers: headers,
      body: JSON.stringify(bodyOfReq)
   }

   console.log('GET Request made to Dataverse at: ' + new Date().toString());
   const response = await fetch(webAPIEndpoint + "/" + url, options)
   return response
}



const getUserMainRequestObject = async () => {
   console.log('i am making error?')
   const parameters = JSON.parse(params.query);
   const accounts = await filterBackend(`accounts?$filter=contains(uds_linkedincompanyid, '${parameters.customerId}')`)
   const bodyOfReq = {
      firstname: document.querySelector('.userName').value.split(" ")[0],
      lastname: document.querySelector('.userName').value.split(" ")[1],
      fullname: document.querySelector('.userName').value,
      jobtitle: document.querySelector('.jobTitle').value,
      address1_name: document.querySelector('.location').value,
      // _parentcustomerid_value: accounts.filter(account=>account.uds_linkedincompanyid === urlParameters['customerId'])[0].accountid,
      'parentcustomerid_account@odata.bind': `/accounts(${accounts.value[0].accountid})`,
      telephone1: document.querySelector('.phone').value,
      mobilephone: document.querySelector('.tel').value,
      emailaddress1: document.querySelector('.email').value,
      uds_linkedinusercommentary: document.querySelector('.comment').value
      // uds_linkedin:dataObjectForRequest.uds_linkedin,
      // uds_salesnavigatoruserurl:dataObjectForRequest.uds_salesnavigatoruserurl
   }


   if (parameters.linkedinUrl) {
      Object.assign(bodyOfReq, { uds_linkedin: parameters.linkedinUrl })
   }

   if (parameters.salesUrl) {
      Object.assign(bodyOfReq, { uds_salesnavigatoruserurl: parameters.salesUrl })
   }


   return bodyOfReq
}



const updateExistedTableForEditableFields = async (elements, elementsMain, existedInputs, existedData) => {
   const keys = Object.keys(existedData);

   elements.forEach(element => {
      elementsMain.forEach(elementMain => {
         if (elementMain.name === element.name) {
            element.value = elementMain.value
         }
      });
   });


   existedInputs.forEach(element => {
      for (const key of keys) {
         const value = existedData[key];

         if (element.name === key) {
            element.value = value

         }
         if (element.name === "linkedinUrl") {
            if (key === 'uds_linkedin' && value) {
               element.value = value
            } else if (key === 'uds_salesnavigatoruserurl' && value) {
               element.value = value
            }
         }

      }
   });

   elements.forEach(element => {
      existedInputs.forEach(existedTableElement => {
         if(changeRequestedNames(element.name) === existedTableElement.name){
            if(element.value !== existedTableElement.value){
               element.classList.add('differentInputMain')
               existedTableElement.classList.add('differentInputSide')
               console.log(element.name,":",element.value,"------",existedTableElement.name,":", existedTableElement.value)
            }else{
               element.classList.remove('differentInputMain')
               existedTableElement.classList.remove('differentInputSide')
            }
         }
      });
   });

}

async function sendDataverse(url, token) {
   
   const parameters = JSON.parse(params.query)
   const filtered = await filterBackend(`accounts?$filter=contains(uds_linkedincompanyid, '${parameters.customerId}')`)
   const filteredcontacts = parameters.linkedinUrl ? await filterBackend(`contacts?$filter=contains(uds_linkedin, '${parameters.linkedinUrl}')`) : await filterBackend(`contacts?$filter=contains(uds_salesnavigatoruserurl, '${parameters.salesUrl}')`)

   if (filtered.value.length !== 0) {
      console.log("test company had")
      if (filteredcontacts.value.length !== 0) {
         message.innerHTML = 'contact updating... '
         const bodyOfReq = await getUserMainRequestObject()
         await createAccount(`contacts(${filteredcontacts.value[0].contactid})`, token, 'PATCH', bodyOfReq)

         message.innerHTML = 'Contact Updated'
         mainCapture.style.display = 'none'
         ifExistUserTable.style.display = 'block'

         console.log(filtered,'filtered loook here')
         //update exist table after capturing
         const elements = document.querySelector('#ifExistUser').querySelectorAll(".inputForUser")
         const elementsMain = document.querySelector('#mainCapture').querySelector("#fieldsForUser").querySelectorAll(".inputForUser")
         const existedInputs = document.querySelector('#ifExistUser').querySelectorAll(".existed");
         await updateExistedTableForEditableFields(elements, elementsMain, existedInputs, filteredcontacts.value[0])
         //update exist table after capturing end



         // 
         // const parameterKeys = Object.keys(parameters);

         // console.log(parameters,'noluyo qo', filteredcontacts.value[0])

         // for (let key of parameterKeys) {
         //    if(parameters[key]){
         //       if (parameters[key] !== filteredcontacts.value[0][changeRequestedNames(key)]) {
         //          console.log(`Values for key '${key}' are different:`, changeRequestedNames(key));
         //          console.log(`   Object 1: ${parameters[key]}`);
         //          console.log(`   Object 2: ${filteredcontacts.value[0][changeRequestedNames(key)]}`);
         //        }else{
         //          console.log('second part error')
         //        }
         //    }else{
         //       console.log('forst part error')
         //    }
         //  }


         goToCRMButton.style.display = 'block'
         updateDataButton.style.display = 'block'


      } else {
         console.log("test company had 2")
         message.innerHTML = 'there have company with this id: ' + parameters.customerId
         const bodyOfReq = await getUserMainRequestObject()
         await createAccount('contacts', token, "POST", bodyOfReq)
         message.innerHTML = 'Contact Created'
         mainCapture.querySelector(".informationBlock").style.display = "none"
         successMessageIndividual.style.display = 'flex'
         goToCRMButton.style.display = 'block'
      }
   } else {
      console.log("test company had not")
      message.innerHTML = '0 company find. You need to create company first'
      const createdCompany = await createCompanyWithId('accounts', token)
      console.log(createdCompany, 'createdCompany')
      message.innerHTML = 'Company created'
      const bodyOfReq = await getUserMainRequestObject()
      await createAccount('contacts', token, "POST", bodyOfReq)
      message.innerHTML = 'Contact created'
      mainCapture.querySelector(".informationBlock").style.display = "none"
      successMessageIndividual.style.display = 'flex'
      goToCRMButton.style.display = 'block'
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