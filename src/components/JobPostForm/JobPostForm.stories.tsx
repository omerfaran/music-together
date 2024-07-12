import { JobPostFormPure as JobPostForm } from "./JobPostForm";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "App / JobPostForm",
  component: JobPostForm,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof JobPostForm>;

export const Basic: Story = {
  args: {
    onFormSubmit: async (data) => {
      console.log("submitted with:", data);
    },
  },
};
