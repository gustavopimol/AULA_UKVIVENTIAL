function PeriodoVD() {
    var objOwner = this;
    var crearP = true;

    /*objOwner.CodigoAlmacen = 0;*/

    var formNuevo = document.querySelectorAll("#formularioPeriodo");

    $("#btnCrearPeriodo").on("click", function () {

        if (!formNuevo[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formNuevo[0].classList.add("was-validated");

    });

    $("#nuevoPeriodo").modal({
        backdrop: 'static'
    });

    ListarPeriodos();

    function LimpiarPeriodo() {
        /*$("#txtCodigo").val("");*/
        $("#txtDescripcion").val("");

        $("#formularioPeriodo").removeClass("was-validated");
    }

    $("#btnNuevoPeriodo").click(function () {
        $("#error").removeClass("show").addClass("hide");
        $.getJSON('/Periodo/BuscarCorrelativoPeriodo', function (data) {

            if (data != "" && data[0] == "0") {
                var num = parseInt(data);
                num++;
                codigo = ("0000" + num).slice(-4);
            }
            else
                codigo = "0001";

            LimpiarPeriodo();
            $("#IdPeriodo").remove();
            $("#txtCodigo").val(codigo);
            crearP = true;
        });

        $("#btnCrearPeriodo").text("Guardar").attr("class", "btn btn-primary");
    });

    function ListarPeriodos() {

        $("#periodoTable").DataTable().destroy();
        $("#periodoTable tbody").empty();

        $.ajax({
            url: '/Periodo/Filtrar',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#periodoTable tbody").append($("<tr id='periodo-" + this.IdPeriodo + "' data-id='" + this.IdPeriodo + "'>")
                        .append($("<td class='text-center'>").text(this.CodigoPeriodo))
                        .append($("<td class='text-center'>").text(this.Descripcion))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnModificarPeriodo-" + this.IdPeriodo + "' data-id='" + this.IdPeriodo + "' data-estado='" + this.Estado + "' class='btnModificarPeriodo text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnAnularPeriodo-" + this.IdPeriodo + "' data-id='" + this.IdPeriodo + "' data-estado='" + this.Estado + "' class='btnAnularPeriodo text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                    );
                });

                if ($("#txtrol").val() == 'Administrador') {
                    $("#periodoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#periodoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#periodoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#periodoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#periodoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#periodoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#periodoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#periodoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#periodoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#periodoTable_wrapper .col-md-6:eq(0)');
                }

                

                $("#nuevoPeriodo").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#modalRedireccionar").modal("hide");
            //    /*$(".content-wrapper").alerts(false, xhr.statusText);*/
            //}
        });
    }


    $("#btnCrearPeriodo").on("click", function () {
        if ($("#txtDescripcion").val().length != 0) {

            if (crearP) {
                $("#btnCrearPeriodo").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                $.post('/Periodo/CreatePeriodo', $("#formularioPeriodo").serialize(), function (result) {
                    if (result.success) {
                        ListarPeriodos();
                        $("#exito").removeClass("hide").addClass("show");
                        $("#exito2").html();
                    }
                    else {
                        /*$("#formularioSede").parents("div.form-group").addClass("has-error");*/
                        $("#btnCrearPeriodo").removeAttr("disabled").html('Guardar');
                        $("#error").removeClass("hide").addClass("show");
                        $("#error2").html();

                    }
                });
            } else {
                $("#btnCrearPeriodo").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');

                $.post('/Periodo/EditPeriodo', $("#formularioPeriodo").serialize(), function (result) {
                    if (result.success) {
                        ListarPeriodos();
                        $("#informa").removeClass("hide").addClass("show");
                        $("#info").html();
                    } else {
                        $("#btnCrearPeriodo").removeAttr("disabled").html('Guardar Cambios');
                        /*$("#liveToast2").removeClass("hide").addClass("show");*/
                        /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                        $("#nuevoPeriodo").modal("hide");
                    }
                });
            }

        }

        $("#btnCrearPeriodo").removeAttr("disabled").html('Guardar');
    });


    $(document).on("click", ".btnModificarPeriodo", function () {
        /*LimpiarSede();*/
        $("#nuevoPeriodo").modal("show");
        $("#formularioPeriodo").removeClass("was-validated");

        $.getJSON('/Periodo/VerPeriodo', { IdPeriodo: $(this).attr("data-id") }, function (data) {
            $("#formularioPeriodo").prepend('<input type="hidden" name="IdPeriodo" id="IdPeriodo" value="' + data.IdPeriodo + '" />');

            $("#txtCodigo").val(data.CodigoPeriodo.trim()).attr("readonly", true);
            $("#txtDescripcion").val(data.Descripcion);
            
            crearP = false;
            $("#btnCrearPeriodo").text("Guardar Cambios").attr("class", "btn btn-warning");
        });
        /*LimpiarSede();*/

    });

    $(document).on("click", ".btnAnularPeriodo", function () {
        $("#IdPeriodo-d").val($(this).attr("data-id"));
        $("#eliminarPeriodo").modal("toggle");
    });

    $("#btnConfEliminarPeriodo").click(function () {
        $("#btnConfEliminarPeriodo").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Periodo/DeletePeriodo', $("#formularioPeriodoD").serialize(), function (result) {
            if (result.success) {
                ListarPeriodos();
                $("#elimina").removeClass("hide").addClass("show");
                $("#elim").html();
            } else {
                $("#btnConfEliminarPeriodo").removeAttr("disabled").html('Eliminar');
                /*$("#liveToast2").removeClass("hide").addClass("show");*/
                /*window.alert(false, "Error: " + result.message);*/
                /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                /*$("#eliminarSede").modal("hide");*/
            }
        });
        $("#eliminarPeriodo").modal("hide");
        $("#btnConfEliminarPeriodo").removeAttr("disabled").html('Eliminar');
    });

}