function SedeVD() {
    var objOwner = this;
    var crearS = true;
    var crearC = true;
    var IdSede = 0;
    var serieLetraO = "";
    /*var errorSunat = (Number('@ViewBag.BusquedaSunat') == 1 ? false : true);*/

    /*objOwner.CodigoAlmacen = 0;*/

    var formNuevo = document.querySelectorAll("#formularioSede");
    var formCorr = document.querySelectorAll("#formularioCorrelativo");

    $("#btnCrearSede").on("click", function () {

        if (!formNuevo[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formNuevo[0].classList.add("was-validated");

    });

    $("#btnCrearCorrelativo").on("click", function () {

        if (!formCorr[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formCorr[0].classList.add("was-validated");

    });

    //$("#sedeTable").DataTable({
    //    "responsive": true,
    //    "lengthChange": false,
    //    "autoWidth": false,
    //    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    //}).buttons().container().appendTo('#sedeTable_wrapper .col-md-6:eq(0)');

    //$("#correlativoTable").DataTable({
    //    "responsive": true,
    //    "lengthChange": false,
    //    "autoWidth": false,
    //    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    //}).buttons().container().appendTo('#correlativoTable_wrapper .col-md-6:eq(0)');

    ListarSedes();
    ListarCorrelativos();

    function LimpiarSede() {
        /*$("#txtCodigo").val("");*/
        $("#txtRuc").val("");
        $("#txtNombre").val("");
        $("#txtDireccion").val("");
        $("#txtCodigoSunat").val("");
        $("#txtNombreSede").val("");
        $("#txtResponsable").val("");
        $("#txtComision").val("00.00");
        $("#txtUbigeo").val("");
        $("#txtTelefono").val("");
        $("#cboDepartamento").val("");
        $("#cboProvincia").empty();
        $("#cboProvincia").append($("<option>").val("").text("-- Seleccionar Provincia--"));
        $("#cboDistrito").empty();
        $("#cboDistrito").append($("<option>").val("").text("-- Seleccionar Distrito --"));

        $("#formularioSede").removeClass("was-validated");
    }

    $("#txtComision").focus(function () {
        $(this).select();
    });

    $("#btnNuevaSede").click(function () {
        LimpiarSede();
        $("#error").removeClass("show").addClass("hide");
        $.getJSON('/Sede/BuscarCorrelativoSede', function (data) {
            
            if (data != "" && data[0] == "0") {
                var num = parseInt(data);
                num++;
                codigo = ("0000" + num).slice(-4);
            }
            else
                codigo = "0001";

            LimpiarSede();            
            $("#IdSede").remove();
            $("#txtCodigo").val(codigo);
            crearS = true;
        });

        if ($("#cboPais").val() == "174") {
            $("#cboDepartamento").empty();
            $("#cboDepartamento").append($("<option style='text - align: center'>").val("").text("-- Seleccionar Departamento --"));
            $.getJSON('/Sede/CargarDepartamentos', function (data) {
                $.each(data, function () {
                    $("select#cboDepartamento").append($('<option value="' + this.IdDepartamento + '" >' + this.Nombre + '</option>'));
                });
                /*$("#cboDepartamento").val("13");*/
            });
        } 

        $("#btnCrearSede").text("Guardar").attr("class", "btn btn-primary");
    });

    //$("#txtComision").val("00.00");

    //$("#txtComision").focus(function () {
    //    $(this).select();
    //});

    $("#nuevaSede").modal({
        backdrop: 'static'
    });

    $("#eliminarSede").modal({
        backdrop: 'static'
    });

    $("#cboPais").on("change", function () {
        $("#cboDepartamento").empty();
        $("#cboDepartamento").append($("<option>").val("").text("-- Seleccionar Departamento --"));

        $("#cboProvincia").empty();
        $("#cboProvincia").append($("<option>").val("").text("-- Seleccionar Provincia --"));

        if ($(this).val() == "174") {
            $("#mostrarDepartamento").show();

            $.getJSON('/Sede/CargarDepartamentos', function (data) {
                $.each(data, function () {
                    $("select#cboDepartamento").append($('<option value="' + this.IdDepartamento + '">' + this.Nombre + '</option>'));
                });
            });

            $("#cboDepartamento").attr("required", true);
            $("#cboProvincia").attr("required", true);
            $("#cboDistrito").attr("required", true);
        }
        else {
            $("#mostrarDepartamento").hide();

            $("#cboDepartamento").removeAttr("required");
            $("#cboProvincia").removeAttr("required");
        }
    });

    $("#cboDepartamento").on("change", function () {
        $.getJSON('/Sede/CargarProvincias', { IdDepartamento: $(this).val() }, function (data) {
            $("#cboProvincia").empty();
            $("#cboProvincia").append($("<option>").val("").text("-- Seleccionar Provincia --"));
            $.each(data, function () {
                $("select#cboProvincia").append($('<option value="' + this.IdProvincia + '">' + this.Nombre + '</option>'));
            });
        });
    });

    $("#cboProvincia").on("change", function () {
        $.getJSON('/Sede/CargarDistritos', { IdProvincia: $(this).val() }, function (data) {
            $("#cboDistrito").empty();
            $("#cboDistrito").append($("<option>").val("").text("-- Seleccionar Distrito --"));
            $.each(data, function () {
                $("select#cboDistrito").append($('<option value="' + this.IdDistrito + '" data-ubigeo="' + this.Codigo + '">' + this.Nombre + '</option>'));
            });
        });
    });

    $("#cboDistrito").change(function () {
        /*$("#txtUbigeo").val("");*/

        if ($(this).val() != "") {
            if ($(this).val() == "0") {
                $("#txtUbigeo").val("");
            }
            else {
                $("#txtUbigeo").val($("#cboDistrito option:selected").data().ubigeo);
            }
        }
        
    });         

    function ListarSedes() {

        $("#sedeTable").DataTable().destroy();
        $("#sedeTable tbody").empty();

        $.ajax({
            url: '/Sede/Filtrar',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#sedeTable tbody").append($("<tr id='sede-" + this.IdSede + "' data-id='" + this.IdSede + "'>")
                        /*.append($("<td class='text-center clickeable'>").text(this.CodigoSede))*/
                        .append($("<td class='text-center clickeable'>").text(this.CodigoSunat))
                        .append($("<td class='text-center clickeable'>").text(this.RucSede))
                        .append($("<td class='text-center clickeable'>").text(this.Nombre))
                        .append($("<td class='text-center clickeable'>").text(this.Direccion))
                        .append($("<td class='text-center clickeable'>").text(this.NombreSede))
                        .append($("<td class='text-center clickeable'>").text(this.Responsable))
                        .append($("<td class='text-center clickeable'>").text("S/. " + this.Comision))
                        /*.append($("<td class='text-center'>").text(this.Pais))*/
                        .append($("<td class='text-center clickeable'>").text(this.Departamento))
                        .append($("<td class='text-center clickeable'>").text(this.Provincia))
                        /*.append($("<td class='text-center'>").text(this.Ubigeo))*/
                        .append($('<td class="text-center">')
                            .append($("<span>").text(this.IdSede).attr("hidden"))
                            .append($("<a id='btnVerSede' class='text-blue text-lg' data-id=" + this.IdSede + " title='Ver Detalles'>")
                                .append($("<span>").attr("class", "fa fa-plus"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnModificarSede-" + this.IdSede + "' data-id='" + this.IdSede + "' data-estado='" + this.Estado + "' class='btnModificarSede text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnAnularSede-" + this.IdSede + "' data-id='" + this.IdSede + "' data-estado='" + this.Estado + "' class='btnAnularSede text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                    );
                    
                });

                if ($("#txtrol").val() == 'Administrador') {
                    $("#sedeTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#sedeTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#sedeTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#sedeTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#sedeTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#sedeTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#sedeTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#sedeTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#sedeTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#sedeTable_wrapper .col-md-6:eq(0)');
                }
                

                //var tr = $("#sedeTable tbody tr:first-child");
                //IdSede = tr.attr("data-id");

                //if (IdSede != undefined) {
                //    tr.addClass("success");
                //    ListarCorrelativos(IdSede);
                //}
                                
                
                $("#nuevaSede").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#modalRedireccionar").modal("hide");
            //    /*$(".content-wrapper").alerts(false, xhr.statusText);*/
            //}
        });
        
    }

    $("#btnCrearSede").on("click", function () {
        if ($("#txtRuc").val().length != 0 && $("#txtNombre").val().length != 0 && $("#txtDireccion").val().length != 0 && $("#txtTelefono").val().length != 0 && $("#txtCodigoSunat").val().length != 0
            && $("#txtNombreSede").val().length != 0 && $("#txtResponsable").val().length != 0 && $("#txtComision").val().length != 0 && $("#cboPais").val().length != 0 && $("#cboDepartamento").val().length != 0
            && $("#cboProvincia").val().length != 0 && $("#cboDistrito").val().length != 0 && $("#txtUbigeo").val().length != 0) {

            if (crearS) {
                $("#btnCrearSede").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                $.post('/Sede/CreateSede', $("#formularioSede").serialize(), function (result) {
                    if (result.success) {
                        ListarSedes();
                        $("#exito").removeClass("hide").addClass("show");
                        $("#exito2").html();
                    }
                    else {
                        /*$("#formularioSede").parents("div.form-group").addClass("has-error");*/
                        $("#btnCrearSede").removeAttr("disabled").html('Guardar');
                        $("#error").removeClass("hide").addClass("show");
                        $("#error2").html();

                    }
                });
            } else {
                $("#btnCrearSede").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');

                $.post('/Sede/EditSede', $("#formularioSede").serialize(), function (result) {
                    if (result.success) {
                        ListarSedes();                        
                        $("#informa").removeClass("hide").addClass("show");
                        $("#info").html();

                    } else {
                        $("#btnCrearSede").removeAttr("disabled").html('Guardar Cambios');
                        /*$("#liveToast2").removeClass("hide").addClass("show");*/
                        /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                        $("#nuevaSede").modal("hide");
                    }
                });
            }

        }
        
        $("#btnCrearSede").removeAttr("disabled").html('Guardar');
    });
    

    $(document).on("click", ".btnModificarSede", function () {
        /*LimpiarCombos();*/
        $("#nuevaSede").modal("show");
        $("#formularioSede").removeClass("was-validated");

        $.getJSON('/Sede/VerSede', { IdSede: $(this).attr("data-id") }, function (data) {
            $("#formularioSede").prepend('<input type="hidden" name="IdSede" id="IdSede" value="' + data.IdSede + '" />');

            if (data.IdPais == "174") {
                $.getJSON('/Sede/CargarDepartamentos', function (data2) {
                    $.each(data2, function () {
                        $("select#cboDepartamento").append($('<option value="' + this.IdDepartamento + '" >' + this.Nombre + '</option>'));
                    });

                    $("#txtCodigo").val(data.CodigoSede.trim()).attr("readonly", true);
                    $("#txtRuc").val(data.RucSede);
                    $("#txtNombre").val(data.Nombre);
                    $("#txtDireccion").val(data.Direccion);
                    $("#txtCodigoSunat").val(data.CodigoSunat);
                    $("#txtNombreSede").val(data.NombreSede);
                    $("#txtResponsable").val(data.Responsable);
                    $("#txtComision").val(data.Comision);
                    $("#txtTelefono").val(data.Telefono);
                    $("#cboPais").val(data.IdPais);
                    $("#cboDepartamento").val(data.IdDepartamento).trigger("change");
                    /*$("#cboProvincia").val(data.IdProvincia).trigger("change");*/
                    /*$("#cboDistrito").val(data.IdDistrito).trigger("change");*/

                    setTimeout(function () {
                        $("#cboProvincia").val(data.IdProvincia).trigger("change");
                    }, 200);

                    setTimeout(function () {
                        $("#cboDistrito").val(data.IdDistrito).trigger("change");
                    }, 500);

                    $("#txtUbigeo").val(data.Ubigeo);


                    //setTimeout(function () {
                    //    /*$("#cboProvincia").val(data.IdProvincia).trigger("change");*/
                    //    $("#cboDistrito").val(data.IdDistrito).trigger("change");
                    //}, 200);

                    //$.getJSON('/Sede/CargarProvincias', { IdDepartamento: $("#cboDepartamento").val(data.IdDepartamento).trigger("change") }, function (data3) {
                    //    $.each(data3, function () {
                    //        $("select#cboProvincia").append($('<option value="' + this.IdProvincia + '">' + this.Nombre + '</option>'));
                    //    });
                    //    setTimeout(function () {
                    //        $("#cboDistrito").val(data.IdDistrito).trigger("change");
                    //    }, 200);
                    //});

                    /*setTimeout(function () { $("#cboDistrito").val(data.IdDistrito).trigger("change"); }, 200);*/
                    
                    
                    
                    crearS = false;
                    $("#btnCrearSede").text("Guardar Cambios").attr("class", "btn btn-warning");
                });
            }
            else {
                $("#txtCodigo").val(data.CodigoSede.trim()).attr("readonly", true);
                $("#txtRuc").val(data.RucSede);
                $("#txtNombre").val(data.Nombre);
                $("#txtDireccion").val(data.Direccion);
                $("#txtCodigoSunat").val(data.CodigoSunat);
                $("#txtNombreSede").val(data.NombreSede);
                $("#txtResponsable").val(data.Responsable);
                $("#txtComision").val(data.Comision);
                $("#cboPais").val(data.IdPais);
                $("#cboDepartamento").val(data.IdDepartamento);
                $("#cboProvincia").val(data.IdProvincia);
                $("#cboDistrito").val(data.IdDistrito);
                $("#txtUbigeo").val(data.Ubigeo);
                crearS = false;
                $("#btnCrearSede").text("Guardar Cambios").attr("class", "btn btn-warning");
            }
        });
        /*LimpiarSede();*/

    });

    $(document).on("click", ".btnAnularSede", function () {
        $("#IdSede-d").val($(this).attr("data-id"));
        $("#eliminarSede").modal("toggle");
    });

    $("#btnConfEliminarSede").click(function () {
        $("#btnConfEliminarSede").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Sede/DeleteSede', $("#formularioSedeD").serialize(), function (result) {
            if (result.success) {
                ListarSedes();
                $("#elimina").removeClass("hide").addClass("show");
                $("#elim").html();
            } else {
                $("#btnConfEliminarSede").removeAttr("disabled").html('Eliminar');
                /*$("#liveToast2").removeClass("hide").addClass("show");*/
                /*window.alert(false, "Error: " + result.message);*/
                /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                /*$("#eliminarSede").modal("hide");*/
            }
        });
        $("#eliminarSede").modal("hide");
        $("#btnConfEliminarSede").removeAttr("disabled").html('Eliminar');
    });

    $("#btnLoadingDoc").on("click", function () {
        $("#txtRuc-error").remove();
        if ($("#txtRuc").val().length == 11) {
            BuscarCliente();
        } else {
            validrucdni = false;
            $("#txtRuc").parent("div.input-group").parent("div").append('<label id="txtRuc-error" class="error text-red" for="txtRuc">Por favor, escribe un RUC válido</label>');
        }
    });

    function BuscarCliente() {
        validDoc = true;
        notSunat = false;

        $(".close-message").trigger("click");
        $("#btnLoadingDoc span").removeClass("fa-search").addClass("fa-spinner").addClass("fa-spin");

        //if (modalSunat) {
        //    $("#modalBusquedaSunat").modal({
        //        backdrop: 'static'
        //    });
        //}

        $.getJSON('/Sede/BuscarClientesGeneral', { Codigo: $("#txtRuc").val()/*, errorSunat: errorSunat*/ }, function (result) {            
            validDoc = result.valid;

            if (result.success == true) {
                if ($("#txtRuc").val().length == 11) {
                    $("#txtNombre").val(result.persona.RazonSocial);
                    $("#txtNombreSede").val(result.persona.RazonSocial);
                }

                $("#txtRuc").attr("data-id", "");
                $("#txtDireccion").val(result.persona.Direccion);
                $("#txtCorreo").val("");


            } else {
                if (result.rucValid) {
                    //console.log("error");
                    $("#txtRazonSocial").removeAttr("readonly");

                    notSunat = true;
                    validDoc = false;
                    validDoc = result.valid;
                }
                else {
                    $("#txtRazonSocial").removeAttr("readonly");

                    validDoc = true;
                    validDoc = result.valid;

                }

                $("#txtNombre").val("");
                $("#txtDireccion").val("");
                
            }

            $("#btnLoadingDoc span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");

            //if (modalSunat) {
            //    $("#modalBusquedaSunat").modal("hide");
            //}

        }).fail(function (result) {
            validRUC = true;
            existsRUC = false;
            $("#btnLoadingDoc span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");

        });
    }    

    $(document).on("click", "#btnVerSede", function () {
        LimpiarCorrelativo();
        $.getJSON('/Sede/VerSede', { IdSede: $(this).attr("data-id") }, function (data) {
            $("#formularioSede").prepend('<input type="hidden" name="IdSede" id="IdSede" value="' + data.IdSede + '" />');

            $("#IdSede-C").val(data.IdSede);
            $("#cboSede").val(data.IdSede);

            crearS = false;
            /*$("#btnCrearCorrelativo").text("Guardar Correlativo").attr("class", "btn btn-warning");*/
        });

        $("#cboSede").attr("disabled", true);
        $("#nuevoCorrelativo").modal('show');
    });

    $.getJSON('/Matricula/CargarSedes', function (data) {
        sedes = data;

        $.each(data, function () {
            $("select#cboSede").append($('<option value="' + this.IdSede + '">' + this.Nombre + '</option>'));
        });

    });

    function LimpiarCorrelativo() {

        /*$("#txtCodigo").val("");*/
        $("#cboTipoDoc").val("");
        $("#txtSerie").val("");
        $("#txtNumero").val("");
        $("#chkImpresion").prop('checked', false);
        //$("#txtResponsable").val("");
        //$("#txtComision").val("00.00");
        //$("#txtUbigeo").val("");
        //$("#cboDepartamento").val("");
        //$("#cboProvincia").val("");

        $("#formularioCorrelativo").removeClass("was-validated");
    }

    $("#cboTipoDoc").on("change", function () {
        if ($("#cboTipoDoc option:selected").val() == 1) {
            serieLetraO = "F";
            TipoDocC = 1;
        } else if ($("#cboTipoDoc option:selected").val() == 3) {
            serieLetraO = "B";
            TipoDocC = 3;
        } else if ($("#cboTipoDoc option:selected").val() == 7) {
            TipoDocC = 7;
        } else if ($("#cboTipoDoc option:selected").val() == 10) {
            serieLetraO = "0";
            TipoDocC = 0;
        } else if ($("#cboTipoDoc option:selected").val() == 8) {
            TipoDocC = 8;
        } else {
            serieLetraO = "";
            TipoDocC = 0;
        }
        $("#txtSerie").val(serieLetraO);
        $("#txtSerie").focus();
    });

    $("#btnCrearCorrelativo").on("click", function () {
        //Buscar CodigoEstablecimiento y TipoDoc en tabla
        var cod = $("#IdSede-C").val();
        var tipoD = $("#cboTipoDoc option:selected").text();
        tipoD = tipoD.trim();
        var noRepetido = true;
        var serie = $("#txtSerie").val().trim();
        var serieLetra = serie.substr(0, 1);

        $("#txtSerie-error").remove();
        $("#cboSede-error").remove();
        $("#txtSerie").parents("div.form-group").removeClass("has-error");
        $("#cboSede").parents("div.form-group").removeClass("has-error");

        if (crearC) {
            if ($("#cboSede").val() != undefined && $("#cboTipoDoc").val() != undefined) {
                
                var error = false;

                $("#tbCorrelativos tbody tr").each(function () {
                    var codT = $(this).find("td:eq(0)").text();
                    codT = codT.trim();
                    var tipoT = $(this).find("td:eq(3)").text();
                    tipoT = tipoT.trim();
                    var serieT = $(this).find("td:eq(1)").text().trim();
                    var serieLetraT = serieT.substr(0, 1);

                    if (codT == cod && tipoT == tipoD) {
                        if (tipoD == 'Nota de crédito') {
                            if (serieLetra == serieLetraT) {
                                $("#cboSede").parent("div").append('<label id="cboSede-error" class="text-red" for="txtSerie">Ya existe un correlativo para el establecimiento y tipo de documento indicado.</label>');
                                $("#cboSede").parents("div.form-group").addClass("has-error");
                                noRepetido = false;
                            }
                        } else {
                            $("#cboSede").parent("div").append('<label id="cboSede-error" class="text-red" for="txtSerie">Ya existe un correlativo para el establecimiento y tipo de documento indicado.</label>');
                            $("#cboSede").parents("div.form-group").addClass("has-error");
                            noRepetido = false;
                        }
                    }
                });

                if (!noRepetido) return false;

            } else {
                return false;
            }
        }

        /*if (!($("#formularioCorrelativo").valid() && noRepetido)) return false;*/
        var ticketera = $("#chkImpresion").is(':checked');
        
        var token = $("#formularioCorrelativo").find("input[name=__RequestVerificationToken]").val();

        if ($("#cboSede").val().length != 0 && $("#cboTipoDoc").val().length != 0 && $("#txtSerie").val().length != 0 && $("#txtNumero").val().length != 0) {
            if (crearC) {

                //var idSede = $("#cboSede option:selected").val();
                //var idTicket = $("#chkImpresion option:selected").val();
                $("#btnCrearCorrelativo").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                $.post('/Sede/CreateCorrelativo', { __RequestVerificationToken: token, IdSede: $("#cboSede").val(), TipoDocumento: $("#cboTipoDoc").val(), Impresion: ticketera, Serie: $("#txtSerie").val(), NroCorrelativo: $("#txtNumero").val() }, function (result) {
                    if (result.success) {
                        ListarCorrelativos();
                        $("#exito3").removeClass("hide").addClass("show");
                        $("#exit3").html();
                    } else {
                        $("#btnCrearCorrelativo").removeAttr("disabled").html('Guardar');
                        /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                        $("#error").removeClass("hide").addClass("show");
                        $("#error2").html();
                    }
                });
            } else {
                $("#btnCrearCorrelativo").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');

                $.post('/Sede/EditCorrelativo', { __RequestVerificationToken: token, IdCorrelativo: $("#IdSede-C").val(), IdSede: $("#cboSede").val(), TipoDocumento: $("#cboTipoDoc").val(), Impresion: ticketera, Serie: $("#txtSerie").val(), NroCorrelativo: $("#txtNumero").val() }, function (result) {
                    if (result.success) {
                        ListarCorrelativos();
                        $("#informa2").removeClass("hide").addClass("show");
                        $("#info2").html();
                    } else {
                        $("#btnCrearCorrelativo").removeAttr("disabled").html('Guardar Cambios');
                        /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                        $("#nuevoCorrelativo").modal("hide");
                    }
                });
            }
        }        
        $("#btnCrearCorrelativo").removeAttr("disabled").html("Guardar");
    });    

    function ListarCorrelativos() {

        $("#correlativoTable").DataTable().destroy();
        $("#correlativoTable tbody").empty();

        $.ajax({
            url: '/Sede/FiltrarCorrelativo',            
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#correlativoTable tbody").append($("<tr id='correlativo-" + this.IdCorrelativo + "' data-id='" + this.IdCorrelativo + "'>")
                        .append($("<td class='text-center clickeable'>").text(this.Sede))
                        .append($("<td class='text-center clickeable'>").text(this.Serie))
                        .append($("<td class='text-center clickeable'>").text(this.NroCorrelativo))
                        .append($("<td class='text-center clickeable'>").text(this.TipoDocumento))
                        .append($("<td class='text-center'>")
                            .append($("<i class='fa fa-" + ((this.Ticketera == 1) ? "check" : "minus") + "-square  text-" + ((this.Ticketera == 1) ? 'green' : 'red') + "'>")))
                        .append($("<td class='text-center clickeable'>")
                            .append($("<a id='btnModificarCorrelativo-" + this.IdCorrelativo + "' data-id='" + this.IdCorrelativo + "' class='btnModificarCorrelativo text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnAnularCorrelativo-" + this.IdCorrelativo + "' data-id='" + this.IdCorrelativo + "' class='btnAnularCorrelativo text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                    );
                });

                if ($("#txtrol").val() == 'Administrador') {
                    $("#correlativoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#correlativoTable_wrapper .col-md-6:eq(0)');

                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#correlativoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#correlativoTable_wrapper .col-md-6:eq(0)');

                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#correlativoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#correlativoTable_wrapper .col-md-6:eq(0)');

                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#correlativoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#correlativoTable_wrapper .col-md-6:eq(0)');

                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#correlativoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#correlativoTable_wrapper .col-md-6:eq(0)');

                }

                
                $("#nuevoCorrelativo").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#modalRedireccionar").modal("hide");
            //    /*$(".content-wrapper").alerts(false, xhr.statusText);*/
            //}
        });

        //$(document).on("click", "#sedeTable tr td.clickeable", function () {

        //    //$("#modalRedireccionar").modal({
        //    //    backdrop: 'static'
        //    //});

        //    $("#sedeTable tr").removeClass("success");

        //    var tr = $(this).parent('tr');
        //    tr.addClass("success");

        //    IdSede = tr.attr("data-id");

        //    ListarCorrelativos(IdSede);

        //});

        //$('#sedeTable tbody').on('click', 'tr td.clickeable', function () {
        //    $("#sedeTable tr").removeClass("success");

        //    var tr = $(this).parent('tr');
        //    tr.addClass("success");

        //    IdSede = tr.attr("data-id");

        //    ListarCorrelativos(IdSede);
        //});
    }

    $(document).on("click", ".btnModificarCorrelativo", function () {
        $("#nuevoCorrelativo").modal("show");
        $("#formularioCorrelativo").removeClass("was-validated");

        $("#txtSerie").val("");
        $("#txtNumero").val("");
        /*$("#chkImpresion").prop('checked', false);*/
;        
        $.getJSON('/Sede/GetCorrelativo', { IdCorrelativo: $(this).attr("data-id") }, function (data) {
            $("#formularioCorrelativo").prepend('<input type="hidden" id="IdSede-C" name="IdSede" value="' + data.IdCorrelativo + '" />');

            $("#txtSerie").val(data.Serie);
            $("#txtNumero").val(data.NroCorrelativo);
            $("#cboTipoDoc").val(data.TipoDocumento);
            $("#cboSede").val(data.Sede);
            /*$("#cboTipoDoc option[value=" + data.TipoDocumento + "]").attr("selected", true);*/
            /*$("#cboSede option[value=" + data.Sede + "]").attr("selected", true);*/

            if (data.Ticketera == 0) {
                $("#chkImpresion").prop('checked', false);
            } else {
                $("#chkImpresion").prop('checked', true);
            }

            crearC = false;
            $("#btnCrearCorrelativo").text("Guardar Cambios").attr("class", "btn btn-warning");
        });
    });

    $(document).on("click", ".btnAnularCorrelativo", function () {
        /*$("#eliminarCorrelativo").modal("show");*/
        $("#idcorrelativo-d").val($(this).attr("data-id"));
        $("#eliminarCorrelativo").modal("toggle");
    });

    $("#btnConfEliminarCorre").click(function () {
        $("#btnConfEliminarCorre").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Sede/DeleteCorrelativo', $("#formularioCorrelativoD").serialize(), function (result) {
            if (result.success) {
                ListarCorrelativos();
                $("#elimina2").removeClass("hide").addClass("show");
                $("#elim2").html();
            } else {
                $("#btnConfEliminarCorre").removeAttr("disabled").html('Eliminar');
            }
        });
        $("#eliminarCorrelativo").modal("hide");
        $("#btnConfEliminarCorre").removeAttr("disabled").html('Eliminar');
    });

    
    
}

