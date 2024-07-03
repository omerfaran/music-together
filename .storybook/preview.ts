import type { Preview } from "@storybook/react";

// Not working in preview-head.html, so used here instead
import "../src/output.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
