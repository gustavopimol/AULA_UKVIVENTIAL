using AULA_UKVIVENTIAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AULA_UKVIVENTIAL.Controllers
{
    public class CicloController : Controller
    {
        // GET: Ciclo
        private readonly InstitucionUnitOfWork.IInstitucionUnitOfWork _institucionUnit;
        public CicloController()
        {
            _institucionUnit = new InstitucionUnitOfWork.InstitucionUnitOfWork();
        }
        public ActionResult Index()
        {

            List<CicloVM> listCiclo = new List<CicloVM>();
            int IdEmpresa = Convert.ToInt32(Session["IdEmpresa"]);
            var ListaCicloDB = _institucionUnit.Ciclos.ListarPor(IdEmpresa);
            listCiclo = CicloVM.ConvertirListaAViewModel(ListaCicloDB);
            return View();
        }
        public ActionResult CreateCiclo(string Codigo, string Descripcion)
        {
            try
            {
                int IdEmpresa = Convert.ToInt32(Session["IdEmpresa"]);

                Descripcion = Descripcion ?? "";

                bool success = _institucionUnit.Ciclos.CrearPor(Codigo, Descripcion, IdEmpresa);

                if (success)
                {
                    TempData["Success"] = "Ciclo Creado Correctamente.";
                    return Json(new { success = true }, JsonRequestBehavior.DenyGet);
                }
                else
                {
                    TempData["Danger"] = "No se pudo crear Ciclo, intente nuevamente.";
                    return Json(new { success = false }, JsonRequestBehavior.DenyGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error: " + ex.Message }, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult EditCiclo(int IdCiclo, string Codigo, string Descripcion)
        {
            try
            {
                int IdEmpresa = Convert.ToInt32(Session["IdEmpresa"]);

                Descripcion = Descripcion ?? "";

                var success = _institucionUnit.Ciclos.EditarPor(IdCiclo, Codigo, Descripcion, IdEmpresa);

                if (success)
                {
                    TempData["Success"] = "Ciclo Editado Correctamente.";
                    return Json(new { success = true }, JsonRequestBehavior.DenyGet);
                }
                else
                {
                    TempData["Danger"] = "No se pudo editar Ciclo, intente nuevamente.";
                    return Json(new { success = false }, JsonRequestBehavior.DenyGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error: " + ex.Message }, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult VerCiclo(int IdCiclo)
        {
            var CicloDB = _institucionUnit.Ciclos.VerPor(IdCiclo);
            var CicloVM = (CicloVM)CicloDB;

            return Json(CicloVM, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteCiclo(int IdCiclo)
        {
            try
            {
                var success = _institucionUnit.Ciclos.EliminarPor(IdCiclo);

                if (success)
                {
                    TempData["Success"] = "Ciclo eliminado correctamente.";
                    return Json(new { success = true }, JsonRequestBehavior.DenyGet);
                }
                else
                {
                    TempData["Danger"] = "No se pudo Eliminar Ciclo, intente nuevamente.";
                    return Json(new { success = false }, JsonRequestBehavior.DenyGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error: " + ex.Message }, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult BuscarCorrelativoCiclo()
        {
            int empresa = Convert.ToInt32(Session["IdEmpresa"]);
            string numero = "";

            numero = _institucionUnit.Ciclos.BuscarCorrelativoCiclo(empresa);

            return Json(numero, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Filtrar()
        {
            int IdEmpresa = Convert.ToInt32(Session["IdEmpresa"]);

            var CicloDB = _institucionUnit.Ciclos.FiltrarPor(IdEmpresa);
            var list = CicloVM.ConvertirListaAViewModel(CicloDB);
            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}