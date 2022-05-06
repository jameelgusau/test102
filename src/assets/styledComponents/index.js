import styled from "styled-components";
import MuiPhoneNumber from "material-ui-phone-number";

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: #ccc;
  box-sizing: border-box;
  font-size: 10px;
  && {
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "auto"};
    margin: ${(props) => props.vmargin || 0} ${(props) => props.hmargin || 0};
    // padding: ${(props) => props.vpadding || 0} ${(props) =>
      props.hpadding || 0}
    @media (max-width: 768px) {
      max-width: ${(props) => props.mobwidth || "100%"};
      margin: ${(props) => props.mobtmargin || props.mobvmargin || 0}
        ${(props) => props.mobrmargin || props.mobhmargin || 0}
        ${(props) => props.mobbmargin || props.mobvmargin || 0}
        ${(props) => props.moblmargin || props.mobhmargin || 0};
    }
  }
`;
export const PhoneNumber = styled(MuiPhoneNumber)`
border: 1px solid #ccc;
border-radius: 3px;
color: #ccc;
`;
