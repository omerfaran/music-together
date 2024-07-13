import { ValueAndLabel } from "@/types";
import { Autocomplete, AutocompleteProps } from "./Autocomplete";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

export default {
  title: "UI / Autocomplete",
  component: Autocomplete,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Autocomplete>;

const items: ValueAndLabel[] = [
  { label: "First option", value: "firstOption" },
  { label: "Second option", value: "secondOption" },
  { label: "Third option", value: "thirdOption" },
];

const TemplateControlled = (args: AutocompleteProps) => {
  const [value, setValue] = useState<string | undefined>("firstOption");

  return (
    <Autocomplete
      value={value}
      onChange={(value) => {
        console.log(value);
        // TODO - fix
        setValue(value);
      }}
      {...args}
    />
  );
};

export const Basic: Story = {
  args: {
    items,
    label: "My Autocomplete",
  },
};

export const FadedVariant: Story = {
  args: {
    ...Basic.args,
    variant: "faded",
  },
};
export const AllowCustomValue: Story = {
  args: {
    ...Basic.args,
    allowCustomValue: true,
  },
};

export const Controlled: Story = {
  render: (args) => <TemplateControlled {...args} />,
  args: {
    ...Basic.args,
  },
};

export const ControlledWithCustomValue: Story = {
  render: (args) => <TemplateControlled {...args} />,
  args: {
    ...AllowCustomValue.args,
  },
};
