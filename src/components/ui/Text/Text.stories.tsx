import { Text } from "./Text";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Text> = {
  component: Text,
};

export default {
  title: "UI / Text",
  component: Text,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Text>;

export const Basic: Story = {
  args: {
    children: "Some Text",
  },
};

export const Span: Story = {
  args: {
    ...Basic.args,
    component: "span",
  },
};

export const H3: Story = {
  args: {
    ...Basic.args,
    component: "h3",
  },
};
