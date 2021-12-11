import React, { MouseEvent, useState } from "react";
import { Field } from "../components/field";
import { FieldProps } from "../components/field/field";
import tictacAPI from "../api/tictac.api";
import "./tictac.page.css";

const TictacPage = () => {
  const initialFields: FieldProps[] = [
    {
      player: "empty",
      index: 0,
    },
    {
      player: "empty",
      index: 1,
    },
    {
      player: "empty",
      index: 2,
    },
    {
      player: "empty",
      index: 3,
    },
    {
      player: "empty",
      index: 4,
    },
    {
      player: "empty",
      index: 5,
    },
    {
      player: "empty",
      index: 6,
    },
    {
      player: "empty",
      index: 7,
    },
    {
      player: "empty",
      index: 8,
    },
  ];
  const [fields, setFields] = useState(initialFields);
  const [score, setScore] = useState({
    x: { score: 0 },
    o: { score: 0 },
  });
  const [winner, setWinner] = useState({
    winner: null,
    fields: [],
  });

  const handleSelect = async (e: MouseEvent<HTMLDivElement>, index: number) => {
    const { data } = await tictacAPI.processMove(index, fields);
    setFields(data.fields);
    console.log(data.event);
    console.log(data.opponentMove);

    // TODO: TSlint error - although seems to be correct. eject\eslint pluging? leaving for now

    // setFields(
    //   fields.map((field, fieldIndex) => {
    //     if (fieldIndex === index) {
    //       field.player = "o";
    //     }

    //     return field;
    //   })
    // );
  };

  return (
    <div className="fieldsContainer">
      {fields.map((field) => (
        <Field
          key={`field-${field.player}-${field.index}`}
          index={field.index}
          player={field.player}
          onSelect={handleSelect}
        ></Field>
      ))}
    </div>
  );
};

export default TictacPage;
