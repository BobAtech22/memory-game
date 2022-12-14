// ----------------------- initail variables
//selected items
let chosen = []
// multiplayer score 
let score = [0,0,0,0]
//index
let player_index = 0
//Moves
let moves = 0
//Time variables
let sec = 0
let min = 0


$(".top").hide()
$(".ply_cnt").hide()
$(".results_dark").hide()
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
    document.location.reload()
})
// game_over new_game button
$(".results_new_game").click(()=>{
    document.location.reload()
})



// click restart button
$(".btn_restart").click(()=>{
    clear_grid()
    min = 0
    sec = 0

})
// game_over restart button
$(".results_restart").click(()=>{
    clear_grid()
    min = 0
    sec = 0
    $(".results_dark").hide()
    $(".player_list > ").remove()
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
        start_time()
    }
})

//Generating the grid
function main_grid (opt){
    $(".grid").addClass(`grid${opt}`)

    grid_gen()
}

//events on clicking grid items
function grid_gen(){
    for(let i = 0; i < opt**2; i++ ){
        $("<div></div>").addClass(`grid-item${opt} ${i}`).appendTo(".grid").click(()=>{
            let item_div = $(`.grid > .${i}`)

            if (item_div.hasClass("clicked") ){
                //pass
            }else{
                $(`div.grid > .${i}`).addClass("wrong clicked")
            let item = $(`div.grid > .${i} > ${item_tag}`)
            item.show()
            check_ans(item)
            console.log(chosen)
            click_move()
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
        $(`.b${player_index} > .h4_score`).text(`${score[player_index]*5}`)
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
            if(ply === 1){
                // pass
            }else{
                set_current_player()
            }
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
        $("<h4>").addClass("h4_p1 time").text(`0:00`).appendTo($(`.b0`))
    
        $("<h3>").addClass("h3_title").text(`Moves`).appendTo($(`.b1`))
        $("<h4>").addClass("h4_p1 moves").text(`${moves}`).appendTo($(`.b1`))
        
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


//------------------------- functions on player one timer
function start_time(){
    var myTime = setInterval(()=>{
      time()
    },1000)
}
// function start_time(){
//     for(let i =moves;  i < opt**2; ){
//         setTimeout(()=>{
//             time()
//         },1000)
//     }
// }
function time(){
    sec++;
    if (sec === 60) {
      min++
      sec=0
    }
    time_sec = sec < 10 ? `0${sec}`: sec
    $(".time").text(`${min}:${time_sec}`)
}

// function reset_time(){
//     clearInterval(myTime)
    
// }

// --------count move
function click_move(){
    ++moves
    $(".moves").text(`${moves}`)
    if(moves === opt**2 ){
        $(".results_dark").show()
        result_scores(score)
    }
  }




// -------------- -clear grid
function clear_grid(){
    chosen.length = 0;
    player_index = 0;
    moves = 0;
    // clear score
    for (let i = 0; i < score.length; i++){
      score[i]=0;
    }
    $(`.grid-item${opt} > `).remove();
    $(`.grid-item${opt}`).removeClass("right wrong");
    $(".ply_cnt > div").remove();
    $(".grid > div").remove();
    // remove number or icon items in grid
    //Generate new set of number or icon items
    grid_gen()
    if(cnt === 1){
      content_num();
    }else if(cnt === 2){
      content_icon();
    }
  
    player_score_board();
    // $(`.player_board`).removeClass("current_player")
    // $(`.b${player_index}`).addClass("current_player")
  }

  //----------------------------- Functions for making result_scores
// prints the winner
function who_won(arr){
    console.log(arr[0].score)
    count = 1
    for (let i = 1; i < arr.length; i++ ){
      if (arr[0].score === arr[i].score){
          $(".headn").text(`It's a tie!`)
          count++
          make_dark(count)
      }
    }
    if(arr[0].score != arr[1].score) {
        $(".headn").text(`Player ${arr[0].player} Wins!`)
        make_dark(1)
    }
  }
//paint top players score dark
  function make_dark(num){
    for(let i =0; i < num; i++){
      $(`.r${i}`).addClass("top_player")
      $(`.r${i} > `).addClass("top_ply_cnt")
    }
  }

//Creating objects(players:scores) and arranging in desc.. order
  function player_score_list(arr){
    let temp =[]
    for(let i =0; i < ply; i++){
      temp.push({player : i+1, score: arr[i]})
    }
    let new_list = temp.sort((x,y)=>{return(y.score-x.score)})
    return new_list
  }

//-------------------------------------  lunch Game over score 
  function result_scores(arr){
    let list = player_score_list(arr)

    for (let i=0; i < list.length; i++){
      let player_num = list[i].player
      let score = list[i].score
      $("<div>").addClass(`player_results r${i}`).appendTo($(".player_list"))
      $("<p>").addClass("p_cnt player_results_p").text(`Player ${player_num}`).appendTo($(`.r${i}`))
      $("<h2>").addClass("p_cnt player_results_h2").text(`${score} pairs`).appendTo($(`.r${i}`))
    }

    who_won(list)
  }
