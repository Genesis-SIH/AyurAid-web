import React from "react";
import AppText from "./AppText";
import { Colors } from "../utils";

const commonButtonStyle = {
  marginTop: 15,
  padding: 10,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

export function RoundButton(props) {
  const buttonType = props.outline
    ? {
        backgroundColor: "transparent",
        border: `1px solid ${Colors.primary}`,
      }
    : {
        backgroundColor: Colors.primary,
        border: `1px solid ${Colors.primary}`,
      };

  return (
    <button
      onClick={props.onPress}
      {...props}
      style={{
        ...buttonType,
        ...commonButtonStyle,
        borderRadius: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "40%",
        ...props.style,
      }}
    >
      <AppText
        bold={props.boldTitle}
        style={{
          color: props.outline ? Colors.primary : "white",
          fontSize: 18,
        }}
      >
        {props.title}
      </AppText>
    </button>
  );
}

export function FlatButton(props) {
  const buttonType = props.outline
    ? {
        backgroundColor: "transparent",
        border: `1px solid ${Colors.primary}`,
      }
    : {
        backgroundColor: Colors.primary,
        border: `1px solid ${Colors.primary}`,
      };

  return (
    <button
      onClick={props.onPress}
      {...props}
      style={{
        ...buttonType,
        ...commonButtonStyle,
        borderRadius: 8,
        ...props.style,
      }}
    >
      <AppText
        bold={props.boldTitle}
        style={{
          color: props.outline ? Colors.primary : "white",
          fontSize: 18,
        }}
      >
        {props.title}
      </AppText>
    </button>
  );
}
