const Commando = require('discord.js-commando');
const https = require('https');
const MAX_SEARCHED_MATCH = 5;

let connection = {
    host : 'api.pubg.com',
    // port : "8080",
    path : '/shards/steam/players?filter[playerNames]=KukDas', // default
    method : 'GET',
    // method : 'POST' / 'GET' / 'PUT' / 'DELETE'
    headers : {
        Authorization : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3NDkwZThhMC0xYWM0LTAxMzYtZjNkYS00YjgzYjRkZTM4NzUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTIyOTA3OTgxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImZvci1kaXNjb3JkLWFwcCIsInNjb3BlIjoiY29tbXVuaXR5IiwibGltaXQiOjEwfQ.97M_Xw90dgXDKMNWQxtXpM2cJP8qqE4rW0RonXEntCk",
        Accept : "application/vnd.api+json"
    }
}

var loadUserData = new Promise((resolve, reject)=>{
    if(connection != null){
        var req = https.request(connection, (res)=>{
            let rawData='';
            res.on('data', (chunk)=>{
                rawData+=chunk;
            });
            res.on('error', (e)=>{
                console.error(e.message);
            });
            res.on('end', ()=>{
                resolve(JSON.parse(rawData));
            });
        }).end();
    }
    else{
        reject(error("[undefined header]", connection));
    }
});

module.exports = class RandomNumber extends Commando.Command{
    constructor(client){
        super(client, {
            name : 'pf',    // cmd
            group : 'profile',
            memberName : 'profile',
            description : 'Load profile from website[dak.gg]',
            examples : ['!profile <user-id> <server>'],
            args : [
                {
                    key : 'id',
                    prompt : 'input user name',
                    type : 'string',
                    default : 'KukDas'
                },
                {
                    key : 'server',
                    prompt : 'input server',
                    type : 'string',
                    default : 'krjp'
                }
            ]
        });
    }

    async run(message, args){

        /* REGION
        xbox-as - Asia
        xbox-eu - Europe
        xbox-na - North America
        xbox-oc - Oceania
        pc-krjp - Korea/Japan
        pc-na - North America
        pc-eu - Europe
        pc-oc - Oceania
        pc-kakao - Kakao
        pc-sea - South East Asia
        pc-sa - South and Central America
        pc-as - Asia */
        let region = args.server;
        let playerName = args.id;

        // connection.path = '/shards/pc-'+region+'/players?filter[playerNames]='+playerName;
        connection.path = '/shards/steam/players?filter[playerNames]='+playerName;
        
        // loadUserData.then((user)=>{
        //     // console.log(user.data[0]);
        //     let matches = user.data[0].relationships.matches.data;
        //     console.log(matches);
        // })

        
        loadUserData.then((user)=>{
            let promises = [];
        
            let matches = user.data[0].relationships.matches.data;
        
            // MAX_SEARCHED_MATCH
            for(let i=0; i<2 && i<matches.length; i++){
                connection.path = '/shards/steam/matches/'+matches[i].id;
        
                var prom_req = new Promise((resolve, reject)=>{
                        https.request(connection, (res)=>{
                        let rawData='';
                        res.on('data', (chunk)=>{
                            rawData+=chunk;
                        });
                        res.on('error', (e)=>{
                            console.error(e.message);
                        });
                        res.on('end', ()=>{
                            resolve(JSON.parse(rawData));
                        });
                    }).end();
                });
                promises.push(prom_req);
            }
        
            Promise.all(promises).then((matches)=>{
                
                let playerStats = [];
                let statsMessage = '';  // for store stats info. with STR
                let matchMessage = '';  // for store match info. with STR

                for(let m in matches){
                    let matchAttr = matches[m].data.attributes;  // match(map) info.
                    let allPlayersInfo = matches[m].included;   // player info.

                    let participants = [];  // each player info.
                    let rosters = [];       // team info.
        
                    // console.log(matchAttr); // test

                    for(let nPlayer in allPlayersInfo){
                        let nPlayersInfo = allPlayersInfo[nPlayer];
                        if(nPlayersInfo.type === 'participant'){
                            participants.push(nPlayersInfo);    
                        }
                        else if(nPlayersInfo.type === 'roster'){
                            rosters.push(nPlayersInfo);
                        }
                    }

                    // save match info.
                    matchMessage = "\n[" + matchAttr.gameMode + " - " + matchAttr.mapName + '] - ' + matchAttr.createdAt + ')\n';
                    
                    // search player info.
                    for(let p in participants){
                        if(participants[p].attributes.stats.name == playerName){
                            playerStats.push(participants[p]);
                            console.log(participants[p]);
                            // console.log(participants[p].attributes.stats);
                        }
                    }
                }

                for(let ps in playerStats){
                    /**Stats
                     * assits / bootsts / damageDealt
                     * deathType / headshotKills / heals
                     * kills / killPlace / killPoints / killPointsDelta / killStreaks
                     * roadKills / teamKills
                     * lastKillPoints / lastWinPoints / longestKill
                     * mostDamage
                     * name / playerId
                     * revives
                     * rideDistance
                     * timeSurvived
                     * vehicleDestroys
                     * walkDistance
                     * weaponsAcquired
                     * winPlace [rank]
                     * winPoints [score]
                     * winPointsDelta [delta score]
                     */
                    statsMessage += matchMessage +
                    "Kills : " + playerStats[ps].attributes.stats.kills + "\n" +
                    "Head & Longest Kills : " + playerStats[ps].attributes.stats.headshotKills + ' / ' + playerStats[ps].attributes.stats.longestKill + "m\n" +
                    "Damage : " + playerStats[ps].attributes.stats.damageDealt + "\n" +
                    "Heals $ Boosts: " + playerStats[ps].attributes.stats.heals + ' / ' + playerStats[ps].attributes.stats.boosts + "\n" +
                    "Rank : " + playerStats[ps].attributes.stats.winPlace + '\n' +
                    "DeathType : " + playerStats[ps].attributes.stats.deathType + '\n';
                }
                
                message.reply(statsMessage);

            }); // end of promise.all()

        }); // end of loadUser()

    } // end of run()
}
