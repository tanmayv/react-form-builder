import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import { PropertyType } from "../core/blockconfig/PropertyType";
import { ConfigProps } from "../core/blockconfig/BlockConfigurator";

const EditTextComponent: React.FC<ConfigProps> = ({createProperty, properties, change}) => {
  useEffect(() => {
    createProperty(PropertyType.STRING, "value", "");
    createProperty(PropertyType.STRING, "label", "Question?");
    createProperty(PropertyType.BOOLEAN, "required", false);
  }, []);
  return (
    <div>
      <TextField
        fullWidth
        label={properties.label}
        type="text"
        placeholder="type here"
        value={properties.value || ""}
        onChange={(event) => change({ value: event.target.value })}
      />
    </div>
  );
};

export default EditTextComponent;
