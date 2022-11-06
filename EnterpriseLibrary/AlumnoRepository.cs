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
    public class AlumnoRepository : IAlumnoRepository
    {
        #region factory
        private static readonly DatabaseProviderFactory _factory = new DatabaseProviderFactory();
        public static DatabaseProviderFactory Factory { get { return _factory; } }
        #endregion

        public List<Alumno> ListarPor(int IdEmpresa)
        {
            var listaAlumno = new List<Alumno>();

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("ListarAlumno", IdEmpresa))
                {
                    while (dr.Read())
                    {
                        listaAlumno.Add(new Alumno
                        {
                            Id = Convert.ToInt32(dr[0]),
                            IdAlumno = Convert.ToInt32(dr[1]),
                            Dni = Convert.ToString(dr[2]),
                            Nombres = Convert.ToString(dr[3]),
                            APaterno = Convert.ToString(dr[4]),
                            AMaterno = Convert.ToString(dr[5]),
                            FechaNacimiento = Convert.ToDateTime(dr[6]),
                            FechaNacimientoS = (dr[6] != DBNull.Value) ? (Convert.ToDateTime(dr[6])).Date.ToString("dd-MM-yyyy") : "",
                            Direccion = Convert.ToString(dr[7]),
                            Ubigeo = Convert.ToString(dr[8]),
                            Telefono = Convert.ToString(dr[9]),
                            Email = Convert.ToString(dr[10]),
                            Tipo = Convert.ToString(dr[11]),
                            FechaCreacion = Convert.ToDateTime(dr[12]),
                            FechaCreacionS = (dr[12] != DBNull.Value) ? (Convert.ToDateTime(dr[12])).Date.ToString("dd-MM-yyyy") : "",
                            Registrador = Convert.ToString(dr[13]),
                            Modificador = Convert.ToString(dr[14]),
                            FechaModifica = Convert.ToDateTime(dr[15]),
                            FechaModificaS = (dr[15] != DBNull.Value) ? (Convert.ToDateTime(dr[15])).Date.ToString("dd-MM-yyyy") : "",
                            Sede = Convert.ToString(dr[16]),
                            Promotor = Convert.ToString(dr[17]),
                            Pais = Convert.ToString(dr[18]),
                            Departamento = Convert.ToString(dr[19]),
                            Provincia = Convert.ToString(dr[20])
                        });
                    }
                }

                return listaAlumno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int CrearPor(string Dni, string Tipo, string Nombres, string APaterno, string AMaterno, DateTime fechaNa, string Direccion, string Ubigeo, string Telefono, string Email, int IdSede, string Registrador, int IdPais, int IdDepartamento, int IdProvincia, int IdPromotor, int IdEmpresa)
        {
            int Id = 0;

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("CrearAlumno", Dni, Tipo, Nombres, APaterno, AMaterno, fechaNa, Direccion, Ubigeo, Telefono, Email, IdSede, Registrador, IdPais, IdDepartamento, IdProvincia, IdPromotor, IdEmpresa))
                {
                    while (dr.Read())
                    {
                        Id = Convert.ToInt32(dr[0]);
                    }
                }
                return Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Alumno> FiltrarPor(int IdEmpresa, int sedesal, string docum, string nombal, DateTime inicio, DateTime fin)
        {
            var listaAlumno = new List<Alumno>();

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("FiltrarAlumno", IdEmpresa, sedesal, docum, nombal, inicio, fin))
                {
                    while (dr.Read())
                    {
                        listaAlumno.Add(new Alumno
                        {
                            Id = Convert.ToInt32(dr[0]),
                            IdAlumno = Convert.ToInt32(dr[1]),
                            Dni = Convert.ToString(dr[2]),
                            Nombres = Convert.ToString(dr[3]),
                            APaterno = Convert.ToString(dr[4]),
                            AMaterno = Convert.ToString(dr[5]),
                            FechaNacimiento = Convert.ToDateTime(dr[6]),
                            FechaNacimientoS = (dr[6] != DBNull.Value) ? (Convert.ToDateTime(dr[6])).Date.ToString("dd-MM-yyyy") : "",
                            Direccion = Convert.ToString(dr[7]),
                            Ubigeo = Convert.ToString(dr[8]),
                            Telefono = Convert.ToString(dr[9]),
                            Email = Convert.ToString(dr[10]),
                            Tipo = Convert.ToString(dr[11]),
                            FechaCreacion = Convert.ToDateTime(dr[12]),
                            FechaCreacionS = (dr[12] != DBNull.Value) ? (Convert.ToDateTime(dr[12])).Date.ToString("dd-MM-yyyy") : "",
                            Registrador = Convert.ToString(dr[13]),
                            Modificador = Convert.ToString(dr[14]),
                            FechaModifica = Convert.ToDateTime(dr[15]),
                            FechaModificaS = (dr[15] != DBNull.Value) ? (Convert.ToDateTime(dr[15])).Date.ToString("dd-MM-yyyy") : "",
                            Pais = Convert.ToString(dr[16]),
                            Departamento = Convert.ToString(dr[17]),
                            Provincia = Convert.ToString(dr[18]),
                            Sede = Convert.ToString(dr[19]),
                            Promotor = Convert.ToString(dr[20])
                        });
                    }
                }

                return listaAlumno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int EditarPor(int Id, string Dni, string Tipo, string Nombres, string APaterno, string AMaterno, DateTime fechaNa, string Direccion, string Ubigeo, string Telefono, string Email, int IdSede, string Modificador, DateTime fechaMo, int IdPais, int IdDepartamento, int IdProvincia, int IdPromotor, int IdEmpresa)
        {

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("EditarAlumno", Id, Dni, Tipo, Nombres, APaterno, AMaterno, fechaNa, Direccion, Ubigeo, Telefono, Email, IdSede, Modificador, fechaMo, IdPais, IdDepartamento, IdProvincia, IdPromotor, IdEmpresa))
                {
                    while (dr.Read())
                    {
                        Id = Convert.ToInt32(dr[0]);
                    }
                }
                return Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Alumno VerPor(int Id)
        {
            Alumno alumno = new Alumno();

            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("VerAlumno", Id))
                {
                    while (dr.Read())
                    {
                        alumno.Id = Convert.ToInt32(dr[0]);
                        alumno.IdAlumno = Convert.ToInt32(dr[1]);
                        alumno.Dni = Convert.ToString(dr[2]);
                        alumno.Tipo = Convert.ToString(dr[3]);
                        alumno.Nombres = Convert.ToString(dr[4]);
                        alumno.APaterno = Convert.ToString(dr[5]);
                        alumno.AMaterno = Convert.ToString(dr[6]);
                        alumno.FechaNacimiento = Convert.ToDateTime(dr[7]);
                        alumno.FechaNacimientoS = (dr[7] != DBNull.Value) ? (Convert.ToDateTime(dr[7])).Date.ToString("yyyy-MM-dd") : "";
                        alumno.Direccion = Convert.ToString(dr[8]);
                        alumno.Ubigeo = Convert.ToString(dr[9]);
                        alumno.Telefono = Convert.ToString(dr[10]);
                        alumno.Email = Convert.ToString(dr[11]);
                        alumno.Registrador = Convert.ToString(dr[13]);
                        alumno.Modificador = Convert.ToString(dr[14]);
                        alumno.FechaModifica = Convert.ToDateTime(dr[15]);
                        alumno.FechaModificaS = (dr[15] != DBNull.Value) ? (Convert.ToDateTime(dr[15])).Date.ToString("yyyy-MM-dd") : "";
                        alumno.IdSede = Convert.ToInt32(dr[16]);
                        alumno.Sede = (dr[17] != DBNull.Value) ? Convert.ToString(dr[17]) : "";
                        alumno.IdPromotor = Convert.ToInt32(dr[18]);
                        alumno.Promotor = (dr[19] != DBNull.Value) ? Convert.ToString(dr[19]) : "";
                        alumno.IdPais = Convert.ToInt32(dr[20]);
                        alumno.Pais = Convert.ToString(dr[21]);
                        alumno.IdDepartamento = Convert.ToInt32(dr[22]);
                        alumno.Departamento = Convert.ToString(dr[23]);
                        alumno.IdProvincia = Convert.ToInt32(dr[24]);
                        alumno.Provincia = Convert.ToString(dr[25]);
                    }
                }

                return alumno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string BuscarCorrelativoAlumno(int IdEmpresa)
        {
            string idalumno = "";

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("BuscarCorrelativoAlumno", IdEmpresa))
                {
                    while (dr.Read())
                    {
                        idalumno = Convert.ToString(dr[0]);
                    }
                }

                return idalumno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public DateTime ObtenerFechaServidor()
        {
            DateTime fechaSer = new DateTime();
            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("ObtenerFechaServidor"))
                {
                    while (dr.Read())
                    {
                        fechaSer = Convert.ToDateTime(dr[0]);
                    }
                }
                return fechaSer;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool EliminarPor(string Dni, int IdUsuarioE)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var succes = database.ExecuteNonQuery("EliminarAlumno", Dni, IdUsuarioE);

                return succes > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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

        public List<Departamento> ListarDepartamentos()
        {
            var listarDepartamentos = new List<Departamento>();

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("ListarDepartamentos"))
                {
                    while (dr.Read())
                    {
                        listarDepartamentos.Add(new Departamento
                        {
                            IdDepartamento = Convert.ToInt32(dr[0]),
                            Codigo = Convert.ToString(dr[1]),
                            Nombre = Convert.ToString(dr[2]),
                            NombreSunat = Convert.ToString(dr[3])
                        });
                    }
                }

                return listarDepartamentos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Provincia> ListarProvincias()
        {
            var listarProvincias = new List<Provincia>();

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("ListarProvincias"))
                {
                    while (dr.Read())
                    {
                        listarProvincias.Add(new Provincia
                        {
                            IdProvincia = Convert.ToInt32(dr[0]),
                            Codigo = Convert.ToString(dr[1]),
                            Nombre = Convert.ToString(dr[2]),
                            NombreSunat = Convert.ToString(dr[3])
                        });
                    }
                }

                return listarProvincias;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int CrearAlumnoExcel(int empresa, string Nombres, string APaterno, string AMaterno, string Tipo, string Dni, string FechaNacimiento, string Direccion, string Pais, string Departamento, string Provincia, string Ubigeo, string Email, string Sede, string Promotor, string registro, string Telefono)
        {
            int Id = 0;
            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("CrearAlumnoExcel", empresa, Nombres, APaterno, AMaterno, Tipo, Dni, FechaNacimiento, Direccion, Pais, Departamento, Provincia, Ubigeo, Email, Sede, Promotor, registro, Telefono))
                {
                    while (dr.Read())
                    {
                        Id = Convert.ToInt32(dr[0]);
                    }
                }

                return Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
