import "vuetify/styles";

import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";
import icons from "@/const/icons";

export default createVuetify({
  icons: {
    defaultSet: "fa",
    aliases: {
      ...aliases,
      ...icons,
    },
    sets: {
      fa,
    },
  },
});
