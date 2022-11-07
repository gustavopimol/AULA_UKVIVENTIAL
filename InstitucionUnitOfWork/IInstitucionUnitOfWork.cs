using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository;


namespace InstitucionUnitOfWork
{
    public interface IInstitucionUnitOfWork
    {
        ISedeRepository Sedes { get; set; }
        IAlumnoRepository Alumnos { get; set; }
        IUsuarioRepository Usuarios { get; set; }
        IDepartamentoRepository Departamentos { get; set; }
        IProvinciaRepository Provincias { get; set; }
        IDistritoRepository Distritos { get; set; }
        IPromotorRepository Promotores { get; set; }
        ICicloRepository Ciclos { get; set; }
        ICursosRepository Cursos { get; set; }
        INivelRepository Niveles { get; set; } 
        IAulaRepository Aulas { get; set; }
    }
}
