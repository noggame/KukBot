const Commando = require('discord.js-commando');

// for Image
const images = require('images');

module.exports = class determinePlace extends Commando.Command{

    constructor(client){
        super(client, {
            name : 'mark',  // cmd
            group : 'map',
            memberName : 'map',
            description : 'determine falling place',
            examples : ['!map --- Choose one place',
            /*'!map list --- Show list',
            '!map a --- Choose one place within dangerous zone.',
            '!map b --- Choose one place within noraml zone.',
            '!map c --- Choose one place within safe zone.',*/
            '!mark er --- mark coordinates on the ERANGEL.',
            '!mark mr --- mark coordinates on the MIRAMAR.'],
            args : [
                {
                    key : 'map',
                    prompt : 'input map name',
                    type : 'string',
                    default : 'er'
                }
            ]
        });
    }

    async run(message, args){

        // Map list
        /*var place_a = ['Georgopol_North', 'Georgopol_South', 'School', 'Pochinki', 'Yasnaya Polyana'
                    , 'Hospital', 'Mylta', 'Sosnovka Military Base'];
        var place_b = ['Shooting Range', 'Zharki', 'Rozhok', 'Prison', 'Severny'
                    , 'Lipovka', 'Mylta Power', 'Primorsk', 'Shelter', 'Novorepnoye'
                    , 'Water Park', 'Bridge'];
        var place_c = ['Gatka', 'Ruins', 'Mansion', 'Quarry', 'Farm'
                    , 'Ferry pier', 'Stalber', 'Kameshki', 'West_Coast'];*/

        /*if(args.map == 'list'){
            message.reply('\n(a)위험도-상 : ' + place_a
                        + '\n\n(b)위험도-중 : ' + place_b
                        + '\n\n(c)위험도-하 : ' + place_c);
        }
        else if(args.map == 'a'){
            message.reply("상 : " + place_a[Math.floor(Math.random()*place_a.length)]);
        }
        else if(args.map == 'b'){
            message.reply("중 : " + place_b[Math.floor(Math.random()*place_b.length)]);
        }
        else if(args.map == 'c'){
            message.reply("하 : " + place_c[Math.floor(Math.random()*place_c.length)]);
        }*/


        if(args.map == 'er' || args.map == 'mr'){
            
            let map_row = ['A', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
            let map_col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
            
            let temp_row = Math.floor(Math.random()*map_row.length);
            let temp_col = Math.floor(Math.random()*map_col.length);
            let temp_coor = map_row[temp_row] + map_col[temp_col];
            
            let except_coor;
            let mapFileDIR;

            // 
            if(args.map == 'er'){
                except_coor = ['AA', 'AB', 'AC', 'AD', 'AG', 'AH', 'JA', 'JH', 'KA', 'KG', 'KH'
                , 'LA', 'NH', 'MA', 'MH', 'NH', 'OH', 'PA', 'PB', 'PC', 'PF', 'PG', 'PH'];
                mapFileDIR = "./Images/ERANGEL/ERANGEL_";
            }
            else if(args.map == 'mr'){
                except_coor = ['AE', 'AF', 'AG', 'AH', 'JA', 'JB', 'MH', 'NH', 'OH', 'PG', 'PH'];
                mapFileDIR = "./Images/MIRAMAR/MIRAMAR_"
            }
            else{
                message.reply("undefined map");
            }
            
            // 생성한 좌표가 except_coor에 해당하는지 검사
            function isContain(element, ary){
                for(let x in ary){
                    if(ary[x] == element) return true;
                }
                return false;
            }

            let excepted_coor = ''; // 제외된 좌표 저장
            while(isContain(temp_coor, except_coor)){
                excepted_coor += "Except : " + map_row[temp_row] + " - " + map_col[temp_col] + "\n";
                temp_row = Math.floor(Math.random()*map_row.length);
                temp_col = Math.floor(Math.random()*map_col.length);
                temp_coor = map_row[temp_row] + map_col[temp_col];
            }

            let selectedRow = map_row[temp_row];
            let selectedCol = map_col[temp_col];
            

            // 선택된 좌표와 이미지 출력
            message.reply("\n" + excepted_coor.toString() + "Coordinate : " + selectedRow + " - " + selectedCol, {file : mapFileDIR + selectedRow + selectedCol + ".jpg"});


            // AA~PH 좌표 맵 이미지 생성
            /*for(var row in map_row)
            {
                for(var col in map_col)
                {
                                // Map Images
                    var ERANGEL = images("./Images/ERANGEL.png").size(2688, 2688);
                    var MIRAMAR = images("./Images/MIRAMAR.jpg").size(2688, 2688);
                    var RECTANGLE = images("./Images/RECTANGLE.png").size(336, 336);

                    var outputFile = "./Images/ERANGEL/ERANGEL_" + map_row[row].toString() + map_col[col].toString() + ".jpg";
                    images(ERANGEL).draw(images(RECTANGLE), row*336, col*336).save(outputFile);
                }
            }*/

        }else{
            message.reply("undefined command");
        }
    }
}