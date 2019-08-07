import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import DayListItem from "components/DayListItem"
import DayList from "components/DayList"
import InterviewerListItem from "components/InterviewerListItem"
import InterviewerList from "components/InterviewerList"
import Appointment from "components/Appointment/Appointment"
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Confirm from "components/Appointment/Confirm"
import Status from "components/Appointment/Status"
import Error from "components/Appointment/Error"
import Form from "components/Appointment/Form"


  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));
  
  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => (
      <DayList days={days} day={"Monday"} setDay={action("setDay")} />
    ))
    .add("Tuesday", () => (
      <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
    ));




    const interviewer = {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    };
    
    storiesOf("InterviewerListItem", module)
      .addParameters({
        backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
      })
      .add("Unselected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
        />
      ))
      .add("Selected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected
        />
      ))
      .add("Clickable", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          setInterviewer={action("setInterviewer")}
        />
      ));



      const interviewers = [
        { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
        { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
        { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
        { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
        { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
      ];
      
      storiesOf("InterviewerList", module)
        .addParameters({
          backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
        })
        .add("Initial", () => (
          <InterviewerList
            interviewers={interviewers}
            setInterviewer={action("setInterviewer")}
          />
        ))
        .add("Preselected", () => (
          <InterviewerList
            interviewers={interviewers}
            interviewer={3}
            setInterviewer={action("setInterviewer")}
          />
        ));




  storiesOf("Appointment", module)


  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={() => {console.log('empty')}}/>)
  .add("Show", () => <Show interviewer={interviewer} onEdit={() => console.log('onedit')} onDelete={() => console.log('ondelete')}/>)
  .add("Confrim", () => <Confirm message="A message!!!" />)
  .add("Status", () => <Status message="A message for status!!!" />)
  .add("Error", () => <Error message="A message for error!!!" onClose={() => console.log('error!!')} />)
  .add("Form", () => < Form 
                        interviewers={interviewers} 
                        onSubmit={event => event.preventDefault()}
                        onCancel={() => console.log('canceled')}
                        />)
  .add("Appointment Empty", () => (
    <>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </>
  ))
  .add("Appointment Booked", () => (
    <>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment id="last" time="1pm" />
    </>
  ))
  

