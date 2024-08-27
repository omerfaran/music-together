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
    // expertise: "Bass player",
    created: new Date(),
    description: "Looking for an awesome bass player",
    // selectedInstrument: {
    //   id: "bass",
    //   label: "Bass",
    //   imageSrc: "https://picsum.photos/id/237/200/300",
    // },
    replies: null,
  },
};
