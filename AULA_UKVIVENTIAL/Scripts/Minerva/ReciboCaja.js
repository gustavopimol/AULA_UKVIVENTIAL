function ReciboCajaVD() {

    if ($("#txtrol").val() == 'Administrador') {
        $("#cajaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "colReorder": true,
            "scrollCollapse": true,
            "scrollX": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#cajaTable_wrapper .col-md-6:eq(0)');
    }

    $("#txtUsuario").keypress(function (e) {
        if (e.which == 13) {
            $("#btnFiltrar").trigger("click");
        }
    });

    //$("#cboSedes").keypress(function (e) {
    //    if (e.which == 13) {
    //        $("#btnFiltrar").trigger("click");
    //    }
    //});

    $("#btnFiltrar").on("click", function () {

        var finicio, ffinal, idusuario;

        finicio = $("#fini").val();
        ffinal = $("#ffin").val();        
        usuario = $("#txtUsuario").val();
        idsede = ($("#cboSedes").val() == "") ? 0 : $("#cboSedes").val();

        $("#cajaTable").DataTable().destroy();
        $("#cajaTable tbody").empty();

        $.ajax({
            url: '/ReciboCaja/Filtrar',
            data: {
                inicio: finicio,
                fin: ffinal,                
                idsede: idsede,
                usuario: usuario,
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#cajaTable tbody").append($("<tr class='row-doc-elect " + (this.Estado == "1" ? " " : "table-danger") + "' id='caja-" + this.IdReciboCaja + "' data-id='" + this.IdReciboCaja + "'>")
                        .append($("<td class='text-center'>").text(this.Movimiento))
                        .append($("<td class='text-center'>").text(this.Fecha))
                        .append($("<td class='text-center'>").text(this.NroDocumento))
                        .append($("<td class='text-center'>").text(this.Nombre))
                        .append($("<td class='text-center'>").text(this.Concepto))
                        .append($("<td class='text-center'>").text(this.Moneda))
                        .append($("<td class='text-center'>").text(this.EfectivoS))
                        .append($("<td class='text-center'>").text(this.DepositoS))
                        .append($("<td class='text-center'>").text(this.TarjetaS))
                        .append($("<td class='text-center'>").text(this.CreditoS))
                        .append($("<td class='text-center'>").text(this.Usuario))                        
                    );
                });

                if ($("#txtrol").val() == 'Administrador') {
                    $("#cajaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#cajaTable_wrapper .col-md-6:eq(0)');
                }

                $.ajax({
                    url: '/ReciboCaja/FiltrarResumen',
                    data: {
                        inicio: finicio,
                        fin: ffinal,
                        idsede: idsede,
                        usuario: usuario,
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function (result) {

                        $("#label0").text($("#txtSimboloPEN").val() + " " + result.List[0]);
                        $("#label1").text($("#txtSimboloUSD").val() + " " + result.List[1]);
                        $("#label2").text($("#txtSimboloPEN").val() + " " + result.List[2]);
                        $("#label3").text($("#txtSimboloUSD").val() + " " + result.List[3]);
                        $("#label4").text($("#txtSimboloPEN").val() + " " + result.List[4]);
                        $("#label5").text($("#txtSimboloUSD").val() + " " + result.List[5]);
                        $("#label6").text($("#txtSimboloPEN").val() + " " + result.List[6]);
                        $("#label7").text($("#txtSimboloUSD").val() + " " + result.List[7]);

                        //$.post('/ReciboCaja/FiltrarResumen', {
                        //    inicio: $("#fini").val(),
                        //    fin: $("#ffin").val(),
                        //    /*idusuario: ($("#cboUsuarios").val() == "") ? 0 : $("#cboUsuarios").val(),*/
                        //    idsede = ($("#cboSedes").val() == "") ? 0 : $("#cboSedes").val(),
                        //}, function (data) {

                        //    //$("#tbSalidas").DataTable().destroy();
                        //    //$("#tbSalidas tbody").empty();
                        //    //Salidas = data;

                        //    $("#label0").text($("#txtSimboloPEN").val() + " " + result.List[0]);
                        //    $("#label1").text($("#txtSimboloUSD").val() + " " + result.List[1]);


                        //});

                        /*$("#nuevaMatricula").modal("hide");*/
                    },
                });


                //$.post('/ReciboCaja/FiltrarResumen', {
                //    inicio: $("#fini").val(),
                //    fin: $("#ffin").val(),
                //    /*idusuario: ($("#cboUsuarios").val() == "") ? 0 : $("#cboUsuarios").val(),*/
                //    idsede = ($("#cboSedes").val() == "") ? 0 : $("#cboSedes").val(),
                //}, function (data) {

                //    //$("#tbSalidas").DataTable().destroy();
                //    //$("#tbSalidas tbody").empty();
                //    //Salidas = data;

                //    $("#label0").text($("#txtSimboloPEN").val() + " " + result.List[0]);
                //    $("#label1").text($("#txtSimboloUSD").val() + " " + result.List[1]);

                    
                //});

                /*$("#nuevaMatricula").modal("hide");*/
            },
        });
        $("#txtUsuario").val("");
    });

    $("#btnFiltrar").trigger("click");

    $.getJSON('/DocumentosElectronicos/CargarUsuarios', function (data) {
        usuarios = data;
        $.each(data, function () {
            $("select#cboUsuarios").append($('<option  value="' + this.IdUsuario + '">' + this.Nombre + '</option>'));

        });
    });

    $.getJSON('/Matricula/CargarSedes', function (data) {
        sedes = data;
        $.each(data, function () {
            $("select#cboSedes").append($('<option value="' + this.IdSede + '">' + this.Nombre + '</option>'));

        });
    });
}