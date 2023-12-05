function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

window.generate = function generate() {
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
};
