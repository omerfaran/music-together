import { Textarea } from "./Textarea";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};

export default {
  title: "UI / Textarea",
  component: Textarea,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Textarea>;

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

export const WithMinRows: Story = {
  args: {
    minRows: 20,
  },
};
