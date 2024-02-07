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

const caseMappingEN = {
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
        xmlDoc += newT("Request for Forgiveness (", null, null );
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
    9: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Request for Forgiveness ", null, null );
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
    16: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Applications for T Nonimmigrant Status (", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(") for ", null, null );
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
    21: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentation and submission of application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" for the Client ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    24: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Submission of application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" before USCIS, Notice to Appear as Attorney or Authorized Representative in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    25: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Submission of application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" before USCIS, Document Verification Request Supplement in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    29: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petition for a Nonimmigrant Worker ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    30: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petition for a Alien Fiancé(e) ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
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
    40: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" to Extend/Change Nonimmigrant Status in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    42: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Request for Forgiveness ", null, null );
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
    47: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" Petition for Refugee/Asylee Relative in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    48: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" Petition to Remove Conditions on Residence in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    51: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Request for Exemption for Intending Immigrant's Affidavit of Support ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    57: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" FOIA ", true, null );
        xmlDoc += newT("petition before ", null, null );
        xmlDoc += newT("USCIS", true, null );
        xmlDoc += newT(" for ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    58: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Verification Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    62: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Notice of Appeal or Motion ", null, true );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    67: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" for Employment Authorization in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    70: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Submission of Form ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    71: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Submission of Form ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    74: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Medical Certification for Disability Exceptions) in favor of ", null, null );
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
    78: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application for Travel Document (Carrier Documentation) ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    80: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petition by Investor to Remove Conditions on Permanent Resident Status ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    82: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Request for Fee Waiver ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    83: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Supplement, 2023 HHS Poverty Guidelines for Fee Waiver Request) in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    84: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Submission of application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Notice of Entry of Appearance as Attorney in Matters Outside the Geographical Confines of the United States) in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    86: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Request for Certificate of Non-Existence ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    93: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application for Travel Document ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    106: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Contract Between Sponsor and Household Member) in favor of ", null, null );
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
    110: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Representation for processing before the National Visa Center ", null, null );
        xmlDoc += newT("(NVC).", true, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    111: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Filing of Consular Petition Request before ", null, null );
        xmlDoc += newT("NVC", true, null );
        xmlDoc += newT(" and the ", null, null );
        xmlDoc += newT("Embassy of the United States of America", true, null );
        xmlDoc += newT(" in", null, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    112: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Representacion and processing in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" before the National Visa Center ", null, null );
        xmlDoc += newT("(NVC).", true, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    113: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application to U-Visa (", null, null );
        xmlDoc += newT("I-918A", true, null);
        xmlDoc += newT(") in favor of ", null, null );
        xmlDoc += newT(contactName, true, null );
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
    115: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application to T-Visa (", null, null );
        xmlDoc += newT("I-914A", true, null);
        xmlDoc += newT(") in favor of ", null, null );
        xmlDoc += newT(contactName, true, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    116: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petition of Delaration of Law Enforcement Officer 914-B", true, null );
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    117: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Political Asylum in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    118: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Deferral of Deportation in favor of ", null, null );
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
    120: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
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
    136: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Legal Representation in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" for the following charges:", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    138: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Cancellation of Removal for Certain Permanent Residents) in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    139: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Cancellation of Removal and Adjustment of Status for Certain Nonpermanent Residents) in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    140: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Submission of Form ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    141: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Electronic Nonimmigrant Visa Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    142: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application for a U.S. Passport ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    143: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
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
    147: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    148: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Submission of application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" before the Immigration Court, Notice of Entry of Appearance as Attorney or Representative in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    149: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    150: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Work Permit Request ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" in favor of ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    151: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Appeal before the Board of Immigration Appeals (BIA) in favor of", null, true );
        xmlDoc += newT(" ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(": Legal Representation for filing of appeal to be submitted to the Board of Immigration Appeals (BIA).", null, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    152: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Appellate filing before the 9th Circuit Federal Court", null, null);
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

const caseMappingES = {
    1: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición para familiar extranjero ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    2: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición de Perdón (", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(") para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    4: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación: ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(", Ajuste de Estado a Residente Permanente a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    8: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Asilo Político a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" por medio de sometimiento de aplicación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    9: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición de Perdón ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    13: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentación de Forma ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" TPS (Estatus de Protección Temporal)", true, null );
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    16: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación para Visa-T (", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(") a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    17: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación para Visa-U (", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(") a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    19: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentación de Aplicación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    21: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentación de Aplicación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    24: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentación de forma ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" ante USCIS, Notificación sobre Comparecencia como Abogado o Representante Autorizado a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    25: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentación de forma ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" ante USCIS, Solicitud de Verificación a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    29: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición para Trabajador No Inmigrante ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    30: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición de Prometido o Prometida Extranjero(a) ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    35: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición para Amerasiático, Viudo(a), Inmigrante Especial ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    40: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" para Extender/Cambiar de Estatus de No Inmigrante a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    42: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición de Perdón ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    46: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Informe médico y de vacunación) a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    47: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" Petición de Familiar Refugiado/Asilado a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    48: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" Petición para Cancelar las Condiciones en la Residencia a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    51: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Solicitud de Excención de la Declaración Jurada de Patrocinio Económico de Posible Inmigrante ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    57: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" FOIA ", true, null );
        xmlDoc += newT("frente a ", null, null );
        xmlDoc += newT("USCIS", true, null );
        xmlDoc += newT(" para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    58: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Solicitud de Verificación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    62: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aviso de Apelación o Moción ", null, true );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    67: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" para solicitar permiso de trabajo en favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    70: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación ", null, null);
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null);
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" para probar suficiencia económica dentro de los Estados Unidos. ", null, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    71: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentación de forma ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    74: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Certificación Médica para Excenciones por Discapacidad) a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    76: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Renovación de tarjeta de Residente Permanente)", true, null );
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    78: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Solicitud de Documento de Viaje (Documento para Transporte) ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    80: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición de Inversionista para Eliminar Condiciones en Estatus de Residente Permanente ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    82: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición de Exención de Tarifas ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    83: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Guías de Pobreza de HHS para Solicitud de Exención de Tarifas de 2023) a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    84: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentación de forma ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Notificación sobre Comparecencia como Abogado en Asuntos Fuera de los Límites Geográficos de los Estados Unidos) a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    86: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Solicitud de Certificado de Inexistencia ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    93: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Solicitud de Documento de Viaje ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    106: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Contrato entre el Patrocinador y el Miembro del Grupo Familiar) a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    107: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    108: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    109: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    110: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Representación para proceso frente al Centro Nacional de Visas (", null, null );
        xmlDoc += newT("NVC", true, null );
        xmlDoc += newT(" por sus siglas en inglés).", null, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    111: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentación de Petición para Proceso Consular frente a ", null, null );
        xmlDoc += newT("NVC", true, null );
        xmlDoc += newT(" y la Embajada de ", null, null );
        xmlDoc += newT("Los Estados Unidos de América", true, null );
        xmlDoc += newT(" en", null, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    112: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Representación y proceso a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" frente al Centro Nacional de Visas (", null, null );
        xmlDoc += newT("NVC", true, null );
        xmlDoc += newT(" por sus siglas en inglés).", null, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    113: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación para Visa-U (", null, null );
        xmlDoc += newT("I-918A", true, null);
        xmlDoc += newT(") a favor de ", null, null );
        xmlDoc += newT(contactName, true, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    114: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición de Certificación 918-B", true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    115: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación para Visa-T (", null, null );
        xmlDoc += newT("I-914A", true, null);
        xmlDoc += newT(") a favor de ", null, null );
        xmlDoc += newT(contactName, true, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    116: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición de Declaración de un Oficial del Orden Público 914-B", true, null );
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    117: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Asilo Político a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    118: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplazamiento de Deportación a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    119: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Convención Contra Tortura, ", null, null);
        xmlDoc += newT("I-589 (Bajo amparo CAT)", true, null );
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    120: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("I-765 WS (Hoja de Trabajo)", true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    121: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    122: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo basado en TPS a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    123: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Permiso de trabajo basado en TPS ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    124: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    125: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    126: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    127: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    129: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición de Tutela para menor abandonado a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    130: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición ", null, null);
        xmlDoc += newT("FOIA", true, null );
        xmlDoc += newT(" con ", null, null);
        xmlDoc += newT("USCIS", true, null );
        xmlDoc += newT(" para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" (Solo si es necesario).", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    131: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición ", null, null);
        xmlDoc += newT("FOIA", true, null );
        xmlDoc += newT(" con ", null, null);
        xmlDoc += newT("CBP", true, null );
        xmlDoc += newT(" para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" (Solo si es necesario).", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    132: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición ", null, null);
        xmlDoc += newT("FOIA", true, null );
        xmlDoc += newT(" con ", null, null);
        xmlDoc += newT("OBIM", true, null );
        xmlDoc += newT(" para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" (Solo si es necesario).", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    133: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición de Récord Criminal con el ", null, null );
        xmlDoc += newT("FBI", true, null);
        xmlDoc += newT(" para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    134: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación ", null, null );
        xmlDoc += newT("I-589 (Asilo Defensivo)", true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    135: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación ", null, null );
        xmlDoc += newT("I-589 (Asilo Afirmativo)", true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    136: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Representación Legal a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" para los siguientes cargos:", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    138: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Cancelación de Remoción para Determinados Residentes Permanentes) a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    139: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" (Cancelación de Remoción y Ajuste de Estado para Determinados Residentes No Permanentes) a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    140: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentación de Forma ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    141: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Aplicación Electrónica para Visa de No Inmigrante ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    142: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Solicitud de Pasaporte Estadounidense ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    143: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    144: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición ", null, null);
        xmlDoc += newT("FOIA", true, null );
        xmlDoc += newT(" con ", null, null);
        xmlDoc += newT("DOJ", true, null );
        xmlDoc += newT(" para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" (Solo si es necesario).", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    145: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición ", null, null);
        xmlDoc += newT("FOIA", true, null );
        xmlDoc += newT(" con ", null, null);
        xmlDoc += newT("DOS", true, null );
        xmlDoc += newT(" para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(" (Solo si es necesario).", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    146: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Petición de Récord Criminal con el ", null, null );
        xmlDoc += newT("FBI", true, null);
        xmlDoc += newT(" para ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    147: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    148: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Submission of application ", null, null );
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(" ante la Corte de Inmigración, Notificación sobre Comparecencia como Abogado o Representante a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    149: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    150: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT(appShortName, true, null);
        xmlDoc += newT(",", true, null );
        xmlDoc += newT(" Permiso de trabajo a favor de ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    151: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Apelación frente a la Barra de Apelaciones de Inmigracion (BIA por sus siglas en inglés) a favor de", null, true );
        xmlDoc += newT(" ", null, null );
        xmlDoc += newT(contactName, true, null);
        xmlDoc += newT(": Representación Legal para presentación de apelación a ser sometida frente a la Barra de Apelaciones o BIA por sus siglas en inglés.", null, null );
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    152: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Presentación de Apelación frente a la Corte Federal del 9no Circuito", null, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    153: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Moción para Cerrar el Caso a favor de ", null, null);
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    },
    154: function(appShortName, contactName) {
        let xmlDoc = "<w:p>";
        xmlDoc += addpPr();
        xmlDoc += newT("Moción para Reabrir el Caso a favor de", null, null);
        xmlDoc += newT(contactName, true, null);
        xmlDoc += "</w:p>";
        return xmlDoc;
    }
};

const defaultENCase = function(appShortName, contactName) {
    // Default logic when no mapping is found
    let xmlDoc = "<w:p>";
    xmlDoc += addpPr();
    xmlDoc += newT("Application ", null, null );
    xmlDoc += newT(appShortName, true, null);
    xmlDoc += newT(" in favor of ", null, null );
    xmlDoc += newT(contactName, true, null);
    xmlDoc += "</w:p>";
    return xmlDoc;
};

const defaultESCase = function(appShortName, contactName) {
    // Default logic when no mapping is found
    let xmlDoc = "<w:p>";
    xmlDoc += addpPr();
    xmlDoc += newT("Aplicación ", null, null );
    xmlDoc += newT(appShortName, true, null);
    xmlDoc += newT(" a favor de ", null, null );
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
        docDir = "docsxup_hidden/files/contract_templates/en_template.docx";

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
                            "complexXml": caseMappingEN[currentApplication.applicationId] ? caseMappingEN[currentApplication.applicationId](currentApplication.applicationShortName, currentContact.contactName.toUpperCase()) : defaultENCase(currentApplication.applicationShortName, currentContact.contactName.toUpperCase())
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
                                'service_text2': " Consists of the following:",
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
                                'service_text2': ". It comprises the following:",
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
        docDir = "docsxup_hidden/files/contract_templates/es_template.docx";

        contractJSON.contract.contacts.forEach((currentContact) => {
            var roleText;

            if(currentContact.contactRole == 1 || currentContact.contactRole == '1'){
                roleText = "Victima";
                nameMainClient = currentContact.contactName.toUpperCase();
                clientsToWord.unshift(
                    {
                        'name_client': currentContact.contactName.toUpperCase(),
                        'role_client': roleText
                    }
                );
            } else {
                roleText = "Beneficiario/a";
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
                            "complexXml": caseMappingES[currentApplication.applicationId] ? caseMappingES[currentApplication.applicationId](currentApplication.applicationShortName, currentContact.contactName.toUpperCase()) : defaultESCase(currentApplication.applicationShortName, currentContact.contactName.toUpperCase())
                        }
                    );
                });
            
                switch(currentService.serviceName) {
                    case 'Research':
                        servicesToWord.push(
                            {
                                'service_text1': "Aplicación para obtener registros",
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
                                'service_text1': "Socorro migratorio al que se aplica:",
                                'service_boldunder1': "Petición de Familiar Extranjero.",
                                'service_text2': " Comprende lo siguiente:",
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
                                'service_text1': "Socorro migratorio al que se aplica:",
                                'service_boldunder1': currentService.serviceName,
                                'service_text2': ". Comprende lo siguiente:",
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
                //monthlyPaymentsTotalAmount
                mpTA: contractJSON.contract.monthlyPaymentsTotalAmount,
                //monthlyPayments Array
                mp: contractJSON.contract.monthlyPayments,
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
            //saveAs(blob, "CARRANZA_JOSE_U_VISA_Contract.docx");
            uploadDocument(blob);
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