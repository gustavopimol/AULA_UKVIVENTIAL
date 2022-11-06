using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDistritoRepository
    {
        List<Distrito> ListarDistrito(int idProvincia);
        int BuscarUbigeoDistrito(string provincia);
        List<string> BuscarDireccionPorUbigeo(string codigo);
    }
}
