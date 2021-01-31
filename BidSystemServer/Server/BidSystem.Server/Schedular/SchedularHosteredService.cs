using BidSystem.Common.Interface;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BidSystem.Server.Schedular
{
    public class SchedularHosteredService : IHostedService
    {
        Timer _timer;
        private readonly IServiceScopeFactory scopeFactory;
        //private readonly ISchedularService m_accountServive;
        public SchedularHosteredService( IServiceScopeFactory scopeFactory)
        {
            //m_accountServive = accountServive;
            this.scopeFactory = scopeFactory;
        }


        public Task StartAsync(CancellationToken cancellationToken)
        {
            TimeSpan interval = TimeSpan.FromHours(24);
            //calculate time to run the first time & delay to set the timer
            //DateTime.Today gives time of midnight 00.00
            var test = DateTime.Today;
            var nextRunTime = DateTime.Today.AddDays(1);
            var curTime = DateTime.Now;
            var firstInterval = nextRunTime.Subtract(curTime);

            Action action = () =>
            {
                var t1 = Task.Delay(firstInterval);
                t1.Wait();
               
                _timer = new Timer(
                    GetWinningBids,
                    null,
                    TimeSpan.Zero,
                    interval
                );
            };

           
            Task.Run(action);
            return Task.CompletedTask;          

            
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        private void GetWinningBids(object state)
        {
            //m_accountServive.GetWinningBids();
            using (var scope = scopeFactory.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ISchedularService>();
                dbContext.GetWinningBids();

            }
        }
    }
}
