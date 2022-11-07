//Creamos la instancia
var valores = this;
const urlParams = new URLSearchParams(valores);
/*Accedemos a los valores*/
var idAula = urlParams.get('idAula');

function ListaAlumnosVD() {
    var objListaAlumnos = this;
    var bo1 = document.querySelectorAll("#formularioCambio");
   
    $("#btnCambioEstado").click(function () {
        if (!bo1[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        bo1[0].classList.add("was-validated");
    });

    if ($("#txtrol").val() == 'Administrador') {
        $("#itemmatriaulaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Supervisor') {
        $("#itemmatriaulaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner') {
        $("#itemmatriaulaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Partner sin Ventas') {
        $("#itemmatriaulaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
    }
    if ($("#txtrol").val() == 'Profesor') {
        $("#itemmatriaulaTable").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "scrollX": true,
            "colReorder": true,
            "buttons": ["colvis"]
        }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
    }
    
    $("#modalCambiarEstado").modal({
        backdrop: 'static'
    });

    var AlumnosCheck = [];
    $(document).on("click", "#btncambiarEstado", function () {
        $("#modalCambiarEstado").modal("toggle");
        AlumnosCheck = []
        $("#itemmatriaulaTable tbody tr").each(function () {
            var VarIdAlumno = $(this).children("td.idalumno").text().trim();
            var VarIdNivel = $(this).children("td.idnivel").text().trim();
            console.log(VarIdNivel);
            var VarIdCiclo = $(this).children("td.idciclo").text().trim();
            activar = $('#chkidAl-' + VarIdAlumno).prop('checked')
            if (activar) {
                AlumnosCheck.push({
                    IdAlumno: $(this).children("td.idalumno").text().trim(),
                    Nombres: $(this).children("td.nombres").text().trim(),
                    idnivel: $(this).children("td.idnivel").text().trim(),
                    nivel: $(this).children("td.nivel").text().trim(),
                    idciclo: $(this).children("td.idciclo").text().trim(),
                    ciclo: $(this).children("td.ciclo").text().trim(),
                    estadoname: $(this).children("td.estado").text(),
                });
                $("#btnCambioEstado").on("click", function () {
                    var estadona = $("#cboEstado option:selected").val();;
                    $.post('/Aula/CambiarEstadoAlumno', { estadom: estadona, IdAlumno: VarIdAlumno, idnivel: VarIdNivel, idciclo: VarIdCiclo }, function (result) {
                        if (result.success) {
                            filtraralumnos();                           
                        }
                        
                    });
                });
                
            }
        });
    });


    function filtraralumnos() {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var idaula = urlParams.get('idAula');
        var mes, idperio, nivel, ciclo;
        mes = ($("#mesecito").val() == "") ? '' : $("#mesecito").val();
        ciclo = ($("#ciclos").val() == "") ? 0 : $("#ciclos").val();
        nivel = ($("#niveles").val() == "") ? 0 : $("#niveles").val();
        idperio = ($("#periodos").val() == "") ? 0 : $("#periodos").val();

        $("#itemmatriaulaTable").DataTable().destroy();
        $("#itemmatriaulaTable tbody").empty();
        $.ajax({
            url: '/Aula/FiltrarAlumnoAula',
            data: {
                mes: mes,
                ciclo: ciclo,
                nivel: nivel,
                idperio: idperio,
                idaula: idaula,

            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#itemmatriaulaTable").append($("<tr id='alumno-" + this.IdAlumno + "'>")
                        .append($("<td class='text-center verificar'>")
                            .append($("<input class='form-check-input verificadito' id='chkidAl-" + this.IdAlumno + "' data-idAlumno=" + this.IdAlumno + " type='checkbox' name='select'>")))
                        .append($("<td class='text-center idalumno' >").text(this.IdAlumno))
                        .append($("<td class='text-center nombres'>").text(this.Nombres))
                        .append($("<td class='text-center idnivel' hidden >").text(this.idnivel))
                        .append($("<td class='text-center nivel'>").text(this.nivel))
                        .append($("<td class='text-center idciclo' hidden >").text(this.idciclo))
                        .append($("<td class='text-center ciclo'>").text(this.ciclo))
                        .append($("<td class='text-center'>")
                            .append($('<span class="badge badge-light" id="lblEstado-Edit-' + this.IdAlumno + '">').attr('style', 'color: #FFFFFF; font-weight: 400; font-size: 12px; background-color:' + this.color + ' !important').html(this.estadoname)))
                    );

                });

                if ($("#txtrol").val() == 'Administrador') {
                    $("#itemmatriaulaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]

                    }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Supervisor') {
                    $("#itemmatriaulaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["excel", "pdf", "print", "colvis"]

                    }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner') {
                    $("#itemmatriaulaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]

                    }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Partner sin Ventas') {
                    $("#itemmatriaulaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]

                    }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
                }
                if ($("#txtrol").val() == 'Profesor') {
                    $("#itemmatriaulaTable").DataTable({
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false,
                        "colReorder": true,
                        "scrollCollapse": true,
                        "scrollX": true,
                        "buttons": ["colvis"]

                    }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
                }
                $("#modalCambiarEstado").modal("hide");
                $('.modal-backdrop').remove();
                $('#allcb').prop('checked', false);
            },
        });
        /*$("#modalCambiarEstado").modal("hide");*/
    }

    $("#btnFiltrar").on("click", function () {
        if ($("#mesecito").val().length != 0 || $("#ciclos").val().length != 0 || $("#niveles").val().length != 0 || $("#periodos").val().length != 0) {
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var idaula = urlParams.get('idAula');
            var mes, idperio, nivel, ciclo;
            mes = ($("#mesecito").val() == "") ? '' : $("#mesecito").val();
            ciclo = ($("#ciclos").val() == "") ? 0 : $("#ciclos").val();
            nivel = ($("#niveles").val() == "") ? 0 : $("#niveles").val();
            idperio = ($("#periodos").val() == "") ? 0 : $("#periodos").val();

            $("#itemmatriaulaTable").DataTable().destroy();
            $("#itemmatriaulaTable tbody").empty();
            $.ajax({
                url: '/Aula/FiltrarAlumnoAula',
                data: {
                    mes: mes,
                    ciclo: ciclo,
                    nivel: nivel,
                    idperio: idperio,
                    idaula: idaula,

                },
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function () {
                        $("#itemmatriaulaTable").append($("<tr id='alumno-" + this.IdAlumno + "'>")
                            .append($("<td class='text-center verificar'>")
                                .append($("<input class='form-check-input verificadito' id='chkidAl-" + this.IdAlumno + "' data-idAlumno=" + this.IdAlumno + " type='checkbox' name='select'>")))
                            .append($("<td class='text-center idalumno' >").text(this.IdAlumno))
                            .append($("<td class='text-center nombres'>").text(this.Nombres))
                            .append($("<td class='text-center  idnivel' hidden >").text(this.idnivel))
                            .append($("<td class='text-center nivel'>").text(this.nivel))
                            .append($("<td class='text-center idciclo' hidden >").text(this.idciclo))
                            .append($("<td class='text-center ciclo'>").text(this.ciclo))
                            .append($("<td class='text-center'>")
                                .append($('<span class="badge badge-light" id="lblEstado-Edit-' + this.IdAlumno + '">').attr('style', 'color: #FFFFFF; font-weight: 400; font-size: 12px; background-color:' + this.color + ' !important').html(this.estadoname)))
                        );

                    });

                    if ($("#txtrol").val() == 'Administrador') {
                        $("#itemmatriaulaTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["excel", "pdf", "print", "colvis"]

                        }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Supervisor') {
                        $("#itemmatriaulaTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["excel", "pdf", "print", "colvis"]

                        }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Partner') {
                        $("#itemmatriaulaTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]

                        }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Partner sin Ventas') {
                        $("#itemmatriaulaTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]

                        }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
                    }
                    if ($("#txtrol").val() == 'Profesor') {
                        $("#itemmatriaulaTable").DataTable({
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "colReorder": true,
                            "scrollCollapse": true,
                            "scrollX": true,
                            "buttons": ["colvis"]

                        }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
                    }
                    /*$("#modalCambiarEstado").modal("hide");*/
                },
            });
        }
        else {
            if ($("#txtrol").val() == 'Administrador') {
                $("#itemmatriaulaTable").DataTable({
                    "responsive": true,
                    "lengthChange": true,
                    "autoWidth": false,
                    "colReorder": true,
                    "scrollCollapse": true,
                    "scrollX": true,
                    "buttons": ["excel", "pdf", "print", "colvis"]

                }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
            }
            if ($("#txtrol").val() == 'Supervisor') {
                $("#itemmatriaulaTable").DataTable({
                    "responsive": true,
                    "lengthChange": true,
                    "autoWidth": false,
                    "colReorder": true,
                    "scrollCollapse": true,
                    "scrollX": true,
                    "buttons": ["excel", "pdf", "print", "colvis"]

                }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
            }
            if ($("#txtrol").val() == 'Partner') {
                $("#itemmatriaulaTable").DataTable({
                    "responsive": true,
                    "lengthChange": true,
                    "autoWidth": false,
                    "colReorder": true,
                    "scrollCollapse": true,
                    "scrollX": true,
                    "buttons": ["colvis"]

                }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
            }
            if ($("#txtrol").val() == 'Partner sin Ventas') {
                $("#itemmatriaulaTable").DataTable({
                    "responsive": true,
                    "lengthChange": true,
                    "autoWidth": false,
                    "colReorder": true,
                    "scrollCollapse": true,
                    "scrollX": true,
                    "buttons": ["colvis"]

                }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
            }
            if ($("#txtrol").val() == 'Profesor') {
                $("#itemmatriaulaTable").DataTable({
                    "responsive": true,
                    "lengthChange": true,
                    "autoWidth": false,
                    "colReorder": true,
                    "scrollCollapse": true,
                    "scrollX": true,
                    "buttons": ["colvis"]

                }).buttons().container().appendTo('#itemmatriaulaTable_wrapper .col-md-6:eq(0)');
            }

        }
        /*$("#modalCambiarEstado").modal("hide");*/
        

    });
}