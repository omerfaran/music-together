import { JobPostForm } from "./JobPostForm";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "UI / JobPostForm",
  component: JobPostForm,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof JobPostForm>;

export const Basic: Story = {
  args: {},
};
