

if (window.localStorage.getItem('token') != null) {
  window.location = "/home";
}

$(document).ready(function () {
  $("#formotp").hide();
  $("#loginname").focus();
});


function assemble() {
  var password_field = document.getElementById("username");
  var token_field = document.getElementById("irstoken");
  var data_field = document.getElementById("data");
  data_field.value = Base64.encode(sha1(password_field.value + token_field.value) + (new Date().getTime()));
}

$('#username').keypress(function (e) {
  if (e.which == 13) {
      $('#password').focus();
  }
});

$('#password').keypress(function (e) {
  if (e.which == 13) {
      $('#login').click();
  }
});

var maxotp = 10;
var bolehkirimotp = true;
var waktuotp = 10;

function refreshCaptcha() {
  var img = document.images['captchaimg'];
  img.src = img.src.substring(0, img.src.lastIndexOf("? ")) + "?rand=" + Math.random() * 1000;
  $('#kodepengaman').val('');
}

$('#login').click(function () {

  if ($('#txthp').val() == '') {
      alert('USERNAME belum diisi'); return false;
  }
  if ($('#txtpin').val() == '') {
      alert('Password belum diisi'); return false;
  }


  assemble();

  $('#loginweb').hide();
  $('#flash').show();
  $(" #flash ").html('<div style="float:left;font-size:13px;font-family:Open Sans; "><span style="font-size:25px;font-weight:400;color:#333333;">Mohon tunggu...</span><div style="font-size:13px;font-weight:400;color:#333333;margin-top:10px; ">system sedang validasi data anda</div><div class="progress" style="margin-top:10px;width:275px; "><div class="progress-bar progress-bar-striped active " role="progressbar" aria-valuenow="100 " aria-valuemin="0 " aria-valuemax="100 " style="width:100% "></div></div></div>');

  $.ajax({
      type: "POST",
      url: 'auth/authenticate',
      dataType: 'json',
      data: $("#loginweb").serialize(),
      success: function (data) {
          if (data.success) {
              $("#flash ").html('<div style="float:left;font-size:13px;font-family:Open Sans; "><span style="font-size:25px;font-weight:400;color:#333333;">Verifikasi Berhasil,</span><div style="font-size:13px;font-weight:400;color:#333333;margin-top:10px; ">sedang dialihkan ke halaman utama</div><div class="progress" style="margin-top:10px;width:275px; "><div class="progress-bar progress-bar-striped active " role="progressbar" aria-valuenow="100 " aria-valuemin="0 " aria-valuemax="100 " style="width:100% "></div></div></div>');
              window.localStorage.setItem("token", data.token);
              //localStorage.clear();
              window.location = "home";
          }
          else {
              alert(data.msg),
                  $('#flash').hide(),
                  $('#loginweb').show(),
                  $("#loginname").focus();
                  refreshCaptcha();
          }

      }
  });
  return false;
});
