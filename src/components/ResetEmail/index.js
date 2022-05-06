import React from "react";
import { GmailIcon, MailIcon } from "../../assets/img/Icons";

function CheckMail() {
  return (
    <div className="container">
      <div className="checkmail">
        <div className="checkmail__title">
          <h2 className="checkmail__title--heading">Check Your Mail</h2>
        </div>
        <div className="">
          <p className="checkmail__paragraph">
            Please check your email for password reset instructions
          </p>
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