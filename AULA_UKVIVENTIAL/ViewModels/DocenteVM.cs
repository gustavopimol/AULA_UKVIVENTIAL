using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AULA_UKVIVENTIAL.ViewModels
{
    public class DocenteVM
    {
        public int IdDocente { get; set; }
        public string CodigoDocente { get; set; }
        public string Dni { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }
        //public string Email { get; set; }
        public int Estado { get; set; }
        //public int IdSede { get; set; }
        public int IdEmpresa { get; set; }

        //public string Sede { get; set; }

        public static implicit operator DocenteVM(Docente docente)
        {
            try
            {
                return new DocenteVM
                {
                    IdDocente = docente.IdDocente,
                    CodigoDocente = docente.CodigoDocente,
                    Dni = docente.Dni,
                    Nombres = docente.Nombres,
                    Apellidos = docente.Apellidos,
                    Telefono = docente.Telefono,
                    Direccion = docente.Direccion,
                    //Email = docente.Email,
                    Estado = docente.Estado,
                    //IdSede = docente.IdSede,
                    IdEmpresa = docente.IdEmpresa,
                    //Sede = docente.Sede,

                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static List<DocenteVM> ConvertirListaAViewModel(List<Docente> docentes)
        {
            try
            {
                var docenteVM = new List<DocenteVM>();

                foreach (var docente in docentes)
                {
                    docenteVM.Add(docente);
                }

                return docenteVM;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }

    public class ItemDocente
    {
        public string CodigoDocente { get; set; }
        public string Dni { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }
        //public string Email { get; set; }
        //public string Sede { get; set; }
        public bool HasError { get; set; }
    }
}