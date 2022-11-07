function NivelVD() {
    var objOwner = this;
    var crearN = true;
    var bola = document.querySelectorAll("#formularioNivel");

    if ($("#txtrol").val() == 'Administrador') {
        $("#nivelTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#nivelTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Supervisor') {
        $("#nivelTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#nivelTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner') {
        $("#nivelTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#nivelTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner sin Ventas') {
        $("#nivelTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#nivelTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Profesor') {
        $("#nivelTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#nivelTable_wrapper .col-md-6:eq(0)');
    }
    

    $("#nuevoNivel").modal({
        backdrop: 'static'
    });

    $("#eliminarNivel").modal({
        backdrop: 'static'
    });

    FiltrarNivel();

    $("#btnnuevoNivel").click(function () {
        $("#formularioNivel").removeClass("was-validated");
        $("#existe").removeClass("show");
        $("#txtDescripcion").val("");
        $.getJSON('BuscarCorrelativoNivel', function (data) {
            if (data != "" && data[0] == "0") {
                var num = parseInt(data);
                num++;
                codigo1 = ("0000" + num).slice(-4);
            }
            else
                codigo1 = "0001";
            $("#IdNivel").remove();
            $("#txtCodigo").val(codigo1);
            crearN = true;
        });
        $("#btnCrearNivel").text("Guardar").attr("class", "btn btn-primary");
    });

    $("#btnCrearNivel").click(function () {
        if (!bola[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        bola[0].classList.add("was-validated");
    });

    function FiltrarNivel() {
        $("#nivelTable").DataTable().destroy();
        $("#nivelTable tbody").empty();
        $.ajax({
            url: '/Nivel/Filtrar',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#nivelTable tbody").append($("<tr id='IdNivel-" + this.IdNivel + "' data-id='" + this.IdNivel + "'>")
                        .append($("<td class='text-center'>").text(this.Codigo))
                        .append($("<td class='text-center'>").text(this.Descripcion))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btneditarNivel-" + this.IdNivel + "' data-id='" + this.IdNivel + "' class='btneditarNivel text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnEliminarNivel-" + this.IdNivel + "' data-id='" + this.IdNivel + "' class='btnEliminarNivel text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                    );
                });
                if ($("#txtrol").val() == 'Administrador') {
                    $("#nivelTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#nivelTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#nivelTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#nivelTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#nivelTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#nivelTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#nivelTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#nivelTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#nivelTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#nivelTable_wrapper .col-md-6:eq(0)');
                }
                $("#nuevoNivel").modal("hide");
                $("#eliminarNivel").modal("hide");
            },
        });
    }

    $("#btnCrearNivel").on("click", function () {
        if ($('#txtDescripcion').val().length != 0) {
            if (crearN) {
                $("#btnCrearNivel").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');
                $.post('/Nivel/CreateNivel', $("#formularioNivel").serialize(), function (result) {
                    if (result.success) {
                        FiltrarNivel();
                        $("#crear").removeClass("hide").addClass("show").fadeOut(8000);
                        $("#crear1").html();
                    }
                    else {
                        $("#formularioNivel").removeClass("was-validated");
                        $("#btnCrearNivel").removeAttr("disabled").html('Guardar');
                        $("#existe").removeClass("hide").addClass("show").fadeOut(8000);
                        $("#existe1").html();
                    }
                });
            } else {
                $("#btnCrearNivel").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');
                $.post('/Nivel/EditNivel', $("#formularioNivel").serialize(), function (result) {
                    if (result.success) {
                        FiltrarNivel();
                        $("#editar").removeClass("hide").addClass("show");
                        $("#editar1").html();
                    } else {
                        $("#formularioNivel").removeClass("was-validated");
                        $("#btnCrearNivel").removeAttr("disabled").html('Guardar Cambios');
                        $("#existe").removeClass("hide").addClass("show").fadeOut(8000);
                        $("#existe1").html();
                    }
                });
            }
        }
        $("#btnCrearNivel").removeAttr("disabled").html('Guardar');     
    });

    $(document).on("click", ".btneditarNivel", function () {
        $("#formularioNivel").removeClass("was-validated");
        $("#nuevoNivel").modal("toggle");
        $("#liveToast3").removeClass("show");
        $.getJSON('/Nivel/VerNivel', { IdNivel: $(this).attr("data-id") }, function (data) {
            $("#formularioNivel").prepend('<input type="hidden" name="IdNivel" id="IdNivel" value="' + data.IdNivel + '" />');
            $("#txtCodigo").val(data.Codigo.trim()).attr("readonly", true);
            $("#txtDescripcion").val(data.Descripcion);
            crearN = false;           
            $("#btnCrearNivel").text("Guardar Cambios").attr("class", "btn btn-warning");
        });
    });

    $(document).on("click", ".btnEliminarNivel", function () {
        $("#IdNivel-d").val($(this).attr("data-id"));
        $("#eliminarNivel").modal("show");
        $("#liveToast4").removeClass("show");
    });

    $("#btnCofEliminarNivel").click(function () {
        $("#btnCofEliminarNivel").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Nivel/DeleteNivel', $("#formularioNivelE").serialize(), function (result) {
            if (result.success) {
                FiltrarNivel();
                $("#eliminar").removeClass("hide").addClass("show").fadeOut(8000);
                $("#eliminar1").html();
            } else {
                $("#btnCofEliminarNivel").removeAttr("disabled").html('Eliminar');

            }
        });       
        $("#btnCofEliminarNivel").removeAttr("disabled").html('Eliminar');
        /*$("#eliminarNivel").modal("hide");*/
    });
}