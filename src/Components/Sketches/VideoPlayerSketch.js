import React, { useRef, useState } from "react";
import Sketch from "react-p5";
import styled from "styled-components";
import START from "../../Assets/Videos/START.mp4";
// import BOSODE_START from "../../Assets/Videos/BOSODE_START.mp4";
import WAITING_FOR_DIVINATION from "../../Assets/Videos/WAITING_FOR_DIVINATION.mp4";
import ENDING_ONE from "../../Assets/Videos/ENDING_ONE.mp4";
import ENDING_TWO from "../../Assets/Videos/ENDING_TWO.mp4";
import ENDING_THREE from "../../Assets/Videos/ENDING_THREE.mp4";
import COWRIE_SHELL_IMG from "../../Assets/Images/cowrie.png";
import LEATHER_IMG from "../../Assets/Images/leather.jpg";
import ENDING_ONE_IMG from "../../Assets/Images/ENDING_ONE.png";
import ENDING_TWO_IMG from "../../Assets/Images/ENDING_TWO.png";
import ENDING_THREE_IMG from "../../Assets/Images/ENDING_THREE.png";
import Font from "../../Assets/Font/VANHELSING.ttf";
const SketchState = {
  START: "START",
  WAITING_FOR_DIVINATION: "WAITING_FOR_DIVINATION",
  ENDING: "ENDING",
  MULTIPLE_ENDINGS: "MULTIPLE_ENDINGS "
};

const Files = {
  START: START,
  // BOSODE_START: BOSODE_START,
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

const LoadingPage = styled.div`
  background: rgb(0, 255, 0);
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const LoadingTitleWrapper = styled.div`
    display:flex;
    width: 100vw;
    height: 100vh;
    justify-content:center;
    align-items: center;
    flex-direction: column;
`

const LoadingTitle = styled.h1`
  color:red;
/*   
  top: 50%;
  left: 50%; */
  font-size: 10vw;
`

const LoadingText = styled.p`
  color:red;
  font-size: 5vw;

`



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

  let endingImagePositions = [];
  let endingImageHeight = 0;

  let endingtx = [];
  let endingty = [];

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
    font = p5.loadFont(Files.FONT);
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
    endingImageHeight = height / 5;

    endingOneImage.resize(0, endingImageHeight);
    endingTwoImage.resize(0, endingImageHeight);
    endingThreeImage.resize(0, endingImageHeight);

    setupCowrieShellPosition(p5);
    setupMultipleEndings(p5);
    p5.createCanvas(width, height).parent(canvasParentRef);
    setupPlayer(p5);
    setupFont(p5);
  };

  const updateStage = p5 => {
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
        currentState = 2;
        break;
      }
    }

    setupPlayer(p5);
  };

  const setupFont = p5 => {
    p5.fill(255, 0, 0);
    p5.textFont(font);
    p5.textSize(80);
    p5.textAlign(p5.CENTER, p5.CENTER);
  };

  const drawFont = (p5, text, color) => {
    p5.fill(color);
    p5.textLeading(60);
    p5.text(text, width / 2, height / 2);
  };

  const setupPlayer = p5 => {
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

  const drawWaitingForDivination = p5 => {
    p5.background(255, 0, 0);
    p5.image(leatherBackground, 0, 0, width, height);
    // cowrieShellPositions
    drawCowrieShells(p5);
    updateCowrieShellPosition(p5);
    drawFont(p5, "DOUBLE CLICK FOR DIVINATION", p5.color(255, 0, 0));
  };

  const drawVideo = p5 => {
    let vidEl = players[videoPlaying].elt;
    if (vidEl.duration - vidEl.currentTime < 0.5) {
      updateStage(p5);
    }
    // p5.rectMode(p5.CENTER);
    p5.imageMode(p5.CORNER);
    p5.image(players[videoPlaying], 0, 0, width, height);

    if (showControls) {
      let text = "CLICK TO PLAY";
      if (!vidEl.paused) {
        text = "CLICK TO PAUSE";
      }
      let colour = p5.color(255, 0, 0);
      drawFont(p5, text, colour);
    }

    if (p5.mouseIsPressed) {
      if (vidEl.paused) {
        vidEl.play();
      } else {
        vidEl.pause();
      }
    }
  };

  const setupMultipleEndings = p5 => {
    let vStart = p5.createVector(width / 3, height / 2 + height / 5);
    let vEnd = p5.createVector((2 * width) / 3, height / 2 + height / 5);
    endingImagePositions.push(vStart);
    endingImagePositions.push(vEnd);
    // for (let i = 0; i < 2; i++) {
    //   let x = p5.random(0, width);
    //   let y = p5.random(0, height);
    //   let v = p5.createVector(x, y);
    //   endingImagePositions.push(v);
    //   endingtx.push(p5.random(1000));
    //   endingty.push(p5.random(1000));
    // }
  };

  const updateMultipleEndings = p5 => {
    endingImagePositions.map((position, index) => {
      let nx = p5.noise(endingtx[index]);
      let ny = p5.noise(endingty[index]);
      let x = 0;
      let y = 0;
      x = p5.map(nx, 0, 1, 0, width);
      y = p5.map(ny, 0, 1, 0, height);
      position.x = x;
      position.y = y;
      return position;
    });

    endingtx = endingtx.map(val => {
      return (val += 0.002);
    });
    endingty = endingty.map(val => {
      return (val += 0.002);
    });
  };

  const drawMultipleEndings = p5 => {
    // updateMultipleEndings(p5)
    p5.background(0, 255, 0);
    let text = "DOUBLE CLICK ON IMAGE TO \n WATCH OTHER ENDINGs";
    drawFont(p5, text, p5.color(255, 0, 0));

    p5.rectMode(p5.CENTER);
    p5.imageMode(p5.CENTER);

    switch (endingVideo) {
      // VID 1
      case 2: {
        p5.image(
          endingTwoImage,
          endingImagePositions[0].x,
          endingImagePositions[0].y
        );
        p5.image(
          endingThreeImage,
          endingImagePositions[1].x,
          endingImagePositions[1].y
        );
        break;
      }
      // VID 2
      case 3: {
        p5.image(
          endingOneImage,
          endingImagePositions[0].x,
          endingImagePositions[0].y
        );
        p5.image(
          endingThreeImage,
          endingImagePositions[1].x,
          endingImagePositions[1].y
        );

        break;
      }
      // VID 3
      case 4: {
        p5.image(
          endingOneImage,
          endingImagePositions[0].x,
          endingImagePositions[0].y
        );
        p5.image(
          endingTwoImage,
          endingImagePositions[1].x,
          endingImagePositions[1].y
        );
        break;
      }
    }
  };

  const draw = p5 => {
    if (
      states[currentState] == SketchState.START ||
      states[currentState] == SketchState.ENDING
    ) {
      drawVideo(p5);
    } else if (states[currentState] == SketchState.WAITING_FOR_DIVINATION) {
      drawWaitingForDivination(p5);
    } else if (states[currentState] == SketchState.MULTIPLE_ENDINGS) {
      drawMultipleEndings(p5);
    }
  };

  const mouseMoved = p5 => {
    if (
      !hasRecentlyMoved &&
      (states[currentState] == SketchState.START ||
        states[currentState] == SketchState.ENDING)
    ) {
      hasRecentlyMoved = true;
      showControls = true;
      setTimeout(() => {
        hasRecentlyMoved = false;
        showControls = false;
      }, 3000);
    }
  };

  const mouseClicked = p5 => {};

  const doubleClicked = p5 => {
    if (states[currentState] == SketchState.WAITING_FOR_DIVINATION) {
      endingVideo = p5.int(p5.random(2, 4));

      updateStage(p5);
    } else if (states[currentState] == SketchState.MULTIPLE_ENDINGS) {
      let v = p5.createVector(p5.mouseX, p5.mouseY);
      let chosenEndingIndex;
      endingImagePositions.forEach((position, index) => {
        let x = position.dist(v);
        console.log("YYY", x);
        if (x < 100) {
          chosenEndingIndex = index;
        }
      });

      if(chosenEndingIndex == 0 || chosenEndingIndex == 1){
        switch (endingVideo) {
          // VID 1
          case 2: {
            if (chosenEndingIndex == 0){
              endingVideo = 3;
            } else {
              endingVideo = 4;
            }
            break;
          }
          // VID 2
          case 3: {
            if (chosenEndingIndex == 0){
              endingVideo = 2;
            } else {
              endingVideo = 4;
            }
            break;
          }
          // VID 3
          case 4: {
            if (chosenEndingIndex == 0){
              endingVideo = 2;
            } else {
              endingVideo = 3;
            }
            break;
          }
        }
      }
      // endingVideo = p5.int(p5.random(2, 4));

      console.log("XXX", endingVideo);
      updateStage(p5);
    }
  };

  const setupCowrieShellPosition = p5 => {
    for (let i = 0; i < 16; i++) {
      let x = p5.random(cowrieSize, width - cowrieSize);
      let y = p5.random(cowrieSize, height - cowrieSize);
      let v = p5.createVector(x, y);
      cowrieShellPositions.push(v);

      tx.push(p5.random(1000));
      ty.push(p5.random(1000));
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
      return (val += 0.003);
    });
    ty = ty.map(val => {
      return (val += 0.004);
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
  };

  return (
    <SketchWrapper ref={wrapperRef}>
      <LoadingPage id="p5_loading" class="loadingclass">
        <LoadingTitleWrapper>
           <LoadingTitle> BOSODE </LoadingTitle>
           <LoadingText> loading videos</LoadingText>

        </LoadingTitleWrapper>
      </LoadingPage>
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        mouseMoved={mouseMoved}
        doubleClicked={doubleClicked}
      />
    </SketchWrapper>
  );
};

export default VideoPlayerSketch;
