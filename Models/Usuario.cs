using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string Nombres { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Email { get; set; }
        public string Rol { get; set; }
        public string Foto { get; set; }
        public string Login { get; set; }
        public string Genero { get; set; }
        public int IdEmpresa { get; set; }
        public string Empresas { get; set; }
        public int IdSedeInicial { get; set; }
        public int TipoUsuario { get; set; }
        public bool EmailConfirmado { get; set; }
        public string Password { get; set; }
        public string Ruc { get; set; }
        public int IdPlan { get; set; }
        public string Telefono { get; set; }
        public string InicioTurno { get; set; }
        public string FinTurno { get; set; }
        public int OtroDia { get; set; }
        public string NameSedeInicial { get; set; }

        public string Nombre { get; set; }
        public string NombreCorto { get; set; }
        public string Saludo { get; set; }
        public string Establecimiento { get; set; }
        public string Plan { get; set; }
        public string ColorPlan { get; set; }
        public int DiasRest { get; set; }
        public string AddPor { get; set; }
        public int Cantidad { get; set; }

        public string RazonSocial { get; set; }
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public int IdUbigeo { get; set; }
        public string Ubigeo { get; set; }
        public string Correo { get; set; }
        public string Telef { get; set; }
        public string Prefoto { get; set; }
        public string Distrito { get; set; }
        public int IdProvincia { get; set; }
        public string Provincia { get; set; }
        public int IdDepartamento { get; set; }
        public string Departamento { get; set; }
        public string Logo { get; set; }
    }
}
