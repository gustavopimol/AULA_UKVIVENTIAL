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
    public class ProvinciaRepository : IProvinciaRepository
    {
        #region factory
        private static readonly DatabaseProviderFactory _factory = new DatabaseProviderFactory();
        public static DatabaseProviderFactory Factory { get { return _factory; } }
        #endregion

        public List<Provincia> ListarProvincias(int idDepartamento)
        {
            var listaProvincias = new List<Provincia>();

            try
            {
                var database = Factory.Create("InstitucionConnection");
                using (IDataReader dr = database.ExecuteReader("ListarProvincias", idDepartamento))
                {
                    while (dr.Read())
                    {
                        listaProvincias.Add(new Provincia
                        {
                            IdProvincia = Convert.ToInt32(dr[0]),
                            Codigo = Convert.ToString(dr[1]),
                            Nombre = Convert.ToString(dr[2]),
                            NombreSunat = Convert.ToString(dr[3])
                        });
                    }
                }

                return listaProvincias;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
