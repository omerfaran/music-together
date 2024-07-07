import { SelectItem } from "@nextui-org/react";
import { Select } from "./Select";

import type { Meta, StoryObj } from "@storybook/react";
import { ValueAndLabel } from "@/types";

const meta: Meta<typeof Select> = {
  component: Select,
};

export default {
  title: "UI / Select",
  component: Select,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Select>;

const items: ValueAndLabel[] = [
  { label: "First option", value: "1" },
  { label: "Second option", value: "2" },
];

export const Basic: Story = {
  args: {
    label: "Select",
    items,
  },
};

export const BorderedVariant: Story = {
  args: {
    ...Basic.args,
    variant: "bordered",
  },
};

export const WithTailwindClass: Story = {
  args: {
    ...Basic.args,
    className: "bg-red-500",
  },
};
