function PromotorVD() {
    var objOwner = this;
    var crearDoc = true;

    /*objOwner.CodigoAlmacen = 0;*/

    var formNuevo = document.querySelectorAll("#formularioPromotor");

    $("#btnCrearPromotor").on("click", function () {

        if (!formNuevo[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formNuevo[0].classList.add("was-validated");

    });

    ListarPromotores();

    function LimpiarPromotor() {
        /*$("#txtCodigo").val("");*/
        $("#txtDni").val("");
        $("#txtNombres").val("");
        $("#txtApellidos").val("");
        $("#txtTelefono").val("");
        $("#txtDireccion").val("");
        $("#txtEmail").val("");
        $("#cboSede").val("");
        //$("#cboProvincia").empty();

        $("#formularioPromotor").removeClass("was-validated");
    }

    $("#btnLoadingDNI").on("click", function () {
        if ($("#txtDni").val().length == 8) {
            consultarDNI();
        }
    });

    $("#txtDni").on("keyup", function (e) {
        if (e.which == 13 && $("#txtDni").val().length == 8) {
            consultarDNI();
        }
    });

    function consultarDNI() {
        $("#btnLoadingDNI span").removeClass("fa-search").addClass("fa-spinner").addClass("fa-spin");
        $(".alert-modal").remove();

        $.getJSON('/Admin/BuscarReniec', { DNI: $("#txtDni").val() }, function (result) {
            if (result.success) {
                if (result.persona != undefined) {
                    if (result.persona.Nombres == "") {
                        $("#txtNombres").val("");
                        $("#txtApellidos").val("");
                    }
                    else {
                        $("#txtNombres").val(result.persona.Nombres);
                        $("#txtApellidos").val(result.persona.ApellidoPaterno + ' ' + result.persona.ApellidoMaterno);
                    }
                }
            }
            else {
                /*$("#nuevoTecnico div.modal-body").alertsModal(false, result.message);*/
                $("#error3").removeClass("hide").addClass("show");
                $("#error4").html();
                $(".alert-modal").css("margin-bottom", "20px");

                $("#txtDni").val("");
                $("#txtNombres").val("");
                $("#txtApellidos").val("");
            }

            $("#btnLoadingDNI span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");
        })
        //    .error(function (result) {
        //    $("#nuevoTecnico div.modal-body").alertsModal(false, "Error: " + result.message);*/
        //    $(".alert-modal").css("margin-bottom", "20px");

        //    $("#btnLoadingDNI span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");
        //});
    }

    $("#nuevoPromotor").modal({
        backdrop: 'static'
    });

    $("#btnNuevoPromotor").click(function () {
        $("#error").removeClass("show").addClass("hide");
        $.getJSON('/Promotor/BuscarCorrelativoPromotor', function (data) {

            if (data != "" && data[0] == "0") {
                var num = parseInt(data);
                num++;
                codigo = ("0000" + num).slice(-4);
            }
            else
                codigo = "0001";

            LimpiarPromotor();
            $("#IdPromotor").remove();
            $("#txtCodigo").val(codigo);
            crearDoc = true;
        });

        $("#btnCrearPromotor").text("Guardar").attr("class", "btn btn-primary");
    });

    function ListarPromotores() {

        $("#promotorTable").DataTable().destroy();
        $("#promotorTable tbody").empty();

        $.ajax({
            url: '/Promotor/Filtrar',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#promotorTable tbody").append($("<tr id='promotor-" + this.IdPromotor + "' data-id='" + this.IdPromotor + "'>")
                        .append($("<td class='text-center'>").text(this.CodigoPromotor))
                        .append($("<td class='text-center'>").text(this.Dni))
                        .append($("<td class='text-left'>").text(this.Nombres))
                        .append($("<td class='text-left'>").text(this.Apellidos))
                        .append($("<td class='text-left'>").text(this.Direccion))
                        .append($("<td class='text-center'>").text(this.Telefono))
                        .append($("<td class='text-left'>").text(this.Email))
                        .append($("<td class='text-center'>").text(this.Sede))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnModificarPromotor-" + this.IdPromotor + "' data-id='" + this.IdPromotor + "' data-estado='" + this.Estado + "' class='btnModificarPromotor text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnAnularPromotor-" + this.IdPromotor + "' data-id='" + this.IdPromotor + "' data-estado='" + this.Estado + "' class='btnAnularPromotor text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                    );
                });

                if ($("#txtrol").val() == 'Administrador') {
                    $("#promotorTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#promotorTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#promotorTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#promotorTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#promotorTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#promotorTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#promotorTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#promotorTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#promotorTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#promotorTable_wrapper .col-md-6:eq(0)');
                }
                

                $("#nuevoPromotor").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#modalRedireccionar").modal("hide");
            //    /*$(".content-wrapper").alerts(false, xhr.statusText);*/
            //}
        });
    }


    $("#btnCrearPromotor").on("click", function () {
        if ($("#txtDni").val().length != 0 && $("#txtNombres").val().length != 0 && $("#txtApellidos").val().length != 0 && $("#txtDireccion").val().length != 0
            && $("#txtTelefono").val().length != 0 && $("#txtEmail").val().length != 0 && $("#cboSede").val().length != 0) {

            if (crearDoc) {
                $("#btnCrearPromotor").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                $.post('/Promotor/CreatePromotor', $("#formularioPromotor").serialize(), function (result) {
                    if (result.success) {
                        ListarPromotores();
                        $("#exito").removeClass("hide").addClass("show");
                        $("#exito2").html();
                    }
                    else {
                        /*$("#formularioSede").parents("div.form-group").addClass("has-error");*/
                        $("#btnCrearPromotor").removeAttr("disabled").html('Guardar');
                        $("#error").removeClass("hide").addClass("show");
                        $("#error2").html();

                    }
                });
            } else {
                $("#btnCrearPromotor").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');

                $.post('/Promotor/EditPromotor', $("#formularioPromotor").serialize(), function (result) {
                    if (result.success) {
                        ListarPromotores();
                        $("#informa").removeClass("hide").addClass("show");
                        $("#info").html();

                    } else {
                        $("#btnCrearPromotor").removeAttr("disabled").html('Guardar Cambios');
                        /*$("#liveToast2").removeClass("hide").addClass("show");*/
                        /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                        $("#nuevoPromotor").modal("hide");
                    }
                });
            }

        }
        $("#btnCrearPromotor").removeAttr("disabled").html('Guardar');
    });


    $(document).on("click", ".btnModificarPromotor", function () {
        /*LimpiarCombos();*/
        $("#nuevoPromotor").modal("show");
        $("#formularioPromotor").removeClass("was-validated");

        $.getJSON('/Promotor/VerPromotor', { IdPromotor: $(this).attr("data-id") }, function (data) {
            $("#formularioPromotor").prepend('<input type="hidden" name="IdPromotor" id="IdPromotor" value="' + data.IdPromotor + '" />');

            $("#txtCodigo").val(data.CodigoPromotor.trim()).attr("readonly", true);
            $("#txtDni").val(data.Dni);
            $("#txtNombres").val(data.Nombres);
            $("#txtApellidos").val(data.Apellidos);
            $("#txtDireccion").val(data.Direccion);
            $("#txtTelefono").val(data.Telefono);
            $("#txtEmail").val(data.Email);
            $("#cboSede").val(data.IdSede);

            crearDoc = false;
            $("#btnCrearPromotor").text("Guardar Cambios").attr("class", "btn btn-warning");

        });
        /*LimpiarSede();*/

    });

    $(document).on("click", ".btnAnularPromotor", function () {
        $("#IdPromotor-d").val($(this).attr("data-id"));
        $("#eliminarPromotor").modal("toggle");
    });

    $("#btnConfEliminarPromotor").click(function () {
        $("#btnConfEliminarPromotor").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Promotor/DeletePromotor', $("#formularioPromotorD").serialize(), function (result) {
            if (result.success) {
                ListarPromotores();
                $("#elimina").removeClass("hide").addClass("show");
                $("#elim").html();
            } else {
                $("#btnConfEliminarPromotor").removeAttr("disabled").html('Eliminar');
                /*$("#liveToast2").removeClass("hide").addClass("show");*/
                /*window.alert(false, "Error: " + result.message);*/
                /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                /*$("#eliminarSede").modal("hide");*/
            }
        });
        $("#eliminarPromotor").modal("hide");
        $("#btnConfEliminarPromotor").removeAttr("disabled").html('Eliminar');
    });

    $.getJSON('/Promotor/CargarSedes', function (data) {
        sedes = data;

        $.each(data, function () {
            $("select#cboSede").append($('<option value="' + this.IdSede + '">' + this.Nombre + '</option>'));
        });

    });

}

