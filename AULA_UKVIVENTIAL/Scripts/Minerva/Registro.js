function RegistroVD() {

    var searchVisible = 0;
    var transparent = true;
    var mobile_device = false;

    var nroRUC = null;
    var validRUC = true;
    var existsRUC = false;
    var nroDNI = null;
    var validDNI = true;
    var intento = 0;
    var errorSunat = true;

    var formCorr = document.querySelectorAll("#formularioRegistro");

    $("#btnnext").on("click", function () {
        if ($("#txtRuc").val().length == 0 || $("#cboDepartamento").val().length == 0 || $("#cboProvincia").val().length == 0 || $("#cboDistrito").val().length == 0
            || $("#txtTelefono").val().length == 0 || $("#txtDireccion").val().length == 0 || $("#txtCorreo").val().length == 0) {
            if (!formCorr[0].checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            formCorr[0].classList.add("was-validated");
        }
        else {
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            current_fs.removeClass("active")

            current_btn = $(".nav-link.active")
            current_btn.removeClass("active")

            next_btn = current_btn.parent().next().children("button")
            next_btn.addClass("active")

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({ opacity: 0 }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;
                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({ 'opacity': opacity });
                },
                duration: 600
            });
        }
      
    });

    $("#btnNext").on("click", function () {
        if ($("#txtDni").val().length == 0 || $("#txtAPaterno").val().length == 0 || $("#txtAMaterno").val().length == 0 || $("#txtNombres").val().length == 0
            || $("#txtEmail").val().length == 0 || $("#txtPassword1").val().length == 0 || $("#txtPassword2").val().length == 0) {
            if (!formCorr[0].checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            formCorr[0].classList.add("was-validated");
        }
        else {
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            current_fs.removeClass("active")

            current_btn = $(".nav-link.active")
            current_btn.removeClass("active")

            next_btn = current_btn.parent().next().children("button")
            next_btn.addClass("active")

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({ opacity: 0 }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;
                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({ 'opacity': opacity });
                },
                duration: 600
            });
        }

        //}
    });

    $("#btnFinish").on("click", function () {
        $("#agree-error").removeAttr("error");
        if ($("#cboIndformante").val().length == 0 || $("#agree").select == false) {
            if (!formCorr[0].checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            formCorr[0].classList.add("was-validated");
        }
        else {
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            current_fs.removeClass("active")

            current_btn = $(".nav-link.active")
            current_btn.removeClass("active")

            next_btn = current_btn.parent().next().children("button")
            next_btn.addClass("active")

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({ opacity: 0 }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;
                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({ 'opacity': opacity });
                },
                duration: 600
            });
        }

        //}
    });

    $(".previous").on("click", function () {
        current_fs = $(this).parent();
        prev_fs = $(this).parent().prev();
        current_fs.removeClass("active")

        current_btn = $(".nav-link.active")
        current_btn.removeClass("active")

        prev_btn = current_btn.parent().prev().children("button")
        prev_btn.addClass("active")

        prev_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                prev_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
    });


    
    //jQuery.validator.addMethod("rucvalid", function (value, element) {
    //    return validRUC;
    //}, "Nro. de RUC no válido.");

    //jQuery.validator.addMethod("rucnoexists", function (value, element) {
    //    return !existsRUC;
    //}, "Este RUC ya se encuentra registrado.");

    //jQuery.validator.addMethod("dnivalid", function (value, element) {
    //    return validDNI;
    //}, "Nro. de DNI no válido.");

    $.getJSON('/Home/CargarDepartamentos', function (data) {
        console.log(data);
        departamentos = data;
        $.each(data, function () {
            $("select#cboDepartamento").append($('<option value="' + this.IdDepartamento + '">' + this.Nombre + '</option>'));
        });
    });    

    $("#cboDepartamento").on("change", function () {
        $.getJSON('/Home/CargarProvincias', { IdDepartamento: $(this).val() }, function (data) {
            $("#cboProvincia").empty();
            $("#cboProvincia").append($("<option>").val("").text("Seleccionar Provincia"));
            $.each(data, function () {
                $("select#cboProvincia").append($('<option value="' + this.IdProvincia + '">' + this.Nombre + '</option>'));
            });
        });
    });

    $("#cboProvincia").on("change", function () {
        $.getJSON('/Home/CargarDistritos', { IdProvincia: $(this).val() }, function (data) {
            $("#cboDistrito").empty();
            $("#cboDistrito").append($("<option>").val("").text("Seleccionar Distrito"));
            $.each(data, function () {
                $("select#cboDistrito").append($('<option value="' + this.IdDistrito + '">' + this.Nombre + '</option>'));
            });
        });
    });

    $('.wizard-card').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',

        onNext: function (tab, navigation, index) {
            var $valid = $('.wizard-card form').valid();
            if (!$valid) {
                $validator.focusInvalid();
                return false;
            }
        },

        onInit: function (tab, navigation, index) {
            //check number of tabs and fill the entire row
            var $total = navigation.find('li').length;
            var $wizard = navigation.closest('.wizard-card');

            $first_li = navigation.find('li:first-child a').html();
            $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
            $('.wizard-card .wizard-navigation').append($moving_div);

            refreshAnimation($wizard, index);

            $('.moving-tab').css('transition', 'transform 0s');
        },

        onTabClick: function (tab, navigation, index) {
            var $valid = $('.wizard-card form').valid();

            if (!$valid) {
                return false;
            } else {
                return true;
            }
        },

        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;

            var $wizard = navigation.closest('.wizard-card');

            // If it's the last tab then hide the last button and show the finish instead
            if ($current >= $total) {
                $($wizard).find('.btn-next').hide();
                $($wizard).find('.btn-finish').show();
            } else {
                $($wizard).find('.btn-next').show();
                $($wizard).find('.btn-finish').hide();
            }

            button_text = navigation.find('li:nth-child(' + $current + ') a').html();

            setTimeout(function () {
                $('.moving-tab').text(button_text);
            }, 150);

            var checkbox = $('.footer-checkbox');

            if (!index == 0) {
                $(checkbox).css({
                    'opacity': '0',
                    'visibility': 'hidden',
                    'position': 'absolute'
                });
            } else {
                $(checkbox).css({
                    'opacity': '1',
                    'visibility': 'visible'
                });
            }

            $("html, body").animate({ scrollTop: 0 }, 600);
            if ($("#empresa").hasClass("active")) $("#txtRuc").focus();
            if ($("#representante").hasClass("active")) $("#txtDni").focus();

            refreshAnimation($wizard, index);
        }
    });

    $("#txtCorreo").change(function () {
        $("#txtEmail").val($(this).val());
    });

    $("#txtCorreo").blur(function () {
        $("#txtEmail").val($(this).val());
    });

    $("#btnLoadingRUC").on("click", function () {
        if ($("#txtRuc").val().length == 11) {
            consultarRUC();
        }
    });

    $("#btnLoadingDNI").on("click", function () {
        if ($("#txtDni").val().length == 8) {
            consultarDNI();
        }
    });

    $("#txtRuc").on("keyup", function (e) {
        if (e.which == 13 && $("#txtRuc").val().length == 11) {
            consultarRUC();
        }
    });

    $("#txtDni").on("keyup", function (e) {
        if (e.which == 13 && $("#txtDni").val().length == 8) {
            consultarDNI();
        }
    });

    function consultarRUC() {
        /*$("#txtRuc-error").remove();*/

        HabilitarEmpresa(false);
        $("#btnLoadingRUC span").removeClass("fa-search").addClass("fa-spinner").addClass("fa-spin");

        $.getJSON('/Home/ValidarRuc', { Ruc: $("#txtRuc").val() }, function (result) {
            validRUC = result.valid;
            existsRUC = result.exists;
            /*departamentos = result;*/

            /*$("#txtRuc-error").remove();*/

            if (validRUC) {
                if (existsRUC) {
                    $("#txtRuc").parents("div.form-group").append('<label id="txtRuc-error" class="error text-danger" for="txtRuc">Este RUC ya se encuentra registrado.</label>');
                }
            } else {
                $("#txtRuc").parents("div.form-group").append('<label id="txtRuc-error" class="error text-danger" for="txtRuc">Nro. de RUC no válido.</label>');
            }

            if (result.success) {
                if (result.persona.RazonSocial == "") {
                    $("#txtRazonSocial").val("").parents("div.form-group").removeClass("is-focused").addClass("is-empty");
                    $("#cboDepartamento").val("").parents("div.form-group").removeClass("is-focused").addClass("is-empty");
                    $("#cboProvincia").html('<option value=""></option>').parents("div.form-group").removeClass("is-focused").addClass("is-empty");
                    $("#cboDistrito").html('<option value=""></option>').parents("div.form-group").removeClass("is-focused").addClass("is-empty");
                    $("#txtDireccion").val("").parents("div.form-group").removeClass("is-focused").addClass("is-empty");
                    $("#txtTelefono").val("").parents("div.form-group").removeClass("is-focused").addClass("is-empty");
                } else {
                    $("#txtRazonSocial").val(result.persona.RazonSocial).parents("div.form-group").addClass("is-focused").removeClass("is-empty").removeClass("has-error");
                    $("#txtTelefono").val(result.persona.Telefono).parents("div.form-group").addClass("is-focused").removeClass("is-empty").removeClass("has-error");

                    if (result.persona.Departamento != "") {
                        $.each(departamentos, function () {
                            var nombre = this.NombreSunat;

                            if (nombre?.includes(result.persona.Departamento)) {
                                $("select#cboDepartamento option:contains(" + this.Nombre + ")").attr("selected", true);

                                $.getJSON('/Home/CargarProvincias', { IdDepartamento: $("#cboDepartamento").val() }, function (data) {
                                    $("#cboProvincia").empty();
                                    $("#cboProvincia").append($("<option>").val("").text(""));

                                    $.each(data, function () {
                                        $("select#cboProvincia").append($('<option value="' + this.IdProvincia + '">' + this.Nombre + '</option>'));

                                        if (this.NombreSunat == result.persona.Provincia) {
                                            $("select#cboProvincia option:contains(" + this.Nombre + ")").attr("selected", true);

                                            $.getJSON('/Home/CargarDistritos', { IdProvincia: $("#cboProvincia").val() }, function (data) {
                                                $("#cboDistrito").empty();
                                                $("#cboDistrito").append($("<option>").val("").text(""));
                                                $.each(data, function () {
                                                    $("select#cboDistrito").append($('<option value="' + this.IdDistrito + '">' + this.Nombre + '</option>'));

                                                    if (this.NombreSunat == result.persona.Distrito) {
                                                        $("select#cboDistrito option:contains(" + this.Nombre + ")").attr("selected", true);

                                                        $("#cboDepartamento").parent("div.label-floating").addClass("is-focused").removeClass("is-empty").removeClass("has-error");
                                                        $("#cboProvincia").parent("div.label-floating").addClass("is-focused").removeClass("is-empty").removeClass("has-error");
                                                        $("#cboDistrito").parent("div.label-floating").addClass("is-focused").removeClass("is-empty").removeClass("has-error");
                                                        $("#txtDireccion").val(result.persona.DireccionCorta.substring(0, result.persona.DireccionCorta.length - nombre.length).trim()).parent("div.label-floating").addClass("is-focused").removeClass("is-empty").removeClass("has-error");
                                                    }
                                                });
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    } else {
                        if ($("#txtRuc").val().substring(0, 2) == "10") {
                            $.getJSON('/Home/BuscarReniec', { DNI: $("#txtRuc").val().substring(2, 10) }, function (result) {
                                if (result.persona.Departamento != "") {
                                    $("#txtDni").val(result.persona.Dni).parents("div.form-group").addClass("is-focused").removeClass("is-empty");
                                    $("#txtNombres").val(result.persona.Nombres).parents("div.form-group").addClass("is-focused").removeClass("is-empty");
                                    $("#txtApellidoP").val(result.persona.ApellidoPaterno).parents("div.form-group").addClass("is-focused").removeClass("is-empty");
                                    $("#txtApellidoM").val(result.persona.ApellidoMaterno).parents("div.form-group").addClass("is-focused").removeClass("is-empty");

                                    $.each(departamentos, function () {
                                        var nombre = this.NombreSunat;
                                        if (nombre.includes(result.persona.Departamento)) {
                                            $("select#cboDepartamento option:contains(" + this.Nombre + ")").attr("selected", true);

                                            $.getJSON('/Home/CargarProvincias', { IdDepartamento: $("#cboDepartamento").val() }, function (data) {
                                                $("#cboProvincia").empty();
                                                $("#cboProvincia").append($("<option>").val("").text(""));

                                                $.each(data, function () {
                                                    $("select#cboProvincia").append($('<option value="' + this.IdProvincia + '">' + this.Nombre + '</option>'));

                                                    if (this.NombreSunat == result.persona.Provincia) {
                                                        $("select#cboProvincia option:contains(" + this.Nombre + ")").attr("selected", true);

                                                        $.getJSON('/Home/CargarDistritos', { IdProvincia: $("#cboProvincia").val() }, function (data) {
                                                            $("#cboDistrito").empty();
                                                            $("#cboDistrito").append($("<option>").val("").text(""));
                                                            $.each(data, function () {
                                                                $("select#cboDistrito").append($('<option value="' + this.IdDistrito + '">' + this.Nombre + '</option>'));

                                                                if (this.NombreSunat == result.persona.Distrito) {
                                                                    $("select#cboDistrito option:contains(" + this.Nombre + ")").attr("selected", true);

                                                                    $("#cboDepartamento").parent("div.label-floating").addClass("is-focused").removeClass("is-empty").removeClass("has-error");
                                                                    $("#cboProvincia").parent("div.label-floating").addClass("is-focused").removeClass("is-empty").removeClass("has-error");
                                                                    $("#cboDistrito").parent("div.label-floating").addClass("is-focused").removeClass("is-empty").removeClass("has-error");
                                                                    $("#txtDireccion").val(result.persona.Direccion.substring(0, result.persona.Direccion.length - nombre.length).trim()).parent("div.label-floating").addClass("is-focused").removeClass("is-empty").removeClass("has-error");
                                                                }
                                                            });
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        if (result.persona.DireccionCorta != "") $("#txtDireccion").val(result.persona.DireccionCorta).parent("div.label-floating").addClass("is-focused").removeClass("is-empty");
                        if (result.persona.Telefono != "") $("#txtTelefono").val(result.persona.Telefono).parent("div.label-floating").addClass("is-focused").removeClass("is-empty");
                    }
                }

                intento = 0;
            }
            else {
                //if (intento <= 2) {
                //    intento = intento + 1;
                //    consultarRUC();
                //}
                //else {
                //    intento = 0;
                //}
                if (errorSunat) {
                    $("#txtRazonSocial").removeAttr("readonly");
                }
            }

            //intento = 0;
            HabilitarEmpresa(true);
            $("#btnLoadingRUC span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");
        }).error(function (result) {
            validRUC = false;
            existsRUC = false;
            HabilitarEmpresa(true);
            $("#btnLoadingRUC span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");
        });
    }

    function HabilitarEmpresa(flag) {
        if (!flag) {
            $("#txtRuc").attr("readonly", true);
            $("#cboDepartamento").attr("readonly", true);
            $("#cboProvincia").attr("readonly", true);
            $("#cboDistrito").attr("readonly", true);
            $("#txtTelefono").attr("readonly", true);
            $("#txtDireccion").attr("readonly", true);
            $("#txtCorreo").attr("readonly", true);
        } else {
            $("#txtRuc").removeAttr("readonly");
            $("#cboDepartamento").removeAttr("readonly");
            $("#cboProvincia").removeAttr("readonly");
            $("#cboDistrito").removeAttr("readonly");
            $("#txtTelefono").removeAttr("readonly");
            $("#txtDireccion").removeAttr("readonly");
            $("#txtCorreo").removeAttr("readonly");
        }
    }


    function consultarDNI() {
        $("#btnLoadingDNI span").removeClass("fa-search").addClass("fa-spinner").addClass("fa-spin");
        $(".alert-modal").remove();

        $.getJSON('/Home/BuscarReniec', { DNI: $("#txtDni").val() }, function (result) {
            console.log(result);
            if (result.success) {
                if (result.persona != undefined) {
                    if (result.persona.Nombres == "") {
                        $("#txtNombres").val("");
                        $("#txtAPaterno").val("");
                        $("#txtAMaterno").val("");
                    }
                    else {
                        $("#txtNombres").val(result.persona.Nombres);
                        $("#txtAPaterno").val(result.persona.ApellidoPaterno);
                        $("#txtAMaterno").val(result.persona.ApellidoMaterno);
                    }
                }
            }
            else {
                /*$("#nuevoTecnico div.modal-body").alertsModal(false, result.message);*/
                $("#error3").removeClass("hide").addClass("show");
                $("#error4").html();
                $(".alert-modal").css("margin-bottom", "20px");

                $("#txtDni").val("");
                $("#txtAPaterno").val("");
                $("#txtAMaterno").val("");
            }

            $("#btnLoadingDNI span").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin");
        });
    }

    $(".btn-finish").click(function () {
        if (!$("#formularioRegistro").valid()) return false;

        $(".btn-finish").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Registrando...');

        var token = $("input[name=__RequestVerificationToken]").val();

        var empresa = {
            Ruc: $("#txtRuc").val(),
            RazonSocial: $("#txtRazonSocial").val(),
            Direccion: $("#txtDireccion").val(), 
            Telefono: $("#txtTelefono").val(),
            Correo: $("#txtCorreo").val(),
            Informante: $("#cboIndformante").val(),
            Dni: $("#txtDni").val(),
            NombreRL: $("#txtNombres").val(),
            ApellidoPRL: $("#txtAPaterno").val(),
            ApellidoMRL: $("#txtAMaterno").val(),
            Codigo: $("#txtCodigo").val(),
        }

        var usuario = {
            Nombres: $("#txtNombres").val(),
            ApellidoPaterno: $("#txtAPaterno").val(),
            ApellidoMaterno: $("#txtAMaterno").val(),
            Email: $("#txtEmail").val(),
            Login: $("#txtDni").val(),
            Password: $("#txtPassword1").val()
        }

        var ubigeo = $("#cboDistrito option:selected").val();

        $.post('/Home/Create', { __RequestVerificationToken: token, empresa: empresa, usuario: usuario, IdUbigeo: ubigeo }, function (result) {
            console.log(result);
            if (result.success) {
                window.location.href = '/Home/Login';
            }
            else {
                $(".btn-finish").removeAttr("disabled").html('Registrar');
                $("#div-alerts").alertsModal(false, "Error: " + result.message);
            }
        }).fail(function (result) {
            $(".btn-finish").removeAttr("disabled").html('Registrar');
            $("#div-alerts").alertsModal(false, "Error: " + result.message);
        });
    });

    $("#txtIdEmpresa").val(IdEmpresa)

    $("#btnnext").click(function () {
        /*$("#formularioRegistro").removeClass("was-validated");*/
        /*$("#error").removeClass("show").addClass("hide");*/
        $.getJSON('/Home/BuscarCorrelativoEmpresa', function (data) {
            console.log(data)
            if (data != "") {
                var num = parseInt(data);
                num++;
                Codigo = ("0000" + num).slice(-4);
            }
            else
                Codigo = "0001";
            $("#txtCodigo").val(Codigo);
        });

        $(".btn-finish").text("Guardar").attr("class", "btn btn-primary");

    });
}