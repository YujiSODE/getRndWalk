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
* - title: description of simulation.
* - x0 and y0: initial values.
* - maxStep: the max step that is equivalent to positive integer;
*     simulating process is not canceled without calling method
*     "end()" when maxStep = 0.
* - sampleX and sampleY: [optional] csv formatted numerical texts.
*=== Property and method of returned function ===
* - log: result of simulation as an object.
* - end(): method to end simulation, shows message.
*============================================================
*/
function getRndWalkL(canvasId,rgb){
    //canvasId: id of target canvas
    //rgb: RGB color
    var slf=window,c=slf.document.getElementById(canvasId).getContext('2d'),cW=c.canvas.width,cH=c.canvas.height,
        _Log={title:'',step:0,maxStep:0,color:rgb,x0:0,y0:0,x:0,y:0,time:'',type:'lines'},drwId,x=0,y=0,d=0-1,dx=0,dy=0,regEx=/^[-+]?[0-9]+(?:\.[0-9]+)?$/,
        /*this function returns random sample from a given sample*/
        Sample=function(csv){
            //csv: a csv formatted text
            var csvAr=csv.split(/,/),n=csvAr.length;
            return csvAr[Math.floor(Math.random()*n)];
        },
        /*this function draws a line on canvas*/
        drw=function(title,x0,y0,maxStep,sampleX,sampleY){
            //title: description of simulation
            //x0 and y0: initial values
            //maxStep: the max step that is equivalent to positive integer; simulating process is not canceled without calling method "end()" when maxStep = 0
            //sampleX and sampleY: [optional] csv formatted numerical texts
            /*=== resetting _Log object ===*/
            _Log.title=title,_Log.time=slf.Date(),_Log.step=0,_Log.maxStep=maxStep,_Log.x0=x0,_Log.y0=y0,_Log.x=x0,_Log.y=y0;
            //log: result of simulation as an object
            drw.log={};
            //end(): method to end simulation, shows result
            drw.end=function(){
                if(!!drwId){
                    var msg='';
                    slf.clearInterval(drwId),drwId=null;
                    msg=_Log.title+'\ncolor: '+_Log.color+'\n(x0,y0): ('+_Log.x0+','+_Log.y0+')\ntype: '+_Log.type+'\nsteps: '+_Log.step+'/'+_Log.maxStep;
                    drw.log=slf.JSON.parse(slf.JSON.stringify(_Log));
                    slf.alert(msg);
                }
            };
            c.lineWidth=1,c.strokeStyle=rgb,x=x0,y=y0;
            /*=== _Log object is updated ===*/
            _Log.step+=1;
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
                /*=== _Log object is updated ===*/
                _Log.step+=1,_Log.x=x,_Log.y=y;
                //it stops the current simulation if "_Log.step = maxStep"
                if(!(_Log.step!=maxStep)){drw.end();}
            },4);
        };
    return drw;
};