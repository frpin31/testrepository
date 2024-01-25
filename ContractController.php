<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Contract extends CI_Controller {

  function  __construct(){

    parent:: __construct();

    session_check();

    $this->load->library('File');
		$this->load->helper('file');
		//$this->load->model('Document_model');
    $this->load->model('Matter_model', 'Matter');
    $this->load->helper('service_contacter_helper');
  }

  public function index()
  {
    $this->load->view('contract');
  }

  //Llamar datos del nombre del matter
  /**
   * @param String $contact_id
   * @return Object
   */
  public function call_matter_name($matter_id)
  {
    $request = $this->input->get('idMatter');
    $result = $this->Matter->matterContractName($matter_id);

    if ($result != NULL) {
      $arr = json_decode(json_encode ($result) , true);
      return $arr;
    } else {
      return "No data found";
    }
    
  }

  //Llamar datos de los contactos relacionados
  /**
   * @param String $contact_id
   * @return Object
   */
  public function call_contact_related($contact_id)
  {
    $request = $this->input->get('idMatter');
    $result = $this->Matter->matterContractsContactsTable($contact_id);

    if ($result != NULL) {
      $arr = json_decode(json_encode ( $result ) , true);
      return $arr;
    } else {
      return "No data found";
    }
    
  }

  /**
	 * @param String $matter_id
	 * @var Array $view
	 * @return View
	 */
	public function create($matter_id = "")
	{
		$view = [
      'title'     => 'Create Contract',
      //'matter' => $this->matter_model->matterinformation($matter_id),
      'matter_id' => $matter_id,
      'name_matter' => $this->call_matter_name($matter_id),
      'related_contact'=> $this->call_contact_related($matter_id)
      
    ];
    return $this->load->view('Contract/create', $view);
	}

  /**
	 * @param String $matter_id
	 * @var Array $view
	 * @return View
	 */
	public function edit($id = "")
	{
    $contract = preprocess_API_petitions('http://44.214.240.74:8010/api/show-one-contract/' . $id, 'GET', null)["dataset"];
		$view = [
			'title'     => 'Edit Contract',
      //'matter' => $this->matter_model->matterinformation($matter_id),
      'contract' => $contract,
			'matter_id' => $this->input->get('matter_id'),
      'name_matter' => $this->call_matter_name($this->input->get('matter_id')),
      'related_contact'=> $this->call_contact_related($this->input->get('matter_id')),
			'vista'     => 'Contract/edit'
		];
    return $this->load->view('Contract/edit', $view);
	}
  
  function call_to_save_contract()
  {
    // $jsonData = file_get_contents('php://input');
    // $sender = json_decode($jsonData, true);
    $data = preprocess_API_petitions('http://44.214.240.74:8010/api/create-contract','POST',file_get_contents('php://input'));
    echo json_encode($data);
  }

  function update($id) {
    // $jsonData = file_get_contents('php://input');
    // $sender = json_decode($jsonData, true);
    echo json_encode(preprocess_API_petitions('http://44.214.240.74:8010/api/update-contract/' . $id , 'POST', file_get_contents('php://input')));
  }

  function delete() {
    // $jsonData = file_get_contents('php://input');
    // $sender = json_decode($jsonData, true);
    echo json_encode(preprocess_API_petitions('http://44.214.240.74:8010/api/delete-contract', 'POST', file_get_contents('php://input')));
  }

  function insert_contract_document_record(){
    // $jsonData = file_get_contents('php://input');
    // $sender = json_decode($jsonData, true);
    echo json_encode(preprocess_API_petitions('http://44.214.240.74:8010/api/delete-contract', 'POST', file_get_contents('php://input')));
  }

  function testing_document() {
    $view = [
      'title'     => 'Create Contract',
      //'matter' => $this->matter_model->matterinformation($matter_id),
      'matter_id' => $this->input->get('matter_id')
    ];
    return $this->load->view('Contract/testdocument', $view);
  }

  function store_file_contract($matter_id, $contract_id) {
    $param_matter_id = $this->input->get('matter_id');
    $idmatter;

    if (isset($contract_id) && trim($contract_id) !== "" && (is_numeric($contract_id) || filter_var($contract_id, FILTER_VALIDATE_INT) !== false)) {
    } else {
      echo json_encode(['success' => false, 'message' => 'Invalid contract id' ]);
      return;
    }

    if (isset($matter_id) && trim($matter_id) !== "" && (is_numeric($matter_id) || filter_var($matter_id, FILTER_VALIDATE_INT) !== false)) {
      $idmatter = $matter_id;
    } else if (isset($param_matter_id) && trim($param_matter_id) !== "" && (is_numeric($param_matter_id) || filter_var($param_matter_id, FILTER_VALIDATE_INT) !== false)) {
      $idmatter = $param_matter_id;
    }  else {
      echo json_encode(['success' => false, 'message' => 'Invalid matter id' ]);
      return;
    }

    $matter_check = $this->Matter->getOne($idmatter);
    if(!isset($matter_check) || empty($matter_check)){
      echo json_encode(['success' => false, 'message' => 'Not existing matter' ]);
      return;
    }
    
    $folder_path = 'docsxup_hidden/files/matters/' . $idmatter;
    $username = 'www-data';
    $groupname = 'www-data';

    if(!is_dir($folder_path)) {
      mkdir('docsxup_hidden/files/matters/' . $idmatter . '/contracts/' . $contract_id . '/', 0755, true);
      chmod($folder_path, 0755);
      chmod('docsxup_hidden/files/matters/' . $idmatter . '/contracts', 0755);
      chmod('docsxup_hidden/files/matters/' . $idmatter . '/contracts/' . $contract_id , 0755);

      chown($folder_path, $username);
      chgrp($folder_path, $groupname);

      chown('docsxup_hidden/files/matters/' . $idmatter . '/contracts', $username);
      chgrp('docsxup_hidden/files/matters/' . $idmatter . '/contracts', $groupname);

      chown('docsxup_hidden/files/matters/' . $idmatter . '/contracts/' . $contract_id, $username);
      chgrp('docsxup_hidden/files/matters/' . $idmatter . '/contracts/' . $contract_id, $groupname);

      if(!is_dir($folder_path)) {
        echo json_encode(['success' => false, 'message' => 'Could not create matters and contracts path/folder(s)' ]);
        return;
      }
    } else {
      $folder_path = 'docsxup_hidden/files/matters/' . $idmatter . '/contracts/' . $contract_id;
      if(!is_dir($folder_path)) {
        mkdir('docsxup_hidden/files/matters/' . $idmatter . '/contracts/' . $contract_id . '/', 0755, true);

        chmod('docsxup_hidden/files/matters/' . $idmatter . '/contracts', 0755);
        chmod($folder_path, 0755);

        chown('docsxup_hidden/files/matters/' . $idmatter . '/contracts', $username);
        chgrp('docsxup_hidden/files/matters/' . $idmatter . '/contracts', $groupname);

        chown($folder_path, $username);
        chgrp($folder_path, $groupname);
        if(!is_dir($folder_path)) {
          echo json_encode(['success' => false, 'message' => 'Could not create contracts path/folder(s)' ]);
          return;
        }
      }
    }

    $folder_path = 'docsxup_hidden/files/matters/' . $idmatter . '/contracts/' . $contract_id . '/';
    // echo json_encode(['success' => false, 'message' => 'Created Path' ]);
    // return;
    // Check if a file is uploaded
    if (!empty($_FILES['file']['name'])) {
      // Clean file name and add slashes when blank space found
      $request_file = trim($_FILES["file"]["name"] = addslashes($_FILES["file"]["name"]));
      $file_name = preg_replace('/[*%?!&<>@=#$]/', '', $request_file);

      // Configuration for CodeIgniter's File Uploading library
      $config['upload_path'] = $folder_path; // Upload directory
      $config['encrypt_name'] = FALSE;
      $config['overwrite'] = FALSE;
      $config['file_ext_tolower'] = TRUE;
      $config['allowed_types'] = "pdf|docx";
      $config['file_name'] = $file_name;
      $config['max_size'] = 0;
      $config['remove_spaces'] = TRUE;
      $config['detect_mime'] = TRUE;
      $config['mod_mime_fix'] = TRUE;
      
      $this->load->library('upload', $config);

      if ($this->upload->do_upload('file')) {
          // File uploaded successfully
          $data = $this->upload->data();
          echo json_encode(['success' => true, 'message' => 'File uploaded successfully']);
      } else {
          // Error in file upload
          echo json_encode(['success' => false, 'message' => $this->upload->display_errors()]);
      }
    } else {
        // No file uploaded
        echo json_encode(['success' => false, 'message' => 'No uploaded file found']);
    }
  }
}
