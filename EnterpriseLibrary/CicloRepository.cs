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
    public class CicloRepository : ICicloRepository
    {
        #region factory
        private static readonly DatabaseProviderFactory _factory = new DatabaseProviderFactory();
        public static DatabaseProviderFactory Factory { get { return _factory; } }
        #endregion

        public List<Ciclo> ListarPor(int IdEmpresa)
        {
            var listaCiclo = new List<Ciclo>();

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("ListarCiclo", IdEmpresa))
                {
                    while (dr.Read())
                    {
                        listaCiclo.Add(new Ciclo
                        {
                            IdCiclo = Convert.ToInt32(dr[0]),
                            Codigo = Convert.ToString(dr[1]),
                            Descripcion = Convert.ToString(dr[2]),
                            NombreEstado = Convert.ToString(dr[3]),
                        });
                    }
                }

                return listaCiclo;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool CrearPor(string Codigo, string Descripcion, int IdEmpresa)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var succes = database.ExecuteNonQuery("CrearCiclo", Codigo, Descripcion, IdEmpresa);

                return succes > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool EditarPor(int IdCiclo, string Codigo, string Descripcion, int IdEmpresa)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var succes = database.ExecuteNonQuery("EditarCiclo", IdCiclo, Codigo, Descripcion, IdEmpresa);

                return succes > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool EliminarPor(int IdCiclo)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var succes = database.ExecuteNonQuery("EliminarCiclo", IdCiclo);

                return succes > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string BuscarCorrelativoCiclo(int IdEmpresa)
        {
            string codigo = "";

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("BuscarCorrelativoCiclo", IdEmpresa))
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

        public Ciclo VerPor(int IdCiclo)
        {
            Ciclo ciclo = new Ciclo();

            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("VerCiclo", IdCiclo))
                {
                    while (dr.Read())
                    {
                        ciclo.IdCiclo = Convert.ToInt32(dr[0]);
                        ciclo.Codigo = Convert.ToString(dr[1]);
                        ciclo.Descripcion = Convert.ToString(dr[2]);
                    }
                }

                return ciclo;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Ciclo> FiltrarPor(int IdEmpresa)
        {
            var listaCiclo = new List<Ciclo>();

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("FiltrarCiclo", IdEmpresa))
                {
                    while (dr.Read())
                    {
                        listaCiclo.Add(new Ciclo
                        {
                            IdCiclo = Convert.ToInt32(dr[0]),
                            Codigo = Convert.ToString(dr[1]),
                            Descripcion = Convert.ToString(dr[2]),
                        });
                    }
                }

                return listaCiclo;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }

}
