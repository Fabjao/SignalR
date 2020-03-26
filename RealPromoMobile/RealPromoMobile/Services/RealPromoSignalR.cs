using Microsoft.AspNetCore.SignalR.Client;
using RealPromoMobile.Models;
using System.Collections.ObjectModel;
using System.Threading.Tasks;

namespace RealPromoMobile.Services
{
    public class RealPromoSignalR
    {
        public RealPromoSignalR(ObservableCollection<Promocao> lista)
        {

            Task.Run(async () =>
            {

                var connection = new HubConnectionBuilder().WithUrl("http://exemplosignalr.azurewebsites.net/PromoHub").Build();

                connection.On<Promocao>("ReceberPromocao", (promocao) =>
                {
                    Xamarin.Forms.Device.InvokeOnMainThreadAsync(() => { lista.Add(promocao); });
                    
                });


                //Este trecho de codigo só está sendo usado porque o projeto foi vendo numa versão mais antiga, a versão mais nova já tem um proprio reconect
                connection.Closed += async (erro) =>
                {
                    await Task.Delay(5000);
                    await connection.StartAsync();
                };

                await connection.StartAsync();
            });

        }
    }
}
