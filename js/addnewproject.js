

$(document).ready(function () {
  $('#projectname').keyup(function()
	{
		var yourInput = $(this).val();
		re = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
		var isSplChar = re.test(yourInput);
		if(isSplChar)
		{
			$("#dialog-message-name").dialog(
        {
          modal: true,
          buttons: {
            Ok: function () {
              $(this).dialog("close");
              $("#projectname").focus();

            }
          }
        });
		}
	});

  $('#manager').keyup(function()
	{
		var yourInput = $(this).val();
		re = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
		var isSplChar = re.test(yourInput);
		if(isSplChar)
		{
			$("#dialog-message-manager").dialog(
        {
          modal: true,
          buttons: {
            Ok: function () {
              $(this).dialog("close");
              $("#manager").focus();

            }
          }
        });
		}
	});


  $('#startdatepicker').datepicker({
    format: "dd M yyyy",
    // format: "yyyy-mm-dd",
    autoclose: true,
    pickerPosition: "bottom-left",
    todayHighlight: true,


  });

  $('#startdatepicker').datepicker().on('changeDate', function (ev) {
    var selectedstartdate = $('#startdatepicker').datepicker('getDate');
    var todaydate = new Date();
    if (todaydate < selectedstartdate) {
      $('#projectstatus').val('Yet To Start');
      $('#projectstatus').prop('disabled', true);

    }

    else if (todaydate > selectedstartdate) {
      $("#projectstatus option[value='Yet To Start']").show();
      $('#projectstatus').prop('disabled', false);

    }

    $('#enddatepicker').datepicker().on('changeDate', function (ev) {
      if ($('#projectenddate').val() !== "") {
        var selectedenddate = $('#enddatepicker').datepicker('getDate');

        if (selectedenddate < selectedstartdate) {
          $("#dialog-message-enddate").dialog(
            {
              modal: true,
              buttons: {
                Ok: function () {
                  $(this).dialog("close");
                  $("#projectenddate").focus();



                }
              }
            });


        }

      }
    });

  });

  $('#enddatepicker').datepicker({
    format: "dd M yyyy",
    // format: "mm dd yyyy",

    autoclose: true,
    pickerPosition: "bottom-left",
    todayHighlight: true,



  });

  $('#enddatepicker').datepicker().on('changeDate', function (ev) {


    if ($('#projectenddate').val() !== "") {

      var selectedenddate = $('#enddatepicker').datepicker('getDate');
      $('#projectstatus').val('Closed');

      $("#projectstatus option[value='Yet To Start']").hide();
      $("#projectstatus option[value='In Progress']").hide();
      $("#projectstatus option[value='On Hold']").hide();
      $('#startdatepicker').datepicker().on('changeDate', function (ev) {
        if ($('#projectstartdate').val() !== "") {
          var selectedstartdate = $('#startdatepicker').datepicker('getDate');

          if (selectedenddate < selectedstartdate) {

            $("#dialog-message-startdate").dialog(
              {
                modal: true,
                buttons: {
                  Ok: function () {
                    $(this).dialog("close");
                    $("#projectstartdate").focus();
                  }
                }
              });
          }

        }
      });
    }

  });

  $('#currency').on('change', function () {
    var selectedcurrency = $("#currency option:selected").val();

    if (selectedcurrency === 'USD') {
      $('#customer').val('CodeObjects');
    }
    else if (selectedcurrency === 'INR') {
      $('#customer').val('Regus');
    }
    else if (selectedcurrency === 'GBP') {
      $('#customer').val('TRL');
    }
    else if (selectedcurrency === 'AUD') {
      $('#customer').val('Worldsmart');
    }
  });

  $('#customer').on('change', function () {
    var selectedcustomer = $("#customer option:selected").val();

    if (selectedcustomer === 'CodeObjects') {
      $('#currency').val('USD');
    }
    else if (selectedcustomer === 'Regus') {
      $('#currency').val('INR');
    }
    else if (selectedcustomer === 'TRL') {
      $('#currency').val('GBP');
    }
    else if (selectedcustomer === 'Worldsmart') {
      $('#currency').val('AUD');
    }
  });

  $('#projectstatus').on('change', function () {
    var selectedprojectstatus = $("#projectstatus option:selected").val();

    if (selectedprojectstatus === 'Closed') {
      $("#dialog-message-status-Closed").dialog(
        {
          modal: true,
          buttons: {
            Ok: function () {
              $(this).dialog("close");
            }
          }
        });
    }
    else if (selectedprojectstatus === 'Yet To Start') {
      $('#startdatepicker').datepicker().on('changeDate', function (ev) {
        var selectedstartdate = $('#startdatepicker').datepicker('getDate');
        var todaydate = new Date();
        if (todaydate > selectedstartdate) {
          $("#dialog-message-past-startdate").dialog(
            {
              modal: true,
              buttons: {
                Ok: function () {
                  $(this).dialog("close");
                  $("#projectstatus option[value='Yet To Start']").hide();
                  $('#projectstatus').val('In Progress');
                }
              }
            });

        }
      });
    }

  });





  function validateFields() {
    let detailsobject = new Object;
    var prodetails;
    detailsobject.pname = $('#projectname').val();
    detailsobject.pcode = $('#projectcode').val();
    detailsobject.currency = $('#currency').val();
    detailsobject.customer = $('#customer').val();
    detailsobject.type = $('#type').val();
    detailsobject.mgr = $('#manager').val();
    detailsobject.pstatus = $('#projectstatus').val();
    detailsobject.pstartdate = $('#projectstartdate').val();
    detailsobject.penddate = $('#projectenddate').val();

    localStorage.setItem("prodetails", JSON.stringify(detailsobject));
    console.log(prodetails);

    if ($('#projectname').val() === "") {
      $("#dialog-message-name").dialog(
        {
          modal: true,
          buttons: {
            Ok: function () {
              $(this).dialog("close");
              $("#projectname").focus();

            }
          }
        });

    }
    else if ($('#projectcode').val() === "") {
      $("#dialog-message-code").dialog(
        {
          modal: true,
          buttons: {
            Ok: function () {
              $(this).dialog("close");
              $("#projectcode").focus();

            }
          }
        });

    }

    else if ($('#currency').val() === "--Select--") {
      $("#dialog-message-currency").dialog(
        {
          modal: true,
          buttons: {
            Ok: function () {
              $(this).dialog("close");
              $("#currency").focus();

            }
          }
        });


    }



    else if ($('#customer').val() === "--Select--") {
      alert('Please select the Customer');
      $("#customer").focus();


    }
    else if ($('#type:checked').length === 0) {
      $("#dialog-message-type").dialog(
        {
          modal: true,
          buttons: {
            Ok: function () {
              $(this).dialog("close");
              $("#type").focus();


            }
          }
        });

    }
    else if ($('#manager').val() === "") {
      $("#dialog-message-manager").dialog(
        {
          modal: true,
          buttons: {
            Ok: function () {
              $(this).dialog("close");
              $("#manager").focus();


            }
          }
        });



    }
    else if ($('#projectstatus').val() === "--Select--") {
      $("#dialog-message-status").dialog(
        {
          modal: true,
          buttons: {
            Ok: function () {
              $(this).dialog("close");
              $("#projectstatus").focus();


            }
          }
        });

    }

    else if ($('#projectstartdate').val() === "") {
      $("#dialog-message-startdate").dialog(
        {
          modal: true,
          buttons: {
            Ok: function () {
              $(this).dialog("close");
              $("#projectstartdate").focus();


            }
          }
        });


    }
   
    else {

      $("#dialog-message-confirm").dialog(
        {
          modal: true,
          buttons: {
            Ok: function () {
              $(this).dialog("close");
              window.location.replace("./showdetails.html");



            }
          }
        });



    }




  }







  $('#submitbtn').click(function (e) {
    e.preventDefault();
    validateFields();

  });

});