import React, { useRef, useState } from "react";
import Sketch from "react-p5";
import styled from "styled-components";
import START from "../../Assets/Videos/START.mp4";
import BOSODE_START from "../../Assets/Videos/BOSODE_START.mp4";
import WAITING_FOR_DIVINATION from "../../Assets/Videos/WAITING_FOR_DIVINATION.mp4";
import ENDING_ONE from "../../Assets/Videos/ENDING_ONE.mp4";
import ENDING_TWO from "../../Assets/Videos/ENDING_TWO.mp4";
import ENDING_THREE from "../../Assets/Videos/ENDING_THREE.mp4";
import COWRIE_SHELL_IMG from "../../Assets/Images/cowrie.png";
import LEATHER_IMG from "../../Assets/Images/leather.jpg";
import ENDING_ONE_IMG from "../../Assets/Images/ENDING_ONE.png"
import ENDING_TWO_IMG from "../../Assets/Images/ENDING_TWO.png"
import ENDING_THREE_IMG from "../../Assets/Images/ENDING_THREE.png"
import Font from '../../Assets/Font/VANHELSING.ttf'
const SketchState = {
  START: "START",
  WAITING_FOR_DIVINATION: "WAITING_FOR_DIVINATION",
  ENDING: "ENDING",
  MULTIPLE_ENDINGS: "MULTIPLE_ENDINGS "
};

const Files = {
  START: START,
  BOSODE_START: BOSODE_START,
  WAITING_FOR_DIVINATION: WAITING_FOR_DIVINATION,
  ENDING_ONE: ENDING_ONE,
  ENDING_TWO: ENDING_TWO,
  ENDING_THREE: ENDING_THREE,
  COWRIE_SHELL_IMG: COWRIE_SHELL_IMG,
  LEATHER: LEATHER_IMG,
  FONT: Font,
  ENDING_ONE_IMG: ENDING_ONE_IMG,
  ENDING_TWO_IMG: ENDING_TWO_IMG,
  ENDING_THREE_IMG: ENDING_THREE_IMG
};

const SketchWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const VideoPlayerSketch = props => {
  const wrapperRef = useRef(null);
  let startVideo;
  let watchingForDivination;
  let endingOne;
  let endingTwo;
  let endingThree;
  let cowrieShellImage;
  let leatherBackground;
  let endingOneImage;
  let endingTwoImage;
  let endingThreeImage;
  let width;
  let height;
  let hasRecentlyMoved = false;
  let showControls = false;
  let endingVideo = 2;
  let font;

  let players = [
    startVideo,
    watchingForDivination,
    endingOne,
    endingTwo,
    endingThree
  ];
  let videoPlaying = 0;
  const states = [
    SketchState.START,
    SketchState.WAITING_FOR_DIVINATION,
    SketchState.ENDING,
    SketchState.MULTIPLE_ENDINGS
  ];
  let currentState = 0;

  let cowrieSize = 50;
  let cowrieShellPositions = [];

  let tx = [];
  let ty = [];

  const preload = p5 => {
    startVideo = p5.createVideo(Files.START);
    watchingForDivination = p5.createVideo(Files.WAITING_FOR_DIVINATION);
    endingOne = p5.createVideo(Files.ENDING_ONE);
    endingTwo = p5.createVideo(Files.ENDING_TWO);
    endingThree = p5.createVideo(Files.ENDING_THREE);
    endingOneImage = p5.loadImage(Files.ENDING_ONE_IMG);
    endingTwoImage = p5.loadImage(Files.ENDING_TWO_IMG);
    endingThreeImage = p5.loadImage(Files.ENDING_THREE_IMG);
    cowrieShellImage = p5.loadImage(Files.COWRIE_SHELL_IMG);
    font = p5.loadFont(Files.FONT)
    leatherBackground = p5.loadImage(Files.LEATHER);
    cowrieShellImage.resize(100, 100);

    setPlayers();
    players.forEach(player => {
      player.hide();
    });
  };

  const setPlayers = () => {
    players = [
      startVideo,
      watchingForDivination,
      endingOne,
      endingTwo,
      endingThree
    ];
  };

  const setup = (p5, canvasParentRef) => {
    width = p5.windowWidth;
    height = p5.windowHeight;

    endingOneImage.resize(0, height/5);
    endingTwoImage.resize(0, height/5);
    endingThreeImage.resize(0, height/5);

    setupCowrieShellPosition(p5);
    p5.createCanvas(width, height).parent(canvasParentRef);
    setupPlayer(p5);
    setupFont(p5);
  };

  const updateStage = (p5) => {
    switch (states[currentState]) {
      case SketchState.START: {
        currentState = 1;
        break;
      }
      case SketchState.WAITING_FOR_DIVINATION: {
        currentState = 2;
        break;
      }
      case SketchState.ENDING: {
        currentState = 3;
        break;
      }
      case SketchState.MULTIPLE_ENDINGS: {
        currentState = 0;
        break;
      }
    }

    setupPlayer(p5);
  };

  const setupFont = (p5) => {
    p5.fill(255, 0, 0);
    p5.textFont(font);
    p5.textSize(80);
    p5.textAlign(p5.CENTER, p5.CENTER);
  }

  const drawFont = (p5, text, color) => {
    p5.fill(color);
    p5.text(text,  width/2, height/2);
  }



  const setupPlayer = (p5) => {
    players[videoPlaying].stop();
    switch (states[currentState]) {
      case SketchState.START: {
        videoPlaying = 0;
        break;
      }
      case SketchState.WAITING_FOR_DIVINATION: {
        videoPlaying = 1;
        break;
      }
      case SketchState.ENDING: {
        videoPlaying = endingVideo;
        break;
      }
    }
    players[videoPlaying].loop();
  };

  const drawWaitingForDivination = (p5) => {
    p5.background(255, 0, 0);
    p5.image(leatherBackground, 0, 0, width, height);
    // cowrieShellPositions
    drawCowrieShells(p5);
    updateCowrieShellPosition(p5);
    drawFont(p5, "PRESS ANY KEY FOR DIVINATION", p5.color(255,0,0))


    if (p5.mouseIsPressed) {
        endingVideo = p5.int(p5.random(2,4));

      updateStage(p5);
    }
  }

  const drawVideo = (p5) => {
    let vidEl = players[videoPlaying].elt;
    if (vidEl.duration - vidEl.currentTime < 0.5) {
      updateStage(p5);
    }
    p5.image(players[videoPlaying], 0, 0, width, height);

    if(showControls){
        let text = "CLICK TO PLAY"
      if(!vidEl.paused) {
          text = "CLICK TO PAUSE"
      }
      let colour = p5.color(255,0,0);
      drawFont(p5, text, colour);
 
    }

    if (p5.mouseIsPressed) {
      if(vidEl.paused) {
          vidEl.play()
      } else {
          vidEl.pause()
      }
    }
  }

  const drawMultipleEndings = (p5) => {
    p5.background(0, 255, 0);
    let text = "SELECT OTHER ENDING"
    drawFont(p5, text, p5.color(255,0,0));

    p5.rectMode(p5.CENTER);
    p5.imageMode(p5.CENTER);

    p5.fill(0, 0, 255);
    p5.image(endingOneImage, width/3, height/2 + height/5);
    // p5.square( width/3, height/2 + height/5, height/5);

    p5.fill(0, 0, 255);
    p5.image(endingTwoImage, 2* width/3, height/2 + height/5);
    // p5.square(2 * width/3, height/2 + height/5, height/5);

    // p5.fill(0, 0, 255);
    // p5.square( width/2 - 50, height/2, height/5);
  }

  const draw = p5 => {
      
    if (states[currentState] == SketchState.START || states[currentState] == SketchState.ENDING) {

        drawVideo(p5);

    } else if(states[currentState] == SketchState.WAITING_FOR_DIVINATION) {
        drawWaitingForDivination(p5);
    } else if(states[currentState] == SketchState.MULTIPLE_ENDINGS){
        drawMultipleEndings(p5)
    }
  };

  const mouseMoved = p5 => {
    if ( !hasRecentlyMoved && (states[currentState] == SketchState.START || states[currentState] == SketchState.ENDING)) {
        hasRecentlyMoved = true;
        showControls = true;
        setTimeout(() => {
            hasRecentlyMoved = false;
            showControls = false
        }, 3000)

    }
  }


  const setupCowrieShellPosition = p5 => {
    for (let i = 0; i < 16; i++) {
      let x = p5.random(cowrieSize, width - cowrieSize);
      let y = p5.random(cowrieSize, height - cowrieSize);
      let v = p5.createVector(x, y);
      cowrieShellPositions.push(v);

      tx.push(p5.random(100));
      ty.push(p5.random(100));
    }
  };

  const updateCowrieShellPosition = p5 => {
    cowrieShellPositions.map((position, index) => {
      let nx = p5.noise(tx[index]);
      let ny = p5.noise(ty[index]);
      let x = 0;
      let y = 0;
      x = p5.map(nx, 0, 1, 0, width);
      y = p5.map(ny, 0, 1, 0, height);
      position.x = x;
      position.y = y;
      return position;
    });

    tx = tx.map(val => {
      return (val += 0.001);
    });
    ty = ty.map(val => {
      return (val += 0.001);
    });
  };

  const drawCowrieShells = p5 => {
    cowrieShellPositions.forEach((position, index) => {
      p5.image(cowrieShellImage, position.x, position.y, 50, 50);
    });
  };

  const isMouseOnCowrie = p5 => {
    let mousePosition = p5.createVector(p5.mouseX, p5.mouseY);
    let activeCowrieShell = cowrieShellPositions.filter(pos => {
      let x = pos.dist(mousePosition) < cowrieSize;
      return x;
    });

    console.log("ACTIVE", activeCowrieShell);
  };

  return (
    <SketchWrapper ref={wrapperRef}>
      <Sketch preload={preload} setup={setup} draw={draw} mouseMoved={mouseMoved} />
    </SketchWrapper>
  );
};

export default VideoPlayerSketch;
