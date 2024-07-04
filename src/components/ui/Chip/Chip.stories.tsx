import { Chip } from "./Chip";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Chip> = {
  component: Chip,
};

export default {
  title: "UI / Chip",
  component: Chip,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Chip>;

export const Basic: Story = {
  args: { children: "Chip" },
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

export const FullRadius: Story = {
  args: {
    ...Basic.args,
    radius: "full",
  },
};
