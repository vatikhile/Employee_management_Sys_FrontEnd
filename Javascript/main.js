// var $ = require( "jquery" );
// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );  

$(document).ready(function(){
  console.log("test");
  // if (jQuery) { alert('jQuery is loaded!',student);
  // FETCHING DATA FROM JSON FILE 
  $.getJSON("../JSON/employeeInfo.json",
    function (data) {
      var student='';
      // if (jQuery) { alert('jQuery is loaded!',student);  } 
      // ITERATING THROUGH OBJECTS 
      $.each(data, function (key, value) {

        //CONSTRUCTION OF ROWS HAVING 
        // DATA FROM JSON OBJECT 
        student += '<tr>';
        student += '<td>' +
          value.FirstName + '</td>';

        student += '<td>' +
          value.LastName + '</td>';

        student += '<td>' +
          value.MobileNo + '</td>';

        student += '<td>' +
          value.City + '</td>';

        student += '</tr>';
      });
console.log("stude",student);
      //INSERTING ROWS INTO TABLE  
      $('#table').append(student);
    });
});


// function promptMe(){
//     var userAdjective = prompt("Please Enter the Details");
//     alert (userAdjective);
// }
// $(document).ready(function(){
//     function promptMe() {
//         // Call Web API to get a list of Product
//         $.ajax({
//           url: '/employee/add',
//           type: 'GET',
//           dataType: 'json',
//           success: function (data) {
//               console.log("data",data);
//             // productListSuccess(products);
//           },
//           error: function (error) {
//               console.log("error",error);
//             // handleException(request, message, error);
//           }
//         });
//       }
// jQuery methods go here...

//   });
// $(document).ready(function(){
//     $("button").click(function(){
//       $("p").hide();
//     });
//   });

// alert('gfgg')
// const fs = require('fs');

// class Employee {
//   constructor() {
//     var employee=''
//     this.data = fs.readFileSync('../JSON/employeeInfo.json', 'utf8');
//     this.employeeData = JSON.parse(this.data);
//     // console.log("data",this.employeeData);
// this.employeeData.forEach(myFunction);
// function myFunction(item, index) {
//   console.log("item",employee);
//   document.getElementById("table").innerHTML += "employee"
  // document.getElementById("add_to_me").innerHTML += 
  // '<tr>'
  //          '<td>' +
  //         item.FirstName + '</td>';
  
  //          '<td>' +
  //         item.LastName + '</td>';
  
  //         '<td>' +
  //         item.MobileNo + '</td>'; 
  
  //          '<td>' +
  //         item.City + '</td>';
  
  //         '</tr>'; 
//           employee += '<tr>';
//         employee += '<td>' +
//           item.FirstName + '</td>';

//         employee += '<td>' +
//           item.LastName + '</td>';

//         employee += '<td>' +
//           item.MobileNo + '</td>';

//         employee += '<td>' +
//           item.City + '</td>';

//         employee += '</tr>';
// }
// }
// }
// var obj = new Employee();

