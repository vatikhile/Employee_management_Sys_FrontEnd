var employeeId
var check = "add"
$(document).ready(function () {

  var btn = document.getElementById("AddDetails");

  var submit = document.getElementById("submitButton");
  var popup = document.getElementById("wrapper");
  btn.onclick = function () {
    popup.style.display = "block";
  }
  submit.onclick = function () {
    popup.style.display = "block";
  }

  cancel()
  $("#submitButton").click(function (event) {
 
    if (check == "add") {
      // alert("addd")
      event.preventDefault();
      add()
      cancel()

    }
    else {
      // alert("edit")
      event.preventDefault();
      edit()
      cancel()


    }


  })

  // FETCHING DATA FROM JSON FILE 
  //  var getData = () =>{ 
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
          " <button id='editButton' type='button' onclick='productEdit(this)' value='" + value._id + "' >Edit</button></td>";
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

  // }
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
  // getEmployeeData();
}
function productEdit(id) {
  employeeId = id.value;
  console.log("fisrt check", check);
  // $(".popupHeader h3").empty();
  $("#popupHeader").text("");
  // $("#popupHeader").text("Update Employee Details");
  // $('#submitButton').attr('id','#editButton'); 
  check = 'edit'
  console.log("check", check);
  console.log("value", id.value);
  var popup = document.getElementById("wrapper");
  popup.style.display = "block";

  $.ajax({
    // The URL for the request
    url: "http://localhost:3000/singleemployee/read" + id.value + "",
    // Whether this is a GET request
    type: "GET",
    // The type of data we expect back
    dataType: "json",
  }).done(json => {
    var employeeInfo
    employeeInfo = json.data
    $("#name").val(function () {
      return employeeInfo.firstName
    });
    $("#lastName").val(function () {
      return employeeInfo.lastName
    });
    $("#email").val(function () {
      return employeeInfo.email
    });
    $("#Company").val(function () {
      return employeeInfo.companyName
    });
    $("#mobNumber").val(function () {
      return employeeInfo.mobileNumber
    });
    $("#address").val(function () {
      return employeeInfo.address
    });
    console.log("single entry", employeeInfo);
    // /////////////////////////////////////////////////
    // let editEntry = document.getElementById("submitButton");
    // editEntry.onclick = function () {
    //   edit()
    // }
  })
}

function add() {
  // alert("rgg")

  var isValid = false;
  let first_Name = $('#name').val();
  let last_Name = $('#lastName').val();
  let email = $('#email').val();
  let company_Name = $('#Company').val();
  let mobile_Number = $('#mobNumber').val();
  let address = $('#address').val();
  let regex_name = new RegExp("^[A-Z]{1}[a-z]{2,}$");
  var regex_number = /^\d{10}$/;
  let regex_CompanyName = new RegExp("^[A-Z]{1,}[a-z]{2,}$");
  let regex_email = new RegExp("^[A-Za-z0-9]+([._+-][0-9a-zA-Z]+)?@[a-zA-Z0-9]+.[a-zA-Z]{2,4}([.][a-zA-Z]{2})?")

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

  if (regex_number.test(mobile_Number) && mobile_Number != '') {
    isValid = true;
    $("#number").text("");
  } else {
    $("#number").text("Invalid Mobile Number");
    // console.log("number", mobile_Number.value.length);
    isValid = false;
  }
  if (regex_CompanyName.test(company_Name) && company_Name != '') {
    isValid = true;
    $("#companyTittle").text("");
  } else {
    $("#companyTittle").text("Invalid CompanyName");

    isValid = false;
  }
  if (regex_email.test(email) && email != '') {
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
        // clearData()

        let popup = document.getElementById("wrapper");
        popup.style.display = "none"
        clearData()

        //  cancel();
        // jQuery.ready();
        // getEmployeeData();

        // alert('Employee Added sucessFully')
        // $(this).cancel()
      },
      data: JSON.stringify(details)
    });
  }
  else {
    console.log("Something Wrong")
  }
}
function edit() {

  console.log("employee1", employeeId);
  var detail = { firstName: $('#name').val(), lastName: $('#lastName').val(), email: $('#email').val(), companyName: $('#Company').val(), mobileNumber: $('#mobNumber').val(), address: $('#address').val() }
  console.log("employee2", detail);

  $.ajax({

    type: 'PUT',
    url: "http://localhost:3000/employee/updateInfo" + employeeId + "",
    contentType: "application/json",

    success: function (data) {
      console.log('Load was performed.', data);
      check = 'add'
      let popup = document.getElementById("wrapper");
      popup.style.display = "none"
      clearData()
    },
    data: JSON.stringify(detail),

  });
}
function cancel() {
  let popup = document.getElementById("wrapper");
  let cancelbtn = document.getElementsByClassName("close")[0];
  cancelbtn.onclick = function () {
    clearData()
    $("#nameIsValid").text("");
    $("#secondName").text("");
    $("#number").text("");
    $("#companyTittle").text("");
    $("#emailID").text("");
    $("#addressDetails").text("");
    popup.style.display = "none"
    check = "add"
  }
}

  // cancelbtn.onclick = function () {
  //   clearData()
  //   $("#nameIsValid").text("");
  //   $("#secondName").text("");
  //   $("#number").text("");
  //   $("#companyTittle").text("");
  //   $("#emailID").text("");
  //   $("#addressDetails").text("");
  //   popup.style.display = "none"
  // }
  // console.log("vaolye", value);
  // $.ajax({
  //   url: "http://localhost:3000/employee/deleteInfo" + value.id + "",
  //   type: "DELETE",
  //   dataType: "json",
  // }).done(data => {
  //   console.log("Deleted Sucessfully", data);
  // })

