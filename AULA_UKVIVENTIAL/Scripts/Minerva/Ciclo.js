function CicloVD() {
    var objOwner = this;
    var crearC = true;
    var formulario = document.querySelectorAll("#formularioCiclo");

    //if ($("#txtrol").val() == 'Administrador') {
    //    $("#cicloTable").DataTable({
    //        "responsive": true,
    //        "lengthChange": true,
    //        "autoWidth": false,
    //        "scrollCollapse": true,
    //        "scrollX": true,
    //        "colReorder": true,
    //        "buttons": ["excel", "pdf", "print", "colvis"]
    //    }).buttons().container().appendTo('#cicloTable_wrapper .col-md-6:eq(0)');
    //}
    //if ($("#txtrol").val() == 'Supervisor') {
    //    $("#cicloTable").DataTable({
    //        "responsive": true,
    //        "lengthChange": true,
    //        "autoWidth": false,
    //        "scrollCollapse": true,
    //        "scrollX": true,
    //        "colReorder": true,
    //        "buttons": ["excel", "pdf", "print", "colvis"]
    //    }).buttons().container().appendTo('#cicloTable_wrapper .col-md-6:eq(0)');
    //}
    //if ($("#txtrol").val() == 'Partner') {
    //    $("#cicloTable").DataTable({
    //        "responsive": true,
    //        "lengthChange": true,
    //        "autoWidth": false,
    //        "scrollCollapse": true,
    //        "scrollX": true,
    //        "colReorder": true,
    //        "buttons": ["colvis"]
    //    }).buttons().container().appendTo('#cicloTable_wrapper .col-md-6:eq(0)');
    //}
    //if ($("#txtrol").val() == 'Partner sin Ventas') {
    //    $("#cicloTable").DataTable({
    //        "responsive": true,
    //        "lengthChange": true,
    //        "autoWidth": false,
    //        "scrollCollapse": true,
    //        "scrollX": true,
    //        "colReorder": true,
    //        "buttons": ["colvis"]
    //    }).buttons().container().appendTo('#cicloTable_wrapper .col-md-6:eq(0)');
    //}
    //if ($("#txtrol").val() == 'Profesor') {
    //    $("#cicloTable").DataTable({
    //        "responsive": true,
    //        "lengthChange": true,
    //        "autoWidth": false,
    //        "scrollCollapse": true,
    //        "scrollX": true,
    //        "colReorder": true,
    //        "buttons": ["colvis"]
    //    }).buttons().container().appendTo('#cicloTable_wrapper .col-md-6:eq(0)');
    //}

    $("#nuevoCiclo").modal({
        backdrop: 'static'
    });

    $("#eliminarCiclo").modal({
        backdrop: 'static'
    });

    FiltrarCiclo();

    $("#btnnuevoCiclo").click(function () {
        $("#formularioCiclo").removeClass("was-validated");
        $("#existe").removeClass("show");
        $("#txtDescripcion").val("");
        $.getJSON('BuscarCorrelativoCiclo', function (data) {
            if (data != "" && data[0] == "0") {
                var num = parseInt(data);
                num++;
                codigo = ("0000" + num).slice(-4);
            }
            else
                codigo = "0001";
            $("#IdCiclo").remove();
            $("#txtCodigo").val(codigo);
            crearC = true;
        });
        $("#btnCrearCiclo").text("Guardar").attr("class", "btn btn-primary");
    });

    $("#btnCrearCiclo").click(function () {
        if (!formulario[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formulario[0].classList.add("was-validated");
    });

    function FiltrarCiclo() {
        $("#cicloTable").DataTable().destroy();
        $("#cicloTable tbody").empty();
        $.ajax({
            url: '/Ciclo/Filtrar',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#cicloTable tbody").append($("<tr id='IdCiclo-" + this.IdCiclo + "' data-id='" + this.IdCiclo + "'>")
                        .append($("<td class='text-center'>").text(this.Codigo))
                        .append($("<td class='text-center'>").text(this.Descripcion))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btneditarCiclo-" + this.IdCiclo + "' data-id='" + this.IdCiclo + "' class='btneditarCiclo text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnEliminarCiclo-" + this.IdCiclo + "' data-id='" + this.IdCiclo + "' class='btnEliminarCiclo text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                    );
                });
                //if ($("#txtrol").val() == 'Administrador') {
                //    $("#cicloTable").DataTable({
                //        "responsive": true,
                //        "lengthChange": true,
                //        "autoWidth": false,
                //        "scrollCollapse": true,
                //        "scrollX": true,
                //        "colReorder": true,
                //        "buttons": ["excel", "pdf", "print", "colvis"]
                //    }).buttons().container().appendTo('#cicloTable_wrapper .col-md-6:eq(0)');
                //}
                //if ($("#txtrol").val() == 'Supervisor') {
                //    $("#cicloTable").DataTable({
                //        "responsive": true,
                //        "lengthChange": true,
                //        "autoWidth": false,
                //        "scrollCollapse": true,
                //        "scrollX": true,
                //        "colReorder": true,
                //        "buttons": ["excel", "pdf", "print", "colvis"]
                //    }).buttons().container().appendTo('#cicloTable_wrapper .col-md-6:eq(0)');
                //}
                //if ($("#txtrol").val() == 'Partner') {
                //    $("#cicloTable").DataTable({
                //        "responsive": true,
                //        "lengthChange": true,
                //        "autoWidth": false,
                //        "scrollCollapse": true,
                //        "scrollX": true,
                //        "colReorder": true,
                //        "buttons": ["colvis"]
                //    }).buttons().container().appendTo('#cicloTable_wrapper .col-md-6:eq(0)');
                //}
                //if ($("#txtrol").val() == 'Partner sin Ventas') {
                //    $("#cicloTable").DataTable({
                //        "responsive": true,
                //        "lengthChange": true,
                //        "autoWidth": false,
                //        "scrollCollapse": true,
                //        "scrollX": true,
                //        "colReorder": true,
                //        "buttons": ["colvis"]
                //    }).buttons().container().appendTo('#cicloTable_wrapper .col-md-6:eq(0)');
                //}
                //if ($("#txtrol").val() == 'Profesor') {
                //    $("#cicloTable").DataTable({
                //        "responsive": true,
                //        "lengthChange": true,
                //        "autoWidth": false,
                //        "scrollCollapse": true,
                //        "scrollX": true,
                //        "colReorder": true,
                //        "buttons": ["colvis"]
                //    }).buttons().container().appendTo('#cicloTable_wrapper .col-md-6:eq(0)');
                //}
                $("#cicloTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#cicloTable_wrapper .col-md-6:eq(0)');
                $("#nuevoCiclo").modal("hide");
                $("#eliminarCiclo").modal("hide");
            },
        });
    }

    $("#btnCrearCiclo").on("click", function () {
        if ($('#txtDescripcion').val().length != 0) {
            if (crearC) {
                $("#btnCrearCiclo").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');
                $.post('/Ciclo/CreateCiclo', $("#formularioCiclo").serialize(), function (result) {
                    if (result.success) {
                        FiltrarCiclo();
                        $("#crear").removeClass("hide").addClass("show").fadeOut(8000);
                        $("#crear1").html();
                    }
                    else {
                        $("#formularioCiclo").removeClass("was-validated");
                        $("#btnCrearCiclo").removeAttr("disabled").html('Guardar');
                        $("#existe").removeClass("hide").addClass("show").fadeOut(8000);
                        $("#existe1").html();
                    }
                });
            } else {
                $("#btnCrearCiclo").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');
                $.post('/Ciclo/EditCiclo', $("#formularioCiclo").serialize(), function (result) {
                    if (result.success) {
                        FiltrarCiclo();
                        $("#editar").removeClass("hide").addClass("show").fadeOut(8000);
                        $("#editar1").html();
                    } else {
                        $("#formularioCiclo").removeClass("was-validated");
                        $("#btnCrearCiclo").removeAttr("disabled").html('Guardar Cambios');
                        $("#existe").removeClass("hide").addClass("show").fadeOut(8000);
                        $("#existe1").html();
                    }
                });
            }
        }
        $("#btnCrearCiclo").removeAttr("disabled").html('Guardar');
    });

    $(document).on("click", ".btneditarCiclo", function () {
        $("#formularioCiclo").removeClass("was-validated");
        $("#nuevoCiclo").modal("toggle");
        $("#liveToast3").removeClass("show");
        $.getJSON('/Ciclo/VerCiclo', { IdCiclo: $(this).attr("data-id") }, function (data) {
            $("#formularioCiclo").prepend('<input type="hidden" name="IdCiclo" id="IdCiclo" value="' + data.IdCiclo + '" />');
            $("#txtCodigo").val(data.Codigo.trim()).attr("readonly", true);
            $("#txtDescripcion").val(data.Descripcion);
            crearC = false;
            $("#btnCrearCiclo").text("Guardar Cambios").attr("class", "btn btn-warning");
        });
    });

    $(document).on("click", ".btnEliminarCiclo", function () {
        $("#IdCiclo-d").val($(this).attr("data-id"));
        $("#eliminarCiclo").modal("show");
        $("#liveToast4").removeClass("show");
    });

    $("#btnCofEliminarCiclo").click(function () {
        $("#btnCofEliminarCiclo").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');
        $.post('/Ciclo/DeleteCiclo', $("#formularioCicloE").serialize(), function (result) {
            if (result.success) {
                FiltrarCiclo();
                $("#eliminar").removeClass("hide").addClass("show").fadeOut(8000);
                $("#eliminar1").html();
            } else {
                $("#btnCofEliminarCiclo").removeAttr("disabled").html('Eliminar');

            }
        });
        $("#btnCofEliminarCiclo").removeAttr("disabled").html('Eliminar');
        /*$("#eliminarNivel").modal("hide");*/
    });
}