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

const caseMapping = {
    1: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petition for Alien Relative ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    2: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Waiver Request (", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(") for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    4: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Submission of Form ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(", Adjustment of Status to Permanent Resident in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    8: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    13: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Submission of Form ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" TPS (Temporary Protected Status)", true, null );
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    17: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Applications to U-Visa (", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(") for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    19: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentation and submission of application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" for the Client ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    35: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petition for Amerasian, Widow(er), Special Immigrant ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    46: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Medical and Vaccination Report) in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    57: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" FOIA ", true, null );
        xmlDoc += newT("petition with ", null, null );
        xmlDoc += newT("USCIS", true, null );
        xmlDoc += newT(" for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    76: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Renewal of Permanent Resident Card) ", true, null );
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    107: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" Petition for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    108: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    109: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    114: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petition of Certification 918-B", true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    118: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, null, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    119: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Convention Against Torture, ", null, null);
        xmlDoc += newT("I-589 (CAT)", true, null );
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    121: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    122: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request based on TPS ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    123: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request based on TPS ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    124: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    125: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    126: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    127: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    129: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" Petition for abandoned child in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    130: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("FOIA", true, null );
        xmlDoc += newT(" petition before ", null, null);
        xmlDoc += newT("USCIS", true, null );
        xmlDoc += newT(" for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" (Only if necessary).", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    131: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("FOIA", true, null );
        xmlDoc += newT(" petition before ", null, null);
        xmlDoc += newT("CBP", true, null );
        xmlDoc += newT(" for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" (Only if necessary).", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    132: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("FOIA", true, null );
        xmlDoc += newT(" petition before ", null, null);
        xmlDoc += newT("OBIM", true, null );
        xmlDoc += newT(" for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" (Only if necessary).", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    133: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Request for Criminal Record with the ", null, null );
        xmlDoc += newT("FBI", true, null);
        xmlDoc += newT(" for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    134: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT("I-589 (Defensive Asylum)", true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    135: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT("I-589 (Affirmative Asylum)", true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    144: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("FOIA", true, null );
        xmlDoc += newT(" petition before ", null, null);
        xmlDoc += newT("DOJ", true, null );
        xmlDoc += newT(" for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" (Only if necessary).", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    145: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("FOIA", true, null );
        xmlDoc += newT(" petition before ", null, null);
        xmlDoc += newT("DOS", true, null );
        xmlDoc += newT(" for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" (Only if necessary).", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    146: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Request for Criminal Record with the ", null, null );
        xmlDoc += newT("FBI", true, null);
        xmlDoc += newT(" for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    153: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, null, null );
        xmlDoc += newT(" Case in favor of ", null, null);
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    154: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, null, null );
        xmlDoc += newT(" Case in favor of ", null, null);
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    }
};

const defaultCase = function(appShortName, contactName) {
    // Default logic when no mapping is found
    let xmlDoc = "<w:p>";
    xmlDoc += addpPr();
    xmlDoc += newT("Application for ", null, null );
    xmlDoc += newT(appShortName, true, null);
    xmlDoc += newT(" in favor of ", null, null );
    xmlDoc += newT(contactName, true, null);
    xmlDoc += "</w:p>";
    return xmlDoc;
};

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
                    applicationsArray.push(
                        {
                            "complexXml": caseMapping[currentApplication.applicationId] ? caseMapping[currentApplication.applicationId](currentApplication.applicationShortName, currentContact.contactName.toUpperCase()) : defaultCase(currentApplication.applicationShortName, currentContact.contactName.toUpperCase())
                        }
                    );
                    
                    
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
            saveAs(blob, "CARRANZA_JOSE_U_VISA_Contract.docx");
            //uploadDocument(blob);
        }
    );
};

/** OLD APPLICATIONS LOGIC */
// // Create a new XML document
// var xmlDoc = "<w:p>";
// // applications id's from 130 to 133 and from 144 and 146 corresponds to research applications
// if((currentApplication.applicationId >= 130 && currentApplication.applicationId <= 133) || (currentApplication.applicationId >= 144 && currentApplication.applicationId <= 146)) {
//     if (currentApplication.applicationId == 133 || currentApplication.applicationId == 146) {
//         xmlDoc += addpPr();
//         xmlDoc += newT("Request for Criminal Record with the ", null, null );
//         xmlDoc += newT("FBI", true, null);
//         xmlDoc += newT(" for ", null, null );
//         xmlDoc += newT(currentContact.contactName.toUpperCase(), true, null);
//         xmlDoc += "</w:p>";
//         applicationsArray.push(
//             {
//                 "complexXml": xmlDoc
//             }
//         );
//     } else {
//         xmlDoc += addpPr();
//         xmlDoc += newT("Petition ", null, null);
//         xmlDoc += newT(currentApplication.applicationShortName, true, null);
//         xmlDoc += newT(" for ", null, null);
//         xmlDoc += newT(currentContact.contactName.toUpperCase(), true, null);
//         xmlDoc += "</w:p>";
//         applicationsArray.push(
//             {
//                 "complexXml": xmlDoc
//             }
//         );
//     }
// } else if (currentApplication.applicationId == 1) {
//     xmlDoc += addpPr();
//     xmlDoc += newT("Petition for Alien Relative ", null, null );
//     xmlDoc += newT(currentApplication.applicationShortName, true, null);
//     xmlDoc += newT(" in favor of ", null, null );
//     xmlDoc += newT(currentContact.contactName.toUpperCase(), true, null);
//     xmlDoc += "</w:p>";
//     applicationsArray.push(
//         {
//             "complexXml": xmlDoc
//         }
//     );
// } else if (currentApplication.applicationId == 4) {
//     xmlDoc += addpPr();
//     xmlDoc += newT("Submission of Form ", null, null );
//     xmlDoc += newT(currentApplication.applicationShortName, true, null);
//     xmlDoc += newT(", Adjustment of Status to Permanent Resident in favor of ", null, null );
//     xmlDoc += newT(currentContact.contactName.toUpperCase(), true, null);
//     xmlDoc += "</w:p>";
//     applicationsArray.push(
//         {
//             "complexXml": xmlDoc
//         }
//     );
// } else if (currentApplication.applicationId == 107) {
//     xmlDoc += addpPr();
//     xmlDoc += newT(currentApplication.applicationShortName, true, null);
//     xmlDoc += newT("Petition for ", null, null );
//     xmlDoc += newT(currentContact.contactName.toUpperCase(), true, null);
//     xmlDoc += "</w:p>";
//     applicationsArray.push(
//         {
//             "complexXml": xmlDoc
//         }
//     );
// } else {
//     xmlDoc += addpPr();
//     xmlDoc += newT("Application for ", null, null );
//     xmlDoc += newT(currentApplication.applicationShortName, true, null);
//     xmlDoc += newT(" in favor of ", null, null );
//     xmlDoc += newT(currentContact.contactName.toUpperCase(), true, null);
//     xmlDoc += "</w:p>";
//     applicationsArray.push(
//         {
//             "complexXml": xmlDoc
//         }
//     );
// }
