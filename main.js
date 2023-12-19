const loginButton = document.getElementById("loginButton");
const logoutButton = document.querySelectorAll(".logoutButton");
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


console.log(url, 'testme url')
console.log(urlParams, 'testme urlParams')
console.log(url, 'testme')


let entries = JSON.parse(params.query)
let urlParameters = Object.entries(entries);
let parameters = JSON.parse(params.query)




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



const convertNameToNormalString = (name) => {
   switch (name) {
      case "jobtitle":
         return "Job title"
      case "firstname":
         return "Firstname"
      case "lastname":
         return "Lastname"
      case "fullname":
         return "Fullname"
      case "address1_name":
         return "Adress name"
      case "mobilephone":
         return "Personal phone"
      case "telephone1":
         return "Work phone"
      case "description":
         return "Commentary"
      case 'address1_name':
         return "Company adress"
      case 'numberofemployees':
         return "Number of employees"
      case 'description':
         return "Commentary"
      case 'websiteurl':
         return "Website URL"
      case 'name':
         return "Company name"
      default:
         return "Input "
   }
}


const changeRequestedNames = (name) => {
   switch (name) {
      case 'userName':
         return 'fullname';
      case 'jobTitle':
         return 'jobtitle';
      case 'location':
         return parameters.companyName ? "address1_name" : 'address1_name';
      case 'customer':
         return 'parentcustomerid_account';
      case 'phone':
         return 'telephone1';
      case 'email':
         return 'emailaddress1';
      case 'personalEmail':
         return 'emailaddress2';
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
         return parameters.companyName ? "description" : "description"
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



// const inputElements = document.querySelectorAll('.inputForUser');
// inputElements.forEach(input => {
//    input.addEventListener('input', handleInputChange);
// });


// function handleInputChange(event) {
//    // Get the ID and value of the changed input
//    const inputId = event.target.id;
//    const inputValue = event.target.value;

// }






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



const addValuesToInputFields = async (inputfields) => {


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
   const companies = await filterBackend(`accounts?$select=name&$filter=contains(uds_linkedincompanyid, '${parameters.customerId}')`)
   existedFields.forEach(element => {
      for (const key of keys) {
         if (key === element.name) {
            element.value = existedData[key]
         }


         if (element.name === 'linkedinUrl' || element.name === "linkedinCompanyUrl") {
            if (key === 'uds_linkedin' && existedData[key]) {
               element.value = existedData[key]

            } else if (key === 'uds_salesnavigatoruserurl' && existedData[key]) {
               element.value = existedData[key]
            } else if (key === 'uds_linkedinprofilecompanyurl' && existedData[key]) {
               element.value = existedData[key]
            } else if (key === 'uds_salesnavigatorcompanyurl' && existedData[key]) {
               element.value = existedData[key]
            }


         }
         if (element.name === 'customer') {
            if (companies.value[0]) {
               element.value = companies.value[0].name ? companies.value[0].name : ""
            }
         }
      }
   });
}







const fillFormElements = async (exist, existedInputs) => {
   if (exist) {
      await addDatasToExistedFieldsInTable(exist, existedInputs)
      await addValuesToInputFields(parameters['companyName'] ? addValuesToInputFields(document.querySelector("#ifExistCompany").querySelectorAll(".inputForUser")) : addValuesToInputFields(document.querySelector("#ifExistUser").querySelectorAll(".inputForUser")))
      const elements = await parameters['companyName'] ? document.querySelector("#ifExistCompany").querySelectorAll(".inputForUser") : document.querySelector("#ifExistUser").querySelectorAll(".inputForUser")
      highLightDifferentInputs(elements, existedInputs)
   } else {
      addValuesToInputFields(parameters['companyName'] ? addValuesToInputFields(document.querySelector("#fieldsForCompany").querySelectorAll(".inputForUser")) : addValuesToInputFields(document.querySelector("#fieldsForUser").querySelectorAll(".inputForUser")))
   }

}



const existOrNotFunction = async () => {
   loader.style.display = 'grid'
   if (parameters) {
      // showLoader()
      if (parameters['companyName']) {
         // const companies = parameters.linkedinCompanyUrl !== "" ? await filterBackend(`accounts?$filter=contains(uds_linkedinprofilecompanyurl, '${parameters.linkedinCompanyUrl}')`) : await filterBackend(`accounts?$filter=contains(uds_salesnavigatorcompanyurl, '${parameters.salesCompanyUrl}')`)
         const companies = await filterBackend(`accounts?$filter=contains(uds_linkedincompanyid, '${parameters.idOfCompany}')`)

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
            fieldsForCompanyForms.style.display = 'flex'
            fieldsForUserForms.style.display = 'none'
            sendAccountsButton.style.display = 'block'
            updateDataButton.style.display = 'none'
            goToCRMButton.style.display = 'none'
         }

         const existedInputs = document.querySelector('#ifExistCompany').querySelectorAll(".existed");
         await fillFormElements(companies.value[0], existedInputs);

      } else {
         const contacts = parameters.linkedinUrl ? await filterBackend(`contacts?$filter=contains(uds_linkedin, '${parameters.linkedinUrl}')`) : await filterBackend(`contacts?$filter=contains(uds_salesnavigatoruserurl, '${parameters.salesUrl}')`)
         // const contacts = await filterBackend(`contacts?$filter=contains(uds_linkedin, '${parameters.linkedinUrl}') or contains(fullname, '${parameters.userName}')`) 


         if (contacts.value.length !== 0) {
            mainCredentialsForm.style.display = 'none'
            ifExistCompany.style.display = 'none'
            mainCapture.style.display = 'none'
            sendAccountsButton.style.display = 'none'
            ifExistUserTable.style.display = 'block'
            updateDataButton.style.display = 'block'
            goToCRMButton.style.display = 'block'

         } else {

            mainCredentialsForm.style.display = 'none'
            ifExistUserTable.style.display = 'none'
            ifExistCompany.style.display = 'none'
            fieldsForCompanyForms.style.display = 'none'
            updateDataButton.style.display = 'none'
            goToCRMButton.style.display = 'none'
            fieldsForUserForms.style.display = 'flex'
            sendAccountsButton.style.display = 'block'
            mainCapture.style.display = 'block'
         }

         const existedInputs = document.querySelector('#ifExistUser').querySelectorAll(".existed");
         await fillFormElements(contacts.value[0], existedInputs);

      }

   }
   loader.style.display = 'none'
}


const loadingEventFunction = async () => {
   showLoader()
   mainCredentialsForm.style.display = 'none'
   const currentAccounts = myMSALObj.getAllAccounts();
   if (currentAccounts.length === 1) {
      mainCredentialsForm.style.display = 'none'
      await existOrNotFunction()
   } else {
      mainCredentialsForm.style.display = 'block'
   }
}

addEventListener("load", loadingEventFunction);






// Called from signIn or selectAccount functions
function showWelcomeMessage(username) {
   showLoader()
   // message.innerHTML = `Welcome ${username}`;
   loginWithButtonForm.style.display = "none";
   // logoutButton.style.display = "block";
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
            clientIdInput.classList.remove("errorInput")
         } else {
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
            tenantIdInput.classList.remove("errorInput")
         } else {
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
            crmUrlInput.classList.remove("errorInput")
         } else {
            if (e.target.value) {
               crmUrlInput.classList.add("errorInput")
            } else {
               crmUrlInput.classList.remove("errorInput")
            }
         }
         localStorage.setItem("crmUrlInput", e.target.value);
         break;
   }


   if (clientIdPattern.test(clientIdInput.value) && clientIdPattern.test(tenantIdInput.value) && crmUrlInput.value.match(regex)) {
      console.log('iam suitable')
      setupButton.removeAttribute('disabled');
   } else {
      console.log('iam not suitable')
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
      logoutButton.forEach(element => {
         element.style.display = 'none'
      });
      return;
   } else if (currentAccounts.length > 1) {
      // Add choose account code here
      console.warn("Multiple accounts detected.");
   } else if (currentAccounts.length === 1) {
      username = currentAccounts[0].username;
      showWelcomeMessage(username);
      logoutButton.forEach(element => {
         element.style.display = 'block'
      });
   }
}





const setup = () => {
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
   myMSALObj.loginPopup({
      scopes: ["User.Read", baseUrl + "/user_impersonation"] //<= Includes Dataverse scope
   })
      .then(response => {

         loginWithButtonForm.style.display = 'none'
         wentWrongForm.style.display = 'none'
         mainCredentialsForm.style.display = 'none'
         logoutButton.forEach(element => {
            element.style.display = 'block'
         })

         if (response !== null) {
            username = response.account.username;
            showWelcomeMessage(username);
         } else {
            selectAccount();
         }
      })
      .catch(error => {
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
         name: document.querySelector('#fieldsForCompany').querySelector(".companyName").value.trim(),
         numberofemployees: document.querySelector('#fieldsForCompany').querySelector(".numberOfWorkers").value,
         address1_name: document.querySelector('#fieldsForCompany').querySelector(".location").value.trim(),
         websiteurl: document.querySelector('#fieldsForCompany').querySelector(".companyUrl").value.trim(),
         uds_linkedinsize: Number(document.querySelector('#fieldsForCompany').querySelector(".lnSize").value),
         description: document.querySelector('#fieldsForCompany').querySelector(".comment").value.trim(),

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
         name: document.querySelector('#ifExistCompany').querySelector(".companyNameUpdated").value.trim(),
         numberofemployees: document.querySelector('#ifExistCompany').querySelector(".numberofemployeesUpdated").value,
         address1_name: document.querySelector('#ifExistCompany').querySelector(".locationUpdated").value.trim(),
         websiteurl: document.querySelector('#ifExistCompany').querySelector(".websiteurlUpdated").value.trim(),
         uds_linkedinsize: Number(document.querySelector('#ifExistCompany').querySelector(".lnSize").value),
         description: document.querySelector('#ifExistCompany').querySelector(".commentUpdated").value.trim(),

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

console.log(msalConfig.auth.redirectUri, 'msalConfig.auth.redirectUri', msalConfig, window.location.search)
// Called by the logoutButton
function signOut() {

   const logoutRequest = {
      account: myMSALObj.getAccountByUsername(username),
      postLogoutRedirectUri: msalConfig.auth.redirectUri,
      mainWindowRedirectUri: `${msalConfig.auth.redirectUri}${window.location.search}`
   };
   showLoader()

   myMSALObj.logoutPopup(logoutRequest).then((res) => {
      mainCredentialsForm.style.display = 'flex'
      loginWithButtonForm.style.display = 'none'
   });


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
      lastname: lastname.filter((_, i) => i > 0).join(" ").trim().replace(/\s+/g, ' '),
      fullname: document.querySelector('.userNameUpdated').value.trim().replace(/\s+/g, ' '),
      jobtitle: document.querySelector('.jobTitleUpdated').value.trim().replace(/\s+/g, ' '),
      address1_name: document.querySelector('.locationUpdated').value.trim().replace(/\s+/g, ' '),
      // _parentcustomerid_value: accounts.filter(account=>account.uds_linkedincompanyid === urlParameters['customerId'])[0].accountid,
      'parentcustomerid_account@odata.bind': `/accounts(${accounts.value[0].accountid})`,
      telephone1: document.querySelector('.phoneUpdated').value.trim().replace(/\s+/g, ' '),
      mobilephone: document.querySelector('.telUpdated').value.trim().replace(/\s+/g, ' '),
      emailaddress1: document.querySelector('.emailUpdated').value.trim().replace(/\s+/g, ' '),
      emailaddress2: document.querySelector('.personalEmailUpdated').value.trim().replace(/\s+/g, ' '),
      description: document.querySelector('.commentUpdated').value.trim().replace(/\s+/g, ' ')
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
      const responseOfCreateAccount = await createAccount(`contacts(${filteredcontacts.value[0].contactid})`, response.accessToken, 'PATCH', bodyOfReq)

      if (responseOfCreateAccount.error) {
         const inputsForAddingError = document.querySelector('#ifExistUser').querySelectorAll(".inputForUser")
         const errorMessageText = responseOfCreateAccount.error.message.toString()
         const errorRequestFieldName = errorMessageText.split("'")[1] === 'lastname' ? 'fullname' : errorMessageText.split("'")[1]
         if (errorMessageText.includes("length")) {
            const errorTexts = document.querySelectorAll(".errorForInputText")

            errorTexts.forEach(element => {
               element.style.display = 'none'
            });

            inputsForAddingError.forEach(element => {
               element.classList.remove("errorInput")
               // element.parentNode.childNodes[3].style.display = 'none'
               if (changeRequestedNames(element.name) === errorRequestFieldName) {
                  element.classList.add("errorInput")
                  element.parentNode.childNodes[3].innerHTML = `${convertNameToNormalString(errorRequestFieldName)} exceeds CRM character limit. Please extend the CRM limit or shorten the title in the extension form`
                  element.parentNode.childNodes[3].style.display = 'block'
               }
            })
         }
      }

      const filteredcontacts2 = parameters.linkedinUrl ? await filterBackend(`contacts?$filter=contains(uds_linkedin, '${parameters.linkedinUrl}')`) : await filterBackend(`contacts?$filter=contains(uds_salesnavigatoruserurl, '${parameters.salesUrl}')`)

      updateExistedTableForEditableFields(elements, elements, existedInputs, filteredcontacts2.value[0], 'noColor')

   } else {
      const response = await getTokenPopup({ scopes: [baseUrl + "/.default"] });
      // const companies = parameters.linkedinCompanyUrl ? await filterBackend(`accounts?$filter=contains(uds_linkedinprofilecompanyurl, '${parameters.linkedinCompanyUrl}')`) : await filterBackend(`accounts?$filter=contains(uds_salesnavigatorcompanyurl, '${parameters.salesCompanyUrl}')`)
      const companies = await filterBackend(`accounts?$filter=contains(uds_linkedincompanyid, '${parameters.idOfCompany}')`)
      const existedInputs = document.querySelector('#ifExistCompany').querySelectorAll(".existed");
      const elements = document.querySelector('#ifExistCompany').querySelectorAll(".inputForUser")
      const requestBodyOfCompany = await getRequestBodyOfCompany('updated')
      const createdCompanyResponse = await createCompany(`accounts(${companies.value[0].accountid})`, response.accessToken, 'PATCH', requestBodyOfCompany)

      if (createdCompanyResponse.error) {
         const inputsForAddingError = document.querySelector('#ifExistCompany').querySelectorAll(".inputForUser")

         const errorMessageText = createdCompanyResponse.error.message.toString()
         if (errorMessageText.includes("length")) {
            const errorTexts = document.querySelectorAll(".errorForInputText")

            errorTexts.forEach(element => {
               element.style.display = 'none'
            });
            inputsForAddingError.forEach(element => {
               element.classList.remove("errorInput")
               // element.parentNode.childNodes[3].style.display = 'none'


               if (changeRequestedNames(element.name) === errorMessageText.split("'")[1]) {
                  element.classList.add("errorInput")
                  element.parentNode.childNodes[3].innerHTML = `${convertNameToNormalString(errorMessageText.split("'")[1])} exceeds CRM character limit. Please extend the CRM limit or shorten the title in the extension form`
                  element.parentNode.childNodes[3].style.display = 'block'
               }
            })
         }
      }

      // const companies2 = parameters.linkedinCompanyUrl ? await filterBackend(`accounts?$filter=contains(uds_linkedinprofilecompanyurl, '${parameters.linkedinCompanyUrl}')`) : await filterBackend(`accounts?$filter=contains(uds_salesnavigatorcompanyurl, '${parameters.salesCompanyUrl}')`)
      const companies2 = await filterBackend(`accounts?$filter=contains(uds_linkedincompanyid, '${parameters.idOfCompany}')`)
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
      // const companies = parameters.linkedinCompanyUrl ? await filterBackend(`accounts?$filter=contains(uds_linkedinprofilecompanyurl, '${parameters.linkedinCompanyUrl}')`) : await filterBackend(`accounts?$filter=contains(uds_salesnavigatorcompanyurl, '${parameters.salesCompanyUrl}')`)
      const bodyOfCompany = await getRequestBodyOfCompany('main');
      const createdCompanyResponse = await createCompany("accounts", response.accessToken, 'POST', bodyOfCompany)

      if (!createdCompanyResponse.error) {
         mainCapture.querySelector(".informationBlock").style.display = "none"
         successMessageIndividual.style.display = 'flex'
         goToCRMButton.style.display = 'block'
         goToCRMButton.classList.add('goldGoToCrmButton')
         sendAccountsButton.style.display = 'none'
      } else {
         const errorMessageText = createdCompanyResponse.error.message.toString();
         const formElements = document.querySelector("#fieldsForCompany").querySelectorAll(".inputForUser")
         if (errorMessageText.includes("length")) {
            const nameOfFieldError = errorMessageText.split("'")[1]

            const newErrorTextElement = document.createElement(`p`)
            newErrorTextElement.classList.add("errorForInputTextNormal")
            newErrorTextElement.innerHTML = `${convertNameToNormalString(nameOfFieldError)} exceeds CRM character limit. Please extend the CRM limit or shorten the title in the extension form.`

            const errorTextsForRemove = document.querySelectorAll(".errorForInputTextNormal")

            errorTextsForRemove.forEach(element => {
               element.style.display = 'none'
            });

            formElements.forEach(element => {
               element.classList.remove("errorInput")
               if (changeRequestedNames(element.name) === nameOfFieldError) {
                  insertElementAfter(element.name, newErrorTextElement, 'company');
                  element.classList.add("errorInput")
               } else if (changeRequestedNames(element.name) === 'fullname') {
                  if (nameOfFieldError === 'lastname') {
                     element.classList.add("errorInput")
                     insertElementAfter(element.name, newErrorTextElement, 'company');
                  }
               }
            });

         }
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
   const valueOfName = document.querySelector("#fieldsForUser").querySelector(".customer").value
   const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
         uds_linkedincompanyid: parameters.customerId,
         name: valueOfName.slice(0, 160)
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



   const response = await fetch(webAPIEndpoint + "/" + url, options)
   return response.json()
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

console.log(parameters, 'oapranetesr')

const getUserMainRequestObject = async () => {
   const parameters = JSON.parse(params.query);
   const lastName = document.querySelector('.userName').value.split(" ")
   const bodyOfReq = {
      firstname: document.querySelector('.userName').value.split(" ")[0].trim().replace(/\s+/g, ' '),
      lastname: lastName.filter((_, i) => i > 0).join(" ").trim().replace(/\s+/g, ' '),
      fullname: document.querySelector('.userName').value.trim().replace(/\s+/g, ' '),
      jobtitle: document.querySelector('.jobTitle').value.trim().replace(/\s+/g, ' '),
      address1_name: document.querySelector('.location').value.trim().replace(/\s+/g, ' '),
      // _parentcustomerid_value: accounts.filter(account=>account.uds_linkedincompanyid === urlParameters['customerId'])[0].accountid,
      // 'parentcustomerid_account@odata.bind': `/accounts(${accounts.value[0].accountid})`,
      // telephone1: document.querySelector('.phone').value,
      // mobilephone: document.querySelector('.tel').value,
      // emailaddress1: document.querySelector('.email').value,
      // description: document.querySelector('.comment').value
      // uds_linkedin:dataObjectForRequest.uds_linkedin,
      // uds_salesnavigatoruserurl:dataObjectForRequest.uds_salesnavigatoruserurl
   }

   if (parameters.customerId !== "all") {
      const accounts = await filterBackend(`accounts?$filter=contains(uds_linkedincompanyid, '${parameters.customerId}')`)
      Object.assign(bodyOfReq, { 'parentcustomerid_account@odata.bind': `/accounts(${accounts.value[0].accountid})` })
   }



   if (document.querySelector('.tel').value) {
      Object.assign(bodyOfReq, { mobilephone: document.querySelector('.tel').value.trim().replace(/\s+/g, ' ') })
   }



   if (document.querySelector('.email').value) {
      Object.assign(bodyOfReq, { emailaddress1: document.querySelector('.email').value.trim().replace(/\s+/g, ' ') })
   }

   if (document.querySelector('.personalEmail').value) {
      Object.assign(bodyOfReq, { emailaddress2: document.querySelector('.personalEmail').value.trim().replace(/\s+/g, ' ') })
   }


   if (document.querySelector('.comment').value) {
      Object.assign(bodyOfReq, { description: document.querySelector('.comment').value.trim().replace(/\s+/g, ' ') })
   }

   if (document.querySelector('.phone').value) {
      Object.assign(bodyOfReq, { telephone1: document.querySelector('.phone').value.trim().replace(/\s+/g, ' ') })
   }

   if (parameters.linkedinUrl) {
      Object.assign(bodyOfReq, { uds_linkedin: parameters.linkedinUrl })
   }

   if (parameters.salesUrl) {
      Object.assign(bodyOfReq, { uds_salesnavigatoruserurl: parameters.salesUrl })
   }


   return bodyOfReq
}


const inputsForUserDublicateTable = document.querySelectorAll(".dublicateTableElement");


inputsForUserDublicateTable.forEach(element => {

   element.addEventListener("input", () => {
      const existedValue = document.querySelector(`[name='${changeRequestedNames(element.name)}']`)?.value
      if (element.value.trim() === existedValue.trim()) {
         element.classList.remove('differentInputMain')
         const isThereHaveDifference = document.querySelectorAll(".differentInputMain")
         const parentelement = element.parentElement
         const nextSibling = parentelement.nextElementSibling
         nextSibling.querySelector("input").classList.remove("differentInputSide")
         if (isThereHaveDifference.length === 0) {
            updateDataButton.setAttribute("disabled", true)
         }


      } else {
         element.classList.add('differentInputMain')
         const isThereHaveDifference = document.querySelectorAll(".differentInputMain")
         const parentelement = element.parentElement
         const nextSibling = parentelement.nextElementSibling
         nextSibling.querySelector("input").classList.add("differentInputSide")
         updateDataButton.removeAttribute("disabled")
      }
   })


});




const highLightDifferentInputs = async (elements, existedInputs, addColor) => {
   elements.forEach(element => {
      existedInputs.forEach(existedTableElement => {
         if (changeRequestedNames(element.name) === existedTableElement.name) {
            if (element.value.trim() !== existedTableElement.value.trim()) {
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



   if (document.querySelectorAll(".differentInputMain").length === 0) {
      updateDataButton.setAttribute("disabled", true)
   } else {
      updateDataButton.removeAttribute("disabled")
   }
}


const updateExistedTableForEditableFields = async (elements, elementsMain, existedInputs, existedData, addColor) => {
   const keys = Object.keys(existedData);



   elements.forEach(element => {
      elementsMain.forEach(elementMain => {
         if (elementMain.name === element.name) {
            element.value = elementMain.value.replace(/\s+/g, ' ')
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


   await highLightDifferentInputs(elements, existedInputs)



}


function insertElementAfter(inputName, newElement, forWhere) {

   var referenceElement = document.querySelector('[name="' + inputName + '"]');

   if (forWhere === 'company') {
      referenceElement = document.querySelector("#fieldsForCompany").querySelector('[name="' + inputName + '"]')
   } else {
      referenceElement = document.querySelector("#fieldsForUser").querySelector('[name="' + inputName + '"]');
   }

   referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);



}

async function sendDataverse(url, token) {
   const parameters = JSON.parse(params.query)
   console.log('pammeretes', parameters)
   const filtered = await filterBackend(`accounts?$filter=contains(uds_linkedincompanyid, '${parameters.customerId}')`)
   const formElements = document.querySelector("#fieldsForUser").querySelectorAll(".inputForUser")
   if (filtered.value.length !== 0) {
      // message.innerHTML = 'there have company with this id: ' + parameters.customerId
      const bodyOfReq = await getUserMainRequestObject()
      const responseOfAccount = await createAccount('contacts', token, "POST", bodyOfReq)


      if (responseOfAccount.error) {
         const errorMessageText = responseOfAccount.error.message.toString();

         if (errorMessageText.includes("length")) {
            const nameOfFieldError = errorMessageText.split("'")[1]

            const newErrorTextElement = document.createElement(`p`)
            newErrorTextElement.classList.add("errorForInputTextNormal")
            newErrorTextElement.innerHTML = `${convertNameToNormalString(nameOfFieldError)} exceeds CRM character limit. Please extend the CRM limit or shorten the title in the extension form.`

            const errorTextsForRemove = document.querySelectorAll(".errorForInputTextNormal")

            errorTextsForRemove.forEach(element => {
               element.style.display = 'none'
            });

            formElements.forEach(element => {
               element.classList.remove("errorInput")
               if (changeRequestedNames(element.name) === nameOfFieldError) {
                  element.classList.add("errorInput")
                  insertElementAfter(element.name, newErrorTextElement, 'contact');
               } else if (changeRequestedNames(element.name) === 'fullname') {
                  if (nameOfFieldError === 'lastname') {
                     element.classList.add("errorInput")
                     insertElementAfter(element.name, newErrorTextElement, 'contact');
                  }
               }
            });

         }

         sendAccountsButton.style.display = 'block'
      } else {
         formElements.forEach(element => {
            element.value = element.value.trim().replace(/\s+/g, ' ')
         })
         formElements.forEach(element => {
            element.classList.remove("errorInput")
         })

         const errrorField = document.querySelector('.errorForInputTextNormal')
         if (errrorField) {
            errrorField.style.display = 'none'
         }

         successMessageIndividual.style.display = 'flex'
         goToCRMButton.style.display = 'block'
         goToCRMButton.classList.add('goldGoToCrmButton')
         mainCapture.querySelector(".informationBlock").style.display = "none"
         sendAccountsButton.style.display = 'none'



      }

   } else {
      // message.innerHTML = '0 company find. You need to create company first'
      if (parameters.customerId !== "all") {
         const createdCompany = await createCompanyWithId('accounts', token)
      }
      // message.innerHTML = 'Company created'
      const bodyOfReq = await getUserMainRequestObject()
      const responseOfAccount = await createAccount('contacts', token, "POST", bodyOfReq)
      // message.innerHTML = 'Contact created'
      // mainCapture.querySelector(".informationBlock").style.display = "none"
      // successMessageIndividual.style.display = 'flex'
      // goToCRMButton.style.display = 'block'


      if (responseOfAccount.error) {

         const errorMessageText = responseOfAccount.error.message.toString();


         if (errorMessageText.includes("length")) {
            const nameOfFieldError = errorMessageText.split("'")[1]

            const newErrorTextElement = document.createElement(`p`)
            newErrorTextElement.classList.add("errorForInputTextNormal")
            newErrorTextElement.innerHTML = `${convertNameToNormalString(nameOfFieldError)} exceeds CRM character limit. Please extend the CRM limit or shorten the title in the extension form.`

            const errorTextsForRemove = document.querySelectorAll(".errorForInputTextNormal")

            errorTextsForRemove.forEach(element => {
               element.style.display = 'none'
            });

            formElements.forEach(element => {
               element.classList.remove("errorInput")
               if (changeRequestedNames(element.name) === nameOfFieldError) {
                  element.classList.add("errorInput")
                  insertElementAfter(element.name, newErrorTextElement, 'contact');
               } else if (changeRequestedNames(element.name) === 'fullname') {
                  if (nameOfFieldError === 'lastname') {
                     element.classList.add("errorInput")
                     insertElementAfter(element.name, newErrorTextElement, 'contact');
                  }
               }
            });

         }
         sendAccountsButton.style.display = 'block'




      } else {
         successMessageIndividual.style.display = 'flex'
         goToCRMButton.style.display = 'block'
         goToCRMButton.classList.add('goldGoToCrmButton')
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
      // data = parameters.linkedinCompanyUrl ? await filterBackend(`accounts?$filter=contains(uds_linkedinprofilecompanyurl, '${parameters.linkedinCompanyUrl}')`) : await filterBackend(`accounts?$filter=contains(uds_salesnavigatorcompanyurl, '${parameters.salesCompanyUrl}')`)
      data = await filterBackend(`accounts?$filter=contains(uds_linkedincompanyid, '${parameters.idOfCompany}')`)
   }

   if (data.value) {

      if (!parameters["companyName"]) {
         window.open(`${baseUrl}/main.aspx?pagetype=entityrecord&etn=contact&id=${data.value[0].contactid}`, "_blank");
      } else {
         window.open(`${baseUrl}/main.aspx?pagetype=entityrecord&etn=account&id=${data.value[0].accountid}`, "_blank");
      }


   }
}




function validateString(count, inputString) {
   // Check if the length is within the limit
   console.log(inputString.length, count, 'test me')
   if (inputString.length > count) {
      return false;
   }

   // // Check if the string contains only Latin characters
   // if (!/^[a-zA-Z\s'-]+$/.test(inputString)) {
   //    return false;
   // }

   return true;
}


function validateNumber(max, number) {
   if (number > max) {
      return false;
   }
   return true;
}



const addErrorMessage = (count, currentElement, type, inputName, node, action) => {

   if (type === 'div') {
      const newErrorTextElement = document.createElement(`p`)
      newErrorTextElement.classList.add("errorForInputTextNormal")
      newErrorTextElement.innerHTML = `${count} characters allowed`
      const errorsNormal = document.querySelectorAll(".errorForInputTextNormal")
      errorsNormal.forEach((error) => {
         error.style.display = 'none'
      })
      if (node.id === "fieldsForUser") {
         insertElementAfter(inputName, newErrorTextElement, 'user')
      } else {
         insertElementAfter(inputName, newErrorTextElement, 'company')
      }
      currentElement.classList.add("errorInput")


   } else {
      node.childNodes[3].innerHTML = `${count} characters allowed`
      node.childNodes[3].style.display = 'block'
      node.childNodes[1].classList.add("errorInput")
   }


   if (action === 'remove') {

      const errors = document.querySelectorAll(".errorForInputText")
      errors.forEach((error) => {
         error.style.display = 'none'
      })
      const errorsNormal = document.querySelectorAll(".errorForInputTextNormal")
      errorsNormal.forEach((error) => {
         error.style.display = 'none'
      })
      if (type === 'div') {
         currentElement.classList.remove("errorInput")
      } else {
         node.childNodes[1].classList.remove("errorInput")
      }
   }
}


function validateURL(url) {
   // Regular expression for a simple URL validation
   var urlPattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/\S*)?$/i;
 
   // Test the URL against the pattern
   return urlPattern.test(url);
 }


 
// validation part 

const inputElements = document.querySelectorAll(".inputForUser")

const validateInputFields = (e) => {

   switch (e.target.name) {
      case 'userName':
         if (!validateString(100, e.target.value)) {
            addErrorMessage(100, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(100, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'jobTitle':
         if (!validateString(1000, e.target.value)) {
            addErrorMessage(1000, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(1000, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'location':
         if (!validateString(200, e.target.value)) {
            addErrorMessage(200, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(200, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'customer':
         if (!validateString(160, e.target.value)) {
            addErrorMessage(160, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(160, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'phone':
         if (!validateString(50, e.target.value)) {
            addErrorMessage(50, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(50, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'tel':
         if (!validateString(50, e.target.value)) {
            addErrorMessage(50, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(50, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'email':
         if (!validateString(100, e.target.value)) {
            addErrorMessage(100, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(100, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'personalEmail':
         if (!validateString(100, e.target.value)) {
            addErrorMessage(100, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(100, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'comment':
         if (!validateString(2000, e.target.value)) {
            addErrorMessage(2000, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(2000, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'companyName':
         if (!validateString(160, e.target.value)) {
            addErrorMessage(160, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(160, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'lnSize':
         if (!validateNumber(2147483647, e.target.value)) {
            addErrorMessage(2147483647, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(2147483647, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'numberOfWorkers':
         if (!validateNumber(1000000000, e.target.value)) {
            addErrorMessage(1000000000, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage(1000000000, e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      case 'companyUrl':
         if (!validateURL(e.target.value)) {
            addErrorMessage('https://example.com', e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'add')
         } else {
            addErrorMessage('https://example.com', e.currentTarget, e.currentTarget.parentNode.nodeName.toLowerCase(), e.target.name, e.currentTarget.parentNode, 'remove')
         }
         break;
      default:
         break;
   }

}




inputElements.forEach((element) => {
   element.addEventListener("input", validateInputFields)
})