using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Alumno
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
        public string Sede { get; set; }
        public string Promotor { get; set; }
        public DateTime FechaModifica { get; set; }
        public string FechaModificaS { get; set; }
        public int IdPais { get; set; }
        public int IdDepartamento { get; set; }
        public int IdProvincia { get; set; }
        public string Pais { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public int IdUsuarioE { get; set; }
        public string Telefono { get; set; }
    }
}
