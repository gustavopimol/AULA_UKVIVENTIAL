function ModuloVD{
    var objOwner = this;

    $('input[type="checkbox"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-green'
    })

    $("#btnGuardar").click(function () {
        event.preventDefault();

        $("#btnGuardar").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

        $.post("/Modulo/Actualizar"), $("#formModulo").serialize(), function (result) {
            if (result.success) {
                location.reload();
            } else {
                $("#btnGuardar").removeAttr("disabled").html('Guardar');
                $(".content-wrapper").alerts(false, result.message);
            }
        });
    });
}