import React from "react";

const Progress = ({ done }) => {
  const [style, setStyle] = React.useState({});
  const [styleE, setStyleE] = React.useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`,
    };

    const newStyleE = {
        width: `${100-done}%`,
        alignSelf: "center",
        textAlign: "center",
      };
    setStyle(newStyle);
    setStyleE(newStyleE);
  }, 200);

  return (
    <div className="progress">
      <div className="progress-done" style={style}>
        {
            done && done <= 0 ? (""): `${done}%`
        }

      </div>
      <span className="progress-bar" style={styleE}>{
        100 - done <=0 ? "" : `${100-done}%`
      }</span>
    </div>
  );
};
export default Progress;
