import { ValueAndLabel } from "@/types";
import { JobPostFormPure as JobPostForm } from "./JobPostForm";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "App / JobPostForm",
  component: JobPostForm,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof JobPostForm>;

const instruments: ValueAndLabel[] = [
  { value: "bassGuitar", label: "Bass Guitar" },
  { value: "piano", label: "Piano" },
  { value: "timpani", label: "Timpani" },
];

export const Basic: Story = {
  args: {
    instruments,
    onFormSubmit: async (data) => {
      console.log("submitted with:", data);
    },
  },
};
