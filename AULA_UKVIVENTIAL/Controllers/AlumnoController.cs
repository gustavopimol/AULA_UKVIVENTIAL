using AULA_UKVIVENTIAL.ViewModels; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AULA_UKVIVENTIAL.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno

        private readonly InstitucionUnitOfWork.IInstitucionUnitOfWork _institucionUnit;
        public AlumnoController()
        {
            _institucionUnit = new InstitucionUnitOfWork.InstitucionUnitOfWork();
        }
        public ActionResult Index()
        {
            //Session["Menu"] = "alumno";
            //Session.Remove("Submenu");

            List<AlumnoVM> listAlumno = new List<AlumnoVM>();
            int IdEmpresa = Convert.ToInt32(Session["IdEmpresa"]);
            //var ListaAlumnoDB = _minervaUnit.Alumnos.ListarPor(IdEmpresa);
            //listAlumno = AlumnoVM.ConvertirListaAViewModel(ListaAlumnoDB);

            DateTime FecharNac = _institucionUnit.Alumnos.ObtenerFechaServidor();
            ViewBag.FechaSer = FecharNac;
            var Paises = _institucionUnit.Alumnos.ListarPaises();
            var Sedes = _institucionUnit.Sedes.ListarPor(IdEmpresa);

            //var Departamentos = _institucionUnit.Departamentos.ListarDepartamentos();
            //List<DepartamentoVM> listDepartamento = new List<DepartamentoVM>();
            //int idDepartamento = Convert.ToInt32(Departamentos);
            //var Provincias = _institucionUnit.Provincias.ListarProvincias(idDepartamento);

            ViewBag.Paises = Paises;
            ViewBag.Sedes = Sedes;
            //ViewBag.Provincias = Provincias;
            return View();
        }
    }
}