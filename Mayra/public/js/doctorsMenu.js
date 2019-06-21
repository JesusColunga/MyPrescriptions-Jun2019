// public/js/doctorsMenu.js

// Get references to page elements
var medId = sessionStorage.getItem("id");
var medName = sessionStorage.getItem("name");

if ((medId === null) || (medName === null)) {
    window.location = "/";
}

$("#nombreMedico").empty();
$("#nombreMedico").append("Nombre del médico: " + medName);

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

  API.savePat(reg).then(function() {
    //refreshPats();
  });

  $patFirstname.val("");
  $patLastname.val("");
  $patBirthdate.val("");
  $patGender.val("");
  $patEmail.val("");
  $patPhone.val("");
};

//----------------------------------------------------------------------
var processLogout = function() {
  sessionStorage.clear();
  window.location = "/";
};

//----------------------------------------------------------------------
// Add event listeners to the logout button
$("#logoutBtn").on("click", processLogout);

$("#patientDetails").on("click", function(){
  var id = $(this).data("id");
  sessionStorage.setItem("patientId", id);
  window.location = "/patients/" + id;
});
