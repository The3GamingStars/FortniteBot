const EGClient = require('epicgames-client').Client;
const Fortnite = require('epicgames-fortnite-client');
const EInputType  = require('epicgames-client').EInputType;
const rp = require('request-promise');
const fs = require('fs');
const http = require('http');

var _ = require('lodash');

accountid = 'your bot accountID';
status = 'status you want';

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
              communicator.sendMessage(data.friend.id, 'Commands: !skin, !emote, !backbling, !banner, !stop');
        }
        
      var args = data.message.split(" ").toUpperCase;
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
      if (args[0] == "!status"){
            fortnite.communicator.updateStatus(args[1]);
            communicator.updateStatus(args[1]);
      }
      if (args[0] == "!emote"){
          c_party.members.forEach(async member => {
              try{
                    member.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set emote because it is invalid emote!');
              }
          });
      }
     
      if (args[0] == "!backbling"){
          c_party.members.forEach(async member => {
              try{
                    member.setBackpack("/Game/Athena/Items/Cosmetics/Backpacks/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set backbling because it is invalid backbling!');
              }
          });
      }
     
      if (args[0] == "!banner"){
          c_party.members.forEach(async member => {
              try{
                    member.setBRBanner(args[1], args[2], 99999999, member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set banner because it is invalid banner!');
              }
          });
      }
        if(args[0] == "!skin"){
       c_party.members.forEach(async member => {
       try{

          var name = args[1];
          var website = "http://api-public-service.battledash.co/fortnite/cosmetics/search?q=" + name;
          const file = fs.createWriteStream("file.json");
          const request = http.get(website, function(response) {
          response.pipe(file);
          });

          rp(website)
            .then(function(html){
              //success!
            //  console.log(html);
          fs.writeFile('file.json', html, 'utf-8', function (err) {
                if (err) throw err;
                console.log('api to json complete');
              )};
          var contents = fs.readFileSync("file.json");
          // Define to JSON type
           var jsonContent = JSON.parse(contents);
          // Get Value from JSON
           var idname =  jsonContent.id;
          console.log(idname);
          member.clearEmote(member.jid);
          member.setBRCharacter("/Game/Athena/Items/Cosmetics/Characters/" + skinid + "." + skinid, member.jid);
          fs.unlink('file.json', (err) => {
            if (err) throw err;
            console.log('successfully deleted temperary json file'));
          }});
          };


  catch(e){
communicator.sendMessage(data.friend.id, 'Cant set skin because an invalid skin name was inputed!');
}
});
};
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
