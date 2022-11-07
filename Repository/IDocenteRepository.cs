using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDocenteRepository
    {
        bool CrearPor(string CodigoDocente, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono, int IdEmpresa);
        bool EditarPor(int IdDocente, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono, /*string Email, int IdSede,*/ int IdEmpresa);
        bool EliminarPor(int IdDocente);
        List<Docente> ListarPor(int idEmpresa);
        List<Docente> FiltrarPor(int idEmpresa);
        Docente VerPor(int IdDocente);
        string BuscarCorrelativoDocente(int IdEmpresa);
        int CrearDocenteExcel(int empresa, string CodigoDocente, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono /*string Email, string Sede*/);
    }
}
