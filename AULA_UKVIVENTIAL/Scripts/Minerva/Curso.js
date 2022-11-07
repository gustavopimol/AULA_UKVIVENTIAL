function CursoVD() {
    var objOwner = this;
    var crearCur = true;

    /*objOwner.CodigoAlmacen = 0;*/

    var formNuevo = document.querySelectorAll("#formularioCurso");

    $("#btnCrearCurso").on("click", function () {

        if (!formNuevo[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formNuevo[0].classList.add("was-validated");

    });

    ListarCursos();

    function LimpiarCurso() {
        /*$("#txtCodigo").val("");*/
        $("#txtDescripcion").val("");
        $("#cboPeriodo").val("");
        $("#cboCiclo").val("");
        $("#cboNivel").val("");

        $("#formularioCurso").removeClass("was-validated");
    }

    $("#btnNuevoCurso").click(function () {
        /*$("#error").removeClass("show").addClass("hide");*/
        $.getJSON('/Curso/BuscarCorrelativoCurso', function (data) {

            if (data != "" && data[0] == "0") {
                var num = parseInt(data);
                num++;
                codigo = ("0000" + num).slice(-4);
            }
            else
                codigo = "0001";

            LimpiarCurso();
            $("#IdCurso").remove();
            $("#txtCodigo").val(codigo);
            crearCur = true;
        });

        $("#btnCrearCurso").text("Guardar").attr("class", "btn btn-primary");
    });

    $("#nuevoCurso").modal({
        backdrop: 'static'
    });

    $("#eliminarCurso").modal({
        backdrop: 'static'
    });

    function ListarCursos() {

        $("#cursoTable").DataTable().destroy();
        $("#cursoTable tbody").empty();

        $.ajax({
            url: '/Curso/Filtrar',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#cursoTable tbody").append($("<tr id='curso-" + this.IdCurso + "' data-id='" + this.IdCurso + "'>")
                        .append($("<td class='text-center'>").text(this.CodigoCurso))
                        .append($("<td class='text-center'>").text(this.Descripcion))
                        .append($("<td class='text-center'>").text(this.Periodo))
                        .append($("<td class='text-center'>").text(this.Ciclo))
                        .append($("<td class='text-center'>").text(this.Nivel))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnModificarCurso-" + this.IdCurso + "' data-id='" + this.IdCurso + "' data-estado='" + this.Estado + "' class='btnModificarCurso text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnAnularCurso-" + this.IdCurso + "' data-id='" + this.IdCurso + "' data-estado='" + this.Estado + "' class='btnAnularCurso text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                    );
                });
                if ($("#txtrol").val() == 'Administrador') {
                    $("#cursoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#cursoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#cursoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#cursoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#cursoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#cursoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#cursoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#cursoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#cursoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#cursoTable_wrapper .col-md-6:eq(0)');
                }

                $("#nuevoCurso").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#modalRedireccionar").modal("hide");
            //    /*$(".content-wrapper").alerts(false, xhr.statusText);*/
            //}
        });
    }


    $("#btnCrearCurso").on("click", function () {
        if ($("#txtDescripcion").val().length != 0 && $("#cboPeriodo").val().length != 0 && $("#cboCiclo").val().length != 0
            && $("#cboNivel").val().length != 0) {

            var idCiclo = $("#cboCiclo option:selected").val();
            var idNivel = $("#cboNivel option:selected").val();
            var idPeriodo = $("#cboPeriodo option:selected").val();
            var token = $("#formularioCurso").find("input[name=__RequestVerificationToken]").val();

            var curso = {
                IdCiclo: idCiclo,
                IdNivel: idNivel,
                IdPeriodo: idPeriodo,
                CodigoCurso: $("#txtCodigo").val(),
                Descripcion: $("#txtDescripcion").val(),
            };

            if (crearCur) {
                $("#btnCrearCurso").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                $.post('/Curso/CreateCurso', { __RequestVerificationToken: token, curso: curso }, function (result) {
                    if (result.success) {
                        ListarCursos();
                        $("#exito").removeClass("hide").addClass("show");
                        $("#exito2").html();
                    }
                    else {
                        $("#btnCrearCurso").removeAttr("disabled").html('Guardar');
                        $("#error").removeClass("hide").addClass("show");
                        $("#error2").html();

                    }
                });
            } else {
                $("#btnCrearCurso").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');

                $.post('/Curso/EditCurso', $("#formularioCurso").serialize(), function (result) {
                    if (result.success) {
                        ListarCursos();
                        $("#informa").removeClass("hide").addClass("show");
                        $("#info").html();
                    } else {
                        $("#btnCrearCurso").removeAttr("disabled").html('Guardar Cambios');
                        /*$("#liveToast2").removeClass("hide").addClass("show");*/
                        /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                        $("#nuevoCurso").modal("hide");
                    }
                });
            }
        }

        $("#btnCrearCurso").removeAttr("disabled").html('Guardar');
    });


    $(document).on("click", ".btnModificarCurso", function () {
        /*LimpiarSede();*/
        $("#nuevoCurso").modal("show");
        $("#formularioCurso").removeClass("was-validated");

        $.getJSON('/Curso/VerCurso', { IdCurso: $(this).attr("data-id") }, function (data) {
            console.log(data);
            $("#formularioCurso").prepend('<input type="hidden" name="IdCurso" id="IdCurso" value="' + data.IdCurso + '" />');

            $("#txtCodigo").val(data.CodigoCurso.trim()).attr("readonly", true);
            $("#txtDescripcion").val(data.Descripcion);
            $("#cboPeriodo").val(data.IdPeriodo);
            $("#cboCiclo").val(data.IdCiclo);
            $("#cboNivel").val(data.IdNivel);
            crearCur = false;
            $("#btnCrearCurso").text("Guardar Cambios").attr("class", "btn btn-warning");
        });
        /*LimpiarSede();*/

    });

    $(document).on("click", ".btnAnularCurso", function () {
        $("#IdCurso-d").val($(this).attr("data-id"));
        $("#eliminarCurso").modal("toggle");
    });

    $("#btnConfEliminarCurso").click(function () {
        $("#btnConfEliminarCurso").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Curso/DeleteCurso', $("#formularioCursoD").serialize(), function (result) {
            if (result.success) {
                ListarCursos();
                $("#elimina").removeClass("hide").addClass("show");
                $("#elim").html();
            } else {
                $("#btnConfEliminarCurso").removeAttr("disabled").html('Eliminar');
                /*$("#liveToast2").removeClass("hide").addClass("show");*/
                /*window.alert(false, "Error: " + result.message);*/
                /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                /*$("#eliminarSede").modal("hide");*/
            }
        });
        $("#eliminarCurso").modal("hide");
        $("#btnConfEliminarCurso").removeAttr("disabled").html('Eliminar');
    });

    $.getJSON('/Curso/CargarPeriodos', function (data) {
        periodos = data;

        $.each(data, function () {
            $("select#cboPeriodo").append($('<option value="' + this.IdPeriodo + '">' + this.Descripcion + '</option>'));
        });

    });

    $.getJSON('/Curso/CargarCiclos', function (data) {
        ciclos = data;

        $.each(data, function () {
            $("select#cboCiclo").append($('<option value="' + this.IdCiclo + '">' + this.Descripcion + '</option>'));
        });

    });

    $.getJSON('/Curso/CargarNiveles', function (data) {
        niveles = data;

        $.each(data, function () {
            $("select#cboNivel").append($('<option value="' + this.IdNivel + '">' + this.Descripcion + '</option>'));
        });

    });

}