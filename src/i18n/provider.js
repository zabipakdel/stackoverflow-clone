import React, { Fragment } from "react";
import { LOCALES } from "./locales";
import { IntlProvider } from "react-intl";
import messages from "./messages";

const Provider = ({ children, locale = LOCALES.ENGLISH }) => (
  <IntlProvider
    locale={locale}
    textComponent={Fragment}
    messages={messages[locale]}
  >
    {children}
  </IntlProvider>
);

export default Provider;
