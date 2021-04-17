import React, { useState } from "react";
import dayjs from "dayjs";
import {
  BirthdayInput,
  ColourInput,
  UsernameInput,
  Label,
  Button,
  CancelButton,
  BirthdayDiv,
} from "../styled";

function UserProfile() {
  const [userName, setUserName] = useState({ savedValue: "", InputValue: "" });
  // htmlFormat todays date to be same as date picker
  // no sense re-inventing the wheel, datejs is super light weight
  let todaysDate = dayjs().format("YYYY-MM-DD");
  // set default birthday to yesterday so that happy birthday isn't displayed on first entry
  let yeterdaysDate = dayjs().subtract(1, 'day').format("YYYY-MM-DD");
  const [birthday, setUserBirthday] = useState({
    savedValue: yeterdaysDate,
    InputValue: yeterdaysDate,
  });
  const [favoriteColour, setFavoriteColour] = useState({
    savedValue: "#5d1070",
    InputValue: "#5d1070",
  });
  const [editProfile, setEditProfile] = useState(false);
  let buttonText = editProfile ? "Save Changes" : "Edit Profile";
  // on cancel, clear all inputs and set them to initial value
  const cancelEdit = () => {
    const savedName = userName.savedValue;
    const savedBirthday = birthday.savedValue;
    const savedColor = favoriteColour.savedValue;
    setUserName({ savedValue: savedName, InputValue: savedName });
    setUserBirthday({ savedValue: savedBirthday, InputValue: savedBirthday });
    setFavoriteColour({ savedValue: savedColor, InputValue: savedColor });
    setEditProfile(false); // close edit
  };
  // on save, copy all input values to saved.
  const handleSaveEdit = (isSave) => {
    // if it isn't a save, it's a begin edit
    if (!isSave) {
      setEditProfile(true); // open edit
    } else {
      const editedName = userName.InputValue;
      const editedBirthday = birthday.InputValue;
      const editedColor = favoriteColour.InputValue;
      setUserName({ savedValue: editedName, InputValue: editedName });
      setUserBirthday({
        savedValue: editedBirthday,
        InputValue: editedBirthday,
      });
      setFavoriteColour({ savedValue: editedColor, InputValue: editedColor });
      setEditProfile(false); // close edit
    }
  };
  return (
    <>
      {/* if today is the user birthday, wish them a happy birthday */}
      {birthday.savedValue === todaysDate && !editProfile && (
        <BirthdayDiv color={favoriteColour.savedValue}>
          HAPPY BIRTHDAY {userName.savedValue}!
        </BirthdayDiv>
      )}
      {/* begin username */}
      <Label htmlFor="uname" disabled={!editProfile}>
        Username
      </Label>
      <UsernameInput
        name="uname"
        disabled={!editProfile}
        type="string"
        value={userName.InputValue}
        onChange={(event) => {
          event.preventDefault();
          setUserName({
            savedValue: userName.savedValue,
            InputValue: event.target.value,
          });
        }}
      />
      <br />

      {/* begin birthday */}
      <Label htmlFor="bday" disabled={!editProfile}>
        Birthday
      </Label>
      <BirthdayInput
        name="bday"
        type="date"
        disabled={!editProfile}
        value={birthday.InputValue}
        max={todaysDate} // should probably be minus at least a year, but that's hard for testing
        onChange={(event) => {
          // need to prevent default input functionality otherwise it over writes our values
          event.preventDefault();
          setUserBirthday({
            savedValue: birthday.savedValue,
            InputValue: event.target.value,
          });
        }}
      />
      <br />

      {/* begin colour */}
      <Label htmlFor="color">Favorite Colour</Label>
      <ColourInput
        name="color"
        disabled={!editProfile}
        type="color"
        value={favoriteColour.InputValue}
        onChange={(event) => {
          event.preventDefault();
          setFavoriteColour({
            savedValue: favoriteColour.savedValue,
            InputValue: event.target.value,
          });
        }}
      />
      <Button
        color={favoriteColour.savedValue}
        onClick={() => handleSaveEdit(editProfile)}
      >
        {buttonText}
      </Button>
      {editProfile && (
        <CancelButton color={favoriteColour.savedValue} onClick={cancelEdit}>
          Cancel
        </CancelButton>
      )}
    </>
  );
}
export default UserProfile;
