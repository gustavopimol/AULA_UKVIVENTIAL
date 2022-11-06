using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IAlumnoRepository
    {

        List<Alumno> ListarPor(int IdEmpresa);
        int CrearPor(string Dni, string Tipo, string Nombres, string APaterno, string AMaterno, DateTime fechaNa, string Direccion, string Ubigeo, string Telefono, string Email, int IdSede, string Registrador, int IdPais, int IdDepartamento, int IdProvincia, int IdPromotor, int IdEmpresa);
        List<Alumno> FiltrarPor(int IdEmpresa, int sedesal, string docum, string nombal, DateTime inicio, DateTime fin);
        int EditarPor(int Id, string Dni, string Tipo, string Nombres, string APaterno, string AMaterno, DateTime fechaNa, string Direccion, string Ubigeo, string Telefono, string Email, int IdSede, string Modificador, DateTime fechaMo, int IdPais, int IdDepartamento, int IdProvincia, int IdPromotor, int IdEmpresa);
        Alumno VerPor(int Id);
        string BuscarCorrelativoAlumno(int IdEmpresa);
        DateTime ObtenerFechaServidor();
        bool EliminarPor(string Dni, int IdUsuarioE);
        List<Pais> ListarPaises();
        List<Departamento> ListarDepartamentos();
        List<Provincia> ListarProvincias();
        int CrearAlumnoExcel(int empresa, string Nombres, string APaterno, string AMaterno, string Tipo, string Dni, string FechaNacimiento, string Direccion, string Pais, string Departamento, string Provincia, string Ubigeo, string Email, string Sede, string Promotor, string registro, string Telefono);

    }
}
