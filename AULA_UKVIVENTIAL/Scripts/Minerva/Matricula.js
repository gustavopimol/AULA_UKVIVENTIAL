function MatriculaVD() {
    var objOwner = this;
    var crearMt = true;
    var monedaDoc;
    var tipoDoc = 1;
    var dataCorrelativo = {};
    var notSunat = false;
    var activar = 0;
    var alumnoencontrado = (Number('@ViewBag.Alumno.IdAlumno') > 0);
    var UrlArchivo = '';

    monedaDoc = ($("#cboMonedaV option:selected").val() == "PEN" || $("#cboMonedaV option:selected").val() == "USD") ? $("#cboMonedaV option:selected").val() : "PEN";

    var formNuevo = document.querySelectorAll("#formularioMatricula");

    $("#btnCrearMatricula").on("click", function () {

        if (!formNuevo[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formNuevo[0].classList.add("was-validated");

    });

    if ($("#txtrol").val() == 'Administrador') {
        $("#matriculaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#matriculaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Supervisor') {
        $("#matriculaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#matriculaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner') {
        $("#matriculaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#matriculaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner sin Ventas') {
        $("#matriculaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#matriculaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Profesor') {
        $("#matriculaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#matriculaTable_wrapper .col-md-6:eq(0)');
    }    

    /*ListarMatriculas();*/

    function LimpiarMatricula() {
        /*$("#txtCodigo").val("");*/
        /*$("#txtFechaRegistro").val("")*/
        $("#txtidMatricula").val("");
        $("#txtcMatricula").val("");
        $("#txtIdAlumno").val("");
        $("#txtAlumno").val("");
        $("#cboTipo").val("");
        $("#cboPeriodo").val("");
        $("#cboCiclo").val("");
        $("#cboNivel").val("");
        $("#cboGrado").val("");
        $("#cboAula").val("");
        $("#txtSede").val("");
        $("#cboTurno").val("");
        $("#cboBeca").val("");
        $("#txtDescMatricula").val("00.00");
        $("#txtDescCuota").val("00.00");
        $("#txtDescOtros").val("00.00");
        $("#txtAlumnoB").val("");

        if ($("#txtTipoInstitucion").val() == 4 ) {
            $("#cboGrado").attr("disabled", true);
        }
        

        $("#formularioMatricula").removeClass("was-validated");
    }    

    $("#nuevaMatricula").modal({
        backdrop: 'static'
    });

    $("#eliminarMatricula").modal({
        backdrop: 'static'
    });

    $("#nuevaVenta").modal({
        backdrop: 'static'
    });

    $("#confGenerarDoc").modal({
        backdrop: 'static'
    });

    $("#btnNuevaMatricula").click(function () {
        $("#btnreinscribir").attr('hidden', true);
        $("#txtdatos").attr('hidden', true);
        LimpiarMatricula();
        ///*$("#error").removeClass("show").addClass("hide");*/
        //$.getJSON('/Matricula/BuscarCorrelativoMatricula', function (data) {

        //    if (data != "" && data[0] == "0") {
        //        var num = parseInt(data);
        //        num++;
        //        codigo = ("0000" + num).slice(-4);
        //    }
        //    else
        //        codigo = "0001";

        //    LimpiarMatricula();
        //    $("#IdMatricula").remove();
        //    $("#txtCodigoMatricula").val(codigo);
        //    crearMt = true;
        //});        

        $("#btnCrearMatricula").text("Guardar").attr("class", "btn btn-primary");
    });

    //$("#cboBeca").on("change", function () {
    //    if ($(this).val() == 3) {

    //        $("#txtDescMatricula").attr("readonly",true);
    //        $("#txtDescCuota").attr("readonly", true);
    //        $("#txtDescOtros").attr("readonly", true);

    //        $("#txtDescMatricula").val("00.00");
    //        $("#txtDescCuota").val("00.00");
    //        $("#txtDescOtros").val("00.00");            
    //    }
    //    else {
    //        $("#txtDescMatricula").attr("readonly", false);
    //        $("#txtDescCuota").attr("readonly", false);
    //        $("#txtDescOtros").attr("readonly", false);

    //        $("#txtDescMatricula").val("00.00");
    //        $("#txtDescCuota").val("00.00");
    //        $("#txtDescOtros").val("00.00");
    //    }
    //});
        
    $("#txtDescMatricula").focus(function () {
        $(this).select();
    });

    $("#txtDescCuota").focus(function () {
        $(this).select();
    });

    $("#txtDescOtros").focus(function () {
        $(this).select();
    });


    $("#cboFiltrarPor").change(function () {
        if ($(this).val() == "1") {
            $("#mes").css("display", "block");
            $("#period").css("display", "block");
            $("#sed").css("display", "block");
            $("#nive").css("display", "block");
            $("#cicl").css("display", "block");
            $("#aul").css("display", "block");
            $("#alumnito").css("display", "block");
            $("#dni").css("display", "block");
            $("#fechini").hide();
            $("#fechfin").hide();
        }
        else {
            $("#mes").css("display", "none");
            $("#period").css("display", "none");
            $("#sed").css("display", "none");
            $("#nive").css("display", "none");
            $("#cicl").css("display", "none");
            $("#aul").css("display", "none");
            $("#alumnito").css("display", "none");
            $("#dni").css("display", "none");
            $("#fechini").show();
            $("#fechfin").show();
        }
    });
   
    $("#btnFiltrar").on("click", function () {

        var finicio, ffinal,  mes, idperio, idsed, idnive, idcicl, idaul, alumnito, dni, tipofil;

        finicio = $("#fini").val();
        ffinal = $("#ffin").val();
        mes = ($("#mesecito").val() == "") ? '' : $("#mesecito").val();
        idperio = ($("#perio").val() == "") ? 0 : $("#perio").val();
        idsed = ($("#sedecita").val() == "") ? 0 : $("#sedecita").val();
        idnive = ($("#niv").val() == "") ? 0 : $("#niv").val();
        idcicl = ($("#cic").val() == "") ? 0 : $("#cic").val();
        idaul = ($("#aulita").val() == "") ? 0 : $("#aulita").val();
        alumnito = $("#txtAlumnito").val();
        dni = $("#txtDni").val();
        tipofil = ($("#cboFiltrarPor").val() == "0") ? 0 : $("#cboFiltrarPor").val();

        $("#matriculaTable").DataTable().destroy();
        $("#matriculaTable tbody").empty();

        $.ajax({
            url: '/Matricula/Filtrar',
            data: {
                inicio: finicio,
                fin: ffinal,
                mes: mes,
                idperio: idperio,
                idsed: idsed,
                idnive: idnive,
                idcicl: idcicl,
                idaul: idaul,
                alumnito: alumnito,
                dni: dni,
                tipofil: tipofil,    
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#matriculaTable tbody").append($("<tr id='matricula-" + this.IdMatricula + "' data-id='" + this.IdMatricula + "'>")
                        .append($("<td class='text-center'>").text(this.CodigoMatricula))
                        .append($("<td class='text-center'>").text(this.Alumno))
                        .append($("<td class='text-center'>").text(this.Tipo))
                        .append($("<td class='text-center'>").text(this.Periodo))
                        .append($("<td class='text-center'>").text(this.Grado))
                        .append($("<td class='text-center'>").text(this.Ciclo))
                        .append($("<td class='text-center'>").text(this.Nivel))                        
                        .append($("<td class='text-center'>").text(this.Aula))
                        .append($("<td class='text-center'>").text(this.Sede))
                        .append($("<td class='text-center'>").text(this.Turno))
                        .append($("<td class='text-center'>").text(this.Beca))                        
                        .append($("<td class='text-center'>").text(this.FechaRegistroS))
                        .append($("<td class='text-center'>").text(this.Usuario))
                        .append($('<td class="text-center">')
                            .append($("<span>").text(this.IdMatricula).attr("hidden"))
                            .append($("<a id='btnNuevaVenta' class='text-blue text-lg' data-id=" + this.IdMatricula + " data-idalumno=" + this.IdAlumno + " title='Nueva Venta'>")
                                .append($("<span>").attr("class", "fa fa-plus"))))
                        .append($('<td class="text-center">')
                            .append($("<span>").text(this.IdMatricula).attr("hidden"))
                            .append($("<a id='btnVerMatric' class='text-yellow text-lg' data-id=" + this.IdMatricula + " data-idalumno=" + this.IdAlumno + " title='Ver Detalles'>")
                                .append($("<span>").attr("class", "far fa-eye"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnModificarMatricula-" + this.IdMatricula + "' data-id='" + this.IdMatricula + "' data-estado='" + this.Estado + "' class='btnModificarMatricula text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnAnularMatricula-" + this.IdMatricula + "' data-id='" + this.IdMatricula + "' data-estado='" + this.Estado + "' class='btnAnularMatricula text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                    );
                });

                if ($("#txtrol").val() == 'Administrador') {
                    $("#matriculaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#matriculaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#matriculaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#matriculaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#matriculaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#matriculaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#matriculaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#matriculaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#matriculaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#matriculaTable_wrapper .col-md-6:eq(0)');
                }

                $("#nuevaMatricula").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#modalRedireccionar").modal("hide");
            //    /*$(".content-wrapper").alerts(false, xhr.statusText);*/
            //}
        });

        //$("#perio").val("");
        //$("#sedecita").val("");
        //$("#niv").val("");
        //$("#cic").val("");
        //$("#aulita").val("");
        //$("#txtAlumnito").val("");
        //$("#txtDni").val("");

    });

    $("#btnFiltrar").trigger("click");
    
    $("#btnBuscarAlumno").on("click", function () {

        $("#modalAlumnos").modal("show");

    });

    $("#modalAlumnos").on("shown.bs.modal", function () {
        $("#txtAlumnoB").focus();
    });

    function LimpiarAlumno() {
        $("#txtIdAlumno").attr("data-id", "");
        $("#txtAlumno").val("");
        /*$("#txtCodigoAlumno").val("");*/
    }

    $("#txtAlumnoB").easyAutocomplete({
        
        url: '/Matricula/GetAlumnosDescrip',
        getValue: "NombreCompleto",
        list: {
            match: {
                enabled: true
            },
            onChooseEvent: function () {
                LimpiarAlumno();
                var alumno = $("#txtAlumnoB").getSelectedItemData();
                                
                if (alumno.IdAlumno != undefined) {
                    $("#txtIdAlumno").val(alumno.Dni).attr("data-id", alumno.Dni);
                    /*$("#txtCodigoMatricula").val(alumno.CodigoAlumno);*/
                    $("#txtAlumno").val("");
                    $("#txtSede").val("");
                    $("#txtAlumno").val(alumno.Nombres + " " + alumno.APaterno + " " + alumno.AMaterno);
                    $("#txtSede").val(alumno.Sede);
                    $("#txtNombres").val(alumno.Nombres);
                    $("#txtApellidos").val(alumno.Apellidos);
                    
                    //$("#txtRuc-error").remove();
                    //$("#txtCliente-error").remove();
                    //$("#txtRuc").parents("div.form-group").removeClass("has-error");
                    //$("#txtCliente").parents("div.form-group").removeClass("has-error");

                    $("#txtAlumnoB").val("");
                    $("#modalAlumnos").modal("hide");

                    alumnoencontrado = true;
                    validDoc = true;
                }
            }
        },
        theme: "bootstrap",
        ajaxSettings: {
            dataType: "json",
            method: "GET",
            data: {
                dataType: "json"
            }
        },
        preparePostData: function (data) {
            data.Value = $("#txtAlumnoB").val();
            //data.TipoDoc = $("#frmRadiosJN input[type=radio]:checked").val() == 0 ? 3 : 1;
            //data.TipoBusqueda = $("#cboBusquedaCliente").val();
            return data;
        },
        requestDelay: 300
    });

    $("#btnCrearMatricula").on("click", function () {
        if ($("#txtFechaRegistro").val().length != 0 && $("#txtAlumno").val().length != 0
            && $("#cboTipo").val().length != 0 && $("#cboPeriodo").val().length != 0 && $("#cboCiclo").val().length != 0
            && $("#cboNivel").val().length != 0 && $("#cboAula").val().length != 0
            && $("#txtSede").val().length != 0 && $("#cboTurno").val().length != 0 && $("#cboBeca").val().length != 0
            && $("#txtDescMatricula").val().length != 0 && $("#txtDescCuota").val().length != 0 && $("#txtDescOtros").val().length != 0) {

            var idCiclo = $("#cboCiclo option:selected").val();
            var idNivel = $("#cboNivel option:selected").val();
            var idPeriodo = $("#cboPeriodo option:selected").val();
            var grado = $("#cboGrado").val() == "" ? "-" : $("#cboGrado option:selected").val();
            /*var idSede = $("#txtSede").val();*/
            var idAula = $("#cboAula option:selected").val();
            var token = $("#formularioMatricula").find("input[name=__RequestVerificationToken]").val();

            var matricula = {

                /*CodigoMatricula: $("#txtCodigoMatricula").val(),*/
                Alumno: $("#txtAlumno").val(),
                IdTipo: $("#cboTipo").val(),
                IdPeriodo: idPeriodo,
                IdCiclo: idCiclo,
                IdNivel: idNivel,
                Grado: grado,
                IdAula: idAula,
                Sede: $("#txtSede").val(),
                IdTurno: $("#cboTurno").val(), 
                IdBeca: $("#cboBeca").val(),
                DescMatricula: $("#txtDescMatricula").val(),
                DescCuota: $("#txtDescCuota").val(),
                DescOtros: $("#txtDescOtros").val(),
                Dni: $("#txtIdAlumno").val(),
            };

            if (crearMt) {
                $("#btnCrearMatricula").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                $.post('/Matricula/CreateMatricula', { __RequestVerificationToken: token, matricula: matricula, FechaRegistro: $("#txtFechaRegistro").val()}, function (result) {
                    if (result.success) {
                        $("#btnFiltrar").trigger("click");
                        $("#exito").removeClass("hide").addClass("show");
                        $("#exito2").html();
                    }
                    else {
                        $("#btnCrearMatricula").removeAttr("disabled").html('Guardar');
                        $("#error").removeClass("hide").addClass("show");
                        $("#error2").html();

                    }
                });
            } else {
                $("#btnCrearMatricula").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');

                $.post('/Matricula/CreateMatricula', { __RequestVerificationToken: token, matricula: matricula, FechaRegistro: $("#txtFechaRegistro").val(), IdMatricula: $("#txtidMatricula").val() }, function (result) {
                    if (result.success) {
                        $("#btnFiltrar").trigger("click");
                        $("#informa").removeClass("hide").addClass("show");
                        $("#info").html();
                    } else {
                        $("#btnCrearMatricula").removeAttr("disabled").html('Guardar Cambios');
                        $("#nuevaMatricula").modal("hide");
                        /*$("#liveToast2").removeClass("hide").addClass("show");*/
                        /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                        
                    }
                });
            }
        }

        $("#btnCrearMatricula").removeAttr("disabled").html('Guardar');
        /*$("#nuevaMatricula").modal("hide");*/
    });

    $(document).on("click", ".btnModificarMatricula", function () {
        /*LimpiarSede();*/

        $("#txtdatos").attr('hidden', false);
        $("#btnreinscribir").attr('hidden', false);

        $("#nuevaMatricula").modal("show");
        $("#formularioMatricula").removeClass("was-validated");

        $.getJSON('/Matricula/VerMatricula', { IdMatricula: $(this).attr("data-id") }, function (data) {
            
            $("#formularioMatricula").prepend('<input type="hidden" name="IdMatricula" id="txtidMatricula" value="' + data.IdMatricula + '" />');

            $("#txtFechaRegistro").val(data.FechaRS);
            $("#txtidMatricula").val(data.IdMatricula).attr("readonly", true);
            $("#txtcMatricula").val(data.CodigoMatricula).attr("readonly", true);
            $("#txtIdAlumno").val(data.Dni);
            /*$("#txtCodigoMatricula").val(data.CodigoMatricula.trim()).attr("readonly", true);*/
            $("#txtAlumno").val(data.Alumno);
            $("#cboTipo").val(data.IdTipo);
            $("#cboPeriodo").val(data.IdPeriodo);
            $("#cboCiclo").val(data.IdCiclo);
            $("#cboNivel").val(data.IdNivel);

            if ($("#txtTipoInstitucion").val() == 4) {
                $("#cboGrado").val("").attr("disabled", true);
            }
            else
                $("#cboGrado").val(data.Grado);

            /*$("#cboGrado").val(data.Grado);*/
            $("#cboAula").val(data.IdAula);
            $("#txtSede").val(data.Sede);
            $("#cboTurno").val(data.IdTurno);
            $("#cboBeca").val(data.IdBeca);
            $("#txtDescMatricula").val(data.DescMatricula);
            $("#txtDescCuota").val(data.DescCuota);
            $("#txtDescOtros").val(data.DescOtros);

            crearMt = false;

            $("#btnCrearMatricula").text("Guardar Cambios").attr("class", "btn btn-warning").attr("disabled", true);
            $('#cboTipo').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearMatricula').prop('disabled', false);
                    /*$("#txtdatos").attr('hidden', false).text(" - Editar Datos");*/
                }
                else {
                    $('#btnCrearMatricula').prop('disabled', true);
                }
            });
            $('#cboPeriodo').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearMatricula').prop('disabled', false);
                    //$("#txtdatos").attr('hidden', false).text(" - Editar Datos");/
                }
                else {
                    $('#btnCrearMatricula').prop('disabled', true);
                }
            });
            $('#cboCiclo').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearMatricula').prop('disabled', false);
                    //$("#txtdatos").attr('hidden', false).text(" - Editar Datos");/
                }
                else {
                    $('#btnCrearMatricula').prop('disabled', true);
                }
            });
            $('#cboNivel').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearMatricula').prop('disabled', false);
                    //$("#txtdatos").attr('hidden', false).text(" - Editar Datos");/
                }
                else {
                    $('#btnCrearMatricula').prop('disabled', true);
                }
            });
            $('#cboGrado').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearMatricula').prop('disabled', false);
                    //$("#txtdatos").attr('hidden', false).text(" - Editar Datos");/
                }
                else {
                    $('#btnCrearMatricula').prop('disabled', true);
                }
            });
            $('#cboAula').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearMatricula').prop('disabled', false);
                    //$("#txtdatos").attr('hidden', false).text(" - Editar Datos");/
                }
                else {
                    $('#btnCrearMatricula').prop('disabled', true);
                }
            });
            $('#cboTurno').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearMatricula').prop('disabled', false);
                    //$("#txtdatos").attr('hidden', false).text(" - Editar Datos");/
                }
                else {
                    $('#btnCrearMatricula').prop('disabled', true);
                }
            });
            $('#cboBeca').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearMatricula').prop('disabled', false);
                    //$("#txtdatos").attr('hidden', false).text(" - Editar Datos");/
                }
                else {
                    $('#btnCrearMatricula').prop('disabled', true);
                }
            });
            $('#txtDescMatricula').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearMatricula').prop('disabled', false);
                    //$("#txtdatos").attr('hidden', false).text(" - Editar Datos");/
                }
                else {
                    $('#btnCrearMatricula').prop('disabled', true);
                }
            });
            $('#txtDescCuota').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearMatricula').prop('disabled', false);
                    //$("#txtdatos").attr('hidden', false).text(" - Editar Datos");/
                }
                else {
                    $('#btnCrearMatricula').prop('disabled', true);
                }
            });
            $('#txtDescOtros').on('input change', function () {
                if ($(this).val() != '') {
                    $('#btnCrearMatricula').prop('disabled', false);
                    //$("#txtdatos").attr('hidden', false).text(" - Editar Datos");/
                }
                else {
                    $('#btnCrearMatricula').prop('disabled', true);
                }
            });

            $("#btnCrearMatricula").text("Guardar Cambios").attr("class", "btn btn-warning");
        });
        /*LimpiarSede();*/

    });

    $("#btnreinscribir").click(function () {
        $("#txtdatos").attr('hidden', false).text(" - Reinscribir Matrícula");
        $("#btnreinscribir").attr('hidden', true);
        $("#btnCrearMatricula").removeAttr("disabled").html('Guardar').attr("class", "btn btn-primary");
        $("#txtidMatricula").val("");
        $("#txtcMatricula").val("");

        var fecha = new Date(); //Fecha actual
        var mes = fecha.getMonth() + 1; //obteniendo mes
        var dia = fecha.getDate(); //obteniendo dia
        var ano = fecha.getFullYear(); //obteniendo año
        if (dia < 10)
            dia = '0' + dia; //agrega cero si el menor de 10
        if (mes < 10)
            mes = '0' + mes //agrega cero si el menor de 10
        var fechita = ano + "-" + mes + "-" + dia;
        $("#txtFechaRegistro").val(fechita);

        crearMt = true;

        $("#btnCrearMatricula").on("click", function () {
            if ($("#txtFechaRegistro").val().length != 0 && $("#txtAlumno").val().length != 0
                && $("#cboTipo").val().length != 0 && $("#cboPeriodo").val().length != 0 && $("#cboCiclo").val().length != 0
                && $("#cboNivel").val().length != 0 && $("#cboGrado").val().length != 0 && $("#cboAula").val().length != 0
                && $("#txtSede").val().length != 0 && $("#cboTurno").val().length != 0 && $("#cboBeca").val().length != 0
                && $("#txtDescMatricula").val().length != 0 && $("#txtDescCuota").val().length != 0 && $("#txtDescOtros").val().length != 0) {
                var idCiclo = $("#cboCiclo option:selected").val();
                var idNivel = $("#cboNivel option:selected").val();
                var idPeriodo = $("#cboPeriodo option:selected").val();
                var grado = $("#cboGrado option:selected").val();
                var idAula = $("#cboAula option:selected").val();
                //var idSede = $("#txtSede option:selected").val();
                var token = $("#formularioMatricula").find("input[name=__RequestVerificationToken]").val();

                var matricula = {
                    // CodigoMatricula: $("#txtcMatricula").val(),
                    Alumno: $("#txtAlumno").val(),
                    IdTipo: $("#cboTipo").val(),
                    IdPeriodo: idPeriodo,
                    IdCiclo: idCiclo,
                    IdNivel: idNivel,
                    Grado: grado,
                    IdAula: idAula,
                    Sede: $("#txtSede").val(),
                    IdTurno: $("#cboTurno").val(),
                    IdBeca: $("#cboBeca").val(),
                    DescMatricula: $("#txtDescMatricula").val(),
                    DescCuota: $("#txtDescCuota").val(),
                    DescOtros: $("#txtDescOtros").val(),
                    Dni: $("#txtIdAlumno").val(),
                };

                if (crearMt) {
                    $("#btnCrearMatricula").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                    $.post('/Matricula/CreateMatricula', { __RequestVerificationToken: token, matricula: matricula, FechaRegistro: $("#txtFechaRegistro").val() }, function (result) {
                        if (result.success) {
                            $("#btnFiltrar").trigger("click");
                            $("#exito").removeClass("hide").addClass("show");
                            $("#exito2").html();
                        }
                        else {
                            $("#btnCrearMatricula").removeAttr("disabled").html('Guardar');
                            $("#error").removeClass("hide").addClass("show");
                            $("#error2").html();
                        }
                    });
                }
            }
            $("#btnCrearMatricula").removeAttr("disabled").html('Guardar');
        });

        $("#txtidMatricula").val("");
        $("#txtcMatricula").val("");
    });



    $(document).on("click", ".btnAnularMatricula", function () {
        $("#IdMatricula-d").val($(this).attr("data-id"));
        $("#eliminarMatricula").modal("toggle");
    });

    $("#btnConfEliminarMatricula").click(function () {
        $("#btnConfEliminarMatricula").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Matricula/DeleteMatricula', $("#formularioMatriculaD").serialize(), function (result) {
            if (result.success) {
                $("#btnFiltrar").trigger("click");
                $("#elimina").removeClass("hide").addClass("show");
                $("#elim").html();
            } else {
                $("#btnConfEliminarMatricula").removeAttr("disabled").html('Eliminar');
                /*$("#liveToast2").removeClass("hide").addClass("show");*/
                /*window.alert(false, "Error: " + result.message);*/
                /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                /*$("#eliminarSede").modal("hide");*/
            }
        });
        $("#eliminarMatricula").modal("hide");
        $("#btnConfEliminarMatricula").removeAttr("disabled").html('Eliminar');
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

    //$.getJSON('/Matricula/CargarGrados', function (data) {
    //    grados = data;

    //    $.each(data, function () {
    //        $("select#cboGrado").append($('<option value="' + this.IdGrado + '">' + this.Descripcion + '</option>'));
    //    });

    //});

    $.getJSON('/Matricula/CargarSedes', function (data) {
        sedes = data;

        $.each(data, function () {
            $("select#cboSede").append($('<option value="' + this.IdSede + '">' + this.Nombre + '</option>'));
        });

    });

    $.getJSON('/Matricula/CargarAulas', function (data) {
        aulas = data;

        $.each(data, function () {
            $("select#cboAula").append($('<option value="' + this.IdAula + '">' + this.Descripcion + '</option>'));
        });

    });

    $(document).on("click", "#btnVerMatric", function () {
        var idMatricula = $(this).attr("data-id");
        var idAlumno = $(this).attr("data-idalumno");

        $.getJSON('/Matricula/GetMatricula2', { IdMatricula: idMatricula, IdAlumno: idAlumno }, function (data) {
            $("#tbDetalle-DC tbody").empty();

            $("#txtDni-DM").text(data.Matricula.Dni);
            $("#txtCodigo-DM").text(data.Matricula.CodigoAlumno);
            $("#txtNombre-DM").text(data.Matricula.Alumno);

            $.each(data.DetalleMatricula, function () {
                /*var totalCalculadoItem = parseFloat(this.Cantidad * this.PrecioUnitario).toFixed(2);*/

                $("#tbDetalle-DC").append($("<tr>")
                    .append($("<td hidden class='text-center idconcepto'>").text(this.IdConcepto))
                    .append($("<td class='text-center producto'>").text(this.Periodo))
                    .append($("<td class='text-center nombre'>").html(this.Concepto.replace(/[\r\n]/g, "<br>")))
                    .append($("<td class='text-center cantidad' >").text("S/."))
                    .append($("<td class='text-center monto' >").text(this.Monto).attr('style', 'color:blue;font-weight:bold'))
                    .append($("<td class='text-center montopagado' >").text(this.Pagado).attr('style', 'color:green;font-weight:bold'))
                    .append($("<td class='text-center saldo' >").text(this.Saldo).attr('style', 'color:red;font-weight:bold'))
                    .append($("<td class='text-center totalItem' >").text(this.TipoConcepto))
                );
            });

            /*$("#btnReImprimirDC").attr("data-id", idCotizacion);*/
        });

        $("#modalMatricula").modal('show');
    });

    $("#TipoOperacion").change(function () {
        
        var tipoOperacion;        
        tipoOperacion = $("#TipoOperacion option:selected").val();

        var idMatricula = $("#IdMatriculaV").val();
        var idAlumno = $("#txtIdAlumnoV").val();
        var idPeriodo = $("#txtIdPeriodoV").val();

        if (tipoOperacion == 1) {

            $.getJSON('/Matricula/GetMatricula', { IdMatricula: idMatricula, IdAlumno: idAlumno }, function (data) {

                $("#tbDetalle-NV").DataTable().destroy();
                $("#tbDetalle-NV tbody").empty();

                if (data.DetalleMatricula.length > 0) {
                    $.each(data.DetalleMatricula, function () {

                        $("#tbDetalle-NV").append($("<tr id='concepto-" + this.IdConcepto + "'>")
                            .append($("<td hidden class='text-center idconcepto'>").text(this.IdConcepto))
                            .append($("<td hidden class='text-center mes'>").text(this.Mes))
                            .append($("<td class='text-center verificar'>")
                                .append($('<input class="form-check-input verificadito" id="chkConcepto-' + this.IdConcepto + '" data-idConcepto=' + this.IdConcepto + ' type="checkbox">')))
                            .append($("<td class='text-center periodo'>").text(this.Periodo))
                            .append($("<td class='descripcion'>").html(this.Concepto.replace(/[\r\n]/g, "<br>")))
                            .append($("<td class='text-center moneda' >").text("S/."))
                            .append($("<td class='text-center monto' >").text(this.Monto).attr('style', 'color:blue;font-weight:bold'))
                            .append($("<td class='text-center montopagado' >").text(this.Pagado).attr('style', 'color:green;font-weight:bold'))
                            .append($("<td class='text-center saldo' >").text(this.Saldo).attr('style', 'color:red;font-weight:bold'))
                            .append($("<td class='text-right apagar' >")
                                .append($('<input class="form-control text-center apagadito" type="text" id="sald-' + this.IdConcepto + '" data-idConcepto = ' + this.IdConcepto + ' style="border:none" value=" 00.00 ">')))
                            /*.append($("<td class='text-center fecha' >").text("FECHA"))*/
                            .append($("<td class='text-right tipoconcepto' >").text(this.TipoConcepto))
                        );

                    });

                    $("#btnRefreshDoc").attr("disabled", true);
                }
                else {
                    /*$("#tbDetalle-NV").DataTable().destroy();*/
                    $("#tbDetalle-NV tbody").empty();

                    $("#tbDetalle-NV tbody").append($("<td colspan='9' style='padding-top:15px' class='text-center'>").html("No hay conceptos para pagar")
                    );
                    
                    $("#btnNuevoDoc").attr("disabled", true);
                    $("#btnVistaPrevia").attr("disabled", true);
                    $("#btnRefreshDoc").attr("disabled", true);

                }

                $(".apagadito").focus(function () {
                    $(this).select();
                });

                $(".apagadito").on("change keyup", function () {
                    ActualizarTotales();                    
                });                
            });
        }
        else
            $.getJSON('/Matricula/GetPagosMatricula', { IdMatricula: idMatricula, IdAlumno: idAlumno, IdPeriodo: idPeriodo, tipo: tipoOperacion }, function (data2) {

                $("#tbDetalle-NV").DataTable().destroy();
                $("#tbDetalle-NV tbody").empty();

                if (data2.DetalleMatricula.length > 0) {
                    $.each(data2.DetalleMatricula, function () {

                        $("#tbDetalle-NV").append($("<tr id='concepto-" + this.IdConcepto + "'>")
                            .append($("<td hidden class='text-center idconcepto'>").text(this.IdConcepto))
                            .append($("<td hidden class='text-center mes'>").text(this.Mes))
                            .append($("<td class='text-center verificar'>")
                                .append($('<input class="form-check-input verificadito" id="chkConcepto-' + this.IdConcepto + '" data-idConcepto=' + this.IdConcepto + ' type="checkbox">')))
                            .append($("<td class='text-center periodo'>").text(this.Periodo))
                            .append($("<td class='descripcion'>").html(this.Concepto.replace(/[\r\n]/g, "<br>")))
                            .append($("<td class='text-center moneda' >").text("S/."))
                            .append($("<td class='text-center monto' >").text(this.Monto).attr('style', 'color:blue;font-weight:bold'))
                            .append($("<td class='text-center montopagado' >").text(this.Pagado).attr('style', 'color:green;font-weight:bold'))
                            .append($("<td class='text-center saldo' >").text(this.Saldo).attr('style', 'color:red;font-weight:bold'))
                            .append($("<td class='text-right apagar' >")
                                .append($('<input class="form-control text-center apagadito" type="text" id="sald-' + this.IdConcepto + '" data-idConcepto = ' + this.IdConcepto + ' style="border:none" value=" 00.00 ">')))
                            /*.append($("<td class='text-center fecha' >").text("FECHA"))*/
                            .append($("<td class='text-right tipoconcepto' >").text(this.TipoConcepto))
                        );

                    });

                    $("#btnNuevoDoc").attr("disabled", false);
                    $("#btnVistaPrevia").attr("disabled", false);
                    $("#btnRefreshDoc").attr("disabled", true);
                }
                else {
                    /*$("#tbDetalle-NV").DataTable().destroy();*/
                    $("#tbDetalle-NV tbody").empty();

                    $("#tbDetalle-NV").append($("<td colspan='9' style='padding-top:15px' class='text-center'>").html("No hay conceptos para pagar")
                    );

                    $("#btnNuevoDoc").attr("disabled", true);
                    $("#btnVistaPrevia").attr("disabled", true);
                    $("#btnRefreshDoc").attr("disabled", true);
                }

                $(".apagadito").focus(function () {
                    $(this).select();
                });

                $(".apagadito").on("change keyup", function () {
                    ActualizarTotales();
                });
            });
    });

    $("#txtEfectivo").focus(function () {
        $(this).select();
    });
    $("#txtDeposito").focus(function () {
        $(this).select();
    });
    $("#txtTarjeta").focus(function () {
        $(this).select();
    });
    $("#txtCredito").focus(function () {
        $(this).select();
    });

    $(document).on("click", "#btnNuevaVenta", function () {
        limpiarNuevaVenta();
        var idMatricula = $(this).attr("data-id");
        var idAlumno = $(this).attr("data-idalumno");

        $.getJSON('/Matricula/GetMatricula', { IdMatricula: idMatricula, IdAlumno: idAlumno }, function (data) {
            $("#tbDetalle-NV tbody").empty();

            $("#IdMatriculaV").val(data.Matricula.IdMatricula);
            $("#txtSedeV").val(data.Matricula.IdSede);
            $("#txtDniV").val(data.Matricula.Dni);
            $("#txtAlumnoV").val(data.Matricula.Alumno);
            $("#txtDireccionV").val(data.Matricula.Direccion);
            $("#txtIdAlumnoV").val(data.Matricula.IdAlumno);
            $("#txtIdPeriodoV").val(data.Matricula.IdPeriodo);

            $("#TipoOperacion").val("1").trigger("change");
            /*$("#txtUsuarioV").val(data.Matricula.Usuario);*/
            
        });

        $("#nuevaVenta").modal('show');        

    });    

    $("#cboEx").change(function () {
        ActualizarTotales();
    });

    function ActualizarTotales() {
        var sumaTotalIGV = 0;
        $("#tbDetalle-NV tbody tr").each(function () {
            var cantidad, pventa;

            cantidad = 1;
            
            pventa = $("#sald-" + $(this).children("td.idconcepto").text()).val();

            sumaTotalIGV = parseFloat(+sumaTotalIGV + cantidad * pventa).toFixed(2);
        });

        var incluirIGV = $("#cboEx option:selected").val();

        if (incluirIGV == 2) {

            sumaTotalIGV = parseFloat(Number(sumaTotalIGV) * (1 + 0.1800)).toFixed(2);

            sumaTotal = parseFloat(Number(sumaTotalIGV)).toFixed(2);

            subtotal = parseFloat(Number(sumaTotalIGV) / (1 + 0.1800)).toFixed(2);
            igv = parseFloat((0.1800 * sumaTotalIGV) / (1 + 0.1800)).toFixed(2);
            //exonerado = parseFloat(Number(sumaTotalExon)).toFixed(2);        

            $(".txtTotal").val(sumaTotal);
            $("#txtEfectivo").val(sumaTotal);
            $("#txtMontoPago").attr("max", sumaTotal);
            $(".txtSubTotal").val(subtotal);
            $(".txtIgv").val(igv);
            $(".txtNoGravado").val("0.00");
        }
        else
            if (incluirIGV == 1) {

                sumaTotal = parseFloat(Number(sumaTotalIGV)).toFixed(2);

                subtotal = parseFloat(Number(sumaTotalIGV) / (1 + 0.1800)).toFixed(2);
                igv = parseFloat((0.1800 * sumaTotalIGV) / (1 + 0.1800)).toFixed(2);
                //exonerado = parseFloat(Number(sumaTotalExon)).toFixed(2);        

                $(".txtTotal").val(sumaTotal);
                $("#txtEfectivo").val(sumaTotal);
                $("#txtMontoPago").attr("max", sumaTotal);
                $(".txtSubTotal").val(subtotal);
                $(".txtIgv").val(igv);
                $(".txtNoGravado").val("0.00");
            }
            else {

                sumaTotal = parseFloat(Number(sumaTotalIGV)).toFixed(2);

                //subtotal = parseFloat(number(0)).toFixed(2);
                //igv = parseFloat(number(0)).toFixed(2);
                //exonerado = parseFloat(Number(sumaTotalExon)).toFixed(2);        

                $(".txtTotal").val(sumaTotal);
                $("#txtEfectivo").val(sumaTotal);
                $("#txtMontoPago").attr("max", sumaTotal);
                $(".txtSubTotal").val("0.00");
                $(".txtIgv").val("0.00");
                $(".txtNoGravado").val(sumaTotal);
            }
            
        /*$(".txtExon").val(exonerado);  */     
        
    }

    $("#cboDocV").on("change", changeTipoDoc);
    $("#cboDocV").trigger("change");

    $("#cboTipoPersona").on("change", HabilitarRazon);

    function changeTipoDoc() {
        if ($("#cboDocV option:selected").val() == 1) {
            $("#txtNroDocumento").text("Factura [-]");
        }
        else
            if ($("#cboDocV").val() == 10)
                $("#txtNroDocumento").text("NV [-]");
            else
                $("#txtNroDocumento").text("Boleta [-]");
    }

    function HabilitarRazon() {
        if ($("#cboTipoPersona").val() == "J") {
            $("#txtRucV").removeAttr("readonly");
            $("#txtRazonSocialV").removeAttr("readonly");
            $("#btnLoadingRUC").removeAttr("disabled");
        }
        else {
            $("#txtRucV").attr("readonly",true);
            $("#txtRazonSocialV").attr("readonly", true);
            $("#btnLoadingRUC").attr("disabled", true);
        }
    }

    $("#btnNuevoDoc").on("click", function () {

        $("#msgRuc").val("").addClass("hidden");
        if (!notSunat) $("#txtRazonSocial").attr("readonly", true);

        var idsede = $("#txtSedeV").val();

        var suma = 0, efectivo = 0, deposito = 0, tarjeta = 0, credito = 0, total = 0, total2 = 0;

        efectivo = $("#txtEfectivo").val();
        deposito = $("#txtDeposito").val();
        tarjeta = $("#txtTarjeta").val();
        credito = $("#txtCredito").val();
        total2 = $("#txtTotalVenta").val();

        total = parseFloat(Number(efectivo) + Number(deposito) + Number(tarjeta) + Number(credito)).toFixed(2);

        $("#tbDetalle-NV tbody tr").each(function () {
            var VarIdConceptito = $(this).children("td.idconcepto").text();
            existiendo = $("#chkConcepto-" + VarIdConceptito).is(':checked');
            suma = suma + existiendo;
        });

        if (suma == 0) {
            $("#messageGuardarDoc").modal("show");
            $("#messageGuardarDoc_label").html("Porfavor, Seleccione el concepto a pagar");
        }
        else {
            if (total != total2) {
                $("#messageGuardarDoc").modal("show");
                $("#messageGuardarDoc_label").html("El pago indicado no coincide con el monto en caja!");
            }
            else {
                if (total2 < 1) {
                    $("#messageGuardarDoc").modal("show");
                    $("#messageGuardarDoc_label").html("Debe indicar un monto a pagar!");
                }
                else {
                    $.getJSON('/DocumentoVenta/GetCorrelativo', { TipoDoc: $("#cboDocV option:selected").val(), IdSede: idsede }, function (data) {

                        if (data.Serie == null) {
                            //$(".content-wrapper").alerts(false, 'No ha registrado la serie y correlativo para este documento y establecimiento. Ir a <a href="@Url.Action("Index", "Correlativo")" target="_blank" class="text-blue">Correlativos</a>.');
                            $("#errorCorre").removeClass("hide").addClass("show");
                            $("#errorCorre2").html();
                            return false;
                        }
                        else {
                            $("#confGenerarDoc").modal("show");
                        }

                        /*if (!$("#formulariogeneral").valid()) return false;*/

                        dataCorrelativo = data;

                        $("#confGenerarDoc").modal({
                            backdrop: "static"
                        });
                    });
                }                
            }            
        /*$("#messageGuardarDoc").modal("hide");*/
        }       
    });

    $("#btnConfGenerarDoc").on("click", function () {
        $("#btnConfGenerarDoc").attr("disabled", true).html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Generando Documento...');
        $("#btnNuevoDoc").attr('disabled', true);
        $("#btnVistaPrevia").attr('disabled', true);

        var idsede = $("#txtSedeV").val();
        var token = $("#formularioVenta").find("input[name=__RequestVerificationToken]").val();
                
        if (tipoDoc != 0) { //tipoDoc != 10
            var serie, nro, nroConCeros, texto;

            serie = dataCorrelativo.Serie;
            nro = dataCorrelativo.NroCorrelativo;
            nroConCeros = ("00000000" + nro).slice(-8);
            texto = $("#txtNroDocumento").text().replace("-", serie + "-" + nroConCeros);

            $("#txtNroDocumento").attr("data-serie", serie);
            $("#txtNroDocumento").attr("data-nro", nro);
            $("#txtNroDocumento").attr("data-nrocorto", serie + "-" + nro);
            $("#txtNroDocumento").attr("data-nrodoc", serie + "-" + nroConCeros);
            $("#txtNroDocumento").text(texto);
        }

        //var montoPago = ($("#txtMontoPago").val().trim() == "") ? 0 : Number($("#txtMontoPago").val());

        //if (isNaN(montoPago)) montoPago = 0;

        var documento = {
            TipoDocumento: $("#cboDocV option:selected").val(),
            IdSede: idsede,
            IdAlumno: $("#txtIdAlumnoV").val(),
            Moneda: (monedaDoc == "PEN" || monedaDoc == "USD") ? monedaDoc : "PEN",
            TipoPago: $("#cboTipoPago").val(),
            FormaPago: $("#cboFormaPago").val(),
            //MontoPago: ($("#cboFormaPago").val() == "Credito") ? montoPago : 0,
            /*Observaciones: $("#txtObservaciones").val(),*/
            TipoOperacion: 1,
            Dni: $("#txtDniV").val(),
            Direccion: ($("#txtDireccionV").val().trim() == "") ? "-" : $("#txtDireccionV").val(),
            Nombres: $("#txtAlumnoV").val(),
            Ruc: $("#txtRucV").val(),
            RazonSocial: $("#txtRazonSocialV").val(),
            NoGravado: $("#cboEx").val(),
            IncluirIGV: $("#cboEx option:selected").val(),
            /*PagoEfectivo: parseFloat($("#txtPagoEfectivo").val()) == 0 ? "" : $("#txtPagoEfectivo").val(),*/
            /*IdUsuario: tipoCajaDiaria == 1 ? $("#cboUsuario").val() : 0,*/
            //Entregado: $(".Entregado").val(),
            //Vuelto: $(".Vuelto").val(),
            TipoImpresionPDF: $("#cboTipoImpresionPDF").val(),
            TotalNoGravado: $(".txtNoGravado").val().replace(",", "."),
            TotalGravado: $(".txtSubTotal").val().replace(",", "."),
            TotalIgv: $(".txtIgv").val().replace(",", "."),
            Total: $(".txtTotal").val().replace(",", "."),
            NroTarjeta: $("#txtNroTarjeta").val().trim() == "" ? "-" : $("#txtNroTarjeta").val(),
            Efectivo: $("#txtEfectivo").val().replace(",", "."),
            Deposito: $("#txtDeposito").val().replace(",", "."),
            Tarjeta: $("#txtTarjeta").val().replace(",", "."),
            Credito: $("#txtCredito").val().replace(",", "."),
            /*Usuario:  "ORLANDO",*/
                
            //Correo: ($("#txtCorreo").val().trim() == "") ? "" : $("#txtCorreo").val(),
            //Telefono: ($("#txtTelefono").val().trim() == "") ? "" : $("#txtTelefono").val(),
            Detalles: [],

        };

        if (tipoDoc != 0) { //tipoDoc != 10
            documento.NroDocumento = $("#txtNroDocumento").attr("data-nrodoc");
            documento.NroCorto = $("#txtNroDocumento").attr("data-nrocorto");
            documento.Ticketera = dataCorrelativo.Ticketera;
        }

        //$("#chkConcepto").on("click", function () {
        //    activar = $("#chkConcepto").is(':checked');
        //    CrearDetalles(activar);
        //});

        $("#tbDetalle-NV tbody tr").each(function () {               
            var VarIdConcepto = $(this).children("td.idconcepto").text();
            activar = $("#chkConcepto-" + VarIdConcepto).is(':checked');
            if (activar) {
                documento.Detalles.push({
                    IdConcepto: $(this).children("td.idconcepto").text(),
                    Descripcion: $(this).children("td.descripcion").html().replace(/<br>/g, "\n").replace("&amp;", "&").replace("amp;", "").replace("amp;", "").replace("<strong>", "").replace("</strong>", "").replace("<strong>", "").replace("</strong>", "").replace("<strong>", "").replace("</strong>", "").replace("<strong>", "").replace("</strong>", "").replace("<strong>", "").replace("</strong>", "").replace("<strong>", "").replace("</strong>", ""),
                    Monto: parseFloat($(this).children("td.monto").text()).toFixed(3).replace(",", "."),
                    MontoPagado: $("#sald-" + $(this).children("td.idconcepto").text()).val(),
                    Fecha: $(this).children("td.fecha").text(),
                    Unidades: '1',
                    Medida: 'unidad',
                    /*TipoPrecio: parseInt($(this).children("td.cantidad").attr("data-TipoPrecio")),*/
                    Contador: $(this).children("td.concepto").attr("data-contador"),
                    TipoConcepto: $(this).children("td.tipoconcepto").attr("data-TipoConcepto"),
                    Mes: $(this).children("td.mes").text(),
                });
            }
                
            /*console.log(parseFloat($(this).children("td.saldo").text()).toFixed(3).replace(",", "."))*/
               
        });            

        console.log(activar)

        var alumnoN = {}, clienteJ = {};

        //if (!clienteencontrado) {
        //if ($("#txtRuc").val().length == 8 || ($("#txtRuc").val().length == 4 && $("#txtRuc").val() == "9999")) {
        if ($("#txtDniV").val().length > 0 && $("#txtDniV").val().length < 11) {
            alumnoN = {
                Dni: $("#txtDniV").val(),
                Alumno: $("#txtAlumnoV").val(),
                Direccion: ($("#txtDireccionV").val().trim() == "") ? "-" : $("#txtDireccionV").val(),                    
            }
        } else {
            clienteJ = {
                Ruc: $("#txtRucV").val(),
                RazonSocial: $("#txtRazonSocialV").val(),
                //Direccion: ($("#txtDireccion").val().trim() == "") ? "-" : $("#txtDireccion").val(),
                //Telefono: ($("#txtTelefono").val().trim() == "") ? "-" : $("#txtTelefono").val(),
                //Correo: ($("#txtCorreo").val().trim() == "") ? "-" : $("#txtCorreo").val(),
                //IdUbigeo: ($("#txtIdUbigeo").val().trim() == "") ? 0 : $("#txtIdUbigeo").val(),
                //FechaInscripcion: ($("#txtFechaInscripcion").val().trim() == "") ? "" : $("#txtFechaInscripcion").val(),
                //FechaIncioActividades: ($("#txtFechaIncioActividades").val().trim() == "") ? "" : $("#txtFechaIncioActividades").val(),
            }
        }

        $.ajax({
            type: 'POST',
            url: '/DocumentoVenta/CreateDocumentoCompletoFact',
            data: {
                __RequestVerificationToken: token,
                documento: documento,
                alumnoN: alumnoN,
                /*clienteJ: clienteJ,*/
                Fecha: $("#txtFechaEmision").val(),
                IdDocumentoVenta: "@ViewBag.Documento.IdDocumentoVenta",
                /*FechaTraslado: $("#txtFechaTraslado").val(),*/
                IdMatricula: "@ViewBag.IdMatricula",
            },
            success: function (result) {
                /*$(".content-wrapper").alert(result.success, (result.success ? (((tipoDoc == 1) ? "Factura" : ((tipoDoc == 3) ? "Boleta" : (tipoDoc == 10) ? "Nota de Venta" : "Punto Venta ")) + " " + result.texto + " generada correctamente.") : result.message));*/

                $("#btnRefreshDoc").removeAttr("disabled", true);
                $("#btnConfGenerarDoc").html('Generar Documento');                

                if (result.success) {
                    $("#txtNroDocumento").text(result.texto);
                    $("#txtNroDocumento").attr("data-id", result.iddocumento);

                    if (tipoDoc != 0) { //tipoDoc != 10
                        $("#btnNuevoDoc").css("display","none");
                        $("#btnVistaPrevia").css("display","none");

                        //var idDocumentoD = $("#txtNroDocumento").attr("data-id");
                        //var nroDoc = $("#txtNroDocumento").attr("data-nrodoc");

                        //$("#TicketeraPDF").val(dataCorrelativo.Ticketera);
                        //$("#GuiaRemimisionPDF").val($("#chkGuiaRemision").is(':checked'));
                        //$("#idDocumentoPDF").val(idDocumentoD).parent("form").submit();

                        if (tipoDoc != 115) {
                            /*$("#btnCuponDoc").removeClass("hidden");*/
                            $("#btnImprimir").css("display","block");
                            $("#btnWhatsapp").css("display", "block");

                            var dominio = location.origin;
                            var extencion = (dataCorrelativo.Ticketera == 1 ? "-Ticket.pdf" : ".pdf");

                            UrlArchivo = dominio + "/DocsFilesXML/" + result.rutaPDF + extencion;

                            $("#btnImprimir").removeAttr('disabled').attr("href", "javascript: w=window.open('" + dominio + "/DocsFilesXML/" + result.rutaPDF + extencion + "'); ;w.onload = function () { setTimeout(function(){ w.print();}, 500); w.onfocus = function () { w.close(); } };");

                            window.location.href = $("#btnImprimir").attr('href');
                        }
                    }
                }

                notSunat = false;
                generoFact = true;
                $("#confGenerarDoc").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#btnRefreshDoc").removeAttr("disabled");
            //    $("#btnConfGenerarDoc").html(IdDocPuntoVenta > 0 ? 'Guardar Documento' : 'Generar Documento');
            //    $("#confGenerarDoc").modal("hide");

            //    $(".content-wrapper").alerts(false, xhr.statusText);
            //}
        });

    });

    function limpiarNuevaVenta() {
        /*$("#txtNroDocumento").text("");*/
        //$("#cboDocV").on("change", changeTipoDoc);
        //$("#cboDocV").trigger("change");
        $("#cboDocV").val("3");
        $("#cboDocV").on("change", changeTipoDoc);
        $("#cboDocV").trigger("change");
        $("#cboTipoPersona").val("N");
        $("#cboMonedaV").val("PEN");
        $("#cboTipoPago").val("Contado");
        $("#cboFormaPago").val("Efectivo");
        $("#TipoOperacion").val("1");
        $("#cboTipoImpresionPDF").val("0");
        $("#txtRucV").val("");
        $("#txtRazonSocialV").val("");
        $("#cboEx").val("3");
        $("#txtNoGravado").val("0.00");        
        
        $("#txtNroTarjeta").val("");
        $("#txtEfectivo").val("0.00");
        $("#txtDeposito").val("0.00");
        $("#txtTarjeta").val("0.00");
        $("#txtCredito").val("0.00");

        $("#txtRucV").attr("readonly",true);
        $("#txtRazonSocialV").attr("readonly", true);
        $("#btnLoadingRUC").attr("disabled", true);
        

        //$("#sald-" + $(this).children("td.idconcepto").text()).val();      
        
        $(".verificadito").prop("checked", false);
        $(".apagadito").val("00.00");
        ActualizarTotales();

        $("#btnNuevoDoc").css("display","block");
        $("#btnVistaPrevia").css("display", "block");
        $("#btnNuevoDoc").removeAttr("disabled", true);
        $("#btnVistaPrevia").removeAttr("disabled", true);
        $("#btnConfGenerarDoc").removeAttr("disabled", true);

        $("#btnImprimir").css("display", "none");
        $("#btnWhatsapp").css("display", "none");

    }

    $(document).on("click", "#btnRefreshDoc", function () {
        /*location.reload();*/
        limpiarNuevaVenta();
        $("#cboDocV").on("change", changeTipoDoc);
        $("#cboDocV").trigger("change");

        var idMatricula = $("#IdMatriculaV").val();
        var idAlumno = $("#txtIdAlumnoV").val();

        $("#TipoOperacion").trigger("change");

        //$.getJSON('/Matricula/GetMatricula', { IdMatricula: idMatricula, IdAlumno: idAlumno }, function (data) {
        //    /*$("#tbDetalle-NV").DataTable().destroy();*/
        //    $("#tbDetalle-NV tbody").empty();
        //    $.each(data.DetalleMatricula, function () {
        //        /*var totalCalculadoItem = parseFloat(this.Cantidad * this.PrecioUnitario).toFixed(2);*/

        //        $("#tbDetalle-NV").append($("<tr id='concepto-" + this.IdConcepto + "'>")
        //            .append($("<td hidden class='text-center idconcepto'>").text(this.IdConcepto))
        //            .append($("<td class='text-center verificar'>")
        //                .append($('<input class="form-check-input verificadito" id="chkConcepto-' + this.IdConcepto + '" type="checkbox">')))
        //            .append($("<td class='text-center periodo'>").text(this.Periodo))
        //            .append($("<td class='descripcion'>").html(this.Concepto.replace(/[\r\n]/g, "<br>")))
        //            .append($("<td class='text-center moneda' >").text("S/."))
        //            .append($("<td class='text-center monto' >").text(this.Monto).attr('style', 'color:blue;font-weight:bold'))
        //            .append($("<td class='text-center montopagado' >").text(this.Pagado).attr('style', 'color:green;font-weight:bold'))
        //            .append($("<td class='text-center saldo' >").text(this.Saldo).attr('style', 'color:red;font-weight:bold'))
        //            .append($("<td class='text-right apagar' >")
        //                .append($('<input class="text-center apagadito" id="sald-' + this.IdConcepto + '"  style="border:none"  value=" 00.00 ">')))
        //            /*.append($("<td class='text-center fecha' >").text("FECHA"))*/
        //            .append($("<td class='text-right tipoconcepto' >").text(this.TipoConcepto))
        //        );
        //    });

        //    $(".montopagado").text(this.Pagado);
        //    $(".saldo").text(this.Saldo);

        //    $(".apagadito").focus(function () {
        //        $(this).select();
        //    });

        //    $(".apagadito").on("change keyup", function () {
        //        ActualizarTotales();
        //    });
        //});
        /*$("#btnNuevaVenta").trigger("click");*/
        /*$("#cboDocV").trigger("change");*/
    });

    //$("#btnVistaPrevia").on("click", function () {
    //    $("#btnVistaPrevia").html('<span class="fas fa-spinner"></span>\u00a0\u00a0 Generando Vista Previa...');
    //    var idsede = $("#txtSedeV").val();

    //    var suma = 0;

    //    $("#tbDetalle-NV tbody tr").each(function () {
    //        var VarIdConceptito = $(this).children("td.idconcepto").text();
    //        existiendo = $("#chkConcepto-" + VarIdConceptito).is(':checked');
    //        suma = suma + existiendo;
    //    });

    //    if (suma == 0) {
    //        $("#messageGuardarDoc").modal("show");
    //    }
    //    else {
    //        $.getJSON('/DocumentoVenta/GetCorrelativo', { TipoDoc: $("#cboDocV option:selected").val(), IdSede: idsede }, function (data) {

    //            if (data.Serie == null) {
    //                //$(".content-wrapper").alerts(false, 'No ha registrado la serie y correlativo para este documento y establecimiento. Ir a <a href="@Url.Action("Index", "Correlativo")" target="_blank" class="text-blue">Correlativos</a>.');
    //                $("#errorCorre").removeClass("hide").addClass("show");
    //                $("#errorCorre2").html();
    //                return false;
    //            }

    //            /*if (!$("#formulariogeneral").valid()) return false;*/

    //            dataCorrelativo = data;

    //            $("#confGenerarDoc").modal({
    //                backdrop: "static"
    //            });
    //        });
    //        /*$("#messageGuardarDoc").modal("hide");*/
    //    }
    //});

    $("#btnVistaPrevia").click(function () {
        $("#btnVistaPrevia").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Generando Vista Previa...');
        var idsede = $("#txtSedeV").val();

        var suma = 0;

        $("#tbDetalle-NV tbody tr").each(function () {
            var VarIdConceptito = $(this).children("td.idconcepto").text();
            existiendo = $("#chkConcepto-" + VarIdConceptito).is(':checked');
            suma = suma + existiendo;
        });

        if (suma == 0) {
            $("#messageGuardarDoc").modal("show");
        }
        else {
            $.getJSON('/DocumentoVenta/GetCorrelativo', { TipoDoc: $("#cboDocV option:selected").val(), IdSede: idsede }, function (data) {

                if (data.Serie == null) {
                    //$(".content-wrapper").alerts(false, 'No ha registrado la serie y correlativo para este documento y establecimiento. Ir a <a href="@Url.Action("Index", "Correlativo")" target="_blank" class="text-blue">Correlativos</a>.');
                    $("#errorCorre").removeClass("hide").addClass("show");
                    $("#errorCorre2").html();
                    return false;
                }
                /*if (!$("#formulariogeneral").valid()) return false;*/
                dataCorrelativo = data;
                GenerarDocumentoVistaPrevia();
            });            
            /*$("#messageGuardarDoc").modal("hide");*/
        }

        //if ($("#txtMontoPago").val().trim() == "") {
        //    $("#txtMontoPago").val(parseFloat(0).toFixed(2));
        //} else {
        //    var monto = Number($("#txtMontoPago").val());

        //    if (!isNaN(monto)) {
        //        $("#txtMontoPago").val(parseFloat(monto).toFixed(2));
        //    }
        //};

        //if ($("#no-filas-deta").length > 0 || ($("#no-filas-deta").length == 0 && $("#tbDetalle-NV tbody tr").length == 0)) {
        //    $("#detalles-error").html("Agregue algún producto a su venta.").removeClass("hidden");
        //    $("#formulariogeneral").valid();
        //    return false;
        //}

        //$("#detalles-error").html("").addClass("hidden");

        //if (($("#cboTipoDocumento").val() == 3 || $("#cboTipoDocumento").val() == -3) && sumaTotal <= montoMinBoleta && $("#TipoOperacion").val() != "4" && ($("#txtRuc").val().trim() == "" || $("#txtRazonSocial").val().trim() == "")) {
        //    $("#txtRuc").val("9999");
        //    $("#txtRazonSocial").val("Clientes Varios");
        //    $("#txtNombres").val("Clientes");
        //    $("#txtApellidos").val("Varios");
        //    validDoc = true;
        //}

        //if (($("#cboTipoDocumento").val() == 10 || $("#cboTipoDocumento").val() == 115) && $("#cboTipoPersona").val() == "N" && $("#TipoOperacion").val() != "4" && ($("#txtRuc").val().trim() == "" || $("#txtRazonSocial").val().trim() == "")) {
        //    $("#txtRuc").val("9999");
        //    $("#txtRazonSocial").val("Clientes Varios");
        //    $("#txtNombres").val("Clientes");
        //    $("#txtApellidos").val("Varios");
        //    validDoc = true;
        //}

        /*if (!$("#formulariogeneral").valid()) return false;*/

        

        //if (tipoDoc == 1 && $("#txtRuc").val().length != 11 && $("#TipoOperacion").val() != "2" && $("#TipoOperacion").val() != "3") {
        //    $(".content-wrapper").alerts(false, 'EL Numero de Ruc tiene 11 Digitos.');
        //    return false;
        //}
        //if (tipoDoc == 3 && $("#txtRuc").val().length == 11 && $("#TipoOperacion").val() != "2" && $("#TipoOperacion").val() != "3") {
        //    $(".content-wrapper").alerts(false, 'EL Numero de DNI tiene 8 Digitos.');
        //    return false;
        //}
        //if ((tipoDoc == 10 || tipoDoc == 115) && $("#cboTipoPersona").val() == "J" && $("#txtRuc").val().length != 11) {
        //    $(".content-wrapper").alerts(false, 'EL Numero de Ruc tiene 11 Digitos.');
        //    return false;
        //}
        //if ((tipoDoc == 10 || tipoDoc == 115) && $("#cboTipoPersona").val() == "N" && $("#txtRuc").val().length == 11) {
        //    $(".content-wrapper").alerts(false, 'EL Numero de DNI tiene 8 Digitos.');
        //    return false;
        //}

        //$.getJSON("@Url.Action("GetCorrelativo","DocumentoVenta")", { TipoDoc: $("#cboTipoDocumento option:selected").val(), IdEstablecimiento: idestablecimiento }, function (data) {
        //    if (data.Serie == null) {
        //        $(".content-wrapper").alerts(false, 'No ha registrado la serie y correlativo para este documento y establecimiento. Ir a <a href="@Url.Action("Index", "Correlativo")" target="_blank" class="text-blue">Correlativos</a>.');
        //        return false;
        //    }

        //    if (!$("#formulariogeneral").valid()) return false;

        //    dataCorrelativo = data;

        //    GenerarDocumentoVistaPrevia();
        //});                

    });

    function GenerarDocumentoVistaPrevia() {
        $("#modalRedireccionar").modal({
            backdrop: 'static'
        });

        var documento = {
            Documento: $("#txtDniV").val(),
            Name: $("#txtAlumnoV").val(),
            NombreMoneda: monedaDoc == "PEN" ? "SOLES" : "DÓLARES",
            SimboloMoneda: monedaDoc,
            DireccionC: ($("#txtDireccionV").val().trim() == "") ? "-" : $("#txtDireccionV").val(),
            FormaPago: $("#cboTipoPago").val(),
            //EmailCliente: ($("#txtCorreo").val().trim() == "") ? "-" : $("#txtCorreo").val(),                
            TotalGravado: $(".txtSubTotal").val().replace(",", "."),
            IgvTotal: $(".txtIgv").val().replace(",", "."),
            TotalF: $(".txtTotal").val().replace(",", "."),
            //Observaciones: $("#txtObservaciones").val(),
            InvoiceTypeCode: $("#cboDocV option:selected").val(),
            //DescuentoGlobal: isNaN($("#txtDescuentoGlobal").val()) ? "0.00" : parseFloat($("#txtDescuentoGlobal").val()).toFixed(2).replace(",", "."),
            MedioPago: $("#cboFormaPago").val(),
            //Entregado: $(".Entregado").val(),
            //Vuelto: $(".Vuelto").val(),                
            TipoImpresionPDF: $("#cboTipoImpresionPDF").val(),
            //TelefonoC: $("#txtTelefono").val(),
        };

        var detalles = [];

        $("#tbDetalle-NV tbody tr").each(function () {
            var VarIdConcepto = $(this).children("td.idconcepto").text();
            activar = $("#chkConcepto-" + VarIdConcepto).is(':checked');
            if (activar) {
                detalles.push({
                    UnitCode: $(this).children("td.idconcepto").text(),
                    ItemIdentification: $(this).children("td.descripcion").html().replace(/<br>/g, "\n").replace("&amp;", "&").replace("amp;", "").replace("amp;", "").replace("<strong>", "").replace("</strong>", "").replace("<strong>", "").replace("</strong>", "").replace("<strong>", "").replace("</strong>", "").replace("<strong>", "").replace("</strong>", "").replace("<strong>", "").replace("</strong>", "").replace("<strong>", "").replace("</strong>", ""),
                    Medida: 'unidad',
                    Quantity: '1',
                    VVUnitario: parseFloat(($("#sald-" + $(this).children("td.idconcepto").text()).val())).toFixed(2).replace(",", "."),
                    ValorVenta: parseFloat(($("#sald-" + $(this).children("td.idconcepto").text()).val())).toFixed(2).replace(",", "."),
                    VentaExonItem: parseFloat(parseFloat('1') * parseFloat(($("#sald-" + $(this).children("td.idconcepto").text()).val()))).toFixed(2).replace(",", "."),
                });
            }

        });
        documento.ValorReferencial = parseFloat(0).toFixed(2);

        //var montoPago = ($("#txtMontoPago").val().trim() == "") ? 0 : Number($("#txtMontoPago").val());
        //if (isNaN(montoPago)) montoPago = 0;

        //if ($("#cboTipoPago").val() == "Crédito" && _ReferenciaCuota.length <= 1) { /* dato viene de otra venta */
        //    _ReferenciaCuota = [];

        //    _ReferenciaCuota.push({
        //        FechaVenc: $("#txtFecha").val(),
        //        Cuota: parseFloat(documento.ValorReferencial) > 0 && parseFloat(documento.ValorReferencial) < parseFloat(sumaTotal) ? parseFloat(documento.ValorReferencial).toFixed(2) : parseFloat(parseFloat(sumaTotal) - parseFloat(montoPago) - parseFloat(documento.TotalDetraccion) - parseFloat(documento.TotalRetencion)).toFixed(2),
        //        Monto: parseFloat(documento.ValorReferencial) > 0 && parseFloat(documento.ValorReferencial) < parseFloat(sumaTotal) ? parseFloat(documento.ValorReferencial).toFixed(2) : parseFloat(parseFloat(sumaTotal) - parseFloat(montoPago) - parseFloat(documento.TotalDetraccion) - parseFloat(documento.TotalRetencion)).toFixed(2),
        //    });
        //}

        $.post('/DocumentoVenta/ImprimirReporteVistaPrevia', { idsede: $("#txtSedeV").val(), documento: documento, detalles: detalles, FechaEmision: $("#txtFechaEmision").val(), /*fechaVenc: $("#txtFechaVenc").val()*/ tipoImpresion: dataCorrelativo.Ticketera }, function (result) {
            if (result.success) {
                var dominio = location.origin;
                var extencion = dataCorrelativo.Ticketera == 1 ? "-Ticket.pdf" : ".pdf";
                window.location.href = "javascript: w=window.open('" + dominio + "/DocsFilesXML/VistaPrevia/" + result.rutaPDF + extencion + "'); w.onload = function () { setTimeout(function(){ w.print();}, 500); w.onfocus = function () { w.close(); } }; ";
            }

            $("#modalRedireccionar").modal("hide");
            $("#btnVistaPrevia").html('Vista Previa');
        });
    }

    $('#btnWhatsapp').on('click', function (e) {
        $("#modalenviarwhatsapp").modal("show");
    });

    $('#btnSendWhatsapp').on('click', function (e) {
        if ($("#txtNroCelular").val() != null && $("#txtNroCelular").val() != "") {
            if ($("#cboTipoMensaje").val() == "0") {
                window.open("https://web.whatsapp.com/send?phone=+51" + $("#txtNroCelular").val() + "&text=" + UrlArchivo);
            }
            else {
                window.open("https://api.whatsapp.com/send?phone=+51" + $("#txtNroCelular").val() + "&text=" + UrlArchivo);
            }

            $("#modalenviarwhatsapp").modal("hide");
        }
    });

    $("#btnLoadingRUC").on("click", function () {
        $("#txtRucV-error").remove();
        if ($("#txtRucV").val().length == 11) {
            BuscarCliente();
        } else {
            validrucdni = false;
            $("#txtRucV").parent("div.input-group").parent("div").append('<label id="txtRucV-error" class="error text-red" for="txtRucV">Por favor, escribe un RUC válido</label>');
        }
    });

    function BuscarCliente() {
        validDoc = true;
        notSunat = false;

        $(".close-message").trigger("click");
        $("#btnLoadingRUC span").removeClass("fa-search").addClass("fa-spinner").addClass("fa-spin");

        $.getJSON('/Sede/BuscarClientesGeneral', { Codigo: $("#txtRucV").val()/*, errorSunat: errorSunat*/ }, function (result) {
            validDoc = result.valid;

            if (result.success == true) {
                if ($("#txtRucV").val().length == 11) {
                    $("#txtRazonSocialV").val(result.persona.RazonSocial);                    
                }
                $("#txtRucV").attr("data-id", "");

            } else {
                if (result.rucValid) {
                    //console.log("error");
                    $("#txtRazonSocialV").removeAttr("readonly");

                    notSunat = true;
                    validDoc = false;
                    validDoc = result.valid;
                }
                else {
                    $("#txtRazonSocialV").removeAttr("readonly");

                    validDoc = true;
                    validDoc = result.valid;

                }
                $("#txtRazonSocialV").val("");
            }

            $("#btnLoadingRUC span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");

        }).fail(function (result) {
            validRUC = true;
            existsRUC = false;
            $("#btnLoadingRUC span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");

        });
    }

    $("#txtEfectivo").blur(function () {
        if ($(this).val().trim() != "") {
            if (parseFloat($(this).val()) >= 0) {
                $("#txtEfectivo").val(parseFloat($(this).val()).toFixed(2));
            }
            else
                $("#txtEfectivo").val("0.00");
        }
        else
            $("#txtEfectivo").val("0.00");
    });

    $("#txtDeposito").blur(function () {
        if ($(this).val().trim() != "") {
            if (parseFloat($(this).val()) >= 0) {
                $("#txtDeposito").val(parseFloat($(this).val()).toFixed(2));
            }
            else
                $("#txtDeposito").val("0.00");
        }
        else
            $("#txtDeposito").val("0.00");
    });

    $("#txtTarjeta").blur(function () {
        if ($(this).val().trim() != "") {
            if (parseFloat($(this).val()) >= 0) {
                $("#txtTarjeta").val(parseFloat($(this).val()).toFixed(2));
            }
            else
                $("#txtTarjeta").val("0.00");
        }
        else
            $("#txtTarjeta").val("0.00");
    });

    $("#txtCredito").blur(function () {
        if ($(this).val().trim() != "") {
            if (parseFloat($(this).val()) >= 0) {
                $("#txtCredito").val(parseFloat($(this).val()).toFixed(2));
            }
            else
                $("#txtCredito").val("0.00");
        }
        else
            $("#txtCredito").val("0.00");
    });    
}