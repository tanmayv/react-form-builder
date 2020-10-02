import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import { PropertyType } from "../core/blockconfig/PropertyType";
import { ConfigProps } from "../core/blockconfig/BlockConfigurator";

const EditTextComponent: React.FC<ConfigProps> = ({ createProperty, properties, change }) => {
  useEffect(() => {
    createProperty(PropertyType.STRING, "answer", "");
    createProperty(PropertyType.STRING, "label", "What is this?");
    createProperty(PropertyType.BOOLEAN, "required", false);
  }, []);
  return (
    <div>
      <TextField
        label={properties.label}
        type="text"
        placeholder="answer here"
        value={properties.answer || ""}
        onChange={(event) => change({ answer: event.target.value })}
      />
    </div>
  );
};

export default EditTextComponent;
