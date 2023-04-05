import React, { EventHandler, FormEvent, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../utils/trpc";
import Calendar from "../components/calendar";

const CalenderTest: React.FC = () => {
  return (
    <div className="w-4/6">
      <Calendar />
    </div>
  )
}
export default CalenderTest
