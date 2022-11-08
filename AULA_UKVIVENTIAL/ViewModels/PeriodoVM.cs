using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AULA_UKVIVENTIAL.ViewModels
{
    public class PeriodoVM
    {
        public int IdPeriodo { get; set; }
        public string CodigoPeriodo { get; set; }
        public string Descripcion { get; set; }
        public int Estado { get; set; }
        public int IdEmpresa { get; set; }
        public int IdNivel { get; set; }

        public static implicit operator PeriodoVM(Periodo periodo)
        {
            try
            {
                return new PeriodoVM
                {
                    IdPeriodo = periodo.IdPeriodo,
                    CodigoPeriodo = periodo.CodigoPeriodo,
                    Descripcion = periodo.Descripcion,
                    Estado = periodo.Estado,
                    IdEmpresa = periodo.IdEmpresa,
                    //IdNivel = periodo.IdNivel,
                };
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Presentación.ViewModels > " + ex.Message);
            }
        }

        public static List<PeriodoVM> ConvertirListaAViewModel(List<Periodo> periodos)
        {
            try
            {
                var periodoVM = new List<PeriodoVM>();

                foreach (var periodo in periodos)
                {
                    periodoVM.Add(periodo);
                }

                return periodoVM;
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Presentación.ViewModels > " + ex.Message);
            }
        }
    }
}