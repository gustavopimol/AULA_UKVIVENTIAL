using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IPeriodoRepository
    {
        bool CrearPor(string CodigoPeriodo, string Descripcion, int IdEmpresa);
        bool EditarPor(int IdPeriodo, string Descripcion, int IdEmpresa);
        bool EliminarPor(int IdPeriodo);
        List<Periodo> FiltrarPor(int idEmpresa);
        Periodo VerPor(int IdPeriodo);
        string BuscarCorrelativoPeriodo(int IdEmpresa);
        List<Periodo> ListarPor(int IdEmpresa);
    }
}
