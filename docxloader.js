function findKeysWithNullOrZero(jsonObject) {
    let keysWithNullOrZero = [];

    function exploreObject(obj, path = '') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let currentPath = path ? `${path}.${key}` : key;
                if (obj[key] === null || obj[key] === 0 || obj[key] == 0 || obj[key] == "" || obj[key] == '') {
                    keysWithNullOrZero.push(currentPath);
                } else if (typeof obj[key] === 'object') {
                    exploreObject(obj[key], currentPath);
                }
            }
        }
    }

    exploreObject(jsonObject);

    return keysWithNullOrZero;
}

function replaceArrayValues(originalArray, replacements) {
    return originalArray.map(item => replacements[item] || item);
}

let replacements = {
//"signDate": "",
"contractTotalAmount": "Total Contract Amount",
"downPaymentAmount": "Amount of Down Payment (Deposit)",
"dateDownPayment": "Date of Down Payment",
"numberOfMonthlyPayments": "Number of Monthly Charges",
"monthlyPaymentsTotalAmount": "Total Amount of Monthly Charges"
};

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}
window.generate = function generate() {
    console.log(parseInt(Object.keys(contractJSON.contract.monthlyPayments).length));
    
    let emptyKeys =  replaceArrayValues(findKeysWithNullOrZero(contractJSON.contract), replacements);
    console.log(emptyKeys[0]);
    if(emptyKeys.length != 0){

        let listEmptyKeys = '';

        emptyKeys.forEach(element => {
            listEmptyKeys += "- " + element + "\n";
        });
        console.log(listEmptyKeys);
        /*swal({
            title: 'Error',
            text: 'Cannot proceed with empty values: ' + '\nd',
            icon: 'error',
            button: 'Ok',
            closeOnClickOutside: false,
            closeOnEsc: false,
            html: '<pre>' + listEmptyKeys + '</pre>',
            customClass: {
                popup: 'format-pre'
            }
        });*/

        swal.fire({
            html: '<pre>' + listEmptyKeys + '</pre>',
            customClass: {
              popup: 'format-pre'
            }
        });

        //swal({ title: 'hi', html: 'First line Second line' });

        /*const lines = ['line_1', 'line_2', 'line_3'];
        swal(lines.join('<br>')); // it works
        swal({ text: lines.join('<br>') }); // it does not work*/

        //swal({buttons: ["Wait ", "Add Details"], html: true, text: "Text one .\n  Text 2.\n Text 3." });


    } else {
        loadFile(
            //"C:/Users/Mira/node_modules/html-docx-js/test/example.docx",
            //"https://docxtemplater.com/tag-example.docx",
            //"https://netorgft7771403-my.sharepoint.com/:w:/g/personal/fpineda_miralawgroup_com/ESpflsl_FrlHqK_qYdy-YS4BZztNaUeRmlbNa3BwEhr6IA?e=sZ0UA7",
            "" + base_url + "docsxup_hidden/contracts/example.docx",
            function (error, content) {
                if (error) {
                    throw error;
                }
                const zip = new PizZip(content);
                const doc = new window.docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });
    
                // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
                doc.render({
                    first_name: "Fernando Rodrigo",
                    last_name: "Pineda Funes",
                    contractTotalAmount: contractJSON.contract.contractTotalAmount,
                    downPaymentAmount: contractJSON.contract.downPaymentAmount,
                    dateDownPayment: contractJSON.contract.dateDownPayment,
                    numberOfMonthlyPayments: contractJSON.contract.numberOfMonthlyPayments,
                    monthlyPaymentsTotalAmount: contractJSON.contract.monthlyPaymentsTotalAmount,
                    monthlyPayments: contractJSON.contract.monthlyPayments,
                    monthlyPaymentsfirstd: contractJSON.contract.monthlyPayments[0].date,
                    monthlyPaymentslastd: contractJSON.contract.monthlyPayments[contractJSON.contract.monthlyPayments.length - 1].date,
                    monthlyPaymentsfirsta: contractJSON.contract.monthlyPayments[0].amount
                });
    
                const blob = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    // compression: DEFLATE adds a compression step.
                    // For a 50MB output document, expect 500ms additional CPU time
                    compression: "DEFLATE",
                });
                // Output the document using Data-URI
                saveAs(blob, "output.docx");
            }
        );
    }
};
