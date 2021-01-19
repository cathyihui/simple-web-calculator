"use strict";
var myCalc;   // global so html can access it   

//if doc loaded run the function      
$(document).ready(function () {
   //jquery click handler for number buttons
   $(".numBut").click(function () {
       var x = parseInt($(this).html());  //extract value from button's html
       myCalc.numButtonPress(x);        // pass  it to the Calc object
   }
   );
   //jquery click handler for binary operators
   $(".binary").click(function () {
       var x = $(this).html();  //extract text from button's html
       myCalc.binaryOp(x);
   }
   );

   $("#chgSign").click(function () {
       myCalc.changeSign();        // pass  it to the Calc object
   }
   );

   $("#clear").click(function () {
       myCalc.clear();       
   }
   );

   $("#square").click(function () {
       myCalc.square();       
   }
   );

   $("#root").click(function () {
       myCalc.root();       
   }
   );

   $("#inverse").click(function () {
       myCalc.inverse();       
   }
   );

   $("#percentage").click(function () {
       myCalc.percentage();       
   }
   );

   $("#delete").click(function () {
       myCalc.delete();       
   }
   );

   $("#equal").click(function () {
       myCalc.accUpToDate = false; // allow repeated = calculations
       myCalc.calculate();
   }
   );

   myCalc = {
       acc: 0,			//accumulator
       right: 0,		//right operand
       lastOp: '+',	//operator
       dispVal: 'right',  // 'acc' or 'right'  what ever is being displayed
       accUpToDate: false,  // is accumulator up to date (use for repeated equals)

       numButtonPress: function (num) {
           if (this.dispVal == 'acc') {
               this.right = 0;  // '='' or binary operator was previously pressed
               this.dispVal = 'right';
               this.accUpToDate = false;  //accumulator no longer up to date
           }
           if (this.right >= 0)
               this.right = this.right * 10 + num;
           else
               this.right = this.right * 10 - num;
           $("#disp").html(this.right);
       },

       binaryOp: function (op) {
           myCalc.calculate();
           myCalc.lastOp = op;
           myCalc.right = 0;
       },

       changeSign: function () {
           if (this.dispVal == 'right') {
               this.right *= -1;
               $("#disp").html(this.right);
           } 
           
           else {
               this.acc *= -1;
               $("#disp").html(this.acc);
           }

       },

       clear :     function(){
                
           this.acc = 0;	
           this.right = 0;	
           this.lastOp = '+';	
           this.dispVal = 'right';  
           this.accUpToDate = false;
           $("#disp").html(this.acc);

       },

       square: function () {
           if (this.dispVal == 'right') {
               this.right = this.right * this.right;
               $("#disp").html(this.right);
           } 
           
           else {
               this.acc = this.acc * this.acc;
               $("#disp").html(this.acc);
           }

       },

       root: function () {
           if (this.dispVal == 'right') {
               this.right = Math.sqrt(this.right);
               $("#disp").html(this.right);
           } 
           
           else {
               this.acc = Math.sqrt(this.acc);
               $("#disp").html(this.acc);
           }

       },

       inverse: function () {
           if (this.dispVal == 'right') {
               this.right = 1/this.right;
               $("#disp").html(this.right);
           } 
           
           else {
               this.acc = 1/this.acc;
               $("#disp").html(this.acc);
           }

       },

       percentage: function () {
           if (this.dispVal == 'right') {
               this.right = this.right * 0.01;
               $("#disp").html(this.right);
           } 
           
           else {
               this.acc = this.acc * 0.01;
               $("#disp").html(this.acc);
           }

       },

       delete: function () {
           if (this.dispVal == 'right') {
               this.right = ~~(this.right/10);
               $("#disp").html(this.right);
           } 
           
           else {
               this.acc = ~~(this.acc/10);
               $("#disp").html(this.acc);
           }

       },
       
       calculate: function () {
           if (this.accUpToDate == false) {

               if (this.lastOp == '+') 
                {
                   this.acc = this.acc + this.right;
                }
                
                else if(this.lastOp == '-')
                {
                   this.acc = this.acc - this.right; 
                }

                else if (this.lastOp == '*') 
                {
                   this.acc = this.acc * this.right;
                }
                
                else if(this.lastOp == '/')
                {
                   this.acc = this.acc / this.right;
                }
              
               $("#disp").html(this.acc);
               this.dispVal = 'acc';
               this.accUpToDate = true;
           }
       }
   };


}
);
