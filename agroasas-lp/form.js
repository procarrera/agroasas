$(document).ready(function() {
  $("#submit").click(function(e) {
    e.preventDefault();
    let email = $("#email").val();

    function IsEmail(email) {
      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regex.test(email)) {
        console.log("nao válido");
        return false;
      } else {
        console.log("OK");
        return true;
      }
    }
    if (IsEmail(email) == true) {
    //   $("#status")
    //     .addClass("loading")
    //     .html("cadastrando seu e-mail...");

      $.ajax({
        url: "https://agro-backend.now.sh/register",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        crossDomain: true,
        contentType: "application/json",
        cache: false,
        method: "POST",
        dataType: "json",
        data: { email: email },
        success: function(res) {
          $("#submit").blur();
          $("#email").val("");
          $("#status").removeClass("error fadeIn fadeOut");
          $("#status")
            .addClass("fadeIn success fadeOut")
            .html("Parabéns, seu cadastro foi realizado com sucesso!");
          // alert(res.message)
          console.log(res);
        },
        error: function(xhr, status, error) {
          console.log(xhr.responseText);
        }
      });
    } else {
      $("#submit").blur();
      $("#status")
        .addClass("error")
        .html("Por favor, insira um e-mail válido.");
    }
  });
});
