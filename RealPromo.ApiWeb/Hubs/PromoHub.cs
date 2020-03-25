using Microsoft.AspNetCore.SignalR;
using RealPromo.ApiWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealPromo.ApiWeb.Hubs
{
    public class PromoHub : Hub
    {
        /*
         * Cliente - JS/C#/Java
         * RPC 
         * Cliente -> Hub
         * 
          */

        public async Task CadastrarPromocao(Promocao promocao)
        {

            /* onde pode por a sua logica
             * Banco de dados
             * Queue/Scheduler
             * Notificar o usuario (SignalR)
             */

            await Clients.Caller.SendAsync("CadastradoSucesso");
            await Clients.Others.SendAsync("ReceberPromocao", promocao);

        }

    }
}
