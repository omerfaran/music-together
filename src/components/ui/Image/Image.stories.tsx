import { Image } from "./Image";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Image> = {
  component: Image,
};

export default {
  title: "UI / Image",
  component: Image,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Image>;

export const Basic: Story = {
  args: { src: "https://picsum.photos/id/237/200/300", alt: "image of dog" },
};

export const Zoomed: Story = {
  args: {
    ...Basic.args,
    isZoomed: true,
  },
};

// TODO - not working atm, revisit
export const HeightAndWidth: Story = {
  args: {
    ...Basic.args,
    height: 500,
    width: 500,
  },
};
