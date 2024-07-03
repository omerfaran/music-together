import { Button } from "./Button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default {
  title: "UI / Button",
  component: Button,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: "Button",
  },
};

export const PrimaryColor: Story = {
  args: {
    ...Basic.args,
    color: "primary",
  },
};

export const SecondaryColor: Story = {
  args: {
    ...Basic.args,
    color: "secondary",
  },
};

export const DangerColor: Story = {
  args: {
    ...Basic.args,
    color: "danger",
  },
};

export const BorderedVariant: Story = {
  args: {
    ...Basic.args,
    variant: "bordered",
  },
};

export const FadedVariant: Story = {
  args: {
    ...Basic.args,
    variant: "faded",
  },
};

export const FullWidth: Story = {
  args: {
    ...Basic.args,
    fullWidth: true,
  },
};

export const Loading: Story = {
  args: {
    ...Basic.args,
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Basic.args,
    isDisabled: true,
  },
};
