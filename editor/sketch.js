import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1080, 
  seed: 1899,   
};

export function drawReceipt(p) {
  const { width: w, height: h } = p;
  
  
  p.background(255);

  const topBound = 80;
  const bottomBound = h - 160;

  p.fill(0);
  p.noStroke();
  p.beginShape();
  p.vertex(-10, topBound); 
  for (let x = 0; x <= w + 10; x += 12) {
      let peakY = 20 + p.noise(x * 0.15) * 45; 
      p.vertex(x, peakY);
  }
  p.vertex(w + 10, topBound);
  p.endShape(p.CLOSE);
  
  p.stroke(255);
  p.strokeWeight(1.5);
  p.noFill();
  for (let x = 10; x < w; x += 18) {
      if (p.random() > 0.4) {
          let peakY = 20 + p.noise(x * 0.15) * 45;
          p.line(x, peakY, x + p.random(-8, 8), peakY + p.random(10, 25));
      }
  }
  
  
  let mapY = topBound;
  let mapH = 370; 
  
  drawSaintDenisMap(p, 0, mapY, w, mapH);

  
  let horizonY = mapY + mapH; 
  
  p.fill(0);
  p.noStroke();
  p.beginShape();
  p.vertex(-10, h);
  p.vertex(-10, horizonY);
  for (let x = 0; x <= w; x += 5) {
    p.vertex(x, horizonY + p.noise(x * 0.1) * 20);
  }
  p.vertex(w + 10, horizonY);
  p.vertex(w + 10, h);
  p.endShape(p.CLOSE);

  
  drawTitle(p, w, 490);

  let separatorY = 660;
  p.stroke(255);
  p.strokeWeight(5);
  p.strokeCap(p.ROUND);
  for(let x = 40; x < w - 40; x += 20) {
     p.line(x, separatorY, x + 8, separatorY);
  }

  p.fill(255);
  p.noStroke();
  p.textFont("Impact"); 
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.BOLD);
  p.textSize(26);
  
  let quoteText = "There is Nothing to be\nAfraid of, Mr. Morgan.\nTake a Gamble that Love\nExists, and do a Loving Act";
  p.text(quoteText, w/2, separatorY + 45);
  
  p.stroke(0); 
  p.strokeWeight(3);
  for (let i = 0; i < 60; i++) {
    const x = p.random(30, w - 30);
    const y = p.random(separatorY + 45, separatorY + 160);
    p.line(x, y, x + p.random(-8, 10), y + p.random(3, 12));
  }


  p.fill(255);
  p.noStroke();
 
  p.rect(0, bottomBound, w, h - bottomBound);
  
  
  p.stroke(0);
  p.strokeWeight(2);
  for (let x = 24; x < w - 24; x += 11) {
    p.line(x, 8, Math.min(x + 6, w - 24), 9);
  }
  
  
  for (let x = 24; x < w - 24; x += 11) {
    p.line(x, bottomBound + 10, Math.min(x + 6, w - 24), bottomBound + 10);
  }

  const barcodeValue = "YEAR 1899";
  drawBarcode(p, barcodeValue, w / 2, bottomBound + 30);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(20);
  p.text(barcodeValue, w / 2, bottomBound + 115);
}



function drawSaintDenisMap(p, mapX, mapY, mapW, mapH) {
 
  p.fill(255);
  p.noStroke();
  p.rect(mapX, mapY, mapW, mapH);
  
  p.stroke(0);
  p.strokeWeight(1.5);
  for (let y = mapY; y < mapY + mapH; y += 7) {
     for (let x = mapX; x < mapX + mapW; x += 6) {
        if(p.noise(x * 0.05, y * 0.05) > 0.35) {
            p.line(x, y, x + 4, y);
        }
     }
  }

  
  let land = [
    [70, 0], [270, 0], [310, 40], [340, 140], [320, 240], [270, 290],
    [170, 320], [70, 330], [20, 310], [40, 240], [20, 140], [50, 40]
  ];
  p.fill(255); 
  p.stroke(0);
  p.strokeWeight(3);
  p.beginShape();
  for (let pt of land) p.vertex(mapX + pt[0], mapY + pt[1]);
  p.endShape(p.CLOSE);

  
  let tracks = [
    [20, 305], [90, 315], [170, 305], [240, 265], [270, 185], [290, 80], [290, 0]
  ];
  p.noFill();
  p.stroke(0);
  p.strokeWeight(5);
  p.beginShape();
  for (let pt of tracks) p.vertex(mapX + pt[0], mapY + pt[1]);
  p.endShape();
  
  p.stroke(255);
  p.strokeWeight(2);
  p.drawingContext.setLineDash([4, 6]);
  p.beginShape();
  for (let pt of tracks) p.vertex(mapX + pt[0], mapY + pt[1]);
  p.endShape();
  p.drawingContext.setLineDash([]); 

 
  let markerX = mapX + mapW/2 + 10, markerY = mapY + 110;
  p.fill(0);
  p.noStroke();
  p.circle(markerX, markerY, 18);
  p.stroke(255);
  p.strokeWeight(2.5);
  p.line(markerX - 4, markerY - 4, markerX + 4, markerY + 4);
  p.line(markerX - 4, markerY + 4, markerX + 4, markerY - 4);

  
  p.fill(0);
  p.stroke(255);
  p.strokeWeight(4); 
  p.textFont("Georgia"); 
  p.textStyle(p.BOLD);
  p.textAlign(p.CENTER, p.CENTER);
  
  p.textSize(32);
  p.text("S A I N T   D E N I S", mapX + mapW/2, mapY + 160);

  p.push();
  p.translate(mapX + 350, mapY + 240);
  p.rotate(p.PI * 1.6); 
  p.textSize(22);
  p.text("R I V E R", 0, 0);
  p.pop();

 
  p.push();
  p.translate(mapX + 340, mapY + 40);
  p.stroke(0);
  p.strokeWeight(1.5);
  p.fill(255);
  p.circle(0, 0, 26);
  p.fill(0);
  p.triangle(-4, 0, 4, 0, 0, -12); 
  p.fill(255);
  p.triangle(-4, 0, 4, 0, 0, 12);  
  p.fill(0);
  p.noStroke();
  p.textSize(10);
  p.text("N", 0, -18);
  p.pop();
}


function drawTitle(p, w, startY) {
  let cx = w / 2;
  p.textAlign(p.CENTER, p.CENTER);

  p.textFont("Arial");
  p.textStyle(p.BOLD);
  p.fill(255);
  p.textSize(12);
  p.text("ROCKSTAR GAMES PRESENTS", cx, startY);

  p.textFont("Impact");
  p.textStyle(p.BOLD);
  
  let redDeadY = startY + 45;

  p.fill(0);
  p.textSize(68); 
  p.text("RED DEAD", cx + 2, redDeadY + 2);
  p.fill(255);
  p.text("RED DEAD", cx, redDeadY);

  let redemptionY = startY + 101; 

  p.fill(0);
  p.textSize(60); 
  p.text("REDEMPTION", cx - 15 + 2, redemptionY + 2); 
  p.fill(255);
  p.text("REDEMPTION", cx - 15, redemptionY);

  p.fill(0);
  p.textSize(80); 
  p.text("II", cx + 160 + 2, redemptionY - 5 + 2); 
  p.fill(255); 
  p.text("II", cx + 160, redemptionY - 5);

  p.stroke(0); 
  p.strokeWeight(2); 
  for (let i = 0; i < 75; i += 1) {
    const x = p.random(20, w - 20);
    const y = p.random(redDeadY - 30, redemptionY + 30);
    p.line(x, y, x + p.random(-6, 8), y + p.random(2, 10));
  }
}
function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128", 
    width: 2,     
    height: 75,   
    displayValue: false, 
    margin: 0,
    background: "#ffffff", 
    lineColor: "#000000",
  });
  
  p.drawingContext.drawImage(barcodeCanvas, Math.floor(centerX - barcodeCanvas.width / 2), y);
}