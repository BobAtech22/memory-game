// ----------------------- initail variables
//selected items
let chosen = []
// multiplayer score 
let score = [0,0,0,0]
//
let player_index = 0
$(".top").hide()
$(".ply_cnt").hide()

// --------------------- menu button Options -------------------
//--------------- Select Theme
let cnt = 0;

let item_tag;
$(".btn_num").click(()=>{
    cnt = 1
    item_tag = "h1"
    $(".btn_num").addClass("btn_on");
    $(".btn_icon").removeClass("btn_on");
})

$(".btn_icon").click(()=>{
    cnt = 2
    item_tag = "i"
    $(".btn_icon").addClass("btn_on");
    $(".btn_num").removeClass("btn_on");

})

// ------------- Number of players
let ply = 0
for (let i = 1; i <= 4; i++){
  $(`.ply_${i}`).click(()=>{
    ply = i
    $(".small_btn").removeClass("btn_on")
    $(`.ply_${i}`).addClass("btn_on")
  })
}

 //------------ Grid size
let opt=0;
$(".btn4").click(()=>{
    opt=4;
    $(".btn4").addClass("btn_on");
    $(".btn6").removeClass("btn_on");
})

$(".btn6").click(()=>{
    opt=6;
    $(".btn6").addClass("btn_on");
    $(".btn4").removeClass("btn_on");
})

// click new game button
$(".btn_new").click(()=>{
    // main_menu()
    // $(`.grid-item${opt}`).hide()
    document.location.reload()
})

// click restart
$(".btn_restart").click(()=>{
    clear_grid()
})





//-------------------------------------------- main menu setup of HTML content 
function main_menu (){
    $(".top").hide()
    $(".player_div").hide()
    $(".logo_div").show()
    $("body").addClass("bg-color")
    $(".grid").removeClass(`grid${opt}`)
    $(".main_menu").show()
}


// game play html layout for start button
function game_page (){
        $(".main_menu").hide()
        $(".logo_div").hide()
        $(".top").show()
        $(".player_div").show()
        $("body").removeClass("bg-color")
}




// click start button
$(".start_btn").click(()=>{
    // press_start();
    if (opt===0 || cnt ===0 || ply===0){
        // pass
    }else{
        // prepare game page
        game_page();
        // create grid based on size selected
        main_grid(opt);
        if (cnt === 1){
            // generate number items
            content_num();
        } else{
            // generate icon items
            content_icon();
        }
        // generate score board
        player_score_board()
    }
})

function main_grid (opt){
    $(".grid").addClass(`grid${opt}`)
//Generating a responsive grid and its events
    grid_gen()
}
function grid_gen(){
    for(let i = 0; i < opt**2; i++ ){
        $("<div></div>").addClass(`grid-item${opt} ${i}`).appendTo(".grid").click(()=>{
            let item_div = $(`.grid > .${i}`)
            if (item_div.hasClass("right") || item_div.hasClass("wrong") ){
                //pass
            }else{
                $(`div.grid > .${i}`).addClass("wrong")
            let item = $(`div.grid > .${i} > ${item_tag}`)
            item.show()
            check_ans(item)
            console.log(chosen)
            }
        });
    }
}



// ------------------------- functions for checking 2 grid items

// function picking 2nd class name in the grid item
function icon_val (input){
    let cl_string = input.attr("class")
    let class_list = cl_string.split(" ")
    return (class_list[1])
}

// function for compering the class names of 
// the 2 chosen item & reacting if equal or not
function equal(value){
    if (value[0] === value[1]){
        $(`.${value[1]}`).parent().removeClass("wrong").addClass("right")
        // set new score
        score[player_index]++;
        $(`.b${player_index} > h4`).text(`${score[player_index]*5}`)
    }
}

// function check for the number of elements in array chosen
// & applies both functions above when necessary
function check_ans(item){
    if (chosen.length <2){
        chosen.push(icon_val(item))
        if (chosen.length === 2){
            equal(chosen)
            // console.log(chosen,chosen.length)
            set_current_player()
            chosen.length = 0;
        }
    }
}
//Set Current Player
function set_current_player(){
    if (player_index < ply-1){
      player_index++
    }else{
      player_index = 0;
    }
    $(`.player_board`).removeClass("current_player")
    $(`.b${player_index}`).addClass("current_player")
  }
  


// --------------------Generating Grid items
// list of Numbers
function num_func(num){
    let num_array = []
    let i = 0;
    while(num_array.length < num**2) {
        num_array.push(i,i);
        i++;
    }
    num_array.sort(()=> 0.5-Math.random())
    return num_array
}

// list of icons
let icons =[
'<i class="fa-solid fa-anchor"></i>',
'<i class="fa-solid fa-bath"></i>',
'<i class="fa-solid fa-bicycle"></i>',
'<i class="fa-solid fa-bug"></i>',
'<i class="fa-solid fa-car"></i>',
'<i class="fa-solid fa-feather"></i>',
'<i class="fa-solid fa-fire"></i>',
'<i class="fa-solid fa-flask"></i>',
'<i class="fa-solid fa-futbol"></i>',
'<i class="fa-solid fa-sun"></i>',
'<i class="fa-solid fa-key"></i>',
'<i class="fa-solid fa-leaf"></i>',
'<i class="fa-solid fa-moon"></i>',
'<i class="fa-solid fa-ghost"></i>',
'<i class="fa-solid fa-plane"></i>',
'<i class="fa-solid fa-code"></i>',
'<i class="fa-solid fa-gamepad"></i>',
'<i class="fa-solid fa-laptop"></i>',
'<i class="fa-solid fa-earth-americas"></i>'
]


// grid number display function
function content_num (){

    let list = num_func(opt)
    for(let i = 0; i < opt**2; i++ ){
       let num = list[i]
        $(`<h1>${num}</h1>`).addClass(`cont${opt} num_${num}`).appendTo($(`div.grid > .${i}`))

    }

    setTimeout(()=>{
        for(let i = 0; i < opt**2; i++ ){
            $(`div.grid > .${i} > h1`).hide()
        }
    }, 2000)

}

// grid icon display function
function content_icon (){

    let list = num_func(opt)
    for(let i = 0; i < opt**2; i++ ){
       let num = list[i]
        $(icons[num]).addClass(`icon${opt}`).appendTo($(`div.grid > .${i}`))
    }

    setTimeout(()=>{
        for(let i = 0; i < opt**2; i++ ){
            $(`div.grid > .${i} > i`).hide()
        }
    }, 2000)

}


//-------------------------------------- player_score_board
function player_score_board(){
    // individual score boards
    $(".ply_cnt").show()
      if (ply > 1){
        for (let i=0; i < ply; i++ ){
          $("<div>").addClass(`player_board b${i}`).appendTo($(".ply_cnt"))
          $("<h3>").addClass("h3_title").text(`Player ${i+1}`).appendTo($(`.b${i}`))
          $("<h4>").addClass("h4_score").text(`${0}`).appendTo($(`.b${i}`))
          //initial current player
          $(`.b${player_index}`).addClass("current_player")
        }
      }else{
        for (let i=0; i < 2; i++ ){
          $("<div>").addClass(`player_board b${i}`).appendTo($(".ply_cnt"))
        }
        $("<h3>").addClass("h3_title").text(`Time`).appendTo($(`.b0`))
        $("<h4>").addClass("h4_score").text(`1:59`).appendTo($(`.b0`))
    
        $("<h3>").addClass("h3_title").text(`Moves`).appendTo($(`.b1`))
        $("<h4>").addClass("h4_score").text(`39`).appendTo($(`.b1`))
      }
        // score board container size
        let container_size = $(".player_board").length
        if (container_size === 2 && ply < 2){
            $(".ply_cnt").removeClass("large_cont").addClass("small_cont2")
        }else if (container_size === 2) {
            $(".ply_cnt").removeClass("large_cont").addClass("small_cont")
        }else if (container_size === 3) {
            $(".ply_cnt").removeClass("large_cont").addClass("mid_cont")
        }
}


// -------------- -clear grid
function clear_grid(){
    chosen.length = 0;
    // clear score
    for (let i = 0; i < score.length; i++){
      score[i]=0;
    }
    $(`.grid-item${opt}x${opt} > `).remove()
    $(`.grid-item${opt}x${opt}`).removeClass("right wrong")
    $(".ply_cnt > div").remove()
    $(".grid > div").remove()
    // remove number or icon items in grid
    //Generate new set of number or icon items
    grid_gen()
    if(cnt === 1){
      content_num()
    }else if(cnt === 2){
      content_icon()
    }
  
    player_score_board()
  }