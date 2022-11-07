function AulaVD() {
    var objAula = this;
    var crearA = true;

    /*objOwner.CodigoAlmacen = 0;*/

    var formNuevo = document.querySelectorAll("#formularioAula");
    if ($("#txtrol").val() == 'Administrador') {
        $("#aulaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#aulaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Supervisor') {
        $("#aulaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#aulaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner') {
        $("#aulaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#aulaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner sin Ventas') {
        $("#aulaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#aulaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Profesor') {
        $("#aulaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#aulaTable_wrapper .col-md-6:eq(0)');
    }
    $("#btnCrearAula").on("click", function () {

        if (!formNuevo[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formNuevo[0].classList.add("was-validated");

    });

    ListarAulas();

    function LimpiarAula() {
        /*$("#txtCodigo").val("");*/
        $("#txtDescripcion").val("");
        $("#txtCantMaxAlumnos").val("");
        //$("#cboDepartamento").empty();
        //$("#cboProvincia").empty();

        $("#formularioAula").removeClass("was-validated");
    }

    $("#btnNuevaAula").click(function () {
        $("#error").removeClass("show").addClass("hide");
        $.getJSON('/Aula/BuscarCorrelativoAula', function (data) {

            if (data != "" && data[0] == "0") {
                var num = parseInt(data);
                num++;
                codigo = ("0000" + num).slice(-4);
            }
            else
                codigo = "0001";

            LimpiarAula();
            $("#IdAula").remove();
            $("#txtCodigo").val(codigo);
            crearA = true;
        });

        $("#btnCrearAula").text("Guardar").attr("class", "btn btn-primary");
    });

    $("#nuevaAula").modal({
        backdrop: 'static'
    });

    $("#eliminarAula").modal({
        backdrop: 'static'
    });

    function ListarAulas() {

        $("#aulaTable").DataTable().destroy();
        $("#aulaTable tbody").empty();

        $.ajax({
            url: '/Aula/Filtrar',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#aulaTable tbody").append($("<tr id='aula-" + this.IdAula + "' data-id='" + this.IdAula + "'>")
                        .append($("<td hidden class='text-center' data-id='" + this.IdAula+"'>").text(this.IdAula))
                        .append($("<td class='text-center'>").text(this.CodigoAula))
                        .append($("<td class='text-center'>").text(this.Descripcion))
                        .append($("<td class='text-center'>").text(this.CantMaxAlumnos))
                        .append($("<td class='text-center'>").text(this.TotalMatri))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnModificarAula-" + this.IdAula + "' data-id='" + this.IdAula + "' data-estado='" + this.Estado + "' class='btnModificarAula text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<span>").text(this.IdAula).attr("hidden"))
                            .append($("<a id='btnVerAlumnos' data-id='" + this.IdAula + "' data-idaula='" + this.IdAula + "' data-estado='" + this.Estado + "' class='btnVerAlumnos text-lg text-yellow' >")
                                .append($("<i class='far fa-eye'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnAnularAula-" + this.IdAula + "' data-id='" + this.IdAula + "' data-estado='" + this.Estado + "' class='btnAnularAula text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                        
                    );
                    /*<a id="btnActualizarStock" class="btn btn-info ladda-button mb-1" title="Actualiza Cantidad de Aula">Actualiza Cantidad de Aula</a> href='@Url.Action(" + GetAlumnos +")'*/
                });

                if ($("#txtrol").val() == 'Administrador') {
                    $("#aulaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#aulaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#aulaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#aulaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#aulaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#aulaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#aulaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#aulaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#aulaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#aulaTable_wrapper .col-md-6:eq(0)');
                }

                $("#nuevaAula").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#modalRedireccionar").modal("hide");
            //    /*$(".content-wrapper").alerts(false, xhr.statusText);*/
            //}
        });
    }


    $("#btnCrearAula").on("click", function () {
        if ($("#txtDescripcion").val().length != 0 && $("#txtCantMaxAlumnos").val().length != 0) {

            if (crearA) {
                $("#btnCrearAula").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                $.post('/Aula/CreateAula', $("#formularioAula").serialize(), function (result) {
                    if (result.success) {
                        ListarAulas();
                        $("#exito").removeClass("hide").addClass("show");
                        $("#exito2").html();
                    }
                    else {
                        /*$("#formularioSede").parents("div.form-group").addClass("has-error");*/
                        $("#btnCrearAula").removeAttr("disabled").html('Guardar');
                        $("#error").removeClass("hide").addClass("show");
                        $("#error2").html();

                    }
                });
            } else {
                $("#btnCrearAula").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');

                $.post('/Aula/EditAula', $("#formularioAula").serialize(), function (result) {
                    if (result.success) {
                        ListarAulas();
                        $("#informa").removeClass("hide").addClass("show");
                        $("#info").html();

                    } else {
                        $("#btnCrearAula").removeAttr("disabled").html('Guardar Cambios');
                        /*$("#liveToast2").removeClass("hide").addClass("show");*/
                        /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                        $("#nuevaAula").modal("hide");
                    }
                });
            }

        }
        $("#btnCrearAula").removeAttr("disabled").html('Guardar');
        
    });

    $(document).on("click", ".btnModificarAula", function () {
        /*LimpiarCombos();*/
        $("#nuevaAula").modal("show");
        $("#formularioAula").removeClass("was-validated");

        $.getJSON('/Aula/VerAula', { IdAula: $(this).attr("data-id") }, function (data) {
            $("#formularioAula").prepend('<input type="hidden" name="IdAula" id="IdAula" value="' + data.IdAula + '" />');

            $("#txtCodigo").val(data.CodigoAula.trim()).attr("readonly", true);
            $("#txtDescripcion").val(data.Descripcion);
            $("#txtCantMaxAlumnos").val(data.CantMaxAlumnos);
                        
            crearA = false;
            $("#btnCrearAula").text("Guardar Cambios").attr("class", "btn btn-warning");

        });
        /*LimpiarSede();*/

    });

    $(document).on("click", ".btnAnularAula", function () {
        $("#IdAula-d").val($(this).attr("data-id"));
        $("#eliminarAula").modal("toggle");
    });

    $(document).on("click", "#btnVerAlumnos", function () {
        var idaula = $(this).attr("data-id");
        window.location.href = "ListaAlumnos?idAula=" + idaula;
    });
    
    $("#btnConfEliminarAula").click(function () {
        $("#btnConfEliminarAula").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Aula/DeleteAula', $("#formularioAulaD").serialize(), function (result) {
            if (result.success) {
                ListarAulas();
                $("#elimina").removeClass("hide").addClass("show");
                $("#elim").html();
            } else {
                $("#btnConfEliminarAula").removeAttr("disabled").html('Eliminar');
                /*$("#liveToast2").removeClass("hide").addClass("show");*/
                /*window.alert(false, "Error: " + result.message);*/
                /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                /*$("#eliminarSede").modal("hide");*/
            }
        });
        $("#eliminarAula").modal("hide");
        $("#btnConfEliminarAula").removeAttr("disabled").html('Eliminar');
    });

    
}

