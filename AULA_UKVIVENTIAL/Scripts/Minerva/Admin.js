function AdminVD() {
    $("#btnCambiarClave").click(function () {
        if (!$("#formClave").valid()) return false;

        $.post("@Url.Action('CambiarClave', 'Admin')", $("#formClave").serialize(), function (result) {
            if (result.success) {
                $(".content-wrapper").alerts(true, "Contraseña guardado correctamente");
                $("#modalCambiarClave").modal("toggle");
            } else {
                alert("Error: " + result.message);
            }
        }).fail(function (result) {
            //console.log(result.responseText);
        });
    });

    $("#formClave").validate({
        rules: {
            confirmarclave: {
                equalTo: "#txtNuevaClave"
            },
        },
        messages: {
            confirmarclave: {
                equalTo: "Por favor, escribe la misma contraseña",
            },
        },
        success: function (label, element) {
            $(label).remove();
            $(element).parents("div.form-group").removeClass("has-error");
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
            $(error).addClass("text-red");
            $(element).parents("div.form-group").addClass("has-error");
        }
    });




}