using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface ISedeRepository
    {
        bool CrearPor(string CodigoSede, string RucSede, string Nombre, string Direccion, string CodigoSunat, string NombreSede, string Responsable, string Comision, string Ubigeo, int IdPais, int IdDepartamento, int IdProvincia, int IdDistrito, string Telefono, int IdEmpresa);
        bool EditarPor(int IdSede, string RucSede, string Nombre, string Direccion, string CodigoSunat, string NombreSede, string Responsable, string Comision, string Ubigeo, int IdPais, int IdDepartamento, int IdProvincia, int IdDistrito, string Telefono, int IdEmpresa);
        bool EliminarPor(int IdSede);
        List<Sedes> ListarPor(int idEmpresa);
        List<Sedes> FiltrarPor(int idEmpresa);
        Sedes VerPor(int IdSede);
        string BuscarCorrelativoSede(int IdEmpresa);
        List<Pais> ListarPaises();
    }
}
