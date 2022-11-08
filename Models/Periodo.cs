using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Periodo
    {
        public int IdPeriodo { get; set; }
        public string CodigoPeriodo { get; set; }
        public string Descripcion { get; set; }
        public int Estado { get; set; }
        public int IdEmpresa { get; set; }
        public int IdNivel { get; set; }
    }
}
