function AlumnoVD() {
    var objOwner = this;
    var crearA = true;
    var bola = document.querySelectorAll("#formularioAlumno");
    var bo1 = document.querySelectorAll("#formularioAlumnoEl");

    if ($("#txtrol").val() == 'Administrador') {
        $("#alumnoTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]

        }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Supervisor') {
        $("#alumnoTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]

        }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner') {
        $("#alumnoTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]

        }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner sin Ventas') {
        $("#alumnoTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]

        }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Profesor') {
        $("#alumnoTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]

        }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
    }
    
    /*FiltrarAlumno();*/

    if ($("#cboPais").val() == "174") {
        $("#cboDepartamento").empty();
        $("#cboDepartamento").append($("<option style='text - align: center'>").val("").text("-- Seleccionar Departamento --"));
        /*$("#mostrarDepartamento").show();*/
        $.getJSON('/Alumno/CargarDepartamentos', function (data) {
            $.each(data, function () {
                $("#cboDepartamento").append($('<option value="' + this.IdDepartamento + '">' + this.Nombre + '</option>'));
            });

        });

        $("#cboDepartamento").on("change", function () {
            $("#cboProvincia").empty();
            $("#cboProvincia").append($("<option style='text - align: center'>").val("").text("-- Seleccionar Provincia --"));
            $.getJSON('/Alumno/CargarProvincias', { IdDepartamento: $(this).val() }, function (data) {

                $.each(data, function () {
                    $("#cboProvincia").append($('<option value="' + this.IdProvincia + '" data-ubigeo="' + this.Codigo + '">' + this.Nombre + '</option>'));
                });
            });
        });
        /*$("#cboDepartamento").attr("required", true);*/
        //$("#cboProvincia").attr("required", true);
        $("#cboProvincia").on("change", function () {
            $("#txtUbigeo").val("");
            if ($(this).val() != "") {
                if ($(this).val() == "0") {
                    $("#txtUbigeo").val("");
                }
                else {
                    $("#txtUbigeo").val($("#cboProvincia option:selected").data().ubigeo);
                }
            }
        });
    }


    $("#btnnuevoAlumno").click(function () {
        $("#formularioAlumno").removeClass("was-ll");
        $("#btnCrearAlumno").attr("disabled", false);
        $("#existe").removeClass("show");
        $("#txtDni").val("").attr("disabled", true);
        $("#txtNombres").val("");
        $("#txtAPaterno").val("");
        $("#txtAMaterno").val("");
        $("#txtFechaNac").val("");
        $("#txtDireccion").val("");
        $("#txtUbigeo").val("");
        $("#txtEmail").val("");
        $("#cboSede").val("");
        $("#cboTipo").val("");
        $("#cboPromotor").val("");
        $("#cboDepartamento").val("");
        $("#cboProvincia").val("");
        $("#txtTelefono").val("");
        
        $.getJSON('BuscarCorrelativoAlumno', function (data) {
            if (data != "") {
                var num = parseInt(data);
                num++;
                codigo = (num);
            }
            else
                codigo = 1;
            $("#Id").remove();
            $("#txtIdAlumno").val(codigo);
            crearA = true;
        });

        
        $("#btnCrearAlumno").text("Guardar").attr("class", "btn btn-primary");
    });

    $("#nuevoAlumno").modal({
        backdrop: 'static'
    });

    $("#confeliminar").modal({
        backdrop: 'static'
    });

    $("#btnCrearAlumno").click(function () {
        if (!bola[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        bola[0].classList.add("was-validated");
    });

    $("#btnCofEliminarAlumno").click(function () {
        if (!bo1[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        bo1[0].classList.add("was-validated");
    });
    $("#btnFiltrar").trigger("click");
    $("#btnFiltrar").on("click", function () {
        if ($("#txtDocu").val().length != 0 || $("#txtNombresAlumno").val().length != 0 || $("#sedes").val().length != 0 || $("#txtFechCrD").val().length != 0
           || $("#txtFechCrH").val().length != 0) {
            var finicio, ffinal, docum, nombal, sedesal;
            finicio = $("#txtFechCrD").val();
            ffinal = $("#txtFechCrH").val();
            docum = $("#txtDocu").val();
            sedesal = ($("#sedes").val() == "") ? 0 : $("#sedes").val();
            nombal = $("#txtNombresAlumno").val();

            $("#alumnoTable").DataTable().destroy();
            $("#alumnoTable tbody").empty();
            $("#txtFechaMod").attr("hide", true);
            $.ajax({
                url: '/Alumno/Filtrar',
                data: {
                    inicio: finicio,
                    fin: ffinal,
                    sedesal: sedesal,
                    docum: docum,
                    nombal: nombal,
                },
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function () {
                        $("#alumnoTable tbody").append($("<tr id='Alumno-" + this.Id + "' data-id='" + this.Id + "'>")
                            .append($("<td class='text-center' hidden>").text(this.IdAlumno))
                            .append($("<td class='text-center'>").text(this.Nombres))
                            .append($("<td class='text-center'>").text(this.APaterno + " " + this.AMaterno))
                            .append($("<td class='text-center'>").text(this.Tipo))
                            .append($("<td class='text-center'>").text(this.Dni))
                            .append($("<td class='text-center'>").text(this.FechaNacimientoS))
                            .append($("<td class='text-center'>").text(this.Direccion))
                            .append($("<td class='text-center'>").text(this.Ubigeo))
                            .append($("<td class='text-center'>").text(this.Telefono))
                            .append($("<td class='text-center'>").text(this.Email))
                            .append($("<td class='text-center'>").text(this.Sede))
                            .append($("<td class='text-center'>").text(this.Promotor))
                            .append($("<td class='text-center'>").text(this.FechaCreacionS))
                            .append($("<td class='text-center'>").text(this.Registrador))
                            .append($("<td class='text-center'>").text(this.FechaModificaS))
                            .append($("<td class='text-center'>").text(this.Modificador))
                            .append($("<td class='text-center'>")
                                .append($("<a id='btneditarAlumno-" + this.Id + "' data-id='" + this.Id + "' class='btneditarAlumno text-lg text-success'>")
                                    .append($("<i class='far fa-edit'>"))))
                            .append($("<td class='text-center'>")
                                .append($("<a id='btnEliminarAlumno-" + this.Dni + "' data-id='" + this.Dni + "' class='btnEliminarAlumno text-lg text-danger'>")
                                    .append($("<i class='far fa-trash-alt'>"))))
                        );
                    });
                    if ($("#txtrol").val() == 'Administrador') {
                        $("#alumnoTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["excel", "pdf", "print", "colvis"]

                        }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Supervisor') {
                        $("#alumnoTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["excel", "pdf", "print", "colvis"]

                        }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Partner') {
                        $("#alumnoTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]

                        }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Partner sin Ventas') {
                        $("#alumnoTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]

                        }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Profesor') {
                        $("#alumnoTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]

                        }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
                    }
                    $("#nuevoAlumno").modal("hide");
                    $("#confeliminar").modal("hide");                    
                },
            });
        }
        else {
            if ($("#txtrol").val() == 'Administrador') {
                $("#alumnoTable").DataTable({
                    "responsive": true,
                    "lengthChange": true,
                    "autoWidth": false,
                    "colReorder": true,
                    "scrollCollapse": true,
                    "scrollX": true,
                    "buttons": ["excel", "pdf", "print", "colvis"]

                }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
            }
            if ($("#txtrol").val() == 'Supervisor') {
                $("#alumnoTable").DataTable({
                    "responsive": true,
                    "lengthChange": true,
                    "autoWidth": false,
                    "colReorder": true,
                    "scrollCollapse": true,
                    "scrollX": true,
                    "buttons": ["excel", "pdf", "print", "colvis"]

                }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
            }
            if ($("#txtrol").val() == 'Partner') {
                $("#alumnoTable").DataTable({
                    "responsive": true,
                    "lengthChange": true,
                    "autoWidth": false,
                    "colReorder": true,
                    "scrollCollapse": true,
                    "scrollX": true,
                    "buttons": ["colvis"]

                }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
            }
            if ($("#txtrol").val() == 'Partner sin Ventas') {
                $("#alumnoTable").DataTable({
                    "responsive": true,
                    "lengthChange": true,
                    "autoWidth": false,
                    "colReorder": true,
                    "scrollCollapse": true,
                    "scrollX": true,
                    "buttons": ["colvis"]

                }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
            }
            if ($("#txtrol").val() == 'Profesor') {
                $("#alumnoTable").DataTable({
                    "responsive": true,
                    "lengthChange": true,
                    "autoWidth": false,
                    "colReorder": true,
                    "scrollCollapse": true,
                    "scrollX": true,
                    "buttons": ["colvis"]

                }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
            }

        }
        $("#sedes").val("");
        $("#txtDocu").val("");
        $("#txtNombresAlumno").val("");
    });

    function FiltrarAlumno() {
        var fcrear, docum, nombal, sedesal;
        finicio = $("#txtFechCrD").val();
        ffinal = $("#txtFechCrH").val();
        docum = $("#txtDocu").val();
        sedesal = ($("#sedes").val() == "") ? 0 : $("#sedes").val();
        nombal = $("#txtNombresAlumno").val();
        $("#alumnoTable").DataTable().destroy();
        $("#alumnoTable tbody").empty();
        $("#txtFechaMod").attr("hide", true);
        $.ajax({
            url: '/Alumno/Filtrar',
            data: {
                inicio: finicio,
                fin: ffinal,
                sedesal: sedesal,
                docum: docum,
                nombal: nombal,
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#alumnoTable tbody").append($("<tr id='Alumno-" + this.Id + "' data-id='" + this.Id + "'>")
                        .append($("<td class='text-center' hidden>").text(this.IdAlumno))
                        .append($("<td class='text-center'>").text(this.Nombres))
                        .append($("<td class='text-center'>").text(this.APaterno + " " + this.AMaterno))
                        .append($("<td class='text-center'>").text(this.Tipo))
                        .append($("<td class='text-center'>").text(this.Dni))
                        .append($("<td class='text-center'>").text(this.FechaNacimientoS))
                        .append($("<td class='text-center'>").text(this.Direccion))
                        .append($("<td class='text-center'>").text(this.Ubigeo))
                        .append($("<td class='text-center'>").text(this.Telefono))
                        .append($("<td class='text-center'>").text(this.Email))
                        .append($("<td class='text-center'>").text(this.Sede))
                        .append($("<td class='text-center'>").text(this.Promotor))
                        .append($("<td class='text-center'>").text(this.FechaCreacionS))
                        .append($("<td class='text-center'>").text(this.Registrador))
                        .append($("<td class='text-center'>").text(this.FechaModificaS))
                        .append($("<td class='text-center'>").text(this.Modificador))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btneditarAlumno-" + this.Id + "' data-id='" + this.Id + "' class='btneditarAlumno text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnEliminarAlumno-" + this.Dni + "' data-id='" + this.Dni + "' class='btnEliminarAlumno text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                    );
                });
                if ($("#txtrol").val() == 'Administrador') {
                    $("#alumnoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]

                    }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#alumnoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]

                    }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#alumnoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]

                    }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#alumnoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]

                    }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#alumnoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]

                    }).buttons().container().appendTo('#alumnoTable_wrapper .col-md-6:eq(0)');
                }
                $("#nuevoAlumno").modal("hide");
                $("#confeliminar").modal("hide");
            },
        });
    }

    $("#btnCrearAlumno").on("click", function () {
        if ($("#txtDni").val().length != 0 && $("#txtNombres").val().length != 0 && $("#txtAPaterno").val().length != 0
            && $("#txtAMaterno").val().length != 0 && $("#txtFechaNac").val().length != 0 && $("#txtDireccion").val().length != 0
            && $("#txtUbigeo").val().length != 0 && $("#txtEmail").val().length != 0 && $("#cboTipo").val().length != 0
            && $("#cboSede").val().length != 0 && $("#txtRegistrado").val().length != 0 && $("#cboPais").val().length != 0 && $("#cboDepartamento").val().length != 0
            && $("#cboProvincia").val().length != 0 && $("#cboPromotor").val().length != 0 && $("#txtTelefono").val().length != 0 && $("#txtFechaMod").val().length != 0) {
            var idSede = $("#cboSede option:selected").val();
            var idPromotor = $("#cboPromotor option:selected").val();
            var idPais = $("#cboPais option:selected").val();
            var idDepartamento = $("#cboDepartamento option:selected").val();
            var idProvincia = $("#cboProvincia option:selected").val();
            var tipo = $("#cboTipo option:selected").val();
            var token = $("#formularioAlumno").find("input[name=__RequestVerificationToken]").val()
            var alumno = {
                IdSede: idSede,
                IdPromotor: idPromotor,
                IdPais: idPais,
                IdDepartamento: idDepartamento,
                IdProvincia: idProvincia,
                Tipo : tipo,
                IdAlumno: $("#txtIdAlumno").val(),
                Dni: $("#txtDni").val(),
                Nombres: $("#txtNombres").val(),
                APaterno: $("#txtAPaterno").val(),
                AMaterno: $("#txtAMaterno").val(),
                FechaNac: $("#txtFechaNac").val(),
                Direccion: $("#txtDireccion").val(),
                Ubigeo: $("#txtUbigeo").val(),
                Telefono: $("#txtTelefono").val(),
                Email: $("#txtEmail").val(),
                Registrador: $("#txtRegistrado").val(),
                Modificador: $("#txtModificado").val(),      
                FechaModifica: $("#txtFechaMod").val(),
            };
            if (crearA) {
                $("#btnCrearAlumno").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');
                $.post('/Alumno/CreateAlumno', { __RequestVerificationToken: token, alumno: alumno, FechaNacimiento: $("#txtFechaNac").val(), IdSede: $("#cboSede").val(), Tipo: $("#cboTipo").val(), IdPais: $("#cboPais").val(), IdDepartamento: $("#cboDepartamento").val(), IdProvincia: $("#cboProvincia").val(), IdPromotor: $("#cboPromotor").val(), Telefono: $("#txtTelefono").val() }, function (result) {
                    if (result.success) {
                        FiltrarAlumno();
                        $("#crear").removeClass("hide").addClass("show").fadeOut(8000);
                        $("#crear1").html();
                    }
                    else {
                        $("#formularioAlumno").removeClass("was-validated");
                        $("#btnCrearAlumno").removeAttr("disabled").html('Guardar');
                        $("#existe").removeClass("hide").addClass("show").fadeOut(8000);
                        $("#existe1").html();
                    }
                });
            }
            else {
                $("#btnCrearAlumno").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');
                $.post('/Alumno/EditAlumno', { __RequestVerificationToken: token, alumno: alumno, FechaNacimiento: $("#txtFechaNac").val(), Id: $("#Id").val(), IdSede: $("#cboSede").val(), Tipo: $("#cboTipo").val(), FechaModifica: $("#txtFechaMod").val(), IdPais: $("#cboPais").val(), IdDepartamento: $("#cboDepartamento").val(), IdProvincia: $("#cboProvincia").val(), IdPromotor: $("#cboPromotor").val(), Telefono: $("#txtTelefono").val() }, function (result) {
                    if (result.success) {
                        FiltrarAlumno();
                        $("#editar").removeClass("hide").addClass("show");
                        $("#editar1").html();
                    } else {
                        $("#formularioAlumno").removeClass("was-validated");
                        $("#btnCrearAlumno").removeAttr("disabled").html('Guardar Cambios');
                        $("#existe").removeClass("hide").addClass("show").fadeOut(8000);
                        $("#existe1").html();
                    }
                });
            }
        }
        $("#btnCrearAlumno").removeAttr("disabled").html('Guardar');
        /*$("#nuevoAlumno").modal("hide");*/
    });

    $(document).on("click", ".btneditarAlumno", function () {
        $("#formularioAlumno").removeClass("was-validated");
        $("#nuevoAlumno").modal("toggle");
        $("#Id").remove();
        $.getJSON('/Alumno/VerAlumno', { Id: $(this).attr("data-id") }, function (data) {
            $("#formularioAlumno").prepend('<input type="hidden" name="Id" id="Id" value="' + data.Id + '" />');
            if (data.IdPais == "174") {
                $.getJSON('/Sede/CargarDepartamentos', function (data2) {
                    $.each(data2, function () {
                        $("select#cboDepartamento").append($('<option value="' + this.IdDepartamento + '" >' + this.Nombre + '</option>'));
                    });
                    $("#txtIdAlumno").val(data.IdAlumno).attr("readonly", true);
                    $("#txtDni").val(data.Dni).attr("disabled", false);
                    $("#cboTipo").val(data.Tipo);
                    $("#txtNombres").val(data.Nombres);
                    $("#txtAPaterno").val(data.APaterno);
                    $("#txtAMaterno").val(data.AMaterno);
                    $("#txtFechaNac").val(data.FechaNacimientoS);
                    $("#txtDireccion").val(data.Direccion);
                    $("#txtTelefono").val(data.Telefono);
                    $("#txtEmail").val(data.Email);
                    $("#cboSede").val(data.IdSede);
                    $("#cboPromotor").val(data.IdPromotor);
                    $("#txtModificado").val(data.Registrador);
                    $("#cboPais").val(data.IdPais);
                    $("#cboDepartamento").val(data.IdDepartamento).trigger("change");
                    setTimeout(function () {          
                        $("#cboProvincia").val(data.IdProvincia).trigger("change");
                        $("#btnCrearAlumno").text("Guardar Cambios").attr("class", "btn btn-warning").attr("disabled", true);
                    }, 200);
                    $("#txtUbigeo").val(data.Ubigeo);
                    
                    crearA = false;
                });
            }
            else {
                $("#txtIdAlumno").val(data.IdAlumno).attr("readonly", true);
                $("#txtDni").val(data.Dni).attr("disabled", false);
                $("#cboTipo").val(data.Tipo);
                $("#txtNombres").val(data.Nombres);
                $("#txtAPaterno").val(data.APaterno);
                $("#txtAMaterno").val(data.AMaterno);
                $("#txtFechaNac").val(data.FechaNacimientoS);
                $("#txtDireccion").val(data.Direccion);
                $("#txtTelefono").val(data.Telefono);
                $("#txtEmail").val(data.Email);
                $("#cboPromotor").val(data.IdPromotor);
                $("#txtModificado").val(data.Registrador);
                $("#cboPais").val(data.IdPais);
                $("#cboDepartamento").val(data.IdDepartamento);
                $("#cboProvincia").val(data.IdProvincia);
                $("#txtUbigeo").val(data.Ubigeo);
                $("#cboSede").val(data.IdSede);
                crearA = false;
                $("#btnCrearAlumno").text("Guardar Cambios").attr("class", "btn btn-warning").attr("disabled", true);
            }
            $('#txtNombres').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#txtAPaterno').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#txtAMaterno').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#txtFechaNac').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#txtDireccion').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#txtUbigeo').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#txtTelefono').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#txtEmail').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#cboSede').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#cboPromotor').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#cboPais').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#cboDepartamento').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
            $('#cboProvincia').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearAlumno').prop('disabled', false);
                }
                else {
                    $('#btnCrearAlumno').prop('disabled', true);
                }
            });
        });    
    });

    $('#cboTipo').on('input change', function () {
        if ($(this).val() != '') {
            $('#txtDni').prop('disabled', false);
        }
        else {
            $('#txtDni').prop('disabled', true);
        }
    });

    $('#cboTipo').on('input change', function () {
        if (($(this).val() == 'Carnet de Extranjería') || ($(this).val() == 'Permiso Temporal de Permanencia (PTP)') || ($(this).val() == 'Pasaporte')) {
            $('#btnLoadingDNI').prop('hidden', true);
        }
        else {
            $('#btnLoadingDNI').prop('hidden', false);
        }
    });

    $('#cboProvincia').on('input change', function () {
        if ($(this).val() != '') {
            $('#txtUbigeo').prop('disabled', false);
        }
        else {
            $('#txtUbigeo').prop('disabled', true);
        }
    });

    $(document).on("click", ".btnEliminarAlumno", function () {
        $("#formularioAlumnoEl").removeClass("was-validated");
        $("#txtPasswordUserCC").val("");
        $("#txtUusuarioConf").val("");
        $("#txtDni-d").val($(this).attr("data-id"));
        $("#confeliminar").modal("show");
        $("#liveToast4").removeClass("show");
    });


    $("#confeliminar").on("shown.bs.modal", function () {
        $("#txtPasswordUserCC").val("").focus();
        $("#txtUusuarioConf").val("").focus();
    });

    $("#btnCofEliminarAlumno").click(function () {
        if ($("#txtPasswordUserCC").val().length != 0 && $("#txtUusuarioConf").val().length != 0) {
            var token = $("#formularioAlumnoEl").find("input[name=__RequestVerificationToken]").val();
            $("#btnCofEliminarAlumno").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');
            $.post('/Alumno/DeleteAlumno', { __RequestVerificationToken: token, Dni: $("#txtDni-d").val().trim(), Password: $("#txtPasswordUserCC").val(), IdUsuario: $("#txtUusuarioConf").val(), pass: $("#txtpass").val()  }, function (result) {
                //var hola = ("#txtPasswordUserCC").val();
                //var bolas = ("#txtpass").val();               
                if (result.success) {
                    FiltrarAlumno();
                    $("#eliminar").removeClass("hide").addClass("show").fadeOut(8000);
                    $("#eliminar1").html();                    
                } else {
                    $("#formularioAlumnoEl").removeClass("was-validated");
                    $("#btnCofEliminarAlumno").removeAttr("disabled").html('Eliminar');
                    $("#confeliminar").modal("hide");
                    if (result.tipo == 2) {
                        $("#error").removeClass("hide").addClass("show");
                        $("#error1").html();
                    } else {
                        if (result.tipo == 1) {
                            $("#errorc").removeClass("hide").addClass("show");
                            $("#errorc1").html();
                        }
                    }

                    //if (result.tipo = 2) {
                    //    $("#error").removeClass("hide").addClass("show");
                    //    $("#error1").html();
                    //}
                }   
                
            });
        }
        $("#btnCofEliminarAlumno").removeAttr("disabled").html('Eliminar');
        /*$("#confeliminar").modal("hide");*/
    });

    $.getJSON('/Alumno/CargarSedes', function (data) {
        sedes = data;
        $.each(data, function () {
            $("select#cboSede").append($('<option value="' + this.IdSede + '">' + this.Nombre +'</option>'));
        });
    });
    $.getJSON('/Alumno/CargarPromotores', function (data) {
        sedes = data;
        $.each(data, function () {
            $("select#cboPromotor").append($('<option value="' + this.IdPromotor + '">' + this.Nombres + '</option>'));
        });
    });

    var listaDetalle;

    $(document).ready(function () {
        $("#itemalumnoTable").DataTable();

        $("#btnSelectFile").click(function () {
            $("#txtFileUpload").click();
        });

        $("#txtFileUpload").change(function () {
            $("#modalRedireccionar").modal({
                backdrop: 'static'
            });

            var ext = $('#txtFileUpload').val().split('.').pop().toLowerCase();

            if ($.inArray(ext, ['xls', 'xlsx']) == -1) {
                return false;
            }

            $("#itemalumnoTable").DataTable().destroy();
            $("#itemalumnoTable tbody").empty();

            var formData = new FormData();
            formData.append('__RequestVerificationToken', $("input[name=__RequestVerificationToken]").val());
            formData.append('file', $('input[type=file]')[0].files[0]);

            $.ajax({
                url: '/Alumno/UploadFile',
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                success: function (result) {
                    if (!result.success) {
                        return false;
                    }

                    listaDetalle = result.listado;
                    var contador = 0;
                    $.each(result.listado, function () {
                        if (this.HasError == true) contador++;

                        $("#itemalumnoTable").append($("<tr" + ((this.HasError == true) ? " class='danger'" : "") + ">")
                            .append($("<td class='text-center' hidden>").text(this.Codigo))
                            .append($("<td class='text-center'>").text(this.Nombres))
                            .append($("<td class='text-center'>").text(this.APaterno ))
                            .append($("<td class='text-center'>").text(this.AMaterno))
                            .append($("<td class='text-center'>").text(this.Tipo))
                            .append($("<td class='text-center'>").text(this.Dni))
                            .append($("<td class='text-center'>").text(this.FechaNacimiento))
                            .append($("<td class='text-center'>").text(this.Direccion))
                            .append($("<td class='text-center'>").text(this.Telefono))
                            .append($("<td class='text-center'>").text(this.Pais))
                            .append($("<td class='text-center'>").text(this.Departamento))
                            .append($("<td class='text-center'>").text(this.Provincia))
                            .append($("<td class='text-center'>").text(this.Ubigeo))
                            .append($("<td class='text-center'>").text(this.Email))
                            .append($("<td class='text-center'>").text(this.Sede))
                            .append($("<td class='text-center'>").text(this.Promotor))
                        );
                    });

                    $("#itemalumnoTable").DataTable();

                    if (contador == 0) {
                        $(".btnPreCargar").attr("href", "#").removeAttr("disabled").removeClass("disabled").addClass("btnCargar");
                    }
                    else {
                        alert(false, "Algunos datos del archivo no tienen el formato correcto");
                        $(".btnPreCargar").attr("href", "javascript:void(0)").attr("disabled", true).addClass("disabled").removeClass("btnCargar");
                    }

                    $("#modalRedireccionar").modal("hide");
                },
                error: function (result) {
                    $("#modalRedireccionar").modal("hide");
                }
            });
        });

        $(document).on("click", ".btnCargar", function () {
            $("#modalRedireccionar").modal({
                backdrop: 'static'
            });

            $.ajax({
                url: '/Alumno/CargarAlumnos',
                type: "POST",
                data: { __RequestVerificationToken: $("input[name=__RequestVerificationToken]").val(), listaDetalle: listaDetalle },
                success: function (result) {
                    if (result.success) {
                        $("#formUpload")[0].reset();
                        $(".btnPreCargar").attr("href", "javascript:void(0)").attr("disabled", true).addClass("disabled").removeClass("btnCargar");
                    }
                    else {
                        $(".btnPreCargar").attr("href", "#").removeAttr("disabled").removeClass("disabled").addClass("btnCargar");
                    }

                    $("#modalRedireccionar").modal("hide");
                },
                error: function (result) {
                    $("#modalRedireccionar").modal("hide");
                }
            });
        });

        $(document).on("click", ".btnRegresar", function () {
            window.location = "/Alumno/Index";
        });

    });

    $("#btnLoadingDNI").on("click", function () {
        consultarDNI();
    });

    function consultarDNI() {
        $("#btnLoadingDNI span").removeClass("fa-search").addClass("fa-spinner").addClass("fa-spin");
        $(".alert-modal").remove();

        $.getJSON('/Admin/BuscarReniec', { DNI: $("#txtDni").val() }, function (result) {
            if (result.success) {
                if (result.persona != undefined) {
                    if (result.persona.Nombres == "") {
                        $("#txtNombres").val("");
                        $("#txtAPaterno").val("");
                        $("#txtAMaterno").val("");
                    }
                    else {
                        $("#txtNombres").val(result.persona.Nombres);
                        $("#txtAPaterno").val(result.persona.ApellidoPaterno);
                        $("#txtAMaterno").val(result.persona.ApellidoMaterno);
                    }
                }
            }
            else {
                /*$("#nuevoTecnico div.modal-body").alertsModal(false, result.message);*/
                $("#error3").removeClass("hide").addClass("show");
                $("#error4").html();
                $(".alert-modal").css("margin-bottom", "20px");

                $("#txtDni").val("");
                $("#txtAPaterno").val("");
                $("#txtAMaterno").val("");
            }

            $("#btnLoadingDNI span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");
        });
        //    .error(function (result) {
        //    $("#nuevoTecnico div.modal-body").alertsModal(false, "Error: " + result.message);*/
        //    $(".alert-modal").css("margin-bottom", "20px");

        //    $("#btnLoadingDNI span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");
        //});
    }

    
}