import React, { useRef, useState } from "react";
import Sketch from "react-p5";
import styled from "styled-components";
import START from '../../Assets/Videos/START.mp4'
import WAITING_FOR_DIVINATION from '../../Assets/Videos/WAITING_FOR_DIVINATION.mp4'
import ENDING_ONE from '../../Assets/Videos/ENDING_ONE.mp4'
import ENDING_TWO from '../../Assets/Videos/ENDING_TWO.mp4'
import ENDING_THREE from '../../Assets/Videos/ENDING_THREE.mp4'
import COWRIE_SHELL_IMG from '../../Assets/Images/cowrie.png'
const SketchState = {
    START: 'START',
    WAITING_FOR_DIVINATION: 'WAITING_FOR_DIVINATION',
    ENDING: 'ENDING'
}

const Files = {
    START: START,
    WAITING_FOR_DIVINATION: WAITING_FOR_DIVINATION,
    ENDING_ONE: ENDING_ONE,
    ENDING_TWO: ENDING_TWO,
    ENDING_THREE: ENDING_THREE,
    COWRIE_SHELL_IMG: COWRIE_SHELL_IMG
}

const SketchWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const VideoPlayerSketch = props => {
    const wrapperRef = useRef(null);
    let startVideo;
    let watchingForDivination;
    let endingOne;
    let endingTwo;
    let endingThree;
    let cowrieShellImage;
    let width;
    let height;

    let players = [startVideo, watchingForDivination, endingOne, endingTwo, endingThree];
    let videoPlaying = 0;
    const states = [SketchState.START, SketchState.WAITING_FOR_DIVINATION, SketchState.ENDING];
    let currentState = 0;

    let cowrieSize = 50;
    let cowrieShellPositions = []
    


    const preload = p5 => {
        startVideo = p5.createVideo(Files.START);
        watchingForDivination = p5.createVideo(Files.WAITING_FOR_DIVINATION);
        endingOne = p5.createVideo(Files.ENDING_ONE);
        endingTwo = p5.createVideo(Files.ENDING_TWO);
        endingThree = p5.createVideo(Files.ENDING_THREE);
        cowrieShellImage = p5.loadImage(Files.COWRIE_SHELL_IMG)
        cowrieShellImage.resize(100, 100)
        setPlayers()
        players.forEach((player)=>{
            player.hide();
        })

 
    };

    const setPlayers = () => {
        players = [startVideo, watchingForDivination, endingOne, endingTwo, endingThree];
    }

    const setup = (p5, canvasParentRef) => {
        width = p5.windowWidth;
        height = p5.windowHeight;
        for(let i = 0; i < 16; i++){
            let x = p5.random(cowrieSize, width - cowrieSize);
            let y = p5.random(cowrieSize, height - cowrieSize);
            let v = p5.createVector(x, y);
            cowrieShellPositions.push(v);
        }
        p5.createCanvas(width, height).parent(canvasParentRef);
        setupPlayer();
    }

    const updateStage = () => {
        switch(states[currentState]){
            case SketchState.START: {
                currentState = 1;
                break;
            }
            case SketchState.WAITING_FOR_DIVINATION: {
                currentState = 2;
                break;
            }
            case SketchState.ENDING: {
                currentState = 0;
                break;
            }
        }

        setupPlayer()
    }

    const setupPlayer = () => {
        players[videoPlaying].stop();
        switch(states[currentState]){
            case SketchState.START: {
                videoPlaying = 0;
                break;
            }
            case SketchState.WAITING_FOR_DIVINATION: {
                videoPlaying = 1;
                break;
            }
            case SketchState.ENDING: {
                let randomVal = 3;
                videoPlaying = randomVal;
                break;
            }
        }
        players[videoPlaying].loop()
    }

    const draw = (p5) => {
        if(states[currentState] !== SketchState.WAITING_FOR_DIVINATION){
            let vidEl = players[videoPlaying].elt;
            if( vidEl.duration - vidEl.currentTime < 0.5){
                updateStage();
            }
            p5.image(players[videoPlaying], 0,0, width, height)
        } else {
            p5.background(255,0,0);
            // cowrieShellPositions
            cowrieShellPositions.forEach((position) => {
                p5.image(cowrieShellImage,position.x,position.y,50,50);

            })
            if(p5.mouseIsPressed){
                updateStage();
            }
        }

    }


    return (
        <SketchWrapper ref={wrapperRef}>
          <Sketch preload={preload} setup={setup} draw={draw} />
        </SketchWrapper>
      );
    
}

export default VideoPlayerSketch;
