const EGClient = require('epicgames-client').Client;
const Fortnite = require('epicgames-fortnite-client');
const EInputType  = require('epicgames-client').EInputType;
const fetch = require('node-fetch');

var _ = require('lodash');

accountid = 'Account ID';
status = 'Bot is Online';

let eg = new EGClient({
    email: 'email',
    password: 'password',
    debug: console.log
});

(async _ => {
    
    var c_party;

    if(!await eg.init() || !await eg.login())
        throw 'Cannot connect to Epic Games servers...';
    
    let communicator = eg.communicator;
    let fortnite = await eg.runGame(Fortnite);
    
    communicator.updateStatus(status);

    communicator.on('friend:request', async data => {
        if(data.friend.id != accountid){
            eg.acceptFriendRequest(data.friend.id).then(async (ac_result) => {
                /*adding friend ops was seccessful*/
            });
        }
    });

    fortnite.communicator.on('party:invitation', async invitation => {

        c_party = invitation.party;
        
        invitation.party.me.setBRCharacter('/Game/Athena/Items/Cosmetics/Characters/CID_029_Athena_Commando_F_Halloween.CID_029_Athena_Commando_F_Halloween');
        
        await invitation.accept();
        
        invitation.party.me.setBattlePass(true, 99999999, 99999999, 99999999);

    });

    fortnite.communicator.on('friend:message', async data => {

        if(data.message == 'help'){
              communicator.sendMessage(data.friend.id, 'Commands: !skinid, !skin, !emoteid, !emote, !backblingid, !backbling, !banner, !stop');
        }
    var argss = data.message;
    var skintrue = argss.includes("!skin ");
    if (skintrue = true){
          c_party.members.forEach(async member => {
              try{


                function jsonid(jidd) {
                var nameid = jidd;
                console.log(nameid);
                member.clearEmote(member.jid);
                member.setBRCharacter("/Game/Athena/Items/Cosmetics/Characters/" + nameid + "." + nameid, member.jid);

                }
                var na = argss;
                var nam = na.replace("!skin ", "");
                var name = nam.replace(" ", "%20");
                var website = 'https://api-public-service.battledash.co/fortnite/cosmetics/search?q=';
                var fullwebsite = website + name;
              //  if (fullwebsite.toLowerCase = "https://api-public-service.battledash.co/fortnite/cosmetics/search?q=reaper") {
              //      var fullwebsite = "https://api-public-service.battledash.co/fortnite/cosmetics/search/id?q=CID_084_Athena_Commando_M_Assassin"
               // }
                fetch(fullwebsite)
                    .then(res => res.json())
                //    .then(json => console.log(json.id));
                    .then(json => jsonid(json.id));

                  //  member.clearEmote(member.jid);
                  //  member.setBRCharacter("/Game/Athena/Items/Cosmetics/Characters/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set skin because it is invalid skin!');
              }
          });
      }   
    var emotetrue = argss.includes("!emote ");
    if (emotetrue = true){
          c_party.members.forEach(async member => {
              try{


                function jsonid(jidd) {
                var nameid = jidd;
                console.log(nameid);
                member.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + nameid + "." + nameid, member.jid);
                }
                var na = argss;
                var nam = na.replace("!emote ", "");
                var name = nam.replace(" ", "%20");
                var website = 'https://api-public-service.battledash.co/fortnite/cosmetics/search?q=';
                var fullwebsite = website + name;
                fetch(fullwebsite)
                    .then(res => res.json())
                //    .then(json => console.log(json.id));
                    .then(json => jsonid(json.id));

                  //  member.clearEmote(member.jid);
                  //  member.setBRCharacter("/Game/Athena/Items/Cosmetics/Characters/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set skin because it is invalid skin!');
              }
          });
      }        
    var backtrue = argss.includes("!backbling ");
    if (backtrue = true){
          c_party.members.forEach(async member => {
              try{


                function jsonid(jidd) {
                var nameid = jidd;
                console.log(nameid);
                member.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + nameid + "." + nameid, member.jid);
                }
                var na = argss;
                var nam = na.replace("!emote ", "");
                var name = nam.replace(" ", "%20");
                var website = 'https://api-public-service.battledash.co/fortnite/cosmetics/search?q=';
                var fullwebsite = website + name;
                fetch(fullwebsite)
                    .then(res => res.json())
                //    .then(json => console.log(json.id));
                    .then(json => jsonid(json.id));

                  //  member.clearEmote(member.jid);
                  //  member.setBRCharacter("/Game/Athena/Items/Cosmetics/Characters/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set skin because it is invalid skin!');
              }
          });
      }        
      var args = data.message.split(" ");
      if (args[0] == "!skinid"){
          c_party.members.forEach(async member => {
              try{
                    member.clearEmote(member.jid);
                    member.setBRCharacter("/Game/Athena/Items/Cosmetics/Characters/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set skin because it is invalid skin!');
              }
          });
      }
      if (args[0] == "!skinold"){
          c_party.members.forEach(async member => {
              try{


                function jsonid(jidd) {
                var nameid = jidd;
                console.log(nameid);
                member.clearEmote(member.jid);
                member.setBRCharacter("/Game/Athena/Items/Cosmetics/Characters/" + nameid + "." + nameid, member.jid);

                }
                var name = args[1];
                var website = 'https://api-public-service.battledash.co/fortnite/cosmetics/search?q=';
                var fullwebsite = website + name;
                fetch(fullwebsite)
                    .then(res => res.json())
                //    .then(json => console.log(json.id));
                    .then(json => jsonid(json.id));

                  //  member.clearEmote(member.jid);
                  //  member.setBRCharacter("/Game/Athena/Items/Cosmetics/Characters/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set skin because it is invalid skin!');
              }
          });
      }
      if (args[0] == "!status"){
            fortnite.communicator.updateStatus(args[1]);
            communicator.updateStatus(args[1]);
      }
      if (args[0] == "!emoteid"){
          c_party.members.forEach(async member => {
              try{
                    member.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set emote because it is invalid emote!');
              }
          });
      }
     
      if (args[0] == "!backblingid"){
          c_party.members.forEach(async member => {
              try{
                    member.setBackpack("/Game/Athena/Items/Cosmetics/Backpacks/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set backbling because it is invalid backbling!');
              }
          });
      }
     
      if (args[0] == "!banner"){
          args = data.message.split(" ").toUpperCase;
          c_party.members.forEach(async member => {
              try{
                    member.setBRBanner(args[1], args[2], 99999999, member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set banner because it is invalid banner!');
              }
          });
      }
        
      if(args[0] == "!ready"){
          if(args[1] == "on" || args[1] == "off") {
             c_party.members.forEach(async member => {
              try{
                    member.setReady(args[1] == "on" ? true : false, member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set ready because it is unknown error!');
              }
             }); 
          }else{
              communicator.sendMessage(data.friend.id, 'Cant set ready because it is invalid swtich!');
          }
      }
     
      if(args[0] == "!stop"){
        c_party.members.forEach(async member => {
          member.clearEmote(member.jid);
        });
      }
 
    });

    /* rest of your code goes here */

})();
