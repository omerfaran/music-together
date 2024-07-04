import { Badge } from "./Badge";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Badge> = {
  component: Badge,
};

export default {
  title: "UI / Badge",
  component: Badge,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Badge>;

export const Basic: Story = {
  args: { children: "Badge", content: "5" },
};

export const SuccessColor: Story = {
  args: {
    ...Basic.args,
    color: "success",
  },
};

export const CircleShape: Story = {
  args: {
    ...Basic.args,
    shape: "circle",
  },
};

export const Invisible: Story = {
  args: {
    ...Basic.args,
    isInvisible: true,
  },
};
