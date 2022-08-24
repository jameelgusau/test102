import React from "react";
import { GmailIcon, MailIcon } from "../../assets/img/Icons";
import logo2 from '../../assets/img/whitelogo.svg'

function CheckMail() {
  return (
    <div className="container">
      <img src={logo2} alt="Logo" className="logowhite"/>
      <div className="checkmail">
        <div className="checkmail__title">
          <h2 className="checkmail__title--heading">Check Your Mail</h2>
        </div>
        <div className="">
          <p className="checkmail__paragraph">
            We have sent you confirmation email. Click the link in the email to
            complete the account creation process.
          </p>
          <p className="checkmail__paragraph">Please check your inbox</p>
        </div>
        <div className="checkmail__email">
          <h2 className="checkmail__email--text">Open Mailbox:</h2>
            <GmailIcon size="25px" />
            <MailIcon size="25px" />
        </div>
      </div>
    </div>
  );
}

export default CheckMail;
