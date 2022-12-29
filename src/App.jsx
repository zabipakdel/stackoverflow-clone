import React from "react";
import Router from "./Router";
import { I18nProvider, LOCALES } from "./i18n";
import { FormattedMessage } from "react-intl";
import translate from "./i18n/translate";

const App = () => {
  return (
    <I18nProvider locale={LOCALES.ENGLISH}>
      <div>
        {translate("hello")}
        <Router />
      </div>
    </I18nProvider>
  );
};

export default App;
