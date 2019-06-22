// public/js/prescriptions.js
$(document).ready(function() {
  // Get references to page elements.
  var medId = sessionStorage.getItem("id");
  var medName = sessionStorage.getItem("name");
  var patId = sessionStorage.getItem("patientId");
  var patName = sessionStorage.getItem("patientName");

  //var $patientId = $("#patientId");
  var $presWeight = $("#pat-weight");
  var $presHeight = $("#pat-height");
  var $presPulse = $("#pat-pulse");
  var $presPrescription = $("#med-prescription");
  var $presObservations = $("#med-observations");
  var $submitBtn = $("#submit");
  var $goBackMenuBtn = $("#algo1");

  $("#patiName").empty();
  $("#patiName").append("Prescriptions for " + patId + " - " + patName + ":");

  //----------------------------------------------------------------------
  // The API object contains methods for each kind of request we'll make
  var API = {
    savePres: function(record) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "/api/prescriptions",
        data: JSON.stringify(record)
      });
    },
    getPres: function() {
      return $.ajax({
        url: "api/prescriptions",
        type: "GET"
      });
    },
    deletePres: function(id) {
      return $.ajax({
        url: "api/prescriptions/" + id,
        type: "DELETE"
      });
    }
  };

  //----------------------------------------------------------------------
  var processBackMenuDoc = function() {
    window.location = "/patients/" + patId;
};
//----------------------------------------------------------------------
  // Add event listeners to the submit and delete buttons
  $goBackMenuBtn.on("click", "goBack2Menu", processBackMenuDoc);

});
