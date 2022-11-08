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
    public class PeriodoRepository : IPeriodoRepository
    {

        #region factory
        private static readonly DatabaseProviderFactory _factory = new DatabaseProviderFactory();
        public static DatabaseProviderFactory Factory { get { return _factory; } }
        #endregion

        public bool CrearPor(string CodigoPeriodo, string Descripcion, int IdEmpresa)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var succes = database.ExecuteNonQuery("CrearPeriodo", CodigoPeriodo, Descripcion, IdEmpresa);

                return succes > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool EditarPor(int IdPeriodo, string Descripcion, int IdEmpresa)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var success = database.ExecuteNonQuery("EditarPeriodo", IdPeriodo, Descripcion, IdEmpresa);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool EliminarPor(int IdPeriodo)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var success = database.ExecuteNonQuery("EliminarPeriodo", IdPeriodo);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string BuscarCorrelativoPeriodo(int IdEmpresa)
        {
            string codigo = "";

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("BuscarCorrelativoPeriodo", IdEmpresa))
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

        public Periodo VerPor(int idPeriodo)
        {
            Periodo periodo = new Periodo();

            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("VerPeriodo", idPeriodo))
                {
                    while (dr.Read())
                    {
                        periodo.IdPeriodo = Convert.ToInt32(dr[0]);
                        periodo.CodigoPeriodo = Convert.ToString(dr[1]);
                        periodo.Descripcion = Convert.ToString(dr[2]);
                    }
                }

                return periodo;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Periodo> FiltrarPor(int idEmpresa)
        {
            var list = new List<Periodo>();

            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("FiltrarPeriodo", idEmpresa))
                {
                    while (dr.Read())
                    {
                        list.Add(new Periodo
                        {
                            IdPeriodo = Convert.ToInt32(dr[0]),
                            CodigoPeriodo = Convert.ToString(dr[1]),
                            Descripcion = Convert.ToString(dr[2]),
                            //IdNivel = Convert.ToInt32(dr[3]),
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

        public List<Periodo> ListarPor(int IdEmpresa)
        {
            var listaPeriodo = new List<Periodo>();

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("ListarPeriodo", IdEmpresa))
                {
                    while (dr.Read())
                    {
                        listaPeriodo.Add(new Periodo
                        {
                            IdPeriodo = Convert.ToInt32(dr[0]),
                            CodigoPeriodo = Convert.ToString(dr[1]),
                            Descripcion = Convert.ToString(dr[2]),
                            //IdNivel = Convert.ToInt32(dr[3]),
                        });
                    }
                }

                return listaPeriodo;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
