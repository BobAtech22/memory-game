// main menu setup of HTML content 
function main_menu (){
    $(".top").hide()
    $(".player_div").hide()
}
main_menu()

// game 
function game_page (name){
    if(name="play"){
        $(".main_menu").hide()
        $(".logo_div").hide()
        $(".top").show()
        $(".player_div").show()
        $("body").removeClass("bg-color")
    }else if(name="main_menu"){
        $(".main_menu").show()
        $(".logo_div").show()
        $(".top").hide()
        $(".player_div").hide()
    }
}

// click start button
let opt = 4
let cnt = 1
$(".start_btn").click(()=>{
    // press_start();
    if (opt===0 || cnt ===0){
        // pass
    }else{
        game_page("play");
        main_grid(opt);
        // if (cnt === 1){
        //     content_num();
        // } else{
        //     content_icon();
        // }
    }
})

function main_grid (opt){
    let main_div = $(".grid");
    main_div = $(".grid").addClass(`grid${opt}`)



//Generating a responsive grid and its events
    // for(let i = 0; i < opt**2; i++ ){
    //     $("<div></div>").addClass(`grid-item${opt} ${i}`).appendTo(main_div).click(()=>{
    //         press(i)
    //         $(`div.grid > .${i}`).addClass("wrong")
    //         let item = $(`div.grid > .${i} > ${item_tag}`)
    //         item.show()
    //         check_ans(item)
    //         console.log(chosen)

    //     });
    // };

}