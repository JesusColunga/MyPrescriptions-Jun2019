// public/js/patientsEdit.js

// Get references to page elements
var $patFirstname = $("#pat-firstname");
var $patLastname = $("#pat-lastname");
var $patBirthdate = $("#pat-birthdate");
var $patGender = $("#pat-gender");
var $patEmail = $("#pat-email");
var $patPhone = $("#pat-phone");
//var $submitBtn = $("#submit");
var $backBtn = $("#goBackMenu");
//var $createPrescription = $("#createPrescription");
var medId = sessionStorage.getItem("id");
var patId = sessionStorage.getItem("patientId");
var $prescLog = $("#prescriptionLog");

//----------------------------------------------------------------------
// The API object contains methods for each kind of request we'll make
var API = {
  savePat: function(record) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/patients",
      data: JSON.stringify(record)
    });
  },
  getPat: function() {
    return $.ajax({
      url: "api/patients",
      type: "GET"
    });
  },
  deletePat: function(id) {
    return $.ajax({
      url: "api/patients/" + id,
      type: "DELETE"
    });
  }
};

//----------------------------------------------------------------------
//Submit, create reg, and clears form fields
var handleFormSubmit = function(event) {
  event.preventDefault();
  if (
    !$patFirstname.val().trim() ||
    !$patLastname.val().trim() ||
    !$patBirthdate.val().trim() ||
    !$patGender.val().trim() ||
    !$patEmail.val().trim() ||
    !$patPhone.val().trim()
  ) {
    swal({
      title: "Wait!",
      text: "Please fill all the fields with the requested information",
      icon: "error"
    });
    return;
  }
  var reg = {
    firstname: $patFirstname.val().trim(),
    lastname: $patLastname.val().trim(),
    birthdate: $patBirthdate.val().trim(),
    gender: $patGender.val().trim(),
    email: $patEmail.val().trim(),
    phone: $patPhone.val().trim()
  };

  API.savePat(reg).then(function() {});

  $patFirstname.val("");
  $patLastname.val("");
  $patBirthdate.val("");
  $patGender.val("");
  $patEmail.val("");
  $patPhone.val("");
};

//----------------------------------------------------------------------
//Back button
var processBackMenuDoc = function() {
  window.location = "/doctorsMenu/" + medId;
};
//----------------------------------------------------------------------
//Presctiption Log button
var processPrescLog = function() {
  window.location = "/prescriptions/" + medId + "/" + patId;
};
//----------------------------------------------------------------------

// Add event listeners
$backBtn.on("click", processBackMenuDoc); // Return to main menu
$prescLog.on("click", processPrescLog);
