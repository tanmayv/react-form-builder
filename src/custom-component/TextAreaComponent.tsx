import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import { PropertyType } from "../core/blockconfig/PropertyType";
import { ConfigProps } from "../core/blockconfig/BlockConfigurator";

const TextAreaComponent: React.FC<ConfigProps> = ({createProperty, properties, change}) => {
  useEffect(() => {
    createProperty(PropertyType.STRING, "value", "");
    createProperty(PropertyType.STRING, "label", "Question?");
    createProperty(PropertyType.BOOLEAN, "required", false);
    createProperty(PropertyType.NUMBER, "rows", 4);
    createProperty(PropertyType.NUMBER, "maxRows", 4);
  }, []);
  return (
    <div>
      <TextField
        fullWidth
        label={properties.label}
        type="text"
        multiline
        rows={properties.rows}
        rowsMax={properties.maxRows}
        placeholder="type here"
        value={properties.value || ""}
        onChange={(event) => change({ value: event.target.value })}
      />
    </div>
  );
};

export default TextAreaComponent;
