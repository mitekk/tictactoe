import React, { MouseEvent, useState } from "react";
import { Field } from "../components/field";
import { FieldProps } from "../components/field/field";
import "./tictac.page.css";

const TictacPage = () => {
  const tmp_fields: Array<FieldProps> = [
    {
      owner: "empty",
    },
    {
      owner: "empty",
    },
    {
      owner: "empty",
    },
    {
      owner: "empty",
    },
    {
      owner: "empty",
    },
    {
      owner: "empty",
    },
    {
      owner: "empty",
    },
    {
      owner: "empty",
    },
    {
      owner: "empty",
    },
  ];
  const [fields, setFields] = useState(tmp_fields);
  const [score, setScore] = useState({
    x: { score: 0 },
    o: { score: 0 },
  });
  const [winner, setWinner] = useState({
    winner: null,
    fields: [],
  });

  const handleSelect = (e: MouseEvent<HTMLDivElement>, index: number) => {
    setFields(
      fields.map((field, fieldIndex) => {
        if (fieldIndex === index) {
          field.owner = "o";
        }

        return field;
      })
    );
  };

  return (
    <div className="fieldsContainer">
      {fields.map((field, index) => (
        <Field
          key={`field-${field.owner}-${index}`}
          index={index}
          owner={field.owner}
          onSelect={handleSelect}
        ></Field>
      ))}
    </div>
  );
};

export default TictacPage;
