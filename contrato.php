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

        </style>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="d-flex flex-row align-items-center m-3">
                            <div class="p-2">
                                <h1 class="text-start">New Contract</h1>
                            </div>
                            <div class="p-2">
                                <h4 class="text-start">I-539</h4>
                            </div>
                            <div class="vr m-2"></div>
                            <div class="p-2">
                                <h5 class="text-start">PINEDA FUNES, Fernando Rodrigo - 5218</h5>
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
                                <div class="col">
                                    <a class="btn btn-primary mb-3" href="#" onclick="addContact('Fernando', 'Son')">Add Beneficiary</a>                                
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
                                    <a data-bs-toggle="collapse" href="#detailsSummary" role="button" aria-expanded="false" class="text-reset fs-6 fw-light position-absolute top-50 start-50 translate-middle" aria-controls="detailsSummary">show details</a>
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
                                                <option value="1">English</option>
                                                <option value="2">Spanish</option>                                        
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
                                    <button type="submit" class="btn btn-primary mb-3"  onclick="sendRequest()">Generate Contract</button>
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

        </script>
        <script src="<?php echo base_url(); ?>js/contracts/docxloader.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/jquery-3.2.1.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/jquery-ui.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>css/bootstrap5/js/bootstrap.bundle.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>css/bootstrap5/js/fstdropdown.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/sweetalert2.all.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/resources/app/helpers/components.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/contrato.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/contractValidations.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/docxtemplater.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/pizzip.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/FileSaver.js" type="text/javascript"></script>
        <script src="<?php echo base_url(); ?>js/contracts/pizzip-utils.js" type="text/javascript"></script>
        <!-- <script src="<?php echo base_url(); ?>css/bootstrap5/js/bootstrap.esm.min.js" type="text/javascript"></script> -->
    </body>
</html>
