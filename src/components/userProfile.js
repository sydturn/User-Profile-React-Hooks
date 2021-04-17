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
  Container,
  WelcomeText,
  HR,
  IDCard
} from "../styled";
import Balloons from "./balloons";

function UserProfile() {
  const [userName, setUserName] = useState({
    savedValue: "Anon",
    InputValue: "Anon",
  });
  // htmlFormat todays date to be same as date picker
  // no sense re-inventing the wheel, datejs is super light weight
  let todaysDate = dayjs().format("YYYY-MM-DD");
  // set default birthday to yesterday so that happy birthday isn't displayed on first entry
  let yeterdaysDate = dayjs().subtract(1, "day").format("YYYY-MM-DD");
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
  const getDaysUntil = () => {
    // make birthday into dayjs object
    let dayjsbday = dayjs(birthday.savedValue);
    let todayObj = dayjs();
    // set birthday to this year
    dayjsbday = dayjsbday.year(todayObj.get("year"));
    // check if today is birthday and return 0 days if so
    if (todaysDate === dayjsbday.format("YYYY-MM-DD")) {
      return 0;
    }
    // if birthday has passed change year to next year
    if (todayObj.isAfter(dayjsbday)) {
      dayjsbday = dayjsbday.add(1, "year");
    }
    const difference = dayjsbday.diff(todaysDate, "day");
    return difference;
  };
  // logic for deciding what we display at the top of the page
  const daysUntilBirthday = getDaysUntil();
  const welcomeMessage = (
    <WelcomeText color={favoriteColour.savedValue}>
      Welcome {userName.savedValue},
      {daysUntilBirthday > 1 && (
        <> There are {daysUntilBirthday} days until your birthday</>
      )}
      {daysUntilBirthday === 1 && (
        <> There is only {daysUntilBirthday} more day until your birthday!</>
      )}
    </WelcomeText>
  );
  return (
    <>
      {/* if today is the user birthday, wish them a happy birthday */}
      {daysUntilBirthday === 0 && (
        <BirthdayDiv color={favoriteColour.savedValue}>
          <Balloons
            message={`HAPPY BIRTHDAY ${userName.savedValue.toUpperCase()}!`}
          />
        </BirthdayDiv>
      )}
      <Container>
        {/* begin username */}
        {daysUntilBirthday > 0 && (
          <>
            {welcomeMessage}
            <HR />
          </>
        )}
        <IDCard color={favoriteColour.savedValue}>
          <Label htmlFor="uname" disabled={!editProfile}>
            Name
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
        </IDCard>
        <br />
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
      </Container>
    </>
  );
}
export default UserProfile;
