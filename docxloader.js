function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

var backSlash = '\u005C';

function addpPr(){
    let pPr = "<w:pPr>";
    pPr += "<w:numPr><w:ilvl w:val=\"3\"/><w:numId w:val=\"1\"/></w:numPr>";
    pPr += "<w:ind w:left=\"2127\" w:hanging=\"567\"/><w:jc w:val=\"both\"/>";
    pPr += "<w:rPr><w:sz w:val=\"22\"/><w:szCs w:val=\"22\"/><w:lang w:val=\"es-ES\"/></w:rPr></w:pPr>";
    return pPr;
}

function newT(text, bold, underline) {
    let r = "<w:r><w:rPr>";
    if(bold != null || bold !== null || bold){
        r+= "<w:b/>";
    }
    r += "<w:sz w:val=\"22\"/><w:szCs w:val=\"22\"/><w:lang w:val=\"es-ES\"/>";
    if(underline != null || underline !== null || underline){
        r+= "<w:u w:val=\"single\"/>";
    }
    r+= "</w:rPr>";
    r+= "<w:t xml:space=\"preserve\">" + text + "</w:t></w:r>"
    return r;
}

var docDir;
var newArray;
var clientsToWord = [];
var servicesToWord = [];
var nameMainClient;
function adjustDOCXData() {
    if(selectedLang == 1 || selectedLang === 1) {
        docDir = "docsxup_hidden/files/contract_templates/examplenew.docx";

        contractJSON.contract.contacts.forEach((currentContact) => {
            var roleText;

            if(currentContact.contactRole == 1 || currentContact.contactRole == '1'){
                roleText = "Victim";
                nameMainClient = currentContact.contactName.toUpperCase();
                clientsToWord.unshift(
                    {
                        'name_client': currentContact.contactName.toUpperCase(),
                        'role_client': roleText
                    }
                );
            } else {
                roleText = "Beneficiary";
                clientsToWord.push(
                    {
                        'name_client': currentContact.contactName.toUpperCase(),
                        'role_client': roleText
                    }
                );
            }
   
            currentContact.services.forEach((currentService) => {
                var applicationsArray = [];
                currentService.applications.forEach((currentApplication) => {
                    // Create a new XML document
                    var xmlDoc = "<w:p>";
                    // applications id's from 130 to 133 and from 144 and 146 corresponds to research applications
                    if((currentApplication.applicationId >= 130 && currentApplication.applicationId <= 133) || (currentApplication.applicationId >= 144 && currentApplication.applicationId <= 146)) {
                        if (currentApplication.applicationId == 133 || currentApplication.applicationId == 146) {
                            xmlDoc += addpPr();
                            xmlDoc += newT("Request for Criminal Record with the ", null, null );
                            xmlDoc += newT("FBI", true, null);
                            xmlDoc += newT(" for ", null, null );
                            xmlDoc += newT(currentContact.contactName.toUpperCase(), true, null);
                            xmlDoc += "</w:p>";
                            applicationsArray.push(
                                {
                                    "complexXml": xmlDoc
                                }
                            );
                        } else {
                            xmlDoc += addpPr();
                            xmlDoc += newT("Petition ", null, null);
                            xmlDoc += newT(currentApplication.applicationShortName, true, null);
                            xmlDoc += newT(" for ", null, null);
                            xmlDoc += newT(currentContact.contactName.toUpperCase(), true, null);
                            xmlDoc += "</w:p>";
                            applicationsArray.push(
                                {
                                    "complexXml": xmlDoc
                                }
                            );
                        }
                    } else if (currentApplication.applicationId == 1) {
                        xmlDoc += addpPr();
                        xmlDoc += newT("Petition for Alien Relative ", null, null );
                        xmlDoc += newT(currentApplication.applicationShortName, true, null);
                        xmlDoc += newT(" in favour of ", null, null );
                        xmlDoc += newT(currentContact.contactName.toUpperCase(), true, null);
                        xmlDoc += "</w:p>";
                        applicationsArray.push(
                            {
                                "complexXml": xmlDoc
                            }
                        );
                    } else if (currentApplication.applicationId == 107) {
                        xmlDoc += addpPr();
                        xmlDoc += newT(currentApplication.applicationShortName, true, null);
                        xmlDoc += newT("Petition for ", null, null );
                        xmlDoc += newT(currentContact.contactName.toUpperCase(), true, null);
                        xmlDoc += "</w:p>";
                        applicationsArray.push(
                            {
                                "complexXml": xmlDoc
                            }
                        );
                    } else {
                        xmlDoc += addpPr();
                        xmlDoc += newT("Application for ", null, null );
                        xmlDoc += newT(currentApplication.applicationShortName, true, null);
                        xmlDoc += newT(" in favour of ", null, null );
                        xmlDoc += newT(currentContact.contactName.toUpperCase(), true, null);
                        xmlDoc += "</w:p>";
                        applicationsArray.push(
                            {
                                "complexXml": xmlDoc
                            }
                        );
                    }
                    
                });

                switch(currentService.serviceName) {
                    case 'Research':
                        servicesToWord.push(
                            {
                                'service_text1': "Application to obtain records",
                                'service_boldunder1': null,
                                'service_text2': null,
                                'service_client': currentContact.contactName.toUpperCase(),
                                'applications': applicationsArray,
                                'hasText1': true,
                                'hasBoldUnder1': false,
                                'hasText2': false
                            }
                        );
                    break;

                    case 'I-130 (Petition)':
                        servicesToWord.push(
                            {
                                'service_text1': "Immigration relief being applied to:",
                                'service_boldunder1': "Petition for Alien Relative.",
                                'service_text2': "Consists of the following:",
                                'service_client': currentContact.contactName.toUpperCase(),
                                'applications': applicationsArray,
                                'hasText1': true,
                                'hasBoldUnder1': true,
                                'hasText2': true
                            }
                        );
                    break;

                    default:
                        servicesToWord.push(
                            {
                                'service_text1': "Immigration relief being applied to:",
                                'service_boldunder1': currentService.serviceName,
                                'service_text2': "It comprises the following",
                                'service_client': currentContact.contactName.toUpperCase(),
                                'applications': applicationsArray,
                                'hasText1': true,
                                'hasBoldUnder1': true,
                                'hasText2': true
                            }
                        );
                    break;
                }
            });
        });
    } else {
        docDir = "docsxup_hidden/files/contract_templates/examplenew.docx";

        contractJSON.contract.contacts.forEach((currentContact) => {
            var roleText;

            if(currentContact.contactRole == 1 || currentContact.contactRole == '1'){
                roleText = "Victima";
                nameMainClient = currentContact.contactName.toUpperCase();
            } else {
                roleText = "Beneficiario/a";
            }

            clientsToWord.push(
                {
                    'name_client': currentContact.contactName.toUpperCase(),
                    'role_client': roleText
                }
            );
            
            currentContact.services.forEach((currentService) => {
                var applicationsArray = [];
                currentService.applications.forEach((currentApplication) => {
                    if((currentApplication.applicationId >= 130 && currentApplication.applicationId <= 133) || (currentApplication.applicationId >= 144 && currentApplication.applicationId <= 146)) {
                        applicationsArray.push(
                            {
                                application_message: "Petición " + currentApplication.applicationName + " para "
                            }
                        );
                    } else {
                        applicationsArray.push(
                            {
                                application_message: "Application para " + currentApplication.applicationName + " en favor de "
                            }
                        );
                    }
                });

                servicesToWord.push(
                    {
                        'service_message': "Socorro migratorio al que se aplica: " + currentService.serviceName + " Comprende lo siguiente",
                        'service_client': currentContact.contactName.toUpperCase(),
                        'applications': applicationsArray
                    }
                );

            });
        });
    }
    console.log(clientsToWord);
    console.log(servicesToWord);
}

/* window.generate =*/ function generate() {
    adjustDOCXData();
    loadFile(
        //"C:/Users/Mira/node_modules/html-docx-js/test/example.docx",
        //"https://docxtemplater.com/tag-example.docx",
        //"https://netorgft7771403-my.sharepoint.com/:w:/g/personal/fpineda_miralawgroup_com/ESpflsl_FrlHqK_qYdy-YS4BZztNaUeRmlbNa3BwEhr6IA?e=sZ0UA7",
        "" + base_url + docDir,
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
                monthlyPaymentsfirsta: contractJSON.contract.monthlyPayments[0].amount,
                clients: clientsToWord,
                services: servicesToWord,
                uppcase_full_name_principal: nameMainClient
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
            // saveAs(blob, "CARRANZA_JOSE_U_VISA_Contract.docx");
            uploadDocument(blob);
        }
    );
};
