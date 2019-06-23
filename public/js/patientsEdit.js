// public/js/patientsEdit.js

// Get references to page elements
var $backBtn = $("#goBackMenu");
var medId = sessionStorage.getItem("id");
var patId = sessionStorage.getItem("patientId");
var $prescLog = $("#prescriptionLog");

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
