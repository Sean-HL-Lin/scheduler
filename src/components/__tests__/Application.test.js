import React from "react";

import { queryByText, getByPlaceholderText, getByAltText, render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001 ";



afterEach(cleanup);


describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  
  
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container} = render(<Application />);

    await waitForElement(() => {
      return getByText(container, 'Archie Cohen')
    })

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

 
    expect(getByText(appointment, "Processing")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));


    getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  })
  


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const {container} = render(<Application/>);

    await waitForElement( () => {
      return getByText(container,  "Archie Cohen")
    })


    const appointment = getAllByTestId(container, 'appointment').find(appointment => {
      return queryByText(appointment, "Archie Cohen")
    })

    fireEvent.click(queryByAltText(appointment, "Delete"))

    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument()

    fireEvent.click(queryByText(appointment, "Confirm"))
    
    expect(getByText(appointment, "Processing")).toBeInTheDocument()
    
    await waitForElement(() => getByAltText(appointment, "Add"))
    
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument()

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const {container} = render(<Application/>);


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


  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    
    const { container} = render(<Application />);

    await waitForElement(() => {
      return getByText(container, 'Archie Cohen')
    })


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


  })


  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    
    const { container} = render(<Application />);

    await waitForElement(() => {
      return getByText(container, 'Archie Cohen')
    })

    const appointment = getAllByTestId(container, 'appointment').find(appointment => {
      return queryByText(appointment, "Archie Cohen")
    })


    fireEvent.click(getByAltText(appointment, "Delete"));
    
    fireEvent.click(getByText(appointment, "Confirm"));

    await waitForElement(() => {
      return getByText(appointment,"Error")
    })

    
  })



})