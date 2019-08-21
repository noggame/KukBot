const commando = require('discord.js-commando');
const Jimp = require('jimp'); // image manipulation lib.

module.exports = class determinePlace extends commando.Command{

    constructor(client){
        super(client, {
            name : 'mark',  // cmd
            group : 'map',
            memberName : 'map',
            description : 'determine falling place',
            examples : ['!mark --- Choose one place',
            // '!map list --- Show list'
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

        const baseImagePath = './resource/images/base';
        const RECTANGLE_SIZE = 336;
        
        let MAP_SIZE = RECTANGLE_SIZE*8;
        let map_row;
        let map_col;
        let except_coor;
        let map_name;

        // 맵 생성에 필요한 기본 정보 초기화
        if(args.map == 'er' || args.map == 'mr' || args.map == 'sn' || args.map == 'vk'){
            if(args.map == 'er'){
                map_name = 'ERANGEL';
                map_row = ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
                map_col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

                except_coor = ['IA', 'IB', 'IC', 'ID', 'IE', 'IH',
                'JA', 'JC', 'JE', 'JH', 'KA', 'KH',
                'LA', 'LH', 'NH', 'OA', 'OC', 'OH',
                'PA', 'PB', 'PC', 'PD', 'PE', 'PF', 'PG', 'PH'];
            }
            else if(args.map == 'mr'){
                map_name = 'MIRAMAR';
                map_row = ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
                map_col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

                except_coor = ['IA', 'IB', 'IC', 'IE', 'JB', 'JD', 'JH',
                'KA', 'KH', 'LA', 'LG', 'LH', 'MA', 'MC', 'ME', 'MF',
                'NA', 'ND', 'NF', 'NG', 'OA', 'OC', 'OD', 'OH',
                'PE', 'PF', 'PG', 'PH'];
            }
            else if(args.map == 'sn'){
                map_name = 'SANHOK';
                map_row = ['I1', 'I2', 'J1', 'J2', 'K1', 'K2', 'L1', 'L2']; // (I, J, K, L)/2
                map_col = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']; // (A, B, C, D)/2

                except_coor = ['I1A1', 'I1A2', 'I1B1', 'I1B2', 'I1C1', 'I1C2', 'I1D1', 'I1D2'
                ,'I2A1', 'I2A2', 'I2D2', 'J1A1', 'J2A1', 'K1A1', 'K1D2', 'K2A1', 'K2D2', 
                ,'L1A1', 'L1A2', 'L1D2', 'L2A1', 'L2A2', 'L2C2', 'L2D1', 'L2D2'];
            }
            else if(args.map == 'vk'){
                map_name = 'VIKENDI';
                map_row = ['I', 'J', 'K', 'L', 'M', 'N']; // (I, J, K, L, M, N)
                map_col = ['A', 'B', 'C', 'D', 'E', 'F']; // (A, B, C, D, E, F)

                except_coor = ['IA', 'IB', 'IC', 'ID', 'IE', 'IF',
                'JA', 'JF', 'KA', 'LA', 'MA', 'MF',
                'NA', 'NB', 'NC', 'ND', 'NE', 'NF'];
                MAP_SIZE = RECTANGLE_SIZE*6;
            }
            else{
                message.reply("undefined map");
            }
        }else{
            message.reply("undefined command");
            return;
        }


        let mapPath = baseImagePath + '/' + map_name + '.jpg';

        let temp_row = Math.floor(Math.random()*map_row.length);
        let temp_col = Math.floor(Math.random()*map_col.length);
        let temp_coor = map_row[temp_row] + map_col[temp_col];
        

        let excepted_coor = ''; // 제외된 좌표 저장
        while(isContain(temp_coor, except_coor)){
            excepted_coor += "Except : " + map_row[temp_row] + " - " + map_col[temp_col] + "\n";
            temp_row = Math.floor(Math.random()*map_row.length);
            temp_col = Math.floor(Math.random()*map_col.length);
            temp_coor = map_row[temp_row] + map_col[temp_col];
        }

        let selectedRow = map_row[temp_row];
        let selectedCol = map_col[temp_col];

        // 선택된 좌표에 해당되는 맵 불러오기
        message.reply(/*selectedRow + " " + selectedCol, */{file : baseImagePath + "/CombinedMap/" + map_name + "_" + selectedRow + selectedCol + ".jpg"});


        // 기능) 선택된 좌표를 기준으로 이미지 합친 후 메시지로 출력
        // Jimp.read(mapPath).then(loadMap=>{
        //     return loadMap.resize(MAP_SIZE, MAP_SIZE);
        // }).then(resizedMap =>{
        //     Jimp.read(baseImagePath + '/RED_RECTANGLE.png').then(rec=>{
        //         return rec.resize(RECTANGLE_SIZE,RECTANGLE_SIZE);
        //     }).then(resizedRec=>{
        //         return resizedMap.composite(resizedRec, temp_col*RECTANGLE_SIZE, temp_row*RECTANGLE_SIZE, [Jimp.BLEND_DESTINATION_OVER, 0.2, 0.2]);
        //     }).then(compedMap=>{
        //         return compedMap.write(baseImagePath + '/test.jpg');
        //     }).then(saved=>{
        //         message.reply(selectedCol + " " + selectedRow, {file : baseImagePath + "/test.jpg"});
        //     });
        // });


        // 기능) 좌표를 기준으로 이미지 합친 후 저장 (저장이름 : 기본이미지경로/CombinedMap/맵이름_[Row][Col].jpg)
        // for(let cnt_coor_X=0; cnt_coor_X<map_row.length; cnt_coor_X++){
        //     for(let cnt_coor_Y=0; cnt_coor_Y<map_row.length; cnt_coor_Y++){
        //         let temp_coor = map_row[cnt_coor_X] + map_col[cnt_coor_Y];
        //         if(isContain(temp_coor, except_coor)) continue;

        //         let selectedRow = map_row[cnt_coor_X];
        //         let selectedCol = map_col[cnt_coor_Y];
        //         let mapPath = baseImagePath + '/' + map_name + '.jpg';
                
        //         Jimp.read(mapPath).then(loadMap=>{
        //             return loadMap.resize(MAP_SIZE, MAP_SIZE);
        //         }).then(resizedMap =>{
        //             Jimp.read(baseImagePath + '/RED_RECTANGLE.png').then(rec=>{
        //                 return rec.resize(RECTANGLE_SIZE,RECTANGLE_SIZE);
        //             }).then(resizedRec=>{
        //                 return resizedMap.composite(resizedRec, cnt_coor_X*RECTANGLE_SIZE, cnt_coor_Y*RECTANGLE_SIZE, [Jimp.BLEND_DESTINATION_OVER, 0.2, 0.2]);
        //             }).then(compedMap=>{
        //                 return compedMap.write(baseImagePath + '/CombinedMap/' + map_name + '_' + selectedRow + selectedCol + '.jpg');
        //             });
        //         });
        //     }
        // }
    }
}

// 생성한 좌표(element)가 except_coor(ary)에 해당하는지 검사
function isContain(element, ary){
    for(let x in ary){
        if(ary[x] == element) return true;
    }
    return false;
}
