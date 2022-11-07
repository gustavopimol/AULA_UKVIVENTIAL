function EmitidoVD() {
    var objOwner = this;

    var DocEmitidos = {};
    var totalDiaS = 0.00;
    var totalDiaD = 0.00;
    var deudaDiaS = 0.00;
    var deudaDiaD = 0.00;
    var totalDiaA = 0.00;
    var simbPEN = $("#txtmonedita").val();


    /*FiltrarEmitidos();*/
    $("#btnFiltrar").trigger("click");

    if ($("#txtrol").val() == 'Administrador') {
        $("#emitidosTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#emitidosTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Supervisor') {
        $("#emitidosTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#emitidosTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner') {
        $("#emitidosTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#emitidosTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner sin Ventas') {
        $("#emitidosTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#emitidosTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Profesor') {
        $("#emitidosTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#emitidosTable_wrapper .col-md-6:eq(0)');
    }
    


    $("#cboFiltrarPor").change(function () {
        if ($(this).val() == "0") {//Fecha
            $("#Alum").css("display", "none");
            $("#sede").css("display", "none");
            $("#documento").css("display", "none");
            $("#usuario").css("display", "none");
            $("#fechini").css("display", "block");
            $("#fechfin").css("display", "block");
        }
        else {
            if ($(this).val() == "1") {//Alumnio
                $("#documento").css("display", "none");
                $("#usuario").css("display", "none");
                $("#sede").css("display", "none");
                $("#fechini").css("display", "none");
                $("#fechfin").css("display", "none");
                $("#Alum").css("display", "block");
                //$("#ffin").attr("disabled", true);
            }
            else {
                if ($(this).val() == "2") {//sede
                    $("#fechini").css("display", "none");
                    $("#fechfin").css("display", "none");
                    $("#documento").css("display", "none");
                    $("#usuario").css("display", "none");
                    $("#Alum").css("display", "none");
                    $("#sede").css("display", "block");
                }
                else {
                    if ($(this).val() == "3") {//tipodocumento
                        $("#fechini").css("display", "none");
                        $("#fechfin").css("display", "none");
                        $("#documento").css("display", "none");
                        $("#usuario").css("display", "none");
                        $("#sede").css("display", "none");
                        $("#Alum").css("display", "none");
                        $("#documento").css("display", "block");
                    }
                    else {
                        if ($(this).val() == "4") {//usuario
                            $("#fechini").css("display", "none");
                            $("#fechfin").css("display", "none");
                            $("#documento").css("display", "none");
                            $("#sede").css("display", "none");
                            $("#usuario").css("display", "none");
                            $("#Alum").css("display", "none");
                            $("#usuario").css("display", "block");
                        }
                        else {//todos
                            $("#usuario").css("display", "none");
                            $("#fechini").css("display", "none");
                            $("#fechfin").css("display", "none");
                            $("#documento").css("display", "none");
                            $("#sede").css("display", "none");
                            $("#Alum").css("display", "none");
                        }
                    }
                }

            }
        }


    });
    //fechinin---fechifin---documento---sede---alumno---usuario
      $("#btnFiltrar").on("click", function () {
            limpiarsumas();
            var finicio, ffinal, idsede,alumno;
            var tipodoc;
            var user;
            DocEmitidos = {};

            tipofil = ($("#cboFiltrarPor").val() == "0") ? 0 : $("#cboFiltrarPor").val();
            finicio = $("#txtFechI").val();
            ffinal = $("#txtFechF").val();
            alumno = $("#txtNombresAlumno").val();
            idsede = ($("select#cboSede").val() == "") ? 0 : $("select#cboSede").val();
            tipodoc = ($("select#cboTipoDocumento").val() == "") ? 0 : $("select#cboTipoDocumento").val();
            user = ($("select#cboUsuarios").val() == "") ? 0 : $("select#cboUsuarios").val();

            $("#emitidosTable").DataTable().destroy();
            $("#emitidosTable tbody").empty();

            $.ajax({
                url: '/DocumentoEmitido/FiltrarEmitidos',
                data: {
                    inicio: finicio,
                    fin: ffinal,
                    /*tipofil: tipofil,*/
                    tipodoc: tipodoc,
                    idsede: idsede,
                    user: user,
                    alumno: alumno,
                },
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    DocEmitidos = data.list;
                    $.each(data, function () {
                        $("#emitidosTable tbody").append($("<tr id='demitido-" + this.NDocumento + "' data-id='" + this.NDocumento + "' data-estado='" + this.Estado + "'>")
                            
                            .append($("<td class='text-center'>").text(this.Tipo))
                            .append($("<td class='text-center'>").text(this.NDocumento))
                            .append($("<td class='text-center'>").text(this.FechaString))
                            .append($("<td class='text-center'>").text(this.Alumno))
                            .append($("<td class='text-center'>").text(this.Sede))
                            .append($("<td class='text-center'>").text(this.Turno)) //Forma de pago
                            .append($("<td class='text-center'>").text(this.SubTotalS))
                            .append($("<td class='text-center'>").text(this.IgvS))//pago
                            .append($("<td class='text-center'>").text(this.Total))//deuda
                            .append($("<td class='text-center'>").html("<span class='text usuario'>" + this.Anulador + " </span >"))
                            .append($("<td class='text-center col-3' >").text(this.fAnuladorS))
                            .append($("<td class='text-center'>")
                                .append($("<span class='estadoName badge badge-info-light'>").attr('style', 'font-size: 12px; color:white ;background-color:' + this.Color + ' !important').html(this.EstadoName)))
                            .append($('<td class="text-center">')
                                .append($("<a class='me-3 text-lg text-warning' id='btnVerDoc' data-bs-toggle='modal' data-bs-target='#VerDoc' data-id='" + this.IdDocumentoVenta + "'><i class='fa fa-eye'></i></a>")))
                            //.append($('<td class="text-center">')
                            //    .append($("<a class='text-lg text-danger' id='btnAnularDoc' data-bs-toggle='modal' data-id='" + this.IdDocumentoVenta + "' data-estado='" + this.Estado + "' ><i class='far fa-trash-alt'></i></a>")))
                            .append($('<td class="text-center">').append($("<a class='text-lg text-danger' id='btnAnularDoc' data-bs-toggle='modal' data-bs-target='#anularDocumento' data-id='" + this.IdDocumentoVenta + "'data-estado='" + this.Estado + "' ><i class='far fa-trash-alt'></i></a>")))
                            //.append($("<td class='text-center'>").html("<span id='estado'  class='estado badge badge-info-light'> <span class='indicator'></span> ACTIVO</span> <span id='estado' hidden class='estado badge badge-danger-light'> <span class='indicator'></span> ANULADO</span>")) /

                        );

                        //totalDiaS = 0.00;
                        //totalDiaD = 0.00;
                        //deudaDiaS = 0.00;
                        //deudaDiaD = 0.00;
                        //ActualizarTabla();

                        var pagar = this.SubTotalS;
                        var pagado = this.IgvS;
                        var saldo = this.Total;

                        if (this.EstadoName == "Activo") {
                            totalDiaS = parseFloat(+totalDiaS + +pagar).toFixed(2);
                            totalDiaD = parseFloat(+totalDiaD + +pagado).toFixed(2);
                            totalDiaA = parseFloat(+totalDiaA + +saldo).toFixed(2);
                        }
                        else {
                            totalDiaS = totalDiaS;
                            totalDiaD = totalDiaD;
                            totalDiaA = totalDiaA;
                        }

                        $("#VerDoc").modal("hide");
                        $("#sumpagar").val("S/. " + totalDiaS);
                        $('#sumpagado').val("S/. " + totalDiaD);
                        $('#sumsaldo').val("S/. " + totalDiaA);

                    });

                    if ($("#txtrol").val() == 'Administrador') {
                        $("#emitidosTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["excel", "pdf", "print", "colvis"]
                        }).buttons().container().appendTo('#emitidosTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Supervisor') {
                        $("#emitidosTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["excel", "pdf", "print", "colvis"]
                        }).buttons().container().appendTo('#emitidosTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Partner') {
                        $("#emitidosTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]
                        }).buttons().container().appendTo('#emitidosTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Partner sin Ventas') {
                        $("#emitidosTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]
                        }).buttons().container().appendTo('#emitidosTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Profesor') {
                        $("#emitidosTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]
                        }).buttons().container().appendTo('#emitidosTable_wrapper .col-md-6:eq(0)');
                    }

                    //$("#EliminarDoc").modal("hide");

                },
            });
          

      });

    function limpiarsumas() {

        $('#sumpagar').val('0.00');
        $('#sumpagado').val('0.00');
        $('#sumsaldo').val('0.00');

        totalDiaA = 0.00//ccobrar
        totalDiaS = 0.00;//ccobrar
        totalDiaD = 0.00;//ccobrar
    }

    //function ActualizarTabla() {
    //    $.each(DocEmitidos, function () {
    //        if (this.Estado == "1") {
    //            var totalNew = (this.Tipo == 'Nota de crédito' && parseFloat(this.Total) != 0 ? '-' : '') + this.Total;
    //            var deudaNew = (this.Tipo == 'Nota de crédito' && parseFloat(this.Deuda) != 0 ? '-' : '') + this.Deuda;

    //            var totalDoc = parseFloat(totalNew).toFixed(2);
    //            var deudaDoc = parseFloat(deudaNew).toFixed(2);
    //            var tipoDoc = this.Tipo.trim();
    //            var moneDoc = this.Moneda.trim();

    //            if (moneDoc == "PEN") {
    //                if (tipoDoc == "Boleta" || tipoDoc == "Factura" || tipoDoc == "Nota de Venta" || tipoDoc == "Nota de crédito" || tipoDoc == "Nota de débito") {
    //                    totalDiaS = parseFloat(+totalDiaS + +totalDoc).toFixed(2);
    //                }
    //                else {
    //                    totalDiaS = parseFloat(+totalDiaS - +totalDoc).toFixed(2);
    //                }
    //                deudaDiaS = parseFloat(+deudaDiaS + +deudaDoc).toFixed(2);
    //            } else {
    //                if (tipoDoc == "Boleta" || tipoDoc == "Factura" || tipoDoc == "Nota de Venta" || tipoDoc == "Nota de crédito" || tipoDoc == "Nota de débito") {
    //                    totalDiaD = parseFloat(+totalDiaD + +totalDoc).toFixed(2);
    //                } else {
    //                    totalDiaD = parseFloat(+totalDiaD - +totalDoc).toFixed(2);
    //                }
    //                deudaDiaD = parseFloat(+deudaDiaD + +deudaDoc).toFixed(2);
    //            }
    //        }
    //    });

    //    $("#txtTotalS").text(simbPEN + " " + totalDiaS);
    //    $("#txtTotalD").text(simbUSD + " " + totalDiaD);
    //    $("#txtDeudaS").text(simbPEN + " " + deudaDiaS);
    //    $("#txtDeudaD").text(simbUSD + " " + deudaDiaD);
    //}
    

    $.getJSON('/Matricula/CargarSedes', function (data) {
        sedes = data;

        $.each(data, function () {
            $("select#cboSede").append($('<option value="' + this.IdSede + '">' + this.Nombre + '</option>'));

        });
    });
   
    $.getJSON('/DocumentosElectronicos/CargarUsuarios', function (data) {
        usuarios = data;
        $.each(data, function () {
            $("select#cboUsuarios").append($('<option  value="' + this.IdUsuario + '">' + this.Nombre + '</option>'));

        });
    });
   
    $(document).on("click", "#btnAnularDoc", function () {
        $("#iddocumento-d").val($(this).attr("data-id"));
        var estado = $(this).attr("data-estado");
        $("#btnAnular").attr("data-id", $(this).attr("data-id")).attr("data-estado", estado);

        if (estado == "1")
            $("#anularDocumento").modal("show");
        else
            $("#btnAnularDoc").attr("disabled", "true");
    });

    $("#btnAnular").on("click", function () {

        $("#iddocumento-d").val($(this).attr("data-id"));
        $("#estadoDocVent-d").val($(this).attr("data-estado"));

        $.post('/DocumentoEmitido/AnularDoc',$("#formAnularDoc").serialize(), function (result) {
            if (result.success) {
                /*var idDocumento = $("#iddocumento-d").val();*/
                /*$("#anularDocumento").hide();*/
                $("#btnFiltrar").trigger("click");
            } else {
                alert("ERROR");
                /*$("#btnAnular").removeAttr("disabled").html('Eliminar');*/

            }
        });
        $("#anularDocumento").modal("hide");

    });

    $(document).on("click", "#btnVerDoc", function () {

        var idDocumento = $(this).attr("data-id");
        

        $.getJSON('/DocumentoEmitido/GetDocDetalle', { IdDoc: idDocumento }, function (data) {
            $("#txtTipoDoc").text(data.Tipo);
            $("#txtNroDocumento").text(data.NDocumento);
            $("#txtRuc").text(data.Dni);
            $("#txtRazonSocial").text(data.NombreCompleto);
            $("#txtDireccion").text(data.Direccion);
            $("#txtCorreo").text(data.Sede);
            $("#txtFechaE").text(data.FechaString);
            $("#txtMoneda").text(data.Moneda);
            $("#txtEstablecimiento").text(data.Establecimiento); 
            $("#txtExon").text(data.exoneradoS);
            $("#txtSubTotal").text(data.SubTotalS);
            $("#txtIgv").text(data.IgvS);
            $("#txtTotal").text(data.Total);
            $("#btnReimprimir").attr('data-doc', data.IdDocumentoVenta).attr('data-ticket', data.Ticketera);
        });
                

        $.getJSON('/DocumentoEmitido/GetDetalle', { idDocumento: idDocumento }, function (data) {

            $("#tbDetalle tbody").empty();

            $.each(data, function () {

                $("#tbDetalle").append($("<tr>")
                    .append($("<td class='text-center producto'>").text(this.almacen))//Codigo-idconcepto
                    .append($("<td class='nombre'>").html(this.Periodo))//Nombre-descripcion
                    .append($("<td class='text-center cantidad' >").text(this.IdCiclo))//Cantidad-unidades
                    //.append($("<td class='text-right pventa' >").text(this.cambioS))//P. venta-monto
                    .append($("<td class='text-right totalItem' >").text(this.Pago))//Total item-monto pagado
                );
            });
        });
    });

    $(document).on("click", "#btnReimprimir", function () {
        $("#TicketeraPDF").val($(this).attr("data-ticket"));
        $("#idDocumentoPDF").val($(this).attr("data-doc")).parent("form").submit();
    });

}