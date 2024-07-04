import { Slider } from "./Slider";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Slider> = {
  component: Slider,
};

export default {
  title: "UI / Slider",
  component: Slider,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  args: {
    label: "Slider",
  },
};

export const DangerColor: Story = {
  args: {
    ...Basic.args,
    color: "danger",
  },
};

export const LargeSize: Story = {
  args: {
    ...Basic.args,
    size: "lg",
  },
};

export const WithMaxValue: Story = {
  args: {
    label: "Max value is 20!",
    maxValue: 20,
  },
};
