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
    public class SedeRepository : ISedeRepository
    {
        #region factory
        private static readonly DatabaseProviderFactory _factory = new DatabaseProviderFactory();
        public static DatabaseProviderFactory Factory { get { return _factory; } }
        #endregion

        public bool CrearPor(string CodigoSede, string RucSede, string Nombre, string Direccion, string CodigoSunat, string NombreSede, string Responsable, string Comision, string Ubigeo, int IdPais, int IdDepartamento, int IdProvincia, int IdDistrito, string Telefono, int IdEmpresa)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var succes = database.ExecuteNonQuery("CrearSede", CodigoSede, RucSede, Nombre, Direccion, CodigoSunat, NombreSede, Responsable, Comision, Ubigeo, IdPais, IdDepartamento, IdProvincia, IdDistrito, Telefono, IdEmpresa);

                return succes > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool EditarPor(int IdSede, string RucSede, string Nombre, string Direccion, string CodigoSunat, string NombreSede, string Responsable, string Comision, string Ubigeo, int IdPais, int IdDepartamento, int IdProvincia, int IdDistrito, string Telefono, int IdEmpresa)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var success = database.ExecuteNonQuery("EditarSede", IdSede, RucSede, Nombre, Direccion, CodigoSunat, NombreSede, Responsable, Comision, Ubigeo, IdPais, IdDepartamento, IdProvincia, IdDistrito, Telefono, IdEmpresa);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public bool EliminarPor(int IdSede)
        {
            try
            {
                var database = Factory.Create("MinervaConnection");
                var success = database.ExecuteNonQuery("EliminarSede", IdSede);

                return success > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Sedes> ListarPor(int idEmpresa)
        {
            var listaSedes = new List<Sedes>();

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("ListarSedes", idEmpresa))
                {
                    while (dr.Read())
                    {
                        listaSedes.Add(new Sedes
                        {

                            IdSede = Convert.ToInt32(dr[0]),
                            CodigoSede = Convert.ToString(dr[1]),
                            RucSede = Convert.ToString(dr[2]),
                            Nombre = Convert.ToString(dr[3]),
                            Direccion = Convert.ToString(dr[4]),
                            Telefono = Convert.ToString(dr[5]),
                            Responsable = Convert.ToString(dr[6]),
                            Ubigeo = Convert.ToString(dr[7]),
                            Estado = Convert.ToInt32(dr[8])

                        });
                    }
                }

                return listaSedes;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string BuscarCorrelativoSede(int IdEmpresa)
        {
            string codigo = "";

            try
            {
                var database = Factory.Create("MinervaConnection");
                using (IDataReader dr = database.ExecuteReader("BuscarCorrelativoSede", IdEmpresa))
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

        public Sedes VerPor(int idSede)
        {
            Sedes sede = new Sedes();

            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("VerSede", idSede))
                {
                    while (dr.Read())
                    {
                        sede.IdSede = Convert.ToInt32(dr[0]);
                        sede.CodigoSede = Convert.ToString(dr[1]);
                        sede.RucSede = Convert.ToString(dr[2]);
                        sede.Nombre = Convert.ToString(dr[3]);
                        sede.Direccion = Convert.ToString(dr[4]);
                        sede.CodigoSunat = Convert.ToString(dr[5]);
                        sede.Responsable = Convert.ToString(dr[6]);
                        sede.Comision = Convert.ToString(dr[7]);
                        sede.Ubigeo = Convert.ToString(dr[8]);
                        sede.IdPais = Convert.ToInt32(dr[9]);
                        sede.Pais = (dr[10] != DBNull.Value) ? Convert.ToString(dr[10]) : "";
                        sede.IdDepartamento = Convert.ToInt32(dr[11]);
                        sede.Departamento = (dr[12] != DBNull.Value) ? Convert.ToString(dr[12]) : "";
                        sede.IdProvincia = Convert.ToInt32(dr[13]);
                        sede.Provincia = (dr[14] != DBNull.Value) ? Convert.ToString(dr[14]) : "";
                        sede.IdDistrito = Convert.ToInt32(dr[15]);
                        sede.Distrito = (dr[16] != DBNull.Value) ? Convert.ToString(dr[16]) : "";
                        sede.Telefono = (dr[17] != DBNull.Value) ? Convert.ToString(dr[17]) : "";
                        sede.NombreSede = (dr[18] != DBNull.Value) ? Convert.ToString(dr[18]) : "";
                    }
                }

                return sede;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Sedes> FiltrarPor(int idEmpresa)
        {
            var list = new List<Sedes>();

            try
            {
                var database = Factory.Create("MinervaConnection");

                using (IDataReader dr = database.ExecuteReader("FiltrarSede", idEmpresa))
                {
                    while (dr.Read())
                    {
                        list.Add(new Sedes
                        {
                            IdSede = Convert.ToInt32(dr[0]),
                            CodigoSede = Convert.ToString(dr[1]),
                            RucSede = Convert.ToString(dr[2]),
                            Nombre = Convert.ToString(dr[3]),
                            Direccion = Convert.ToString(dr[4]),
                            CodigoSunat = Convert.ToString(dr[5]),
                            Responsable = Convert.ToString(dr[6]),
                            Comision = Convert.ToString(dr[7]),
                            Pais = Convert.ToString(dr[8]),
                            Departamento = Convert.ToString(dr[9]),
                            Provincia = Convert.ToString(dr[10]),
                            Ubigeo = Convert.ToString(dr[11]),
                            NombreSede = Convert.ToString(dr[12]),

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
    }
}
