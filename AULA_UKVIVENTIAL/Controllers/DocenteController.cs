using AULA_UKVIVENTIAL.ViewModels;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace AULA_UKVIVENTIAL.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        private readonly InstitucionUnitOfWork.IInstitucionUnitOfWork _institucionUnit;
        public DocenteController()
        {
            _institucionUnit = new InstitucionUnitOfWork.InstitucionUnitOfWork();
        }
        public ActionResult Index()
        {

            return View();
        }
        public JsonResult BuscarCorrelativoDocente()
        {
            int empresa = Convert.ToInt32(Session["IdEmpresa"]);
            string numero = "";

            numero = _institucionUnit.Docentes.BuscarCorrelativoDocente(empresa);

            return Json(numero, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CreateDocente(string CodigoDocente, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono)
        {
            try
            {
                int IdEmpresa = Convert.ToInt32(Session["IdEmpresa"]);

                //Nombre = Nombre ?? ""; Direccion = Direccion ?? ""; Responsable = Responsable ?? ""; Comision = Comision ?? ""; Ubigeo = Ubigeo ?? ""; Pais = Pais ?? "";

                bool success = _institucionUnit.Docentes.CrearPor(CodigoDocente, Dni, Nombres, Apellidos, Direccion, Telefono,  IdEmpresa);

                if (success)
                {
                    TempData["Success"] = "Docente Creado Correctamente.";
                    return Json(new { success = true }, JsonRequestBehavior.DenyGet);
                }
                else
                {
                    TempData["Danger"] = "No se pudo crear el Docente, intente nuevamente.";
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
        public JsonResult EditDocente(int IdDocente, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono, string Email, int IdSede)
        {
            try
            {
                int IdEmpresa = Convert.ToInt32(Session["IdEmpresa"]);

                //Nombre = Nombre ?? ""; Direccion = Direccion ?? ""; Responsable = Responsable ?? ""; Comision = Comision ?? ""; Ubigeo = Ubigeo ?? ""; Pais = Pais ?? "";

                var success = _institucionUnit.Docentes.EditarPor(IdDocente, Dni, Nombres, Apellidos, Direccion, Telefono,  IdEmpresa);

                if (success)
                {
                    TempData["Success"] = "Docente Editado Correctamente.";
                    return Json(new { success = true }, JsonRequestBehavior.DenyGet);
                }
                else
                {
                    TempData["Danger"] = "No se pudo editar el Docente, intente nuevamente.";
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
        public JsonResult DeleteDocente(int IdDocente)
        {
            try
            {
                var success = _institucionUnit.Docentes.EliminarPor(IdDocente);

                if (success)
                {
                    TempData["Success"] = "Docente eliminado correctamente.";
                    return Json(new { success = true }, JsonRequestBehavior.DenyGet);
                }
                else
                {
                    TempData["Danger"] = "No se pudo Eliminar Docente, intente nuevamente.";
                    return Json(new { success = false }, JsonRequestBehavior.DenyGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error: " + ex.Message }, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult VerDocente(int IdDocente)
        {
            var DocenteDB = _institucionUnit.Docentes.VerPor(IdDocente);
            var DocenteVM = (DocenteVM)DocenteDB;

            return Json(DocenteVM, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Filtrar()
        {
            int idEmpresa = Convert.ToInt32(Session["IdEmpresa"]);

            var DocentesDB = _institucionUnit.Docentes.FiltrarPor(idEmpresa);
            var list = DocenteVM.ConvertirListaAViewModel(DocentesDB);

            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        //public JsonResult BuscarReniec(string Dni)
        //{ lo comento porq seria lindo tenerlo xd 
        //    try
        //    {
        //        Web.Minerva.Admin.MVC.BuscarPersona.Reniec reniec = new Web.Minerva.Admin.MVC.BuscarPersona.Reniec();
        //        string linkSunat = Convert.ToString(Session["LinkSunat"]);
        //        return Json(reniec.GetData(Dni.Trim(), linkSunat), JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { success = false, valid = false, message = "No se pudo realizar la consulta." }, JsonRequestBehavior.AllowGet);
        //    }
        //}
        //public JsonResult CargarSedes()
        //{
        //    List<SedeVM> listaSedes = new List<SedeVM>();
        //    int empresa = Convert.ToInt32(Session["IdEmpresa"]);

        //    var ListaSedesDB = _minervaUnit.Sedes.ListarPor(empresa);
        //    var ListaSedesVM = SedeVM.ConvertirListaAViewModel(ListaSedesDB);

        //    return Json(ListaSedesVM, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult ImportarDocente()
        {

            int empresa = Convert.ToInt32(Session["IdEmpresa"]);

            var inicioDB = _institucionUnit.Docentes.ListarPor(empresa);
            var inicioVM = DocenteVM.ConvertirListaAViewModel(inicioDB);


            return View(inicioVM);
        }

        public JsonResult UploadFile(HttpPostedFileBase file)
        {
            List<ItemDocente> listaItems = new List<ItemDocente>();
            try
            {
                if (Request != null)
                {
                    string ext = Path.GetExtension(file.FileName);
                    if ((file != null) && (file.ContentLength > 0) && !string.IsNullOrEmpty(file.FileName))
                    {
                        if (ext == ".xls" || ext == ".xlsx")
                        {
                            byte[] fileBytes = new byte[file.ContentLength];
                            var data = file.InputStream.Read(fileBytes, 0, Convert.ToInt32(file.ContentLength));
                            using (var package = new ExcelPackage(file.InputStream))
                            {
                                var currentSheet = package.Workbook.Worksheets;
                                var workSheet = currentSheet.First();
                                var noOfCol = workSheet.Dimension?.End.Column;
                                var noOfRow = workSheet.Dimension?.End.Row;

                                for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                                {
                                    ItemDocente docente = new ItemDocente();
                                    docente.CodigoDocente = String.Format("{0:0000}", workSheet.Cells[rowIterator, 1].Value);
                                    docente.Dni = String.Format("{0:00000000}", workSheet.Cells[rowIterator, 2].Value);
                                    docente.Nombres = Convert.ToString(workSheet.Cells[rowIterator, 3].Value);
                                    docente.Apellidos = Convert.ToString(workSheet.Cells[rowIterator, 4].Value);
                                    docente.Direccion = Convert.ToString(workSheet.Cells[rowIterator, 5].Value);
                                    docente.Telefono = Convert.ToString(workSheet.Cells[rowIterator, 6].Value);
                                    //docente.Email = Convert.ToString(workSheet.Cells[rowIterator, 7].Value);
                                    //docente.Sede = Convert.ToString(workSheet.Cells[rowIterator, 8].Value);
                                    //if (string.IsNullOrEmpty(docente.CodigoDocente))
                                    //{

                                    //}
                                    listaItems.Add(docente);
                                }
                            }

                            int contadorErrores = 0;
                            foreach (var item in listaItems)
                            {
                                contadorErrores = 0;
                                contadorErrores =
                                                //ValidarNumero(item.Codigo) +
                                                ValidarNumero(item.Dni) +
                                                ValidarNombre(item.Nombres) +
                                                ValidarNombre(item.Apellidos) +
                                                ValidarNombre(item.Direccion) +
                                                ValidarNumero(item.Telefono);
                                                
                                if (contadorErrores > 0)
                                {
                                    item.HasError = true;
                                }
                            }
                        }
                    }
                }
                //return Json(new { success = true, listado = listaItems });
                var jsonResult = Json(new { success = true, listado = listaItems });
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
        public int ValidarNombre(string nombre)
        {
            return nombre?.Length >= 3 ? 0 : 1;
        }
        public int ValidarEsInt(string numero)
        {
            int n;
            bool isNumero = int.TryParse(numero, out n);

            return isNumero == true ? 0 : 1;
        }
        public int ValidarNumero(string nro)
        {
            int ValidaNoEsNulo = nro != null ? 0 : 1;
            int validaEsInt = ValidarEsInt(nro);

            return ValidaNoEsNulo + validaEsInt;
        }
        public JsonResult CargarDocentes(List<ItemDocente> listaDetalle)
        {
            int empresa = Convert.ToInt32(Session["IdEmpresa"]);
            //string registro = Convert.ToString(Session["UserNombres"]) + " " + Convert.ToString(Session["UserApellidoP"]) + " " + Convert.ToString(Session["UserApellidoM"]);
            //Database defaultDB = factory.Create(Helpers.GetConexionEmpresa(empresa));

            try
            {
                foreach (var item in listaDetalle)
                {
                    int Id = _institucionUnit.Docentes.CrearDocenteExcel(empresa, item.CodigoDocente, item.Dni, item.Nombres, item.Apellidos, item.Direccion, item.Telefono);
                    //var result = defaultDB.ExecuteScalar("SP_CrearProductoExcel", empresa, item.Codigo, item.Categoria, item.Descripcion, item.Precio, item.Moneda, item.Unidades, item.Descuento, item.Equivalencia, item.Tipo);
                }

                return Json(new { success = true, message = "Docentes cargados." }, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message }, JsonRequestBehavior.DenyGet);
            }
        }
        public ActionResult DescargarPlantilla()
        {
            byte[] fileBytes = System.IO.File.ReadAllBytes(HttpRuntime.AppDomainAppPath + "Content/distribution/file/PlantillaDocente.xlsx");
            string fileName = "PlantillaDocente.xlsx";
            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
        }
    }
}