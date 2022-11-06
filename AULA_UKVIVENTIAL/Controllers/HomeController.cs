using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AULA_UKVIVENTIAL.Controllers
{
    public class HomeController : Controller
    {
        private readonly InstitucionUnitOfWork.IInstitucionUnitOfWork _institucionUnit;
        public HomeController()
        {
            _institucionUnit = new InstitucionUnitOfWork.InstitucionUnitOfWork();
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Ingresar(string CodigoInstitucion, string UserName, string Password)
        {
            try
            {
                var usuario = _institucionUnit.Usuarios.Login(CodigoInstitucion, UserName, Password);

                if (usuario.IdEmpresa == 0)
                {
                    TempData["Danger"] = "Datos Incorrectos.";
                    return RedirectToAction("Login", "Home");
                }

                
                Session["IdUsuario"] = usuario.IdUsuario;
                Session["UserNombres"] = usuario.Nombres;
                Session["UserApellidoP"] = usuario.ApellidoP;
                Session["UserApellidoM"] = usuario.ApellidoM; 
                Session["IdEmpresa"] = usuario.IdEmpresa;
                Session["Empresa"] = usuario.Empresa;
                Session["TipoUsuario"] = usuario.Genero;
                Session["Rol"] = usuario.Logo; //USUARIO
                Session["Password"] = usuario.Password;
                Session["Email"] = usuario.Email;
                Session["Direccion"] = usuario.Direccion; 
                return RedirectToAction("Index", "Home");
            }
            catch (Exception ex)
            {
                TempData["Danger"] = ex.Message;
                return RedirectToAction("Login", "Home");
            }

        }
    }
}