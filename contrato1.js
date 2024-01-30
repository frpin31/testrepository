const create = 'Contract/call_to_save_contract';
const update = 'Contract/update/';
const delete_contract_document_data = 'Contract/delete_contract_document_data';

let shouldShowConfirmation = true;

// Set the confirmation message based on your condition
window.onbeforeunload = function(event) {
    if (shouldShowConfirmation) {
        // This message will be shown in the confirmation dialog
        const confirmationMessage = "You're leaving the Contract page, any unsaved work will be lost.";
        event.returnValue = confirmationMessage;
        return confirmationMessage;
    }
};


const Toast = Swal.mixin({
    toast: true,
    position: "center-end",
    showConfirmButton: false,
    timer: 8000,
    width: "30%",
    timerProgressBar: true,
    showClass: {
        popup: `
            animate__animated
            animate__backInLeft
            animate__faster
        `
    },
    hideClass: {
        popup: `
            animate__animated
            animate__backOutRight
            animate__faster
        `
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
});

function sweetAlert(type, text, url) {
    // Se compara el tipo de mensaje a mostrar.
    switch (type) {
        case 1:
            title = 'Success';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error';
            break;
        case 3:
            title = 'Warning';
            icon = 'warning';
            break;
        case 4:
            title = 'Notice';
            icon = 'info';
    }
    // Si existe una ruta definida, se muestra el mensaje y se direcciona a dicha ubicación, de lo contrario solo se muestra el mensaje.
    if (url) {
        swal.fire({
            title: title,
            text: text,
            icon: icon,
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(function () {
            location.href = url
        });
    } else {
        swal.fire({
            title: title,
            text: text,
            icon: icon,
            allowOutsideClick: false,
            allowEscapeKey: false
        });
    }
}

// jQuery syntax: This function will be executed when the DOM is fully loaded and ready for manipulation.
$(document).ready(function() {
    // Code inside this block will run after the DOM is ready.
    // It's commonly used in jQuery to ensure that the DOM elements are accessible before manipulating them.
    // Attach a click event handler to a parent element that exists in the DOM
    // and delegate it to ".li" elements
    $(document).on("click", ".services-list li", function() {
        // Remove the active class from all list items in the same list
        let serviceId = $(this).closest(".row")[0].id;
        if($(this).hasClass("active")){
            $(this).closest("ul").find("li").removeClass("active");
        } else {
            $(this).closest("ul").find("li").removeClass("active");
            $(this).addClass("active");
        }
        // get the number of the contact and number of the service
        // Regular expression to match and extract the 2 numbers from id
        const regex = /\d+/g;
        // Use the `match` method to find all matches
        const matches = serviceId.match(regex);
        if (matches && matches.length >= 2) {
            // Assign the first and last numbers to variables
            const contactNum = parseInt(matches[0]);
            const serviceId = parseInt(matches[matches.length - 1]);
            // Get the checkbox element
            const checkboxElement = document.getElementById('selectAll' + contactNum);
            // Set the checked property to false
            checkboxElement.checked = false;
            let serviceNum = contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == contactNum)].services.findIndex(function (services){
                return services.serviceId == serviceId;
            });
            if(serviceNum >= 0){
                var store = $(this).contents().first().text().trim();
                if($(this).hasClass("active")){
                    addApplicationsToView(store, contactNum, serviceNum);
                } else {
                    document.getElementById("Contact" + contactNum + "ApplicationsContainer").innerHTML = "";
                }
            } else {
                sweetAlert(2, 'There was an issue with your request, please contact an administrator', null);
            }
        } else {
            sweetAlert(2, 'There was an issue with your request, please contact an administrator', null);
        }

    });

    // Handle button click events
    $(document).on("click", ".save-applications", function(e) {
        e.preventDefault();
        console.log("activated");
        // Find the associated ul element
        const ulElement = $(this).siblings("ul");
        let contactId = $(this)[0].id;
        const regex = /\d+/;
        // Use the `match` method to find the first match
        const match = contactId.match(regex);
        if (match) {
            // Convert the matched string to a number and assign it to a variable
            let extractedContactId = parseInt(match[0]);
            let activeService = $("#Contact" + extractedContactId + "ServicesContainer").find(".active").closest(".row");
            if(activeService == undefined || activeService.length==0 || activeService === null || activeService === "" ) {
                sweetAlert(2, 'Select a Service', null);
            } else {
                let serviceId = $("#Contact" + extractedContactId + "ServicesContainer").find(".active").closest(".row")[0].id;
                if (ulElement.length > 0) {
                    const applicationElement = ulElement.find("li");
                    const regex2 = /\d+/g;
                    const match2 = serviceId.match(regex2);
                    if(match2 && match2.length >= 2){
                        let extractedServiceId = parseInt(match2[match2.length - 1]);
                        let servicePositionId = contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == extractedContactId)].services.findIndex(function (services){
                            return services.serviceId == extractedServiceId;
                        });
                        console.log(extractedServiceId);
                        const repeatedApplicationIds = [];
                        let repeatedCounter = 1;
                        applicationElement.each(function() {
                            // check if application exist in the json by searching it
                            // if application exists:
                            //          if current status is checked(true), dont do anything
                            //          if current status is unchecked(false), remove application from json
                            // add all aplications that are not in json and status is checked(true)
                            let applicationId = $(this).find("input")[0].id;
                            const match3 = applicationId.match(/\d+/);
                            let applicationName = $(this).find("label").text();
                            let applicationShortName = $(this).find("label")[0].dataset.customShortName;
                            if (match3) {
                                const extractedApplicationId = parseInt(match3[0]);
                                let index = contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == extractedContactId)].services[servicePositionId].applications.findIndex(function (applications){
                                    return applications.applicationName == applicationName;
                                });

                                if($(this).find("input").is(":checked")){
                                    if(index >= 0){
                                    } else {
                                        for (const service of contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == extractedContactId)].services) {
                                            for (const application of service.applications) {
                                                const applicationIdCheck = application.applicationId;
                                                if (applicationIdCheck === match3 || applicationIdCheck == match3) {
                                                    repeatedApplicationIds.push("<br>" + repeatedCounter + "- " + applicationName);
                                                    repeatedCounter++;
                                                }
                                            }
                                        }
                                        // Using Array.prototype.some() to check if any element in the array includes the specified searchText
                                        const exists = repeatedApplicationIds.some(item => item.includes(applicationName));
                                        if(repeatedApplicationIds.length == 0 || repeatedApplicationIds.length === 0) {
                                            contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == extractedContactId)].services[servicePositionId].applications.push(
                                                {
                                                    'applicationName':applicationName,
                                                    'applicationId':extractedApplicationId,
                                                    'applicationShortName': applicationShortName
                                                }
                                            );
                                        } else if (!exists){
                                            contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == extractedContactId)].services[servicePositionId].applications.push(
                                                {
                                                    'applicationName':applicationName,
                                                    'applicationId':extractedApplicationId,
                                                    'applicationShortName': applicationShortName
                                                }
                                            );
                                        }
                                    }
                                } else {
                                    if(index >= 0){
                                        contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == extractedContactId)].services[servicePositionId].applications.splice(index,1);
                                    } else {

                                    }
                                }
                            } else {
                                console.log("No numbers found in the string.");
                            }
                        });
                        if(repeatedApplicationIds.length == 0 || repeatedApplicationIds.length === 0) {
                        } else {
                            Toast.fire({
                                icon: "error",
                                position: "center",
                                title: "Can't add " + (repeatedCounter-1) + " application(s)",
                                showCloseButton: true,
                                html: `
                                    The contact has already the following applications:
                                    <br>
                                    <div style="word-wrap: break-word;">
                                        <b>` + repeatedApplicationIds + `</b>
                                    </div>
                                    <br>
                                    You shouldn't repeat an application in a Contract
                                `
                            });
                        }

                        updateApplicationsPerService(extractedContactId, servicePositionId, extractedServiceId);
                    }
                }
            }
        } else {
            console.log("No number found in the string.");
        }
    });
    console.log(1);
    $("#printButton").click(function() {
        // This code is executed when the button is clickedd.
        let json = JSON.stringify(contractJSON, null, 2);
        console.log(json);
        document.getElementById("jsonModalBody").innerHTML = json;
    });

    $("#expandTablePreview").click(function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag
        $(this).toggleClass("highlight"); // Toggle the "highlight" class on the clicked element
        let table_title = $("#table_title");
        let sizeMP = Object.keys(contractJSON.contract.monthlyPayments).length;

        // This code is executed when the button is clicked.
        if(sizeMP == 0 || sizeMP === 0){

        } else {
            let html = '';
            // Toggle the text between "On" and "Off"
            if ($(this).text() === "expand view") {
                for(let i = 0; i < sizeMP; ++i){
                    html += `
                        <tr>
                            <th scope="row">${1+i}</th>
                            <td>${contractJSON.contract.monthlyPayments[i].date}</td>
                            <td>$ ${contractJSON.contract.monthlyPayments[i].amount}</td>
                        </tr>
                        `;
                }
                table_title.text("Table Preview - Detailed");
                $(this).text("collapse view");
            } else {
                if(contractJSON.contract.monthlyPayments[0].amount == contractJSON.contract.monthlyPayments[sizeMP-1].amount){

                    if(sizeMP == 1 || sizeMP === 1){
                        html += `
                        <tr>
                            <th scope="row">${sizeMP}</th>
                            <td>${contractJSON.contract.monthlyPayments[0].date}</td>
                            <td>$ ${contractJSON.contract.monthlyPayments[0].amount}</td>
                        </tr>
                        `;
                    } else {
                        html += `
                        <tr>
                            <th scope="row">${sizeMP}</th>
                            <td>from ${contractJSON.contract.monthlyPayments[0].date} to ${contractJSON.contract.monthlyPayments[sizeMP-1].date}</td>
                            <td>$ ${contractJSON.contract.monthlyPayments[0].amount}</td>
                        </tr>
                        `;
                    }
                } else if (contractJSON.contract.monthlyPayments[0].amount > contractJSON.contract.monthlyPayments[1].amount) {

                    html += `
                        <tr>
                            <th scope="row">1</th>
                            <td>${contractJSON.contract.monthlyPayments[0].date}</td>
                            <td>$ ${contractJSON.contract.monthlyPayments[0].amount}</td>
                        </tr>
                        <tr>
                            <th scope="row">${sizeMP-1}</th>
                            <td>from ${contractJSON.contract.monthlyPayments[1].date} to ${contractJSON.contract.monthlyPayments[sizeMP-1].date}</td>
                            <td>$ ${contractJSON.contract.monthlyPayments[1].amount}</td>
                        </tr>
                        `;
                } else {

                    html += `
                        <tr>
                            <th scope="row">${sizeMP-1}</th>
                            <td>from ${contractJSON.contract.monthlyPayments[0].date} to ${contractJSON.contract.monthlyPayments[sizeMP-2].date}</td>
                            <td>$ ${contractJSON.contract.monthlyPayments[0].amount}</td>
                        </tr>

                        <tr>
                            <th scope="row">1</th>
                            <td>${contractJSON.contract.monthlyPayments[sizeMP-1].date}</td>
                            <td>$ ${contractJSON.contract.monthlyPayments[sizeMP-1].amount}</td>
                        </tr>
                        `;
                }
                table_title.text("Table Preview - Summary");
                $(this).text("expand view");
            }

            document.getElementById("previewTable").innerHTML = html;
        }
    });

    $( "#dateDP" ).datepicker({
        minDate: 0,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true
    });

    $( "#startDateMC" ).datepicker({
        minDate: 0,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true
    });

    $( "#endDateMC" ).datepicker("option", "disabled", true, { minDate: -20, maxDate: "+1M +10D" });

    /*
        $( "#dateDP" ).datepicker({
            beforeShowDay: function(date) {
                var day = date.getDate();
                // Array of allowed days
                var allowedDays = [1, 15, 30, 31];

                // Check if the current day is in the allowed days array
                if (allowedDays.includes(day)) {
                return [true, ''];
                } else {
                return [false, ''];
                }
            },
            minDate: 0,
            maxDate: "+1M +10D",
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            selectOtherMonths: true
        });
    */
    loadContract();
});

// Native JavaScript syntax: This event listener will be triggered when the DOM has been fully loaded and is ready for interaction.
// document.addEventListener('DOMContentLoaded', function() {
//      // Code inside this block will run after the DOMContentLoaded event is fired.
//     // It's a native way to ensure that the DOM elements are accessible before performing any operations.
//     //adjustmentPositioning();
//     //loadContract();
// }, false);

function getHeaders() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
}

$(".dateinput").on("keydown", function(e) {
    e.preventDefault();
});



function updateApplicationsPerService(contactId, servicePositionNum, serviceId){
    let numApplications = Object.keys(contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == contactId)].services[servicePositionNum].applications).length;
    $("#Contact" + contactId + "Service" + serviceId).find("span").text(numApplications);
}

/*// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

document.querySelector('#amountDP').addEventListener('change', (e)=>{
    if(isNaN(e.target.value)){
        e.target.value = ''
    }else{
        e.target.value = formatter.format(e.target.value);
    }
})*/

/*// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation');
// Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach((form) => {
  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }, false);
});*/
let operation;
let downPaymentAmount = 0;
let downPaymentDate = "";
let totalMonthlyCharges = 0;
let numberOfMonthlyCharges = 0;
let amountMonthlyCharges = 0;
let totalContractAmount = 0;

/**
 * -- Pending to comment --
 * @param {*} num
 */
function adjustSummary(num){
    //Object.keys(contractJSON.contract.contacts[contactId].services[servicePositionNum].applications).length;
    //contractJSON.contract.monthlyPayments[sizeMP-1].date;
    // scenarios:

    // Not given 1, given 2 and 3 calculate 1
    // Not given 2, given 1 and 3 calculate 2
    // Not given 3, given 1 and 2 calculate 3

    // all elements already calculated
        // given 1 again
            // check if greater than 3
                // yes, then delete 3, calculate 3 by summing 1 and 2
                // no, then delete 2, calculate 2 by doing 3 minus 1
                    // set all the inputs from 2 to 0 or empty
                    // add 2 to value of input of total 2

        // given 2 again
            // check if greater than 3
                // yes, then delete 3, calculate 3 by summing 1 and 2
                // no, then delete 2, calculate 2 by doing 3 minus 1
                    // set all the inputs from 2 to 0 or empty
                    // add 2 to value of input of total 2

    /*let amountDP = contractJSON.contract.downPaymentAmount;
    let amountMC = contractJSON.contract.monthlyPaymentsTotalAmount;
    let amountTC = contractJSON.contract.contractTotalAmount;*/

    /*let amountDP = downPaymentAmount;
    let amountMC = totalMonthlyCharges;
    let amountTC = totalContractAmount;*/

    let amountDP = 0;
    let amountMC = 0;
    let amountTC = 0;

    /*amountDP = parseFloat(amountDP);
    amountMC = parseFloat(amountMC);
    amountTC = parseFloat(amountTC);*/

    console.log(amountDP);
    console.log(amountMC);
    console.log(amountTC);

    //var inputEvent = new Event('input', { bubbles: true, cancelable: true });

    /*if(num == 1 || num === 1) {

        downPaymentAmount = document.getElementById("amountDP").value;
        //downPaymentAmount = parseFloat(downPaymentAmount).toFixed(2);
        //downPaymentDate = dayFormatted;

    } else if(num == 2 || num === 2) {

        //document.getElementById("summaryMC").innerText = parseFloat(totalMonthlyCharges).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

        //contractJSON.contract.numberOfMonthlyPayments = parseInt(Object.keys(contractJSON.contract.monthlyPayments).length);
        //contractJSON.contract.monthlyPaymentsTotalAmount = parseFloat(totalMonthlyCharges).toFixed(2);

    } else if(num == 3 || num === 3) {

        totalContractAmount = document.getElementById("totalContractAmount").value;

    }*/

    let flag1 = true;
    console.log(totalMonthlyCharges);

    if(num == 1 || num === 1) {

        amountDP = document.getElementById("amountDP").value;

        if(amountDP >= totalContractAmount && totalContractAmount != 0 && amountDP != 0){
            console.log("case 1 1");
            sweetAlert(2, 'Down Payment amount: $' + amountDP + ', cannot be greater or equal than total amount: $' + totalContractAmount, null);
            flag1 = false;

        }


    } else if(num == 2 || num === 2) {

        amountMC = totalMonthlyCharges;

        console.log(amountMC);
        if(amountMC >= totalContractAmount && totalContractAmount != 0 && amountMC != 0){
            console.log("case 2 1");
            sweetAlert(2, 'Monthly Charges amount: $' + amountMC + ', cannot be greater or equal than total amount: $' + totalContractAmount, null);
            flag1 = false;

        }

    } else if(num == 3 || num === 3) {

        amountTC = document.getElementById("totalContractAmount").value;

        if(downPaymentAmount >= amountTC && amountTC != 0 && downPaymentAmount != 0 ){
            console.log("case 3 1");
            console.log(downPaymentAmount);
            sweetAlert(2, 'Total Contract Amount: $' + amountTC + ', cannot be lower or equal than Down Payment amount: $' + downPaymentAmount, null);
            flag1 = false;

        } else if(totalMonthlyCharges >= amountTC && amountTC != 0 && totalMonthlyCharges != 0 ) {
            console.log("case 3 2");
            sweetAlert(2, 'Total Contract Amount: $' + amountTC + ', cannot be lower or equal than Monthly Charges amount: $' + totalMonthlyCharges, null);
            flag1 = false;

        }
    }

    console.log(flag1);

    if(flag1){

        if(num == 1 || num === 1){

            amountDP = document.getElementById("amountDP").value;
            amountMC = totalMonthlyCharges;
            amountTC = totalContractAmount;

        } else if(num == 2 || num === 2){

            amountDP = downPaymentAmount;
            amountMC = totalMonthlyCharges;
            amountTC = totalContractAmount;

        } else if(num == 3 || num === 3){

            amountDP = downPaymentAmount;
            amountMC = totalMonthlyCharges;
            amountTC = document.getElementById("totalContractAmount").value;
        }

        if(
            (amountDP == null || amountDP === null || amountDP == undefined || amountDP == 0 || amountDP === 0)
        && (!(amountMC == null || amountMC === null || amountMC == undefined || amountMC == 0 || amountMC === 0) && amountMC > 0)
        && (!(amountTC == null || amountTC === null || amountTC == undefined || amountTC == 0 || amountTC === 0) && amountTC > 0)){

            console.log("case 1 DP");

            amountDP = parseFloat(amountTC) - parseFloat(amountMC);
            console.log(amountDP);

            document.getElementById("summaryDownPayment").innerText = parseFloat(amountDP).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });
            document.getElementById("amountDP").value = amountDP;
            document.getElementById("summaryDownPaymentAmount").innerText = parseFloat(amountDP).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

        } else if(
            (!(amountDP == null || amountDP === null || amountDP == undefined || amountDP == 0 || amountDP === 0) && amountDP > 0)
        && (amountMC == null || amountMC === null || amountMC == undefined || amountMC == 0 || amountMC === 0)
        && (!(amountTC == null || amountTC === null || amountTC == undefined || amountTC == 0 || amountTC === 0) && amountTC > 0)){

            console.log("case 2 MC");

            amountMC = parseFloat(amountTC) - parseFloat(amountDP);
            console.log(amountMC);

            document.getElementById("summaryMC").innerText = parseFloat(amountMC).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });
            document.getElementById("totalMC").value = amountMC;
            document.getElementById("summaryMCAmount").innerText = parseFloat(amountMC).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

        } else if(
            (!(amountDP == null || amountDP === null || amountDP == undefined || amountDP == 0 || amountDP === 0) && amountDP > 0)
        && (!(amountMC == null || amountMC === null || amountMC == undefined || amountMC == 0 || amountMC === 0) && amountMC > 0)
        && (amountTC == null || amountTC === null || amountTC == undefined || amountTC == 0 || amountTC === 0)){

            console.log("case 3 TC");

            amountTC = parseFloat(amountDP) + parseFloat(amountMC);
            console.log(amountTC);

            document.getElementById("totalContractAmount").value = amountTC;
            document.getElementById("summaryTotalContract").innerText = parseFloat(amountTC).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });
            document.getElementById("summaryDownPaymentAmount").innerText = parseFloat(amountDP).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });
            document.getElementById("summaryMCAmount").innerText = parseFloat(amountMC).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

            contractJSON.contract.contractTotalAmount = parseFloat(amountTC).toFixed(2);

        } else if (
            (!(amountDP == null || amountDP === null || amountDP == undefined || amountDP == 0 || amountDP === 0) && amountDP > 0)
        && (!(amountMC == null || amountMC === null || amountMC == undefined || amountMC == 0 || amountMC === 0) && amountMC > 0)
        && (!(amountTC == null || amountTC === null || amountTC == undefined || amountTC == 0 || amountTC === 0) && amountTC > 0)) {

            console.log("case 4 All Filled");

            let result = 0;

            if(num == 1 || num === 1) {

                amountTC = parseFloat(amountDP) + parseFloat(amountMC);

                document.getElementById("totalContractAmount").value = amountTC;
                document.getElementById("summaryTotalContract").innerText = parseFloat(amountTC).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

                contractJSON.contract.contractTotalAmount = parseFloat(amountTC).toFixed(2);

            } else if(num == 2 || num === 2) {

                amountTC = parseFloat(amountDP) + parseFloat(amountMC);

                document.getElementById("totalContractAmount").value = amountTC;
                document.getElementById("summaryTotalContract").innerText = parseFloat(amountTC).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

                contractJSON.contract.contractTotalAmount = parseFloat(amountTC).toFixed(2);

            } else if(num == 3 || num === 3) {

                totalMonthlyCharges = amountTC - amountDP;

                document.getElementById("summaryMCListOfCharges").innerHTML = `<p class="fw-light text-start">0 of $ 0.00</p>`;

                document.getElementById("summaryMCTotalNumberOfCharges").innerText = "0 charges in total";

                document.getElementById("summaryMCStartDate").innerText = "00/00/0000";
                document.getElementById("summaryMCEndDate").innerText = "00/00/0000";

                document.getElementById("summaryMC").innerText = parseFloat(totalMonthlyCharges).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

                document.getElementById("summaryMCAmount").innerText = parseFloat(totalMonthlyCharges).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

                let html = `
                    <tr>
                        <th scope="row">0</th>
                        <td>00/00/0000</td>
                        <td>$ 00.00</td>
                    </tr>
                `;

                document.getElementById("previewTable").innerHTML = html;

                document.getElementById("amountMC").value = 0;
                document.getElementById("numberOfMC").value = 0;

                $( "#startDateMC" ).datepicker( "setDate", null );
                $( "#endDateMC" ).datepicker( "setDate", null );

                document.getElementById("totalMC").value = totalMonthlyCharges;

                contractJSON.contract.numberOfMonthlyPayments = "0";
                contractJSON.contract.monthlyPayments.length = "0";

                contractJSON.contract.monthlyPaymentsTotalAmount = parseFloat(totalMonthlyCharges).toFixed(2);

                Toast.fire({
                    icon: "info",
                    title: "Monthly Charges information changed",
                    html: `
                        Due to changes to <b>Total Contract amount</b>,
                        all the details of monthly charges changed.
                        Total Monthly Charges amount is now: <b>` + parseFloat(totalMonthlyCharges).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 }) + `</b>
                    `
                });

            }


            // always delete TC either way is MC or DP
            // if is mc or dp
                // do dp + mc and save it to val1
                // empty tc
                // assign tc value of val1
            // if is tc
                // delete mc
                // calculate mc by doing tc - dp
                // assign value to mc
            // reminder: in all empty/adding/update transactions, do it to view and json

        }

        console.log(num);
        if(num == 1 || num === 1) {

            console.log(amountDP);

            downPaymentAmount = parseFloat(amountDP);

            document.getElementById("summaryDownPayment").innerText = parseFloat(downPaymentAmount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });
            let dateInput = $( "#dateDP" ).datepicker( "getDate" );
            let dayFormatted = objectDateToFormattedDate(dateInput);
            document.getElementById("summaryDownPaymentDate").innerText = dayFormatted;

            document.getElementById("summaryDownPaymentAmount").innerText = parseFloat(downPaymentAmount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

            contractJSON.contract.downPaymentAmount = parseFloat(downPaymentAmount).toFixed(2);
            contractJSON.contract.dateDownPayment = dayFormatted;

        } else if(num == 2 || num === 2) {

            console.log(amountMC);

            totalMonthlyCharges = parseFloat(amountMC);

            document.getElementById("summaryMC").innerText = parseFloat(totalMonthlyCharges).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

            let html = '';

            let sizeMP = Object.keys(contractJSON.contract.monthlyPayments).length;

            if(contractJSON.contract.monthlyPayments[0].amount == contractJSON.contract.monthlyPayments[sizeMP-1].amount){

                html += `
                    <p class="fw-light text-start">${sizeMP} of $ ${contractJSON.contract.monthlyPayments[0].amount}</p>
                `;

            } else if (contractJSON.contract.monthlyPayments[0].amount > contractJSON.contract.monthlyPayments[1].amount) {

                html += `
                    <p class="fw-light text-start">1 of $ ${contractJSON.contract.monthlyPayments[0].amount}</p>
                    <p class="fw-light text-start">${sizeMP-1} of $ ${contractJSON.contract.monthlyPayments[1].amount}</p>
                `;
            } else {

                html += `
                    <p class="fw-light text-start">${sizeMP-1} of $ ${contractJSON.contract.monthlyPayments[0].amount}</p>
                    <p class="fw-light text-start">1 of $ ${contractJSON.contract.monthlyPayments[sizeMP-1].amount}</p>
                `;
            }

            document.getElementById("summaryMCListOfCharges").innerHTML = html;

            document.getElementById("summaryMCTotalNumberOfCharges").innerText = sizeMP + " charges in total";

            document.getElementById("summaryMCStartDate").innerText = contractJSON.contract.monthlyPayments[0].date;
            document.getElementById("summaryMCEndDate").innerText = contractJSON.contract.monthlyPayments[sizeMP-1].date;

            document.getElementById("summaryMCAmount").innerText = parseFloat(totalMonthlyCharges).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

            contractJSON.contract.numberOfMonthlyPayments = parseInt(Object.keys(contractJSON.contract.monthlyPayments).length);
            contractJSON.contract.monthlyPaymentsTotalAmount = parseFloat(totalMonthlyCharges).toFixed(2);


        } else if(num == 3 || num === 3) {

            console.log(amountTC);

            totalContractAmount = parseFloat(amountTC);

            document.getElementById("summaryTotalContract").innerText = parseFloat(totalContractAmount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });
            console.log(downPaymentAmount);
            console.log(totalMonthlyCharges);
            document.getElementById("summaryDownPaymentAmount").innerText = parseFloat(downPaymentAmount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });
            document.getElementById("summaryMCAmount").innerText = parseFloat(totalMonthlyCharges).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });

            contractJSON.contract.contractTotalAmount = parseFloat(totalContractAmount).toFixed(2);
        }

    }
}

function objectDateToFormattedDate(dateInput){
    const month = (dateInput.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = dateInput.getDate().toString().padStart(2, '0');
    const year = dateInput.getFullYear();

    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
}

// Format the new date as mm/dd/yy
const formDP = document.getElementById('downPaymentForm');
formDP.addEventListener('submit', function (event) {
    if (!formDP.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault();

        adjustSummary(1);

    }
    formDP.classList.add('was-validated');
});


/**
 * Following function main goals consist of 3 things
 * - Create a list of values for payment plan: amount per month, payment date
 * - Make sure that only 1 date is assigned per month
 * - Keep values exact, not showing more than 2 decimals
 * By doing calculations the values are generated
 * Important inputs: amountMC, numberOfMC, totalMC
 * It is important to know that this escenarios are evaluated:
 * - when 1 input value is 0 (input could be any of the 3 of them so 3 if are created)
 * - when all inputs values are valid and different than 0 (if was created at the end for this escenario)
 */
const formMC = document.getElementById('monthlyChargesForm');
formMC.addEventListener('submit', function (event) {
    //$("#numberOfMC").addClass("is-valid");

    if (!formMC.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault();
        amountMonthlyCharges = document.getElementById("amountMC").value;
        numberOfMonthlyCharges = document.getElementById("numberOfMC").value;
        totalMonthlyCharges = document.getElementById("totalMC").value;
        let arrayCharges = [];
        let monthsArray = [];
        let html;
        let sizeMP = Object.keys(contractJSON.contract.monthlyPayments).length;

        if(sizeMP >= 1){
            contractJSON.contract.monthlyPayments.length = 0;
        }

        if(amountMonthlyCharges != 0 && totalMonthlyCharges != 0 && (numberOfMonthlyCharges != 0 || numberOfMonthlyCharges.length==0 || numberOfMonthlyCharges===null ||
            numberOfMonthlyCharges==="" || numberOfMonthlyCharges === 0 || numberOfMonthlyCharges == 0 || numberOfMonthlyCharges === 0.0 || numberOfMonthlyCharges == 0.0 || numberOfMonthlyCharges === 0.00 || numberOfMonthlyCharges == 0.00 )){
            if(parseFloat(amountMonthlyCharges) <= parseFloat(totalMonthlyCharges)) {
                let remainderNotFixed = 0;
                let exactAmountTotalNotFixed = 0;
                let exactNumberOfChargesNotFixed = 0;

                let remainder = 0;
                let exactAmountTotal = 0;
                let exactNumberOfCharges = 0;

                remainderNotFixed = totalMonthlyCharges % amountMonthlyCharges;
                exactAmountTotalNotFixed = totalMonthlyCharges - parseFloat(remainderNotFixed).toFixed(2);
                exactNumberOfChargesNotFixed = parseFloat(exactAmountTotalNotFixed).toFixed(2) / amountMonthlyCharges;

                remainder = parseFloat(remainderNotFixed).toFixed(2);
                exactAmountTotal = parseFloat(exactAmountTotalNotFixed).toFixed(2);
                exactNumberOfCharges = parseInt(exactNumberOfChargesNotFixed);

                console.log(remainder);
                console.log(parseFloat(amountMonthlyCharges).toFixed(2));
                console.log(remainder == parseFloat(amountMonthlyCharges).toFixed(2));
                console.log(parseFloat(amountMonthlyCharges)+parseFloat(remainder));

                if (remainder >= 50) {
                    if (remainder == parseFloat(amountMonthlyCharges).toFixed(2)) {

                        ++exactNumberOfCharges;

                        monthsArray = setDates(exactNumberOfCharges);

                        let sizeMArray = monthsArray.length;

                        for(let i = 1; i <= exactNumberOfCharges; i++){
                            arrayCharges.push(parseFloat(amountMonthlyCharges).toFixed(2));
                        }

                        html = `<tr>
                                    <th scope="row">${exactNumberOfCharges}</th>
                                    <td>from ${monthsArray[0]} to ${monthsArray[sizeMArray-1]}</td>
                                    <td>$ ${parseFloat(amountMonthlyCharges).toFixed(2)}</td>
                                </tr>`;

                        document.getElementById("numberOfMC").value = exactNumberOfCharges;

                    } else {

                        monthsArray = setDates(1+exactNumberOfCharges);

                        let sizeMArray = monthsArray.length;

                        for(let i = 1; i <= exactNumberOfCharges; i++){
                            arrayCharges.push(parseFloat(amountMonthlyCharges).toFixed(2));
                        }

                        arrayCharges.push(parseFloat(remainder).toFixed(2));

                        html = `<tr>
                                    <th scope="row">${exactNumberOfCharges}</th>
                                    <td>from ${monthsArray[0]} to ${monthsArray[sizeMArray-2]}</td>
                                    <td>$ ${parseFloat(amountMonthlyCharges).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>${monthsArray[sizeMArray-1]}</td>
                                    <td>$ ${remainder}</td>
                                </tr>`;

                        document.getElementById("numberOfMC").value = 1 + parseInt(exactNumberOfCharges);
                    }

                } else {

                    if(remainder == 0 || remainder === 0 || remainder == parseFloat(amountMonthlyCharges).toFixed(2)){

                        console.log(remainder);

                        monthsArray = setDates(exactNumberOfCharges);
                        let sizeMArray = monthsArray.length;

                        for(let i = 1; i <= exactNumberOfCharges; i++){
                            arrayCharges.push(parseFloat(amountMonthlyCharges).toFixed(2));
                        }

                        html = `<tr>
                                    <th scope="row">${exactNumberOfCharges}</th>
                                    <td>from ${monthsArray[0]} to ${monthsArray[sizeMArray-1]}</td>
                                    <td>$ ${parseFloat(amountMonthlyCharges).toFixed(2)}</td>
                                </tr>`;

                        document.getElementById("numberOfMC").value = exactNumberOfCharges;

                    } else {

                        console.log(remainder);

                        monthsArray = setDates(exactNumberOfCharges);

                        let sizeMArray = monthsArray.length;
                        if(sizeMArray == 1) {
                            arrayCharges.push((parseFloat(amountMonthlyCharges)+parseFloat(remainder)).toFixed(2));
                            console.log(arrayCharges);
                            html = `<tr>
                                        <th scope="row">1</th>
                                        <td>${monthsArray[0]}</td>
                                        <td>$ ${(parseFloat(amountMonthlyCharges)+parseFloat(remainder)).toFixed(2)}</td>
                                    </tr>`;
                        } else {
                            for(let i = 1; i <= exactNumberOfCharges; i++){
                                if(i == 1 || i === 1){
                                    arrayCharges.push((parseFloat(amountMonthlyCharges)+parseFloat(remainder)).toFixed(2));
                                } else {
                                    arrayCharges.push(parseFloat(amountMonthlyCharges).toFixed(2));
                                }
                            }
    
                            console.log(arrayCharges);
    
                            html = `<tr>
                                        <th scope="row">1</th>
                                        <td>${monthsArray[0]}</td>
                                        <td>$ ${(parseFloat(amountMonthlyCharges)+parseFloat(remainder)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">${exactNumberOfCharges-1}</th>
                                        <td>from ${monthsArray[1]} to ${monthsArray[sizeMArray-1]}</td>
                                        <td>$ ${parseFloat(amountMonthlyCharges).toFixed(2)}</td>
                                    </tr>`;
                        }
                        console.log(parseFloat(amountMonthlyCharges+remainder).toFixed(2));

                        

                        document.getElementById("numberOfMC").value = exactNumberOfCharges;
                    }
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Inconsistency found",
                    position: "center-start",
                    width: "25%",
                    timer: 10000,
                    html: `
                        Monthly Charge Amount <b>` + parseFloat(amountMonthlyCharges).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 }) + `</b>,
                        <b>CANNOT BE</b> higher than the Total Amount: <b>` + parseFloat(totalMonthlyCharges).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 }) + `</b>
                    `
                });
                return null;
            }
        } else if(amountMonthlyCharges != 0 && numberOfMonthlyCharges != 0 && (totalMonthlyCharges.length==0 || totalMonthlyCharges===null ||
                    totalMonthlyCharges==="" || totalMonthlyCharges === 0 || totalMonthlyCharges == 0 || totalMonthlyCharges === 0.0 || totalMonthlyCharges == 0.0 || totalMonthlyCharges === 0.00 || totalMonthlyCharges == 0.00 )) {

            let calculatedTotal = amountMonthlyCharges * numberOfMonthlyCharges;
            totalMonthlyCharges = calculatedTotal.toFixed(2);
            document.getElementById("totalMC").value = calculatedTotal.toFixed(2);

            monthsArray = setDates(numberOfMonthlyCharges);
            let sizeMArray = monthsArray.length;

            for(let i = 1; i <= numberOfMonthlyCharges; i++){
                arrayCharges.push(parseFloat(amountMonthlyCharges).toFixed(2));
            }

            html = `<tr>
                        <th scope="row">${numberOfMonthlyCharges}</th>
                        <td>from ${monthsArray[0]} to ${monthsArray[sizeMArray-1]}</td>
                        <td>$ ${parseFloat(amountMonthlyCharges).toFixed(2)}</td>
                    </tr>`;

        } else if (numberOfMonthlyCharges != 0 && totalMonthlyCharges != 0 && (amountMonthlyCharges.length==0 || amountMonthlyCharges===null ||
            amountMonthlyCharges==="" || amountMonthlyCharges === 0 || amountMonthlyCharges == 0 || amountMonthlyCharges === 0.0 || amountMonthlyCharges == 0.0 || amountMonthlyCharges === 0.00 || amountMonthlyCharges == 0.00 )) {

            let calculatedAmountMonthlyNotFixed = 0;
            let remainderNotFixed = 0;
            let exactAmountTotalNotFixed = 0;

            let calculatedAmountMonthly = 0;
            let remainder = 0;
            let exactAmountTotal = 0;
            let exactNumberOfCharges = 0;

            calculatedAmountMonthlyNotFixed = totalMonthlyCharges / numberOfMonthlyCharges;
            console.log(calculatedAmountMonthlyNotFixed);

            remainderNotFixed = totalMonthlyCharges % parseFloat(calculatedAmountMonthlyNotFixed).toFixed(2);
            console.log(remainderNotFixed);

            exactAmountTotalNotFixed = totalMonthlyCharges - parseFloat(remainderNotFixed).toFixed(2);
            console.log(exactAmountTotalNotFixed);

            exactNumberOfCharges = exactAmountTotalNotFixed / parseFloat(calculatedAmountMonthlyNotFixed).toFixed(2);
            exactNumberOfCharges = parseInt(exactNumberOfCharges.toFixed(0));
            console.log(exactNumberOfCharges);

            calculatedAmountMonthly = parseFloat(calculatedAmountMonthlyNotFixed.toFixed(2));
            console.log(calculatedAmountMonthly);

            remainder = parseFloat(remainderNotFixed).toFixed(2);
            console.log(remainder);

            exactAmountTotal = parseFloat(exactAmountTotalNotFixed).toFixed(2);
            console.log(exactAmountTotal);

            console.log(exactNumberOfCharges);

            document.getElementById("amountMC").value = calculatedAmountMonthly

            if (remainder >= 50) {
                if (remainder == parseFloat(amountMonthlyCharges).toFixed(2)) {

                    ++exactNumberOfCharges;

                    monthsArray = setDates(exactNumberOfCharges);

                    let sizeMArray = monthsArray.length;

                    for(let i = 1; i <= exactNumberOfCharges; i++){
                        arrayCharges.push(parseFloat(calculatedAmountMonthly).toFixed(2));
                    }

                    html = `<tr>
                                <th scope="row">${exactNumberOfCharges}</th>
                                <td>from ${monthsArray[0]} to ${monthsArray[sizeMArray-1]}</td>
                                <td>$ ${calculatedAmountMonthly}</td>
                            </tr>`;

                } else {

                    monthsArray = setDates(1 + exactNumberOfCharges);

                    let sizeMArray = monthsArray.length;

                    for(let i = 1; i <= exactNumberOfCharges; i++){
                        arrayCharges.push(parseFloat(calculatedAmountMonthly).toFixed(2));
                    }

                    arrayCharges.push(parseFloat(remainder).toFixed(2));

                    html = `<tr>
                                <th scope="row">${exactNumberOfCharges}</th>
                                <td>from ${monthsArray[0]} to ${monthsArray[sizeMArray-2]}</td>
                                <td>$ ${calculatedAmountMonthly}</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>${monthsArray[sizeMArray-1]}</td>
                                <td>$ ${remainder}</td>
                            </tr>`;
                }
            } else {

                if( remainder == 0 || remainder === 0 || remainder == calculatedAmountMonthly){

                    monthsArray = setDates(numberOfMonthlyCharges);
                    let sizeMArray = monthsArray.length;

                    for(let i = 1; i <= numberOfMonthlyCharges; i++){
                        arrayCharges.push(parseFloat(calculatedAmountMonthly).toFixed(2));
                    }

                    html = `<tr>
                                <th scope="row">${numberOfMonthlyCharges}</th>
                                <td>from ${monthsArray[0]} to ${monthsArray[sizeMArray-1]}</td>
                                <td>$ ${calculatedAmountMonthly}</td>
                            </tr>`;

                } else {

                    monthsArray = setDates(exactNumberOfCharges);

                    let sizeMArray = monthsArray.length;

                    for(let i = 1; i <= exactNumberOfCharges; i++){
                        if(i == 1){
                            arrayCharges.push((parseFloat(calculatedAmountMonthly) + parseFloat(remainder)).toFixed(2));
                        } else {
                            arrayCharges.push(parseFloat(calculatedAmountMonthly).toFixed(2));
                        }

                    }

                    html = `<tr>
                                <th scope="row">1</th>
                                <td>${monthsArray[0]}</td>
                                <td>$ ${parseFloat(calculatedAmountMonthly) + parseFloat(remainder)}</td>
                            </tr>
                            <tr>
                                <th scope="row">${exactNumberOfCharges - 1}</th>
                                <td>from ${monthsArray[1]} to ${monthsArray[sizeMArray-1]}</td>
                                <td>$ ${parseFloat(calculatedAmountMonthly).toFixed(2)}</td>
                            </tr>`;
                    }
            }

        } else {
            html = `<tr>
                        <th scope="row">0</th>
                        <td>00/00/0000</td>
                        <td>$ 00.00</td>
                    </tr>`;
        }

        console.log(monthsArray);
        console.log(arrayCharges);

        addMonthlyPaymentsToJSON(monthsArray, arrayCharges);

        document.getElementById("previewTable").innerHTML = html;

        adjustSummary(2);

    }
    formMC.classList.add('was-validated');
});


const formTC = document.getElementById('totalContractForm');
formTC.addEventListener('submit', function (event) {
    if (!formTC.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault();

        adjustSummary(3);
    }
    formTC.classList.add('was-validated');
});

/**
 * Creates an array of dates that is then used to store
 * the date information about the payment plan
 * @param {Number} numberOfMonthlyCharges , total months
 * @returns an array containing all the dates of a monthly charges plan
 */
function setDates(numberOfMonthlyCharges){
    let startDate = $( "#startDateMC" ).datepicker( "getDate" );
    console.log("start date: " + startDate.getMonth());
    let endDate = calculateDateEnd(numberOfMonthlyCharges, startDate);
    console.log(endDate);
    let endDateFormatted = objectDateToFormattedDate(endDate);
    console.log(endDateFormatted);
    $("#endDateMC").val(endDateFormatted);
    let monthsArray = [];
    monthsArray = getAllMonths(startDate, endDate);
    return monthsArray;
}

/**
 * Get all the months between a start date and an end date.
 * @param {Date} startDate - The start date (inclusive).
 * @param {Date} endDate - The end date (inclusive).
 * @returns {Array} - An array of formatted date strings representing each month.
 */
function getAllMonths(startDate, endDate){
    // check that dates are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert("Please enter valid dates (mm/dd/yy format).");
    } else {
        const outputElement = $("#output");
        outputElement.empty();

        let currentDate = new Date(startDate);
        const monthsArray = [];

        monthsArray.push(startDate.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }));

        console.log(currentDate);
        console.log(currentDate < endDate);

        while (currentDate < endDate) {
            //console.log(currentDate < endDate);
            //console.log(currentDate + "  " + endDate);
            const nextMonthDate = new Date(currentDate);
            // go 1 month further, store it variable nextMonthDate
            nextMonthDate.setMonth(currentDate.getMonth() + 1);

            // checks if the value of nextMonthDate is truly 1 month ahead
            // If the next month has a different number of days, set the day to the last day of the month
            // it could happen that we are in January 31 and by adding 1 month we get March 2 instead of February 28
            // is not incorrect but is not what we are looking for. So if this happens we use setDate(0) to set the Date to the last day of the previous month
            // egg. we have: march 2 || we need: february 28 || we do: march 2 => setDate(0) => february 28
            if (nextMonthDate.getDate() !== currentDate.getDate()) {
                nextMonthDate.setDate(0);
            }

            // new date variable so that we make sure that the nextMonthDate is truly the last day of the month
            let tempDate = new Date(nextMonthDate);

            // Assign the new variable a date value which is 1 month further
            tempDate.setMonth(nextMonthDate.getMonth() + 1);

            // we make sure that tempDate is truly one month further, if not, we use setDate(0)
            if(tempDate.getDate() !== nextMonthDate.getDate()){
                tempDate.setDate(0);
            }

            // now that we know that we are 1 month further, we use setDate(0) to get the last day of the month that nextMonthDate has
            tempDate.setDate(0);

            console.log("Temp Date: " + tempDate.getDate() + " || nextMonthDate: " + nextMonthDate.getDate());

            if(startDate.getDate() !== nextMonthDate.getDate()) {
                if(startDate.getDate() > tempDate.getDate()){
                    // evaluate if the date (day) of the first date is 30 or 31 to then assign the following months the last day they have
                    if(startDate.getDate() == 31){
                        // we check if nextMonthDate day is actually the last by checking that is the same as tempDate day, if not, we set the nextMonthDate day the day of tempDate
                        if(nextMonthDate.getDate() !== tempDate.getDate()){
                            nextMonthDate.setDate(tempDate.getDate());
                        }
                    } else if (startDate.getDate() == 30) {

                        // we check if nextMonthDate day is actually the last by checking that is the same as tempDate day, if not, we set the nextMonthDate day the day of tempDate
                        if(nextMonthDate.getDate() !== tempDate.getDate()){
                            if(tempDate.getDate() == 28 || tempDate.getDate() == 29){
                                nextMonthDate.setDate(tempDate.getDate());
                            } else if(tempDate.getDate() == 31) {
                                nextMonthDate.setDate(30);
                            } else if (tempDate.getDate() == 30) {
                                nextMonthDate.setDate(tempDate.getDate());
                            }
                        }
                    }
                } else {
                    nextMonthDate.setDate(startDate.getDate());
                }
            }

            // we format the date to mm/dd/yy
            const formattedDate = nextMonthDate.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric"
            });

            monthsArray.push(formattedDate);

            currentDate = new Date(nextMonthDate);
            //console.log(formattedDate + " currentDate " + currentDate);

            console.log("---------------------------------------------------------------");
        }
        console.log(monthsArray);

        return monthsArray;
    }
}

/**
 * Calculates the last payment date of a monthly charge plan
 * @param {Number} numberOfMonthlyCharges , number of months
 * @param {Date} dateInput , starting date. Value is obtained with .datepicker("getDate") method from jQuery UI date picker
 * @returns
 */
function calculateDateEnd(numberOfMonthlyCharges, dateInput){
    //let dayFormatted = objectDateToFormattedDate(dateInput);
    let numMonthsAhead = parseInt(numberOfMonthlyCharges);

    if (dateInput && !isNaN(numMonthsAhead)) {
        const originalDate = new Date(dateInput);
        const newDate = new Date(originalDate);
         // Calculate the target month
        const targetMonth = newDate.getMonth() + (numMonthsAhead - 1);
        newDate.setMonth(targetMonth);
        // Check if the day exceeds the last day of the target month
        if (newDate.getDate() !== originalDate.getDate()) {
            newDate.setDate(0); // Set the day to the last day of the previous month
        }
        return newDate;
    } else {
        alert("Please select a valid date and enter a valid number of months.");
    }
}

/**
 * Add all the payment information about monthly charges to contractJSON array
 * @param {Array} monthsArray - Array with dates that represents the payments date.
 * @param {Array} chargesArray - Array with doubles that represents the amount to be paid.
 * @returns {null}
 */
function addMonthlyPaymentsToJSON(monthsArray, chargesArray){

    for(let i = 0; i < monthsArray.length; ++i){

        contractJSON.contract.monthlyPayments.push(
            {
                'date': monthsArray[i],
                'amount': chargesArray[i]
            }
        );
    }
}

/*document.getElementById("addDownPayment").addEventListener("click", function(event) {
    event.preventDefault();

    downPaymentAmount = document.getElementById("amountDP").value;

    document.getElementById("summaryDownPayment").innerText = parseFloat(downPaymentAmount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });
    let dateInput = $( "#dateDP" ).datepicker( "getDate" );
    let dayFormatted = objectDateToFormattedDate(dateInput);
    document.getElementById("summaryDownPaymentDate").innerText = dayFormatted;
});*/

/*document.getElementById("addTotalContract").addEventListener("click", function(event) {
    event.preventDefault();

    totalContractAmount = document.getElementById("totalContractAmount").value;

    document.getElementById("summaryTotalContract").innerText = parseFloat(totalContractAmount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 });
});*/

/*document.getElementById("addMC").addEventListener("click", function(event) {
    event.preventDefault();
});*/

// Regex patterns for input validation
// validation for non empty values, money inputs and quantity

const nonEmptyPattern = /.+/; // Regular expression to check if the pattern is not empty

// Regular expression to match positive numbers with up to two decimal places
// - Prevents "0," "0.0," and "0.00" using negative lookahead.
// - Allows numbers from 1 to 999999 with up to two decimal places or "1000000" with an optional ".00" part as the maximum allowed input.
const moneyPattern = /^(?!0+(\.0{1,2})?$)(1000000(\.00?)?|\d{1,6}(\.\d{1,2})?)$/;

// Regular expression to match positive numbers with up to two decimal places
// - Allows "0" and Prevents "0.0," and "0.00".
// - Also allows numbers from 1 to 999999 with up to two decimal places or "1000000" with an optional ".00" part as the maximum allowed input.
const moneyPatternWithZ = /^(?!0{2,}(\.0{1,2})?$)(1000000(\.00?)?|\d{1,6}(\.\d{1,2})?|0(\.\d{1,2})?|0)$/;

const quantityNot0Pattern = /^([1-9]\d{0,2}|1000)$/; // Regular expression to match positive integers up to 1000

const quantityWith0Pattern = /^(0|([1-9]\d{0,2})|1000)$/; // Regular expression to match 0 and positive integers up to 1000

/**
 * Method to abstract the validation of inputs
 * takes the unique names of:
 * @param {String} idInput , input to be validate
 * @param {String} idInvalidFeedback , id of html element to show input feedback
 * @param {String} pattern , the pattern to match value input against
 * @param {String} message , message to show when value is invalid
 */
function validateInput(idInput, idInvalidFeedback, pattern, message) {
    let inputText = document.getElementById(idInput);
    let invalidFeedback = document.getElementById(idInvalidFeedback);
    let isValid;

    if(pattern == 'money' || pattern === 'money'){

        isValid = moneyPattern.test(inputText.value);

    } else if(pattern == 'moneywithz' || pattern === 'moneywithz'){

        isValid = moneyPatternWithZ.test(inputText.value);

    } else if(pattern == 'quantity' || pattern === 'quantity'){

        isValid = quantityNot0Pattern.test(inputText.value);

    } else if(pattern == 'quantitywithz' || pattern === 'quantitywithz'){

        isValid = quantityWith0Pattern.test(inputText.value);

    } else {

        isValid = nonEmptyPattern.test(inputText.value);

    }

    inputText.setCustomValidity(isValid ? '' : message);
    invalidFeedback.style.display = isValid ? 'none' : 'block';
    if(isValid){
        $("#" + idInput).removeClass("is-invalid")
        $("#" + idInput).addClass("is-valid")
    } else {
        $("#" + idInput).removeClass("is-valid")
        $("#" + idInput).addClass("is-invalid");
    }
}

// Validation for inputs with events input and blur
// once event is triggered, event validateInput() is called

// validation for input amountDP
document.getElementById('amountDP').addEventListener('input', function () {
    validateInput("amountDP", "amountDPValidation", "money", "Please enter a valid amount");
});
document.getElementById('amountDP').addEventListener('blur', function () {
    validateInput("amountDP", "amountDPValidation", "money", "Please enter a valid amount");
});

// validation for input amountMC
document.getElementById('amountMC').addEventListener('input', function () {
    validateInput("amountMC", "amountMCValidation", "moneywithz", "Please enter a valid amount");
});
document.getElementById('amountMC').addEventListener('blur', function () {
    validateInput("amountMC", "amountMCValidation", "moneywithz", "Please enter a valid amount");
});

// validation for input numberOfMC
document.getElementById('numberOfMC').addEventListener('input', function () {
    validateInput("numberOfMC", "numberOfMCValidation", "quantitywithz", "Please enter a valid number");
});
document.getElementById('numberOfMC').addEventListener('blur', function () {
    validateInput("numberOfMC", "numberOfMCValidation", "quantitywithz", "Please enter a valid number");
});

// validation for input totalMC
document.getElementById('totalMC').addEventListener('input', function () {
    validateInput("totalMC", "totalMCValidation", "moneywithz", "Please enter a valid amount");
});
document.getElementById('totalMC').addEventListener('blur', function () {
    validateInput("totalMC", "totalMCValidation", "moneywithz", "Please enter a valid amount");
});

// validation for input totalContractAmount
document.getElementById('totalContractAmount').addEventListener('input', function () {
    validateInput("totalContractAmount", "totalContractAmountValidation", "money", "Please enter a valid amount");
});
document.getElementById('totalContractAmount').addEventListener('blur', function () {
    validateInput("totalContractAmount", "totalContractAmountValidation", "money", "Please enter a valid amount");
});

function calculateTotal(){


    /*if(downPaymentAmount.length==0 || downPaymentAmount===null || downPaymentAmount==="" || downPaymentAmount === 0 || downPaymentAmount == 0){

    } else if(totalMonthlyCharges.length==0 || totalMonthlyCharges===null || totalMonthlyCharges==="" || totalMonthlyCharges === 0 || totalMonthlyCharges == 0){

    } else if(totalContractAmount.length==0 || totalContractAmount===null || totalContractAmount==="" || totalContractAmount === 0 || totalContractAmount == 0) {

    }*/
}

/**
 * Array that holds the services name and their id
 */
let servicesArray = [
    [1, "AOS Asylum"],
    [37, "AOS 245i"],
    [38, "AOS 730"],
    [2, "AOS Petition"],
    [3, "AOS I-929"],
    [4, "AOS SIJS"],
    [5, "AOS U-visa"],
    [6, "AOS T-Visa"],
    [7, "AOS VAWA"],
    [8, "Asylum"],
    [9, "Research"],
    [10, "B-CERT (I-918 B)"],
    [13, "DACA"],
    [16, "Deportation Defense"],
    [39, "Cancelation of Removal"],
    [17, "Employment Authorization"],
    [18, "N-400 (Naturalization)"],
    [19, "NVC"],
    [20, "I-90 Application to Replace Permanent Resident Card (Green Card)"],
    [21, "I-130 (Petition)"],
    [22, "I-131 (Advanced Parole)"],
    [23, "I-134 (Declaration of Financial Support)"],
    [24, "I-539 | Application to Extend/Change Nonimmigrant Status"],
    [25, "I-601A and I-601"],
    [26, "I-730 | Refugee/Asylee Relative Petition"],
    [27, "Permanent Residency (Green Card) Related"],
    [28, "Premium Processing and Fee Related Forms"],
    [29, "Representation"],
    [40, "Requests"],
    [31, "SIJS"],
    [32, "TPS"],
    [33, "T-Visa"],
    [34, "U-Visa"],
    [35, "VAWA"],
    [41, "Appeals"],
    [42, "I-129 and I-129F"],
    [43, "Motion to reopen / Close"],
    [36, "Other Forms"]
];

/**
 * Array containing the Services and Applications
 * Even positions (0, 2, 4, 6, ...) are Services Name
 * Odd positions (1, 3, 5, 7, ...) are the Applications of the Service that is in the n-1 position
 * Example:
 * AOS Asylum position is 0, so the applications of AOS Asylum are in the position 1
 */
let applicationsArray = [
    ["AOS Asylum"],
    [
        ["4", "I-485 | Application to Register Permanent Residence or Adjust Status", "I-485"],
        ["108", "I-765 (A-5) | (Asylee) Application for Employment Authorization", "I-765 (A-5)"],
        ["46", "I-693 | Report of Immigration Medical Examination and Vaccination Record", "I-693"]
    ],

    ["AOS 245i"],
    [
        ["4", "I-485 | Application to Register Permanent Residence or Adjust Status", "I-485"],
        ["38", "I-485A | Supplement A to Form I-485, Adjustment of Status Under Section 245(i)", "I-485"],
        ["109", "I-765 (C-09) | (Pending adjustment of status under Section 245 of the Act) Application for Employment Authorization", "I-765 (C-09)"],
        ["70", "I-864 | Affidavit of Support Under Section 213A of the INA", "I-864"],
        ["106", "I-864A | Contract Between Sponsor and Household Member", "I-864A"],
        ["1", "I-130 | Petition for Alien Relative", "I-130"],
        ["46", "I-693 | Report of Immigration Medical Examination and Vaccination Record", "I-693"]
    ],

    ["AOS 730"],
    [
        ["4", "I-485 | Application to Register Permanent Residence or Adjust Status", "I-485"],
        ["109", "I-765 (C-09) | (Pending adjustment of status under Section 245 of the Act) Application for Employment Authorization", "I-765 (C-09)"],
        ["46", "I-693 | Report of Immigration Medical Examination and Vaccination Record", "I-693"]
    ],

    ["AOS Petition"],
    [
        ["4", "I-485 | Application to Register Permanent Residence or Adjust Status", "I-485"],
        ["1", "I-130 | Petition for Alien Relative", "I-130"],
        ["107", "I-130A | Supplemental Information for Spouse Beneficiary", "I-130A"],
        ["70", "I-864 | Affidavit of Support Under Section 213A of the INA", "I-864"],
        ["109", "I-765 (C-09) | (Pending adjustment of status under Section 245 of the Act) Application for Employment Authorization", "I-765 (C-09)"],
        ["46", "I-693 | Report of Immigration Medical Examination and Vaccination Record", "I-693"]
    ],

    ["AOS I-929"],
    [
        ["4", "I-485 | Application to Register Permanent Residence or Adjust Status", "I-485"],
        ["109", "I-765 (C-09) | (Pending adjustment of status under Section 245 of the Act) Application for Employment Authorization", "I-765 (C-09)"],
        ["46", "I-693 | Report of Immigration Medical Examination and Vaccination Record", "I-693"]
    ],

    ["AOS SIJS"],
    [
        ["4", "I-485 | Application to Register Permanent Residence or Adjust Status", "I-485"],
        ["129", "Guardanship", "Guardanship"],
        ["109", "I-765 (C-09) | (Pending adjustment of status under Section 245 of the Act) Application for Employment Authorization", "I-765 (C-09)"],
        ["46", "I-693 | Report of Immigration Medical Examination and Vaccination Record", "I-693"]
    ],

    ["AOS U-visa"],
    [
        ["4", "I-485 | Application to Register Permanent Residence or Adjust Status", "I-485"],
        ["109", "I-765 (C-09) | (Pending adjustment of status under Section 245 of the Act) Application for Employment Authorization", "I-765 (C-09)"],
        ["114", "I-918B (Supplement B) | U Nonimmigrant Status Certification", "I-918B"],
        ["46", "I-693 | Report of Immigration Medical Examination and Vaccination Record", "I-693"]
    ],

    ["AOS T-Visa"],
    [
        ["4", "I-485 | Application to Register Permanent Residence or Adjust Status", "I-485"],
        ["116", "I-914B (Supplement B) | (Delaration of Law Enforcement Officer for Victim of Trafficking in Persons) Application for T Nonimmigrant Status", "I-914B (Supplement B)"],
        ["109", "I-765 (C-09) | (Pending adjustment of status under Section 245 of the Act) Application for Employment Authorization", "I-765 (C-09)"],
        ["46", "I-693 | Report of Immigration Medical Examination and Vaccination Record", "I-693"]
    ],

    ["AOS VAWA"],
    [
        ["4", "I-485 | Application to Register Permanent Residence or Adjust Status", "I-485"],
        ["46", "I-693 | Report of Immigration Medical Examination and Vaccination Record", "I-693"],
        ["109", "I-765 (C-09) | (Pending adjustment of status under Section 245 of the Act) Application for Employment Authorization", "I-765 (C-09)"],
    ],

    ["Asylum"],
    [
        ["134", "Defensive Asylum", "Defensive Asylum"],
        ["135", "Affirmative Asylum", "Affirmative Asylum"],
        ["8", "I-589 | Application for Asylum and for Withholding of Removal", "I-589"],
        ["119", "I-589 (Under CAT) | Convention Against Torture", "I-589 (Under CAT)"],
        ["143", "I-765 (C-08) | Application for Employment Authorization", "I-765 (C-08)"]
    ],

    ["Research"],
    [
        ["130", "FOIA-USCIS | FOIA petition before USCIS for client (Only if necessary).", "FOIA-USCIS"],
        ["131", "FOIA-CBP | FOIA petition before CBP for client (Only if necessary).", "FOIA-CBP"],
        ["132", "FOIA-OBIM | FOIA petition before OBIM for client (Only if necessary).", "FOIA-OBIM"],
        ["133", "FBI | Request for Criminal Records with the FBI for client (Only if necessary).", "FBI"],
        ["144", "FOIA-DOJ | FOIA petition before DOJ for client (Only if necessary).", "FOIA-DOJ"],
        ["145", "FOIA-DOS | FOIA petition before DOS for client (Only if necessary).", "FOIA-DOS"],
        ["146", "FBI | FBI Request (Only if necessary).", "FBI Request"]
    ],

    ["B-CERT (I-918 B)"],
    [
        ["114", "I-918B (Supplement B) | U Nonimmigrant Status Certification", "I-918B"]
    ],

    ["DACA"],
    [
        ["49", "I-821D | Consideration of Deferred Action for Childhood Arrivals", "I-821D"],
        ["147", "I-765 (C-33) | Consideration of Deferred Action for Childhood Arrivals", "I-765 (C-33)"]
    ],

    ["Deportation Defense"],
    [
        ["8", "I-589 | Application for Asylum and for Withholding of Removal", "I-589"],
        ["119", "I-589 (Under CAT) | Convention Against Torture", "I-589 (Under CAT)"],
        ["15", "I-881 | Application for Suspension of Deportation or Special Rule Cancellation of Removal", "I-881"]
    ],

    ["Cancelation of Removal"],
    [
        ["138", "EOIR-42A | Application for Cancellation of Removal for Certain Permanent Residents", "EOIR-42A"],
        ["139", "EOIR-42B | Application for Cancellation of Removal and Adjustment of Status for Certain Nonpermanent Residents", "EOIR-42B"]
    ],

    ["Employment Authorization"],
    [
        ["67", "I-765 | Application for Employment Authorization", "I-765"],
        ["120", "I-765 Worksheet | I-765 under (c)(14), Deferred Action, or (c)(33), Consideration of Deferred Action for Childhood Arrivals, categories", "I-765 Worksheet"],
        ["108", "I-765 (A-5) | (Asylee) Application for Employment Authorization", "I-765 (A-5)"],
        ["109", "I-765 (C-09) | (Pending adjustment of status under Section 245 of the Act) Application for Employment Authorization", "I-765 (C-09)"],
        ["121", "I-765 (C-14) | Deferred Action", "I-765 (C-14)"],
        ["122", "I-765 TPS (C-19) | Temporary Protected Status EAD", "I-765 TPS (C-19)"],
        ["123", "I-765 TPS (A-12) | Temporary Protected Status EAD", "I-765 TPS (A-12)"],
        ["124", "I-765 (C-20) | Applicant for Legalization Pursuant to INA Section 210", "I-765 (C-20)"],
        ["125", "I-765 (A-14) | LIFE Family Unity", "I-765 (A-14)"],
        ["126", "I-765 (A-19) | Victim of Qualifying Criminal Activity (U-1 Nonimmigrant)", "I-765 (A-19)"],
        ["127", "I-765 (A-20) | U-2, U-3, U-4, or U-5", "I-765 (A-20)"]
    ],

    ["N-400 (Naturalization)"],
    [
        ["19", "N-400 | Application for Naturalization", "N-400"],
        ["74", "N-648 | Medical Certification for Disability Exceptions", "N-648"],
        ["21", "N-600 | Application for Certificate of Citizenship", "N-600"]
    ],

    ["NVC"],
    [
        ["110", "Representation for processing before the National Visa Center (NVC)", "Representation for processing before the National Visa Center (NVC)"],
        ["140", "DS-260 | Application for Immigrant Visa and Alien Registration", "DS-260"],
        ["141", "DS-160 | Electronic Nonimmigrant Visa Application", "DS-160"],
        ["142", "DS-11 | DS-11 | Application for a U.S. Passport", "DS-11"],
        ["70", "I-864 | Affidavit of Support Under Section 213A of the INA", "I-864"]
    ],

    ["I-90 Application to Replace Permanent Resident Card (Green Card)"],
    [
        ["76", "I-90 | Application to Replace Permanent Resident Card (Green Card)", "I-90"]
    ],

    ["I-130 (Petition)"],
    [
        ["1", "I-130 | Petition for Alien Relative"],
        ["70", "I-864 | Affidavit of Support Under Section 213A of the INA", "I-864"]
    ],

    ["I-131 (Advanced Parole)"],
    [
        ["93", "I-131 | Application for Travel Document", "I-131"],
        ["78", "I-131A | Application for Travel Document (Carrier Documentation)", "I-131A"]
    ],

    ["I-134 (Declaration of Financial Support)"],
    [
        ["60", "I-134 | Declaration of Financial Support", "I-134"],
        ["61", "I-134A | Online Request to be a Supporter and Declaration of Financial Support", "I-134A"]
    ],

    ["I-539 | Application to Extend/Change Nonimmigrant Status"],
    [
        ["40", "I-539 | Application to Extend/Change Nonimmigrant Status", "I-539"]
    ],

    ["I-601A and I-601"],
    [
        ["42", "I-601A | Application for Provisional Unlawful Presence Waiver", "I-601A"],
        ["9", "I-601 | Application for Waiver of Grounds of Inadmissibility", "I-601"]
    ],

    ["I-730 | Refugee/Asylee Relative Petition"],
    [
        ["47", "I-730 | Refugee/Asylee Relative Petition", "I-730"]
    ],

    ["Permanent Residency (Green Card) Related"],
    [
        ["4", "I-485 | Application to Register Permanent Residence or Adjust Status", "I-485"],
        ["11", "I-698 | Application to Adjust Status from Temporary to Permanent Resident", "I-698"],
        ["48", "I-751 | Petition to Remove Conditions on Residence", "I-751"]
    ],

    ["Premium Processing and Fee Related Forms"],
    [
        ["82", "I-912 | Request for Fee Waiver", "I-912"]
    ],

    ["Representation"],
    [
        ["24", "G-28 | Notice of Entry of Appearance as Attorney or Accredited Representative", "G-28"],
        ["148", "E-28 | Notice of Entry of Appearance as Attorney or Representative Before the Immigration Court", "E-28"],
        ["110", "Representation for processing before the National Visa Center (NVC)", "Representation for processing before the National Visa Center (NVC)"],
        ["112", "Representacion and processing in favour of (client) before the National Visa Center (NVC)", "Representacion and processing in favour of (client) before the National Visa Center (NVC)"],
        ["136", "Legal Representation for the following charges:", "Legal Representation for the following charges:"],
        ["84", "G-28I | Notice of Entry of Appearance as Attorney in Matters Outside the Geographical Confines of the United States", "G-28I"]
    ],

    ["Requests"],
    [
        ["14", "I-824 | Application for Action on an Approved Application or Petition", "I-824"]
    ],

    ["SIJS"],
    [
        ["129", "Guardanship", "Guardanship"],
        ["35", "I-360 | Petition for Amerasian, Widow(er), or Special Immigrant", "I-360"]
    ],

    ["TPS"],
    [
        ["13", "I-821 | Application for Temporary Protected Status", "I-821"],
        ["49", "I-821D | Consideration of Deferred Action for Childhood Arrivals", "I-821D"],
        ["123", "I-765 TPS (A-12) | Temporary Protected Status EAD", "I-765 TPS (A-12)"]
    ],

    ["T-Visa"],
    [
        ["16", "I-914 | Application for T Nonimmigrant Status", "I-914"],
        ["115", "I-914A (Supplement A) | (Application for Family Member of T-1 Recipient) Application for T Nonimmigrant Status", "I-914A (Supplement A)"],
        ["116", "I-914B (Supplement B) | (Delaration of Law Enforcement Officer for Victim of Trafficking in Persons) Application for T Nonimmigrant Status", "I-914B (Supplement B)"],
        ["2", "I-192 | Application for Advance Permission to Enter as a Nonimmigrant", "I-192"],
        ["149", "I-765 (A-16) | T-1 nonimmigrant", "I-765 (A-16)"],
        ["150", "I-765 (C-25) | T-2, T-3, T-4, T-5, or T-6 nonimmigrant", "I-765 (C-25)"]
    ],

    ["U-Visa"],
    [
        ["17", "I-918 | Petition for U Nonimmigrant Status", "I-918"],
        ["113", "I-918A (Supplement A) | Petition for Qualifying Family Member of U-1 Recipient", "I-918A"],
        ["114", "I-918B (Supplement B) | U Nonimmigrant Status Certification", "I-918B"],
        ["2", "I-192 | Application for Advance Permission to Enter as a Nonimmigrant", "I-192"],
        ["121", "I-765 (C-14) | Deferred Action", "I-765 (C-14)"],
        ["127", "I-765 (A-20) | U-2, U-3, U-4, or U-5", "I-765 (A-20)"]
    ],

    ["VAWA"],
    [
        ["35", "I-360 | Petition for Amerasian, Widow(er), or Special Immigrant", "I-360"]
    ],

    ["Appeals"],
    [
        ["151", "BIA", "BIA"],
        ["152", "9th circuit", "9th circuit"],
        ["62", "I-290B | Notice of Appeal or Motion", "I-290B"]
    ],

    ["I-129 and I-129F"],
    [
        ["29", "I-129 | Petition for a Nonimmigrant Worker", "I-129"],
        ["30", "I-129F | Petition for Alien Fiancé(e)", "I-129F"]
    ],

    ["Motion to reopen / Close"],
    [
        ["154", "Motion to reopen", "Motion to reopen"],
        ["153", "Motion to Close", "Motion to Close"]
    ],

    ["Other Forms"],
    [
        ["86", "G-1566 | Request for Certificate of Non-Existence", "G-1566"],
        ["100", "AR-11 | Alien’s Change of Address Card", "AR-11"],
        ["103", "I-865 | Sponsor´s Notice of Change of Address", "I-865"],
        ["51", "I-864W | Request for Exemption for Intending Immigrant´s Affidavit of Support", "I-864W"],
        ["71", "I-864EZ | Affidavit of Support Under Section 213A of the Act", "I-864EZ"],
        ["81", "I-864P | 2023 HHS Poverty Guidelines for Affidavit of Support", "I-864P"],
        ["106", "I-864A | Contract Between Sponsor and Household Member", "I-864A"],
        ["58", "G-845 | Verification Request", "G-845"],
        ["25", "G-845 Supplement | Document Verification Request Supplement", "G-845 S"],
        ["80", "I-829 | Petition by Investor to Remove Conditions on Permanent Resident Status", "I-829"],
        ["83", "I-912P Supplement | 2023 HHS Poverty Guidelines for Fee Waiver Request", "I-912P S"],
        ["29", "I-129 | Petition for a Nonimmigrant Worker", "I-129"]
    ]
];

function getApplicationsArray(name){
    for (let i = 0; i < applicationsArray.length; i += 2) {
        const groupName = applicationsArray[i][0]; // Get the group name
        if (groupName === name) {
            return applicationsArray[i + 1];
        }
    }
    return null;
}

/**
 * creates the view elements for the applications list after a service is selected
 * filter application from predefined list by serviceId
 * applications are checkboxes in the view, if a checkbox is true then is added to the json
 * @param {*} name , name of the service: u-visa, AOS Petition, etc
 * @param {*} numContact , contact view id to handle dom, html, etc
 * @param {*} numService , serviceId that contains all the applications
 * @returns
 */
function addApplicationsToView(name, numContact, numService){
    // call method to get applications array and assign it to variable
    let applicationsFound = getApplicationsArray(name);
    // check if there was an array for the name of the service
    if(applicationsFound) {
        for (let i = 0; i < applicationsFound.length; i++){
            let index = contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == numContact)].services[numService].applications.findIndex(function (applications){
                return applications.applicationName === applicationsFound[i][1];
            });
            let html;
            if (index >= 0) {
                html = `<li class="list-group-item">
                            <div class="row">
                                <div class="col-sm-10">
                                    <label class="form-check-label stretched-link" data-custom-short-name="${applicationsFound[i][2]}" for="CB${applicationsFound[i][0]}Beneficiary${numContact}Service${numService}">${applicationsFound[i][1]}</label>
                                </div>
                                <div class="col-sm-2 text-end">
                                    <input class="form-check-input me-1" name="checkboxGroup${numContact}" type="checkbox" value="" id="CB${applicationsFound[i][0]}Beneficiary${numContact}Service${numService}" checked>
                                </div>
                            </div>
                        </li>`;
            } else {
                html = `<li class="list-group-item">
                            <div class="row">
                                <div class="col-sm-10">
                                    <label class="form-check-label stretched-link" data-custom-short-name="${applicationsFound[i][2]}" for="CB${applicationsFound[i][0]}Beneficiary${numContact}Service${numService}">${applicationsFound[i][1]}</label>
                                </div>
                                <div class="col-sm-2 text-end">
                                    <input class="form-check-input me-1" name="checkboxGroup${numContact}" type="checkbox" value="" id="CB${applicationsFound[i][0]}Beneficiary${numContact}Service${numService}">
                                </div>
                            </div>
                        </li>`;
            }
            if (i === 0) {
                document.getElementById("Contact" + numContact + "ApplicationsContainer").innerHTML = html;
            } else {
                document.getElementById("Contact" + numContact + "ApplicationsContainer").insertAdjacentHTML("beforeend", html);
            }
        }
    } else {
        console.log("Group not found");
    }
    return null;
}

function addApplications(num){
    // get all elements of the applications container
    // loop through them and save (to array variable) all that have checked argument in html tag
    // check which are already in the json, check if those are in the elements from first array, if not, delete from json
    // and add elements from first array that are not already in json
}

// To Fill Searchable Dropdown With an Array
function fillSelectFSByTagsArrayLocal(array, select, selected) {
    let content = document.createElement("option");
    if (array) {
        for (let i = 0; i < 300; i++) {
            let last = Array.from(document.getElementById(select).querySelectorAll("option")).slice(-1)[0];
            if (last == undefined)
                break;
            Array.from(document.getElementById(select).querySelectorAll("option")).slice(-1)[0].remove();
        }
        if (!selected) {
            content.text = 'Select a Service';
            content.value = 0;
            content.disabled = true;
            content.selected = true;
            document.getElementById(select).add(content);
            document.getElementById(select).fstdropdown.rebind();
        }
        for (let i = 0; i < array.length; i++) {
            let data = document.createElement("option");
            array[i];
            text = array[i][1];
            value = array[i][0];
            if (value != selected) {
                data.text = text;
                data.value = value;
                document.querySelector("#" + select).fstdropdown.setValue(selected);
                data.selected = true;
            } else {
                data.text = text;
                data.value = value;
                document.querySelector("#" + select).fstdropdown.setValue(selected);
                data.selected = true;
            }
            document.getElementById(select).add(data);
            document.getElementById(select).fstdropdown.rebind();
        }
    } else {
        for (let i = 0; i < 300; i++) {
            let last = Array.from(document.getElementById(select).querySelectorAll("option")).slice(-1)[0];
            if (last == undefined)
                break;
            Array.from(document.getElementById(select).querySelectorAll("option")).slice(-1)[0].remove();
        }
        content.text = 'No available options';
        content.value = 0;
        content.selected = true;
        document.getElementById(select).add(content);
        document.getElementById(select).fstdropdown.rebind();
    }
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
//function that checks if certain element(str) exist in an array(arr)

let maxContacts = 2;
let numOfContacts = 1;

var contractJSON;
/**
 * Starts the array
 */
function loadContract(){
    // make main contact in contract the same as the contact for the matter
    // load all values if update
    if(typeof contractArray === 'undefined' || typeof contractArray == 'undefined') {
        if(unexpected) {
            shouldShowConfirmation = false;
            sweetAlert(2, 'An unexpected issue happened, please contact an administrator', base_url);
        } else {
            contractJSON =
            {
                "contract":{
                    'matterId':matter_id,
                    'signDate': "",
                    'contractTotalAmount': "",
                    'downPaymentAmount': "",
                    'dateDownPayment': "",
                    'numberOfMonthlyPayments': "",
                    'monthlyPaymentsTotalAmount': "",
                    'monthlyPayments': [],
                    'contacts': []
                }
            };
        }
    } else {
        if(Array.isArray(contractArray) && contractArray.length > 0) {
            var contractData = contractArray[0];
            contractJSON =
            {
                "contract":{
                    'matterId': contractData.idMatter,
                    'signDate': contractData.signDate,
                    'contractTotalAmount': contractData.totalContract,
                    'downPaymentAmount': "",
                    'dateDownPayment': "",
                    'numberOfMonthlyPayments': "",
                    'monthlyPaymentsTotalAmount': "",
                    'monthlyPayments': [],
                    'contacts': []
                }
            };

            //let inputDate;
            
            contractData.listPaymentPlan[0].forEach(itemPaymentPlan => {
                // Split the input string based on the '-' separator
                const parts = itemPaymentPlan.date.split('-');

                // Rearrange the parts to the desired format
                const outputDateString = `${parts[1]}/${parts[2]}/${parts[0]}`;
                if (itemPaymentPlan.type == 1) {
                    contractJSON.contract.monthlyPayments.push(
                        {
                            'date': outputDateString,
                            'amount': parseFloat(itemPaymentPlan.amount).toFixed(2)
                        }
                    );
                } else if (itemPaymentPlan.type == 2) {
                    contractJSON.contract.downPaymentAmount = parseFloat(itemPaymentPlan.amount).toFixed(2);
                    contractJSON.contract.dateDownPayment = outputDateString
                }
            });

            let sizeMP = Object.keys(contractJSON.contract.monthlyPayments).length;
            contractJSON.contract.numberOfMonthlyPayments = sizeMP;

            contractJSON.contract.monthlyPaymentsTotalAmount = parseFloat(contractJSON.contract.contractTotalAmount) - parseFloat(contractJSON.contract.downPaymentAmount);

            downPaymentAmount = parseFloat(contractJSON.contract.dateDownPayment);
            downPaymentDate = contractJSON.contract.dateDownPayment;
            totalMonthlyCharges = parseFloat(contractJSON.contract.monthlyPaymentsTotalAmount);
            numberOfMonthlyCharges = sizeMP;
            totalContractAmount = parseFloat(contractData.totalContract);

            if(contractJSON.contract.monthlyPayments[0].amount == contractJSON.contract.monthlyPayments[sizeMP-1].amount){
                amountMonthlyCharges = contractJSON.contract.monthlyPayments[0].amount;
            } else if (contractJSON.contract.monthlyPayments[0].amount > contractJSON.contract.monthlyPayments[1].amount) {
                amountMonthlyCharges = contractJSON.contract.monthlyPayments[1].amount;
            } else {
                amountMonthlyCharges = contractJSON.contract.monthlyPayments[0].amount;
            }
            
            $( "#dateDP" ).datepicker("setDate", contractJSON.contract.dateDownPayment);
            document.getElementById('amountDP').value= contractJSON.contract.downPaymentAmount;
            adjustSummary(1);

            document.getElementById('amountMC').value= amountMonthlyCharges;
            document.getElementById('numberOfMC').value= numberOfMonthlyCharges;
            $( "#startDateMC" ).datepicker("setDate", contractJSON.contract.monthlyPayments[0].date);
            $( "#endDateMC" ).val(contractJSON.contract.monthlyPayments[sizeMP-1].date);
            document.getElementById('totalMC').value= totalMonthlyCharges;
            adjustSummary(2);
            // Programmatically trigger a click event in JavaScript with the ID and jQuery
            $('#expandTablePreview').trigger('click');
            $('#expandTablePreview').trigger('click');

            // Get the select element
            const contactSelect = document.getElementById('ContactSelect');
            contractData.listRoles[0].forEach((itemContact, index) => {
                let indexSelect;
                // Loop through options to find the index by value
                for (let i = 1; i < contactSelect.options.length; i++) {
                    if (contactSelect.options[i].value === itemContact.contact || contactSelect.options[i].value == itemContact.contact) {
                        indexSelect = i; // Return the index and exit the loop
                        break;
                    }
                }
                if(typeof indexSelect == 'undefined') {
                    // Cancel the confirmation
                    shouldShowConfirmation = false;
                    if (matter_id == undefined || matter_id == null || Object.keys(matter_id).length === 0 || matter_id === '' || !matter_id) {
                        sweetAlert(2, 'There was an issue adding a contact, please contact an administrator', base_url);
                      } else {
                        //sweetAlert(2, 'There was an issue adding a contact, please contact an administrator', base_url + "matters/" + matter_id + "/main_view");
                        sweetAlert(2, 'There was an issue adding a contact, please contact an administrator', base_url);
                      }
                    return;
                } else {
                    // Set the selectedIndex to the one found before
                    contactSelect.selectedIndex = indexSelect;
                    addContact(itemContact.role);
                    const selectService = document.getElementById('ContactServicesSelect'+index);
                    contractData.listApplications[0].forEach((itemApplication, index2) => {
                        let indexSelect2;
                        if(itemApplication.contact == itemContact.contact || itemApplication.contact === itemContact.contact) {
                            if(contractJSON.contract.contacts[index].services.some(el => el.serviceId == itemApplication.service)){
                            } else {
                                // Loop through options to find the index by value
                                for (let i = 1; i < selectService.options.length; i++) {
                                    if (selectService.options[i].value === itemApplication.service || selectService.options[i].value == itemApplication.service) {
                                        indexSelect2 = i; // Return the index and exit the loop
                                        break;
                                    }
                                }
                                selectService.selectedIndex = indexSelect2;
                                addService(index);
                            }
                            let serviceValues = servicesArray.find(innerArray => innerArray[0] == itemApplication.service);
                            if(typeof serviceValues == 'undefined'){
                                // Cancel the confirmation
                                shouldShowConfirmation = false;
                                sweetAlert(2, 'There was an issue with your request, please contact an administrator', base_url + "matters/" + matter_id + "/main_view");
                                return;
                            } else {
                                let applicationsFound = getApplicationsArray(serviceValues[1]);
                                applicationsFound.forEach(applications => {
                                    if(applications[0] == itemApplication.application){
                                        //console.log(contractJSON.contract.contacts[index].services.findIndex(item => item.serviceId == selectService.value));
                                        let posistionService = contractJSON.contract.contacts[index].services.findIndex(function (item){
                                            return item.serviceId == itemApplication.service
                                        });
                                        contractJSON.contract.contacts[index].services[posistionService].applications.push(
                                            {
                                                'applicationName':applications[1],
                                                'applicationId': itemApplication.application,
                                                'applicationShortName': applications[2]
                                            }
                                        );
                                    }
                                });
                            }
                        }
                        selectService.selectedIndex = indexSelect2;
                        let posistionService2 = contractJSON.contract.contacts[index].services.findIndex(function (item){
                            return item.serviceId == itemApplication.service
                        });
                        if(posistionService2 != -1) {
                            updateApplicationsPerService(index, posistionService2, itemApplication.service);
                        }
                    });
                }
                contactSelect.selectedIndex = 0;
            });
            let indexSelect3;
            // Get the select element
            const languageSelect = document.getElementById('contractLanguage');
            for (let i = 1; i < languageSelect.options.length; i++) {
                if (languageSelect.options[i].text === contractData.language || languageSelect.options[i].text === contractData.language) {
                    indexSelect3 = i; // Return the index and exit the loop
                    break;
                }
            }
            if(typeof indexSelect3 == 'undefined'){
                sweetAlert(2, 'There was an issue loading the contracts language, please contact an administrator', base_url + "matters/" + matter_id + "/main_view");
            } else {
                languageSelect.selectedIndex = indexSelect3;
            }
        } else {
            // Cancel the confirmation
                shouldShowConfirmation = false;
            sweetAlert(2, 'There was an issue with your request, please contact an administrator', base_url + "matters/" + matter_id + "/main_view");
        }
    }

}

// var clientsToWord = [];
// var servicesToWord = [];
// var nameMainClient;
let numContacts = 0;

function getContractDocumentName(){
    let mainContact = contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactRole == 1)];
    let mainContactServices = mainContact.services;
    let applicationsPerServiceCount = 0;
    let mainServiceName;
    let result = "";
    result += rearrangeNameContact(mainContact.contactName);
    result += "_";
    if(Object.keys(mainContactServices).length == 1) {
        mainServiceName = cleanString(mainContactServices[0].serviceName);
    } else {
        mainContactServices.forEach(service => {
            if(service.serviceId != 9){
                if(Object.keys(service.applications).length >= applicationsPerServiceCount) {
                    mainServiceName = service.serviceName;
                    applicationsPerServiceCount = Object.keys(service.applications).length;
                }
            }
        });
        mainServiceName = cleanString(mainServiceName);
    }
    result += mainServiceName;
    result += "_K";
    return result;
}

function cleanString(inputString) {
    // Remove unwanted symbols using a regular expression
    const cleanedString = inputString.replace(/[*%?!<>&@=#$]/g, '');
    // Convert the string to lowercase and replace spaces with underscores
    const finalString = cleanedString.toLowerCase().replace(/\s+/g, '_');
    return finalString;
}

function rearrangeNameContact(inputString) {
    // Split the string into an array of words
    const wordsArray = inputString.split(' ');
  
    // Rearrange the words based on the length of the array
    const rearrangedWords = wordsArray.length >= 3
      ? [wordsArray[2], wordsArray[0]]
      : [wordsArray[1], wordsArray[0]];
  
    // Join the rearranged words with underscores
    const result = rearrangedWords.join('_').toLowerCase();
  
    return result;
}

/**
 * Prepares the request by building a json that is then sent to an endpoint.
 * Most of the information comes from the contractJSON array
 * which is used for dom manipulation, billing validations, etc
 * First, calls the checkContractValues function which checks that values are valid/not empty/etc
 * Then starts building multiple arrays that are then hold by the request array
 * After that, the generate and saveRow functions are called
 * generate is the function that create the word document
 * saveRow is the funciton that saves the contract to the database
 */
function sendRequest(transaction){
    if (transaction == null || transaction == undefined || typeof transaction == 'undefined' || typeof transaction !== 'number' || transaction == 0 || transaction < 0 || transaction > 2) {
        sweetAlert(2, 'There was an issue with your request, please contact an administrator', null);
        return null;
    } else {
        let saveButton = $("#saveButton");
        if(saveButton.hasClass("disabled")){
            sweetAlert(2, 'There was an issue with your request, please contact an administrator', base_url);
        } else {
            saveButton.addClass("disabled");
        }

        let data = {};
        let listContactsApplications = [];
        let listRoleContacts = [];
        let listPaymentPlans = [];
        let contractsDocuments = {};
        let request = {};
        
        if(transaction == 1) {
            let listOfWrongValues = checkContractValues();
            if(listOfWrongValues == null || listOfWrongValues == undefined || listOfWrongValues.length == 0) {
                data.filenamecontract = "CARRANZA_JOSE_U_VISA_Contract.docx";
                data.idcontractlanguage = document.getElementById('contractLanguage').value;
                data.idcontractstatus = "1";
                data.idmatter = matter_id;

                // Down Payment
                let downPaymentPlan = {};
                downPaymentPlan.amountpaymentplan = parseFloat(contractJSON.contract.downPaymentAmount);
                downPaymentPlan.datepaymentplan = formatDates(contractJSON.contract.dateDownPayment);
                downPaymentPlan.idpaymentplantype = 2;

                listPaymentPlans.push(downPaymentPlan);

                // Monthly Charges
                for(let i = 0 ; i < Object.keys(contractJSON.contract.monthlyPayments).length ; i++){
                    let monthlyPlan = {};
                    monthlyPlan.amountpaymentplan = parseFloat(contractJSON.contract.monthlyPayments[i].amount);
                    monthlyPlan.datepaymentplan = formatDates(contractJSON.contract.monthlyPayments[i].date);
                    monthlyPlan.idpaymentplantype = 1;

                    listPaymentPlans.push(monthlyPlan);
                }

                //Roles
                for(let i = 0 ; i < Object.keys(contractJSON.contract.contacts).length ; i++){
                    let roleContacts = {};
                    roleContacts.idcontractrole = parseInt(contractJSON.contract.contacts[i].contactRole);
                    roleContacts.idcontact = parseInt(contractJSON.contract.contacts[i].contactId);

                    listRoleContacts.push(roleContacts);
                }

                //Applications
                listContactsApplications = contractJSON.contract.contacts.flatMap(nameObj => {
                    return nameObj.services.flatMap(typeObj => {
                        return typeObj.applications.map(subtypeObj => ({
                            idcontractapplication: subtypeObj.applicationId,
                            idcontact: parseInt(nameObj.contactId),
                            idcontractservice: parseInt(typeObj.serviceId)
                        }));
                    });
                });

                //Contract Documents
                let directory_path = "./docsxup/files/matters/";
                directory_path += matter_id;
                directory_path += "/contracts/";
                contractsDocuments.file_name_document_contract = getContractDocumentName();
                contractsDocuments.type_document_contract = ".docx";
                contractsDocuments.directory_path_contract = directory_path;
                contractsDocuments.status_contract_document = true;
                contractsDocuments.version_document_contract = 1;

                console.log(contractsDocuments);

                request.contracts = data;
                request.applicationsContactsList = listContactsApplications;
                request.roleContactsList = listRoleContacts;
                request.contractPaymentPlansList = listPaymentPlans;
                request.contractsDocuments = contractsDocuments;
                selectedLang = document.getElementById('contractLanguage').value;
                console.log(JSON.stringify(request));
                shouldShowConfirmation = false;
                saveRow(base_url + create, null, request, null, base_url + "matters/" + matter_id + "/main_view", 4);
                startSwal();
            } else {
                if(saveButton.hasClass("disabled")){
                    saveButton.removeClass("disabled");
                }
                console.log(listOfWrongValues);

                swal.fire({
                    title: 'Error',
                    html: 'Cannot proceed with empty / invalid values: \n <pre class="text-start">' + listOfWrongValues + '</pre>',
                    icon: 'error',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
            }
        } else if (transaction == 2) {
            let listOfWrongValues = checkContractValues();
            if(listOfWrongValues == null || listOfWrongValues == undefined || listOfWrongValues.length == 0) {
                data.idcontract = contractArray[0].idContract;
                data.filenamecontract = contractArray[0].fileNameContract;
                data.idcontractlanguage = document.getElementById('contractLanguage').value;
                data.idcontractstatus = "1";
                data.idmatter = matter_id;

                // Down Payment
                let downPaymentPlan = {};
                downPaymentPlan.amountpaymentplan = parseFloat(contractJSON.contract.downPaymentAmount);
                downPaymentPlan.datepaymentplan = formatDates(contractJSON.contract.dateDownPayment);
                downPaymentPlan.idpaymentplantype = 2;

                listPaymentPlans.push(downPaymentPlan);

                // Monthly Charges
                for(let i = 0 ; i < Object.keys(contractJSON.contract.monthlyPayments).length ; i++){
                    let monthlyPlan = {};
                    monthlyPlan.amountpaymentplan = parseFloat(contractJSON.contract.monthlyPayments[i].amount);
                    monthlyPlan.datepaymentplan = formatDates(contractJSON.contract.monthlyPayments[i].date);
                    monthlyPlan.idpaymentplantype = 1;
                    listPaymentPlans.push(monthlyPlan);
                }

                //Roles
                for(let i = 0 ; i < Object.keys(contractJSON.contract.contacts).length ; i++){
                    let roleContacts = {};
                    roleContacts.idcontractrole = parseInt(contractJSON.contract.contacts[i].contactRole);
                    roleContacts.idcontact = parseInt(contractJSON.contract.contacts[i].contactId);

                    listRoleContacts.push(roleContacts);
                }

                //Applications
                listContactsApplications = contractJSON.contract.contacts.flatMap(nameObj => {
                    return nameObj.services.flatMap(typeObj => {
                        return typeObj.applications.map(subtypeObj => ({
                            idcontractapplication: subtypeObj.applicationId,
                            idcontact: parseInt(nameObj.contactId),
                            idcontractservice: parseInt(typeObj.serviceId)
                        }));
                    });
                });

                //Contract Documents
                let directory_path = "./docsxup/files/matters/";
                directory_path += matter_id;
                directory_path += "/contracts/";
                contractsDocuments.file_name_document_contract = getContractDocumentName();
                contractsDocuments.type_document_contract = ".docx";
                contractsDocuments.directory_path_contract = directory_path;
                contractsDocuments.status_contract_document = true;
                contractsDocuments.version_document_contract = 1;

                console.log(contractsDocuments);

                let oldApplicationsList = [];
                contractArray[0].listApplications[0].forEach(function(element) {
                    oldApplicationsList.push(element.id);
                });

                let oldRoleList = [];
                contractArray[0].listRoles[0].forEach(function(element) {
                    oldRoleList.push(element.id);
                });

                let oldPaymentsList = [];
                contractArray[0].listPaymentPlan[0].forEach(function(element) {
                    oldPaymentsList.push(element.id);
                });
                
                let contract_id = contractArray[0].idContract;

                request.contracts = data;
                request.applicationsContactsList = listContactsApplications; 
                request.roleContactsList = listRoleContacts;
                request.contractPaymentPlansList = listPaymentPlans;
                request.contractsDocuments = contractsDocuments;
                // request.oldApplicationsList = oldApplicationsList;
                // request.oldRoleList = oldRoleList;
                // request.oldPaymentsList = oldPaymentsList;
                selectedLang = document.getElementById('contractLanguage').value;
                
                console.log(JSON.stringify(request));
                shouldShowConfirmation = false;
                saveRow(base_url + update + contract_id, null, request, null, base_url + "contract/" + contractArray[0].idContract + "/edit/?matter_id=" + matter_id, 4);
                console.log("" + base_url + update + contract_id + "");
                startSwal();
            } else {
                if(saveButton.hasClass("disabled")){
                    saveButton.removeClass("disabled");
                }
                console.log(listOfWrongValues);

                swal.fire({
                    titleText: 'Error',
                    html: 'Cannot proceed with empty / invalid values: \n <pre class="text-start">' + listOfWrongValues + '</pre>',
                    icon: 'error',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
            }
        } else {
            sweetAlert(2, 'There was an issue with your request, please contact an administrator', null);
            return null;
        }
    }
}

let contractDocument = {};

function startSwal(){
    swal.fire({
        titleText: 'Contract Update',
        html: `
        <div class="container">
            <div class="row mt-3">
                <div class="col-sm-10 text-start">
                    <p id="uploadDataText">Uploading Contract Information</p>
                </div>
                <div class="col-sm-2">
                    <div style="display: flex;">
                        <div style="display: inline-block;">
                            <div id="uploadDataOnGoing" class="loader" style="position:absolute; display:block;"></div>
                            <span id="uploadDataCompleted" class="material-symbols-outlined" style="font-size:25px; color:#4caf50; position:absolute; display:none;">check_circle</span>
                            <span id="uploadDataError" class="material-symbols-outlined" style="font-size:25px; color:#dc3545; position:absolute; display:none;">cancel</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-sm-10 text-start">
                    <p id="uploadDocText" class="text-muted">Uploading Contract Document</p>
                </div>
                <div class="col-sm-2">
                    <div style="display: flex;">
                        <div style="display: inline-block;">
                            <div id="uploadDocOnGoing" class="loader" style="position:absolute; display:none;"></div>
                            <span id="uploadDocCompleted" class="material-symbols-outlined" style="font-size:25px; color:#4caf50; position:absolute; display:none;">check_circle</span>
                            <span id="uploadDocError" class="material-symbols-outlined" style="font-size:25px; color:#dc3545; position:absolute; display:none;">cancel</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="errorMessageRow" class="row mt-3" style="display: none;">
                <div class="col-sm-12">
                    <div class="error-message mb-3">
                        <span id="errorMessage" class="error-text">There was an error getting matter information. Please try again later. If the issue persists, contact an administrator</span>
                    </div>
                </div>
            </div>
            <div id="optionsAfterUpload" class="row mt-3" style="display: none;">
                <div class="row">
                    <div class="col-sm-6">
                        <a id="optionBackToMatter" href="#;" type="button" class="btn btn-primary">
                            <span class="material-symbols-outlined align-middle" id="icontoflip">
                                move_item
                            </span>
                            Back to Matter
                        </a>
                    </div>
                    <div class="col-sm-6">
                        <a id="optionDownloadDoc" href="#;" type="button" class="btn btn-secondary">
                            <span class="material-symbols-outlined align-middle" id="icontoflip">
                                download_for_offline
                            </span>
                            Download Contract
                        </a>
                    </div>
                </div>
            </div>
            <div id="closeSwalOption" class="row mt-3" style="display: none;">
                <div class="row">
                    <div class="col-sm">
                        <button type="button" onclick="closeSwalProgrammatically()" class="btn btn-secondary">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>`,
        allowEnterKey: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false
    });
    // .then(function () {
    //     location.href = url
    // });
}

function closeSwalProgrammatically(){
    Swal.close();
}

function readContractResponse(operation){
    if(operation.status == 1){
        let uploadDataOnGoing = document.getElementById("uploadDataOnGoing");
        uploadDataOnGoing.style.display = 'none';
        let uploadDataCompleted = document.getElementById("uploadDataCompleted");
        uploadDataCompleted.style.display = 'block';
        let uploadDataText = $("#uploadDataText");
        
        uploadDataText.text("Contract Information Uploaded");

        if(uploadDataText.hasClass("text-success")){
        } else {
            uploadDataText.addClass("text-success");
        }

        if(uploadDataText.hasClass("text-decoration-line-through")){
        } else {
            uploadDataText.addClass("text-decoration-line-through");
        }

        console.log(operation);
        contractDocument.contractId = operation.dataset[0];
        contractDocument.contractDocumentId = operation.dataset[1];
        contractDocument.fileName = operation.dataset[2];
        contractDocument.version = operation.dataset[3];
        console.log(JSON.stringify(contractJSON, null, 2));
        generate();
    } else {
        sweetAlert(2, 'There was an issue with your request, please contact an administrator', null);
    }
}

function exceptionContractResponse(){
    let uploadDataOnGoing = document.getElementById("uploadDataOnGoing");
    uploadDataOnGoing.style.display = 'none';
    let uploadDataError = document.getElementById("uploadDataError");
    uploadDataError.style.display = 'block';
    let uploadDataText = $("#uploadDataText");
    uploadDataText.text("Uploading Contract Information - Failed");
    if(uploadDataText.hasClass("text-danger")){
    } else {
        uploadDataText.addClass("text-danger");
    }
    let errorMessageRow = document.getElementById("errorMessageRow");
    errorMessageRow.style.display = 'block';
    let errorMessage  = $("#errorMessage");
    errorMessage.text("There was an issue with your request, please try again later. If the issue persists, contact an administrator");
    document.getElementById("closeSwalOption").style.display = 'block';
    let saveButton = $("#saveButton");
    if(saveButton.hasClass("disabled")){
        saveButton.removeClass("disabled");
    }
    Swal.getCloseButton().style.display = 'block';
}

function deleteContractDocumentData() {
    let data;
    data = contractDocument.contractDocumentId;
    fetch(base_url + delete_contract_document_data, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status != 0) {

                } else {
                    
                }
            });
        } else {
            console.log(request.status + ' ' + request.text);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function uploadDocument(blob) {
    // Create a FormData object and append the Blob
    var formData = new FormData();
    formData.append('file', blob, contractDocument.fileName);

    let uploadDocText = $("#uploadDocText");
    if(uploadDocText.hasClass("text-muted")) {
        uploadDocText.removeClass("text-muted");
    }

    let uploadDocOnGoing = document.getElementById("uploadDocOnGoing");
    uploadDocOnGoing.style.display = 'block';

    // Make a POST request to your PHP controller
    fetch(base_url + 'contract/' + matter_id + '/' + contractDocument.contractId + '/store_file_contract/?matter_id=' + matter_id, {
        method: 'POST',
        body: formData,
    }).then(response => response.json()) // Assuming your PHP controller returns JSON
    .then(data => {
        console.log('Response from PHP controller:', data);
        if(data.success){
            uploadDocOnGoing.style.display = 'none';
            let uploadDocCompleted = document.getElementById("uploadDocCompleted");
            uploadDocCompleted.style.display = 'block';

            uploadDocText.text("Contract Document Uploaded");

            if(uploadDocText.hasClass("text-success")){
            } else {
                uploadDocText.addClass("text-success");
            }

            if(uploadDocText.hasClass("text-decoration-line-through")){
            } else {
                uploadDocText.addClass("text-decoration-line-through");
            }

            let optionsAfterUpload = document.getElementById("optionsAfterUpload");
            optionsAfterUpload.style.display = 'block';

            let backToMatterLink = '';
            backToMatterLink += base_url;
            backToMatterLink += 'matters/';
            backToMatterLink += matter_id;
            backToMatterLink += '/main_view';

            let newDocLink = '';
            newDocLink += base_url;
            newDocLink += './docsxup/files/matters/';
            newDocLink += matter_id;
            newDocLink += '/contracts/';
            newDocLink += contractDocument.contractId;
            newDocLink += '/';
            newDocLink += contractDocument.fileName;

            $("#optionBackToMatter").attr('href', backToMatterLink);
            $("#optionDownloadDoc").attr('href', newDocLink);
            let mainContainer = $("#mainContainer");
            if(mainContainer.hasClass("blur")){
            } else {
                mainContainer.addClass("blur");
            }
        } else {
            uploadDocOnGoing.style.display = 'none';
            let uploadDocError = document.getElementById("uploadDocError");
            uploadDocError.style.display = 'block';
            uploadDocText = $("#uploadDocText");
            uploadDocText.text("Uploading Contract Document - Failed");
            if(uploadDocText.hasClass("text-danger")){
            } else {
                uploadDocText.addClass("text-danger");
            }
            
            let uploadDataCompleted = document.getElementById("uploadDataCompleted");
            uploadDataCompleted.style.display = 'none';
            let uploadDataError = document.getElementById("uploadDataError");
            uploadDataError.style.display = 'block';
            let uploadDataText = $("#uploadDataText");
            if(uploadDataText.hasClass("text-success")){
                uploadDataText.removeClass("text-success");
            }
            if(uploadDataText.hasClass("text-decoration-line-through")){
                uploadDataText.removeClass("text-decoration-line-through");
            }
            uploadDataText.text("Contract Information Uploaded - Cancelled");
            if(uploadDataText.hasClass("text-danger")){
            } else {
                uploadDataText.addClass("text-danger");
            }

            let errorMessageRow = document.getElementById("errorMessageRow");
            errorMessageRow.style.display = 'block';
            let errorMessage  = $("#errorMessage");
            errorMessage.text("There was an issue with your request, please try again later. If the issue persists, contact an administrator");
            deleteContractDocumentData();
            document.getElementById("closeSwalOption").style.display = 'block';
            let saveButton = $("#saveButton");
            if(saveButton.hasClass("disabled")){
                saveButton.removeClass("disabled");
            }
            Swal.getCloseButton().style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function loadContacts(num){
    // get contacts related values
    // add them to a select

}

// necessary values: contact name, contact relationship, beneficiary or main client
// insert contact to view and json with empty services
function addContact(idrole){
    //let numContacts = Object.keys(contractJSON.contract.contacts).length;
    let contactRole;
    let name;
    let contactId;
    let relation;
    let serviceSelect = document.getElementById("ContactSelect");

    contactId = serviceSelect.value;
    name = serviceSelect.options[serviceSelect.selectedIndex].text;
    if(contactId == 0 || contactId === 0 || contactId < 1){
        console.log(contactId);
        sweetAlert(2, 'This option cannot be added', null);
    } else {
        let checkIfAdded = contractJSON.contract.contacts.some(item => item.contactId === contactId);
        if(checkIfAdded){
            sweetAlert(2, name + ' is already added', null);
        } else {
            relation = document.getElementById(contactId).getAttribute('data-custom-relation');
            const checkboxes = document.querySelectorAll('input[name="mainClientCheck"]');
            let isAnyCheckboxSelected = false;
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    // Log or use the ID of the selected checkbox
                    idCheckedCheckBox = checkbox.getAttribute('data-custom-id');
                    // Set the flag to true since at least one checkbox is selected
                    isAnyCheckboxSelected = true;
                    //console.log(isAnyCheckboxSelected);
                }
            });
            if(!isAnyCheckboxSelected){
                if(idrole == -1 || idrole < 0 || idrole === -1) {
                    contactRole = "1";
                } else {
                    contactRole = idrole.toString();
                }
                contractJSON.contract.contacts.push(
                    {
                        'contactName':name,
                        'contactRole': contactRole,
                        'contactRelation':relation,
                        'contactId': contactId,
                        'contactPos': numContacts,
                        'services':[]
                    }
                );
            } else {
                if(idrole == -1 || idrole < 0 || idrole === -1) {
                    contactRole = "2";
                } else {
                    contactRole = idrole.toString();
                }
                contractJSON.contract.contacts.push(
                    {
                        'contactName':name,
                        'contactRole': contactRole,
                        'contactRelation':relation,
                        'contactId': contactId,
                        'contactPos': numContacts,
                        'services':[]
                    }
                );
            }

            let html = addBeneficiaryViewContent(numContacts, relation, contactRole, name, contactId); // add query to get the relation of the contact in the contract (son, mom, brother, sibling, ...)
            document.getElementById("listBeneficiaries").insertAdjacentHTML("beforeend", html);
            setFstDropdown();
            fillSelectFSByTagsArrayLocal(servicesArray, 'ContactServicesSelect'+numContacts+'', null);
            document.querySelector('#ContactServicesSelect'+numContacts+'').fstdropdown.setValue(0);
            numContacts++;
            // get num of contacts
        }
    }
}

function addServicet(num){
    const selectService = document.getElementById('ContactServicesSelect'+num);
    const serviceId = selectService.value;
    console.log(serviceId);
    const serviceName = selectService.options[selectService.selectedIndex].text;
    console.log(serviceName);
}

/*function updateArraysToWord(){
    for(let i = 0; i < Object.keys(contractJSON.contract.contacts).length; i++){
        let checkRole = contractJSON.contract.contacts[i].contactRole == '1' ? "Victima" : "Beneficiario";
        let elementClient = {
            'name_client': contractJSON.contract.contacts[i].contactName,
            'role_client': checkRole
        }
        clientsToWord.push(elementClient);

        for(let j = 0; j < Object.keys(contractJSON.contract.contacts[i].services).length; j++){
            let serviceMessage = '';
            if(contractJSON.contract.contacts[i].services[j].serviceId == '34') {
                serviceMessage += "Socorro migratorio al que se aplica: VISA U. Comprende lo siguiente";
            } else if(contractJSON.contract.contacts[i].services[j].serviceId == '9') {
                serviceMessage += "Peticiones para obtener registros del Cliente";
                contractJSON.contract.contacts[i].services[j].applications.forEach(item => {
                    let applicationMessage = {};
                    servicesToWord
                });
            }
        }
    }
}*/

function addService(num){
    const selectService = document.getElementById('ContactServicesSelect'+num);
    const serviceId = selectService.value;
    const serviceName = selectService.options[selectService.selectedIndex].text;
    // necessary values: contactid, serviceName, serviceId
    // services option are in select
    // insert service to the contact selected using value selected from select
    // option to delete service
    if(serviceId.length==0 || serviceId===null || serviceId==="" || serviceName === "Select an Option" || serviceId === 0 || serviceId == 0){
        sweetAlert(2, 'This option cannot be added', null);
    } else {
        if(contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == num)].services.some(el => el.serviceId === serviceId)){
            sweetAlert(2, 'Service already added to the list', null);
        } else {
            let numServices = Object.keys(contractJSON.contract.contacts).length;
            contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == num)].services.push(
                {
                    'serviceName':serviceName,
                    'serviceId':serviceId,
                    'applications':[]
                }
            );
            let html = `
                <div class="row" id="Contact${num}Service${serviceId}">
                    <div class="col-sm-11">
                        <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                            ${serviceName}
                            <span class="badge bg-secondary rounded-pill">0</span>
                        </li>
                    </div>
                    <div class="col-sm-1">
                        <a href="#;" onclick="removeService(${num}, ${serviceId})">
                            <img src="https://test.counselmanager.com//img/status_2.jpg">
                        </a>
                    </div>
                </div>`;

            document.getElementById('Contact' + num + 'ServicesContainer').insertAdjacentHTML("beforeend", html);

            $( "#Contact" + num + "ApplicationsSaveButton" ).toggleClass(function() {
                if ( $( this ).hasClass("disabled") ) {
                return "disabled";
                } else {
                return "";
                }
            });
        }
    }
}

/**
 * Adds #; at the end of url when triggered.
 * This is to avoid unwanted behvaiour (the page moves up, refreshes, etc) when a button is clicked
 * */
function adjustmentPositioning(){
    const highlightedItems = document.querySelectorAll("a");
    [].forEach.call(highlightedItems, function(atag) {
        var attrValue = atag.getAttribute("href");
        attrValue == "javascript:void(0);" ? null : atag.setAttribute("href", "#;");
    });
}

/**
 * Hide Sections of the page per contact.
 * Query elements with the @param {Number} num
 * Check the name of the section with @param {String} section to check if further information is needed
 */
function hideElementContacts(num, section){
    const sectionContact = document.getElementById(num+'Contact'+section);
    const titleContact = document.getElementById(num+'Contact'+section+'Title');
    const iconContact = document.getElementById(num+'Contact'+section+'Icon');

    const listElement = sectionContact.classList;

    if (listElement.contains("visually-hidden")) {
        listElement.remove("visually-hidden");
        iconContact.innerText = "visibility";
        titleContact.innerText = section;
    } else {
        listElement.add("visually-hidden");
        iconContact.innerText = "visibility_off";
        if (section === 'Services') {
            titleContact.innerText = section+' ('+Object.keys(contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == num)].services).length+')';
        } else {
            titleContact.innerText = section;
        }
    }
}

/**
 * Removes all the sections of the Contact that was selected
 * This functions is called by an onclick event
 * Shows a modal to confirm the transaction then
 * Querys all the elements with num to then remove them
 * @param {Number} num
 */
function removeBeneficiary(num, id) {
    const contact = document.getElementById(num+'Contact');
    if(contact.length==0 || contact===null || contact===""){
        sweetAlert(2, 'Unable to Perform this action right now', null);
    } else {
        swal.fire({
            title: 'Warning',
            text: 'Are you sure you want to delete this contact?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(result => {
            // verify if Yes button is clicked
            if (result.value) {
                contractJSON.contract.contacts.splice(contractJSON.contract.contacts.findIndex(item => item.contactId == id), 1);
                contact.remove();
                scanPrincipalCheckBox();
            }
        });
    }
}

function assignPrincipalCheckBox(checkbox) {
    const idContactCheckBox = checkbox.getAttribute('data-custom-id');
    let indexContactCheckBox = contractJSON.contract.contacts.findIndex(item => item.contactId == idContactCheckBox);
    let indexPrincipalContact = contractJSON.contract.contacts.findIndex(item => item.contactRole == 1);
    // cambiar id de anterior a 2
    // asignar clickeado id 1
    if (indexContactCheckBox == indexPrincipalContact || indexContactCheckBox === indexPrincipalContact) {
    } else {
        contractJSON.contract.contacts[indexPrincipalContact].contactRole = 2;
        contractJSON.contract.contacts[indexContactCheckBox].contactRole = 1;
    }
}

function allCheckboxesToggleChecked(checkbox, groupNum){
    // Get all checkboxes with the specified name
    const checkboxes = document.querySelectorAll('input[name="checkboxGroup' + groupNum + '"]');

    if(checkboxes.length == 0 || checkboxes.length === 0) {
    } else {
        if(checkbox.checked) {
            // Loop through checkboxes and set them as checked
            checkboxes.forEach(checkbox => {
            checkbox.checked = true;
          });
        } else {
            // Loop through checkboxes and set them as not checked
            checkboxes.forEach(checkbox => {
            checkbox.checked = false;
          });
        }
    }
}

function scanPrincipalCheckBox(){
    // Get all checkboxes with the specified name
    const checkboxes = document.querySelectorAll('input[name="mainClientCheck"]');
    let isAnyCheckboxSelected = false;
    let idCheckedCheckBox;
    let idPrincipalContact = contractJSON.contract.contacts.findIndex(item => item.contactRole == 1);
    // Loop through checkboxes to find the selected one
    if (checkboxes.length === 0 || checkboxes.length == 0) {
    } else {
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                // Log or use the ID of the selected checkbox
                idCheckedCheckBox = checkbox.getAttribute('data-custom-id');
                // Set the flag to true since at least one checkbox is selected
                isAnyCheckboxSelected = true;
                //console.log(isAnyCheckboxSelected);
                if(idCheckedCheckBox != idPrincipalContact) {
                    contractJSON.contract.contacts[idPrincipalContact].contactRole = 2;
                    contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactId == idCheckedCheckBox)].contactRole = 1;
                }
            }
        });
        // Check if no checkbox is selected
        if (!isAnyCheckboxSelected) {
            checkboxes[0].checked = true;
            contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactId == checkboxes[0].getAttribute('data-custom-id'))].contactRole = 1;
            // You can take further action here, such as displaying an alert or performing another operation.
        }
    }
}

/**
 * This function removes a service from a contacts services
 * First querys elements with the parameters being passed
 * Then if the contact has no services, it shows a modal
 * If contact has services, shows a modal confirming the transaction
 * If transactions is confirmed, querys the position of the services in the contractJSON array
 * then checks if the service is selected to remove the applications options of the service from the view
 * then the service element is removed from the view
 * then checks if the contact has remaining services, if no, button to save applications is disabled until
 * a new one is added
 * @param {*} num , this is the id of the contact
 * @param {Number} nums , this is the id of the service
 */
function removeService(num, nums){
    const service = document.getElementById('Contact'+num+'Service'+nums);
    const textOfService = $( "#Contact"+num+"Service"+nums ).find( "li" ).contents().first().text();
    console.log(textOfService.trim());
    const servicesContainer = $( "#Contact"+num+"Service"+nums ).find( "row" ).contents();
    console.log(servicesContainer);
    if(service===null || service.length==0 || service===""){
        sweetAlert(2, 'Unable to Perform this action right now', null);
    } else {
        swal.fire({
            title: 'Warning',
            text: 'Are you sure you want to delete service ' + textOfService + ' from the list?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(result => {
            // verify if button is clicked
            if (result.value) {
                let index = contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == num)].services.findIndex(function (services){
                    return services.serviceId == nums;
                });
                if(index >= 0){
                    contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == num)].services.splice(index,1);
                    // check if current service is selected then remove the applications options
                    if($( "#Contact"+num+"Service"+nums ).find( "li" ).hasClass("active")){
                        document.getElementById("Contact" + num + "ApplicationsContainer").innerHTML = "";
                    }
                    service.remove();
                    if (Object.keys(contractJSON.contract.contacts[contractJSON.contract.contacts.findIndex(item => item.contactPos == num)].services).length === 0) {
                        $( "#Contact" + num + "ApplicationsSaveButton" ).toggleClass(function() {
                            if ( $( this ).hasClass("disabled") ) {
                            return "";
                            } else {
                            return "disabled";
                            }
                        });
                    }
                } else {
                    sweetAlert(2, 'There was an issue with your request, please contact an administrator', null);
                }
            }
        });
    }
}

//function addBeneficiaryToView(){
    /**
     * check if first contact
     * add contact to json
     */
    /*if(numOfContacts > maxContacts) {
        sweetAlert(2, 'Can'+ "'" +'t add morde than ' + maxContacts + ' Beneficiary', null);
    } else if (numOfContacts <= maxContacts) {
        let html = addBeneficiaryViewContent(numOfContacts, "Father"); // add query to get the relation of the contact in the contract (son, mom, brother, sibling, ...)
        document.getElementById("listBeneficiaries").insertAdjacentHTML("beforeend", html);
        console.log(numOfContacts);
        numOfContacts +=1;
    } else {
        sweetAlert(2, 'Unable to Add Beneficiary', null);
    }
}*/

/**
 * Creates the view html elements and assigns them the ids and other values needed
 * ids are useful for dom modification via javascript
 * @param {*} num , is the id of contact in the view (not the database). Starts from 0 and increments by 1
 * @param {*} relation
 * @param {*} role , holds if contact is Main client/Primary or Beneficiary/Derivative
 * @returns the html of a new contact with a new id
 * all contacts have a unique id that is shared with
 * the view elements of each contact
 */
function addBeneficiaryViewContent(num, relation, role, name, id){
    let roleContact;
    if(relation.length==0 || relation===null || relation===""){
        relation = '';
    }
    switch(role){
        case '1':
            roleContact = '" checked';
            break;
        case '2':
            roleContact = '"';
            break;
        default:
            roleContact = '"';
    }
    let html = `<div class="row align-items-start mb-4" id="${num}Contact">
                    <div class="col">
                        <div class="mb-3">
                            <div class="d-flex">
                                <div class="p-2 ms-auto">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" data-custom-id="${id}" name="mainClientCheck" onclick="assignPrincipalCheckBox(this)" id="mainCheck${num}${roleContact}>
                                        <label class="form-check-label" for="mainCheck${num}">
                                            Mark as Principal | Victim
                                        </label>
                                    </div>
                                </div>
                                <div class="p-2 ms-auto">
                                    <a class="text-danger" href="#;" onclick="removeBeneficiary(${num}, ${id})">
                                        <span class="material-symbols-outlined">do_not_disturb_on</span>
                                    </a>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    ${name} (${relation})
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="d-flex">
                            <div class="p-2">
                                <label class="ml-2 mb-2" id="${num}ContactServicesTitle">Services</label>
                            </div>
                            <div class="p-2 me-auto ms-auto">
                                <a class="text-black" onclick="hideElementContacts(${num}, 'Services')" href="#;">
                                    <span class="material-symbols-outlined" id="${num}ContactServicesIcon">visibility</span>
                                </a>
                            </div>
                        </div>
                        <div class="row" id="${num}ContactServices">
                            <div class="col">
                                <ul class="list-group services-list list-group-flush mb-2" id="Contact${num}ServicesContainer">
                                </ul>
                                <div class="row align-items-center">
                                    <div class="col-sm-11">
                                        <select id="ContactServicesSelect${num}" class="fstdropdown-select" aria-label="Default select example" data-placeholder="Search Service"></select>
                                    </div>
                                    <div class="col-sm-1">
                                        <a href="#;" id="${num}ContactServicesAddButton" onclick="addService(${num})">
                                            <img src="https://test.counselmanager.com//img/status_1.jpg">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="d-flex">
                            <div class="p-2">
                                <label class="ml-2 mb-2" id="${num}ContactApplicationsTitle">Applications</label>
                            </div>
                            <div class="p-2 ms-auto">
                                <a class="text-black" href="#;" onclick="hideElementContacts(${num}, 'Applications')">
                                    <span class="material-symbols-outlined visually-hidden" id="${num}ContactApplicationsIcon">visibility</span>
                                </a>
                                <label class="custom-checkbox pe-2" tab-index="0" aria-label="Select All">
                                    <span class="label">Select All</span>
                                    <input id="selectAll${num}" type="checkbox" onclick="allCheckboxesToggleChecked(this, ${num})">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row" id="${num}ContactApplications">
                            <div class="col">
                                <ul class="list-group mb-2" id="Contact${num}ApplicationsContainer">
                                </ul>
                                <a class="btn btn-secondary save-applications disabled" href="#" id="Contact${num}ApplicationsSaveButton" aria-describedby="${num}ContactApplicationsSaveDescription">Save Selection</a>
                                <div id="${num}ContactApplicationsSaveDescription" class="form-text">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

    return html;
}
