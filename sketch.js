var Godzilla, GodzillaImage
var HappyG, HappyGImage
var FoodCount
var DataBase
function preload()
{
  GodzillaImage = loadImage("images/Hungry_Godzilla_Adult.png");
  HappyGImage = loadImage("images/Happy_Godzilla_Adult.png")
}

function setup() {
  createCanvas(400, 400);
  
  Godzilla = createSprite(200,300,50,50)
  Godzilla.addImage("Hungry_Godzilla_Adult", GodzillaImage)
  Godzilla.addImage("Happy_Godzilla_Adult", HappyGImage)
  Godzilla.scale = 0.1
  DataBase = firebase.database()
  getCount()
}


function draw() {  
  background("White")
text("Feed your Kaiju " + " Press The Up Arrow To Feed", 150, 100)
text("G-Energy fed " + FoodCount, 150, 130)

  drawSprites();
  console.log(FoodCount)

}
function getCount()
{
   var countRef =  DataBase.ref("FoodCount")
   countRef.on("value", function(data){
    FoodCount = data.val();
   })
}
function keyPressed(){
if(keyCode === UP_ARROW){
   FoodCount = FoodCount-1
   updateFoodCount()
Godzilla.changeImage("Happy_Godzilla_Adult", HappyGImage);
}
}
function updateFoodCount()
   {
       DataBase.ref("/").update({FoodCount:FoodCount})
   }
