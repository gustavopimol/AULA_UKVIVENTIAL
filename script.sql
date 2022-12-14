USE [BDMinerva]
GO
/****** Object:  Table [dbo].[ALUMNADO]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ALUMNADO](
	[IdAlumno] [tinyint] NOT NULL,
	[Dni] [nchar](8) NULL,
	[Nombres] [varchar](150) NULL,
	[Apellidos] [varchar](150) NULL,
	[Direccion] [varchar](max) NULL,
	[Telefono] [varchar](9) NULL,
	[FechaNacimiento] [datetime] NULL,
	[estado] [tinyint] NULL,
	[IdUsuario] [tinyint] NOT NULL,
	[IdAula] [tinyint] NOT NULL,
	[IdEmpresa] [tinyint] NULL,
	[CODIGO] [nchar](4) NULL,
 CONSTRAINT [PK_ALUMNADO] PRIMARY KEY CLUSTERED 
(
	[IdAlumno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AULA]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AULA](
	[IdAula] [tinyint] NOT NULL,
	[codigo] [varchar](50) NULL,
	[descripcion] [varchar](50) NULL,
	[cantMaxAlum] [int] NULL,
	[estado] [tinyint] NULL,
	[IdHorario] [tinyint] NOT NULL,
	[IdDocente] [tinyint] NOT NULL,
	[IdUsuario] [tinyint] NOT NULL,
 CONSTRAINT [PK_AULA] PRIMARY KEY CLUSTERED 
(
	[IdAula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CICLO]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CICLO](
	[IdCiclo] [tinyint] NOT NULL,
	[descripcion] [varchar](50) NULL,
	[estado] [tinyint] NULL,
	[IdAula] [tinyint] NOT NULL,
	[IdMaterialDidactico] [tinyint] NOT NULL,
 CONSTRAINT [PK_CICLO] PRIMARY KEY CLUSTERED 
(
	[IdCiclo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DEPARTAMENTO]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DEPARTAMENTO](
	[IdDepartamento] [tinyint] NOT NULL,
	[Descripcion] [varchar](50) NULL,
	[IdPais] [tinyint] NOT NULL,
 CONSTRAINT [PK_DEPARTAMENTO] PRIMARY KEY CLUSTERED 
(
	[IdDepartamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DISTRITO]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DISTRITO](
	[IdDistrito] [tinyint] NOT NULL,
	[Descripcion] [varchar](50) NULL,
	[IdProvincia] [tinyint] NOT NULL,
 CONSTRAINT [PK_DISTRITO] PRIMARY KEY CLUSTERED 
(
	[IdDistrito] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DOCENTE]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DOCENTE](
	[IdDocente] [tinyint] NOT NULL,
	[Dni] [nchar](8) NULL,
	[Nombres] [varchar](50) NULL,
	[Apellidos] [varchar](50) NULL,
	[Direccion] [varchar](max) NULL,
	[Telefono] [varchar](9) NULL,
	[IdUsuario] [tinyint] NOT NULL,
	[IdEmpresa] [tinyint] NOT NULL,
 CONSTRAINT [PK_DOCENTE] PRIMARY KEY CLUSTERED 
(
	[IdDocente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DOCUMENTACION]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DOCUMENTACION](
	[IdDocumentacion] [tinyint] NOT NULL,
	[descripcion] [varchar](50) NULL,
 CONSTRAINT [PK_DOCUMENTACION] PRIMARY KEY CLUSTERED 
(
	[IdDocumentacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EMPRESA]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EMPRESA](
	[IdEmpresa] [tinyint] NOT NULL,
	[RazonSocial] [varchar](50) NULL,
	[Direccion] [varchar](50) NULL,
	[Telefono] [varchar](9) NULL,
	[RUC] [nchar](11) NULL,
	[IdSede] [tinyint] NOT NULL,
	[codigo] [nchar](4) NULL,
 CONSTRAINT [PK_EMPRESA] PRIMARY KEY CLUSTERED 
(
	[IdEmpresa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EVALUACION]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EVALUACION](
	[IdEvaluacion] [tinyint] NOT NULL,
	[descripcion] [varchar](50) NULL,
 CONSTRAINT [PK_EVALUACION] PRIMARY KEY CLUSTERED 
(
	[IdEvaluacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MATERIALDIDACTICO]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MATERIALDIDACTICO](
	[IdMaterialDidactico] [tinyint] NOT NULL,
	[Tema] [varchar](50) NULL,
	[IdDocumentacion] [tinyint] NOT NULL,
	[IdEvaluacion] [tinyint] NOT NULL,
 CONSTRAINT [PK_MATERIALDIDACTICO] PRIMARY KEY CLUSTERED 
(
	[IdMaterialDidactico] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NIVEL]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NIVEL](
	[IdNivel] [tinyint] NOT NULL,
	[descripcion] [varchar](50) NULL,
	[estado] [tinyint] NULL,
	[IdCiclo] [tinyint] NOT NULL,
	[codigo] [nchar](4) NULL,
	[IdEmpresa] [tinyint] NULL,
 CONSTRAINT [PK_NIVEL] PRIMARY KEY CLUSTERED 
(
	[IdNivel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PAIS]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PAIS](
	[IdPais] [tinyint] NOT NULL,
	[Descripcion] [varchar](50) NULL,
	[codigo] [nchar](4) NULL,
 CONSTRAINT [PK_PAIS] PRIMARY KEY CLUSTERED 
(
	[IdPais] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PERIODO]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERIODO](
	[IdPeriodo] [tinyint] NOT NULL,
	[descripcion] [varchar](50) NULL,
	[estado] [tinyint] NULL,
	[IdNivel] [tinyint] NOT NULL,
	[IdEmpresa] [tinyint] NULL,
	[CODIGO] [nchar](4) NULL,
 CONSTRAINT [PK_PERIODO] PRIMARY KEY CLUSTERED 
(
	[IdPeriodo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PROMOTOR]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROMOTOR](
	[IdPromotor] [tinyint] NOT NULL,
	[Dni] [nchar](8) NULL,
	[Nombres] [varchar](50) NULL,
	[Apellidos] [varchar](50) NULL,
	[Direccion] [varchar](max) NULL,
	[Telefono] [varchar](9) NULL,
	[IdUsuario] [tinyint] NOT NULL,
	[IdEmpresa] [tinyint] NOT NULL,
	[CODIGO] [nchar](4) NULL,
	[estado] [tinyint] NULL,
 CONSTRAINT [PK_PROMOTOR] PRIMARY KEY CLUSTERED 
(
	[IdPromotor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PROVINCIA]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROVINCIA](
	[IdProvincia] [tinyint] NOT NULL,
	[Descripcion] [varchar](50) NULL,
	[IdDepartamento] [tinyint] NOT NULL,
 CONSTRAINT [PK_PROVINCIA] PRIMARY KEY CLUSTERED 
(
	[IdProvincia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ROL]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ROL](
	[IdRol] [tinyint] NOT NULL,
	[descripcion] [varchar](50) NULL,
 CONSTRAINT [PK_ROL] PRIMARY KEY CLUSTERED 
(
	[IdRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ROL_USUARIO]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ROL_USUARIO](
	[IdRolUsuario] [tinyint] NOT NULL,
	[estado] [tinyint] NULL,
	[IdRol] [tinyint] NOT NULL,
	[IdUsuario] [tinyint] NOT NULL,
 CONSTRAINT [PK_ROL_USUARIO] PRIMARY KEY CLUSTERED 
(
	[IdRolUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SEDE]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SEDE](
	[IdSede] [tinyint] NOT NULL,
	[codigo] [varchar](50) NULL,
	[RUC] [nchar](11) NULL,
	[Nombre] [varchar](50) NULL,
	[Direccion] [varchar](50) NULL,
	[Telefono] [varchar](9) NULL,
	[Responsable] [varchar](max) NULL,
	[ubigeo] [varchar](50) NULL,
	[IdEmpresa] [tinyint] NULL,
	[estado] [tinyint] NULL,
 CONSTRAINT [PK_SEDE] PRIMARY KEY CLUSTERED 
(
	[IdSede] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USUARIO]    Script Date: 05/11/2022 07:34:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USUARIO](
	[IdUsuario] [tinyint] NOT NULL,
	[Dni] [varchar](11) NULL,
	[Nombres] [varchar](max) NULL,
	[ApellidoPaterno] [varchar](max) NULL,
	[ApellidoMaterno] [varchar](max) NULL,
	[telefono] [varchar](9) NULL,
	[direccion] [varchar](max) NULL,
	[sexo] [nchar](1) NULL,
	[email] [varchar](max) NULL,
	[estado] [tinyint] NULL,
	[IdDistrito] [tinyint] NOT NULL,
	[codigo] [nchar](4) NULL,
	[usuario] [varchar](50) NULL,
	[contraseña] [varchar](50) NULL,
	[IdEmpresa] [tinyint] NULL,
 CONSTRAINT [PK_USUARIO] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[ALUMNADO]  WITH CHECK ADD  CONSTRAINT [FK_ALUMNADO_AULA] FOREIGN KEY([IdAula])
REFERENCES [dbo].[AULA] ([IdAula])
GO
ALTER TABLE [dbo].[ALUMNADO] CHECK CONSTRAINT [FK_ALUMNADO_AULA]
GO
ALTER TABLE [dbo].[ALUMNADO]  WITH CHECK ADD  CONSTRAINT [FK_ALUMNADO_USUARIO] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[USUARIO] ([IdUsuario])
GO
ALTER TABLE [dbo].[ALUMNADO] CHECK CONSTRAINT [FK_ALUMNADO_USUARIO]
GO
ALTER TABLE [dbo].[CICLO]  WITH CHECK ADD  CONSTRAINT [FK_CICLO_AULA] FOREIGN KEY([IdAula])
REFERENCES [dbo].[AULA] ([IdAula])
GO
ALTER TABLE [dbo].[CICLO] CHECK CONSTRAINT [FK_CICLO_AULA]
GO
ALTER TABLE [dbo].[CICLO]  WITH CHECK ADD  CONSTRAINT [FK_CICLO_MATERIALDIDACTICO] FOREIGN KEY([IdMaterialDidactico])
REFERENCES [dbo].[MATERIALDIDACTICO] ([IdMaterialDidactico])
GO
ALTER TABLE [dbo].[CICLO] CHECK CONSTRAINT [FK_CICLO_MATERIALDIDACTICO]
GO
ALTER TABLE [dbo].[DEPARTAMENTO]  WITH CHECK ADD  CONSTRAINT [FK_DEPARTAMENTO_PAIS] FOREIGN KEY([IdPais])
REFERENCES [dbo].[PAIS] ([IdPais])
GO
ALTER TABLE [dbo].[DEPARTAMENTO] CHECK CONSTRAINT [FK_DEPARTAMENTO_PAIS]
GO
ALTER TABLE [dbo].[DISTRITO]  WITH CHECK ADD  CONSTRAINT [FK_DISTRITO_PROVINCIA] FOREIGN KEY([IdProvincia])
REFERENCES [dbo].[PROVINCIA] ([IdProvincia])
GO
ALTER TABLE [dbo].[DISTRITO] CHECK CONSTRAINT [FK_DISTRITO_PROVINCIA]
GO
ALTER TABLE [dbo].[DOCENTE]  WITH CHECK ADD  CONSTRAINT [FK_DOCENTE_EMPRESA] FOREIGN KEY([IdEmpresa])
REFERENCES [dbo].[EMPRESA] ([IdEmpresa])
GO
ALTER TABLE [dbo].[DOCENTE] CHECK CONSTRAINT [FK_DOCENTE_EMPRESA]
GO
ALTER TABLE [dbo].[DOCENTE]  WITH CHECK ADD  CONSTRAINT [FK_DOCENTE_USUARIO] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[USUARIO] ([IdUsuario])
GO
ALTER TABLE [dbo].[DOCENTE] CHECK CONSTRAINT [FK_DOCENTE_USUARIO]
GO
ALTER TABLE [dbo].[EMPRESA]  WITH CHECK ADD  CONSTRAINT [FK_EMPRESA_SEDE] FOREIGN KEY([IdSede])
REFERENCES [dbo].[SEDE] ([IdSede])
GO
ALTER TABLE [dbo].[EMPRESA] CHECK CONSTRAINT [FK_EMPRESA_SEDE]
GO
ALTER TABLE [dbo].[MATERIALDIDACTICO]  WITH CHECK ADD  CONSTRAINT [FK_MATERIALDIDACTICO_DOCUMENTACION] FOREIGN KEY([IdDocumentacion])
REFERENCES [dbo].[DOCUMENTACION] ([IdDocumentacion])
GO
ALTER TABLE [dbo].[MATERIALDIDACTICO] CHECK CONSTRAINT [FK_MATERIALDIDACTICO_DOCUMENTACION]
GO
ALTER TABLE [dbo].[MATERIALDIDACTICO]  WITH CHECK ADD  CONSTRAINT [FK_MATERIALDIDACTICO_EVALUACION] FOREIGN KEY([IdEvaluacion])
REFERENCES [dbo].[EVALUACION] ([IdEvaluacion])
GO
ALTER TABLE [dbo].[MATERIALDIDACTICO] CHECK CONSTRAINT [FK_MATERIALDIDACTICO_EVALUACION]
GO
ALTER TABLE [dbo].[NIVEL]  WITH CHECK ADD  CONSTRAINT [FK_NIVEL_CICLO] FOREIGN KEY([IdCiclo])
REFERENCES [dbo].[CICLO] ([IdCiclo])
GO
ALTER TABLE [dbo].[NIVEL] CHECK CONSTRAINT [FK_NIVEL_CICLO]
GO
ALTER TABLE [dbo].[PERIODO]  WITH CHECK ADD  CONSTRAINT [FK_PERIODO_NIVEL] FOREIGN KEY([IdNivel])
REFERENCES [dbo].[NIVEL] ([IdNivel])
GO
ALTER TABLE [dbo].[PERIODO] CHECK CONSTRAINT [FK_PERIODO_NIVEL]
GO
ALTER TABLE [dbo].[PROMOTOR]  WITH CHECK ADD  CONSTRAINT [FK_PROMOTOR_EMPRESA] FOREIGN KEY([IdEmpresa])
REFERENCES [dbo].[EMPRESA] ([IdEmpresa])
GO
ALTER TABLE [dbo].[PROMOTOR] CHECK CONSTRAINT [FK_PROMOTOR_EMPRESA]
GO
ALTER TABLE [dbo].[PROMOTOR]  WITH CHECK ADD  CONSTRAINT [FK_PROMOTOR_USUARIO] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[USUARIO] ([IdUsuario])
GO
ALTER TABLE [dbo].[PROMOTOR] CHECK CONSTRAINT [FK_PROMOTOR_USUARIO]
GO
ALTER TABLE [dbo].[PROVINCIA]  WITH CHECK ADD  CONSTRAINT [FK_PROVINCIA_DEPARTAMENTO] FOREIGN KEY([IdDepartamento])
REFERENCES [dbo].[DEPARTAMENTO] ([IdDepartamento])
GO
ALTER TABLE [dbo].[PROVINCIA] CHECK CONSTRAINT [FK_PROVINCIA_DEPARTAMENTO]
GO
ALTER TABLE [dbo].[ROL_USUARIO]  WITH CHECK ADD  CONSTRAINT [FK_ROL_USUARIO_ROL] FOREIGN KEY([IdRol])
REFERENCES [dbo].[ROL] ([IdRol])
GO
ALTER TABLE [dbo].[ROL_USUARIO] CHECK CONSTRAINT [FK_ROL_USUARIO_ROL]
GO
ALTER TABLE [dbo].[ROL_USUARIO]  WITH CHECK ADD  CONSTRAINT [FK_ROL_USUARIO_USUARIO] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[USUARIO] ([IdUsuario])
GO
ALTER TABLE [dbo].[ROL_USUARIO] CHECK CONSTRAINT [FK_ROL_USUARIO_USUARIO]
GO
ALTER TABLE [dbo].[USUARIO]  WITH CHECK ADD  CONSTRAINT [FK_USUARIO_DISTRITO] FOREIGN KEY([IdDistrito])
REFERENCES [dbo].[DISTRITO] ([IdDistrito])
GO
ALTER TABLE [dbo].[USUARIO] CHECK CONSTRAINT [FK_USUARIO_DISTRITO]
GO
/****** Object:  StoredProcedure [dbo].[ActualizarAula]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[ActualizarAula]
@IdEmpresa int,
@Aula int
as
SET NOCOUNT ON;
select COUNT(M.IdMatricula) from Matriculas M
		inner join Aula A on M.IdAula = A.IdAula
		where M.IdMatricula = A.IdAula
GO
/****** Object:  StoredProcedure [dbo].[BuscarCorrelativoAlumno]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[BuscarCorrelativoAlumno]
@IdEmpresa int
as

select top 1 A.IdAlumno from ALUMNADO A
where A.IdEmpresa = @IdEmpresa 
order by A.IdAlumno desc
GO
/****** Object:  StoredProcedure [dbo].[BuscarCorrelativoEmpresa]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[BuscarCorrelativoEmpresa]

as

select top 1 MAX(A.Codigo) from Empresa A 
GO
/****** Object:  StoredProcedure [dbo].[BuscarCorrelativoNivel]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[BuscarCorrelativoNivel]
@IdEmpresa int
as

select top 1 N.codigo from NIVEL N
where N.IdEmpresa = @IdEmpresa and N.codigo like '0%'
order by N.IdNivel desc
GO
/****** Object:  StoredProcedure [dbo].[BuscarCorrelativoPeriodo]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[BuscarCorrelativoPeriodo]
@IdEmpresa int
as

select top 1 P.codigo from Periodos P
where P.IdEmpresa = @IdEmpresa and P.codigo like '0%'
order by P.IdPeriodo desc
GO
/****** Object:  StoredProcedure [dbo].[BuscarCorrelativoPromotor]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[BuscarCorrelativoPromotor]
@IdEmpresa int
as

select top 1 P.CODIGO from Promotor P
where P.IdEmpresa = @IdEmpresa and P.CODIGO like '0%'
order by P.IdPromotor desc
GO
/****** Object:  StoredProcedure [dbo].[BuscarCorrelativoSede]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[BuscarCorrelativoSede]
@IdEmpresa int
as

select top 1 S.CODIGO from Sede S
where S.IdEmpresa = @IdEmpresa and S.CODIGO like '0%'
order by S.IdSede desc
GO
/****** Object:  StoredProcedure [dbo].[BuscarEmpresa]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[BuscarEmpresa]
@Ruc nchar(11)
as
	select IdEmpresa from Empresa where Ruc like @Ruc
GO
/****** Object:  StoredProcedure [dbo].[BuscarUsuario]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[BuscarUsuario]
@Dni nchar(11)
as
	select IdUsuario from Usuario where Dni = @Dni
GO
/****** Object:  StoredProcedure [dbo].[CambiarClave]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[CambiarClave]
@IdUsuario int,
@NuevaClave varchar(100)
as

update Usuario set [contraseña] = @NuevaClave where IdUsuario = @IdUsuario;

GO
/****** Object:  StoredProcedure [dbo].[ConsultarUsuario]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[ConsultarUsuario]
@Dni nchar(8)
as
	select * from Usuario where Dni = @Dni
GO
/****** Object:  StoredProcedure [dbo].[CrearAlumno]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CrearAlumno]
@Dni char(20),
@Tipo varchar(50),
@Nombres varchar(50),
@Apellidos varchar(50),
@ApeMaterno varchar(50),
@FechaNacimiento datetime,
@Direccion varchar(200),
@Ubigeo char(8),
@Telefono varchar(20),
@Email varchar(100),
@IdSede int,
@Registrado varchar(100),
@IdPais int,
@IdDepartamento int,
@IdProvincia int,
@IdPromotor int,
@IdEmpresa int
as
	declare @Existe int, @IdAlumno1 int, @IdAlumno2 int, @Name nchar(4), @IdAlumnoZeros varchar(50), @IdAlumno varchar (10);

	select @Existe = ISNULL(COUNT(*), 0) from ALUMNADO where IdEmpresa = @IdEmpresa and dni = @Dni and estado <> 99;
	select @Name = codigo from .dbo.Sede where IdSede = @IdSede;

	select top 1 @IdAlumno1 = CONVERT(int,ISNULL(SUBSTRING(CODIGO,6,8), 0)) from ALUMNADO


	set @IdAlumnoZeros = right('00000000' + CONVERT(varchar(50), @IdAlumno1 + 1),8);

	select top 1 @IdAlumno2 = CONVERT(int,ISNULL(IdAlumno,4),0) from ALUMNADO

	
	
	set @IdAlumno = right('0000' + CONVERT(varchar(50), @IdAlumno2 + 1),4);

	if(@Existe > 0)
		RAISERROR('Este Alumno ya Existe.', 16,1);
	else
begin
	if(@IdAlumnoZeros is null)
	begin
		set @IdAlumnoZeros = '00000001';
	end

	if(@IdAlumno is null)
	begin
		set @IdAlumno = '0001';
	end
	insert ALUMNADO(IdAlumno, dni, Nombres, Apellidos, FechaNacimiento, Direccion, telefono, estado,   IdEmpresa, codigo)
	values (@IdAlumno,@Dni, @Nombres, @Apellidos ,@FechaNacimiento, @Direccion, @Telefono ,1,   @IdEmpresa, @Name + '-' + @IdAlumnoZeros);
end
GO
/****** Object:  StoredProcedure [dbo].[CrearAlumnoExcel]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[CrearAlumnoExcel]
@IdEmpresa int,
@Nombres varchar(150),
@Apellidos  varchar(150),
@Tipo varchar(50),
@Dni varchar(70),
@FechaNacimiento varchar(50),
@Direccion varchar(200),
@Pais varchar(50),
@Departamento varchar(50),
@Provincia varchar(50),
@Ubigeo varchar(50),
@Email varchar(200),
@Sede varchar(50),
@Promotor varchar(50),
@Telefono varchar(20)

as
declare @IdPromotor int, @IdSede int, @Id int, @IdPais int, @IdDepartamento int, @IdProvincia int, @Existe int, @IdAlumno1 int, @IdAlumno2 int, @Name nchar(4), @IdAlumnoZeros varchar(50) ,
@nroalumno varchar(100), @Codigo varchar (10);
--select @IdSede=S.IdSede from Sedes S where S.Nombre like @Sede;
		
		select @Existe = ISNULL(COUNT(*), 0) from ALUMNADO where IdEmpresa = @IdEmpresa and dni = @Dni and estado <> 99;
		
		if @Pais is null Begin
			set @IdPais = 0;
		end
		else Begin
			select @IdPais=ps.IdPais from  Pais ps where TRIM(LOWER(ps.Descripcion)) = TRIM(LOWER(@Pais));

			if (@IdPais is null) Begin
				insert into  Pais(Descripcion) values (@Pais);
				select @IdPais = @@IDENTITY from Pais ps;
			End
		End
		if @Departamento is null Begin
			set @IdDepartamento = 0;
		end
		else Begin
			select @IdDepartamento=de.IdDepartamento from  Departamento de where TRIM(LOWER(de.Descripcion)) = TRIM(LOWER(@Departamento));

			if (@IdDepartamento is null) Begin
				insert into  Departamento(Descripcion) values (@Departamento);
				select @IdDepartamento = @@IDENTITY from  Departamento de;
			End
		End
		if @Provincia is null Begin
			set @IdProvincia = 0;
		end
		else Begin
			select @IdProvincia=pr.IdProvincia from  Provincia pr where TRIM(LOWER(pr.Descripcion)) = TRIM(LOWER(@Provincia));

			if (@IdProvincia is null) Begin
				insert into Provincia(Descripcion) values (@Provincia);
				select @IdProvincia = @@IDENTITY from  Provincia pr;
			End
		End
		if @Sede is null Begin
			set @IdSede = 0;
		end
		else Begin
			select @IdSede=s.IdSede from Sede s where TRIM(LOWER(s.Nombre)) = TRIM(LOWER(@Sede)) and TRIM(LOWER(s.estado)) = 1 ;
			if (@IdSede is null) Begin
				insert into Sede(IdSede, Nombre, IdEmpresa, estado) values (@IdSede, @Sede, @IdEmpresa, 1);
				select @IdSede = @@IDENTITY from Sede s;
			End
		End

		select @Name = codigo from Sede where IdSede = @IdSede;

		select top 1 @IdAlumno1 = CONVERT(int,ISNULL(SUBSTRING(codigo,6,8), 0)) from ALUMNADO  

		set @IdAlumnoZeros = right('00000000' + CONVERT(varchar(50), @IdAlumno1 + 1),8);

		select top 1 @IdAlumno2 = CONVERT(int,ISNULL(IdAlumno,4),0) from ALUMNADO  
	
		set @Codigo = right('0000' + CONVERT(varchar(50), @IdAlumno2 + 1),4);
		if(@IdAlumnoZeros is null)
		begin
			set @IdAlumnoZeros = '00000001';
		end

		if(@Codigo is null)
		begin
			set @Codigo = '0001';
		end

		set @nroalumno = @Name + '-' + @IdAlumnoZeros 

		if @Promotor is null Begin
			set @IdPromotor = 0;
		end
		else Begin
			select @IdPromotor=p.IdPromotor from Promotor p where TRIM(LOWER(p.Nombres)) = TRIM(LOWER(@Promotor)) and TRIM(LOWER(p.ESTADO)) = 1 ;
			if (@IdPromotor is null) Begin
				insert into Promotor(IdPromotor, Nombres, IdEmpresa, Estado) values (@IdPromotor, @Promotor, @IdEmpresa, 1);
				select @IdPromotor = @@IDENTITY from Promotor p;
			End
		End
	select @Id=A.IdAlumno from ALUMNADO A where TRIM(LOWER(A.IdAlumno)) = TRIM(LOWER(@Codigo)); 
	--and A.IdSede = @IdSede;
	if(@Id is null)
	Begin
		insert into ALUMNADO(IdEmpresa, IdAlumno, Nombres,Apellidos, dni, FechaNacimiento, Direccion, telefono) 
		values(@IdEmpresa, @Codigo, @Nombres, @Apellidos,  @Dni, @FechaNacimiento, @Direccion,  @Telefono);
		select @Id = @@IDENTITY from ALUMNADO A;
	End
	else
	Begin
		update ALUMNADO set IdAlumno =  @Codigo, Nombres = @Nombres, Apellidos = @Apellidos,
			 dni = @Dni, FechaNacimiento = @FechaNacimiento, Direccion = @Direccion,  telefono = @Telefono 
		where IdAlumno = @Id;
	End
GO
/****** Object:  StoredProcedure [dbo].[CrearEmpresa]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[CrearEmpresa]
@Codigo char(4),
@RazonSocial varchar(100),
@Ruc nchar(11),
@Direccion varchar(100),
@Telefono varchar(200),
@Correo varchar(200)
as
declare @IdEmpresa int, @IdSede int;

insert into Empresa(codigo, RazonSocial, Ruc, Direccion, Telefono) 
values(@Codigo, @RazonSocial,@Ruc,@Direccion,@Telefono);

select @IdEmpresa = @@IDENTITY from Empresa;

 
GO
/****** Object:  StoredProcedure [dbo].[CrearNivel]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CrearNivel]
@Codigo char(4),
@Descripcion varchar(100),
@IdEmpresa int
as
	declare @Existe int;

	select @Existe = ISNULL(COUNT(*), 0) from Nivel where IdEmpresa = @IdEmpresa and Descripcion = @Descripcion and estado <> 99;

	if(@Existe > 0)
		RAISERROR('Este Nivel ya Existe.', 16,1);
	else
begin
	insert Nivel(codigo, descripcion, IdEmpresa)
	values (@Codigo, @Descripcion, @IdEmpresa);
end
GO
/****** Object:  StoredProcedure [dbo].[CrearPeriodo]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CrearPeriodo]
@CodigoPeriodo varchar(50),
@Descripcion varchar(200),
@IdEmpresa int
as

declare @Existe int;

select @Existe = ISNULL(COUNT(*), 0) from Periodo where IdEmpresa = @IdEmpresa and Descripcion = @Descripcion and estado <> 99;

if(@Existe > 0)
	RAISERROR('Este Periodo ya existe.', 16,1);
else
begin
	insert Periodo(CODIGO, Descripcion, IdEmpresa)
	values (@CodigoPeriodo,@Descripcion, @IdEmpresa);
end
GO
/****** Object:  StoredProcedure [dbo].[CrearSede]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CrearSede]
@CodigoSede varchar(50),
@RucSede varchar(50),
@Nombre varchar(50),
@Direccion varchar(200),
@CodigoSunat varchar(50),
@NombreSede varchar(200),
@Responsable varchar(100),
@Comision varchar(50),
@Ubigeo varchar(20),
@IdPais int,
@IdDepartamento int,
@IdProvincia int,
@IdDistrito int,
@Telefono varchar(20),
@IdEmpresa int
as

declare @Existe int;

select @Existe = ISNULL(COUNT(*), 0) from Sede where IdEmpresa = @IdEmpresa and Nombre = @Nombre and estado <> 99;

if(@Existe > 0)
	RAISERROR('Esta Sede ya existe.', 16,1);
else
begin
	insert Sede(Codigo, Ruc, Nombre, Direccion	, responsable,  ubigeo,Telefono, IdEmpresa)
	values (@CodigoSede, @RucSede, @Nombre,@Direccion, @Responsable,@Ubigeo,@Telefono, @IdEmpresa);
end
GO
/****** Object:  StoredProcedure [dbo].[CrearUsuario]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[CrearUsuario]
@Nombres varchar(50),
@ApellidoP varchar(50),
@ApellidoM varchar(50),
@Email varchar(50),
@Login varchar(100),
@Password varchar(50),
@Genero nchar(1),
@TipoUsuario int,
@confirmado int,
@Telefono varchar(50),
@InicioTurno varchar(50),
@FinTurno varchar(50),
@OtroDia int
as
declare @idusuario int;

insert into Usuario(Nombres,ApellidoPaterno, ApellidoMaterno,Email,usuario, contraseña, sexo , Telefono ) 
values(@Nombres,@ApellidoP,@ApellidoM,@Email,@Login,@Password, @Genero, @Telefono);

select @idusuario = @@IDENTITY from Usuario;

select IdUsuario, usuario, Email from  Usuario where IdUsuario = @idusuario;
GO
/****** Object:  StoredProcedure [dbo].[EditarAlumno]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[EditarAlumno]
@Id int,
@Dni char(20), 
@Nombres varchar(50),
@Apellidos varchar(50), 
@FechaNacimiento datetime,
@Direccion varchar(200),
@Ubigeo char(8),
@Telefono varchar(20),
@Email varchar(100),
@IdSede int,  
@IdEmpresa int
as
	declare @Existe int;
	select @Existe = ISNULL(COUNT(*), 0) from ALUMNADO where IdAlumno <> @Id and Nombres = @Nombres and Apellidos = @Apellidos  and estado <> 99;

	if(@Existe > 0)
		RAISERROR('Este Alumno ya Existe.', 16,1);
	else
begin
	update ALUMNADO set  dni = @Dni,   Nombres = @Nombres,Apellidos = @Apellidos , FechaNacimiento = @FechaNacimiento,
	Direccion = @Direccion,  telefono = @Telefono 
	where IdEmpresa = @IdEmpresa and IdAlumno = @Id;
end
GO
/****** Object:  StoredProcedure [dbo].[FiltrarAlumno]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[FiltrarAlumno]
@IdEmpresa int, 
@Dni varchar(20),
@Alumnito varchar(100),
@FechaInicio datetime,
@FechaFin datetime
as

select  A.IdAlumno, A.dni, A.Nombres, A.Apellidos, A.FechaNacimiento, A.Direccion, A.telefono 
from ALUMNADO A  
 where A.IdEmpresa = @IdEmpresa and estado <> 99 and    (@Dni = '' or A.dni LIKE '%'+@Dni+'%') and (@Alumnito = '' or A.Nombres LIKE '%'+@Alumnito+'%' or A.Apellidos lIKE '%'+@Alumnito+'%'  )
 
GO
/****** Object:  StoredProcedure [dbo].[ListarDepartamentos]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[ListarDepartamentos]
as
select IdDepartamento,  Descripcion
from Departamento
GO
/****** Object:  StoredProcedure [dbo].[ListarDistritos]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[ListarDistritos]
@IdProvincia int
as
select [IdDistrito] , Descripcion
from [dbo].[DISTRITO] where IdProvincia=@IdProvincia
GO
/****** Object:  StoredProcedure [dbo].[ListarEmpresas]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[ListarEmpresas]
as

select IdEmpresa, RazonSocial,[Direccion] ,[codigo] ,[Telefono]  ,[RUC]  from Empresa;
GO
/****** Object:  StoredProcedure [dbo].[ListarPaises]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[ListarPaises]
as
select IdPais, Codigo, Descripcion
from dbo.Pais
GO
/****** Object:  StoredProcedure [dbo].[ListarSedes]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ListarSedes]
@IdEmpresa int
as

select	IdSede, codigo, Ruc, Nombre, Direccion, Telefono, responsable,  ubigeo,  
		Estado = case when estado <> 99 then 'Activo' else 'Inactivo' end
from Sede S where IdEmpresa = @IdEmpresa and Estado <> 99;
GO
/****** Object:  StoredProcedure [dbo].[ListarUsuarios]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ListarUsuarios]
@IdEmpresa int
as

select	U.[IdUsuario],
usuario = U.[Nombres] + ' ' + U.ApellidoPaterno + ' ' + U.ApellidoMaterno 
from [Usuario] U
inner join Empresa Eu on Eu.IdEmpresa = U.IdEmpresa
where Estado <> 99 and Eu.IdEmpresa = @IdEmpresa
--inner join [BDMinerva].[dbo].[Usuarios] U on  U.[IdUsuario]=S.[IdUsuario]
--where U.[IdEmpresa] = @IdEmpresa ;
GO
/****** Object:  StoredProcedure [dbo].[Login]    Script Date: 05/11/2022 07:34:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Login]
@Codigo nchar(4),
@usuario varchar(50),
@password varchar(50)
as

SET NOCOUNT ON;

declare @IdEmpresa int, @IdUsuario int , @CantUser int;

select @IdEmpresa = IdEmpresa from Empresa where TRIM(codigo) = TRIM(@Codigo);

if(@IdEmpresa is null)
	RAISERROR('Empresa no encontrada.', 16,1);
else
Begin
	select  @IdUsuario = U.IdUsuario from Usuario U
	inner join [EMPRESA] EU on EU.IdEmpresa = U.IdEmpresa
	where TRIM(usuario) = TRIM(@usuario) and EU.IdEmpresa = @IdEmpresa;

	if(@IdUsuario is null)
		RAISERROR('Usuario no encontrado.', 16,1);
	else
	Begin
		
			select @CantUser = count(distinct U.IdUsuario) from Usuario U 
			inner join Empresa E on E.IdEmpresa = U.IdEmpresa  
			where E.IdEmpresa=@IdEmpresa and usuario = @usuario and TRIM(contraseña) = TRIM(@password) ;

			if(@CantUser != 0)
				RAISERROR('Contraseña Incorrecta.', 16,1);
			else
			Begin
				select U.IdUsuario, u.Nombres, u.[ApellidoPaterno],u.[ApellidoMaterno] , EU.IdEmpresa,
				EU.RazonSocial, u.[sexo] , U.usuario, u.contraseña, 	U.Email, EU.Direccion 
				from Usuario U
				inner join [EMPRESA] EU on EU.IdEmpresa = U.IdEmpresa 	 
				where TRIM(usuario) = TRIM(@usuario) and TRIM(contraseña) = TRIM(@password) ;	
		End 
	End
End

SET NOCOUNT OFF;
GO
