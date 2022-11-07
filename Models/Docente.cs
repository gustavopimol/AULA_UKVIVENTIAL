using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Docente
    {
        
        public int IdDocente { get; set; }
        public string CodigoDocente { get; set; }
        public string Dni { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
       
        //public string Email { get; set; }
        public int Estado { get; set; }
        //public int IdSede { get; set; }
        public int IdEmpresa { get; set; }

        //public string Sede { get; set; }
    }
}
