function PerfilVD() {
    var bo1 = document.querySelectorAll("#formularioUsuario");
    var bo2 = document.querySelectorAll("#formularioEmpresa");

    $("#btnEditarUser").click(function () {
        if (!bo1[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        bo1[0].classList.add("was-validated");
    });

    $("#btnEditarEmpresa").click(function () {
        if (!bo2[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        bo2[0].classList.add("was-validated");
    });

    $("#btnEditarUser").on("click", function () {
        $("#formularioUsuario").removeClass("was-validated");
        $("#editarUsuario").modal("toggle");
        $('#fotoUser').val("");
        $("#txtFileUpload").val("");
    });
    
    /*$("#cboDepartamento").append($("<option style='text - align: center'>").val(this.IdDepartamento).text(this.Nombre));*/
    $.getJSON('/Home/CargarDepartamentos', function (data) {
        $.each(data, function () {
            $("#cboDepartamento").append($('<option value="' + this.IdDepartamento + '">' + this.Nombre + '</option>'));
        });
        $("#cboDepartamento option:contains(" + $("#txtdepa").val() + ")").attr("selected", true);
    });

    $("#cboDepartamento").on("change", function () {        
        $("#cboProvincia").empty();
        /*$("#cboProvincia").append($("<option style='text - align: center'>").val("").text("-- Seleccionar Provincia --"));*/
        $.getJSON('/Home/CargarProvincias', { IdDepartamento: $(this).val() }, function (data) {
            $.each(data, function () {
                $("#cboProvincia").append($('<option value="' + this.IdProvincia + '" data-ubigeo="' + this.Codigo + '">' + this.Nombre + '</option>'));
                
            });
        });
    });

    $("#cboProvincia").on("change", function () {
        $("#cboDistrito").empty();
        /*$("#cboDistrito").append($("<option style='text - align: center'>").val("").text("-- Seleccionar Distrito --"));*/
        $.getJSON('/Home/CargarDistritos', { IdProvincia: $(this).val() }, function (data) {
            $.each(data, function () {
                $("#cboDistrito").append($('<option value="' + this.IdDistrito + '" data-ubigeo="' + this.Codigo + '">' + this.Nombre + '</option>'));
            });
        })
    });

    $("#cboDistrito").on("change", function () {
        $("#txtUbigeo").val($("#cboDistrito option:selected").attr("data-ubigeo"));
    });

    $("#btnEditarEmpresa").on("click", function (data) {
        $("#formularioEmpresa").removeClass("was-validated");
        $("#editarEmpresa").modal("toggle");
        $("#cboDepartamento").val("");
    });

    $("#txtFileUpload").change(function (event) {
        if (event.target.files[0].size < 600000) {
            var name = URL.createObjectURL(event.target.files[0]);
            $("#imagenUser").attr("src", name);
            var foto = $(this).val().split('\\');
            $('#fotoUser').val(foto[2]);
        }
        else {
            $("#editarUsuario .modal-body").alertsModal(false, "Error: El Archivo no debe pesar mas de 600 KB");
            return false;
        }
    });

    $("#txtFileEmpresa").change(function (event) {
        var name = URL.createObjectURL(event.target.files[0]);
        $("#imagenEmpresa").attr("src", name);
        var foto = $(this).val().split('\\');
        $('#fotoEmpresa').val(foto[2]);
    });

    $("#btnEditarU").click(function () {
        $("#btnEditarU").attr("disabled", "disabled").html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');
        var formData = new FormData();
        formData.append('__RequestVerificationToken', $("#formularioUsuario").find("input[name=__RequestVerificationToken]").val());
        formData.append('Dni', $("#dniUser").val());
        formData.append('Genero', $("#formularioUsuario input:radio[name=genero]:checked").val());
        formData.append('Email', $("#txtemail").val());
        formData.append('PreFoto', $("#prefotoUser").val());
        formData.append('Foto', $("#formularioUsuario").find('input[type=file]')[0].files[0]);

        $.ajax({
            url: '/Admin/EditPerfil',
            data: formData,
            type: 'POST',
            contentType: false,
            processData: false,
            success: function (result) {
                if (result.success) {
                    location.reload();
                } else {
                    $("#btnEditarU").removeAttr("disabled").html('Guardar');
                }
            },
            error: function (result) {
                $("#btnEditarU").removeAttr("disabled").html('Guardar');
            }
        });
    });

    $("#btnEditarE").click(function () {
        $("#btnEditarE").attr("disabled", true).html('<span class="fa fa-spinner fa-spin"></span>\u00a0\u00a0 Guardando...');
        var formData = new FormData();
        formData.append('__RequestVerificationToken', $("#formularioEmpresa").find("input[name=__RequestVerificationToken]").val());
        formData.append('Ruc', $("#rucEmpresa").val());
        formData.append('Direccion', $("#txtDireccion").val());
        formData.append('Telefono', $("#txtTelefono").val());
        formData.append('Correo', $("#txtCorreo").val());
        formData.append('Ubigeo', $("#txtUbigeo").val());
        formData.append('PreLogo', $("#prefotoEmpresa").val());
        formData.append('Logo', $("#formularioEmpresa").find('input[type=file]')[0].files[0]);

        $.ajax({
            url: '/Admin/EditEmpresa',
            data: formData,
            type: 'POST',
            contentType: false,
            processData: false,
            success: function (result) {
                if (result.success) {
                    location.reload();
                } else {
                    $("#btnEditarE").removeAttr("disabled").html('Guardar');
                }
            },
            error: function (result) {
                $("#btnEditarE").removeAttr("disabled").html('Guardar');
            }
        });
    });
    
       

}
