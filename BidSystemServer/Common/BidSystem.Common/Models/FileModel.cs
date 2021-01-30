using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;

namespace BidSystem.Common.Models
{
    public class FileModel
    {
        public string FileName { get; set; }
        public FormFile FormFile { get; set; }
        //public List<IFormFile> FormFiles { get; set; }
    }
}
