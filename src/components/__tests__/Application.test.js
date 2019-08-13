import React from "react";

import { queryByText, getByPlaceholderText, getByAltText, render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, queryByAltText, getByTestId } from "@testing-library/react";

import Application from "components/Application";

import axios from 'axios';
import { async } from "q";
axios.defaults.baseURL = "http://localhost:3001 ";



afterEach(cleanup);


describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  
  
  
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container, debug} = render(<Application />);

    await waitForElement(() => {
      return getByText(container, 'Archie Cohen')
    })

    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));q


    const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));


    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // console.log('before --------------')
    // debug()
    fireEvent.click(getByText(appointment, "Save"));

    // console.log('after----------------------')
    // debug()

    // console.log(prettyDOM(appointment));
    expect(getByText(appointment, "Processing")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // console.log('after found----------------------')
    // debug()

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // console.log('monday! -------')
    // console.log(prettyDOM(day));
  })
  


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const {container, debug} = render(<Application/>);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement( () => {
      return getByText(container,  "Archie Cohen")
    })


    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, 'appointment').find(appointment => {
      return queryByText(appointment, "Archie Cohen")
    })

    fireEvent.click(queryByAltText(appointment, "Delete"))

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument()
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"))
    // 6. Check that the element with the text "Deleting" is displayed.appointment
    expect(getByText(appointment, "Processing")).toBeInTheDocument()
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"))
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument()

    //debug()
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const {container, debug} = render(<Application/>);


    await waitForElement(() => {
      return getByText(container, 'Archie Cohen')
    })


    const appointment = getAllByTestId(container, 'appointment').find(appointment => {
      return queryByText(appointment, "Archie Cohen")
    })

    expect(getByAltText(container, "Edit")).toBeInTheDocument()
    

    fireEvent.click(getByAltText(container, "Edit"))


    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //debug()


  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    
    const { container, debug} = render(<Application />);

    await waitForElement(() => {
      return getByText(container, 'Archie Cohen')
    })

    const appointments = getAllByTestId(container, "appointment");


    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    await waitForElement(() => {
      return getByText(appointment,"Error")
    })


    debug()
  })


  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    
    const { container, debug} = render(<Application />);

    await waitForElement(() => {
      return getByText(container, 'Archie Cohen')
    })

    const appointment = getAllByTestId(container, 'appointment').find(appointment => {
      return queryByText(appointment, "Archie Cohen")
    })


    fireEvent.click(getByAltText(appointment, "Delete"));
    
    fireEvent.click(getByText(appointment, "Confirm"));
    // fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    //   target: { value: "Lydia Miller-Jones" }
    // });
    // fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // fireEvent.click(getByText(appointment, "Save"));

    await waitForElement(() => {
      return getByText(appointment,"Error")
    })

    // debug()
    
  })



})