function UsuarioVD() {
    var objOwner = this;
    var crearUsu = true;
    var nroDNI = null;
    var searchDNI = true;
    var validDNI = true;
    var existsDNI = false;

    /*objOwner.CodigoAlmacen = 0;*/

    var formNuevo = document.querySelectorAll("#formularioUsuario");

    $("#btnCrearUsuario").on("click", function () {

        if (!formNuevo[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formNuevo[0].classList.add("was-validated");

    });

    ListarUsuarios();    

    function LimpiarUsuario() {
        /*$("#txtCodigo").val("");*/
        $("#txtDni").val("");
        $("#cboSede").val("");
        $("#txtNombres").val("");
        $("#txtApellidoPaterno").val("");
        $("#txtApellidoMaterno").val("");
        $("#txtEmail").val("");
        $("#txtTelefono").val("");
        $("#cboRol").val("");
        $("#txtLogin").val("");
        $("#txtPassword").val("");
        $("#txtConfirmarPassword").val("");


        $("#formularioUsuario").removeClass("was-validated");
    }

    $("#btnLoadingDNI").on("click", function () {
        if ($("#txtDni").val().length == 8) {
            BuscarUsuario();
        }
    });

    $("#txtDni").on("keyup", function (e) {
        if (e.which == 13 && $("#txtDni").val().length == 8) {
            BuscarUsuario();
        }
    });

    function HabilitarUsuario(flag) {
        if (!flag) {
            $("#txtDni").attr("readonly", true);
            $("#cboSede").attr("readonly", true);
            $("#txtEmail").attr("readonly", true);
            $("#txtTelefono").attr("readonly", true);
            $("#generoF").attr("readonly", true);
            $("#generoM").attr("readonly", true);
            $("#cboRol").attr("readonly", true);
            $("#txtPassword").attr("readonly", true);
            $("#txtConfirmarPassword").attr("readonly", true);
            $("#btnCrearUsuario").attr("disabled", "disabled");
        } else {
            $("#txtDni").removeAttr("readonly");
            $("#cboSede").removeAttr("readonly");
            $("#txtEmail").removeAttr("readonly");
            $("#txtTelefono").removeAttr("readonly");
            $("#generoF").removeAttr("readonly");
            $("#generoM").removeAttr("readonly");
            $("#cboRol").removeAttr("readonly");
            $("#txtPassword").removeAttr("readonly");
            $("#txtConfirmarPassword").removeAttr("readonly");
            $("#btnCrearUsuario").removeAttr("disabled");
        }
    }

    function BuscarUsuario() {
        $("#btnCrearUsuario").removeAttr("disabled");
        $("#txtDni-error").remove();

        HabilitarUsuario(false);
        $("#btnLoadingDNI span").removeClass("fa-search").addClass("fa-spinner").addClass("fa-spin");

        $.post('/Usuario/BuscarDni', { Dni: $("#txtDni").val() }, function (result) {
            console.log(result.usuario);
            validDNI = result.valid;
            existsDNI = result.exists;

            if (result.success) {
                if (result.persona.Nombres == "") {
                    $("#txtNombres").val("");
                    $("#txtApellidoPaterno").val("");
                    $("#txtApellidoMaterno").val("");
                }
                else {
                    $("#txtNombres").val(result.persona.Nombres).parents("div.form-group").removeClass("has-error");
                    $("#txtApellidoPaterno").val(result.persona.ApellidoPaterno.trim()).parents("div.form-group").removeClass("has-error");
                    $("#txtApellidoMaterno").val(result.persona.ApellidoMaterno.trim()).parents("div.form-group").removeClass("has-error");
                }
            } else {
                if (validDNI && result.usuario != undefined) {
                    $("#txtNombres").val(result.usuario.Nombres).parents("div.form-group").removeClass("has-error");
                    $("#txtApellidoPaterno").val(result.usuario.ApellidoPaterno).parents("div.form-group").removeClass("has-error");
                    $("#txtApellidoMaterno").val(result.usuario.ApellidoMaterno).parents("div.form-group").removeClass("has-error");
                    $("#txtEmail").val(result.usuario.Email).attr("readonly", true).parents("div.form-group").removeClass("has-error");
                    $("#txtTelefono").val(result.usuario.Telefono).attr("readonly", true).parents("div.form-group").removeClass("has-error");
                    $("#cboSede").val(result.usuario.IdSedeInicial).attr("readonly", true).parents("div.form-group").removeClass("has-error");
                    $("#cboRol").val(result.usuario.TipoUsuario).attr("readonly", true).parents("div.form-group").removeClass("has-error");
                    $("#genero" + result.usuario.Genero).prop('checked', true);
                }
                else {
                    $("#txtNombres").attr("readonly", false);
                    $("#txtApellidoPaterno").attr("readonly", false);
                    $("#txtApellidoMaterno").attr("readonly", false);
                }
            }

            HabilitarUsuario(true);
            $("#btnLoadingDNI span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");
        }).fail(function (result) {
            validDNI = false;
            existsDNI = false;
            HabilitarUsuario(true);
            $("#btnLoadingDNI span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");
        });
    }       

    $("#txtDni").keyup(function () {
        $("#txtLogin").val($(this).val());
        if (nroDNI != $("#txtDni").val()) {
            searchDNI = true;
            validDNI = true;
            existsDNI = false;
        }
    });

    $("#nuevoUsuario").on("shown.bs.modal", function () {
        $(".alert-modal").remove();

        if (crearUsu)
            $("#cboTipoDocumento").val("Dni").trigger("change");
        /*$("#txtDni").focus().select();*/
    });

    $("#btnNuevoUsuario").click(function () {
        LimpiarUsuario();
        $("#txtDni").attr("readonly", false);
        $("#cboTipoDocumento").attr("disabled", false);
        $("#cboSedeInicial").html('<option value="0">Sin Estab. Inicial</option>');

        /*$("#txtDni").attr("readonly", true).parents("div.form-group").find(".input-group-btn").removeClass("hidden");*/

        crearUsu = true;

        $("#nuevoUsuario").find(".modal-title").html("Nuevo Usuario");
        $("#btnCrearUsuario").text("Guardar").attr("class", "btn btn-primary");
        searchDNI = true;
        validDNI = true;
        existsDNI = false;
        
    });

    function ListarUsuarios() {

        $("#usuarioTable").DataTable().destroy();
        $("#usuarioTable tbody").empty();

        $.ajax({
            url: '/Usuario/Filtrar',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#usuarioTable tbody").append($("<tr id='usuario-" + this.IdUsuario + "' data-id='" + this.IdUsuario + "'>")
                        .append($("<td class='text-center'>").text(this.Nombres))
                        .append($("<td class='text-center'>").text(this.ApellidoPaterno + ' ' + this.ApellidoMaterno))
                        .append($("<td class='text-center'>").text(this.Email))
                        .append($("<td class='text-center'>").text(this.Login))
                        .append($("<td class='text-center'>").text(this.Rol))
                        .append($("<td class='text-center'>").text(this.Telefono))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnModificarUsuario-" + this.IdUsuario + "' data-id='" + this.IdUsuario + "' data-estado='" + this.Estado + "' data-empresa='" + this.IdEmpresa + "' class='btnModificarUsuario text-lg text-success'>")
                                .append($("<i class='far fa-edit'>"))))
                        .append($("<td class='text-center'>")
                            .append($("<a id='btnAnularUsuario-" + this.IdUsuario + "' data-id='" + this.IdUsuario + "' data-estado='" + this.Estado + "' class='btnAnularUsuario text-lg text-danger'>")
                                .append($("<i class='far fa-trash-alt'>"))))
                    );
                });

                if ($("#txtrol").val() == 'Administrador') {
                    $("#usuarioTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#usuarioTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#usuarioTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#usuarioTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#usuarioTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#usuarioTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#usuarioTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#usuarioTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#usuarioTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "colReorder": true,
                        "buttons": ["colvis"]
                    }).buttons().container().appendTo('#usuarioTable_wrapper .col-md-6:eq(0)');
                }

               

                $("#nuevoUsuario").modal("hide");
            },
            //error: function (xhr, textStatus, error) {
            //    $("#modalRedireccionar").modal("hide");
            //    /*$(".content-wrapper").alerts(false, xhr.statusText);*/
            //}
        });
    }

    $("#nuevoUsuario").modal({
        backdrop: 'static'
    });

    $("#btnCrearUsuario").on("click", function () {

        if ($("#txtDni").val().length != 0 && $("#txtNombres").val().length != 0 && $("#txtApellidoPaterno").val().length != 0 && 
            $("#txtApellidoMaterno").val().length != 0 && $("#cboSede").val().length != 0 && $("#txtEmail").val().length != 0 &&
            $("#txtTelefono").val().length != 0 && $("#cboRol").val().length != 0 && $("#txtLogin").val().length != 0) {

            var token = $("#formularioUsuario").find("input[name=__RequestVerificationToken]").val();

            var usuario = {
                IdUsuario: $("#txtNombres").attr("data-id"),
                Nombres: $("#txtNombres").val(),
                ApellidoPaterno: $("#txtApellidoPaterno").val(),
                ApellidoMaterno: $("#txtApellidoMaterno").val(),
                Genero: $("input[type=radio]:checked").val(),
                IdEmpresa: $("#txtEmpresa").val(),
                IdSedeInicial: $("#cboSede").val(),
                Email: $("#txtEmail").val(),
                TipoUsuario: $("#cboRol").val(),
                Login: $("#txtLogin").val(),
                Password: $("#txtPassword").val(),
                Telefono: $("#txtTelefono").val(),
                //InicioTurno: $("#inicio_turno").val(),
                //FinTurno: $("#fin_turno").val(),
                //OtroDia: $("#txtOtroDia").val(),
            };

            if (crearUsu) {
                $("#btnCrearUsuario").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');

                $.post('/Usuario/CreateUsuario', { __RequestVerificationToken: token, usuario: usuario }, function (result) {
                    if (result.success) {
                        ListarUsuarios();
                        $("#exito").removeClass("hide").addClass("show");
                        $("#exito2").html();
                    }
                    else {
                        $("#btnCrearUsuario").removeAttr("disabled").html('Guardar');
                        $("#error").removeClass("hide").addClass("show");
                        $("#error2").html();
                    }
                });
            } else {
                $("#btnCrearUsuario").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando Cambios...');

                $.post('/Usuario/EditUsuario', { __RequestVerificationToken: token, usuario: usuario }, function (result) {
                    if (result.success) {
                        ListarUsuarios();
                        $("#informa").removeClass("hide").addClass("show");
                        $("#info").html();
                    } else {
                        $("#btnCrearUsuario").removeAttr("disabled").html('Guardar Cambios');
                        /*$("#liveToast2").removeClass("hide").addClass("show");*/
                        /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                        $("#nuevoUsuario").modal("hide");
                    }
                });
            }
        }
        $("#btnCrearUsuario").removeAttr("disabled").html('Guardar');
    });


    $(document).on("click", ".btnModificarUsuario", function () {
        /*LimpiarSede();*/
        $("#nuevoUsuario").modal("show");
        $("#formularioUsuario").removeClass("was-validated");
        $("#nuevoUsuario").find(".modal-title").html("Datos del Usuario");
        
        /*$("#cboSede").empty();*/

        var IdUsuario = $(this).attr("data-id");
        var IdEmpresa = $(this).attr("data-empresa");
        /*var IdEmpresa = (('@Session["TipoUsuario"]' == "1") ? $(this).attr("data-empresa") : 0);*/

        $.post('/Usuario/VerUsuario', { IdUsuario: IdUsuario, IdEmpresa: IdEmpresa  }, function (data) {
            
            /*$("#formularioUsuario").prepend('<input type="hidden" name="IdUsuario" id="IdUsuario" value="' + data.IdUsuario + '" />');*/

            $("#txtNombres").val(data.Nombres).attr("data-id", IdUsuario);
            $("#txtApellidoPaterno").val(data.ApellidoPaterno);
            $("#txtApellidoMaterno").val(data.ApellidoMaterno);
            $("#txtEmail").val(data.Email);
            $("#txtTelefono").val(data.Telefono);
            $("#cboRol").val(data.TipoUsuario);
            $("#txtDni").val(data.Login);
            $("#txtLogin").val(data.Login);
            $("#genero" + data.Genero).prop('checked', true);
            $("#txtOtroDia").val(data.OtroDia);
            $("#cboSede").val(data.IdSedeInicial);
            //$("#txtPassword").val(data.Password);
            //$("#txtConfirmarPassword").val(data.Password);

            $("#txtPassword").removeAttr("required");
            $("#txtConfirmarPassword").removeAttr("required");

            //$("#txtPassword").val("");
            //$("#txtConfirmarPassword").val("");

            $("#txtDni").attr("readonly", true).parents("div.form-group").find("#btnLoadingDNI").addClass("hidden");            

            $("#cboTipoDocumento").attr("disabled", true).val(data.Login.length == 8 || data.Login.length == null ? "Dni" : "otros").trigger("change");

            crearUsu = false;

            searchDNI = true;
            validDNI = true;
            existsDNI = false;            

            $("#btnCrearUsuario").text("Guardar Cambios").attr("class", "btn btn-warning");
        });
        /*LimpiarSede();*/

    });

    $("#cboTipoDocumento").on("change", function () {
        if ($(this).val() == "Dni") {
            $("#txtNombres").attr("readonly", true);
            $("#txtApellidoPaterno").attr("readonly", true);
            $("#txtApellidoMaterno").attr("readonly", true);

            $("#txtDni").attr("maxlength", "8");
            $("#btnLoadingDNI").attr("disabled", false);
        }
        else {
            $("#txtNombres").attr("readonly", false);
            $("#txtApellidoPaterno").attr("readonly", false);
            $("#txtApellidoMaterno").attr("readonly", false);

            $("#txtDni").removeAttr("maxlength");
            $("#btnLoadingDNI").attr("disabled", true);
        }
    });

    $(document).on("click", ".btnAnularUsuario", function () {
        $("#IdUsuario-d").val($(this).attr("data-id"));
        $("#eliminarUsuario").modal("toggle");
    });

    $("#btnConfEliminarUsuario").click(function () {
        $("#btnConfEliminarUsuario").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Eliminando...');

        $.post('/Usuario/DeleteUsuario', $("#formularioUsuarioD").serialize(), function (result) {
            if (result.success) {
                ListarUsuarios();
                $("#elimina").removeClass("hide").addClass("show");
                $("#elim").html();
            } else {
                $("#btnConfEliminarUsuario").removeAttr("disabled").html('Eliminar');
                /*$("#liveToast2").removeClass("hide").addClass("show");*/
                /*window.alert(false, "Error: " + result.message);*/
                /*$(".content-wrapper").alerts(false, "Error: " + result.message);*/
                /*$("#eliminarSede").modal("hide");*/
            }
        });
        $("#eliminarUsuario").modal("hide");
        $("#btnConfEliminarUsuario").removeAttr("disabled").html('Eliminar');
    });

    $.getJSON('/Usuario/CargarSedes', function (data) {
        sedes = data;

        $.each(data, function () {
            $("select#cboSede").append($('<option value="' + this.IdSede + '">' + this.Nombre + '</option>'));
        });

    });

    $.post('/Usuario/CargarRol', function (data) {
        roles = data;

        $.each(data, function () {
            $("select#cboRol").append($('<option value="' + this.IdRol + '">' + this.Descripcion + '</option>'));
        });
    });

}