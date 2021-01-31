using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using log4net;
using log4net.Config;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BidSystem
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateHostBuilder(string[] args)
        {
            // Log4net setup
            var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));


            var ret = WebHost.CreateDefaultBuilder(args)
           .UseStartup<Startup>()
          .ConfigureAppConfiguration((context, builder) =>
          {
              // Load local configuration first, is used to configure central configuration location
              var configuration = new ConfigurationBuilder()
                .AddJsonFile($"appsettings.{context.HostingEnvironment.EnvironmentName}.json", true)
                .AddJsonFile("appsettings.json", false)
                .AddEnvironmentVariables()
                .AddCommandLine(args)
                .Build();



          })
          .ConfigureLogging((context, builder) =>
          {
              // Configure MS log to send log statements to configured log framework
              builder.AddLog4Net(new Log4NetProviderOptions
              {
                  Log4NetConfigFileName = "log4net.config",
                  Watch = true
              });
          });

            return ret;
        }
    }
}
