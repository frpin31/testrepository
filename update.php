<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"/>
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/bootstrap5/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/bootstrap5/css/bootstrap-utilities.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/bootstrap5/css/bootstrap-grid.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/bootstrap5/css/bootstrap-reboot.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/bootstrap5/css/fstdropdown.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>js/contracts/sweetalert2.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>js/contracts/animate.min.css" rel="stylesheet" type="text/css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Contracts</title>
        <style>
            /* Style for the separator line */
            .separator {
                width: 100%;
                border-top: 2px solid black;
                margin: 10px 0;
            }

            .table-responsive {
                max-height:300px;
            }

            #icontoflip {
                -webkit-transform: scaleX(-1);
                -moz-transform: scaleX(-1);
                -o-transform: scaleX(-1);
                transform: scaleX(-1);
            }

            .custom-checkbox {
                cursor: pointer;
                display: flex;
                align-items: center;
                margin: 10px 0;
            }

            .custom-checkbox .label {
                font-size: 1.2em;
                margin: 0 10px;
            }

            .custom-checkbox .checkmark {
                width: 23px;
                height: 23px;
                border: 1px solid #adb5bd;
                display: inline-block;
                border-radius: 3px;
                background: #0d6efd url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_check.svg/1200px-White_check.svg.png) center/1250% no-repeat;
                transition: background-size 0.2s ease;
            }

            .custom-checkbox input:checked + .checkmark {
                background-size: 60%;
                transition: background-size 0.25s cubic-bezier(0.7, 0, 0.18, 1.24);
            }

            .custom-checkbox input {
                display: none;
            }

            .error-message {
                background-color: #fce4e4;
                border: 1px solid #fcc2c3;
                float: left;
                padding: 20px 30px;
            }

            .error-text {
                color: #cc0033;
                font-family: Helvetica, Arial, sans-serif;
                font-size: 13px;
                font-weight: bold;
                line-height: 20px;
                text-shadow: 1px 1px rgba(250,250,250,.3);
            }

            /* HTML: <div class="loader"></div> */
            .loader {
                width: 25px;
                padding: 4px;
                aspect-ratio: 1;
                border-radius: 50%;
                background: #4caf50;
                --_m: 
                    conic-gradient(#0000 10%,#000),
                    linear-gradient(#000 0 0) content-box;
                -webkit-mask: var(--_m);
                        mask: var(--_m);
                -webkit-mask-composite: source-out;
                        mask-composite: subtract;
                animation: l3 1s infinite linear;
            }
            @keyframes l3 {to{transform: rotate(1turn)}}

            body.swal2-shown .blur {
                -webkit-filter: blur(1px);
                opacity: 0.9;
            }
        </style>
    </head>
    <body>
        <!-- <?php var_dump(json_encode($contract)); ?> -->
        <?php
        //FUNCTION
        function titleCase($string, $delimiters = array(" ", "-", ".", "'", "O'", "Mc", "Mac"), $exceptions = array("de", "los", "lo", "las", "la", "del", "di", "della", "du", "von", "aus", "der", "den", "da", "das", "do", "dos", "I", "II", "III", "IV", "V", "VI"))
        {
            /*
            * Exceptions in lower case are words you don't want converted
            * Exceptions all in upper case are any words you don't want converted to title case
            *   but should be converted to upper case, e.g.:
            *   king henry viii or king henry Viii should be King Henry VIII
            */
            $string = mb_convert_case($string, MB_CASE_TITLE, "UTF-8");
            foreach ($delimiters as $dlnr => $delimiter) {
                $words = explode($delimiter, $string);
                $newwords = array();
                foreach ($words as $wordnr => $word) {
                    if (in_array(mb_strtoupper($word, "UTF-8"), $exceptions)) {
                        // check exceptions list for any words that should be in upper case
                        $word = mb_strtoupper($word, "UTF-8");
                    } elseif (in_array(mb_strtolower($word, "UTF-8"), $exceptions)) {
                        // check exceptions list for any words that should be in upper case
                        $word = mb_strtolower($word, "UTF-8");
                    } elseif (!in_array($word, $exceptions)) {
                        // convert to uppercase (non-utf8 only)
                        $word = ucfirst($word);
                    }
                    array_push($newwords, $word);
                }
                $string = join($delimiter, $newwords);
            }//foreach
            return $string;
        }
        ?>
        <div id="mainContainer" class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="row">
                        <p class="fs-5 mt-2">
                            <a href="<?php echo base_url(); ?>matters/<?php echo $matter_id;?>/main_view" class="link-primary">
                                <span class="material-symbols-outlined align-middle" id="icontoflip">move_item</span>
                                Back to Matter
                            </a>
                        </p>
                    </div>
                    <div class="row">
                        <div class="d-flex flex-row align-items-center ml-3 mr-3">
                            <div class="p-2">
                                <h1 class="text-start">Update Contract</h1>
                            </div>
                            <div class="vr m-2"></div>
                            <div class="p-2">
                            <?php if(isset($name_matter['0']['status_name'])): ?>
                                <?php if($name_matter['0']['status_name'] == 'Matter Name not available'): ?>
                                    <h5 class="text-start text-muted"><?php echo $name_matter['0']['status_name']; ?></h5>
                                <?php else: ?>
                                    <h5 class="text-start"><?php echo $name_matter['0']['status_name']; ?></h5>
                                <?php endif; ?>
                            <?php else: ?>
                                <div class="error-message">
                                    <span class="error-text">There was an error getting matter information. Please try again later. If the issue persists, contact an administrator</span>
                                </div>
                            <?php endif; ?>
                            </div>
                        </div>
                    </div>
                    <button id="printButton" type="button" class="btn btn-secondary btn-sm" style="position: fixed;" data-bs-toggle="modal" data-bs-target="#jsonModal">Check Json</button>
                    <div class="modal fade" id="jsonModal" tabindex="-1" aria-labelledby="jsonModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">                                    
                                <div class="modal-body">
                                    <pre id="jsonModalBody">

                                    </pre>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>                                        
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="hr mb-4">
                    <div class="row">
                        <div class="col">
                            <div id="listBeneficiaries">
                            </div>
                            <div class="row">
                                <div class="col-sm-3">
                                    <select id="ContactSelect" class="form-select form-select-lg mb-3" aria-label="Contact Select">
                                        <option value="0" selected>Select a Contact</option>
                                        <?php foreach ($related_contact as $contact):?>
                                            <option id="<?php echo $contact['identifier']; ?>" value="<?php echo $contact['identifier']; ?>" data-custom-relation="<?php echo $contact['relation']; ?>"> <?php echo titleCase($contact['name']); ?></option>
                                        <?php endforeach;?> 
                                    </select>
                                </div>
                                <div class="col-sm-9">
                                    <a class="btn btn-primary mb-3" href="#;" onclick="addContact(-1)">Add Contact</a>                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="hr mb-4">
                    <div class="row mb-4">                    
                        <div class="col">                                
                            <h2 class="text-center">Payment Plan</h2>
                        </div>
                    </div>
                    <div id="paymentPlanCards">
                        <div class="row mb-2">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-6"> 
                                <div class="card mb-4">
                                    <div class="card-header" id="downPaymentCardHeader">
                                        <h4>
                                            Down Payment
                                            <a data-bs-toggle="collapse" href="#downPaymentCard" role="button" aria-expanded="false" aria-controls="downPaymentCard">
                                                <span class="material-symbols-outlined fs-3 fw-bold text-black align-middle">keyboard_arrow_down</span>
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="downPaymentCard" class="collapse" aria-labelledby="downPaymentCardHeader" data-parent="#paymentPlanCards">
                                        <div class="card-body">
                                            <form id="downPaymentForm" class="needs-validation" novalidate>
                                                <div class="row">
                                                    <div class="col-sm-4 ml-4 mr-4">            
                                                        <label for="amountDP" class="form-label mb-2">Amount</label>
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text">$</span>
                                                            <input type="text" class="form-control" id="amountDP" name="amountDP" aria-label="Amount (to the nearest dollar)" required>
                                                            <div id="amountDPValidation" class="invalid-feedback">
                                                                Invalid number
                                                            </div>
                                                        </div>                                            
                                                    </div>
                                                    <div class="col-sm-4 ml-4 mr-4">
                                                        <label for="dateDP" class="form-label mb-2">To be paid on</label>
                                                        <input type="text" class="form-control dateinput" id="dateDP" required>
                                                        <div id="dateDPValidation" class="invalid-feedback">
                                                            Invalid date
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 ml-4 mr-4 mt-4">
                                                    </div>
                                                </div>
                                                <button class="btn btn-primary" type="submit" id="addDownPayment">Set Down Payment</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3"></div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-6">
                                <div class="card mb-4">
                                    <div class="card-header" id="monthlyChargesCardHeader">
                                        <h4>
                                            Monthly Charges
                                            <a data-bs-toggle="collapse" href="#monthlyChargesCard" role="button" aria-expanded="false" aria-controls="monthlyChargesCard">
                                                <span class="material-symbols-outlined fs-3 fw-bold text-black align-middle">keyboard_arrow_down</span>
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="monthlyChargesCard" class="collapse" aria-labelledby="monthlyChargesCardHeader" data-parent="#paymentPlanCards">
                                        <div class="card-body">
                                            <form id="monthlyChargesForm" novalidate>
                                                <div class="row">
                                                    <div class="col-sm-7">                                                
                                                        <div class="row mb-3">
                                                            <div class="col-sm-6 ml-4 mr-4">
                                                                <label for="amountMC" class="form-label mb-2">Monthly Charge</label>                                
                                                                <div class="input-group">
                                                                    <span class="input-group-text">$</span>
                                                                    <input type="text" class="form-control" id="amountMC" name="amountMC" aria-label="Monthly Charge (to the nearest dollar)" required>
                                                                    <div id="amountMCValidation" class="invalid-feedback">
                                                                        Invalid amount
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6 ml-4 mr-4">
                                                                <label for="numberOfMC" class="form-label mb-2">Number of Charges</label>
                                                                <input type="text" class="form-control" id="numberOfMC" name="numberOfMC" required>
                                                                <div id="numberOfMCValidation" class="invalid-feedback">
                                                                    Invalid number
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-sm-6 ml-4 mr-4">
                                                                <label for="startDateMC" class="form-label mb-2">To start on</label>
                                                                <input type="text" class="form-control dateinput" id="startDateMC" name="startDateMC" required>
                                                                <div id="startDateMCValidation" class="invalid-feedback">
                                                                    Invalid date
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6 ml-4 mr-4">
                                                                <label for="endDateMC" class="form-label mb-2">Expected to finish on</label>
                                                                <input type="text" class="form-control" id="endDateMC" name="endDateMC" disabled>
                                                            </div>                                                    
                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-sm-6 ml-4 mr-4">
                                                                <label for="totalMC" class="form-label mb-2">Total Monthly Charges</label>
                                                                <div class="input-group">
                                                                    <span class="input-group-text">$</span>
                                                                    <input type="text" class="form-control" id="totalMC" name="totalMC" aria-label="Monthly Charge (to the nearest dollar)" required>
                                                                    <div id="totalMCValidation" class="invalid-feedback">
                                                                        Invalid amount
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-5">
                                                        <div class="row">
                                                            <div class="table-responsive">
                                                                <table class="table caption-top table-bordered table-striped table-hover">
                                                                    <caption>
                                                                        <div class="d-flex flex-row justify-content-between">
                                                                            <p class="fs-6">Table Preview</p>
                                                                            <p class="fs-6 text-body-secondary"><a id="expandTablePreview" href="#" class="text-reset">expand view</a></p>
                                                                        </div>
                                                                    </caption>
                                                                    <thead class="table-primary">
                                                                        <tr>
                                                                            <th scope="col">#</th>
                                                                            <th scope="col">Date</th>
                                                                            <th scope="col">Amount</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id ="previewTable" style="max-height: 300px;">
                                                                        <tr>
                                                                            <th scope="row">0</th>
                                                                            <td>00/00/0000</td>
                                                                            <td>$ 00.00</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <button class="btn btn-primary" type="submit" id="addMC">Set Monthly Charges</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3"></div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-6"> 
                                <div class="card mb-4">
                                    <div class="card-header" id="totalContractCardHeader">
                                        <h4>
                                            Total Contract
                                            <a data-bs-toggle="collapse" href="#totalContractCard" role="button" aria-expanded="false" aria-controls="totalContractCard">
                                                <span class="material-symbols-outlined fs-3 fw-bold text-black align-middle">keyboard_arrow_down</span>
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="totalContractCard" class="collapse" aria-labelledby="totalContractCardHeader" data-parent="#paymentPlanCards">
                                        <div class="card-body">
                                            <form id="totalContractForm" class="needs-validation" novalidate>
                                                <div class="row">
                                                    <div class="col-sm-4 ml-4 mr-4">            
                                                        <label for="totalContractAmount" class="form-label mb-2">Amount</label>                                
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text">$</span>
                                                            <input type="text" class="form-control" id="totalContractAmount" name="totalContractAmount" aria-label="Amount (to the nearest dollar)" required>
                                                            <div id="totalContractAmountValidation" class="invalid-feedback">
                                                                Invalid number
                                                            </div>
                                                        </div>                                            
                                                    </div>
                                                    <div class="col-sm-4 ml-4 mr-4 mt-4">
                                                    </div>
                                                </div>
                                                <button class="btn btn-primary" type="submit" id="addTotalContract">Set Amount</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3"></div>
                        </div>
                    </div>                        
                    <div class="row mb-2">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6">
                            <div class="card mb-4">
                                <h4 class="card-header position-relative">Summary
                                    <a data-bs-toggle="collapse" href="#detailsSummary" role="button" aria-expanded="false" class="text-reset fs-6 fw-light position-absolute top-50 start-50 translate-middle" aria-controls="detailsSummary">
                                        show details
                                        <span class="material-symbols-outlined">
                                            expand_all
                                        </span>
                                    </a>
                                </h4>
                                <div class="card-body">
                                    <div class="row text-center mb-4">
                                        <div class="col-sm-12">
                                            <div class="d-flex justify-content-evenly">
                                                <div class="flex-fill">                                                        
                                                    <h2>Down Payment</h2>
                                                    <h3 id="summaryDownPayment">$0.00</h3>
                                                    <div id="detailsSummary" class="collapse">
                                                        <div class="row mt-4">
                                                            <div class="col">
                                                                <p class="fw-light text-start">Payment Date:</p>
                                                            </div>
                                                            <div class="col">
                                                                <p id="summaryDownPaymentDate" class="fw-normal text-end">00/00/0000</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="vr m-2"></div>
                                                <div class="flex-fill">
                                                    <h2>Monthly Charges</h2>
                                                    <h3 id="summaryMC">$0.00</h3>
                                                    <div id="detailsSummary" class="collapse">
                                                        <div class="row mt-4">
                                                            <div class="col">
                                                                <p class="fw-normal">Charges:<p>
                                                                <div id="summaryMCListOfCharges">
                                                                    <p class="fw-light text-start">0 of $ 0.00</p>
                                                                </div>
                                                                <div class="separator"></div> <!-- Separator line -->
                                                                <p id="summaryMCTotalNumberOfCharges" class="fw-normal text-start">0 charges in total</p>
                                                            </div>
                                                            <div class="col">
                                                                <p class="fw-light">Starting:<p>
                                                                <p id="summaryMCStartDate" class="fw-normal">00/00/0000</p>
                                                                <p class="fw-light">Ending:</p>
                                                                <p id="summaryMCEndDate" class="fw-normal">00/00/0000</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="vr m-2"></div>
                                                <div class="flex-fill">                                                        
                                                    <h2>Total Contract</h2>
                                                    <h3 id="summaryTotalContract">$0.00</h3>
                                                    <div id="detailsSummary" class="collapse">
                                                        <div class="row mt-4">
                                                            <div class="col-7">
                                                                <p class="fw-light text-start">Down Payment:</p>
                                                                <p class="fw-light text-start">Monthly Charges:</p>
                                                            </div>
                                                            <div class="col-5">
                                                                <p id="summaryDownPaymentAmount" class="fw-normal text-end">$ 0.00</p>
                                                                <p id="summaryMCAmount" class="fw-normal text-end">$ 0.00</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>       
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3"></div>
                    </div>
                    <div class="row">
                        <div class="col text-center justify-content-center">
                            <div class="row align-items-center mb-4">
                                <div class="col-sm-5"></div>
                                <div class="col-sm-2">
                                    <div class="row g-2 align-items-center">
                                        <div class="col-auto">
                                            <label for="contractLanguage" class="form-label">Language:</label>
                                        </div>
                                        <div class="col-auto">
                                            <select class="form-select mt-2" id="contractLanguage" aria-label="Default select example">
                                                <option value = "0" selected>Select Language</option>
                                                <option value="2">Spanish</option>
                                                <option value="1">English</option>
                                            </select>
                                        </div>
                                    </div>                                                                                
                                </div>
                                <div class="col-sm-5"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col text-center justify-content-center">
                            <div class="row align-items-center mb-4">
                                <div class="col-sm-5"></div>
                                <div class="col-sm-2">
                                    <button type="submit" class="btn btn-primary mb-3" id="saveButton" onclick="sendRequest(2)">Update Contract</button>
                                </div>
                                <div class="col-sm-5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
        <button id="convert" class="btn btn-primary" onclick="checkContractValues()">Generate Document</button>
        <button class="btn btn-secondary" onclick="simulateSend()">check data</button>
            <script>
                <?php $CI =& get_instance(); echo $CI->session->userdata('token');?>
            </script>
        <!-- Embed BASE_URL in a JavaScript script tag -->
        <script>
            var base_url = '<?php echo base_url();?>';
            var matter_id = '<?php echo $matter_id;?>';
            var userid = '<?php echo $userid;?>';
            var contractArray = <?php echo json_encode($contract); ?>;
            var selectedLang;
        </script>
        <script src="<?php echo base_url(); ?>js/contracts/docxloader.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/jquery-3.2.1.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/jquery-ui.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>css/bootstrap5/js/bootstrap.bundle.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>css/bootstrap5/js/fstdropdown.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/sweetalert2.all.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/resources/app/helpers/components.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/contract.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/contractValidations.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/docxtemplater.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/pizzip.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/FileSaver.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/pizzip-utils.js" type="text/javascript"></script>
        <!-- <script src="<?php echo base_url(); ?>css/bootstrap5/js/bootstrap.esm.min.js" type="text/javascript"></script> -->
    </body>
</html>