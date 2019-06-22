// public/js/doctors.js

// Get references to page elements
var $medFirstname = $("#med-firstname");
var $medLastname = $("#med-lastname");
var $medEmail = $("#med-email");
var $medPhone = $("#med-phone");
var $medUsername = $("#med-username");
var $medPassword = $("#med-password");
var $medSpecialty = $("#med-specialty");
var $medLicense = $("#med-license");

var $submitBtn = $("#submit");
var $medList = $("#med-list");
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
  }
};

//----------------------------------------------------------------------
// refreshMeds gets new examples from the db and repopulates the list
var refreshMeds = function() {
  API.getMed().then(function(data) {
    var $registros = data.map(function(reg) {
      var $a = $("<a>")
        .text(reg.firstname + " " + reg.lastname)
        .attr("href", "/doctors/" + reg.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": reg.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $medList.empty();
    $medList.append($registros);
  });
};

//----------------------------------------------------------------------
var handleFormSubmit = function(event) {
  event.preventDefault();
  if (
    !$medFirstname.val().trim() ||
    !$medLastname.val().trim() ||
    !$medEmail.val().trim() ||
    !$medPhone.val().trim() ||
    !$medUsername.val().trim() ||
    !$medPassword.val().trim() ||
    !$medSpecialty.val().trim() ||
    !$medLicense.val().trim()
  ) {
    swal({
      title: "Wait!",
      text: "Please fill all the fields with the requested information",
      icon: "error"
    });
    return;
  }
  var reg = {
    firstname: $medFirstname.val().trim(),
    lastname: $medLastname.val().trim(),
    email: $medEmail.val().trim(),
    phone: $medPhone.val().trim(),
    username: $medUsername.val().trim(),
    password: $medPassword.val().trim(),
    specialty: $medSpecialty.val().trim(),
    license: $medLicense.val().trim()
  };

  API.saveMed(reg).then(function() {
    window.location = "/doctorsLogin";
  });

  $medFirstname.val("");
  $medLastname.val("");
  $medEmail.val("");
  $medPhone.val("");
  $medUsername.val("");
  $medPassword.val("");
  $medSpecialty.val("");
  $medLicense.val("");
};

//----------------------------------------------------------------------
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteMed(idToDelete).then(function() {
    refreshMeds();
  });
};

//----------------------------------------------------------------------
// Add event listeners
$submitBtn.on("click", handleFormSubmit);
