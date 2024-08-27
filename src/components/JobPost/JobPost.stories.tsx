import type { Meta, StoryObj } from "@storybook/react";
import { JobPost } from "./JobPost";

const meta: Meta<typeof JobPost> = {
  component: JobPost,
};

export default {
  title: "App / JobPost",
  component: JobPost,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: "Bass player needed today!!!",
    memberImageSrc: "https://picsum.photos/id/237/200/300",
    memberName: "Haveri",
    created: new Date(),
    description: "Looking for an awesome bass player",
    replies: null,
  },
};

export const WithJobImage: Story = {
  args: {
    ...Basic.args,
    photoUrl: "https://picsum.photos/id/237/200/300",
  },
};
