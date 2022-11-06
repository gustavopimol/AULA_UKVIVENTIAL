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
    public class DistritoRepository : IDistritoRepository
    {
        #region factory
        private static readonly DatabaseProviderFactory _factory = new DatabaseProviderFactory();
        public static DatabaseProviderFactory Factory { get { return _factory; } }
        #endregion

        public List<Distrito> ListarDistrito(int idProvincia)
        {
            var listaDistritos = new List<Distrito>();

            try
            {
                var database = Factory.Create("InstitucionConnection");
                using (IDataReader dr = database.ExecuteReader("ListarDistritos", idProvincia))
                {
                    while (dr.Read())
                    {
                        listaDistritos.Add(new Distrito
                        {
                            IdDistrito = Convert.ToInt32(dr[0]),
                            Codigo = Convert.ToString(dr[1]),
                            Nombre = Convert.ToString(dr[2]),
                            NombreSunat = Convert.ToString(dr[3])
                        });
                    }
                }

                return listaDistritos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int BuscarUbigeoDistrito(string provincia)
        {
            int idUbigeo = 0;

            try
            {
                var database = Factory.Create("InstitucionConnection");
                using (IDataReader dr = database.ExecuteReader("BuscarUbigeoDistrito", provincia))
                {
                    while (dr.Read())
                    {
                        idUbigeo = (dr[0] != DBNull.Value) ? Convert.ToInt32(dr[0]) : 0;
                    }
                }

                return idUbigeo;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<string> BuscarDireccionPorUbigeo(string codigo)
        {
            var campos = new List<string>();

            try
            {
                var database = Factory.Create("InstitucionConnection");
                using (IDataReader dr = database.ExecuteReader("BuscarDireccionPorUbigeo", codigo))
                {
                    while (dr.Read())
                    {
                        campos.Add((dr[0] != DBNull.Value) ? Convert.ToString(dr[0]) : "");
                        campos.Add((dr[1] != DBNull.Value) ? Convert.ToString(dr[1]) : "");
                        campos.Add((dr[2] != DBNull.Value) ? Convert.ToString(dr[2]) : "");
                    }
                }

                return campos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
