using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Models;
namespace AULA_UKVIVENTIAL.ViewModels
{
    public class CicloVM
    {

        public int IdCiclo { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public int IdEmpresa { get; set; }
        public string NombreEstado { get; set; }

        public static implicit operator CicloVM(Ciclo ciclo)
        {
            try
            {
                return new CicloVM
                {
                    IdCiclo = ciclo.IdCiclo,
                    Codigo = ciclo.Codigo,
                    Descripcion = ciclo.Descripcion,
                    IdEmpresa = ciclo.IdEmpresa,
                    NombreEstado = ciclo.NombreEstado,
                };
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Presentación.ViewModels > " + ex.Message);
            }
        }

        public static List<CicloVM> ConvertirListaAViewModel(List<Ciclo> ciclos)
        {
            try
            {
                var cicloVM = new List<CicloVM>();

                foreach (var ciclo in ciclos)
                {
                    cicloVM.Add(ciclo);
                }

                return cicloVM;
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Presentación.ViewModels > " + ex.Message);
            }
        }

    }
}