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


        if(args.map == 'er' || args.map == 'mr' || args.map == 'sn'){
            
            let map_row;
            let map_col;
            let except_coor;
            let mapFileDIR;
            
            if(args.map == 'er'){
                map_row = ['A', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
                map_col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

                except_coor = ['AA', 'AB', 'AC', 'AD', 'AG', 'AH', 'JA', 'JH', 'KA', 'KG', 'KH'
                , 'LA', 'NH', 'MA', 'MH', 'NH', 'OH', 'PA', 'PB', 'PC', 'PF', 'PG', 'PH'];
                mapFileDIR = "./Images/ERANGEL/ERANGEL_";
            }
            else if(args.map == 'mr'){
                map_row = ['A', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
                map_col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

                except_coor = ['AE', 'AF', 'AG', 'AH', 'JA', 'JB', 'MH', 'NH', 'OH', 'PG', 'PH'];
                mapFileDIR = "./Images/MIRAMAR/MIRAMAR_";
            }
            else if(args.map == 'sn'){
                map_row = ['A1', 'A2', 'J1', 'J2', 'K1', 'K2', 'L1', 'L2']; // (A, J, K, L)/2
                map_col = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']; // (A, B, C, D)/2

                except_coor = ['A1A1', 'A1A2', 'A1B1', 'A1B2', 'A1C1', 'A1C2', 'A1D1', 'A1D2'
                ,'A2A1', 'A2A2', 'A2D1', 'A2D2', 'J1A1', 'J2A1', 'K1A1', 'L1A1', 'L1D2'
                ,'L2A1', 'L2A2', 'L2C1', 'L2C2', 'L2D1', 'L2D2'];
                mapFileDIR = "./Images/SANHOK/SANHOK_";
            }
            else{
                message.reply("undefined map");
            }

            let temp_row = Math.floor(Math.random()*map_row.length);
            let temp_col = Math.floor(Math.random()*map_col.length);
            let temp_coor = map_row[temp_row] + map_col[temp_col];
            
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
            /*for(let row in map_row)
            {
                for(let col in map_col)
                {
                    // Map Images
                    // var ERANGEL = images("./Images/ERANGEL.png").size(2688, 2688);
                    // var MIRAMAR = images("./Images/MIRAMAR.jpg").size(2688, 2688);
                    let SANHOK = images("./Images/SANHOK.jpg").size(2688,2688);
                    let RECTANGLE = images("./Images/RECTANGLE.png").size(336, 336);

                    let outputFile = mapFileDIR + map_row[row].toString() + map_col[col].toString() + ".jpg";
                    images(SANHOK).draw(images(RECTANGLE), row*336, col*336).save(outputFile);
                }
            }*/

        }else{
            message.reply("undefined command");
        }
    }
}