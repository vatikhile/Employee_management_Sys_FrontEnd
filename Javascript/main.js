
$(document).ready(function () {
  var btn = document.getElementById("AddDetails");
  var cancelbtn = document.getElementsByClassName("close")[0];
  var submit = document.getElementById("submitButton");
  var popup = document.getElementById("wrapper");
  btn.onclick = function () {
    popup.style.display = "block";
  }
  submit.onclick = function () {
    popup.style.display = "block";
  }
  cancelbtn.onclick = function () {
    clearData()
    $("#nameIsValid").text("");
    $("#secondName").text("");
    $("#number").text("");
    $("#companyTittle").text("");
    $("#emailID").text("");
    $("#addressDetails").text("");
    popup.style.display = "none"
  }

  $("#submitButton").click(function (event) {
    var isValid = false;
    let first_Name = $('#name').val();
    let last_Name = $('#lastName').val();
    let email = $('#email').val();
    let company_Name = $('#Company').val();
    let mobile_Number = $('#mobNumber').val();
    let address = $('#address').val();
    let regex_name = new RegExp("^[A-Z]{1}[a-z]{2,}$");
    let regex_number = "/7|8|9)\d{9}/";
    let regex_CompanyName = new RegExp("^[A-Z]{1,}[a-z]{2,}$");
    // let regex_email = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]$")
    if (regex_name.test(first_Name) && first_Name != '') {
      isValid = true;
      $("#nameIsValid").text("");
    } else {

      isValid = false;
      $("#nameIsValid").text("Invalid FirstName");
    }
    if (regex_name.test(last_Name) && last_Name != '') {
      isValid = true;
      $("#secondName").text("");
    } else {
      $("#secondName").text("Invalid LastName");
      isValid = false;
    }

    if (mobile_Number != '') {
      isValid = true;
      $("#number").text("");
    } else {
      $("#number").text("Invalid Mobile Number");
      isValid = false;
    }
    if (regex_CompanyName.test(company_Name) && company_Name != '') {
      isValid = true;
      $("#companyTittle").text("");
    } else {
      $("#companyTittle").text("Invalid CompanyName");

      isValid = false;
    }
    if (email != '') {
      isValid = true;
      $("#emailID").text("");

    } else {
      $("#emailID").text("Invalid emailID");
      isValid = false;
    }

    if (regex_name.test(address) && address != '') {
      isValid = true;
      $("#addressDetails").text("");
    } else {
      $("#addressDetails").text("Enter Address");
      isValid = false;
    }

    if (isValid) {
      var details = { firstName: $('#name').val(), lastName: $('#lastName').val(), email: $('#email').val(), companyName: $('#Company').val(), mobileNumber: $('#mobNumber').val(), address: $('#address').val() }

      $.ajax({
        url: 'http://localhost:3000/employee/add',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          clearData()
          // alert('Employee Added sucessFully')
        },
        data: JSON.stringify(details)
      });
    }
    else {
      console.log("Something Wrong")
    }
  })

  // FETCHING DATA FROM JSON FILE 
  $.ajax({
    // The URL for the request
    url: "http://localhost:3000/allemployee/read",
    // Whether this is a GET request
    type: "GET",
    // The type of data we expect back
    dataType: "json",
  })
    .done(function (json) {
      let student = ''
      student = json.data
      $.each(student, function (key, value) {

        //CONSTRUCTION OF ROWS HAVING 
        // DATA FROM JSON OBJECT 
        student += '<tr>';
        student += '<td>' +
          value.firstName + '</td>';

        student += '<td>' +
          value.lastName + '</td>';

        student += '<td>' +
          value.email + '</td>';
        student += '<td>' +
          value.companyName + '</td>';
        student += '<td>' +
          value.mobileNumber + '</td>';
        student += '<td>' +
          value.address + '</td>';

        student += '<td>' +
          "<button id='" + value._id + "' type='button' onclick='productDelete(this)' value='" + value.email + "' >Delete</button>" +
          " <button id='" + value._id + "' type='button' onclick='productEdit(this)' value='" + value.email + "' >Edit</button></td>";
        student += '</tr>';

      });

      //INSERTING ROWS INTO TABLE  
      $('#table').append(student);
    })

    .fail(function (xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
    })

});

/* Method for clear the Input fields data which enter by user */
function clearData() {
  document.getElementById('name').value = ''
  document.getElementById('lastName').value = ''
  document.getElementById('Company').value = ''
  document.getElementById('mobNumber').value = ''
  document.getElementById('address').value = ''
  document.getElementById('email').value = ''
}
/* Request call after click on delete button for deleting the Employee Entry */
function productDelete(value) {
  $.ajax({
    url: "http://localhost:3000/employee/deleteInfo" + value.id + "",
    type: "DELETE",
    dataType: "json",
  }).done(data => {
    console.log("Deleted Sucessfully", data);
  })
}