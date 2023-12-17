import React from 'react';

const AppText = (props) => {
  const { color, fontSize, bold, style, children } = props;

  const fontFamily = bold
    ? { fontFamily: 'ProductSans' }
    : { fontFamily: 'ProductSans' };

  const textStyle = {
    color: color || 'white', // Default to white if color prop is not provided
    fontSize: fontSize || 'inherit', // Default to inherit if fontSize prop is not provided
    ...fontFamily,
    ...style,
  };

  return <div style={textStyle}>{children}</div>;
};

export default AppText;
