import { Input } from "./Input";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  component: Input,
};

export default {
  title: "UI / Input",
  component: Input,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {},
};

export const Placeholder: Story = {
  args: {
    placeholder: "My placeholder",
  },
};

export const WithErrorMessage: Story = {
  args: {
    errorMessage: "Your error message",
    isInvalid: true,
  },
};
