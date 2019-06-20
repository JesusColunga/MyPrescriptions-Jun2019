// public/js/prescriptions.js
$(document).ready(function() {
  // Get references to page elements.
  var $selectPatient = $(".selectPatient");
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
  //TESTING GET PATIENTS
  function getPatients() {
    $.get("/api/patients", renderPatientList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderPatientList(data) {
    if (!data.length) {
      window.location.href = "/patients";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createPatientRow(data[i]));
    }
    patientSelect.empty();
    console.log(rowsToAdd);
    console.log(authorSelect);
    authorSelect.append(rowsToAdd);
    authorSelect.val(authorId);
  }

  // Creates the patient options in the dropdown
  function createPatientRow(author) {
    var listOption = $("<option>");
    listOption.attr("value", author.id);
    listOption.text(patient.name);
    return listOption;
  }
  // END OF TEST
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
  getPatients();
  var handleFormSubmit = function(event) {
    event.preventDefault();
    if (
      !$selectPatient.val().trim() ||
      !$presWeight.val().trim() ||
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
});
