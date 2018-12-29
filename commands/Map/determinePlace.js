const commando = require('discord.js-commando');
const Jimp = require('jimp'); // image manipulation lib.

module.exports = class determinePlace extends commando.Command{

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
            '!mark mr --- mark coordinates on the MIRAMAR.',
            '!mark sn --- mark coordinates on the SANHOK.',
            '!mark vk --- mark coordinates on the VIKENDI.'
            ],
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

        const imagePath = './resource/images';
        const RECTANGLE_SIZE = 336;
        const MAP_SIZE = RECTANGLE_SIZE*8;

        let map_row;
        let map_col;
        let except_coor;
        let map_name;

        // 맵 생성에 필요한 기본 정보 초기화
        if(args.map == 'er' || args.map == 'mr' || args.map == 'sn' || args.map == 'vk'){
            if(args.map == 'er'){
                map_name = 'ERANGEL';
                map_row = ['A', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
                map_col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

                except_coor = ['AA', 'AB', 'AC', 'AD', 'AG', 'AH', 'JA', 'JH', 'KA', 'KG', 'KH'
                , 'LA', 'NH', 'MA', 'MH', 'NH', 'OH', 'PA', 'PB', 'PC', 'PF', 'PG', 'PH'];
            }
            else if(args.map == 'mr'){
                map_name = 'MIRAMAR';
                map_row = ['A', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
                map_col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

                except_coor = ['AE', 'AF', 'AG', 'AH', 'JA', 'JB', 'MH', 'NH', 'OH', 'PG', 'PH'];
            }
            else if(args.map == 'sn'){
                map_name = 'SANHOK';
                map_row = ['A1', 'A2', 'J1', 'J2', 'K1', 'K2', 'L1', 'L2']; // (A, J, K, L)/2
                map_col = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']; // (A, B, C, D)/2

                except_coor = ['A1A1', 'A1A2', 'A1B1', 'A1B2', 'A1C1', 'A1C2', 'A1D1', 'A1D2'
                ,'A2A1', 'A2A2', 'A2D1', 'A2D2', 'J1A1', 'J2A1', 'K1A1', 'L1A1', 'L1D2'
                ,'L2A1', 'L2A2', 'L2C1', 'L2C2', 'L2D1', 'L2D2'];
            }
            else if(args.map == 'vk'){
                map_name = 'VIKENDI';
                map_row = ['A1', 'A2', 'J1', 'J2', 'K1', 'K2', 'L1', 'L2']; // (A, J, K, L)/2
                map_col = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']; // (A, B, C, D)/2

                // except_coor = ['A1A1', 'A1A2', 'A1B1', 'A1B2', 'A1C1', 'A1C2', 'A1D1', 'A1D2'
                // ,'A2A1', 'A2A2', 'A2D1', 'A2D2', 'J1A1', 'J2A1', 'K1A1', 'L1A1', 'L1D2'
                // ,'L2A1', 'L2A2', 'L2C1', 'L2C2', 'L2D1', 'L2D2'];
            }
            else{
                message.reply("undefined map");
            }
        }else{
            message.reply("undefined command");
            return;
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
        let mapPath = imagePath + '/' + map_name + '.jpg';

        // 선택된 좌표를 기준으로 이미지 합친 후 메시지로 출력
        Jimp.read(mapPath).then(loadMap=>{
            return loadMap.resize(MAP_SIZE, MAP_SIZE);
        }).then(resizedMap =>{
            Jimp.read(imagePath + '/RED_RECTANGLE.png').then(rec=>{
                return rec.resize(RECTANGLE_SIZE,RECTANGLE_SIZE);
            }).then(resizedRec=>{
                return resizedMap.composite(resizedRec, temp_col*RECTANGLE_SIZE, temp_row*RECTANGLE_SIZE, [Jimp.BLEND_DESTINATION_OVER, 0.2, 0.2]);
            }).then(compedMap=>{
                return compedMap.write(imagePath + '/test.jpg');
            }).then(saved=>{
                message.reply(selectedCol + " " + selectedRow, {file : imagePath + "/test.jpg"});
            });
        });
    }
}
