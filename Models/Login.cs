using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Login
    {
        public int IdUsuario { get; set; }
        public string Nombres { get; set; }
        public string ApellidoP { get; set; }
        public string ApellidoM { get; set; }
        public string Nombre { get; set; }
        public string NombreCorto { get; set; }
        public string Saludo { get; set; }
        public string Genero { get; set; }
        public string Dni { get; set; }
        public string Password { get; set; }
        public string Foto { get; set; }
        public int TipoUsuario { get; set; }
        public string Rol { get; set; }
        public int IdEmpresa { get; set; }
        public string Ruc { get; set; }
        public string Empresa { get; set; }
        public int IdSedeInicial { get; set; }
        public bool EmailConfirmado { get; set; }
        public string Moneda { get; set; }
        public int NotaVenta { get; set; }
        public int TipoDoc { get; set; }
        public int TipoCajaDiaria { get; set; }
        public string Conexion { get; set; }

        public string Sede { get; set; }

        public string NombrePEN { get; set; }
        public string SimboloPEN { get; set; }
        public int BusquedaAlumno { get; set; }
        public string Email { get; set; }
        public string Direccion { get; set; }

        public int IdUbigeo { get; set; }
        public string Ubigeo { get; set; }
        public string Correo { get; set; }
        public string Telef { get; set; }
        public string Distrito { get; set; }

        public int IdProvincia { get; set; }
        public string Provincia { get; set; }
        public int IdDepartamento { get; set; }
        public string Departamento { get; set; }
        public string Logo { get; set; }
    }
}
