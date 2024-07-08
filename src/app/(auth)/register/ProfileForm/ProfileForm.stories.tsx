import { ProfileForm } from "./ProfileForm";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "App / ProfileForm",
  component: ProfileForm,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof ProfileForm>;

export const Basic: Story = {
  args: {},
};
