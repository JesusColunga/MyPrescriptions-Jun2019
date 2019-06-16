// public/js/doctors.js

// Get references to page elements
var $medFirstname = $("#med-firstname");
var $medLastname = $("#med-lastname");
var $medEmail = $("#med-email");
var $medPhone = $("#med-phone");
var $medUsername = $("#med-username");
var $medPassword = $("#med-password");
var $medLicense = $("#med-license");

var $submitBtn = $("#submit");
var $medList = $("#med-list");
console.log("(public/js/doctors.js)", $medFirstname, $medLastname);
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
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var reg = {
    firstname: $medFirstname.val().trim(),
    lastname: $medLastname.val().trim(),
    email: $medEmail.val().trim(),
    phone: $medPhone.val().trim(),
    username: $medUsername.val().trim(),
    password: $medPassword.val().trim(),
    license: $medLicense.val().trim(),
  };

//  if (!(reg.text && reg.description)) {
//    alert("You must enter an example text and description!");
//    return;
//  }

  API.saveMed(reg).then(function() {
    refreshMeds();
  });

  $medFirstname.val("");
  $medLastname.val("");
  $medEmail.val("");
  $medPhone.val("");
  $medUsername.val("");
  $medPassword.val("");
  $medLicense.val("");
};

//----------------------------------------------------------------------
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteMed(idToDelete).then(function() {
    refreshMeds();
  });
};

//----------------------------------------------------------------------
// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$medList.on("click", ".delete", handleDeleteBtnClick);
