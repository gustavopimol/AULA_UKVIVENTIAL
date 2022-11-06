using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AULA_UKVIVENTIAL.ViewModels
{
    public class AlumnoVM
    {
        public int Id { get; set; }
        public int IdAlumno { get; set; }
        public string Tipo { get; set; }
        public string Dni { get; set; }
        public string Nombres { get; set; }
        public string APaterno { get; set; }
        public string AMaterno { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Direccion { get; set; }
        public string Ubigeo { get; set; }
        public string Email { get; set; }
        public int IdSede { get; set; }
        public int IdPromotor { get; set; }
        public int IdEmpresa { get; set; }
        public string NombreEstado { get; set; }
        public string FechaNacimientoS { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string FechaCreacionS { get; set; }
        public string Registrador { get; set; }
        public string Modificador { get; set; }
        public DateTime FechaModifica { get; set; }
        public string FechaModificaS { get; set; }
        public int IdPais { get; set; }
        public int IdDepartamento { get; set; }
        public int IdProvincia { get; set; }

        public string Sede { get; set; }
        public string Promotor { get; set; }
        public string Pais { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public int IdUsuarioE { get; set; }
        public string Telefono { get; set; }

        public static implicit operator AlumnoVM(Alumno alumno)
        {
            try
            {
                return new AlumnoVM
                {
                    Id = alumno.Id,
                    IdAlumno = alumno.IdAlumno,
                    Dni = alumno.Dni,
                    Nombres = alumno.Nombres,
                    APaterno = alumno.APaterno,
                    AMaterno = alumno.AMaterno,
                    FechaNacimiento = alumno.FechaNacimiento,
                    Direccion = alumno.Direccion,
                    Ubigeo = alumno.Ubigeo,
                    Email = alumno.Email,
                    FechaCreacion = alumno.FechaCreacion,
                    IdSede = alumno.IdSede,
                    IdPromotor = alumno.IdPromotor,
                    Tipo = alumno.Tipo,
                    NombreEstado = alumno.NombreEstado,
                    FechaNacimientoS = alumno.FechaNacimientoS,
                    FechaCreacionS = alumno.FechaCreacionS,
                    Registrador = alumno.Registrador,
                    Modificador = alumno.Modificador,
                    FechaModifica = alumno.FechaModifica,
                    FechaModificaS = alumno.FechaModificaS,
                    IdPais = alumno.IdPais,
                    IdDepartamento = alumno.IdDepartamento,
                    IdProvincia = alumno.IdProvincia,
                    Sede = alumno.Sede,
                    Pais = alumno.Pais,
                    Departamento = alumno.Departamento,
                    Provincia = alumno.Provincia,
                    Promotor = alumno.Promotor,
                    IdUsuarioE = alumno.IdUsuarioE,
                    Telefono = alumno.Telefono
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static List<AlumnoVM> ConvertirListaAViewModel(List<Alumno> alumnos)
        {
            try
            {
                var alumnoVM = new List<AlumnoVM>();

                foreach (var alumno in alumnos)
                {
                    alumnoVM.Add(alumno);
                }

                return alumnoVM;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
    public class ItemAlumno
    {
        public string Codigo { get; set; }
        public string Tipo { get; set; }
        public string Dni { get; set; }
        public string Nombres { get; set; }
        public string APaterno { get; set; }
        public string AMaterno { get; set; }
        public string FechaNacimiento { get; set; }
        public string Direccion { get; set; }
        public string Pais { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Ubigeo { get; set; }
        public string Email { get; set; }
        public string Sede { get; set; }
        public string Promotor { get; set; }
        public string registro { get; set; }
        public string nroalumno { get; set; }
        public string Telefono { get; set; }
        public bool HasError { get; set; }
    }
}