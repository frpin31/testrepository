const create = 'Contrato/call_to_save_contract';

const Toast = Swal.mixin({
    toast: true,
    position: "center-end",
    showConfirmButton: false,
    timer: 8000,
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

//Run when page is loaded
$(document).ready(function() {
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
            let serviceNum = contractJSON.contract.contacts[contactNum].services.findIndex(function (services){
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
                        let servicePositionId = contractJSON.contract.contacts[extractedContactId].services.findIndex(function (services){
                            return services.serviceId == extractedServiceId;
                        });
                        console.log(extractedServiceId);
                        applicationElement.each(function() {
                            // check if application exist in the json by searching it
                            // if application exists:
                            //          if current status is checked(true), dont do anything
                            //          if current status is unchecked(false), remove application from json
                            // add all aplications that are not in json and status is checked(true)
                            let applicationId = $(this).find("input")[0].id;
                            const match3 = applicationId.match(/\d+/);
                            let applicationName = $(this).find("label").text();
                            if (match3) {
                                const extractedApplicationId = parseInt(match3[0]);
                                let index = contractJSON.contract.contacts[extractedContactId].services[servicePositionId].applications.findIndex(function (applications){
                                    return applications.applicationName == applicationName;
                                });
    
                                if($(this).find("input").is(":checked")){
                                    if(index >= 0){
                                        
                                    } else {
                                        contractJSON.contract.contacts[extractedContactId].services[servicePositionId].applications.push(
                                            {
                                                'applicationName':applicationName,
                                                'applicationId':extractedApplicationId
                                            }
                                        );
                                    }
                                } else {
                                    if(index >= 0){
                                        contractJSON.contract.contacts[extractedContactId].services[servicePositionId].applications.splice(index,1);
                                    } else {
    
                                    }
                                }
                            } else {
                                console.log("No numbers found in the string.");
                            }
                        });
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
});

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

document.addEventListener('DOMContentLoaded', function() {
    //adjustmentPositioning();
    loadContract();
}, false);

function updateApplicationsPerService(contactId, servicePositionNum, serviceId){
    let numApplications = Object.keys(contractJSON.contract.contacts[contactId].services[servicePositionNum].applications).length;
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

let downPaymentAmount = 0;
let downPaymentDate = "";
let totalMonthlyCharges = 0;
let numberOfMonthlyCharges = 0;
let amountMonthlyCharges = 0;
let totalContractAmount = 0;

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

                    console.log(parseFloat(amountMonthlyCharges+remainder).toFixed(2));

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
                    
                    document.getElementById("numberOfMC").value = exactNumberOfCharges;
                }
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
 *
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
            console.log(currentDate < endDate);
            console.log(currentDate + "  " + endDate);
            const nextMonthDate = new Date(currentDate);
            // go 1 month further, store it variable nextMonthDate
            nextMonthDate.setMonth(currentDate.getMonth() + 1);

            console.log("next date in future " + nextMonthDate.getDate());

            // checks if the value of nextMonthDate is truly 1 month ahead
            // If the next month has a different number of days, set the day to the last day of the month
            // it could happen that we are in January 31 and by adding 1 month we get March 2 instead of February 28
            // is not incorrect but is not what we are looking for. So if this happens we use setDate(0) to set the Date to the last day of the previous month
            // egg. march 2 || march 28 || march 15 => setDate(0) => february 28
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
            
            // we format the date to mm/dd/yy
            const formattedDate = nextMonthDate.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric"
            });

            monthsArray.push(formattedDate);

            currentDate = new Date(nextMonthDate);
            console.log(formattedDate + " currentDate " + currentDate);

            console.log("---------------------------------------------------------------");
        }
        console.log(monthsArray);

        return monthsArray;
    }
}

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
 * Add all the payment information to contractJSON
 *
 * @param {Array} monthsArray - All the dates.
 * @param {Array} chargesArray - All the payments amount.
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
  
function calculateTotal(){


    /*if(downPaymentAmount.length==0 || downPaymentAmount===null || downPaymentAmount==="" || downPaymentAmount === 0 || downPaymentAmount == 0){

    } else if(totalMonthlyCharges.length==0 || totalMonthlyCharges===null || totalMonthlyCharges==="" || totalMonthlyCharges === 0 || totalMonthlyCharges == 0){

    } else if(totalContractAmount.length==0 || totalContractAmount===null || totalContractAmount==="" || totalContractAmount === 0 || totalContractAmount == 0) {

    }*/
}

let servicesArray = [
    [1, "Advanced Parole"],
    [2, "AOS Asylum"],
    [3, "AOS Petition"],
    [4, "AOS U-visa"],
    [5, "AOS T-Visa"],
    [6, "BIA Appeals"],
    [7, "Civil Litigation"],
    [8, "Consultations"],
    [9, "Criminal Law"],
    [10, "DACA"],
    [11, "Deportation Defense"],
    [12, "Employment Visa"],
    [13, "Family Law"],
    [14, "I-601"],
    [15, "I-918"],
    [16, "Naturalization"],
    [17, "Ninth Circuit Appeals"],
    [18, "NVC"],
    [19, "Personal Injury"],
    [20, "Petition I-130"],
    [21, "Research"],
    [22, "SIJS"],
    [23, "TPS"],
    [24, "T-Visa"],
    [25, "U-Visa"],
    [26, "VAWA"]
];

let applicationsArray = [
    ["Advanced Parole"],
    [        
        ["93", "I-131 | Application for Travel Document"]
    ],

    ["AOS Asylum"],
    [
        ["2", "I-191 | Application for Relief Under Former Section 212(c) of the Immigration and Nationality Act (INA)"],
        ["3", "I-193 | Application for Waiver of Passport and/or Visa"],
        ["4", "I-212 | Application for Permission to Reapply for Admission into the United States After Deportation or Removal"],
        ["5", "I-360 | Petition for Amerasian, Widow(er), or Special Immigrant"],
        ["6", "I-361 | Affidavit of Financial Support and Intent to Petition for Legal Custody for Public Law 97-359 Amerasian"]        
    ],

    ["AOS Petition"],
    [
        ["7", "I-602 | Application by Refugee for Waiver of Inadmissibility Grounds"],
        ["8", "I-687 | Application for Status as a Temporary Resident Under Section 245A of the Immigration and Nationality Act"],
        ["9", "I-690 | Application for Waiver of Grounds of Inadmissibility Under Sections 245A or 210 of the Immigration and Nationality Act"],
        ["10", "I-693 | Report of Immigration Medical Examination and Vaccination Record"],
        ["11", "I-730 | Refugee/Asylee Relative Petition"]
    ],

    ["AOS U-visa"],
    [
        ["12", "I-363 | Request to Enforce Affidavit of Financial Support and Intent to Petition for Legal Custody for Public Law 97-359 Amerasian"],
        ["13", "I-485 SA | I-485 Supplement A | Supplement A to Form I-485, Adjustment of Status Under Section 245(i)"],
        ["14", "I-485 SJ | I-485 Supplement J | Confirmation of Bona Fide Job Offer or Request for Job Portability Under INA Section 204(j)"],
        ["15", "I-539 | Application to Extend/Change Nonimmigrant Status"],
        ["16", "I-600A | Application for Advance Processing of an Orphan Petition"],
        ["17", "I-601A | Application for Provisional Unlawful Presence Waiver"]
    ],
    ["AOS T-Visa"],
    [
        ["18", "I-601 | Application for Waiver of Grounds of Inadmissibility"],
        ["19", "I-612 | Application for Waiver of the Foreign Residence Requirement"],
        ["20", "I-698 | Application to Adjust Status from Temporary to Permanent Resident"],
        ["21", "I-765V | Application for Employment Authorization for Abused Nonimmigrant Spouse"],
        ["22", "I-821 | Application for Temporary Protected Status"],
        ["23", "I-824 | Application for Action on an Approved Application or Petition"]
    ],
    ["BIA Appeals"],
    [
        ["24", "I-129 | Petition for a Nonimmigrant Worker"],
        ["25", "I-129F | Petition for Alien Fiancé(e)"],
        ["26", "I-140 | Immigrant Petition for Alien Workers"],
        ["27", "I-191 | Application for Relief Under Former Section 212(c) of the Immigration and Nationality Act (INA)"],
        ["28", "I-193 | Application for Waiver of Passport and/or Visar"]
    ],
    ["Civil Litigation"],
    [
        ["29", "I-212 | Application for Permission to Reapply for Admission into the United States After Deportation or Removal"],
        ["30", "I-360 | Petition for Amerasian, Widow(er), or Special Immigrant"],
        ["31", "I-361 | Affidavit of Financial Support and Intent to Petition for Legal Custody for Public Law 97-359 Amerasian"],
        ["32", "I-363 | Request to Enforce Affidavit of Financial Support and Intent to Petition for Legal Custody for Public Law 97-359 Amerasian"],
        ["33", "I-485 Supplement A | Supplement A to Form I-485, Adjustment of Status Under Section 245(i)"]
    ],
    ["Consultations"],
    [
        ["34", "I-600A | Application for Advance Processing of an Orphan Petition"],
        ["35", "I-601A | Application for Provisional Unlawful Presence Waiver"],
        ["36", "I-602 | Application by Refugee for Waiver of Inadmissibility Grounds"],
        ["37", "I-687 | Application for Status as a Temporary Resident Under Section 245A of the Immigration and Nationality Act"],
        ["38", "I-690 | Application for Waiver of Grounds of Inadmissibility Under Sections 245A or 210 of the Immigration and Nationality Act"]
    ],
    ["Criminal Law"],
    [
        ["39", "I-191 | Application for Relief Under Former Section 212(c) of the Immigration and Nationality Act (INA)"],
        ["40", "I-193 | Application for Waiver of Passport and/or Visa"],
        ["41", "I-212 | Application for Permission to Reapply for Admission into the United States After Deportation or Removal"],
        ["42", "I-360 | Petition for Amerasian, Widow(er), or Special Immigrant"],
        ["43", "I-361 | Affidavit of Financial Support and Intent to Petition for Legal Custody for Public Law 97-359 Amerasian"],
        ["44", "I-363 | Request to Enforce Affidavit of Financial Support and Intent to Petition for Legal Custody for Public Law 97-359 Amerasian"]
    ],
    ["DACA"],
    [
        ["45", "I-956 | Application for Regional Center Designation"],
        ["46", "N-336 | Request for a Hearing on a Decision in Naturalization Proceedings"],
        ["47", "N-565 | Application for Replacement Naturalization/Citizenship Document"],
        ["48", "EOIR-29 | Notice of Appeal to the Board of Immigration Appeals from a Decision of a DHS Officer"],
        ["49", "G-639 | Freedom of Information/Privacy Act and Online FOIA Request"],
        ["50", "G-845 | Verification Request"],
        ["51", "G-1256 | Declaration for Interpreted USCIS Interview"]
    ],
    ["Deportation Defense"],
    [
        ["1", "I-864 | Affidavit of Support Under Section 213A of the Act"],
        ["2", "I-864EZ | Affidavit of Support Under Section 213A of the Act"],
        ["3", "I-907 | Request for Premium Processing Service"],
        ["4", "N-300 | Application to File Declaration of Intention"],
        ["5", "N-648 | Medical Certification for Disability Exceptions"],
        ["6", "G-1145 | E-Notification of Application/Petition Acceptance"],
        ["7", "I-90 | Application to Replace Permanent Resident Card"]
    ],
    ["Employment Visa"],
    [
        ["1", "I-956K | Application for Religious Worker Visa"],
        ["2", "G-325A | Biographic Information"],
        ["3", "I-129CWR | Petition for a CNMI-Only Nonimmigrant Transitional Worker"],
        ["5", "I-942 | Request for Deferral of Deportation or Removal"],
        ["6", "I-942P S | HHS or ORR 1-912 Supplement | Request for Deferral of Removal Supplement"],
        ["7", "I-956F | Application for T Nonimmigrant Status"]
    ],
    ["Family Law"],
    [
        ["1", "I-956H | Declaration for Detained U Nonimmigrant Status"],
        ["2", "G-1055 | Request for Certification for U Nonimmigrant Status"],
        ["3", "N-426 | Request for Certification of Military or Naval Service"],
        ["4", "AR-11 | Aliens Change of Address Card"],
        ["5", "G-1041 | Genealogy Index Search Request"],
        ["6", "G-1041A | Genealogy Records Request"],
        ["7", "I-865 | Sponsors Notice of Change of Address"]
    ],
    ["I-601"],
    [
        ["1", "I-821 | Application for Temporary Protected Status"],
        ["2", "I-824 | Application for Action on an Approved Application or Petition"],
        ["3", "I-881 | Application for Suspension of Deportation or Special Rule Cancellation of Removal"],
        ["4", "I-914 | Application for T Nonimmigrant Status"],
        ["5", "I-918 | Petition for U Nonimmigrant Status"],
        ["6", "I-941 | Application for Entrepreneur Parole"],
        ["7", "N-400 | Application for Naturalization"]
    ],
    ["I-918"],
    [
        ["1", "EOIR-29 | Notice of Appeal to the Board of Immigration Appeals from a Decision of a DHS Officer"],
        ["2", "G-639 | Freedom of Information/Privacy Act and Online FOIA Request"],
        ["3", "G-845 | Verification Request"],
        ["4", "G-1256 | Declaration for Interpreted USCIS Interview"],
        ["5", "I-134 | Declaration of Financial Support"],
        ["6", "I-134A | Online Request to be a Supporter and Declaration of Financial Support"],
        ["7", "I-290B | Notice of Appeal or Motion"]
    ],
    ["Naturalization"],
    [
        ["1", "I-765 | Application for Employment Authorization"],
        ["2", "I-800 | Petition to Classify Convention Adoptee as an Immediate Relative"],
        ["3", "I-800A | Supplement 3 | Request for Action on Approved Form I-800A"],
        ["4", "I-864 | Affidavit of Support Under Section 213A of the Act"],
        ["5", "I-864EZ | Affidavit of Support Under Section 213A of the Act"],
        ["6", "I-907 | Request for Premium Processing Service"]
    ],
    ["Ninth Circuit Appeals"],
    [
        ["1", "I-765V | Application for Employment Authorization for Abused Nonimmigrant Spouse"],
        ["2", "I-821 | Application for Temporary Protected Status"],
        ["3", "I-824 | Application for Action on an Approved Application or Petition"],
        ["4", "I-881 | Application for Suspension of Deportation or Special Rule Cancellation of Removal"],
        ["5", "I-914 | Application for T Nonimmigrant Status"],
        ["6", "I-918 | Petition for U Nonimmigrant Status"]
    ],
    ["NVC"],
    [
        ["1", "I-526E | Immigrant Petition by Regional Center Investor"],
        ["2", "I-566 | Interagency Record of Request -- A, G or NATO Dependent Employment Authorization or Change/Adjustment to/from A, G or NATO Status"],
        ["3", "I-589 | Application for Asylum and for Withholding of Removal"],
        ["4", "I-601 | Application for Waiver of Grounds of Inadmissibility"],
        ["5", "I-612 | Application for Waiver of the Foreign Residence Requirement"],
        ["6", "I-698 | Application to Adjust Status from Temporary to Permanent Resident"]
    ],
    ["Personal Injury"],
    [
        ["1", "AR-11 | Aliens Change of Address Card"],
        ["2", "G-1041 | Genealogy Index Search Request"],
        ["3", "G-1041A | Genealogy Records Request"],
        ["4", "I-865 | Sponsors Notice of Change of Address"],
        ["5", "I-945 | Public Transportation Benefit Fraud Assessment Questionnaire"],
        ["6", "I-956G | Notice of Entry of Appearance as Attorney or Representative"],
        ["7", "I-864A | Contract between Sponsor and Household Member"]
    ],
    ["Petition I-130"],
    [
        ["1", "I-864W | Request for Exemption for Intending Immigrants Affidavit of Support"],
        ["2", "I-929 | Petition for Qualifying Family Member of a U-1 Nonimmigrant"],
        ["3", "I-956 | Application for Regional Center Designation"],
        ["4", "N-336 | Request for a Hearing on a Decision in Naturalization Proceedings"],
        ["5", "N-565 | Application for Replacement Naturalization/Citizenship Document"],
        ["6", "EOIR-29 | Notice of Appeal to the Board of Immigration Appeals from a Decision of a DHS Officer"],
        ["7", "G-639 | Freedom of Information/Privacy Act and Online FOIA Request"],
        ["8", "G-845 | Verification Request"]
    ],
    ["Research"],
    [
        ["1", "I-824 | Application for Action on an Approved Application or Petition"],
        ["2", "I-881 | Application for Suspension of Deportation or Special Rule Cancellation of Removal"],
        ["3", "I-914 | Application for T Nonimmigrant Status"],
        ["4", "I-918 | Petition for U Nonimmigrant Status"],
        ["5", "I-941 | Application for Entrepreneur Parole"],
        ["6", "N-400 | Application for Naturalization"]
    ],
    ["SIJS"],
    [
        ["1", "I-589 | Application for Asylum and for Withholding of Removal"],
        ["2", "I-601 | Application for Waiver of Grounds of Inadmissibility"],
        ["3", "I-612 | Application for Waiver of the Foreign Residence Requirement"],
        ["4", "I-698 | Application to Adjust Status from Temporary to Permanent Resident"],
        ["5", "I-765V | Application for Employment Authorization for Abused Nonimmigrant Spouse"],
        ["6", "I-821 | Application for Temporary Protected Status"]
    ],
    ["TPS"],
    [
        ["1", "G-639 | Freedom of Information/Privacy Act and Online FOIA Request"],
        ["2", "G-845 | Verification Request"],
        ["3", "G-1256 | Declaration for Interpreted USCIS Interview"],
        ["4", "I-134 | Declaration of Financial Support"],
        ["5", "I-134A | Online Request to be a Supporter and Declaration of Financial Support"],
        ["6", "I-290B | Notice of Appeal or Motion"]
    ],
    ["T-Visa"],
    [
        ["1", "I-508 | Request for Waiver of Grounds of Inadmissibility"],
        ["2", "I-600 | Petition to Classify Orphan as an Immediate Relative"],
        ["3", "I-694 | Notice of Appeal of Decision"],
        ["4", "I-765 | Application for Employment Authorization"],
        ["5", "I-800 | Petition to Classify Convention Adoptee as an Immediate Relative"],
        ["6", "I-800A | Supplement 3 | Request for Action on Approved Form I-800A"]
    ],
    ["U-Visa"],
    [
        ["1", "I-90 | Application to Replace Permanent Resident Card"],
        ["2", "I-129CW | Petition for a CNMI-Only Nonimmigrant Transitional Worker"],
        ["3", "I-131A | Application for Travel Document (Carrier Documentation)"],
        ["4", "I-817 | Application for Family Unity Benefits"],
        ["5", "I-829 | Petition by Entrepreneur to Remove Conditions"],
        ["6", "I-864P | Affidavit of Support Under Section 213A of the Act"],
        ["7", "I-912 | Request for Fee Waiver"]
    ],
    ["VAWA"],
    [
        ["1", "I-905 | Application for Authorization to Issue Certification for Health Care Workers"],
        ["2", "I-910 | Application for Civil Surgeon Designation"],
        ["3", "I-956K | Application for Religious Worker Visa"],
        ["4", "G-325A | Biographic Information"],
        ["5", "I-129CWR | Petition for a CNMI-Only Nonimmigrant Transitional Worker"],
        ["6", "I-131 | Application for Travel Document"]
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

function addApplicationsToView(name, numContact, numService){
    // necessary values: serviceId, applcationName, applicationId
    // get application from predefined list, then we determined which to show depending on the selected service
    // applications are checkboxes in the view, if a checkbox is true then is added to the json
    // check applications

    // call method to get applications array and assign it to variable
    let applicationsFound = getApplicationsArray(name);
    // check if there was an array for the name of the service
    if(applicationsFound) {
        console.log(applicationsFound);        
        for (let i = 0; i < applicationsFound.length; i++){
            let index = contractJSON.contract.contacts[numContact].services[numService].applications.findIndex(function (applications){
                return applications.applicationName === applicationsFound[i][1];
            });
            let html;
            if (index >= 0) {
                html = `<li class="list-group-item">
                            <div class="row">
                                <div class="col-sm-10">
                                    <label class="form-check-label stretched-link" for="CB${applicationsFound[i][0]}Beneficiary${numContact}Service${numService}">${applicationsFound[i][1]}</label>
                                </div>
                                <div class="col-sm-2 text-end">
                                    <input class="form-check-input me-1" type="checkbox" value="" id="CB${applicationsFound[i][0]}Beneficiary${numContact}Service${numService}" checked>
                                </div>
                            </div>
                        </li>`;
            } else {
                html = `<li class="list-group-item">
                            <div class="row">
                                <div class="col-sm-10">
                                    <label class="form-check-label stretched-link" for="CB${applicationsFound[i][0]}Beneficiary${numContact}Service${numService}">${applicationsFound[i][1]}</label>
                                </div>
                                <div class="col-sm-2 text-end">
                                    <input class="form-check-input me-1" type="checkbox" value="" id="CB${applicationsFound[i][0]}Beneficiary${numContact}Service${numService}">
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
function loadContract(){
    // make main contact in contract the same as the contact for the matter
    // load all values if update
    contractJSON = 
    {
        "contract":{
            'matterId':"",
            'signDate':"",
            'contractTotalAmount':"",
            'downPaymentAmount':"",
            'dateDownPayment':"",        
            'numberOfMonthlyPayments':"",
            'monthlyPaymentsTotalAmount':"",
            'monthlyPayments':[],
            'contacts':[]
        }
    };
}

function sendRequest(){
    let listOfWrongValues = checkContractValues();

    if(listOfWrongValues == null || listOfWrongValues == undefined || listOfWrongValues.length == 0) {
        let data = {};
        let listContactsApplications = [];
        let listRoleContacts = [];
        let listPaymentPlans = [];
        let request = {};

        data.idcontractlanguage = document.getElementById('contractLanguage').value;

        // Down Payment
        let downPaymentPlan = {};
        downPaymentPlan.amountpaymentplan = parseFloat(contractJSON.contract.downPaymentAmount);
        downPaymentPlan.datepaymentplan = formatDates(contractJSON.contract.dateDownPayment);
        downPaymentPlan.idpaymentplantype = 2;

        listPaymentPlans.push(downPaymentPlan);

        // Monthly Charges
        for(let i = 0 ; i < Object.keys(contractJSON.contract.monthlyPayments).length ; i++){
            let montlhlyPlan = {};
            montlhlyPlan.amountpaymentplan = parseFloat(contractJSON.contract.monthlyPayments[i].amount);
            montlhlyPlan.datepaymentplan = formatDates(contractJSON.contract.monthlyPayments[i].date);
            montlhlyPlan.idpaymentplantype = 1;

            listPaymentPlans.push(montlhlyPlan);
        }

        for(let i = 0 ; i < Object.keys(contractJSON.contract.contacts).length ; i++){
            let roleContacts = {};
            roleContacts.idcontractrole = parseInt(contractJSON.contract.contacts[i].contactRole);
            roleContacts.idcontact = parseInt(contractJSON.contract.contacts[i].contactId);

            listRoleContacts.push(roleContacts);
        }

        listContactsApplications = contractJSON.contract.contacts.flatMap(nameObj => {
            return nameObj.services.flatMap(typeObj => {
            return typeObj.applications.map(subtypeObj => ({
                idcontractapplication: subtypeObj.applicationId,
                idcontact: parseInt(nameObj.contactId)
            }));
            });
        });
        
        request.contracts = data;
        request.applicationsContactsList = listContactsApplications;
        request.roleContactsList = listRoleContacts;
        request.contractPaymentPlansList = listPaymentPlans;
        //generate();
        saveRow(create, null, request, null, 'https://test.counselmanager.com/matters/0', null);
        console.log(JSON.stringify(request));
    } else {
        console.log(listOfWrongValues);

        swal.fire({
            title: 'Error',
            html: 'Cannot proceed with empty / invalid values: \n <pre class="text-start">' + listOfWrongValues + '</pre>',
            icon: 'error',
            allowOutsideClick: false,
            allowEscapeKey: false
        });
    }
}

function loadContacts(num){
    // get contacts related values
    // add them to a select

}

// necessary values: contact name, contact relationship, beneficiary or main client
// insert contact to view and json with empty services
function addContact(name, relation){
    let numContacts = Object.keys(contractJSON.contract.contacts).length;
    let contactRole;

    if(numContacts === 0){
        contactRole = "1";
        relation = "";
    } else {
        contactRole = "2";
    }

    contractJSON.contract.contacts.push(
        {
            'contactName':name,
            'contactRole': contactRole,
            'contactRelation':relation,
            'contactId': '110',
            'services':[]
        }
    );
    let html = addBeneficiaryViewContent(numContacts,relation, contactRole); // add query to get the relation of the contact in the contract (son, mom, brother, sibling, ...)
    document.getElementById("listBeneficiaries").insertAdjacentHTML("beforeend", html);
    setFstDropdown();
    fillSelectFSByTagsArrayLocal(servicesArray, 'ContactServicesSelect'+numContacts+'', null);
    document.querySelector('#ContactServicesSelect'+numContacts+'').fstdropdown.setValue(0);
    // get num of contacts
}

function addServicet(num){
    const selectService = document.getElementById('ContactServicesSelect'+num);
    const serviceId = selectService.value;
    console.log(serviceId);
    const serviceName = selectService.options[selectService.selectedIndex].text;
    console.log(serviceName);
}

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
        if(contractJSON.contract.contacts[num].services.some(el => el.serviceId === serviceId)){
            sweetAlert(2, 'Service already added to the list', null);
        } else {
            let numServices = Object.keys(contractJSON.contract.contacts).length;
            contractJSON.contract.contacts[num].services.push(
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

function adjustmentPositioning(){
    const highlightedItems = document.querySelectorAll("a");
    [].forEach.call(highlightedItems, function(atag) {
        var attrValue = atag.getAttribute("href");
        attrValue == "javascript:void(0);" ? null : atag.setAttribute("href", "#;");        
    });
}

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
            titleContact.innerText = section+' ('+Object.keys(contractJSON.contract.contacts[num].services).length+')';
        } else {
            titleContact.innerText = section;
        }      
    }
}

function removeBeneficiary(num) {
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
                contractJSON.contract.contacts.splice(num,1);
                contact.remove();
            }
        });
    }
}

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
                let index = contractJSON.contract.contacts[num].services.findIndex(function (services){
                    return services.serviceId == nums;
                });
                if(index >= 0){
                    contractJSON.contract.contacts[num].services.splice(index,1);
                    // check if current service is selected then remove the applications options
                    if($( "#Contact"+num+"Service"+nums ).find( "li" ).hasClass("active")){
                        document.getElementById("Contact" + num + "ApplicationsContainer").innerHTML = "";
                    }
                    service.remove();
                    if (Object.keys(contractJSON.contract.contacts[num].services).length === 0) {
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

function addBeneficiaryViewContent(num, relation, role){
    let roleContact;
    if(relation.length==0 || relation===null || relation===""){
        relation = '';
    }
    switch(role){
        case '1':
            roleContact = 'Primary';
            break;
        case '2':
            roleContact = 'Beneficiary';
            break;
        default:
            roleContact = 'Part of Contract';
    }
    let html = `<div class="row align-items-start mb-4" id="${num}Contact">
                    <div class="col">
                        <div class="mb-3">
                            <div class="d-flex">
                                <div class="p-2">
                                    <label for="${num}ContactName" class="form-label mb-2">${roleContact} (${relation})</label>
                                </div>
                                <div class="p-2 ms-auto">
                                    <a class="text-danger" href="#;" onclick="removeBeneficiary(${num})">
                                        <span class="material-symbols-outlined">do_not_disturb_on</span>
                                    </a>
                                </div>
                            </div>  
                            <input type="text" class="form-control" id="${num}ContactName">
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
                            <div class="p-2 me-auto ms-auto">
                                <a class="text-black" href="#;" onclick="hideElementContacts(${num}, 'Applications')">
                                    <span class="material-symbols-outlined visually-hidden" id="${num}ContactApplicationsIcon">visibility</span>
                                </a>
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
