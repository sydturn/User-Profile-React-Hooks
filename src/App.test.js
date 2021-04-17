import "@testing-library/jest-dom";
import "jest-styled-components";
import { shallow, configure } from "enzyme";
import { styleSheetSerializer } from "jest-styled-components/serializer";
import { addSerializer } from "jest-specific-snapshot";
import { act } from "react-dom/test-utils";
import Adapter from "enzyme-adapter-react-16";
import UserProfile from "./components/userProfile";
import dayjs from "dayjs";

configure({ adapter: new Adapter() });
addSerializer(styleSheetSerializer);

function setupUserForm() {
  const component = shallow(<UserProfile />);
  return {
    component,
  };
}

describe("testing suite for user profile component", () => {
  beforeAll(() => {
    const app = setupUserForm();
    return app;
  });

  it("should have an input for user to enter their name", () => {
    const { component } = setupUserForm();
    const usernameInput = component.find("UsernameInput");
    expect(usernameInput.exists()).toBeTruthy();
    expect(usernameInput.props().type).toBe("string");
  });

  it("should have all user inputs disabled by default", () => {
    const { component } = setupUserForm();
    const birthdayInput = component.find("BirthdayInput");
    const colourInput = component.find("ColourInput");
    const usernameInput = component.find("UsernameInput");
    expect(birthdayInput.props().disabled).toBeTruthy();
    expect(colourInput.props().disabled).toBeTruthy();
    expect(usernameInput.props().disabled).toBeTruthy();
  });
});
describe("Testing suite for buttons", () => {
  it("should have an edit button that enables all user inputs", () => {
    const { component } = setupUserForm();
    const editButton = component.find("Button");
    expect(editButton.text()).toBe("Edit Profile");
    // click edit button to enable form
    act(() => {
      editButton.simulate("click");
    });
    // verfy form elements are now enabled
    expect(component.find("BirthdayInput").props().disabled).toBeFalsy();
    expect(component.find("ColourInput").props().disabled).toBeFalsy();
    expect(component.find("UsernameInput").props().disabled).toBeFalsy();
  });
  it("Should have a clear/cancel button only when editing that disables user input", () => {
    const { component } = setupUserForm();
    const editButton = component.find("Button");
    // ensure on mount there is no cancel button
    expect(component.find("CancelButton").exists()).toBeFalsy();
    // click edit button to enable form
    act(() => {
      editButton.simulate("click");
    });
    // ensure cancel now appears
    expect(component.find("CancelButton").exists()).toBeTruthy();
    // click click cancel button
    act(() => {
      component.find("CancelButton").simulate("click");
    });
    // the act of saving should disable input
    expect(component.find("BirthdayInput").props().disabled).toBeTruthy();
    expect(component.find("ColourInput").props().disabled).toBeTruthy();
    expect(component.find("UsernameInput").props().disabled).toBeTruthy();
  });
  it("Should have a save button that disables user inputs", () => {
    const { component } = setupUserForm();
    const editButton = component.find("Button");
    // click edit button to enable form
    act(() => {
      editButton.simulate("click");
    });
    // edit button should now be save button
    expect(component.find("Button").text()).toBe("Save Changes");
    // click click save button
    act(() => {
      component.find("Button").simulate("click");
    });
    // the act of saving should disable input
    expect(component.find("BirthdayInput").props().disabled).toBeTruthy();
    expect(component.find("ColourInput").props().disabled).toBeTruthy();
    expect(component.find("UsernameInput").props().disabled).toBeTruthy();
  });
})
describe("Testing suite for birthday", () => {
  it("should have an input for user to enter their birthday", () => {
    const { component } = setupUserForm();
    const birthdayInput = component.find("BirthdayInput");
    expect(birthdayInput.exists()).toBeTruthy();
    expect(birthdayInput.props().type).toBe("date");
  });

  it("Should wish the user a happy birthday only on their selected birthday", () => {
    const { component } = setupUserForm();
    const happyBirthday = component.find("BirthdayDiv");
    const birthdayInput = component.find("BirthdayInput");
    const editButton = component.find("Button");
    //click edit button to enable form
    act(() => {
      editButton.simulate("click");
    });
    // initially birthday shouldn't exist
    expect(happyBirthday.exists()).toBeFalsy();
    // set birthday to today
    birthdayInput.simulate("change", {
      preventDefault: () => {}, // we have to mock this, since we aren't really an event
      target: { value: dayjs().format("YYYY-MM-DD") },
    });
    // save form
    act(() => {
      component.find("Button").simulate("click");
    });
    // birthday should now exist
    expect(component.find("BirthdayDiv")).toBeTruthy();
  });
});
describe("Testing suite for favorite colour", () => {
  it("should have an input for user to enter their favorite colour", () => {
    const { component } = setupUserForm();
    const colourInput = component.find("ColourInput");
    expect(colourInput.exists()).toBeTruthy();
    expect(colourInput.props().type).toBe("color");
  });
  it("Should change button colour to match user's favorite colour", () => {
    const { component } = setupUserForm();
    const colourInput = component.find("ColourInput");
    const editButton = component.find("Button");
    //click edit button to enable form
    act(() => {
      editButton.simulate("click");
    });
    // change the colour Input
    colourInput.simulate("change", {
      preventDefault: () => {}, // we have to mock this, since we aren't really an event
      target: { value: "ffffff" },
    });
    // save form
    act(() => {
      component.find("Button").simulate("click");
    });
    expect(component.find("Button")).toHaveStyleRule(
      "background-color",
      "ffffff"
    );
  });
});
