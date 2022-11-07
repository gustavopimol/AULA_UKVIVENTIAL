function ConceptoVD() {
    var objOwner = this;

    /*objOwner.CodigoAlmacen = 0;*/
    var bola = document.querySelectorAll("#formularioConcepto");
    var crearS = true;

    if ($("#txtrol").val() == 'Administrador') {
        $("#conceptoTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Supervisor') {
        $("#conceptoTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner') {
        $("#conceptoTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner sin Ventas') {
        $("#conceptoTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Profesor') {
        $("#conceptoTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
    }

    $("#btnCrearConcepto").on("click", function () {

        if (!bola[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        bola[0].classList.add("was-validated");
    });

    function LimpiarConcepto() {
        $("#txtPeriodo").val("");
        $("#cboNivel").val("");
        $("#txtDescripcion").val("");
        $("#cbotipo").val("");
        $("#cboMoneda").val("");
        $("#txtMonto").val("");
        $("#cboUsuario").val("");
        $("#txtRegistro").val("");
        $("#cboCiclo").val("");
        $("#cboPeriodo").val("");

        $("#formularioConcepto").removeClass("was-validated");
    }

    $("#btn-nuevo-concepto").click(function () {

        /*$("#formularioConcepto")[0].reset();*/
        LimpiarConcepto();

        $("#btnCrearConcepto").text("Guardar").attr("class", "btn btn-primary");
 
        /*  crearP = true;*/
    });

    

    $("#btnFiltrar").on("click", function () {

        let idPeriodo = ($("#cboPeriodoFiltro").val() == "") ? 0 : $("#cboPeriodoFiltro").val();
           /* $("#cboPeriodoFiltro option:selected").val();*/
        if (idPeriodo == "TODOS") {
            ListarConceptoTodo();
        } else {
            ListarConcepto();
        }
    });    

    $("#nuevoConcepto").modal({
        backdrop: 'static'
    });

    function LimpiarConcepto() {
        $("#txtPeriodo").val("");
        $("#cboNivel").val("");
        $("#txtDescripcion").val("");
        $("#txtTipo").val("");
        /*$("#cboMoneda").val("");*/
        $("#txtMonto").val("");
        $("#txtVencimiento").val("");
        $("#cboUsuario").val("");
        $("#txtRegistro").val("");
        $("#cboCiclo").val("");

    }

    $("#eliminarConcepto").modal({
        backdrop: 'static'
    });

    $("#btnFiltrar").trigger("click");
     
    function ListarConceptoTodo() { 

        $("#conceptoTable").DataTable().destroy();
        $("#conceptoTable tbody").empty();

        $.ajax({
            url: '/Concepto/FiltrarAll',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#conceptoTable tbody").append($("<tr id='concepto-" + this.IdConcepto + "' data-id='" + this.IdConcepto + "'>")
                        .append($("<td class='text-center'>").text(this.tipo))
                        .append($("<td class='text-center'>").text(this.periodo))
                        .append($("<td class='text-center'>").text(this.nivel))
                        .append($("<td class='text-center'>").text(this.ciclo))
                        .append($("<td class='text-center'>").text(this.descripcion))                        
                        .append($("<td class='text-center'>").text(this.moneda))
                        .append($("<td class='text-center'>").text(this.monto))
                        .append($("<td class='text-center'>").text(this.fregistros)) 
                        .append($("<td class='text-center'>").text(this.fvencimientoS)) 
                        .append($("<td class='text-center'>").text(this.Usuario))                       
                        .append($('<td class="text-center">').append($("<a class='me-3 text-lg text-success' id='btnModificar' data-bs-toggle='modal' data-bs-target='#nuevoConcepto' data-id='" + this.IdConcepto + "'><i class='far fa-edit'></i></a>")))
                        .append($('<td class="text-center">').append($("<a class='text-lg text-danger' id='btnEliminar' data-bs-toggle='modal' data-bs-target='#eliminarConcepto' data-id='" + this.IdConcepto + "'><i class='far fa-trash-alt'></i></a>")))
                    );
                });

                if ($("#txtrol").val() == 'Administrador') {
                    $("#conceptoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#conceptoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#conceptoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#conceptoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#conceptoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
                }
                $("#eliminarConcepto").modal("hide");
                $("#nuevoConcepto").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#modalRedireccionar").modal("hide");
            //    /*$(".content-wrapper").alerts(false, xhr.statusText);*/
            //}
        });
    }
   

    function ListarConcepto() {
        var period;
        period = ($("#cboPeriodoFiltro").val() == "TODOS") ? 0 : $("#cboPeriodoFiltro").val();
        $("#conceptoTable").DataTable().destroy();
        $("#conceptoTable tbody").empty();
        $.ajax({
            url: '/Concepto/Filtrar',   
            data: {
                period: period,
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#conceptoTable tbody").append($("<tr id='concepto-" + this.IdConcepto + "' data-id='" + this.IdConcepto + "'>")
                        .append($("<td class='text-center'>").text(this.tipo))
                        .append($("<td class='text-center'>").text(this.periodo))
                        .append($("<td class='text-center'>").text(this.nivel))
                        .append($("<td class='text-center'>").text(this.ciclo))
                        .append($("<td class='text-center'>").text(this.descripcion))
                        .append($("<td class='text-center'>").text(this.moneda))
                        .append($("<td class='text-center'>").text(this.monto))
                        .append($("<td class='text-center'>").text(this.fregistros))
                        .append($("<td class='text-center'>").text(this.fvencimientoS))
                        .append($("<td class='text-center'>").text(this.Usuario))
                        .append($('<td class="text-center">').append($("<a class='me-3 text-lg text-success' id='btnModificar' data-bs-toggle='modal' data-bs-target='#nuevoConcepto' data-id='" + this.IdConcepto + "'><i class='far fa-edit'></i></a>")))
                        .append($('<td class="text-center">').append($("<a class='text-lg text-danger' id='btnEliminar' data-bs-toggle='modal' data-bs-target='#eliminarConcepto' data-id='" + this.IdConcepto + "'><i class='far fa-trash-alt'></i></a>")))
                    );
                });

                if ($("#txtrol").val() == 'Administrador') {
                    $("#conceptoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#conceptoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#conceptoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#conceptoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#conceptoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#conceptoTable_wrapper .col-md-6:eq(0)');
                }
                $("#eliminarConcepto").modal("hide");
                $("#nuevoConcepto").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#modalRedireccionar").modal("hide");
            //    /*$(".content-wrapper").alerts(false, xhr.statusText);*/
            //}
        });
    }


    $("#btnCrearConcepto").on("click", function () {
        
        if ($("#cboPeriodo").val().length != 0 && $("#cboNivel").val().length != 0 && $("#txtDescripcion").val().length != 0
            && $("#cbotipo").val().length != 0 && $("#txtidusuario").val().length != 0 && $("#txtusuario").val().length != 0
            && $("#txtMonto").val().length != 0 && $("#cboCiclo").val().length != 0) {

            var idCiclo = $("#cboCiclo option:selected").val();
            var idNivel = $("#cboNivel option:selected").val();
            var idPeriodo = $("#cboPeriodo option:selected").val();
            var Tipo = $("#cbotipo option:selected").val();


            let date = new Date();
            let fechahoy = date.toLocaleDateString();


            var token = $("#formularioConcepto").find("input[name=__RequestVerificationToken]").val();

            var concepto = {
                IdCiclo: idCiclo,
                IdNivel: idNivel,
                /*IdUsuario: $("#txtidusuario").val(),*/
                Usuario: $("#txtusuario").val(),
                Tipo: Tipo,
                Descripcion: $("#txtDescripcion").val(),
                IdPeriodo: idPeriodo,
                Moneda: $("#cboMoneda").val(),
                Monto: $("#txtMonto").val(),
            };

            if (crearS) {
                $("#btnCrearConcepto").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');
                $.post('/Concepto/CreateConcepto', { __RequestVerificationToken: token, concepto: concepto, fvencimiento: $("#txtVencimiento").val(), fregistro: fechahoy }, function (result) {
                    if (result.success) {
                        let idPeriodo = $("#cboPeriodoFiltro option:selected").val();
                        if (idPeriodo == "TODOS") {
                            ListarConceptoTodo();
                        } else {
                            ListarConcepto();
                        }
                        $("#liveToast1").fadeIn(1500);
                        $("#liveToast1").addClass("show");
                        setTimeout(() => {
                            $("#liveToast1").fadeOut(1500);
                        }, 4500);
                    }
                    else {
                        $("#btnCrearConcepto").removeAttr("disabled").html('Guardar');
                        $("#liveToast4").fadeIn(1500);
                        $("#liveToast4").addClass("show");
                        setTimeout(() => {
                            $("#liveToast4").fadeOut(1500);
                        }, 4500);

                    }
                });
            } else {
                $("#btnCrearConcepto").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');
                $.post('/Concepto/CreateConcepto', $("#formularioConcepto").serialize(), function (result) {
                    if (result.success) {
                        let idPeriodo = $("#cboPeriodoFiltro option:selected").val();
                        if (idPeriodo == "TODOS") {
                            ListarConceptoTodo();
                        } else {
                            ListarConcepto();
                        }
                        $("#liveToast2").fadeIn(1500);
                        $("#liveToast2").addClass("show");
                        setTimeout(() => {
                            $("#liveToast2").fadeOut(1500);
                        }, 4500);
                    }
                    else {
                        $("#btnCrearConcepto").removeAttr("disabled").html('Guardar Cambios');
                        /*$("#nuevoConcepto").modal("hide");*/                        
                        $("#liveToast5").fadeIn(1500);
                        $("#liveToast5").addClass("show");
                        setTimeout(() => {
                            $("#liveToast5").fadeOut(1500);
                        }, 4500);
                    }
                    $("#nuevoConcepto").modal("hide");
                });
            }
        } else { 
            $("#btnCrearConcepto").removeAttr("disabled").html('Guardar');          
            $("#liveToast4").fadeIn(1500);
            $("#liveToast4").addClass("show");
            setTimeout(() => {
                $("#liveToast4").fadeOut(1500);
            }, 4500);
        }
        
        $("#btnCrearConcepto").removeAttr("disabled").html('Guardar');
    });

    $.getJSON('/Concepto/CargarCiclos', function (data) {
        ciclos = data;

        $.each(data, function () {
            $("#cboCiclo").append($('<option  value="' + this.IdCiclo + '">' + this.Descripcion + '</option>'));

        });
    }); 
    
    $.getJSON('/Concepto/CargarNiveles', function (data) {
        niveles = data;

        $.each(data, function () {
            $("#cboNivel").append($('<option value="' + this.IdNivel + '">' + this.Descripcion + '</option>'));
        });
    });

    $.getJSON('/Concepto/CargarPeriodos', function (data) {
        Periodo = data;

        $.each(data, function () {
            $("#cboPeriodo").append($('<option value="' + this.IdPeriodo + '">' + this.Descripcion + '</option>'));
            $("#cboPeriodoFiltro").append($('<option value="' + this.IdPeriodo + '">' + this.Descripcion + '</option>'));
        });
    });

    
    $("#txtVencimiento").keyup(function () {
        let fechavencimiento = $("#txtVencimiento").val();
        let tamañofechavencimiento = fechavencimiento.length;

       
        if (tamañofechavencimiento == 2) {
                fechavencimiento += "-";
                $("#txtVencimiento").val(fechavencimiento); 
        }
        if (tamañofechavencimiento == 5) {
                    fechavencimiento += "-";
                    $("#txtVencimiento").val(fechavencimiento);
        }
       

    });

    $(document).on("click", "#btnModificar", function () {
        /*LimpiarSede(); cboPeriodoFiltro */
        $("#nuevoConcepto").modal("show");
        $("#formularioConcepto").removeClass("was-validated");

        $.getJSON('/Concepto/VerConcepto', { IdConcepto: $(this).attr("data-id") }, function (data) {
            $("#formularioConcepto").prepend('<input class="form-control" type="hidden" name="IdConcepto" id="IdConcepto" value="' + data.IdConcepto + '" readonly/>');

            let date = new Date();
            let fechahoy = date.toLocaleDateString();

            //$("#IdConcepto").val(data.IdConcepto);

            $("#IdConcepto").val(data.IdConcepto);
            $("#cboPeriodo").val(data.IdPeriodo);
            $("#cboNivel").val(data.IdNivel);
            $("#txtDescripcion").val(data.descripcion);
            $("#cbotipo").val(data.tipo);
            $("#cboMoneda").val(data.moneda);
            $("#txtMonto").val(data.monto);
            $("#txtVencimiento").val(data.fvencimientoS);
            $("#txtRegistro").val(fechahoy);
            $("#cboCiclo").val(data.IdCiclo);
            $("#cboUsuario").val(data.IdUsuario);
            
            crearS = false;
            $("#btnCrearConcepto").text("Guardar Cambios").attr("class", "btn btn-warning");

        });
        /*LimpiarSede();
          let idPeriodo = $("#cboPeriodoFiltro option:selected").val();
            if (idPeriodo == "TODOS") {
                ListarConceptoTodo();
            } else {
                ListarConcepto();
            }
        */

    });

    $(document).on("click", "#btnEliminar", function () {
        $("#IdConcepto-d").val($(this).attr("data-id"));
        $("#eliminarConcepto").modal("toggle");
    });

    $("#btnEliminarConcepto").click(function () {
        $("#btnEliminarConcepto").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Concepto/DeleteConcepto', $("#formularioConceptoD").serialize(), function (result) {
            if (result.success) {
                let idPeriodo = $("#cboPeriodoFiltro option:selected").val();

                if (idPeriodo == "TODOS") {
                    ListarConceptoTodo();
                } else {
                    ListarConcepto();
                }
                $("#liveToast3").fadeIn(1500);
                $("#liveToast3").addClass("show");
                setTimeout(() => {
                    $("#liveToast3").fadeOut(1500);
                }, 4500);

            } else {
                $("#btnEliminarConcepto").removeAttr("disabled").html('Eliminar');

                $("#liveToast6").fadeIn(1500);
                $("#liveToast6").addClass("show");
                setTimeout(() => {
                    $("#liveToast6").fadeOut(1500);
                }, 4500);
            }
        }); 
        $("#btnEliminarConcepto").removeAttr("disabled").html('Eliminar');
    });

}