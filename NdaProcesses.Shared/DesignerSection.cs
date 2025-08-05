using System.Collections.Generic;
namespace DynamicFormsApp.Shared
{
    public class DesignerSection
    {
        public string Title { get; set; } = string.Empty;
        public string Instructions { get; set; } = string.Empty;
        public bool IsCollapsed { get; set; }
        public List<DesignerField> Fields { get; set; } = new();
    }
}
