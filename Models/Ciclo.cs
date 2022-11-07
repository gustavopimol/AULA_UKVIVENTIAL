using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Ciclo
    {
        public int IdCiclo { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public int IdEmpresa { get; set; }
        public string NombreEstado { get; set; }
    }
}
