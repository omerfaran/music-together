import { Switch } from "./Switch";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Switch> = {
  component: Switch,
};

export default {
  title: "UI / Switch",
  component: Switch,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  args: {},
};

export const DangerColor: Story = {
  args: {
    color: "danger",
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
  },
};
