import React, { useEffect, useState } from 'react'
import Axios  from 'axios';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "../App.css";

// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
// import events from "./Events";

const Calender_View = () => {
  const [events,setEvents]=useState();
  useEffect(()=>{
    const events = [];
    Axios.get("http://localhost:5025/getEvents?aitid=AIT-123&start=2000-10-10&end=2050-10-10")
          .then((res) => {
            {
              res.data.map((item)=>{
                events.push(item)
                setEvents(events);
              })
            }
          })
          .catch((err) => console.log(err));

  },[]);
  console.log(timeGridPlugin);
  return (
    <>
      <div className="Events">
        <div className="conatiner-fluid">
          <div className="row" id="height">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <FullCalendar
                defaultView="dayGridMonth"
                header={{
                  left: "prev, next",
                  center: "title",
                  right: "dayGridMonth, timeGridWeek, timeGridDay",
                }}
                plugins={[dayGridPlugin, timeGridPlugin]}
                events={events} />
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Calender_View;

