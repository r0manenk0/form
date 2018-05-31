$(function() {
  var form = $("#parking-form").show();

  form.children("div").steps({
      headerTag: "h3",
      bodyTag: "fieldset",
      transitionEffect: "slideLeft",
      onStepChanging: function (event, currentIndex, newIndex)
      {
          // Allways allow previous action even if the current form is not valid!
          if (currentIndex > newIndex)
          {
              return true;
          }
          /*// Forbid next action on "Warning" step if the user is to young
          if (newIndex === 3 && Number($("#age-2").val()) < 18)
          {
              return false;
          }*/
          // Needed in some cases if the user went back (clean up)
          if (currentIndex < newIndex)
          {
              // To remove error styles
              form.find(".body:eq(" + newIndex + ") label.error").remove();
              form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
          }
          form.validate().settings.ignore = ":disabled,:hidden";
          return form.valid();
      },
      /*onStepChanged: function (event, currentIndex, priorIndex)
      {
          // Used to skip the "Warning" step if the user is old enough.
          if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
          {
              form.steps("next");
          }
          // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
          if (currentIndex === 2 && priorIndex === 3)
          {
              form.steps("previous");
          }
      },*/
      onFinishing: function (event, currentIndex)
      {
          form.validate().settings.ignore = ":disabled";
          return form.valid();
      },
      onFinished: function (event, currentIndex)
      {
          alert("Submitted!");
      }
  })
/*-----------tooltip----------*/
$('[data-toggle="tooltip"]').tooltip();


/*----------------DatePicker-----------------*/
$('#date1').datepicker({
    format: "mm.dd.yy",
    todayBtn: "linked",
    autoclose: true
});
$('#date2').datepicker({
    format: "mm.dd.yy",
    todayBtn: "linked",
    autoclose: true
});

/*---------------Autocomplete----------------*/
var parkingArray = [
  "ParkingEye",
  "Smart Parking",
  "Euro Car Parks",
  "Highview Parking",
  "Athena APR",
  "Civil Enforcement",
  "Euro Parking Collection",
  "CP Plus",
  "G24",
  "APCOA Parking UK",
  "Vehicle Control Services (VCS)",
  "Excel Parking",
  "National Car Parks (NCP)",
  "MET Parking",
  "Horizon Parking",
  "Parking Control Management UK",
  "UK Car Park Management (UKCPM)",
  "Total Parking Solutions (TPS)",
  "UKCPS",
  "Britannia Parking",
  "National Parking Enforcement",
  "Gemini Parking Solutions"];

$("#inputNameParking").autocomplete({
      source: parkingArray,
      delay:10,
			minChars:1,
			matchSubset:1,
			autoFill:true,
			maxItemsToShow:20
});
setInterval(function(){
    var num1 = $("#inputNameParking").val();

    if ($.inArray(parseInt(num1),parkingArray) > -1) {
        $("#help-msg").fadeIn();
    }
}, 1000);

/*----*/
function updatefields() {
//  $('#a1r8').show();
  //console.log("updating fields...");
  var checkbox=$("#parking-form input[type='radio']:checked").val();
  var subelement="a"+checkbox+"r";
  //
  var cssdiv ="a"+checkbox+"r"+"div";
  //for (i=0; i<19;i++) {
    //temp="a"+i+"r"+"div";
    //$("#"+temp).css("background-color", "white");
    //$("#"+temp).css("color", "black");
  //}
  //  $("#"+temp).animate({backgroundColor: '#400101'});
  //$("#"+cssdiv).animate({backgroundColor: '#2180b7'},200);
  //$("#"+cssdiv).css("color", "white");

  //css("background-color", "#d9dde0");
  //
  for (i=0; i<19;i++) {
    temp="a"+i+"r";
    $('select[name='+temp+']').hide();
    $("#"+temp).hide();
  }
  $('select[name='+subelement+']').show();
  $("#"+subelement).show();
  if (checkbox==1 || checkbox==2 || checkbox==3 ||  checkbox == 4 ||checkbox == 5 ||checkbox == 7 ||checkbox == 12 ||checkbox == 13 ||checkbox == 14){
    $("#evidenceq").show();
  } else {
    $("#evidenceq").hide();
  }


  $("#a1r").change(function(){
    if($(this).val()==8)
    {
      $("#explain-choix").show() ;
    } else {
      $("#explain-choix").hide();
    }
  })



  if (checkbox!=1) {
    $("#explain-choix").hide();
  }
  if (checkbox==5) {
  $("#a5div").show();
}
if (checkbox!=5) {
  $("#a5div").hide();
}
}
$("#inputNameParking").change(function(){
  updateAOS();
})
function updateAOS() {
var BPA_members=["ParkingEye", "Smart Parking", "Euro Car Parks", "Highview Parking", "Civil Enforcement", "Euro Parking Collection", "CP Plus", "APCOA Parking UK", "Vehicle Control Services (VCS)", "MET Parking", "Horizon Parking", "Total Parking Solutions (TPS)", "Britannia Parking", "Gemini Parking Solutions"]
var IPC_members=["Athena APR", "G24", "UK Car Park Management (UKCPM)", "UKCPS", "National Parking Enforcement", "National Car Parks (NCP)", "Excel Parking", "Parking Control Management UK"]
var parkingcompanyselector=$("#inputNameParking").val()
var a = BPA_members.indexOf(parkingcompanyselector);
if (a!==-1) {
$("#AosQ").val("BPA");
AOSstatus(false);
} else {
var a = IPC_members.indexOf(parkingcompanyselector);
if (a!==-1) {
  $("#AosQ").val("IPC");
} else {
//alert ("parking company AOS not found")
}
}
var z=parkingArray.indexOf(parkingcompanyselector);
if (z==-1) {
AOSstatus(true);
}
//if ($("#parking_company").val()=="ParkingEye") {
//  alert("yes");
//}
}
$('input[type=radio][name=appeal]').change(function() {
updatefields();
})



function AOSstatus(vis) {
 if (vis==false) {
   $("#help-msg").hide();
 }
 if (vis==true) {
   $("#help-msg").show();
 }
}


$('.actions a:contains("Previous")').addClass('ghost-btn');

//$("#parking-form .steps ul").append('<li class="the-letter"><a href="/user/messages"></a><span class="number">4.</span> The letter</li>');

});
