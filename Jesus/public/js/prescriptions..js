// public/js/prescriptions.js

// Get references to page elements
var $presWeight = $("#pat-weight");
var $presHeight = $("#pat-height");
var $presPulse = $("#pat-pulse");
var $presPrescription = $("#med-prescription");
var $presObservations = $("#med-observations");

var $submitBtn = $("#submit");
//----------------------------------------------------------------------
// The API object contains methods for each kind of request we'll make
var API = {
  savePres: function(record) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/prescriptions",
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

  var reg = {
    /*
    idDoctor: 
    idPatient: 
    */
    weight: $presWeight.val().trim(),
    height: $presHeight.val().trim(),
    pulse: $presPulse.val().trim(),
    prescription: $presPrescription.val().trim(),
    observations: $presObservations.val().trim()
  };

  //  if (!(reg.text && reg.description)) {
  //    alert("You must enter an example text and description!");
  //    return;
  //  }

  API.savePres(reg).then(function() {
    //refreshPats();
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
