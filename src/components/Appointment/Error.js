import React from "react";

export default function Status(props) {
  
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold" data-testid="error">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
}