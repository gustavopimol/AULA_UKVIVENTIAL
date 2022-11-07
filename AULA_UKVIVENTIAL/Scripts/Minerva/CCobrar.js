function CCobrarVD() {
    var objOwner = this;
    var totalDiaA = 0.00//ccobrar
    var totalDiaS = 0.00;//ccobrar
    var totalDiaD = 0.00;//ccobrar
    var totalDiaF = 0.00;//obligaciones
    var totalDiaG = 0.00;//obligaciones
    var totalDiaH = 0.00;//obligaciones

    if ($("#txtrol").val() == 'Administrador') {
        $("#ccobrarTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": [
                "excel",
                "pdf",
                "print",
                "colvis"
            ],
        }).buttons().container().appendTo('#ccobrarTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Supervisor') {
        $("#ccobrarTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#ccobrarTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner') {
        $("#ccobrarTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#ccobrarTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner sin Ventas') {
        $("#ccobrarTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#ccobrarTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Profesor') {
        $("#ccobrarTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#ccobrarTable_wrapper .col-md-6:eq(0)');
    }

    function limpiarsumas() {

        $('#sumpagar').val('0.00');
        $('#sumpagado').val('0.00');
        $('#sumsaldo').val('0.00');

        $('#obligacion-monto').val('0.00');
        $('#obligacion-pagado').val('0.00');
        $('#obligacion-saldo').val('0.00');

        totalDiaA = 0.00//ccobrar
        totalDiaS = 0.00;//ccobrar
        totalDiaD = 0.00;//ccobrar
        totalDiaF = 0.00;//obligaciones
        totalDiaG = 0.00;//obligaciones
        totalDiaH = 0.00;//obligaciones
    }

    $("#btnFiltrar").on("click", function () {
        limpiarsumas();
        var idperiodo, idnivel, idsede;

        idsede = ($("select#cboSede").val() == "") ? 0 : $("select#cboSede").val();
        idnivel = ($("select#cboNivel").val() == "") ? 0 : $("select#cboNivel").val();
        idperiodo = ($("select#cboPeriodo").val() == "") ? 0 : $("select#cboPeriodo").val();

        $("#ccobrarTable").DataTable().destroy();
        $("#ccobrarTable tbody").empty();

        $.ajax({
            url: '/CuentasCobrar/FiltrarCuentas',
            data: {

                idperiodo: idperiodo,
                idnivel: idnivel,
                idsede: idsede,
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                limpiarsumas();

                $.each(data, function () {

                    $("#ccobrarTable tbody").append($("<tr id='ccobrar-" + this.Dni + "' data-id='" + this.IdAlumno + "' data-idDni='" + this.Dni + "'>")
                        .append($('<td class="text-center">')
                            .append($("<a id='btnVerDoc' data-id='" + this.IdAlumno + "' data-bs-toggle='modal' data-bs-target='#VerDoc' data-IdMatricula='" + this.IdMatricula + "' class='me-3 text-lg text-success'>")
                                .append($("<i class='far fa-eye'>"))))
                        .append($("<td class='text-center'>").text(this.Dni))
                        .append($("<td class='text-center'>").text(this.Alumno))
                        .append($("<td class='text-center'>").text(this.Periodo))
                        .append($("<td class='text-center'>").text(this.Pagar))
                        .append($("<td class='text-center'>").text(this.Pagado))
                        .append($("<td class='text-center'>").text(this.DeudaD))
                        .append($("<td class='text-center'>").text(this.Sede))
                        .append($("<td hidden class='text-center'>").text(this.IdAlumno))
                        .append($("<td hidden class='text-center'>").text(this.IdMatricula))

                    );

                    var pagar = this.Pagar;
                    totalDiaS = parseFloat(+totalDiaS + +pagar).toFixed(2);
                    var pagado = this.Pagado;
                    totalDiaD = parseFloat(+totalDiaD + +pagado).toFixed(2);
                    var saldo = this.DeudaD;
                    totalDiaA = parseFloat(+totalDiaA + +saldo).toFixed(2);
                    console.log(totalDiaS);

                    $("#VerDoc").modal("hide");
                    $("#sumpagar").val("S/. " + totalDiaS);
                    $('#sumpagado').val("S/. " + totalDiaD);
                    $('#sumsaldo').val("S/. " + totalDiaA);


                });


                if (($("#txtrol").val() == 'Supervisor') || ($("#txtrol").val() == 'Administrador')) {
                    $("#ccobrarTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": [
                            "excel",
                            {
                                extend: 'pdf',
                                text: 'PDF',
                                messageBottom:
                                    '\n Total Monto A Pagar (S/):  ' + totalDiaS + '               Total Monto Pagado (S/):  ' + totalDiaD + '               Total Monto Saldo (S/):  ' + totalDiaA
                            },
                            "print",
                            "colvis"]
                    }).buttons().container().appendTo('#ccobrarTable_wrapper .col-md-6:eq(0)');
                }


                if ($("#txtrol").val() == 'Partner') {
                    $("#ccobrarTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#ccobrarTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#ccobrarTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#ccobrarTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#ccobrarTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#ccobrarTable_wrapper .col-md-6:eq(0)');
                }


            },
        });
    });

    $.getJSON('/Matricula/CargarSedes', function (data) {
        sedes = data;

        $.each(data, function () {
            $("select#cboSede").append($('<option  value="' + this.IdSede + '">' + this.Nombre + '</option>'));

        });
    });

    $.getJSON('/Curso/CargarPeriodos', function (data) {
        periodos = data;

        $.each(data, function () {
            $("select#cboPeriodo").append($('<option value="' + this.IdPeriodo + '">' + this.Descripcion + '</option>'));
        });

    });

    $.getJSON('/Curso/CargarNiveles', function (data) {
        niveles = data;

        $.each(data, function () {
            $("select#cboNivel").append($('<option value="' + this.IdNivel + '">' + this.Descripcion + '</option>'));
        });

    });

    $(document).on("click", "#btnVerDoc", function () {
        var IdAlumno = $(this).attr("data-id");
        var IdMatricula = $(this).attr("data-IdMatricula");

        $.getJSON('/CuentasCobrar/GetObligaciones', { IdMatricula: IdMatricula, IdAlumno: IdAlumno }, function (data) {

            $("#tbOBLIGACIONES").DataTable().destroy();
            $("#tbOBLIGACIONES tbody").empty();

            limpiarsumas();

            $.each(data, function () {
                $("#tbOBLIGACIONES tbody").append($("<tr>")
                    .append($('<td class="text-center">')
                        .append($("<a id='verdetalle'class='me-3 text-lg text-success' data-bs-target='#VerDetallec' data-bs-toggle='modal' data-id='" + this.IdConcepto + "'><i class='fa fa-eye'></i></a>")))
                    .append($("<td class='text-center '>").text(this.IdConcepto))//Codigo-idconcepto
                    .append($("<td class='text-center'>").html(this.Periodo))//Nombre-descripcion
                    .append($("<td class='text-center ' >").text(this.Concepto))//Cantidad-unidades
                    .append($("<td class='text-center ' >").text(this.Monto))
                    .append($("<td class='text-center ' >").text(this.Pagado))//Total item-monto pagado
                    .append($("<td class='text-center'>").html(this.Saldo))//Nombre-descripcion
                    .append($("<td class='text-center ' >").text(this.TipoConcepto))//Cantidad-unidades 
                );

                var omonto = this.Monto;
                totalDiaF = parseFloat(+totalDiaF + +omonto).toFixed(2);

                var opagado = this.Pagado;
                totalDiaG = parseFloat(+totalDiaG + +opagado).toFixed(2);

                var osaldo = this.Saldo;
                totalDiaH = parseFloat(+totalDiaH + +osaldo).toFixed(2);

                $('#obligacion-monto').val(totalDiaF);
                $('#obligacion-pagado').val(totalDiaG);
                $('#obligacion-saldo').val(totalDiaH);


            });

        });

    });

    $(document).on("click", "#verdetalle", function () {

        //var idDocumento = $(this.Dni);
        var idDocumento = $(this).attr("data-id");
        console.log(idDocumento);
        $.getJSON('/CuentasCobrar/GetDetalle', { idDocumento: idDocumento }, function (data) {
            $("#tbDetalle tbody").empty();
            $.each(data, function () {
                $("#tbDetalle").append($("<tr>")
                    .append($("<td class='text-center '>").text(this.FechaString))//Codigo-idconcepto
                    .append($("<td class='text-center'>").html(this.Tipo))//Nombre-descripcion
                    .append($("<td class='text-center ' >").text(this.NDocumento))//Cantidad-unidades
                    .append($("<td class='text-center ' >").text(this.cambioS))//Total item-monto pagado
                    .append($("<td class='text-center ' >").text(this.Concepto))//Total item-monto pagado
                );


            });

        });
    });

    $("#btnpdfccobrar").on("click", function () {
        alert('Button activated');
    });
}