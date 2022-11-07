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
    public class DocenteRepository : IDocenteRepository
    {
        #region factory
        private static readonly DatabaseProviderFactory _factory = new DatabaseProviderFactory();
        public static DatabaseProviderFactory Factory { get { return _factory; } }
        #endregion

        public bool CrearPor(string CodigoDocente, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono, /*string Email, int IdSede,*/ int IdEmpresa)
        { // cuando ni siquiera entra al controller es error de js 
            try
            {
                var database = Factory.Create("MinervaConnection");
                var succes = database.ExecuteNonQuery("CrearDocente", CodigoDocente, Dni, Nombres, Apellidos, Direccion, Telefono, /*Email, IdSede,*/ IdEmpresa);

                return succes > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool EditarPor(int IdDocente, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono, /*string Email, int IdSede,*/ int IdEmpresa)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var success = database.ExecuteNonQuery("EditarDocente", IdDocente, Dni, Nombres, Apellidos, Direccion, Telefono, /*Email, IdSede,*/ IdEmpresa);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public bool EliminarPor(int IdDocente)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var success = database.ExecuteNonQuery("EliminarDocente", IdDocente);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Docente> ListarPor(int idEmpresa)
        {
            var listaDocentes = new List<Docente>();

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("ListarDocentes", idEmpresa))
                {
                    while (dr.Read())
                    {
                        listaDocentes.Add(new Docente
                        {

                            IdDocente = Convert.ToInt32(dr[0]),
                            CodigoDocente = Convert.ToString(dr[1]),
                            Dni = Convert.ToString(dr[2]),
                            Nombres = Convert.ToString(dr[3]),
                            Apellidos = Convert.ToString(dr[4]),
                            Telefono = Convert.ToString(dr[5]),
                            Direccion = Convert.ToString(dr[6]),
                            //Email = Convert.ToString(dr[7]),
                            //Sede = Convert.ToString(dr[8])

                        });
                    }
                }

                return listaDocentes;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string BuscarCorrelativoDocente(int IdEmpresa)
        {
            string codigo = "";

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("BuscarCorrelativoDocente", IdEmpresa))
                {
                    while (dr.Read())
                    {
                        codigo = Convert.ToString(dr[0]);
                    }
                }

                return codigo;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Docente VerPor(int idDocente)
        {
            Docente Docente = new Docente();

            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("VerDocente", idDocente))
                {
                    while (dr.Read())
                    {
                        Docente.IdDocente = Convert.ToInt32(dr[0]);
                        Docente.CodigoDocente = Convert.ToString(dr[1]);
                        Docente.Dni = Convert.ToString(dr[2]);
                        Docente.Nombres = Convert.ToString(dr[3]);
                        Docente.Apellidos = Convert.ToString(dr[4]);
                        Docente.Telefono = Convert.ToString(dr[5]);
                        Docente.Direccion = Convert.ToString(dr[6]);
                        //Docente.Email = Convert.ToString(dr[7]);
                        //Docente.IdSede = Convert.ToInt32(dr[8]);
                        //Docente.Sede = (dr[9] != DBNull.Value) ? Convert.ToString(dr[9]) : "";
                    }
                }

                return Docente;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Docente> FiltrarPor(int idEmpresa)
        {
            var list = new List<Docente>();

            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("FiltrarDocente", idEmpresa))
                {
                    while (dr.Read())
                    {
                        list.Add(new Docente
                        {
                            IdDocente = Convert.ToInt32(dr[0]),
                            CodigoDocente = Convert.ToString(dr[1]),
                            Dni = Convert.ToString(dr[2]),
                            Nombres = Convert.ToString(dr[3]),
                            Apellidos = Convert.ToString(dr[4]),
                            Telefono = Convert.ToString(dr[5]),
                            Direccion = Convert.ToString(dr[6]),
                            IdEmpresa = Convert.ToInt32(dr[7]),
                            Estado = Convert.ToInt32(dr[8]),
                            //Email = Convert.ToString(dr[7]),
                            //Sede = Convert.ToString(dr[8]),

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
        public int CrearDocenteExcel(int empresa, string CodigoDocente, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono)
        {
            int Id = 0;
            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("CrearDocenteExcel", empresa, CodigoDocente, Dni, Nombres, Apellidos, Direccion, Telefono ))
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
