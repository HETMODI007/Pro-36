var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;

//create feed and lastFed variable here





function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  //lastFed=createSprite(350,30,0,0);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  textSize(15);
  text("Last Feed : 12 AM",350,30);
 
  //write code to read fedtime value from the database 
 fedtimeRef = database.ref('FeedTime');
 fedtimeRef.on("value",readTime);
  //write code to display text lastFed time here
  if(lastFed>=12){
    //show time in PM format when lastfed is greater than 12
    hour();
      }else if(lastFed==0){ 
        textSize(25);
        text("Last Feed : 12 AM",350,50);
      }else{
        //show time in AM format when lastfed is less than 12
        hour();
      }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readTime(data){
  timeS=data.val();
  foodObj.getFedTime(timeS);
}

function feedDog(){
  dog.addImage(happyDog);
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
}

  //write code here to update food stock and last fed time

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
