function GradoVD() {
    var objOwner = this;

    /*objOwner.CodigoAlmacen = 0;*/
      
    var crearS = true;
    var bola = document.querySelectorAll("#formularioGrado");

    FiltrarGrado();

    function LimpiarGrado() {
        /*$("#txtCodigo").val("");*/
        $("#txtDescripicion").val("");

        $("#formularioGrado").removeClass("was-validated");
    }

    $("#btn-nuevo-grado").click(function () {

            $("#formularioGrado").removeClass("was-validated");

            $("#txtDescripicion").focus();

            $.getJSON('BuscarCodigoG', function (data) {
                if (data != "" && data[0] == "0") {
                    var num = parseInt(data);
                    num++;
                    codigo = ("0000" + num).slice(-4);
                }
                else {
                    codigo = "0001";
                }

                LimpiarGrado();

                $("#IdGrado").remove();
                $("#txtCodigo").val(codigo);
                CrearTS = true;
            });
          
            $("#btnCrearGrado").text("Guardar").attr("class", "btn btn-primary");

            crearS = true;

    });


    $("#btnCrearGrado").click(function () {
        if (!bola[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        bola[0].classList.add("was-validated");
    });

    

    function FiltrarGrado(){
        $("#gradoTable").DataTable().destroy();
        $("#gradoTable tbody").empty();
          
        $.ajax({
            url: '/Grado/FiltrarGrado',
            type: 'POST', 
            success: function (data) {
                $.each(data, function () {
                    $("#gradoTable tbody").append($("<tr>")
                        .append($("<td class='text-center'>").text(this.Codigo))
                        .append($("<td class='text-center'>").text(this.Descripcion))
                        .append($('<td class="text-center">').append($("<a class='me-3 text-lg text-success' id='btnModificar' data-bs-toggle='modal' data-bs-target='#nuevoGrado' data-id='" + this.IdGrado + "'><i class='far fa-edit'></i></a>")))
                        .append($('<td class="text-center">').append($("<a class='text-lg text-danger' id='btnEliminar' data-bs-toggle='modal' data-bs-target='#eliminarGrado' data-id='" + this.IdGrado + "'><i class='far fa-trash-alt'></i></a>")))
                    );
                });
                if ($("#txtrol").val() == 'Administrador') {
                    $("#gradoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#gradoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#gradoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#gradoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#gradoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#gradoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#gradoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#gradoTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#gradoTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#gradoTable_wrapper .col-md-6:eq(0)');
                }
                

                $("#nuevoGrado").modal("hide");
                $("#eliminarGrado").modal("hide"); 

            }, 
        });

    }

    $("#btnCrearGrado").on("click", function () {

        if ($('#txtDescripicion').val().length != 0) {
            var token = $("#formularioGrado").find("input[name=__RequestVerificationToken]").val();

            var data = {
                __RequestVerificationToken: token,
                IdGrado: crearS ? 0 : $("#IdGrado").val(),
                Codigo: $("#txtCodigo").val(),
                Descripcion: $("#txtDescripicion").val(),
            };

            if (crearS) {
                $("#btnCrearGrado").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                $.post('/Grado/CreateGrado', $("#formularioGrado").serialize(), function (result) {
                    if (result.success) { 
                        FiltrarGrado();

                        $("#liveToast").fadeIn(2500);
                        $("#liveToast").addClass("show");
                        setTimeout(() => {
                            $("#liveToast").fadeOut(2500);
                        }, 4500); 

                    }
                    else {
                        $("#formularioGrado").removeClass("was-validated");

                        $("#btnCrearGrado").removeAttr("disabled").html('Guardar');

                        $("#liveToast2").fadeIn(2500);
                        $("#liveToast2").addClass("show");
                        setTimeout(() => {
                            $("#liveToast2").fadeOut(2500);
                        }, 4500);


                    }

                });

            } else {

                $("#btnCrearGrado").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');


                $.post('/Grado/EditGrado', data, function (result) {
                    if (result.success) {
                        FiltrarGrado();

                        
                        LimpiarGrado();

                        $("#liveToast5").fadeIn(2500);
                        $("#liveToast5").addClass("show");
                        setTimeout(() => {
                            $("#liveToast5").fadeOut(2500);
                        }, 4500);

                        $("#nuevoGrado").modal("hide");

                    }
                    else {
                        $("#formularioGrado").removeClass("was-validated");
                        $("#btnCrearGrado").removeAttr("disabled").html('Guardar Cambios');

                        $("#nuevoGrado").modal("hide");

                        $("#liveToast6").fadeIn(2500);
                        $("#liveToast6").addClass("show");
                        setTimeout(() => {
                            $("#liveToast6").fadeOut(2500);
                        }, 4500);


                    }
                });
            }
        }
        $("#btnCrearGrado").removeAttr("disabled").html('Guardar Cambios');

    });
     

    $(document).on("click", "#btnModificar", function () {
        /* $("#formularioSeccion")[0].reset(); */ 
        $("#nuevoGrado").modal("toggle");

        $.getJSON('/Grado/VerGrado', { IdGrado: $(this).attr("data-id") }, function (data) {
            $("#formularioGrado").prepend('<input type="hidden" id="IdGrado" name="IdGrado" value="' + data.IdGrado + '" />');

            $("#txtCodigo").val(data.Codigo.trim()).attr("readonly", true);
            $("#txtDescripicion").val(data.Descripcion);
            crearS = false;
            $("#btnCrearGrado").text("Guardar Cambios").attr("class", "btn btn-warning");


        });
         
    });

    $(document).on("click", "#btnEliminar", function () {
        /*$("#btnEliminar").on("click", function () { */
        $("#IdGrado-d").val($(this).attr("data-id"));
    });

    $(document).on("click", "#btnEliminarGrado", function () {
        /*$("#btnEliminarSeccion").click(function () {*/
        $("#btnEliminarGrado").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Grado/DeleteGrado', $("#formularioGradoD").serialize(), function (result) {
            if (result.success) {
                 
                FiltrarGrado();

                $("#liveToast3").fadeIn(2500);
                $("#liveToast3").addClass("show");
                setTimeout(() => {
                    $("#liveToast3").fadeOut(2500);
                }, 4500);

            } else {
                $("#btnEliminarGrado").removeAttr("disabled").html('Eliminar');

                $("#liveToast4").fadeIn(2500);
                $("#liveToast4").addClass("show");
                setTimeout(() => {
                    $("#liveToast4").fadeOut(2500);
                }, 4500);
            }


        });
        $("#btnEliminarGrado").removeAttr("disabled").html('Eliminar');
    });
}