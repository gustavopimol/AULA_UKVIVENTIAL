function ElectronicoVD() {
    var objOwner = this;

    if ($("#txtrol").val() == 'Administrador') {
        $("#electronicosTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#electronicosTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Supervisor') {
        $("#electronicosTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#electronicosTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner') {
        $("#electronicosTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#electronicosTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner sin Ventas') {
        $("#electronicosTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#electronicosTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Profesor') {
        $("#electronicosTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#electronicosTable_wrapper .col-md-6:eq(0)');
    }
    

    /*FiltrarEmitidos();*/
/*    $("#btnFiltrar").trigger("click");*/

    $("#btnFiltrar").on("click", function () {
        if ($("#txtFechI").val().length != 0 || $("#txtFechF").val().length != 0 || $("#cboSede").val().length != 0 || $("#cboTipoDocumento").val().length != 0
            || $("#cboUsuarios").val().length != 0) {
            var finicio, ffinal, idsede;
            var tipodoc;
            var user;
            DocElectronicos = {};
            finicio = $("#txtFechI").val();
            ffinal = $("#txtFechF").val();
            idsede = ($("#cboSede").val() == "") ? 0 : $("#cboSede").val();
            tipodoc = ($("#cboTipoDocumento").val() == "") ? 0 : $("#cboTipoDocumento").val();
            user = ($("#cboUsuarios").val() == "") ? 0 : $("#cboUsuarios").val();

            $("#electronicosTable").DataTable().destroy();
            $("#electronicosTable tbody").empty();
            $.ajax({
                url: '/DocumentosElectronicos/FiltrarElectronicos',
                data: {
                    inicio: finicio,
                    fin: ffinal,
                    tipodoc: tipodoc,
                    idsede: idsede,
                    user: user,
                },
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    DocElectronicos = data.list;
                    $.each(data, function () {
                        $("#electronicosTable tbody").append($("<tr class='row-doc-elect " + (this.Estado == "1" ? " " : "table-danger") + "' id='delectronico-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' data-estado='" + this.Estado + "'>")
                            .append($("<td class='text-center'>")
                                .append($("<a id='btnenvioEmail-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' class='btnenvioEmail text-lg text-warning' >")
                                    .append($("<i class='far fa-envelope'>"))))
                            .append($("<td class='text-center'>")
                                .append($("<a id='btnverXML-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' class='btnverXML text-lg text-info'>")
                                    .append($("<i class='far fa-file'>"))))
                            .append($("<td class='text-center'>")
                                .append($("<a id='btnverPDF-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' data-tipodoc='" + this.TipoDoc + "' data-ticketera='" + this.Ticketera + "' class='btnverPDF text-lg text-danger'>")
                                    .append($("<i class='far fa-file-pdf'>"))))
                            .append($("<td class='text-center'>")
                                .append($("<a id='btnverCDR-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' class='btnverCDR text-lg text-succes'>").prop('disabled', true)
                                    .append($("<i class='far fa-file-alt'>"))))
                            .append($("<td class='text-center'>").text(this.TipoDoc))
                            .append($("<td class='text-center'>").text(this.NroDoc))
                            .append($("<td class='text-center'>").text(this.Fecha))
                            .append($("<td class='text-center'>").text(this.Razon))
                            .append($("<td class='text-center'>").text(this.Total))
                            .append($("<td class='text-center'>").text(this.FechaEnvio))
                            .append($("<td class='text-center'>").text(this.Respuesta))
                            .append($("<td class='text-center'>")
                                .append($("<a id='btnverCDR-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' class='btnverCDR text-lg text-succes' style='color: green;'>").prop('disabled', true)
                                    .append($("<i class='far fa-" + (data ? 'check' : 'minus') + "-square text-" + (data ? 'success' : 'danger') + "'>"))))
                            /*.append($("<i class='fa fa-" + (data ? 'check' : 'minus') + "-square-o text-" + (data ? 'green' : 'red') + "'>"))))*/
                            .append($("<td class='text-center'>")
                                .append($("<a id='btnverCDR-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' class='btnverCDR text-lg text-succes' style='color: green;'>").prop('disabled', true)
                                    .append($("<i class='far fa-" + (data ? 'check' : 'minus') + "-square text-" + (data ? 'success' : 'danger') + "'>"))))

                            .append($("<td class='text-center'>")
                                .append($("<a id='btnverCDR-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' class='btnverCDR text-lg text-danger'>").prop('disabled', true)
                                    .append($("<i class='far fa-" + ((this.EnvioEmail == 1) ? 'check' : 'minus') + "-square text-" + ((this.EnvioEmail == 1) ? 'success' : 'danger') + "'>"))))

                            //.append($("<td class='text-center'>")
                            //    .append($("<i class='fa fa-" + ((this.Ticketera == 1) ? "check" : "minus") + "-square  text-" + ((this.Ticketera == 1) ? 'green' : 'red') + "'>")))

                            //.append($("<td class='text-center check-email'>")
                            //    .append($("<a id='btnverCDR-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' class='btnverCDR text-lg text-danger'>").prop('disabled', true)
                            //        .append($("<i class='far fa-" + ((this.EnvioWeb == 1) ? 'check' : 'minus') + "-square text-" + ((this.EnvioWeb == 1) ? 'success' : 'danger') + "'>"))))

                            //.append($("<td class='text-center'>").text(this.FileXML))
                            //.append($("<td class='text-center'>").text(this.FilePDF))
                            //.append($("<td class='text-center'>").text(this.FileCDR))
                            .append($("<td class='text-center'>")
                                .append($("<a id='btnverCDR-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' class='btnverCDR text-lg text-danger' id='checkSunat-" + this.IdDocumentoE + "'>").prop('disabled', true)
                                    .append($("<i class='far fa-" + ((this.EnvioSunat == 1) ? 'check' : 'minus') + "-square text-" + ((this.EnvioSunat == 1) ? 'success' : 'danger') + "'>"))))

                            .append($("<td class='text-center'>")
                                .append($("<a id='btnverPDF-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' class='btnverPDF text-lg text-danger'>").prop('disabled', true)
                                    .append($("<i class='far fa-file-pdf'>"))))

                            //.append($("<td class='text-center'>")
                            //    .append($("<a id='btnverXML2-" + this.IdDocumentoE + "' data-id='" + this.IdDocumentoE + "' class='btnverXML2 text-lg text-info'>").prop('disabled', true)
                            //        .append($("<i class='far fa-file'>"))))

                            .append($("<td class='text-center'>").text(this.Fecha))
                            .append($("<td class='text-center'>").text(this.Usuario))

                            /*.append($('<img src="~/Content/distribution/img/mail.png" class="enviarEmail" alt="Enviar al Correo" title="Enviar al Correo" data-id="' + this.IdEmisionElectronica + '" />'))*/
                        );
                    });
                    if ($("#txtrol").val() == 'Administrador') {
                        $("#electronicosTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["excel", "pdf", "print", "colvis"]
                        }).buttons().container().appendTo('#electronicosTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Supervisor') {
                        $("#electronicosTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["excel", "pdf", "print", "colvis"]
                        }).buttons().container().appendTo('#electronicosTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Partner') {
                        $("#electronicosTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]
                        }).buttons().container().appendTo('#electronicosTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Partner sin Ventas') {
                        $("#electronicosTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]
                        }).buttons().container().appendTo('#electronicosTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Profesor') {
                        $("#electronicosTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]
                        }).buttons().container().appendTo('#electronicosTable_wrapper .col-md-6:eq(0)');
                    }
                },
            });
        }
    });

    $(document).on("click", ".btnenvioEmail", function () {
        var idDocumento = $(this).attr("data-id");
        $("#txtIdDocReenvio").val(idDocumento);
        var token = $("#formReenvioEmail").find("input[name=__RequestVerificationToken]").val()
        $.post('/DocumentosElectronicos/GetEmailCliente', { __RequestVerificationToken: token, idDocumentoE: idDocumento }, function (email) {
            if (email == '-') email = '';
            $("#txtCorreo").val(email);
            $("#modalReenviarEmail").modal("show");
        });
    });
    $("#btnConfReenvioEmail").click(function () {

        var idDocumento = $("#txtIdDocReenvio").val();
        var tr = $(this).parents("tr");
        //var token = $("#formReenvioEmail").find("input[name=__RequestVerificationToken]").val()

        $("#btnConfReenvioEmail").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Reenviando...');

        $.post('/DocumentosElectronicos/EnviarEmail', $("#formReenvioEmail").serialize(), function (result) {
            if (result.success) {
                tr.find("td.check-email i").removeClass("fa-minus-square").removeClass("text-danger").addClass("fa-check-square").addClass("text-success");
            }

            $("#btnConfReenvioEmail").removeAttr("disabled").html('Reenviar');

            $("#modalReenviarEmail").modal("hide");
        });
    });

    $.getJSON('/DocumentosElectronicos/CargarUsuarios', function (data) {
        usuarios = data;

        $.each(data, function () {
            $("select#cboUsuarios").append($('<option  value="' + this.IdUsuario + '">' + this.Nombre + '</option>'));

        });
    });

    $(document).on("click", ".btnverXML", function () {
        var idDocumentoD = $(this).attr("data-id");

        $("#idDocumentoXML").val(idDocumentoD);

        $("#formXML").attr("action", "/DocumentosElectronicos/VerXML").submit();
    });

    $(document).on("click", ".btnverPDF", function () {
        var idDocumentoD = $(this).attr("data-id");
        var tipodocD = $(this).attr("data-tipodoc");

        $("#TicketeraPDF").val(tipodocD == "Nota de Venta" ? $(this).attr("data-ticketera") : "0");
        $("#idDocumentoPDF").val(idDocumentoD);
        $("#formPDF").submit();
    });
}