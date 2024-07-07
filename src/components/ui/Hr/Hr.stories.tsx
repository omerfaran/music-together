import { Hr, HrProps } from "./Hr";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "UI / Hr",
  component: Hr,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Hr>;

const Template = (args: HrProps) => {
  return (
    <div>
      <p>Above hr</p>
      <Hr {...args} />
      <p>Below hr</p>
    </div>
  );
};

export const Basic: Story = {
  render: (args) => <Template {...args} />,
  args: {},
};

export const NoSpacing: Story = {
  render: (args) => <Template {...args} />,
  args: { spacing: "none" },
};

export const BigSpacing: Story = {
  render: (args) => <Template {...args} />,
  args: { spacing: "big" },
};
