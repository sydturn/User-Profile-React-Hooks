import React from "react";
import { BirthdayDiv, Balloon, BallonHolder, colourList } from "../styled";

function Balloons({ message }) {
  const messageToBalloon = () => {
    let balloonList = [];
    // where i = string index
    for (var i = 0; i < message.length; i++) {
      const colourIndex = i % colourList.length;
      balloonList.push({
        char: message.charAt(i),
        colour: colourList[colourIndex],
      });
    }
    return balloonList;
  };
  return (
    <BirthdayDiv>
      <Balloon>
        {messageToBalloon().map((letter) => {
          if (letter.char !== " ") {
            return (
              <BallonHolder theme={letter.colour}>
                <span>{letter.char}</span>
              </BallonHolder>
            );
          }
          return <p></p>;
        })}
      </Balloon>
    </BirthdayDiv>
  );
}

export default Balloons;
