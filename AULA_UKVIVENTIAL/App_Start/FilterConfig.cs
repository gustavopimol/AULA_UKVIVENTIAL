using System.Web;
using System.Web.Mvc;

namespace AULA_UKVIVENTIAL
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
