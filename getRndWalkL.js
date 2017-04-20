/*getRndWalk
* getRndWalkL.js
*
*    Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com>
*
*    This software is released under the MIT License.
*    See LICENSE or http://opensource.org/licenses/mit-license.php
*/
//this function returns function that simulates random walk in a closed system, by drawing lines
/*
*=== Paremeter ===
* canvasId: id of target canvas.
* rgb: RGB color.
*=== Parameters for returned function ===
* x0 and y0: initial values.
* delay: interval of drawing a line in milliseconds.
* sampleX and sampleY: [optional] csv formatted numerical texts.
*=== Method of returned function ===
* end(): method to end simulation and to return Log object.
*============================================================
*/
function getRndWalkL(canvasId,rgb){
    //canvasId: id of target canvas
    //rgb: RGB color
    var slf=window,c=slf.document.getElementById(canvasId).getContext('2d'),cW=c.canvas.width,cH=c.canvas.height,
        Log={step:0,x0:0,y0:0,x:0,y:0,timeStart:'',timeEnd:'',type:'lines'},drwId,x=0,y=0,d=0-1,dx=0,dy=0,regEx=/^[-+]?[0-9]+(?:\.[0-9]+)?$/,
        /*this function returns random sample from a given sample*/
        Sample=function(csv){
            //csv: a csv formatted text
            var csvAr=csv.split(/,/),n=csvAr.length;
            return csvAr[Math.floor(Math.random()*n)];
        },
        /*this function draws a line on canvas*/
        drw=function(x0,y0,delay,sampleX,sampleY){
            //x0 and y0: initial values
            //delay: interval of drawing a line in milliseconds
            //sampleX and sampleY: [optional] csv formatted numerical texts
            /*=== resetting Log object ===*/
            Log.timeStart=slf.Date(),Log.timeEnd='',Log.step=0,Log.x0=x0,Log.y0=y0,Log.x=x0,Log.y=y0;
            //method to end simulation and to return Log object
            drw.end=function(){
                if(!!drwId){slf.clearInterval(drwId),drwId=null,Log.timeEnd=slf.Date();return Log;}
            };
            c.lineWidth=1,c.strokeStyle=rgb,x=x0,y=y0;
            /*=== Log object is updated ===*/
            Log.step+=1;
            drwId=slf.setInterval(function(){
                c.beginPath(),c.moveTo(x,y);
                d=-d;
                dx=(sampleX!=undefined)?Sample(sampleX):slf.Math.random()*d;
                dy=(sampleY!=undefined)?Sample(sampleY):slf.Math.random()*d;
                x+=regEx.test(dx)?+dx:0;
                y+=regEx.test(dy)?+dy:0;
                x=x<0?0:x;
                x=x>+cW?+cW:x;
                y=y<0?0:y;
                y=y>+cH?+cH:y;
                c.lineTo(x,y),c.stroke();
                /*=== Log object is updated ===*/
                Log.step+=1,Log.x=x,Log.y=y;
            },delay);
        };
    return drw;
};