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
    public class PromotorRepository : IPromotorRepository
    {
        #region factory
        private static readonly DatabaseProviderFactory _factory = new DatabaseProviderFactory();
        public static DatabaseProviderFactory Factory { get { return _factory; } }
        #endregion

        public bool CrearPor(string CodigoPromotor, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono, string Email, int IdSede, int IdEmpresa)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var succes = database.ExecuteNonQuery("CrearPromotor", CodigoPromotor, Dni, Nombres, Apellidos, Direccion, Telefono, Email, IdSede, IdEmpresa);

                return succes > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool EditarPor(int IdPromotor, string Dni, string Nombres, string Apellidos, string Direccion, string Telefono, string Email, int IdSede, int IdEmpresa)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var success = database.ExecuteNonQuery("EditarPromotor", IdPromotor, Dni, Nombres, Apellidos, Direccion, Telefono, Email, IdSede, IdEmpresa);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public bool EliminarPor(int IdPromotor)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var success = database.ExecuteNonQuery("EliminarPromotor", IdPromotor);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Promotor> ListarPor(int idEmpresa)
        {
            var listaPromotores = new List<Promotor>();

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("ListarPromotores", idEmpresa))
                {
                    while (dr.Read())
                    {
                        listaPromotores.Add(new Promotor
                        {

                            IdPromotor = Convert.ToInt32(dr[0]),
                            CodigoPromotor = Convert.ToString(dr[1]),
                            Dni = Convert.ToString(dr[2]),
                            Nombres = Convert.ToString(dr[3]),
                            Apellidos = Convert.ToString(dr[4]),
                            Telefono = Convert.ToString(dr[5]),
                            Direccion = Convert.ToString(dr[6]),
                            Email = Convert.ToString(dr[7]),
                            Sede = Convert.ToString(dr[8])

                        });
                    }
                }

                return listaPromotores;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string BuscarCorrelativoPromotor(int IdEmpresa)
        {
            string codigo = "";

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("BuscarCorrelativoPromotor", IdEmpresa))
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

        public Promotor VerPor(int idPromotor)
        {
            Promotor Promotor = new Promotor();

            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("VerPromotor", idPromotor))
                {
                    while (dr.Read())
                    {
                        Promotor.IdPromotor = Convert.ToInt32(dr[0]);
                        Promotor.CodigoPromotor = Convert.ToString(dr[1]);
                        Promotor.Dni = Convert.ToString(dr[2]);
                        Promotor.Nombres = Convert.ToString(dr[3]);
                        Promotor.Apellidos = Convert.ToString(dr[4]);
                        Promotor.Telefono = Convert.ToString(dr[5]);
                        Promotor.Direccion = Convert.ToString(dr[6]);
                        Promotor.Email = Convert.ToString(dr[7]);
                        Promotor.IdSede = Convert.ToInt32(dr[8]);
                        Promotor.Sede = (dr[9] != DBNull.Value) ? Convert.ToString(dr[9]) : "";
                    }
                }

                return Promotor;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Promotor> FiltrarPor(int idEmpresa)
        {
            var list = new List<Promotor>();

            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("FiltrarPromotor", idEmpresa))
                {
                    while (dr.Read())
                    {
                        list.Add(new Promotor
                        {
                            IdPromotor = Convert.ToInt32(dr[0]),
                            CodigoPromotor = Convert.ToString(dr[1]),
                            Dni = Convert.ToString(dr[2]),
                            Nombres = Convert.ToString(dr[3]),
                            Apellidos = Convert.ToString(dr[4]),
                            Telefono = Convert.ToString(dr[5]),
                            Direccion = Convert.ToString(dr[6]),
                            Email = Convert.ToString(dr[7]),
                            Sede = Convert.ToString(dr[8]),

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
    }
}
