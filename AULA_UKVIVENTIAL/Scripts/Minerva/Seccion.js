function SeccionVD() {
    var objSeccion = this;

    //objOwner.CodigoAlmacen = 0; 
    var crearS = true;
    var bola = document.querySelectorAll("#formularioSeccion");

    if ($("#txtrol").val() == 'Administrador') {
        $("#seccionTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#seccionTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Supervisor') {
        $("#seccionTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#seccionTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner') {
        $("#seccionTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#seccionTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner sin Ventas') {
        $("#seccionTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#seccionTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Profesor') {
        $("#seccionTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#seccionTable_wrapper .col-md-6:eq(0)');
    }
    

    FiltrarSeccion();

    function LimpiarSeccion() {
        /*$("#txtCodigo").val("");*/
        $("#txtDescripicion").val(""); 

        $("#formularioSeccion").removeClass("was-validated");
    }

    $("#btn-nueva-seccion").click(function () {
        $("#formularioSeccion").removeClass("was-validated");
        $("#txtDescripicion").focus();
        $.getJSON('BuscarCodigoS', function (data) {
            if (data != "" && data[0] == "0") {
                var num = parseInt(data);
                num++;
                codigo = ("0000" + num).slice(-4);
            }
            else {
                codigo = "0001";
            }

            LimpiarSeccion();

            $("#IdSeccion").remove();
            $("#txtCodigo").val(codigo);
            CrearTS = true;
        });

        $("#btnCrearSeccion").text("Guardar").attr("class", "btn btn-primary");

        crearS = true;
    });

    $("#btnCrearSeccion").click(function () {
        if (!bola[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        bola[0].classList.add("was-validated");
    });
     
    function FiltrarSeccion() {
        $("#seccionTable").DataTable().destroy();
        $("#seccionTable tbody").empty();

        $.ajax({
            url: '/Seccion/FiltrarSeccion',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#seccionTable tbody").append($("<tr>")
                        .append($("<td class='text-center'>").text(this.Codigo))
                        .append($("<td class='text-center'>").text(this.Descripcion))
                        .append($('<td class="text-center">')
                            .append($("<a class='me-3 text-lg text-success' id='btnModificar' data-bs-toggle='modal' data-bs-target='#nuevaSeccion' data-id='" + this.IdSeccion + "'><i class='far fa-edit'></i></a>")))
                        .append($('<td class="text-center">')
                            .append($("<a class='text-lg text-danger' id='btnEliminar' data-bs-toggle='modal' data-bs-target='#eliminarSeccion' data-id='" + this.IdSeccion + "'><i class='far fa-trash-alt'></i></a>")))
                    );
                });
                if ($("#txtrol").val() == 'Administrador') {
                    $("#seccionTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#seccionTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#seccionTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#seccionTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#seccionTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#seccionTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#seccionTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#seccionTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#seccionTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#seccionTable_wrapper .col-md-6:eq(0)');
                }
                

                $("#nuevaSeccion").modal("hide");
                $("#eliminarSeccion").modal("hide");


            },

        });

    } 

    $("#btnCrearSeccion").on("click", function () {

        if ($('#txtDescripicion').val().length != 0) {
            var token = $("#formularioSeccion").find("input[name=__RequestVerificationToken]").val();

            var data = {
                __RequestVerificationToken: token,
                IdSeccion: crearS ? 0 : $("#IdSeccion").val(),
                Codigo: $("#txtCodigo").val(),
                Descripcion: $("#txtDescripicion").val(),
            };

            if (crearS) {
                $("#btnCrearSeccion").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                $.post('/Seccion/CreateSeccion', $("#formularioSeccion").serialize(), function (result) {
                    if (result.success) { 
                        FiltrarSeccion();
                        $("#liveToast").fadeIn(2500);
                        $("#liveToast").addClass("show"); 
                        setTimeout(() => {
                            $("#liveToast").fadeOut(2500);
                        }, 4500); 
                    }
                    else {
                        $("#formularioSeccion").removeClass("was-validated");
                        $("#btnCrearSeccion").removeAttr("disabled").html('Guardar');

                        $("#liveToast2").fadeIn(2500);
                        $("#liveToast2").addClass("show"); 
                        setTimeout(() => {
                            $("#liveToast2").fadeOut(2500);
                        }, 4500);

                        
                    }
                });

            } else { 
                $("#btnCrearSeccion").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');

                $.post('/Seccion/EditSeccion', data, function (result) {
                    if (result.success) {
                        FiltrarSeccion();

                        $("#liveToast5").fadeIn(2500);

                        $("#liveToast5").addClass("show");

                        setTimeout(() => {
                            $("#liveToast5").fadeOut(2500);
                        }, 4500);

                        LimpiarSeccion();
                        $("#nuevaSeccion").modal("hide");

                    } else {
                        $("#formularioSeccion").removeClass("was-validated");
                        $("#btnCrearSeccion").removeAttr("disabled").html('Guardar Cambios');

                        $("#nuevaSeccion").modal("hide");

                        $("#liveToast6").fadeIn(2500);

                        $("#liveToast6").addClass("show");

                        setTimeout(() => {
                            $("#liveToast6").fadeOut(2500);
                        }, 4500);



                    }
                });
            }
        }
        
        $("#btnCrearSeccion").removeAttr("disabled").html('Guardar Cambios');
    });

    $(document).on("click", "#btnModificar", function () {
       
        $("#nuevaSeccion").modal("toggle");

        $.getJSON('/Seccion/VerSeccion', { IdSeccion: $(this).attr("data-id") }, function (data) {
            $("#formularioSeccion").prepend('<input type="hidden" id="IdSeccion" name="IdSeccion" value="' + data.IdSeccion + '" />');

            $("#txtCodigo").val(data.Codigo.trim()).attr("readonly", true);
            $("#txtDescripicion").val(data.Descripcion);
            crearS = false;
            $("#btnCrearSeccion").text("Guardar Cambios").attr("class", "btn btn-warning"); 
        });

    });

    $(document).on("click", "#btnEliminar", function () {
        /*$("#btnEliminar").on("click", function () { */
        $("#IdSeccion-d").val($(this).attr("data-id"));
    });

    $(document).on("click", "#btnEliminarSeccion", function () {
         $("#btnEliminarSeccion").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Seccion/DeleteSeccion', $("#formularioSeccionD").serialize(), function (result) {
                if (result.success) {

                    $("#liveToast3").addClass("show");
                    FiltrarSeccion();

                    $("#liveToast3").fadeIn(2500);

                    $("#liveToast3").addClass("show");

                    setTimeout(() => {
                        $("#liveToast3").fadeOut(2500);
                    }, 4500);



                } else {
                    $("#btnEliminarSeccion").removeAttr("disabled").html('Eliminar');

                    $("#liveToast4").fadeIn(2500);

                    $("#liveToast4").addClass("show");

                    setTimeout(() => {
                        $("#liveToast4").fadeOut(2500);
                    }, 3500);
                     
                }
        });
        $("#btnEliminarSeccion").removeAttr("disabled").html('Eliminar');
    });

    
}
