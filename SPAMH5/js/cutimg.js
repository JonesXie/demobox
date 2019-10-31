function getimgsize(imgw,imgh,canvasw,canvash,imgout){
  var x,y,imgwo,imgho;
  var canvasratio=canvash/canvasw;
  var imgratio=imgh/imgw;
  if(imgratio==canvasratio){
    x=0;
    y=0;
    imgwo=imgw;
    imgho=imgh;
  }
  else if(imgratio<canvasratio) {
    y=0;
    imgho=imgh;
    imgwo=imgh/canvasratio;
    x=(imgw-imgwo)/2;
  }
  else {
    x=0;
    imgwo=imgw;
    imgho=imgw*canvasratio;
    y=(imgh-imgho)/2;
  }
  imgout[0]=x;
  imgout[1]=y;
  imgout[2]=imgwo;
  imgout[3]=imgho;
}