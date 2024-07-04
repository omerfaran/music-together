import { SelectItem } from "@nextui-org/react";
import { Select } from "./Select";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Select> = {
  component: Select,
};

export default {
  title: "UI / Select",
  component: Select,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  args: {
    label: "Select",
    children: Array.from({ length: 3 }).map((_, i) => {
      return <SelectItem key={i.toString()}>Select item {i}</SelectItem>;
    }),
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
