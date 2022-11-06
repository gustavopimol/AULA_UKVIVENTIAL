using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Sedes
    {
        public int IdSede { get; set; }
        public string CodigoSede { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string NombreSede { get; set; }
        public string Responsable { get; set; }
        public string Comision { get; set; }
        public int Estado { get; set; }
        public string Ubigeo { get; set; }
        public int IdPais { get; set; }
        public int IdDepartamento { get; set; }
        public int IdProvincia { get; set; }
        public int IdDistrito { get; set; }
        public string IdEmpresa { get; set; }
        public string NombreEstado { get; set; }
        public string Telefono { get; set; }

        public string Pais { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string RucSede { get; set; }
        public string CodigoSunat { get; set; }
    }
}
