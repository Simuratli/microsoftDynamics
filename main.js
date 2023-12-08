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
const ifExistCompany = document.querySelector("#ifExistCompany")
const mainImage = document.querySelector('#mainImage')
// inputFields 
const linkedinCompanyUrlInput = document.querySelector(".linkedinCompanyUrl")
const wentWrongForm = document.querySelector("#wentWrongForm")
const errorMessageIndividual = document.querySelector(".errorMessageIndividual")
// inputfields end 
// const originalString = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum";
// // Encryption (AES)
// const secretKey = "yourSecretKey";
// const encryptedString = CryptoJS.AES.encrypt(originalString, "nazrin").toString();
const loader = document.querySelector('#loader')





let username = "";
let contacts = null;
let accounts = null;
// Create the main myMSALObj instance


let baseUrl = localStorage.getItem("crmUrlInput");      //<= Change this
let clientId = localStorage.getItem("clientIdInput");; //<= Change this
let tenantId = localStorage.getItem("tenantIdInput");; //<= Change this
const redirectUrl = "/";
let webAPIEndpoint = baseUrl + "/api/data/v9.2";



const url = new URL(window.location.href);
const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());

let entries = JSON.parse(params.query)
let urlParameters = Object.entries(entries);
const parameters = JSON.parse(params.query)

if (parameters['companyName']) {
   document.querySelector('#mainImage').querySelector('.personImage').style.display = 'none'
   document.querySelector('#mainImage').querySelector('.companyImage').style.display = 'block'
   message.innerHTML = parameters['companyName']
   const messages = document.querySelectorAll("#message")
   messages.forEach(mes => {
      mes.innerHTML = parameters['companyName'] ? parameters['companyName'] : ""
   });

} else {
   document.querySelector('#mainImage').querySelector('.companyImage').style.display = 'none'
   document.querySelector('#mainImage').querySelector('.personImage').style.display = 'block'
   message.innerHTML = parameters['userName']
   const messages = document.querySelectorAll("#message")
   messages.forEach(mes => {
      mes.innerHTML = parameters['userName'] ? parameters['userName'] : ""
   });
}








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
         return parameters.companyName ? "uds_geocodes" : 'address1_name';
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
      case 'lnSize':
         return "uds_linkedinsize"
      case 'comment':
         return parameters.companyName ? "uds_linkedincompanycommentary" : "uds_linkedinusercommentary"
      case 'tel':
         return "mobilephone"
      default:
         return "aaa";
   }
}


const showLoader = async () => {
   loader.style.display = 'grid'
   setTimeout(() => {
      loader.style.display = 'none'
   }, 1000);
}




const inputElements = document.querySelectorAll('.inputForUser');
inputElements.forEach(input => {
   input.addEventListener('input', handleInputChange);
});


function handleInputChange(event) {
   // Get the ID and value of the changed input
   const inputId = event.target.id;
   const inputValue = event.target.value;

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



const addValuesToInputFields = (inputfields) => {
 

   // fieldsForCompanyForms.style.display = 'none'
   // fieldsForUserForms.style.display = 'none'

  


   if (inputfields && urlParameters) {
      for (const [key, value] of urlParameters) {
         for (i = 0; i < inputfields.length; ++i) {
            if (inputfields[i].getAttribute('name') === key) {
               inputfields[i].setAttribute("value", value)
            }
            if (inputfields[i].getAttribute('name') === 'linkedinUrl') {
               if (entries['salesUrl']) {
                  inputfields[i].setAttribute("value", entries['salesUrl'])
               }
            }



            if (inputfields[i].getAttribute('name') === 'linkedinCompanyUrl') {
               if (entries['salesCompanyUrl']) {
                  inputfields[i].setAttribute("value", entries['salesCompanyUrl'])
               }
            }

            if (inputfields[i].getAttribute('name') === 'lnSize') {
               inputfields[i].setAttribute("value", Number(value))
               if (isNaN(value)) {
                  inputfields[i].setAttribute("value", 0)
               } else {
                  inputfields[i].setAttribute("value", Number(value))
               }
            }


         }
      }
   }
}



const addDatasToExistedFieldsInTable = async (existedData, existedFields) => {
   const keys = Object.keys(existedData)
   const companies =  await filterBackend(`accounts?$select=name&$filter=contains(uds_linkedincompanyid, '${parameters.customerId}')`)
   existedFields.forEach(element => {
      for (const key of keys) {
         if (key === element.name) {
            element.value = existedData[key]
         }


         if (element.name === 'linkedinUrl' || element.name === "linkedinCompanyUrl") {
            console.log('test me here is new')
            if (key === 'uds_linkedin' && existedData[key]) {
               element.value = existedData[key]

            } else if (key === 'uds_salesnavigatoruserurl' && existedData[key]) {
               element.value = existedData[key]
            }else if(key === 'uds_linkedinprofilecompanyurl' && existedData[key]){
               element.value = existedData[key]
            }else if(key === 'uds_salesnavigatorcompanyurl' && existedData[key]){
               element.value = existedData[key]
            }

            
         }
         if(element.name === 'customer'){
            if(companies.value[0]){
               console.log(companies,'testm 21312e')
               element.value = companies.value[0].name ?  companies.value[0].name : ""
            }
         }
      }
   });
}







const fillFormElements = async (exist,existedInputs) => {
   if (exist) {
      addDatasToExistedFieldsInTable(exist, existedInputs)
      addValuesToInputFields(parameters['companyName'] ? addValuesToInputFields(document.querySelector("#ifExistCompany").querySelectorAll(".inputForUser")) : addValuesToInputFields(document.querySelector("#ifExistUser").querySelectorAll(".inputForUser")))
   } else {
      addValuesToInputFields(parameters['companyName'] ? addValuesToInputFields(document.querySelector("#fieldsForCompany").querySelectorAll(".inputForUser")) : addValuesToInputFields(document.querySelector("#fieldsForUser").querySelectorAll(".inputForUser")))
   }
      
}



const existOrNotFunction = async () => {
   
   loader.style.display = 'grid'
   if (parameters['companyName']) {
      const companies = parameters.linkedinCompanyUrl ? await filterBackend(`accounts?$filter=contains(uds_linkedinprofilecompanyurl, '${parameters.linkedinCompanyUrl}')`) : await filterBackend(`accounts?$filter=contains(uds_salesnavigatorcompanyurl, '${parameters.salesCompanyUrl}')`)
      if (companies.value.length !== 0) {
         mainCredentialsForm.style.display = 'none'
         ifExistUserTable.style.display = 'none'
         ifExistCompany.style.display = 'block'
         mainCapture.style.display = 'none'
         sendAccountsButton.style.display = 'none'
         updateDataButton.style.display = 'block'
         goToCRMButton.style.display = 'block'

      } else {
         mainCredentialsForm.style.display = 'none'
         ifExistUserTable.style.display = 'none'
         ifExistCompany.style.display = 'none'
         mainCapture.style.display = 'block'
         fieldsForCompanyForms.style.display = 'block'
         fieldsForUserForms.style.display = 'none'
         sendAccountsButton.style.display = 'block'
         updateDataButton.style.display = 'none'
         goToCRMButton.style.display = 'none'
      }

      const existedInputs = document.querySelector('#ifExistCompany').querySelectorAll(".existed");
      await fillFormElements(companies.value[0], existedInputs);

   } else {
      const contacts = parameters.linkedinUrl ? await filterBackend(`contacts?$filter=contains(uds_linkedin, '${parameters.linkedinUrl}')`) : await filterBackend(`contacts?$filter=contains(uds_salesnavigatoruserurl, '${parameters.salesUrl}')`)
      if (contacts.value.length !== 0) {
         mainCredentialsForm.style.display = 'none'
         ifExistUserTable.style.display = 'block'
         ifExistCompany.style.display = 'none'
         mainCapture.style.display = 'none'
         sendAccountsButton.style.display = 'none'
         updateDataButton.style.display = 'block'
         goToCRMButton.style.display = 'block'

      } else {
         mainCredentialsForm.style.display = 'none'
         ifExistUserTable.style.display = 'none'
         ifExistCompany.style.display = 'none'
         mainCapture.style.display = 'block'
         fieldsForCompanyForms.style.display = 'none'
         fieldsForUserForms.style.display = 'block'
         sendAccountsButton.style.display = 'block'
         updateDataButton.style.display = 'none'
         goToCRMButton.style.display = 'none'
      }

      const existedInputs = document.querySelector('#ifExistUser').querySelectorAll(".existed");
      await fillFormElements(contacts.value[0], existedInputs);

   }

   loader.style.display = 'none'
}


const loadingEventFunction = async () => {
   const currentAccounts = myMSALObj.getAllAccounts();
   if (currentAccounts.length === 1) {
      existOrNotFunction()
   }
}

addEventListener("load", loadingEventFunction);






// Called from signIn or selectAccount functions
function showWelcomeMessage(username) {
   console.log('are you working? showWelcomeMessage')
   showLoader()
   // message.innerHTML = `Welcome ${username}`;
   loginWithButtonForm.style.display = "none";
   logoutButton.style.display = "block";
   // getAccountsButton.style.display = "block";
   // sendAccountsButton.style.display = "block";
   // mainCredentialsForm.style.display = 'none'
   // mainCapture.style.display = 'block'
   // list.style.visibility = 'visible'
   // list.style.position = 'relative'
   // list.style.display = 'flex'
   existOrNotFunction()
}




// new part here 


const updateMsalFunction = () => {
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
var clientIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
var expression = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/i;
var regex = new RegExp(expression);

function checkCredentialURLs(e) {

   switch (e.target.name) {
      case 'clientIdInput':
         if (clientIdPattern.test(e.target.value)) {
            console.log("valued")
            clientIdInput.classList.remove("errorInput")
         } else {
            console.log("not valued")
            if (e.target.value) {
               clientIdInput.classList.add("errorInput")
            } else {
               clientIdInput.classList.remove("errorInput")
            }
         }
         localStorage.setItem("clientIdInput", e.target.value);
         break;
      case 'tenantIdInput':
         if (clientIdPattern.test(e.target.value)) {
            console.log("valued")
            tenantIdInput.classList.remove("errorInput")
         } else {
            console.log("not valued")
            if (e.target.value) {
               tenantIdInput.classList.add("errorInput")
            } else {
               tenantIdInput.classList.remove("errorInput")
            }
         }
         localStorage.setItem("tenantIdInput", e.target.value);
         break;
      case 'crmUrlInput':
         if (e.target.value.match(regex)) {
            console.log("valued")
            crmUrlInput.classList.remove("errorInput")
         } else {
            console.log("not valued")
            if (e.target.value) {
               crmUrlInput.classList.add("errorInput")
            } else {
               crmUrlInput.classList.remove("errorInput")
            }
         }
         localStorage.setItem("crmUrlInput", e.target.value);
         break;
   }


   if (clientIdInput.value !== '' && clientIdPattern.test(clientIdInput.value) && clientIdPattern.test(tenantIdInput.value) && crmUrlInput.value.match(regex) && tenantIdInput.value !== '' && crmUrlInput.value !== '') {
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
      logoutButton.style.display = 'none'
      return;
   } else if (currentAccounts.length > 1) {
      // Add choose account code here
      console.warn("Multiple accounts detected.");
   } else if (currentAccounts.length === 1) {
      username = currentAccounts[0].username;
      showWelcomeMessage(username);
      logoutButton.style.display = "block";
   }
}





const setup = () => {
   console.log('are you working? setup')
   updateMsalFunction()
   mainCredentialsForm.style.display = 'none'
   setupButton.style.display = 'none'
   loginButton.style.display = 'block'
   loginWithButtonForm.style.display = 'flex'
}





if (localStorage.getItem('tenantIdInput') && localStorage.getItem('crmUrlInput') && localStorage.getItem('clientIdInput')) {
   const currentAccounts = myMSALObj.getAllAccounts();


   if (currentAccounts.length === 0) {
      // setup()
   } else {
      selectAccount()
   }
}



const tryAgain = () => {
   mainCredentialsForm.style.display = 'block'
   wentWrongForm.style.display = 'none'
   setupButton.style.display = 'block'
}

// Called by the loginButton
function signIn() {
   showLoader()
   console.log('sign in works')
   myMSALObj.loginPopup({
      scopes: ["User.Read", baseUrl + "/user_impersonation"] //<= Includes Dataverse scope
   })
      .then(response => {

         loginWithButtonForm.style.display = 'none'
         wentWrongForm.style.display = 'none'
         mainCredentialsForm.style.display = 'none'
         

         if (response !== null) {
            username = response.account.username;
            showWelcomeMessage(username);
         } else {
            selectAccount();
         }
      })
      .catch(error => {
         console.log(error.message);
         if (!error.message.includes('user_cancelled')) {
            loginWithButtonForm.style.display = 'none'
            wentWrongForm.style.display = 'flex'
            mainCredentialsForm.style.display = 'none'
         }
      });
}

// Shows greeting and enables logoutButton and getAccountsButton


const getRequestBodyOfCompany = async (type) => {
   const parameters = JSON.parse(params.query);
   let bodyRequest = {}

   if (type === 'main') {
      bodyRequest = {
         uds_linkedincompanyid: parameters.idOfCompany,
         name: document.querySelector('#fieldsForCompany').querySelector(".companyName").value,
         numberofemployees: document.querySelector('#fieldsForCompany').querySelector(".numberOfWorkers").value,
         uds_geocodes: document.querySelector('#fieldsForCompany').querySelector(".location").value,
         websiteurl: document.querySelector('#fieldsForCompany').querySelector(".companyUrl").value,
         uds_linkedinsize: Number(document.querySelector('#fieldsForCompany').querySelector(".lnSize").value),
         uds_linkedincompanycommentary: document.querySelector('#fieldsForCompany').querySelector(".comment").value,

      }

      if (parameters.linkedinCompanyUrl) {
         Object.assign(bodyRequest, { uds_linkedinprofilecompanyurl: parameters.linkedinCompanyUrl })
      }

      if (parameters.salesCompanyUrl) {
         Object.assign(bodyRequest, { uds_salesnavigatorcompanyurl: parameters.salesCompanyUrl })
      }

   } else if (type === "updated") {
      bodyRequest = {
         uds_linkedincompanyid: parameters.idOfCompany,
         name: document.querySelector('#ifExistCompany').querySelector(".companyNameUpdated").value,
         numberofemployees: document.querySelector('#ifExistCompany').querySelector(".numberofemployeesUpdated").value,
         uds_geocodes: document.querySelector('#ifExistCompany').querySelector(".locationUpdated").value,
         websiteurl: document.querySelector('#ifExistCompany').querySelector(".websiteurlUpdated").value,
         uds_linkedinsize: Number(document.querySelector('#ifExistCompany').querySelector(".lnSize").value),
         uds_linkedincompanycommentary: document.querySelector('#ifExistCompany').querySelector(".commentUpdated").value,

      }

      if (parameters.linkedinCompanyUrl) {
         Object.assign(bodyRequest, { uds_linkedinprofilecompanyurl: parameters.linkedinCompanyUrl })
      }

      if (parameters.salesCompanyUrl) {
         Object.assign(bodyRequest, { uds_salesnavigatorcompanyurl: parameters.salesCompanyUrl })
      }
   }

   return bodyRequest
}


// Called by the logoutButton
function signOut() {
   const logoutRequest = {
      account: myMSALObj.getAccountByUsername(username),
      postLogoutRedirectUri: msalConfig.auth.redirectUri,
      mainWindowRedirectUri: msalConfig.auth.redirectUri
   };

   myMSALObj.logoutPopup(logoutRequest);

   mainCredentialsForm.style.display = 'flex'
   loginWithButtonForm.style.display = 'none'

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



// const entries = Object.entries(urlParameters);

// for (const [key, value] of entries) {
//    const inputElement = document.createElement('input')
//    inputElement.value = value
//    inputElement.classList.add('input')
//    inputElement.placeholder = key
//    inputElement.name = key
//    list && list.appendChild(inputElement)
// }






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
   const lastname = document.querySelector('.userNameUpdated').value.split(" ")
   const bodyOfReq = {
      firstname: document.querySelector('.userNameUpdated').value.split(" ")[0],
      lastname: lastname[1] ? lastname.filter((_, i) => i > 0).join(" ") : " ",
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

   loader.style.display = 'grid'
   const parameters = JSON.parse(params.query);


   if (!parameters['companyName']) {
      const response = await getTokenPopup({ scopes: [baseUrl + "/.default"] });
      const bodyOfReq = await getUserUpdatedRequestObject()
      const elements = document.querySelector('#ifExistUser').querySelectorAll(".inputForUser")
      const existedInputs = document.querySelector('#ifExistUser').querySelectorAll(".existed");
      getContacts()
      const filteredcontacts = parameters.linkedinUrl ? await filterBackend(`contacts?$filter=contains(uds_linkedin, '${parameters.linkedinUrl}')`) : await filterBackend(`contacts?$filter=contains(uds_salesnavigatoruserurl, '${parameters.salesUrl}')`)
      await createAccount(`contacts(${filteredcontacts.value[0].contactid})`, response.accessToken, 'PATCH', bodyOfReq)

      const filteredcontacts2 = parameters.linkedinUrl ? await filterBackend(`contacts?$filter=contains(uds_linkedin, '${parameters.linkedinUrl}')`) : await filterBackend(`contacts?$filter=contains(uds_salesnavigatoruserurl, '${parameters.salesUrl}')`)

      updateExistedTableForEditableFields(elements, elements, existedInputs, filteredcontacts2.value[0], 'noColor')

   } else {
      const response = await getTokenPopup({ scopes: [baseUrl + "/.default"] });
      const companies = parameters.linkedinCompanyUrl ? await filterBackend(`accounts?$filter=contains(uds_linkedinprofilecompanyurl, '${parameters.linkedinCompanyUrl}')`) : await filterBackend(`accounts?$filter=contains(uds_salesnavigatorcompanyurl, '${parameters.salesCompanyUrl}')`)
      const existedInputs = document.querySelector('#ifExistCompany').querySelectorAll(".existed");
      const elements = document.querySelector('#ifExistCompany').querySelectorAll(".inputForUser")
      const requestBodyOfCompany = await getRequestBodyOfCompany('updated')
      const createdCompanyResponse = await createCompany(`accounts(${companies.value[0].accountid})`, response.accessToken, 'PATCH', requestBodyOfCompany)
      const companies2 = parameters.linkedinCompanyUrl ? await filterBackend(`accounts?$filter=contains(uds_linkedinprofilecompanyurl, '${parameters.linkedinCompanyUrl}')`) : await filterBackend(`accounts?$filter=contains(uds_salesnavigatorcompanyurl, '${parameters.salesCompanyUrl}')`)
      updateExistedTableForEditableFields(elements, elements, existedInputs, companies2.value[0], 'noColor')
   }
   loader.style.display = 'none'
}



async function sendAccounts(callback) {
   loader.style.display = 'grid'
   const response = await getTokenPopup({ scopes: [baseUrl + "/.default"] })
   const parameters = JSON.parse(params.query)

   if (!parameters['companyName']) {
      getContacts()
      await sendDataverse("contacts", response.accessToken, callback);

   } else {
      const companies = parameters.linkedinCompanyUrl ? await filterBackend(`accounts?$filter=contains(uds_linkedinprofilecompanyurl, '${parameters.linkedinCompanyUrl}')`) : await filterBackend(`accounts?$filter=contains(uds_salesnavigatorcompanyurl, '${parameters.salesCompanyUrl}')`)

      if (companies.value.length !== 0) {
         // message.innerHTML = 'Company updating...'
         const bodyOfCompany = await getRequestBodyOfCompany('main');
         const createdCompanyResponse = await createCompany(`accounts(${companies.value[0].accountid})`, response.accessToken, 'PATCH', bodyOfCompany)
         if (createdCompanyResponse.status === 200) {
            ifExistCompany.style.display = 'block';
            mainCapture.style.display = 'none'

            const elements = document.querySelector('#ifExistCompany').querySelectorAll(".inputForUser")
            const elementsMain = document.querySelector('#mainCapture').querySelector("#fieldsForCompany").querySelectorAll(".inputForUser")
            const existedInputs = document.querySelector('#ifExistCompany').querySelectorAll(".existed");
            await updateExistedTableForEditableFields(elements, elementsMain, existedInputs, companies.value[0])


            goToCRMButton.style.display = 'block'
            updateDataButton.style.display = 'block'
            sendAccountsButton.style.display = 'none'
         }
         // message.innerHTML = 'Company updated'
      } else {
         // message.innerHTML = 'Company creating ...'
         const bodyOfCompany = await getRequestBodyOfCompany('main');
         const createdCompanyResponse = await createCompany("accounts", response.accessToken, 'POST', bodyOfCompany)
         if (createdCompanyResponse.ok) {
            mainCapture.querySelector(".informationBlock").style.display = "none"
            successMessageIndividual.style.display = 'flex'
            goToCRMButton.style.display = 'block'
            goToCRMButton.classList.add('goldGoToCrmButton')
            sendAccountsButton.style.display = 'none'
         }
         // message.innerHTML = 'Company created'
      }
   }


   loader.style.display = 'none'
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


   const response = await fetch(webAPIEndpoint + "/" + url, options);
   const data = response.json()
   return data

}


const createCompanyWithId = async (url, token) => {

   const parameters = JSON.parse(params.query)
   // message.innerHTML = 'Loading...'
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



   const response = fetch(webAPIEndpoint + "/" + url, options)
   const data = response
   return data
}


const createCompany = async (url, token, method, requestBodyOfCompany) => {
   const parameteres = JSON.parse(params.query)
   const headers = new Headers();
   const bearer = `Bearer ${token}`;
   headers.append("Authorization", bearer);
   // Other Dataverse headers
   headers.append("Accept", "application/json");
   headers.append("OData-MaxVersion", "4.0");
   headers.append("OData-Version", "4.0");
   headers.append("Content-Type", "application/json");
   headers.append("Prefer", "return=representation");



   const options = {
      method: method,
      headers: headers,
      body: JSON.stringify(requestBodyOfCompany)
   }



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

   const response = await fetch(webAPIEndpoint + "/" + url, options)
   const data = await response.json()
   return data
}



const getUserMainRequestObject = async () => {
   const parameters = JSON.parse(params.query);
   const accounts = await filterBackend(`accounts?$filter=contains(uds_linkedincompanyid, '${parameters.customerId}')`)
   const lastName = document.querySelector('.userName').value.split(" ")
   const bodyOfReq = {
      firstname: document.querySelector('.userName').value.split(" ")[0],
      lastname: lastName.filter((_, i) => i > 0).join(" "),
      fullname: document.querySelector('.userName').value,
      jobtitle: document.querySelector('.jobTitle').value,
      address1_name: document.querySelector('.location').value,
      // _parentcustomerid_value: accounts.filter(account=>account.uds_linkedincompanyid === urlParameters['customerId'])[0].accountid,
      'parentcustomerid_account@odata.bind': `/accounts(${accounts.value[0].accountid})`,
      // telephone1: document.querySelector('.phone').value,
      // mobilephone: document.querySelector('.tel').value,
      // emailaddress1: document.querySelector('.email').value,
      // uds_linkedinusercommentary: document.querySelector('.comment').value
      // uds_linkedin:dataObjectForRequest.uds_linkedin,
      // uds_salesnavigatoruserurl:dataObjectForRequest.uds_salesnavigatoruserurl
   }


   if (document.querySelector('.tel').value) {
      Object.assign(bodyOfReq, { mobilephone: document.querySelector('.tel').value })
   }



   if (document.querySelector('.email').value) {
      Object.assign(bodyOfReq, { emailaddress1: document.querySelector('.email').value })
   }

   if (document.querySelector('.comment').value) {
      Object.assign(bodyOfReq, { uds_linkedinusercommentary: document.querySelector('.comment').value })
   }

   if (document.querySelector('.phone').value) {
      Object.assign(bodyOfReq, { telephone1: document.querySelector('.phone').value })
   }

   if (parameters.linkedinUrl) {
      Object.assign(bodyOfReq, { uds_linkedin: parameters.linkedinUrl })
   }

   if (parameters.salesUrl) {
      Object.assign(bodyOfReq, { uds_salesnavigatoruserurl: parameters.salesUrl })
   }


   return bodyOfReq
}


const inputsForUserDublicateTable = document.querySelectorAll(".inputForUser");


inputsForUserDublicateTable.forEach(element => {

   element.addEventListener("input", () => {
      const existedValue = document.querySelector(`[name='${changeRequestedNames(element.name)}']`)?.value
      console.log(element.name, element.value, 'test me', existedValue)
      if (element.value === existedValue) {
         updateDataButton.setAttribute("disabled")
      } else {
         updateDataButton.removeAttribute("disabled")
      }
   })


});





const updateExistedTableForEditableFields = async (elements, elementsMain, existedInputs, existedData, addColor) => {
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

         if (element.name === "linkedinCompanyUrl") {
            if (key === 'uds_linkedinprofilecompanyurl' && value) {
               element.value = value
            } else if (key === 'uds_salesnavigatorcompanyurl' && value) {
               element.value = value
            }
         }


      }
   });


   elements.forEach(element => {
      existedInputs.forEach(existedTableElement => {
         if (changeRequestedNames(element.name) === existedTableElement.name) {
            if (element.value !== existedTableElement.value) {
               if (addColor !== "noColor") {
                  element.classList.add('differentInputMain')
                  existedTableElement.classList.add('differentInputSide')
               } else {
                  element.classList.add('blackText')
                  existedTableElement.classList.add('noChange')
               }

            } else {
               element.classList.remove('differentInputMain')
               existedTableElement.classList.remove('differentInputSide')
               element.classList.remove('blackText')
               existedTableElement.classList.remove('noChange')
            }
         }
      });
   });


   console.log(document.querySelectorAll(".differentInputMain"), 'document.querySelectorAll(".differentInputMain")', document.querySelectorAll(".differentInputMain").length)

   if (document.querySelectorAll(".differentInputMain").length === 0) {
      updateDataButton.setAttribute("disabled", true)
   } else {
      updateDataButton.removeAttribute("disabled")
   }
}

async function sendDataverse(url, token) {

   const parameters = JSON.parse(params.query)
   const filtered = await filterBackend(`accounts?$filter=contains(uds_linkedincompanyid, '${parameters.customerId}')`)
   const filteredcontacts = parameters.linkedinUrl ? await filterBackend(`contacts?$filter=contains(uds_linkedin, '${parameters.linkedinUrl}')`) : await filterBackend(`contacts?$filter=contains(uds_salesnavigatoruserurl, '${parameters.salesUrl}')`)

   if (filtered.value.length !== 0) {
      if (filteredcontacts.value.length !== 0) {
         // message.innerHTML = 'contact updating... '
         const bodyOfReq = await getUserMainRequestObject()
         const responseOfAccount = await createAccount(`contacts(${filteredcontacts.value[0].contactid})`, token, 'PATCH', bodyOfReq)
         if (responseOfAccount.error) {
            errorMessageIndividual.style.display = 'flex'
            errorMessageIndividual.innerHTML = `Error: ${responseOfAccount.error.code}`
            sendAccountsButton.style.display = 'block'
         } else {
            // message.innerHTML = 'Contact Updated'
            errorMessageIndividual.style.display = 'none'
            mainCapture.style.display = 'none'
            ifExistUserTable.style.display = 'block'

            //update exist table after capturing
            const elements = document.querySelector('#ifExistUser').querySelectorAll(".inputForUser")
            const elementsMain = document.querySelector('#mainCapture').querySelector("#fieldsForUser").querySelectorAll(".inputForUser")
            const existedInputs = document.querySelector('#ifExistUser').querySelectorAll(".existed");
            await updateExistedTableForEditableFields(elements, elementsMain, existedInputs, filteredcontacts.value[0])
            goToCRMButton.style.display = 'block'
            updateDataButton.style.display = 'block'
            sendAccountsButton.style.display = 'none'

         }


      } else {
         // message.innerHTML = 'there have company with this id: ' + parameters.customerId
         const bodyOfReq = await getUserMainRequestObject()
         const responseOfAccount = await createAccount('contacts', token, "POST", bodyOfReq)

         console.log(errorMessageIndividual, 'responseOfAccount errorMessageIndividual')

         if (responseOfAccount.error) {
            errorMessageIndividual.style.display = 'flex'
            errorMessageIndividual.innerHTML = `Error: ${responseOfAccount.error.code}`
            sendAccountsButton.style.display = 'block'
         } else {
            successMessageIndividual.style.display = 'flex'
            errorMessageIndividual.style.display = 'none'
            goToCRMButton.style.display = 'block'
            mainCapture.querySelector(".informationBlock").style.display = "none"
            sendAccountsButton.style.display = 'none'
         }


         // message.innerHTML = 'Contact Created'


      }
   } else {
      // message.innerHTML = '0 company find. You need to create company first'
      const createdCompany = await createCompanyWithId('accounts', token)
      // message.innerHTML = 'Company created'
      const bodyOfReq = await getUserMainRequestObject()
      const responseOfAccount = await createAccount('contacts', token, "POST", bodyOfReq)
      // message.innerHTML = 'Contact created'
      console.log(responseOfAccount, 'responseOfAccount notexist')
      // mainCapture.querySelector(".informationBlock").style.display = "none"
      // successMessageIndividual.style.display = 'flex'
      // goToCRMButton.style.display = 'block'


      if (responseOfAccount.error) {
         errorMessageIndividual.style.display = 'flex'
         errorMessageIndividual.innerHTML = `Error: ${responseOfAccount.error.code}`
         sendAccountsButton.style.display = 'block'
      } else {
         successMessageIndividual.style.display = 'flex'
         goToCRMButton.style.display = 'block'
         mainCapture.querySelector(".informationBlock").style.display = "none"
         sendAccountsButton.style.display = 'none'
         errorMessageIndividual.style.display = 'none'
      }


   }
}




// Renders the table with data from GetAccounts
function writeTable(data) {

}

selectAccount();


const goToCrm = async () => {


   const parameters = JSON.parse(params.query)
   let data = null
   if (!parameters["companyName"]) {
      data = parameters.linkedinUrl ? await filterBackend(`contacts?$filter=contains(uds_linkedin, '${parameters.linkedinUrl}')`) : await filterBackend(`contacts?$filter=contains(uds_salesnavigatoruserurl, '${parameters.salesUrl}')`)
   } else {
      data = parameters.linkedinCompanyUrl ? await filterBackend(`accounts?$filter=contains(uds_linkedinprofilecompanyurl, '${parameters.linkedinCompanyUrl}')`) : await filterBackend(`accounts?$filter=contains(uds_salesnavigatorcompanyurl, '${parameters.salesCompanyUrl}')`)
   }

   if (data.value) {

      if (!parameters["companyName"]) {
         window.open(`${baseUrl}/main.aspx?pagetype=entityrecord&etn=contact&id=${data.value[0].contactid}`, "_blank");
      } else {
         window.open(`${baseUrl}/main.aspx?pagetype=entityrecord&etn=account&id=${data.value[0].accountid}`, "_blank");
      }


   }
}