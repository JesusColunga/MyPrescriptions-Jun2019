// public/js/doctorsLogin.js

// Get references to page elements
var $medUsername = $("#username");
var $medPassword = $("#password");

var $submitBtn = $("#submit");
//----------------------------------------------------------------------
// The API object contains methods for each kind of request we'll make
var API = {
  saveMed: function(record) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/doctors",
      data: JSON.stringify(record)
    });
  },
  getMed: function() {
    return $.ajax({
      url: "api/doctors",
      type: "GET"
    });
  },
  deleteMed: function(id) {
    return $.ajax({
      url: "api/doctors/" + id,
      type: "DELETE"
    });
  },
  searchMed: function(record) {
    return $.ajax({
        headers: {
            "Content-Type": "application/json"
          },
          type: "POST",
          url: "api/doctorsSearchOne",
          data: JSON.stringify(record)
        });
  }
};

//----------------------------------------------------------------------
var refreshMeds = function(regMed) {
  $("#username").empty();
  $("#password").empty();
  if (regMed === null) {
    window.location = "/";
  } else {
    sessionStorage.clear();
    sessionStorage.setItem("id", regMed.id);
    sessionStorage.setItem("name", regMed.firstname + " " + regMed.lastname);
    window.location = "/doctorsMenu/" + regMed.id;
  }
};

//----------------------------------------------------------------------
var handleFormSubmit = function(event) {
  event.preventDefault();
  /*
  if (
    !$medFirstname.val().trim() ||
    !$medLastname.val().trim() ||
    !$medEmail.val().trim() ||
    !$medPhone.val().trim() ||
    !$medUsername.val().trim() ||
    !$medPassword.val().trim() ||
    !$medLicense.val().trim()
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
    username: $medUsername.val().trim(),
    password: $medPassword.val().trim()
  };

  API.searchMed(reg).then(function(regMed) {
    refreshMeds(regMed);
  });

  $medUsername.val("");
  $medPassword.val("");
};

//----------------------------------------------------------------------
// Add event listeners
$submitBtn.on("click", handleFormSubmit);
