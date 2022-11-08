using AULA_UKVIVENTIAL.ViewModels;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AULA_UKVIVENTIAL.Controllers
{
    public class PeriodoController : Controller
    {
        private readonly InstitucionUnitOfWork.IInstitucionUnitOfWork _institucionUnit;
        
        public PeriodoController()
        {
            _institucionUnit = new InstitucionUnitOfWork.InstitucionUnitOfWork();
        }
        // GET: Periodo
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult BuscarCorrelativoPeriodo()
        {
            int empresa = Convert.ToInt32(Session["IdEmpresa"]);
            string numero = "";

            numero = _institucionUnit.Periodos.BuscarCorrelativoPeriodo(empresa);

            return Json(numero, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CreatePeriodo(string CodigoPeriodo, string Descripcion)
        {
            try
            {
                int IdEmpresa = Convert.ToInt32(Session["IdEmpresa"]);

                //Nombre = Nombre ?? ""; Direccion = Direccion ?? ""; Responsable = Responsable ?? ""; Comision = Comision ?? ""; Ubigeo = Ubigeo ?? ""; Pais = Pais ?? "";

                bool success = _institucionUnit.Periodos.CrearPor( CodigoPeriodo,  Descripcion,  IdEmpresa);

                if (success)
                {
                    TempData["Success"] = "Periodo Creado Correctamente.";
                    return Json(new { success = true }, JsonRequestBehavior.DenyGet);
                }
                else
                {
                    TempData["Danger"] = "No se pudo crear el Periodo, intente nuevamente.";
                    return Json(new { success = false }, JsonRequestBehavior.DenyGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error: " + ex.Message }, JsonRequestBehavior.DenyGet);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult EditPeriodo(int IdPeriodo, string Descripcion)
        {
            try
            {
                int IdEmpresa = Convert.ToInt32(Session["IdEmpresa"]);

                //Nombre = Nombre ?? ""; Direccion = Direccion ?? ""; Responsable = Responsable ?? ""; Comision = Comision ?? ""; Ubigeo = Ubigeo ?? ""; Pais = Pais ?? "";

                var success = _institucionUnit.Periodos.EditarPor(IdPeriodo, Descripcion, IdEmpresa);

                if (success)
                {
                    TempData["Success"] = "Periodo Editado Correctamente.";
                    return Json(new { success = true }, JsonRequestBehavior.DenyGet);
                }
                else
                {
                    TempData["Danger"] = "No se pudo editar el Periodo, intente nuevamente.";
                    return Json(new { success = false }, JsonRequestBehavior.DenyGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error: " + ex.Message }, JsonRequestBehavior.DenyGet);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult DeletePeriodo(int IdPeriodo)
        {
            try
            {
                var success = _institucionUnit.Periodos.EliminarPor(IdPeriodo);

                if (success)
                {
                    TempData["Success"] = "Periodo eliminado correctamente.";
                    return Json(new { success = true }, JsonRequestBehavior.DenyGet);
                }
                else
                {
                    TempData["Danger"] = "No se pudo Eliminar el Periodo, intente nuevamente.";
                    return Json(new { success = false }, JsonRequestBehavior.DenyGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error: " + ex.Message }, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult VerPeriodo(int IdPeriodo)
        {
            var PeriodoDB = _institucionUnit.Periodos.VerPor(IdPeriodo);
            var PeriodoVM = (PeriodoVM)PeriodoDB;

            return Json(PeriodoVM, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Filtrar()
        {
            int idEmpresa = Convert.ToInt32(Session["IdEmpresa"]);

            var PeriodosDB = _institucionUnit.Periodos.FiltrarPor(idEmpresa);
            var list = PeriodoVM.ConvertirListaAViewModel(PeriodosDB);

            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}