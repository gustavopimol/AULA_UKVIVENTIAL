using Microsoft.Practices.EnterpriseLibrary.Data;
using Models;
using Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnterpriseLibrary
{
    public class UsuarioRepository : IUsuarioRepository
    {
        #region factory
        private static readonly DatabaseProviderFactory _factory = new DatabaseProviderFactory();
        public static DatabaseProviderFactory Factory { get { return _factory; } }
        #endregion

        public Login Login(string codigo, string login, string password)
        {
            Login usuario = new Login();

            try
            {
                var database = Factory.Create("InstitucionConnection");

                using (IDataReader dr = database.ExecuteReader("Login", codigo, login, password))
                {
                    while (dr.Read())
                    {
                        usuario.IdUsuario = Convert.ToInt32(dr[0]);
                        usuario.Nombres = dr[1].ToString();
                        usuario.ApellidoP = dr[2].ToString();
                        usuario.ApellidoM = dr[3].ToString();
                        usuario.Nombre = dr[1].ToString() + " " + dr[2].ToString() + " " + dr[3].ToString();
                        usuario.IdEmpresa = Convert.ToInt32(dr[4]);
                        usuario.Empresa = dr[5].ToString();
                        usuario.Genero = dr[6].ToString();
                        usuario.Logo = dr[7].ToString();
                        usuario.Password = dr[8].ToString();
                        usuario.Email = dr[9].ToString();
                        usuario.Direccion = dr[10].ToString();

                        string[] dataNomCorto = usuario.Nombre.Split(' ');

                        if (dataNomCorto.Length > 1)
                        {
                            usuario.NombreCorto = dataNomCorto[0] + " " + dataNomCorto[1];
                            if (dataNomCorto[2].Length < 4 && dataNomCorto.Length > 2)
                            {
                                usuario.NombreCorto += dataNomCorto[2];
                            }
                        }
                    }
                }
                usuario.Saludo = (usuario.Genero == "F") ? "Bienvenida" : ((usuario.Genero == "M") ? "Bienvenido" : "Bienvenido (a)"); usuario.Saludo = (usuario.Genero == "F") ? "Bienvenida" : ((usuario.Genero == "M") ? "Bienvenido" : "Bienvenido (a)");

                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public List<Usuario> FiltrarPor(int idEmpresa)
        {
            var list = new List<Usuario>();

            try
            {
                var database = Factory.Create("InstitucionConnection");

                using (IDataReader dr = database.ExecuteReader("FiltrarUsuario", idEmpresa))
                {
                    while (dr.Read())
                    {
                        list.Add(new Usuario
                        {
                            IdUsuario = Convert.ToInt32(dr[0]),
                            Nombres = Convert.ToString(dr[1]),
                            ApellidoPaterno = Convert.ToString(dr[2]),
                            ApellidoMaterno = Convert.ToString(dr[3]),
                            Email = Convert.ToString(dr[4]),
                            Login = Convert.ToString(dr[5]),
                            Rol = Convert.ToString(dr[6]),
                            IdEmpresa = Convert.ToInt32(dr[7]),
                            Telefono = Convert.ToString(dr[8]),

                        });
                    }
                }

                return list;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Usuario BuscarDni(string dni, int idEmpresa)
        {
            Usuario usuario = new Usuario();
            try
            {

                var database = Factory.Create("InstitucionConnection");

                using (IDataReader dr = database.ExecuteReader("VerUsuarioDNI", dni.Trim(), idEmpresa))
                {
                    while (dr.Read()) //**
                    {
                        usuario.Nombres = Convert.ToString(dr[0]);
                        usuario.ApellidoPaterno = Convert.ToString(dr[1]);
                        usuario.ApellidoMaterno = Convert.ToString(dr[2]);
                        usuario.Email = Convert.ToString(dr[3]);
                        usuario.Genero = Convert.ToString(dr[7]);
                        usuario.TipoUsuario = Convert.ToInt32(dr[6]);
                        usuario.IdSedeInicial = Convert.ToInt32(dr[8]);
                        usuario.Telefono = Convert.ToString(dr[12]);
                    }
                }

                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int CrearPor(string nombres, string apellidoPaterno, string apellidoMaterno, string email, string login, string password, string genero, int tipoUsuario, int confirmado, string telefono, string inicioTurno, string finTurno, int otroDia)
        {
            try
            {
                var database = Factory.Create("InstitucionConnection");
                int idUsuario = 0;

                using (IDataReader dr = database.ExecuteReader("CrearUsuario", nombres, apellidoPaterno, apellidoMaterno, email, login, password, genero, tipoUsuario, confirmado, telefono, inicioTurno, finTurno, otroDia))
                {
                    while (dr.Read())
                    {
                        idUsuario = Convert.ToInt32(dr[0]);
                    }
                }

                return idUsuario;
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Persistencia > " + ex.Message);
            }
        }

        public bool EditarPor(string Nombres, string ApellidoPaterno, string ApellidoMaterno, string Email, string Genero, int IdUsuario, string Password, string telefono, string inicioTurno, string finTurno, int otroDia)
        {
            try
            {
                var database = Factory.Create("InstitucionConnection");
                var success = database.ExecuteNonQuery("EditarUsuario", Nombres, ApellidoPaterno, ApellidoMaterno, Email, Genero, IdUsuario, Password, telefono, inicioTurno, finTurno, otroDia);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Persistencia > " + ex.Message);
            }
        }

        public bool EliminarPor(int idusuario)
        {
            try
            {
                var database = Factory.Create("InstitucionConnection");
                var success = database.ExecuteNonQuery("EliminarUsuario", idusuario);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Usuario ObtenerPor(int idUsuario)
        {
            Usuario usuario = new Usuario();

            try
            {
                var database = Factory.Create("InstitucionConnection");

                using (IDataReader dr = database.ExecuteReader("GetUsuarioCompleto", idUsuario))
                {
                    while (dr.Read()) //**
                    {
                        usuario.IdUsuario = Convert.ToInt32(dr[0]);
                        usuario.Nombres = dr[1].ToString();
                        usuario.ApellidoPaterno = dr[2].ToString();
                        usuario.ApellidoMaterno = dr[3].ToString();
                        usuario.Nombre = dr[1].ToString() + " " + dr[2].ToString() + " " + dr[3].ToString();
                        usuario.IdEmpresa = Convert.ToInt32(dr[4]);
                        usuario.Empresas = dr[5].ToString();
                        usuario.Genero = dr[6].ToString();
                        usuario.EmailConfirmado = (dr[7].ToString() == "1");
                        usuario.TipoUsuario = Convert.ToInt32(dr[8]);
                        usuario.IdSedeInicial = (dr[9] != DBNull.Value) ? Convert.ToInt32(dr[9]) : 0;
                        usuario.Rol = (dr[10] != DBNull.Value) ? Convert.ToString(dr[10]) : "";
                        usuario.Login = dr[11].ToString();
                        usuario.Password = dr[12].ToString();
                        usuario.Ruc = dr[13].ToString();
                        usuario.Email = dr[14].ToString();

                        usuario.Saludo = (usuario.Genero == "F") ? "Estimada" : ((usuario.Genero == "M") ? "Estimado" : "Estimado(a)");
                        string[] dataNomCorto = usuario.Nombre.Split(' ');

                        if (dataNomCorto.Length > 1)
                        {
                            usuario.NombreCorto = dataNomCorto[0] + " " + dataNomCorto[1];
                            if (dataNomCorto[2].Length < 4 && dataNomCorto.Length > 2)
                            {
                                usuario.NombreCorto += dataNomCorto[2];
                            }
                        }
                    }
                }

                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Usuario Administrador(int idEmpresa)
        {
            Usuario administrador = new Usuario();

            try
            {
                var database = Factory.Create("InstitucionConnection");

                using (IDataReader dr = database.ExecuteReader("GetUsuarioPrincipal", idEmpresa))
                {
                    while (dr.Read()) //**
                    {
                        administrador.IdUsuario = Convert.ToInt32(dr[0]);
                        administrador.Nombres = dr[1].ToString();
                        administrador.ApellidoPaterno = dr[2].ToString();
                        administrador.ApellidoMaterno = dr[3].ToString();
                        administrador.Nombre = dr[1].ToString() + " " + dr[2].ToString() + " " + dr[3].ToString();
                        administrador.IdEmpresa = Convert.ToInt32(dr[4]);
                        administrador.Empresas = dr[5].ToString();
                        administrador.Genero = dr[6].ToString();
                        administrador.EmailConfirmado = (dr[7].ToString() == "1");
                        administrador.TipoUsuario = Convert.ToInt32(dr[8]);
                        administrador.IdSedeInicial = (dr[9] != DBNull.Value) ? Convert.ToInt32(dr[9]) : 0;
                        administrador.Rol = (dr[10] != DBNull.Value) ? Convert.ToString(dr[10]) : "";
                        administrador.IdPlan = (dr[11] != DBNull.Value) ? Convert.ToInt32(dr[11]) : 0;
                        administrador.Plan = (dr[12] != DBNull.Value) ? Convert.ToString(dr[12]) : "";
                        administrador.ColorPlan = (dr[13] != DBNull.Value) ? Convert.ToString(dr[13]) : "";
                        administrador.DiasRest = (dr[14] != DBNull.Value) ? Convert.ToInt32(dr[14]) : 0;
                        administrador.Login = dr[15].ToString();
                        administrador.Password = dr[16].ToString();
                        administrador.Ruc = dr[17].ToString();
                        administrador.Email = dr[18].ToString();

                        administrador.Saludo = (administrador.Genero == "F") ? "Bienvenida" : ((administrador.Genero == "M") ? "Bienvenido" : "Bienvenido (a)");
                        string[] dataNomCorto = administrador.Nombre.Split(' ');

                        if (dataNomCorto.Length > 1)
                        {
                            administrador.NombreCorto = dataNomCorto[0] + " " + dataNomCorto[1];
                            if (dataNomCorto[2].Length < 4 && dataNomCorto.Length > 2)
                            {
                                administrador.NombreCorto += dataNomCorto[2];
                            }
                        }
                    }
                }

                return administrador;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Usuario ObtenerPor(int idUsuario, int idEmpresa)
        {
            Usuario usuario = new Usuario();

            try
            {
                var database = Factory.Create("InstitucionConnection");

                using (IDataReader dr = database.ExecuteReader("VerUsuario", idUsuario, idEmpresa))
                {
                    while (dr.Read())
                    {
                        usuario.Nombres = Convert.ToString(dr[0]);
                        usuario.ApellidoPaterno = Convert.ToString(dr[1]);
                        usuario.ApellidoMaterno = Convert.ToString(dr[2]);
                        usuario.Email = Convert.ToString(dr[3]);
                        usuario.Login = Convert.ToString(dr[4]);
                        usuario.Password = Convert.ToString(dr[5]);
                        usuario.TipoUsuario = Convert.ToInt32(dr[6]);
                        usuario.Genero = Convert.ToString(dr[7]);
                        usuario.Rol = Convert.ToString(dr[9]);
                        usuario.Foto = (dr[11] != DBNull.Value) ? Convert.ToString(dr[11]) : "male.png";
                        usuario.IdSedeInicial = (dr[8] != DBNull.Value) ? Convert.ToInt32(dr[8]) : 0;
                        usuario.IdEmpresa = (dr[10] != DBNull.Value) ? Convert.ToInt32(dr[10]) : 0;
                        usuario.Telefono = Convert.ToString(dr[12]);
                        usuario.InicioTurno = (dr[13] != DBNull.Value) ? Convert.ToString(dr[13]) : "";
                        usuario.FinTurno = (dr[14] != DBNull.Value) ? Convert.ToString(dr[14]) : "";
                        usuario.OtroDia = (dr[15] != DBNull.Value) ? Convert.ToInt32(dr[15]) : 0;
                    }
                }

                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Usuario ConsultarUsuario(string dni)
        {
            Usuario usuarioBD = new Usuario();

            try
            {
                var database = Factory.Create("InstitucionConnection");

                using (IDataReader dr = database.ExecuteReader("ConsultarUsuario", dni))
                {
                    while (dr.Read())
                    {
                        usuarioBD.Nombres = Convert.ToString(dr[1]);
                        usuarioBD.ApellidoPaterno = Convert.ToString(dr[2]);
                        usuarioBD.ApellidoMaterno = Convert.ToString(dr[3]);
                        usuarioBD.Email = Convert.ToString(dr[4]);
                        usuarioBD.Genero = Convert.ToString(dr[10]);
                    }
                }

                return usuarioBD;
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Persistencia > " + ex.Message);
            }
        }

        public int ValidarPasswordUser(int idUsuario, string password)
        {
            int result = 0;
            try
            {
                var database = Factory.Create("InstitucionConnection");

                using (IDataReader dr = database.ExecuteReader("ValidarPasswordUser", idUsuario, password))
                {
                    while (dr.Read())
                    {
                        result = (dr[0] != DBNull.Value) ? Convert.ToInt32(dr[0]) : 0;
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int BuscarUsuario(string Login)
        {
            int idUsuario = 0;

            try
            {
                var database = Factory.Create("InstitucionConnection");

                using (IDataReader dr = database.ExecuteReader("BuscarUsuario", Login))
                {
                    while (dr.Read())
                    {
                        idUsuario = Convert.ToInt32(dr[0]);
                    }
                }

                return idUsuario;
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Persistencia > " + ex.Message);
            }
        }

        public bool UsuarioPrincipal(int IdUsuario)
        {
            try
            {
                var database = Factory.Create("InstitucionConnection");
                var success = database.ExecuteNonQuery("UsuarioPrincipal", IdUsuario);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Persistencia > " + ex.Message);
            }
        }
        public bool GuardarConfirmEmailToken(int IdUsuario, string confirmemailtoken)
        {
            try
            {
                var database = Factory.Create("InstitucionConnection");
                var success = database.ExecuteNonQuery("GuardarConfirmEmailToken", IdUsuario, confirmemailtoken);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Persistencia > " + ex.Message);
            }
        }
        public Usuario VerificarConfirmEmailToken(int IdUsuario, string Email, string Login, string token)
        {
            Usuario usuario = new Usuario();

            try
            {
                var database = Factory.Create("InstitucionConnection");

                using (IDataReader dr = database.ExecuteReader("VerificarConfirmEmailToken", IdUsuario, Email, Login, token))
                {
                    while (dr.Read())
                    {
                        usuario.Cantidad = Convert.ToInt32(dr[0]);
                        usuario.EmailConfirmado = (dr[1] != DBNull.Value) ? (Convert.ToInt32(dr[1]) == 1) : false;
                        usuario.Genero = dr[2].ToString();
                        usuario.Nombre = dr[3].ToString();
                        usuario.IdEmpresa = Convert.ToInt32(dr[4]);
                        usuario.Ruc = dr[5].ToString();
                        usuario.RazonSocial = dr[6].ToString();
                        usuario.IdSedeInicial = (dr[7] != DBNull.Value) ? Convert.ToInt32(dr[7]) : 0;
                        usuario.Descripcion = dr[8].ToString();
                        usuario.Email = dr[9].ToString();
                        usuario.Foto = (dr[10] != DBNull.Value) ? dr[10].ToString() : ((usuario.Genero == "F") ? "female.png" : "male.png");


                        //usuario.Moneda = (dr[15] != DBNull.Value) ? dr[15].ToString() : "PEN";
                        //usuario.NotaVenta = (dr[16] != DBNull.Value) ? Convert.ToInt32(dr[16]) : 0;
                        //usuario.TipoDoc = (dr[17] != DBNull.Value) ? Convert.ToInt32(dr[17]) : 0;
                        //usuario.TPV = (dr[18] != DBNull.Value) ? Convert.ToInt32(dr[18]) : 1;
                        //usuario.TipoCajaDiaria = (dr[19] != DBNull.Value) ? Convert.ToInt32(dr[19]) : 1;
                        //usuario.BusquedaCliente = (dr[20] != DBNull.Value) ? Convert.ToInt32(dr[20]) : 0;
                        //usuario.TpvMozo = (dr[21] != DBNull.Value) ? Convert.ToInt32(dr[21]) : 0;

                        string[] dataNomCorto = usuario.Nombre.Split(' ');
                        if (dataNomCorto.Length > 1)
                        {
                            usuario.NombreCorto = dataNomCorto[0] + " " + dataNomCorto[1];
                            if (dataNomCorto[2].Length < 4 && dataNomCorto.Length > 2)
                            {
                                usuario.NombreCorto += dataNomCorto[2];
                            }
                        }
                    }
                }

                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Persistencia > " + ex.Message);
            }
        }

        public List<Usuario> CargarUsuarios(int idEmpresa)
        {
            var list = new List<Usuario>();

            try
            {
                var database = Factory.Create("InstitucionConnection");

                using (IDataReader dr = database.ExecuteReader("ListarUsuarios", idEmpresa))
                {
                    while (dr.Read())
                    {
                        list.Add(new Usuario
                        {
                            IdUsuario = Convert.ToInt32(dr[0]),
                            Nombre = Convert.ToString(dr[1]),

                        });
                    }
                }
                return list;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool EditarPerfil(string Email, string Genero, string Foto, int IdUsuario)
        {
            try
            {
                var database = Factory.Create("InstitucionConnection");
                var success = database.ExecuteNonQuery("EditarPerfil", Email, Genero, Foto, IdUsuario);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Persistencia > " + ex.Message);
            }
        }

        public List<Pais> ListarPaises()
        {
            var listarPaises = new List<Pais>();

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("ListarPaises"))
                {
                    while (dr.Read())
                    {
                        listarPaises.Add(new Pais
                        {
                            IdPais = Convert.ToInt32(dr[0]),
                            Codigo = Convert.ToString(dr[1]),
                            Descripcion = Convert.ToString(dr[2])
                        });
                    }
                }

                return listarPaises;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool CambiarClave(int IdUsuario, string NuevaClave)
        {
            try
            {
                var database = Factory.Create("InstitucionConnection");
                var success = database.ExecuteNonQuery("CambiarClave", IdUsuario, NuevaClave);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Capa Persistencia > " + ex.Message);
            }
        }
    }
}
