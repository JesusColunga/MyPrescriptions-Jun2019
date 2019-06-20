// public/js/patients.js

// Get references to page elements
var $patFirstname = $("#pat-firstname");
var $patLastname = $("#pat-lastname");
var $patBirthdate = $("#pat-birthdate");
var $patGender = $("#pat-gender");
var $patEmail = $("#pat-email");
var $patPhone = $("#pat-phone");

var $submitBtn = $("#submit");
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
// refreshMeds gets new examples from the db and repopulates the list
/*
var refreshPats = function() {
  API.getPat().then(function(data) {
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
*/
//----------------------------------------------------------------------
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
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

  //  if (!(reg.text && reg.description)) {
  //    alert("You must enter an example text and description!");
  //    return;
  //  }

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
