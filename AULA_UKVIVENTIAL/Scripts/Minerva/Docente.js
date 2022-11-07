function DocenteVD() {
    var objOwner = this;
    var crearDoc = true;

    /*objOwner.CodigoAlmacen = 0;*/

    var formNuevo = document.querySelectorAll("#formularioDocente");

    $("#btnCrearDocente").on("click", function () {

        if (!formNuevo[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formNuevo[0].classList.add("was-validated");

    });

    ListarDocentes();

    function LimpiarDocente() {
        /*$("#txtCodigo").val("");*/
        $("#txtDni").val("");
        $("#txtNombres").val("");
        $("#txtApellidos").val("");
        $("#txtTelefono").val("");
        $("#txtDireccion").val("");
        $("#txtEmail").val("");
        //$("#cboDepartamento").empty();
        //$("#cboProvincia").empty();

        $("#formularioDocente").removeClass("was-validated");
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

    $("#btnNuevoDocente").click(function () {
        $("#error").removeClass("show").addClass("hide");
        $.getJSON('/Docente/BuscarCorrelativoDocente', function (data) {

            if (data != "" && data[0] == "0") {
                var num = parseInt(data);
                num++;
                codigo = ("0000" + num).slice(-4);
            }
            else
                codigo = "0001";

            LimpiarDocente();
            $("#IdDocente").remove();
            $("#txtCodigo").val(codigo);
            crearDoc = true;
        });

        $("#btnCrearDocente").text("Guardar").attr("class", "btn btn-primary");
    });

    $("#nuevoDocente").modal({
        backdrop: 'static'
    });

    $("#eliminarDocente").modal({
        backdrop: 'static'
    });

    function ListarDocentes() {

        $("#docenteTable").DataTable().destroy();
        $("#docenteTable tbody").empty();

        $.ajax({
            url: '/Docente/Filtrar',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#docenteTable tbody").append($("<tr id='docente-" + this.IdDocente + "' data-id='" + this.IdDocente + "'>")
                        .append($("<td class='text-center'>").text(this.CodigoDocente))
                        .append($("<td class='text-center'>").text(this.Dni))
                        .append($("<td class='text-left'>").text(this.Nombres))
                        .append($("<td class='text-left'>").text(this.Apellidos))
                        .append($("<td class='text-left'>").text(this.Direccion))
                        .append($("<td class='text-center'>").text(this.Telefono))
                        .append($("<td class='text-left'>").text(this.Email))
                        .append($("<td class='text-center'>").text(this.Sede))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnModificarDocente-" + this.IdDocente + "' data-id='" + this.IdDocente + "' data-estado='" + this.Estado + "' class='btnModificarDocente text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnAnularDocente-" + this.IdDocente + "' data-id='" + this.IdDocente + "' data-estado='" + this.Estado + "' class='btnAnularDocente text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                    );
                });
                if ($("#txtrol").val() == 'Administrador') {
                    $("#docenteTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#docenteTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#docenteTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#docenteTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#docenteTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#docenteTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#docenteTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#docenteTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#docenteTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#docenteTable_wrapper .col-md-6:eq(0)');
                }

                $("#nuevoDocente").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#modalRedireccionar").modal("hide");
            //    /*$(".content-wrapper").alerts(false, xhr.statusText);*/
            //}
        });
    }


    $("#btnCrearDocente").on("click", function () {
        if ($("#txtDni").val().length != 0 && $("#txtNombres").val().length != 0 && $("#txtApellidos").val().length != 0 && $("#txtDireccion").val().length != 0
            && $("#txtTelefono").val().length != 0 && $("#txtEmail").val().length != 0 && $("#cboSede").val().length != 0 ) {

            if (crearDoc) {
                $("#btnCrearDocente").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                $.post('/Docente/CreateDocente', $("#formularioDocente").serialize(), function (result) {
                    if (result.success) {
                        ListarDocentes();
                        $("#exito").removeClass("hide").addClass("show");
                        $("#exito2").html();
                    }
                    else {
                        /*$("#formularioSede").parents("div.form-group").addClass("has-error");*/
                        $("#btnCrearDocente").removeAttr("disabled").html('Guardar');
                        $("#error").removeClass("hide").addClass("show");
                        $("#error2").html();

                    }
                });
            } else {
                $("#btnCrearDocente").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');

                $.post('/Docente/EditDocente', $("#formularioDocente").serialize(), function (result) {
                    if (result.success) {
                        ListarDocentes();
                        $("#informa").removeClass("hide").addClass("show");
                        $("#info").html();

                    } else {
                        $("#btnCrearDocente").removeAttr("disabled").html('Guardar Cambios');
                        /*$("#liveToast2").removeClass("hide").addClass("show");*/
                        /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                        $("#nuevoDocente").modal("hide");
                    }
                });
            }

        }
        $("#btnCrearDocente").removeAttr("disabled").html('Guardar');
    });


    $(document).on("click", ".btnModificarDocente", function () {
        /*LimpiarCombos();*/
        $("#nuevoDocente").modal("show");
        $("#formularioDocente").removeClass("was-validated");

        $.getJSON('/Docente/VerDocente', { IdDocente: $(this).attr("data-id") }, function (data) {
            $("#formularioDocente").prepend('<input type="hidden" name="IdDocente" id="IdDocente" value="' + data.IdDocente + '" />');

            $("#txtCodigo").val(data.CodigoDocente.trim()).attr("readonly", true);
            $("#txtDni").val(data.Dni);
            $("#txtNombres").val(data.Nombres);
            $("#txtApellidos").val(data.Apellidos);
            $("#txtDireccion").val(data.Direccion);
            $("#txtTelefono").val(data.Telefono);
            $("#txtEmail").val(data.Email);
            $("#cboSede").val(data.IdSede);

            crearDoc = false;
            $("#btnCrearDocente").text("Guardar Cambios").attr("class", "btn btn-warning");

        });
        /*LimpiarSede();*/

    });

    $(document).on("click", ".btnAnularDocente", function () {
        $("#IdDocente-d").val($(this).attr("data-id"));
        $("#eliminarDocente").modal("toggle");
    });

    $("#btnConfEliminarDocente").click(function () {
        $("#btnConfEliminarDocente").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Docente/DeleteDocente', $("#formularioDocenteD").serialize(), function (result) {
            if (result.success) {
                ListarDocentes();
                $("#elimina").removeClass("hide").addClass("show");
                $("#elim").html();
            } else {
                $("#btnConfEliminarDocente").removeAttr("disabled").html('Eliminar');
                /*$("#liveToast2").removeClass("hide").addClass("show");*/
                /*window.alert(false, "Error: " + result.message);*/
                /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                /*$("#eliminarSede").modal("hide");*/
            }
        });
        $("#eliminarDocente").modal("hide");
        $("#btnConfEliminarDocente").removeAttr("disabled").html('Eliminar');
    });

    $.getJSON('/Docente/CargarSedes', function (data) {
        sedes = data;

        $.each(data, function () {
            $("select#cboSede").append($('<option value="' + this.IdSede + '">' + this.Nombre + '</option>'));
        });

    });

    var listaDetalle;

    $(document).ready(function () {
        $("#itemdocenteTable").DataTable();

        $("#btnSelectFile").click(function () {
            $("#txtFileUpload").click();
        });

        $("#txtFileUpload").change(function () {
            $("#modalRedireccionar").modal({
                backdrop: 'static'
            });

            var ext = $('#txtFileUpload').val().split('.').pop().toLowerCase();

            if ($.inArray(ext, ['xls', 'xlsx']) == -1) {
                return false;
            }

            $("#itemdocenteTable").DataTable().destroy();
            $("#itemdocenteTable tbody").empty();

            var formData = new FormData();
            formData.append('__RequestVerificationToken', $("input[name=__RequestVerificationToken]").val());
            formData.append('file', $('input[type=file]')[0].files[0]);

            $.ajax({
                url: '/Docente/UploadFile',
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                success: function (result) {
                    if (!result.success) {
                        return false;
                    }

                    listaDetalle = result.listado;
                    var contador = 0;
                    $.each(result.listado, function () {
                        if (this.HasError == true) contador++;

                        $("#itemdocenteTable").append($("<tr" + ((this.HasError == true) ? " class='danger'" : "") + ">")
                            .append($("<td class='text-center'>").text(this.CodigoDocente))
                            .append($("<td class='text-center'>").text(this.Dni))
                            .append($("<td class='text-center'>").text(this.Nombres))
                            .append($("<td class='text-center'>").text(this.Apellidos))
                            .append($("<td class='text-center'>").text(this.Direccion))
                            .append($("<td class='text-center'>").text(this.Telefono))
                            .append($("<td class='text-center'>").text(this.Email))
                            .append($("<td class='text-center'>").text(this.Sede))
                        );
                    });

                    $("#itemDocenteTable").DataTable();

                    if (contador == 0) {
                        $(".btnPreCargar").attr("href", "#").removeAttr("disabled").removeClass("disabled").addClass("btnCargar");
                    }
                    else {
                        alert(false, "Algunos datos del archivo no tienen el formato correcto");
                        $(".btnPreCargar").attr("href", "javascript:void(0)").attr("disabled", true).addClass("disabled").removeClass("btnCargar");
                    }

                    $("#modalRedireccionar").modal("hide");
                },
                error: function (result) {
                    $("#modalRedireccionar").modal("hide");
                }
            });
        });

        $(document).on("click", ".btnCargar", function () {
            $("#modalRedireccionar").modal({
                backdrop: 'static'
            });

            $.ajax({
                url: '/Docente/CargarDocentes',
                type: "POST",
                data: { __RequestVerificationToken: $("input[name=__RequestVerificationToken]").val(), listaDetalle: listaDetalle },
                success: function (result) {
                    if (result.success) {
                        $("#formUpload")[0].reset();
                        $(".btnPreCargar").attr("href", "javascript:void(0)").attr("disabled", true).addClass("disabled").removeClass("btnCargar");
                    }
                    else {
                        $(".btnPreCargar").attr("href", "#").removeAttr("disabled").removeClass("disabled").addClass("btnCargar");
                    }

                    $("#modalRedireccionar").modal("hide");
                },
                error: function (result) {
                    $("#modalRedireccionar").modal("hide");
                }
            });
        });

        $(document).on("click", ".btnRegresar", function () {
            window.location = "/Docente/Index";
        });

    });

}

