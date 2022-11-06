using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IPromotorRepository
    {
        bool CrearPor(string CodigoPromotor, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono, string Email, int IdSede, int IdEmpresa);
        bool EditarPor(int IdPromotor, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono, string Email, int IdSede, int IdEmpresa);
        bool EliminarPor(int IdPromotor);
        List<Promotor> ListarPor(int idEmpresa);
        List<Promotor> FiltrarPor(int idEmpresa);
        Promotor VerPor(int IdPromotor);
        string BuscarCorrelativoPromotor(int IdEmpresa);
    }
}
