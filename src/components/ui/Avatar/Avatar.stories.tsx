import { Avatar } from "./Avatar";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
};

export default {
  title: "UI / Avatar",
  component: Avatar,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Avatar>;

export const Basic: Story = {
  args: {},
};

export const WithSrcAndAlt: Story = {
  args: {
    src: "https://picsum.photos/id/237/200/300",
    alt: "User avatar",
  },
};

export const DangerColor: Story = {
  args: {
    color: "danger",
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
  },
};

export const FullRadius: Story = {
  args: {
    radius: "full",
  },
};

export const Bordered: Story = {
  args: {
    isBordered: true,
  },
};
