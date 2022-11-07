using EnterpriseLibrary;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InstitucionUnitOfWork
{
    public class InstitucionUnitOfWork : IInstitucionUnitOfWork
    {
        
            public InstitucionUnitOfWork()
            {
                Usuarios = new UsuarioRepository();
                Alumnos = new AlumnoRepository();
                Departamentos = new DepartamentoRepository();
                Sedes = new SedeRepository();
                Provincias = new ProvinciaRepository();
                Distritos = new DistritoRepository();
                Promotores = new PromotorRepository();
                Ciclos = new CicloRepository();
                Niveles = new NivelRepository();
                Cursos = new CursosRepository();
        }
            public IDepartamentoRepository Departamentos { get; set; }
            public ICicloRepository Ciclos { get; set; }
            public IProvinciaRepository Provincias { get; set; }
            public IDistritoRepository Distritos { get; set; }
            public IUsuarioRepository Usuarios { get; set; }
            public IAlumnoRepository Alumnos { get; set; }
            public ISedeRepository Sedes { get; set; }
            public IPromotorRepository Promotores { get; set; }
            public INivelRepository Niveles { get; set; }
            public IAulaRepository Aulas { get; set; }
            public ICursosRepository Cursos { get; set; }
    }
    
}
