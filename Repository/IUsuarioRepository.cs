using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IUsuarioRepository
    {
        Login Login(string codigo, string login, string password);
        List<Usuario> FiltrarPor(int idEmpresa);
        Usuario BuscarDni(string dni, int idEmpresa);
        int CrearPor(string nombres, string apellidoPaterno, string apellidoMaterno, string email, string login, string password, string genero, int tipoUsuario, int confirmado, string telefono, string inicioTurno, string finTurno, int otroDia);
        bool EditarPor(string Nombres, string ApellidoPaterno, string ApellidoMaterno, string Email, string Genero, int IdUsuario, string Password, string telefono, string inicioTurno, string finTurno, int otroDia);
        bool EliminarPor(int idusuario);
        Usuario ObtenerPor(int idUsuario);
        Usuario Administrador(int idEmpresa);
        Usuario ObtenerPor(int idUsuario, int idEmpresa);
        int ValidarPasswordUser(int idUsuario, string password);
        Usuario ConsultarUsuario(string dni);
        int BuscarUsuario(string Login);
        bool UsuarioPrincipal(int IdUsuario);
        bool GuardarConfirmEmailToken(int IdUsuario, string confirmemailtoken);
        Usuario VerificarConfirmEmailToken(int IdUsuario, string Email, string Login, string token);
        List<Usuario> CargarUsuarios(int idEmpresa);
        bool EditarPerfil(string Email, string Genero, string Foto, int IdUsuario);
        List<Pais> ListarPaises();
        bool CambiarClave(int IdUsuario, string NuevaClave);

    }
}
