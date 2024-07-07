import { Card } from "./Card";

import type { Meta, StoryObj } from "@storybook/react";
import { CardHeader } from "./CardHeader";
import { CardBody } from "./CardBody";
import { CardFooter } from "./CardFooter";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default {
  title: "UI / Card",
  component: Card,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    children: "Card",
  },
};

export const WithTailwindClass: Story = {
  args: {
    ...Basic.args,
    className: "flex items-center justify-center h-full",
  },
};

export const FullCard: Story = {
  args: {
    ...WithTailwindClass.args,
    header: "Header",
    footer: "Footer",
    children: "Card content",
  },
};
