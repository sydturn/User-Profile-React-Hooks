import styled, { keyframes } from "styled-components";
// determines whether black text or white text would display better on background colour
// essentially checks to see if background colour is on the darker or lighter half of hex code
// and returns the opposite
const getTextColour = (bgColor) => {
  return parseInt(bgColor.replace("#", ""), 16) > 0xffffff / 2
    ? "#000"
    : "#fff";
};
// default favorite colour
const dfcolour = "5d1070";
export const BodyStyle = styled.div`
  height: 100vh;
  position: relative;
  color: black;
  background-image: url('../img/background.png');
  overflow-y: auto;
  margin: 0;
  padding: 0;
}`;
export const Container = styled.div`
  width: fit-content;
  margin: auto;
`;
export const Input = styled.input`
  font-size: 18px;
  padding: 2px 5px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: left;
  ::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
`;
const slideTop = keyframes`
  from {margin-top:-50px;}
  to {margin-top: 0px;}
`;
// shown on users birthday
export const BirthdayDiv = styled.div`
  font-family: "Wendy One", sans-serif;
  text-transform: uppercase;
  padding: 10px;
  color: ${(props) => getTextColour(props.color || dfcolour)};
  text-align: center;
  animation: ${slideTop} 1s forwards;
`;
BirthdayDiv.displayName = "BirthdayDiv";
export const Balloon = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  padding-top: 30px;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  > div {
    width: 50px;
    height: 65px;
    border-radius: 0;
    border-radius: 80% 80% 80% 80%;
    margin: 0 auto;
    padding: 10px;
    -webkit-transform-origin: bottom center;
  }
  > div:before {
    position: absolute;
    bottom: -11px;
    content: "▲";
    font-size: 1em;
  }
`;

export const WelcomeText = styled.h3`
  font-family: "Cinzel Decorative", cursive;
  text-shadow: 1px 1px 1px grey;
  color: ${(props) => props.color || dfcolour};
`;
export const HR = styled.hr`
   {
    border: 0;
    height: 1px;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
  }
`;
// input box for users name
export const UsernameInput = styled(Input)``;
UsernameInput.displayName = "UsernameInput";

// input box for users favorite colour, changes button colours
export const ColourInput = styled(Input)``;
ColourInput.displayName = "ColourInput";

// input box for users birthday
export const BirthdayInput = styled(Input)``;
BirthdayInput.displayName = "BirthdayInput";

export const Label = styled.label`
  font-family: "Averia Serif Libre", cursive;
  padding-right: 10px;
`;
Label.displayName = "Label";
export const IDCard = styled.div`
  border: ${(props) => `2px solid ${props.color || dfcolour}`};
  width: fit-content;
  border-radius: 15px;
  margin: auto;
  background-color: white;
  margin-top: 20px;
  padding: 15px 50px;
`;
export const Button = styled.button.attrs(() => ({
  type: "button",
}))`
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  background-color: ${(props) => props.color || dfcolour};
  color: ${(props) => getTextColour(props.color || dfcolour)};
  border: none;
  display: inline-block;
  padding: 8px 16px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  font-size: 1rem;
  margin: 5px;
  &:hover {
    filter: brightness(75%);
  }
  &:focus {
    outline: none;
  }
`;
Button.displayName = "Button";
export const CancelButton = styled(Button)``;
CancelButton.displayName = "CancelButton";

//balloons

const animations = {
  balloon1: keyframes`
0%,
100% {
  transform: translateY(0) rotate(-6deg);
}
50% {
  transform: translateY(-20px) rotate(8deg);
}
`,
  balloon2: keyframes`
  0%,
  100% {
    transform: translateY(0) rotate(6deg);
  }
  50% {
    transform: translateY(-30px) rotate(-8deg);
  }
`,
  balloon3: keyframes`
  0%,
  100% {
    transform: translate(0, -10px) rotate(6eg);
  }
  50% {
    transform: translate(-20px, 30px) rotate(-8deg);
  }
`,
  balloon4: keyframes`
  0%,
  100% {
    transform: translate(10px, -10px) rotate(-8eg);
  }
  50% {
    transform: translate(-15px, 10px) rotate(10deg);
  }
`,
};
export const BallonHolder = styled.div`
  background: ${(props) => props.theme.colour};
  box-shadow: inset 10px 10px 10px ${(props) => props.theme.shadowed};
  animation: ${(props) => animations[props.theme.animationKey]} ${(props) => props.theme.animationTiming}s ease-in-out
    infinite;
  &:before {
    color: ${(props) => props.theme.colour};
  }
  > span {
    font-size: 2.8em;
    margin: auto;
    z-index: 0;
  }
`;
export const colourList = [
  {
    colour: "rgba(180, 224, 67, 0.9)",
    shadowed: "rgba(153, 192, 56, 0.9)",
    animationKey: "balloon2",
    animationTiming: 6
  },
  {
    colour: "rgba(190, 61, 244, 0.9)",
    shadowed: "rgba(163, 53, 211, 0.9)",
    animationKey: "balloon1",
    animationTiming: 7
  },
  {
    colour: "rgba(182, 15, 97, 0.9)",
    shadowed: "rgba(141, 12, 74, 0.9)",
    animationKey: "balloon4",
    animationTiming: 6
  },
  {
    colour: "rgba(45, 181, 167, 0.9)",
    shadowed: "rgba(38, 151, 140, 0.9)",
    animationKey: "balloon3",
    animationTiming: 5
  },
  {
    colour: "rgba(242, 112, 45, 0.9)",
    shadowed: "rgba(201, 92, 38, 0.9)",
    animationKey: "balloon2",
    animationTiming: 4
  },
  {
    colour: "rgba(242, 194, 58, 0.9);",
    shadowed: "rgba(224, 179, 53, 0.9)",
    animationKey: "balloon1",
    animationTiming: 3
  },
];
