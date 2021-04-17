import styled from "styled-components";
// determines whether black text or white text would display better on background colour
// essentially checks to see if background colour is on the darker or lighter half of hex code
// and returns the opposite
const getTextColour = (bgColor) => {
  return parseInt(bgColor.replace("#", ""), 16) > 0xffffff / 2
    ? "#000"
    : "#fff";
};
// default favorite colour
const dfcolour = "5d1070"
export const BodyStyle = styled.div`
height: 100vh;
position: relative;
color: black;
background-color: white;
overflow-y: auto;
margin: 0;
padding: 0;
}`;

export const Input = styled.input`
  font-size: 18px;
  width: 50%;
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

// shown on users birthday
export const BirthdayDiv = styled.h3`
  background-color: ${(props) => props.color || dfcolour};
  color: ${(props) => getTextColour(props.color || dfcolour)}
`;
BirthdayDiv.displayName = "BirthdayDiv"

// input box for users name
export const UsernameInput = styled(Input)``;
UsernameInput.displayName="UsernameInput"

// input box for users favorite colour, changes button colours
export const ColourInput = styled(Input)``;
ColourInput.displayName="ColourInput"

// input box for users birthday
export const BirthdayInput = styled(Input)``;
BirthdayInput.displayName="BirthdayInput";

export const Label = styled.label`
  padding-right: 10px;
`;
Label.displayName="Label";

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
Button.displayName = 'Button'
export const CancelButton = styled(Button)``;
CancelButton.displayName = 'CancelButton'
