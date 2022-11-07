using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface ICicloRepository
    {
        List<Ciclo> ListarPor(int IdEmpresa);
        bool CrearPor(string Codigo, string Descripcion, int IdEmpresa);
        bool EditarPor(int IdCiclo, string Codigo, string Descripcion, int IdEmpresa);
        bool EliminarPor(int IdCiclo);
        Ciclo VerPor(int IdCiclo);
        string BuscarCorrelativoCiclo(int IdEmpresa);
        List<Ciclo> FiltrarPor(int IdEmpresa);
    }
}
