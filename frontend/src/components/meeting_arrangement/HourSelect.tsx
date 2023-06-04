import React, { useState } from "react";

const HourSelect: React.FC<{value:any, onChange:any, hasError: boolean}> = (props) => {

  const handleChange = (e:any) => {
    props.onChange(parseInt(e.target.value))
  }
  const hours = ["12am","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm"]
  const rows = []
  for (let i=0; i < 24; i++) {
    rows.push(<option value="{i}" key={i}>{hours[i]}</option>)
  }
  return (
    <select className={`p-2 focus:ring ${props.hasError? "border-gray-300":"border-red-300 ring-red-500"} rounded-md  uppercase text-black/80`}
      value={props.value} // ...force the select's value to match the state variable...
      onChange={handleChange} // ... and update the state variable on any change!
    >
      <option value="0">12am</option>
      <option value="1">1am</option>
      <option value="2">2am</option>
      <option value="3">3am</option>
      <option value="4">4am</option>
      <option value="5">5am</option>
      <option value="6">6am</option>
      <option value="7">7am</option>
      <option value="8">8am</option>
      <option value="9">9am</option>
      <option value="10">10am</option>
      <option value="11">11am</option>
      <option value="12">12pm</option>
      <option value="13">1pm</option>
      <option value="14">2pm</option>
      <option value="15">3pm</option>
      <option value="16">4pm</option>
      <option value="17">5pm</option>
      <option value="18">6pm</option>
      <option value="19">7pm</option>
      <option value="20">8pm</option>
      <option value="21">9pm</option>
      <option value="22">10pm</option>
      <option value="23">11pm</option>
    </select>
  )
}

export default HourSelect