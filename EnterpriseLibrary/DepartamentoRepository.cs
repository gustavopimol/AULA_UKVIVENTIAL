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
    public class DepartamentoRepository : IDepartamentoRepository
    {
        #region factory
        private static readonly DatabaseProviderFactory _factory = new DatabaseProviderFactory();
        public static DatabaseProviderFactory Factory { get { return _factory; } }
        #endregion

        public List<Departamento> ListarDepartamentos()
        {
            var listaDepartamentos = new List<Departamento>();

            try
            {
                var database = Factory.Create("InstitucionConnection");
                using (IDataReader dr = database.ExecuteReader("ListarDepartamentos"))
                {
                    while (dr.Read())
                    {
                        listaDepartamentos.Add(new Departamento
                        {
                            IdDepartamento = Convert.ToInt32(dr[0]),
                            Codigo = Convert.ToString(dr[1]),
                            Nombre = Convert.ToString(dr[2]),
                            NombreSunat = Convert.ToString(dr[3])
                        });
                    }
                }

                return listaDepartamentos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
