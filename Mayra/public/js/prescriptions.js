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

  $("#patiName").empty();
  $("#doctName").empty();
  $("#doctName").append("Doctor:<br> " + medId + " - " + medName);
  $("#patiName").append("Patient:<br> " + patId + " - " + patName);
  
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

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list

  var handleFormSubmit = function(event) {
    event.preventDefault();
    /*
    if (
      !$presWeight.val().trim() ||
      !$presHeight.val().trim() ||
      !$presPulse.val().trim() ||
      !$presPrescription.val().trim()
    ) {
      swal({
        title: "Wait!",
        text: "Please fill all the fields with the requested information",
        icon: "error"
      });
      return;
    }
    */
    var reg = {
      idDoctor: medId,
      idPatient: patId,
      weight: $presWeight.val().trim(),
      height: $presHeight.val().trim(),
      pulse: $presPulse.val().trim(),
      prescription: $presPrescription.val().trim(),
      observations: $presObservations.val().trim()
    };

    API.savePres(reg).then(function() {
      window.location = "/doctorsMenu";
    });

    $presWeight.val("");
    $presHeight.val("");
    $presPulse.val("");
    $presPrescription.val("");
    $presObservations.val("");
  };

  //----------------------------------------------------------------------
  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  /*
  var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");
  
    API.deletePat(idToDelete).then(function() {
      //refreshPats();
    });
  };
  */
  //----------------------------------------------------------------------
  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  //$medList.on("click", ".delete", handleDeleteBtnClick);
});
